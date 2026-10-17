#ifndef TUBIT_MOTOR_CONTROL_H
#define TUBIT_MOTOR_CONTROL_H

#include <Arduino.h>

#define MOTOR_CONTROL_FORWARD 1
#define MOTOR_CONTROL_BACKWARD -1

class MotorControl {
public:
    MotorControl(uint8_t pinMA, uint8_t pinMB);

    void begin();
    void run(int direction, int speed);
    void stop();

private:
    void writeOutput(uint8_t pin, uint8_t value);

    uint8_t _pinMA;
    uint8_t _pinMB;
};

#endif
