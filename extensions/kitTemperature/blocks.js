function registerBlocks (Blockly) {
    const prefix = 'KITTEMPERATURE_';
    const msg = key => Blockly.Msg[prefix + key] || key;
    const isESP = () => /esp32/i.test(Blockly.Device.getDeviceId ? Blockly.Device.getDeviceId() : '');
    const id = () => ({type: 'field_input', name: 'ID', text: '1'});
    const pins = (kind, name, optional) => {
        const options = Blockly.Device.getPinOptions(kind === 'analog' ? 'arduino_pin_readAnalogPin' : 'arduino_pin_readDigitalPin')
            .map(option => [String(option[0]), String(option[1])]);
        if (!options.length) throw new Error((Blockly.Msg && Blockly.Msg.KITMODULE_ERROR_PIN) || 'Select a valid pin from the current device menu.');
        const preferred = isESP() ? (kind === 'analog' ? ['15','12','2','0'] : ['23','15','12','5','2','0']) : (kind === 'analog' ? ['A0','0'] : ['2','3','4']);
        const selected = preferred.find(pin => options.some(option => option[1] === pin));
        options.sort((a,b) => Number(b[1] === selected) - Number(a[1] === selected));
        if (optional) options.unshift([msg('NONE'), '-1']);
        return {type: 'field_dropdown', name: name, options: options};
    };
    const number = name => ({type:'input_value', name: name, check:'Number'});
    const add = (opcode, key, args, shape, tooltip) => {
        Blockly.Blocks[opcode] = {init: function () {
            this.jsonInit({message0: msg(key), args0: args(), colour:'#B91C1C', secondaryColour:'#851414',
                extensions:[shape], tooltip: tooltip ? msg(tooltip) : ''});
        }};
    };
    add('kitTemperature_begin','BEGIN',() => [id(),pins('analog','AO'),pins('digital','DO',true),{type:'field_dropdown',name:'ACTIVE',options:[[msg('HIGH'),'HIGH'],[msg('LOW'),'LOW']]}],'shape_statement','BEGIN_TIP');
    add('kitTemperature_configure','CONFIGURE',() => [id(),number('R0'),number('BETA'),number('SERIES'),number('NOMINAL')],'shape_statement');
    add('kitTemperature_raw','RAW',() => [id()],'output_number');
    add('kitTemperature_nativeRaw','NATIVE',() => [id()],'output_number');
    add('kitTemperature_celsius','CELSIUS',() => [id(),{type:'field_dropdown',name:'SIDE',options:[[msg('GROUND'),'true'],[msg('VCC'),'false']]}],'output_number','CELSIUS_TIP');
    add('kitTemperature_thresholdReached','THRESHOLD',() => [id()],'output_boolean');
    return Blockly;
}
exports = registerBlocks;
