/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerBlocks (Blockly) {
    const color = '#FF6F00';
    const secondaryColour = '#FF4F00';

    const digitalPins = Blockly.Device.getPinOptions('arduino_pin_setDigitalOutput');

    const pwmPins = Blockly.Device.getPinOptions('arduino_pin_setPwmOutput');

    const prioritizePwmPin = (pin, fallbackIndex) => {
        const matchingPins = pwmPins.filter(option => String(option[1]) === pin);
        const otherPins = pwmPins.filter(option => String(option[1]) !== pin);
        if (matchingPins.length) return matchingPins.concat(otherPins);
        if (pwmPins.length > fallbackIndex) {
            return [pwmPins[fallbackIndex]].concat(pwmPins.filter((option, index) => index !== fallbackIndex));
        }
        return pwmPins;
    };

    Blockly.Blocks.motor_control_init = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.MOTOR_CONTROL_INIT,
                args0: [
                    {
                        type: 'field_dropdown',
                        name: 'MA',
                        options: prioritizePwmPin('5', 0)
                    },
                    {
                        type: 'field_dropdown',
                        name: 'MB',
                        options: prioritizePwmPin('6', 1)
                    }
                ],
                tooltip: Blockly.Msg.MOTOR_CONTROL_INIT_TOOLTIP,
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.motor_control_run = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.MOTOR_CONTROL_RUN,
                args0: [
                    {
                        type: 'field_dropdown',
                        name: 'DIR',
                        options: [
                            [Blockly.Msg.MOTOR_CONTROL_FORWARD, 'MOTOR_CONTROL_FORWARD'],
                            [Blockly.Msg.MOTOR_CONTROL_BACKWARD, 'MOTOR_CONTROL_BACKWARD']
                        ]
                    },
                    {
                        type: 'input_value',
                        name: 'SPEED'
                    }
                ],
                tooltip: Blockly.Msg.MOTOR_CONTROL_RUN_TOOLTIP,
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.motor_control_stop = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.MOTOR_CONTROL_STOP,
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    // Keep the original L298N blocks registered so saved projects that use
    // the former EN/IN1/IN2 interface can still be opened and generated.
    Blockly.Blocks.l298n_init = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.L298N_INIT,
                args0: [
                    {
                        type: 'input_value',
                        name: 'CH'
                    },
                    {
                        type: 'field_dropdown',
                        name: 'IN1',
                        options: digitalPins
                    },
                    {
                        type: 'field_dropdown',
                        name: 'IN2',
                        options: digitalPins
                    },
                    {
                        type: 'field_dropdown',
                        name: 'EN',
                        options: pwmPins
                    }
                ],
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.l298n_run = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.L298N_RUN,
                args0: [
                    {
                        type: 'input_value',
                        name: 'CH'
                    },
                    {
                        type: 'field_dropdown',
                        name: 'DIR',
                        options: [
                            [Blockly.Msg.L298N_FORWARD, 'L298N_FORWARD'],
                            [Blockly.Msg.L298N_BACK, 'L298N_BACKWARD']]
                    },
                    {
                        type: 'input_value',
                        name: 'SPEED'
                    }
                ],
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.l298n_stop = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.L298N_STOP,
                args0: [
                    {
                        type: 'input_value',
                        name: 'CH'
                    }
                ],
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };


    return Blockly;
}

exports = registerBlocks;
