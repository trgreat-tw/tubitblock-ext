/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerGenerators (Blockly) {
    // All PS4 blocks use the user-verified reconnect library.
    const controller = () => {
        Blockly.Arduino.includes_.esp32_ps4r = '#include <PS4ControllerReconnect.h>';
        return 'PS4R';
    };

    Blockly.Arduino.ps4_controller_init = function (block) {
        const target = controller();
        const mac = Blockly.Arduino.valueToCode(block, 'MAC', Blockly.Arduino.ORDER_ATOMIC) || '"00:00:00:00:00:00"';
        const begin = mac === '"00:00:00:00:00:00"' ? target + '.begin();' : target + '.begin(' + mac + ');';
        Blockly.Arduino.setups_.begin = target + '.setClearBondsOnStart(true);\n  ' + begin;
        return '';
    };

    Blockly.Arduino.ps4_controller_isConnected = function (block) {
        const code = `${controller(block)}.isConnected()`;
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }


    Blockly.Arduino.ps4_controller_getJoystick = function (block) {
        const joystick = this.getFieldValue('JOYSTICK');
        const code = `${controller(block)}.${joystick}()`;
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }

    Blockly.Arduino.ps4_controller_isPressed = function (block) {
        const button = this.getFieldValue('BUTTON');
        // The legacy stored value is TouchPad; the C++ API spells it Touchpad.
        const method = button === 'TouchPad' ? 'Touchpad' : button;
        const code = `${controller(block)}.${method}()`;
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }

    Blockly.Arduino.ps4_controller_setLED = function (block) {
        const led_red = Blockly.Arduino.valueToCode(block, 'LED_RED', Blockly.Arduino.ORDER_ATOMIC) || '255';
        const led_green = Blockly.Arduino.valueToCode(block, 'LED_GREEN', Blockly.Arduino.ORDER_ATOMIC) || '255';
        const led_blue = Blockly.Arduino.valueToCode(block, 'LED_BLUE', Blockly.Arduino.ORDER_ATOMIC) || '255';
        const target = controller(block);
        const code = `${target}.setLed(${led_red}, ${led_green}, ${led_blue});\n${target}.sendToController();\ndelay(10);\n`;

        return code;
    }

    Blockly.Arduino.ps4_controller_setRumble = function (block) {
        const rumble = Blockly.Arduino.valueToCode(block, 'RUMBLE', Blockly.Arduino.ORDER_ATOMIC) || '255';
        const target = controller(block);
        const code = `${target}.setRumble(0, ${rumble});\n${target}.sendToController();\ndelay(10);\n${target}.setRumble(0, 0);\n${target}.sendToController();\ndelay(10);\n`;
        return code;
    }

    Blockly.Arduino.ps4_controller_getAddress = function (block) {
        const code = `${controller(block)}.getAddress()`;
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }

    Blockly.Arduino.ps4_controller_getbattery = function (block) {
        const code = `${controller(block)}.Battery()`;
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }

    return Blockly;
}

exports = registerGenerators;
