/* eslint-disable func-style */
/* eslint-disable require-jsdoc */
function registerBlocks (Blockly) {
    const colour = '#6D28D9';
    const secondaryColour = '#4E1D9C';
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
        if (!options.length) throw new Error(message('KITBUZZER_NO_PINS'));
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
    register('kitBuzzer_begin', 'KITBUZZER_BEGIN', () => [id(), pins('PIN',0,false), choice('TYPE',[['KITBUZZER_PASSIVE','true'],['KITBUZZER_ACTIVE','false']]), choice('LEVEL',[['KITBUZZER_HIGH','true'],['KITBUZZER_LOW','false']])], 'shape_statement', 'KITBUZZER_BEGIN_TIP');
    register('kitBuzzer_active', 'KITBUZZER_ACTIVE_WRITE', () => [id(), choice('STATE',[['KITBUZZER_ON','true'],['KITBUZZER_OFF','false']])], 'shape_statement', 'KITBUZZER_ACTIVE_TIP');
    register('kitBuzzer_note', 'KITBUZZER_NOTE', () => [id(),
        choice('OCTAVE',[['KITBUZZER_OCTAVE_MIDDLE','4'],['KITBUZZER_OCTAVE_LOW','3'],['KITBUZZER_OCTAVE_HIGH','5']]),
        choice('NOTE',[
            ['KITBUZZER_NOTE_DO','C'],['KITBUZZER_NOTE_DO_SHARP','C#'],
            ['KITBUZZER_NOTE_RE','D'],['KITBUZZER_NOTE_RE_SHARP','D#'],
            ['KITBUZZER_NOTE_MI','E'],['KITBUZZER_NOTE_FA','F'],
            ['KITBUZZER_NOTE_FA_SHARP','F#'],['KITBUZZER_NOTE_SOL','G'],
            ['KITBUZZER_NOTE_SOL_SHARP','G#'],['KITBUZZER_NOTE_LA','A'],
            ['KITBUZZER_NOTE_LA_SHARP','A#'],['KITBUZZER_NOTE_SI','B']
        ])], 'shape_statement', 'KITBUZZER_NOTE_TIP');
    register('kitBuzzer_tone', 'KITBUZZER_TONE', () => [id(), number('FREQUENCY')], 'shape_statement', 'KITBUZZER_TONE_TIP');
    register('kitBuzzer_stop', 'KITBUZZER_STOP', () => [id()], 'shape_statement');
    register('kitBuzzer_playing', 'KITBUZZER_PLAYING', () => [id()], 'output_boolean');
    register('kitBuzzer_ready', 'KITBUZZER_READY', () => [id()], 'output_boolean');
    return Blockly;
}
exports = registerBlocks;
