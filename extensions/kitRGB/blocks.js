/* eslint-disable func-style */
/* eslint-disable require-jsdoc */
function registerBlocks (Blockly) {
    const colour = '#A21CAF';
    const secondaryColour = '#75147E';
    const message = key => Blockly.Msg[key] || key;
    const id = () => ({type: 'field_input', name: 'ID', text: '1'});
    const choice = (name, options) => ({type: 'field_dropdown', name, options: options.map(option => [message(option[0]), option[1]])});
    const number = name => ({type: 'input_value', name, check: 'Number'});
    const pins = (name, offset, rgb) => {
        const device = String(Blockly.Device.getDeviceId ? Blockly.Device.getDeviceId() : '');
        const esp = /esp32/i.test(device);
        let options = Blockly.Device.getPinOptions('arduino_pin_setDigitalOutput').map(option => [String(option[0]), String(option[1])]);
        if (rgb && !esp) {
            const allowed = /mega2560/i.test(device) ? ['2','3','4','5','6','7','8','9','10','11','12','13','44','45','46'] :
                /leonardo/i.test(device) ? ['3','5','6','9','10','11','13'] : ['3','5','6','9','10','11'];
            const pwm = options.filter(option => allowed.indexOf(option[1]) >= 0);
            if (pwm.length) options = pwm;
        }
        if (!options.length) throw new Error(message('KITRGB_NO_PINS'));
        const preferred = (esp ? ['23','15','12','5','2','0'] : rgb ? ['5','6','9'] : ['2','3','4'])[offset];
        const selected = options.find(option => option[1] === preferred) || options[offset % options.length];
        return {type: 'field_dropdown', name, options: [selected].concat(options.filter(option => option[1] !== selected[1]))};
    };
    const register = (opcode, key, args, shape, tooltip) => {
        Blockly.Blocks[opcode] = {init: function () {
            this.jsonInit({message0: message(key), args0: args(), colour, secondaryColour,
                extensions: [shape], tooltip: tooltip ? message(tooltip) : ''});
        }};
    };
    register('kitRGB_begin', 'KITRGB_BEGIN', () => [id(), pins('RED',0,true), pins('GREEN',1,true), pins('BLUE',2,true), choice('MODE',[['KITRGB_CATHODE','false'],['KITRGB_ANODE','true']])], 'shape_statement', 'KITRGB_BEGIN_TIP');
    register('kitRGB_color', 'KITRGB_COLOR', () => [id(), number('R'), number('G'), number('B')], 'shape_statement', 'KITRGB_COLOR_TIP');
    register('kitRGB_off', 'KITRGB_OFF', () => [id()], 'shape_statement');
    register('kitRGB_ready', 'KITRGB_READY', () => [id()], 'output_boolean');
    return Blockly;
}
exports = registerBlocks;
