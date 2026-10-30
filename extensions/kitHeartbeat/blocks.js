function registerBlocks (Blockly) {
    const prefix = 'KITHEARTBEAT_';
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
            this.jsonInit({message0: msg(key), args0: args(), colour:'#9F1239', secondaryColour:'#720D29',
                extensions:[shape], tooltip: tooltip ? msg(tooltip) : ''});
        }};
    };
    add('kitHeartbeat_begin','BEGIN',() => [id(),pins('analog','PIN')],'shape_statement','BEGIN_TIP');
    add('kitHeartbeat_update','UPDATE',() => [id()],'shape_statement','UPDATE_TIP');
    add('kitHeartbeat_setMinimumAmplitude','MINIMUM',() => [id(),number('AMPLITUDE')],'shape_statement');
    add('kitHeartbeat_raw','RAW',() => [id()],'output_number');
    add('kitHeartbeat_acSignal','AC',() => [id()],'output_number');
    add('kitHeartbeat_amplitude','AMPLITUDE',() => [id()],'output_number');
    add('kitHeartbeat_beatDetected','BEAT',() => [id()],'output_boolean');
    add('kitHeartbeat_signalAvailable','AVAILABLE',() => [id()],'output_boolean');
    add('kitHeartbeat_bpm','BPM',() => [id()],'output_number','BPM_TIP');
    return Blockly;
}
exports = registerBlocks;
