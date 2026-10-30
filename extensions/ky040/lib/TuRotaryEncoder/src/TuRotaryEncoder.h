#ifndef TU_ROTARY_ENCODER_H
#define TU_ROTARY_ENCODER_H

#include <Arduino.h>
#if defined(ARDUINO_ARCH_ESP32)
#include <AiEsp32RotaryEncoder.h>
#endif

// ESP32: AiEsp32RotaryEncoder handles CLK/DT interrupts per instance.
// Other Arduino boards: poll CLK/DT from loop as frequently as possible.
// update() publishes movement and debounces the button on both backends.
class TuRotaryEncoder {
public:
    TuRotaryEncoder();
    ~TuRotaryEncoder();
    TuRotaryEncoder(const TuRotaryEncoder &) = delete;
    TuRotaryEncoder &operator=(const TuRotaryEncoder &) = delete;

    // sw = -1 disables the button. Valid transitionsPerStep values: 1, 2, 4.
    // All connected inputs use INPUT_PULLUP; SW is pressed when LOW.
    void begin(uint8_t clk, uint8_t dt, int16_t sw = -1,
               uint8_t transitionsPerStep = 4);
    void update();

    long position() const { return _position; }
    // Result from the most recent update: -1, 0, or +1.
    int8_t direction() const { return _direction; }
    bool pressed() const { return _pressed; }
    bool justPressed() const { return _justPressed; }
    bool justReleased() const { return _justReleased; }

    void setPosition(long value);
    void setReversed(bool reversed);

private:
    uint8_t readAB() const;

    uint8_t _clk;
    uint8_t _dt;
    int16_t _sw;
    uint8_t _transitionsPerStep;
    uint8_t _previousAB;
    int8_t _accumulator;
    int8_t _direction;
    long _position;
    bool _begun;
    bool _reversed;
    bool _rawPressed;
    bool _pressed;
    bool _justPressed;
    bool _justReleased;
    uint32_t _buttonChangedAt;
#if defined(ARDUINO_ARCH_ESP32)
    static void IRAM_ATTR handleInterrupt(void *context);
    void endNative();
    AiEsp32RotaryEncoder *_native;
    long _lastNativeCount;
    portMUX_TYPE _interruptMux = portMUX_INITIALIZER_UNLOCKED;
#endif
};

#endif
