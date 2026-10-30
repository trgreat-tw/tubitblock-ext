/* eslint-disable func-style, require-jsdoc */
function registerBlocks (Blockly) {
    const colour = '#0E7490', secondaryColour = '#0A5468';
    const msg = (key, fallback) => Blockly.Msg[key] || fallback;
    const id = () => ({type: 'field_input', name: 'ID', text: '1'});
    const isEsp32 = () => /esp32/i.test(String(Blockly.Device.getDeviceId ? Blockly.Device.getDeviceId() : ''));
    const pins = (name, analog, second) => {
        let options;
        try { options = Blockly.Device.getPinOptions(analog ? 'arduino_pin_readAnalogPin' : 'arduino_pin_readDigitalPin'); }
        catch (error) { options = Blockly.Device.getPinOptions('arduino_pin_setDigitalOutput'); }
        if (!Array.isArray(options) || !options.length) throw new Error((Blockly.Msg && Blockly.Msg.KITMODULE_ERROR_PIN) || 'Select a valid pin from the current device menu.');
        options = options.map(option => [String(option[0]), String(option[1])]);
        if (analog && isEsp32()) options = options.filter(option => /^(0|2|4|12|13|14|15|25|26|27|32|33|34|35|36|37|38|39)$/.test(option[1]));
        if (!options.length) throw new Error((Blockly.Msg && Blockly.Msg.KITMODULE_ERROR_PIN) || 'Select a valid pin from the current device menu.');
        const preferred = analog ? (isEsp32() ? (second ? ['12', '15', '2', '0'] : ['15', '12', '2', '0']) : (second ? ['A1', '1'] : ['A0', '0'])) : (isEsp32() ? ['23', '15', '12', '5', '2', '0'] : ['2', '3', '4']);
        const choice = preferred.find(pin => options.some(option => option[1] === pin));
        return {type: 'field_dropdown', name: name, options: options.filter(option => option[1] === choice).concat(options.filter(option => option[1] !== choice))};
    };
    const register = (opcode, key, fallback, args, shape, tooltip) => {
        Blockly.Blocks[opcode] = {init: function () {
            this.jsonInit({message0: msg(key, fallback), args0: args(), colour: colour,
                secondaryColour: secondaryColour, extensions: [shape], tooltip: tooltip ? msg(tooltip, '') : ''});
        }};
    };

    const level = () => ({type: 'field_dropdown', name: 'LEVEL', options: [[msg('KITLIGHTGATE_HIGH', 'HIGH'), 'HIGH'], [msg('KITLIGHTGATE_LOW', 'LOW'), 'LOW']]});
    const pullup = () => ({type: 'field_dropdown', name: 'PULLUP', options: [[msg('KITLIGHTGATE_ON', 'on'), 'true'], [msg('KITLIGHTGATE_OFF', 'off'), 'false']]});
    const debounce = () => ({type: 'field_dropdown', name: 'DEBOUNCE', options: [["0", "0"], ["5", "5"], ["20", "20"], ["50", "50"]]});
    register('kitLightGate_begin', 'KITLIGHTGATE_BEGIN', "sensor %1 begin pin %2 active %3", () => [id(), pins('PIN', false), level()], 'shape_statement', 'KITLIGHTGATE_BEGIN_TIP');
    register('kitLightGate_update', 'KITLIGHTGATE_UPDATE', 'light gate sensor %1 update', () => [id()], 'shape_statement', 'KITLIGHTGATE_UPDATE_TIP');
    register('kitLightGate_active', 'KITLIGHTGATE_ACTIVE', 'sensor %1 light blocked?', () => [id()], 'output_boolean', 'KITLIGHTGATE_READ_TIP');
    register('kitLightGate_justActivated', 'KITLIGHTGATE_JUST_ACTIVATED', 'read %1 light gate sensor newly active value', () => [id()], 'output_boolean', 'KITLIGHTGATE_READ_TIP');
    register('kitLightGate_justReleased', 'KITLIGHTGATE_JUST_RELEASED', 'read %1 light gate sensor newly released value', () => [id()], 'output_boolean', 'KITLIGHTGATE_READ_TIP');
    register('kitLightGate_raw', 'KITLIGHTGATE_RAW', 'read %1 light gate sensor raw value (0/1)', () => [id()], 'output_number', 'KITLIGHTGATE_READ_TIP');

    return Blockly;
}
exports = registerBlocks;
