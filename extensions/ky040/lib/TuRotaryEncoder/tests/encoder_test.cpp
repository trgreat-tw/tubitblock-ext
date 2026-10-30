#include "TuRotaryEncoder.h"
#include <assert.h>
#include <limits.h>
#include <stdio.h>

static uint8_t pins[256];
static uint8_t modes[256];
static uint32_t clockMs;

void pinMode(uint8_t pin, uint8_t mode) { modes[pin] = mode; }
int digitalRead(uint8_t pin) { return pins[pin]; }
unsigned long millis() { return clockMs; }

static void resetPins() {
    for (int i = 0; i < 256; ++i) {
        pins[i] = HIGH;
        modes[i] = 0;
    }
    clockMs = 0;
}

static void ab(TuRotaryEncoder &encoder, uint8_t state) {
    pins[2] = (state & 2) ? HIGH : LOW;
    pins[3] = (state & 1) ? HIGH : LOW;
    encoder.update();
}

static void forward(TuRotaryEncoder &encoder) {
    ab(encoder, 1); ab(encoder, 0); ab(encoder, 2); ab(encoder, 3);
}

static void backward(TuRotaryEncoder &encoder) {
    ab(encoder, 2); ab(encoder, 0); ab(encoder, 1); ab(encoder, 3);
}

static void basicAndBounce() {
    resetPins();
    TuRotaryEncoder encoder;
    encoder.update();
    assert(encoder.position() == 0 && encoder.direction() == 0);
    encoder.begin(2, 3, 4);
    assert(modes[2] == INPUT_PULLUP && modes[3] == INPUT_PULLUP);
    assert(modes[4] == INPUT_PULLUP);
    forward(encoder);
    assert(encoder.position() == 1 && encoder.direction() == 1);
    assert(encoder.direction() == 1); // Read accessors never consume flags.
    encoder.update();
    assert(encoder.position() == 1 && encoder.direction() == 0);
    backward(encoder);
    assert(encoder.position() == 0 && encoder.direction() == -1);
    // A bouncing edge cancels before the actual full step completes.
    ab(encoder, 1); ab(encoder, 3); ab(encoder, 1);
    ab(encoder, 0); ab(encoder, 2); ab(encoder, 3);
    assert(encoder.position() == 1);
    // A partially turned knob returns to its start without a counted step.
    ab(encoder, 1); ab(encoder, 0); ab(encoder, 1); ab(encoder, 3);
    assert(encoder.position() == 1 && encoder.direction() == 0);
}

static void invalidTransitionAndModes() {
    resetPins();
    TuRotaryEncoder encoder;
    encoder.begin(2, 3);
    ab(encoder, 1); // Partial valid movement.
    ab(encoder, 2); // Both bits change: partial movement must be discarded.
    assert(encoder.position() == 0 && encoder.direction() == 0);
    ab(encoder, 3); ab(encoder, 1); ab(encoder, 0);
    assert(encoder.position() == 0);
    ab(encoder, 2);
    assert(encoder.position() == 1);
    assert(!encoder.pressed() && !encoder.justPressed() && !encoder.justReleased());

    resetPins();
    encoder.begin(2, 3, -1, 2);
    ab(encoder, 1); assert(encoder.position() == 0);
    ab(encoder, 0); assert(encoder.position() == 1);
    ab(encoder, 2); ab(encoder, 3); assert(encoder.position() == 2);
    resetPins();
    encoder.begin(2, 3, -1, 1);
    forward(encoder); assert(encoder.position() == 4);
    backward(encoder); assert(encoder.position() == 0);
    resetPins();
    encoder.begin(2, 3, -1, 3); // Unsupported mode falls back to 4.
    forward(encoder); assert(encoder.position() == 1);
}

static void reversalAndLimits() {
    resetPins();
    TuRotaryEncoder encoder;
    encoder.begin(2, 3);
    encoder.setReversed(true);
    forward(encoder);
    assert(encoder.position() == -1 && encoder.direction() == -1);
    backward(encoder);
    assert(encoder.position() == 0 && encoder.direction() == 1);
    encoder.setReversed(false);
    ab(encoder, 1); ab(encoder, 0);
    encoder.setReversed(true); // Discard partial step when convention changes.
    ab(encoder, 2); ab(encoder, 3);
    assert(encoder.position() == 0);
    resetPins();
    encoder.begin(2, 3);
    encoder.setReversed(false);
    encoder.setPosition(LONG_MAX);
    forward(encoder);
    assert(encoder.position() == LONG_MAX && encoder.direction() == 1);
    backward(encoder); assert(encoder.position() == LONG_MAX - 1);
    encoder.setPosition(LONG_MIN);
    backward(encoder);
    assert(encoder.position() == LONG_MIN && encoder.direction() == -1);
    forward(encoder); assert(encoder.position() == LONG_MIN + 1);
}

static void buttonDebounce() {
    resetPins();
    TuRotaryEncoder encoder;
    encoder.begin(2, 3, 4);
    pins[4] = LOW;
    encoder.update();
    clockMs = 19; encoder.update();
    assert(!encoder.pressed() && !encoder.justPressed());
    clockMs = 20; encoder.update();
    assert(encoder.pressed() && encoder.justPressed() && !encoder.justReleased());
    assert(encoder.justPressed());
    encoder.update();
    assert(encoder.pressed() && !encoder.justPressed());
    clockMs = 30; pins[4] = HIGH; encoder.update();
    clockMs = 35; pins[4] = LOW; encoder.update();
    clockMs = 40; pins[4] = HIGH; encoder.update();
    clockMs = 59; encoder.update(); assert(encoder.pressed());
    clockMs = 60; encoder.update();
    assert(!encoder.pressed() && encoder.justReleased() && !encoder.justPressed());
    encoder.update(); assert(!encoder.justReleased());

    resetPins();
    pins[4] = LOW;
    encoder.begin(2, 3, 4);
    assert(encoder.pressed() && !encoder.justPressed());
    encoder.update(); assert(!encoder.justPressed());
}

static void buttonRollover() {
    resetPins();
    TuRotaryEncoder encoder;
    encoder.begin(2, 3, 4);
    clockMs = 0xfffffff0UL;
    pins[4] = LOW; encoder.update();
    clockMs = 3; encoder.update(); assert(!encoder.pressed());
    clockMs = 4; encoder.update();
    assert(encoder.pressed() && encoder.justPressed());
}

int main() {
    basicAndBounce();
    invalidTransitionAndModes();
    reversalAndLimits();
    buttonDebounce();
    buttonRollover();
    puts("PASS: quadrature, bounce, invalid transitions, modes, reversal, limits, button debounce and millis rollover");
    return 0;
}
