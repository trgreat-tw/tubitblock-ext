/* eslint-disable func-style, require-jsdoc */
function registerBlocks (Blockly) {
    const colour = '#4D7C0F', secondaryColour = '#37590B';
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

    const level = () => ({type: 'field_dropdown', name: 'LEVEL', options: [[msg('KITSWITCH_LOW', 'LOW'), 'LOW'], [msg('KITSWITCH_HIGH', 'HIGH'), 'HIGH']]});
    const pullup = () => ({type: 'field_dropdown', name: 'PULLUP', options: [[msg('KITSWITCH_ON', 'on'), 'true'], [msg('KITSWITCH_OFF', 'off'), 'false']]});
    const debounce = () => ({type: 'field_dropdown', name: 'DEBOUNCE', options: [["20", "20"], ["0", "0"], ["5", "5"], ["50", "50"]]});
    register('kitSwitch_begin', 'KITSWITCH_BEGIN', "switch %1 initialize type %2 pin %3 active level %4", () => [id(), {type: 'field_dropdown', name: 'TYPE', options: [[msg('KITSWITCH_TILT', 'tilt module'), 'tilt'], [msg('KITSWITCH_MERCURY', 'mercury module'), 'mercury'], [msg('KITSWITCH_REED', 'reed module'), 'reed']]}, pins('PIN', false), level()], 'shape_statement', 'KITSWITCH_BEGIN_TIP');
    register('kitSwitch_update', 'KITSWITCH_UPDATE', 'switch sensor %1 update', () => [id()], 'shape_statement', 'KITSWITCH_UPDATE_TIP');
    register('kitSwitch_active', 'KITSWITCH_ACTIVE', 'sensor %1 switch active?', () => [id()], 'output_boolean', 'KITSWITCH_READ_TIP');
    register('kitSwitch_justActivated', 'KITSWITCH_JUST_ACTIVATED', 'read %1 switch sensor newly active value', () => [id()], 'output_boolean', 'KITSWITCH_READ_TIP');
    register('kitSwitch_justReleased', 'KITSWITCH_JUST_RELEASED', 'read %1 switch sensor newly released value', () => [id()], 'output_boolean', 'KITSWITCH_READ_TIP');
    register('kitSwitch_raw', 'KITSWITCH_RAW', 'read %1 switch sensor raw value (0/1)', () => [id()], 'output_number', 'KITSWITCH_READ_TIP');

    return Blockly;
}
exports = registerBlocks;
