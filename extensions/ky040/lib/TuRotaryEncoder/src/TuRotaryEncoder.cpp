#include "TuRotaryEncoder.h"
#include <limits.h>
#if defined(ARDUINO_ARCH_ESP32)
#include <new>
#endif

TuRotaryEncoder::TuRotaryEncoder()
    : _clk(0), _dt(0), _sw(-1), _transitionsPerStep(4),
      _previousAB(0), _accumulator(0), _direction(0), _position(0),
      _begun(false), _reversed(false), _rawPressed(false),
      _pressed(false), _justPressed(false), _justReleased(false),
      _buttonChangedAt(0)
#if defined(ARDUINO_ARCH_ESP32)
      , _native(nullptr), _lastNativeCount(0)
#endif
      {}

TuRotaryEncoder::~TuRotaryEncoder() {
#if defined(ARDUINO_ARCH_ESP32)
    endNative();
#endif
}

#if defined(ARDUINO_ARCH_ESP32)
void IRAM_ATTR TuRotaryEncoder::handleInterrupt(void *context) {
    TuRotaryEncoder *encoder = static_cast<TuRotaryEncoder *>(context);
    // The upstream read/reset APIs do not share its private ISR mutex.
    // Serialize all accesses with this per-instance outer mutex.
    portENTER_CRITICAL_ISR(&encoder->_interruptMux);
    if (encoder->_native) encoder->_native->readEncoder_ISR();
    portEXIT_CRITICAL_ISR(&encoder->_interruptMux);
}

void TuRotaryEncoder::endNative() {
    if (!_native) return;
    detachInterrupt(digitalPinToInterrupt(_clk));
    detachInterrupt(digitalPinToInterrupt(_dt));
    portENTER_CRITICAL(&_interruptMux);
    AiEsp32RotaryEncoder *previous = _native;
    _native = nullptr;
    portEXIT_CRITICAL(&_interruptMux);
    delete previous;
}
#endif

uint8_t TuRotaryEncoder::readAB() const {
    return (digitalRead(_clk) == HIGH ? 2 : 0) |
           (digitalRead(_dt) == HIGH ? 1 : 0);
}

void TuRotaryEncoder::begin(uint8_t clk, uint8_t dt, int16_t sw,
                            uint8_t transitionsPerStep) {
    _begun = false;
#if defined(ARDUINO_ARCH_ESP32)
    endNative();
#endif
    _clk = clk;
    _dt = dt;
    _sw = (sw >= 0 && sw <= 255) ? sw : -1;
    _transitionsPerStep = (transitionsPerStep == 1 || transitionsPerStep == 2)
        ? transitionsPerStep : 4;
    pinMode(_clk, INPUT_PULLUP);
    pinMode(_dt, INPUT_PULLUP);
    _previousAB = readAB();
    _accumulator = 0;
    _direction = 0;
    _position = 0;
    _justPressed = false;
    _justReleased = false;
    if (_sw >= 0) {
        pinMode(static_cast<uint8_t>(_sw), INPUT_PULLUP);
        _rawPressed = digitalRead(static_cast<uint8_t>(_sw)) == LOW;
    } else {
        _rawPressed = false;
    }
    // A button held during startup is already pressed, without a false edge.
    _pressed = _rawPressed;
    _buttonChangedAt = static_cast<uint32_t>(millis());
#if defined(ARDUINO_ARCH_ESP32)
    // Swapping upstream A/B preserves the existing positive CLK/DT sequence.
    // Pull-ups match the kit module; button events remain nonblocking below.
    _native = new (std::nothrow) AiEsp32RotaryEncoder(
        _dt, _clk, -1, -1, _transitionsPerStep, false);
    if (!_native) return;
    _native->begin();
    _native->disableAcceleration();
    _native->correctionOffset = 0;
    // Upstream scales limits by steps, and adds before testing its limits.
    // Leave a full count of raw headroom to prevent signed overflow.
    const long limit = LONG_MAX / _transitionsPerStep - 1;
    _native->setBoundaries(-limit, limit, false);
    _native->reset(0);
    _lastNativeCount = 0;
    attachInterruptArg(digitalPinToInterrupt(_clk), handleInterrupt, this, CHANGE);
    attachInterruptArg(digitalPinToInterrupt(_dt), handleInterrupt, this, CHANGE);
#endif
    _begun = true;
}

void TuRotaryEncoder::setPosition(long value) {
#if defined(ARDUINO_ARCH_ESP32)
    if (_native) {
        // Discard motion accumulated before the user set the count, including
        // interrupts received since the last loop update.
        portENTER_CRITICAL(&_interruptMux);
        _native->reset(0);
        _lastNativeCount = 0;
        _position = value;
        portEXIT_CRITICAL(&_interruptMux);
        return;
    }
#endif
    _position = value;
}

void TuRotaryEncoder::setReversed(bool reversed) {
    if (_reversed != reversed) {
        _reversed = reversed;
        // Do not combine partial movement from two direction conventions.
        _accumulator = 0;
#if defined(ARDUINO_ARCH_ESP32)
        if (_native) {
            portENTER_CRITICAL(&_interruptMux);
            _native->reset(0);
            _lastNativeCount = 0;
            portEXIT_CRITICAL(&_interruptMux);
        }
#endif
    }
}

void TuRotaryEncoder::update() {
    _direction = 0;
    _justPressed = false;
    _justReleased = false;
    if (!_begun) return;

#if defined(ARDUINO_ARCH_ESP32)
    portENTER_CRITICAL(&_interruptMux);
    const long nativeCount = _native->readEncoder();
    portEXIT_CRITICAL(&_interruptMux);
    const int64_t delta = static_cast<int64_t>(nativeCount) - _lastNativeCount;
    _lastNativeCount = nativeCount;
    if (delta != 0) {
        _direction = (delta > 0) != _reversed ? 1 : -1;
        const int64_t next = static_cast<int64_t>(_position) + (_reversed ? -delta : delta);
        _position = next > LONG_MAX ? LONG_MAX : next < LONG_MIN ? LONG_MIN : static_cast<long>(next);
    }
#else
    // Positive sequence (CLK,DT): 11 -> 01 -> 00 -> 10 -> 11.
    // A contact bounce retraces a valid edge and cancels its partial movement.
    static const int8_t transition[16] = {
         0, -1,  1,  0,
         1,  0,  0, -1,
        -1,  0,  0,  1,
         0,  1, -1,  0
    };
    const uint8_t ab = readAB();
    if ((_previousAB ^ ab) == 3) {
        // Both signals changed: sampling missed an edge. Resynchronize.
        _accumulator = 0;
    } else {
        _accumulator += transition[(_previousAB << 2) | ab];
        if (_accumulator >= static_cast<int8_t>(_transitionsPerStep)) {
            _direction = _reversed ? -1 : 1;
            _accumulator = 0;
        } else if (_accumulator <= -static_cast<int8_t>(_transitionsPerStep)) {
            _direction = _reversed ? 1 : -1;
            _accumulator = 0;
        }
        // Saturate instead of invoking signed-overflow undefined behavior.
        if (_direction > 0 && _position < LONG_MAX) ++_position;
        if (_direction < 0 && _position > LONG_MIN) --_position;
    }
    _previousAB = ab;
#endif

    if (_sw >= 0) {
        const uint32_t now = static_cast<uint32_t>(millis());
        const bool raw = digitalRead(static_cast<uint8_t>(_sw)) == LOW;
        if (raw != _rawPressed) {
            _rawPressed = raw;
            _buttonChangedAt = now;
        }
        // uint32_t subtraction intentionally handles the millis() rollover.
        if (_rawPressed != _pressed &&
            static_cast<uint32_t>(now - _buttonChangedAt) >= 20U) {
            _pressed = _rawPressed;
            _justPressed = _pressed;
            _justReleased = !_pressed;
        }
    }
}
