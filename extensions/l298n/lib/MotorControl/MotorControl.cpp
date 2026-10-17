#include "MotorControl.h"

MotorControl::MotorControl(uint8_t pinMA, uint8_t pinMB) :
    _pinMA(pinMA),
    _pinMB(pinMB) {}

void MotorControl::begin() {
    pinMode(_pinMA, OUTPUT);
    pinMode(_pinMB, OUTPUT);
    stop();
}

void MotorControl::run(int direction, int speed) {
    if (_pinMA == _pinMB) {
        stop();
        return;
    }
    long output = speed;
    if (output < 0) {
        // Clamp before negation, including the minimum signed int on ESP targets.
        output = output < -255L ? 255L : -output;
        direction = -direction;
    }
    output = constrain(output, 0L, 255L);

    // Disable both sides before changing direction to avoid a brief overlap.
    writeOutput(_pinMA, 0);
    writeOutput(_pinMB, 0);

    if (direction == MOTOR_CONTROL_BACKWARD) {
        writeOutput(_pinMB, static_cast<uint8_t>(output));
    } else {
        writeOutput(_pinMA, static_cast<uint8_t>(output));
    }
}

void MotorControl::stop() {
    writeOutput(_pinMA, 0);
    writeOutput(_pinMB, 0);
}

void MotorControl::writeOutput(uint8_t pin, uint8_t value) {
#if defined(ARDUINO_ARCH_AVR) && defined(digitalPinHasPWM)
    // AVR analogWrite otherwise turns non-PWM pins OFF for speeds below 128.
    if (!digitalPinHasPWM(pin)) {
        digitalWrite(pin, value > 0 ? HIGH : LOW);
        return;
    }
#endif
    analogWrite(pin, value);
}
