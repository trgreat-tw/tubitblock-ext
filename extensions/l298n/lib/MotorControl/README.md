# Tubit Motor Control

Controls one brushed DC motor through a two-input H-bridge motor driver.
The motor's red and black wires connect to the driver's MA and MB output
terminals on the same channel. The Arduino's selected MA and MB control
pins connect to that channel's two driver inputs; do not connect the motor
directly to Arduino GPIO pins. Follow the driver's power and ground wiring.
For L298N, keep that channel's enable jumper installed.

The Nano defaults are MA = D2 and MB = D3. Select two different output-capable
control pins. PWM is optional. Analog pins that support digital output (Nano
A0–A5) are supported; input-only pins such as Nano A6/A7 cannot drive a motor
driver. A duplicate pin selection stops the motor.

```cpp
#include <MotorControl.h>
MotorControl motor(2, 3);

void setup() {
    motor.begin();
    motor.run(MOTOR_CONTROL_FORWARD, 180);
}

void loop() {}
```

`begin()` configures the control pins and stops the motor. Forward drives MA
and holds MB LOW; backward swaps the outputs. PWM-capable pins support speed
control. AVR non-PWM pins (including Nano D2) output HIGH for every positive
speed and LOW for zero, providing full-speed direction and stop control.
`stop()` sets both LOW.
Speed is clamped to 0–255; a negative speed reverses the requested direction.
Both outputs are set LOW before applying a new direction.
