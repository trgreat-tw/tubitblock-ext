#include <TuRotaryEncoder.h>

// KY-040: + -> 5V, GND -> GND, CLK -> D2, DT -> D3, SW -> D4.
TuRotaryEncoder encoder;
long lastPosition = 0;

void setup() {
    Serial.begin(115200);
    encoder.begin(2, 3, 4, 4);
    // If the observed direction is reversed, use encoder.setReversed(true).
    Serial.println("KY-040 ready");
}

void loop() {
    encoder.update();
    const long current = encoder.position();
    if (current != lastPosition) {
        lastPosition = current;
        Serial.print("Position: ");
        Serial.println(current);
    }
    if (encoder.justPressed()) Serial.println("Button pressed");
    if (encoder.justReleased()) Serial.println("Button released");
    // Keep loop fast; delay() and other blocking work can lose rotary steps.
}
