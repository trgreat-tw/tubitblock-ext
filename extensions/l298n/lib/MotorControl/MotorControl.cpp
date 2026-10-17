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
    analogWrite(_pinMA, 0);
    analogWrite(_pinMB, 0);

    if (direction == MOTOR_CONTROL_BACKWARD) {
        analogWrite(_pinMB, static_cast<int>(output));
    } else {
        analogWrite(_pinMA, static_cast<int>(output));
    }
}

void MotorControl::stop() {
    analogWrite(_pinMA, 0);
    analogWrite(_pinMB, 0);
}
