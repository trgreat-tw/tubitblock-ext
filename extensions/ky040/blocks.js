/* eslint-disable func-style */
/* eslint-disable require-jsdoc */
function registerBlocks (Blockly) {
    const colour = '#1D4ED8';
    const secondaryColour = '#15389C';
    const message = (key, fallback) => Blockly.Msg[key] || fallback;
    const encoderId = () => ({
        type: 'field_input', name: 'ID', text: '1'
    });

    // Read the active device's input menu when a block is instantiated. No
    // interrupt-capable pins are required by this polling implementation.
    const pinsForCurrentDevice = () => {
        let pins;
        try {
            pins = Blockly.Device.getPinOptions('arduino_pin_readDigitalPin');
        } catch (error) {
            // Some older device packages only expose the digital-output menu.
            pins = Blockly.Device.getPinOptions('arduino_pin_setDigitalOutput');
        }
        if (!Array.isArray(pins) || !pins.length) {
            throw new Error(message('KY040_NO_PINS', 'Select an Arduino or ESP32 device first.'));
        }
        return pins.map(option => [String(option[0]), String(option[1])]);
    };
    const register = (opcode, key, fallback, args, shape, tooltipKey) => {
        Blockly.Blocks[opcode] = {
            init: function () {
                this.jsonInit({
                    message0: message(key, fallback),
                    args0: typeof args === 'function' ? args() : args,
                    colour: colour,
                    secondaryColour: secondaryColour,
                    extensions: [shape],
                    tooltip: tooltipKey ? message(tooltipKey, '') : ''
                });
            }
        };
    };

    register('ky040_begin', 'KY040_BEGIN',
        'rotary encoder %1 initialize CLK %2 DT %3 SW %4 multiplier %5', () => {
            const pins = pinsForCurrentDevice();
            const deviceId = String(Blockly.Device.getDeviceId ? Blockly.Device.getDeviceId() : '');
            const preferred = /esp32/i.test(deviceId) ? ['23', '15', '12'] : ['2', '3', '4'];
            const defaults = [];
            preferred.forEach(pin => {
                const available = pins.find(option => option[1] === pin && defaults.indexOf(pin) < 0);
                const alternate = pins.find(option => defaults.indexOf(option[1]) < 0);
                defaults.push(available ? available[1] : alternate ? alternate[1] : '-1');
            });
            const prioritize = value => pins.filter(option => option[1] === value)
                .concat(pins.filter(option => option[1] !== value));
            const buttonPins = prioritize(defaults[2]);
            const noButton = [message('KY040_NO_BUTTON', 'none'), '-1'];
            if (defaults[2] === '-1') buttonPins.unshift(noButton);
            else buttonPins.push(noButton);
            return [encoderId(),
                {type: 'field_dropdown', name: 'CLK', options: prioritize(defaults[0])},
                {type: 'field_dropdown', name: 'DT', options: prioritize(defaults[1])},
                {type: 'field_dropdown', name: 'SW', options: buttonPins},
                // Keep the stored transitions-per-count field for old projects.
                // One quadrature cycle has four transitions: multiplier = 4 / value.
                {type: 'field_dropdown', name: 'TRANSITIONS', options: [
                    [message('KY040_MULTIPLIER_1', '1x'), '4'],
                    [message('KY040_MULTIPLIER_2', '2x'), '2'],
                    [message('KY040_MULTIPLIER_4', '4x'), '1']
                ]}
            ];
        }, 'shape_statement', 'KY040_BEGIN_TOOLTIP');
    register('ky040_update', 'KY040_UPDATE', 'encoder %1 update',
        () => [encoderId()], 'shape_statement', 'KY040_UPDATE_TOOLTIP');
    register('ky040_position', 'KY040_POSITION', 'read %1 rotary encoder count value',
        () => [encoderId()], 'output_number');
    register('ky040_direction', 'KY040_DIRECTION', 'read %1 rotary encoder direction value (-1/0/1)',
        () => [encoderId()], 'output_number', 'KY040_DIRECTION_TOOLTIP');
    register('ky040_pressed', 'KY040_PRESSED', 'read %1 rotary encoder button value',
        () => [encoderId()], 'output_boolean');
    register('ky040_justPressed', 'KY040_JUST_PRESSED', 'read %1 rotary encoder newly pressed value',
        () => [encoderId()], 'output_boolean', 'KY040_EVENT_TOOLTIP');
    register('ky040_justReleased', 'KY040_JUST_RELEASED', 'read %1 rotary encoder newly released value',
        () => [encoderId()], 'output_boolean', 'KY040_EVENT_TOOLTIP');
    register('ky040_setPosition', 'KY040_SET_POSITION', 'encoder %1 set position %2',
        () => [encoderId(), {type: 'input_value', name: 'POSITION', check: 'Number'}], 'shape_statement');
    register('ky040_setReversed', 'KY040_SET_REVERSED', 'encoder %1 reverse direction %2',
        () => [encoderId(), {type: 'field_dropdown', name: 'REVERSED', options: [
            [message('KY040_OFF', 'off'), 'false'], [message('KY040_ON', 'on'), 'true']
        ]}], 'shape_statement');
    register('ky040_rotated', 'KY040_ROTATED', 'read %1 rotary encoder movement value for direction %2',
        () => [encoderId(), {type: 'field_dropdown', name: 'DIRECTION', options: [
            [message('KY040_POSITIVE', 'positive (+1)'), '1'],
            [message('KY040_NEGATIVE', 'negative (-1)'), '-1']
        ]}], 'output_boolean', 'KY040_EVENT_TOOLTIP');
    return Blockly;
}

exports = registerBlocks;
