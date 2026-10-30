/* eslint-disable func-style, require-jsdoc */
function registerBlocks (Blockly) {
    const colour = '#0F766E', secondaryColour = '#0B554F';
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

    const axis = () => ({type: 'field_dropdown', name: 'AXIS', options: [['X', 'X'], ['Y', 'Y']]});
    register('kitJoystick_begin', 'KITJOYSTICK_BEGIN', 'joystick %1 initialize X %2 Y %3 SW %4', () => {
        const sw=pins('SW',false); sw.options.push([msg('KITJOYSTICK_NONE','none'),'-1']);
        return [id(),pins('XPIN',true,false),pins('YPIN',true,true),sw];
    }, 'shape_statement', 'KITJOYSTICK_BEGIN_TIP');
    register('kitJoystick_update','KITJOYSTICK_UPDATE','joystick %1 update',()=>[id()],'shape_statement','KITJOYSTICK_UPDATE_TIP');
    register('kitJoystick_raw','KITJOYSTICK_RAW','joystick %1 axis %2 raw value',()=>[id(),axis()],'output_number');
    register('kitJoystick_percent','KITJOYSTICK_PERCENT','read %1 joystick axis %2 value (0–100) reversed %3',()=>[id(),axis(),{type:'field_dropdown',name:'REVERSED',options:[[msg('KITJOYSTICK_OFF','off'),'false'],[msg('KITJOYSTICK_ON','on'),'true']]}],'output_number','KITJOYSTICK_PERCENT_TIP');
    register('kitJoystick_pressed','KITJOYSTICK_PRESSED','read %1 joystick button value',()=>[id()],'output_boolean');
    register('kitJoystick_justPressed','KITJOYSTICK_JUST_PRESSED','read %1 joystick newly pressed value',()=>[id()],'output_boolean','KITJOYSTICK_UPDATE_TIP');
    register('kitJoystick_justReleased','KITJOYSTICK_JUST_RELEASED','read %1 joystick newly released value',()=>[id()],'output_boolean','KITJOYSTICK_UPDATE_TIP');

    return Blockly;
}
exports = registerBlocks;
