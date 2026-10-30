import json
from pathlib import Path

extensions = Path(__file__).resolve().parents[2]
support = ['arduinoUno', 'arduinoNano', 'arduinoLeonardo', 'arduinoMega2560',
           'arduinoEsp32', 'tubitv2_esp32', 'tubitv2_arduinoEsp32']

configs = [
    dict(id='kitTemperature', title='KY-013 / KY-028 Temperature', zh='溫度感測模組 KY-013／028',
         desc='NTC temperature, analog signal and adjustable module threshold for Arduino / ESP32.',
         zhdesc='KY-013 NTC 攝氏溫度、KY-028 類比訊號與數位閾值，Arduino／ESP32 共用。',
         color='#AF713A', secondary='#845125', lib='TuKitTemperature', help='https://sensorkit.joy-it.net/en/sensors/ky-013',
         messages={
             'CATEGORY': ('Temperature KY-013 / KY-028', '溫度感測 KY-013／028'),
             'BEGIN': ('temperature %1 begin AO %2 DO %3 threshold active %4 ADC full scale %5', '溫度模組 %1 初始化 AO %2 DO %3 觸發電位 %4 ADC 最大值 %5'),
             'CONFIGURE': ('temperature %1 NTC R at nominal %2 Ω B %3 series R %4 Ω nominal °C %5', '溫度模組 %1 NTC 標稱電阻 %2 Ω B 值 %3 分壓電阻 %4 Ω 標稱溫度 %5 °C'),
             'RAW': ('temperature %1 analog value (0–1023)', '溫度模組 %1 類比值（0～1023）'),
             'NATIVE': ('temperature %1 native ADC value', '溫度模組 %1 原始 ADC 值'),
             'CELSIUS': ('temperature %1 KY-013 °C NTC connected to %2', '溫度模組 %1 KY-013 攝氏溫度 NTC 接 %2'),
             'THRESHOLD': ('temperature %1 KY-028 threshold reached?', '溫度模組 %1 KY-028 達到閾值？'),
             'BEGIN_TIP': ('Use AO for KY-013/KY-028. DO is optional and only used by KY-028. Match ADC full scale to your board.', 'KY-013／028 使用 AO；DO 可不接，僅用於 KY-028。ADC 最大值需符合目前控制板設定。'),
             'CELSIUS_TIP': ('For KY-013 NTC divider only. Calibrate component values and select divider orientation. Open/short inputs return NaN.', '僅用於 KY-013 NTC 分壓電路。請校準元件值並選擇 NTC 位置；開路／短路等端點讀值回傳 NaN。'),
         }),
    dict(id='kitHeartbeat', title='KY-039 Heartbeat Signal', zh='KY-039 手指心跳訊號',
         desc='Observe KY-039 waveform, peaks and estimated BPM on Arduino / ESP32.',
         zhdesc='觀察 KY-039 手指心跳類比波形、波峰與估算 BPM，Arduino／ESP32 共用。',
         color='#B84762', secondary='#8D3047', lib='TuKitHeartbeat', help='https://sensorkit.joy-it.net/en/sensors/ky-039',
         messages={
             'CATEGORY': ('KY-039 Heartbeat Signal', 'KY-039 手指心跳訊號'),
             'BEGIN': ('heartbeat %1 begin signal %2 ADC full scale %3', '心跳模組 %1 初始化訊號腳 %2 ADC 最大值 %3'),
             'UPDATE': ('heartbeat %1 update', '心跳模組 %1 更新狀態'),
             'RAW': ('heartbeat %1 analog value (0–1023)', '心跳模組 %1 類比值（0～1023）'),
             'AC': ('heartbeat %1 filtered waveform', '心跳模組 %1 濾波波形'),
             'AMPLITUDE': ('heartbeat %1 signal amplitude', '心跳模組 %1 訊號振幅'),
             'BEAT': ('heartbeat %1 new waveform peak?', '心跳模組 %1 出現新的波峰？'),
             'AVAILABLE': ('heartbeat %1 stable pulse signal?', '心跳模組 %1 有穩定脈動訊號？'),
             'BPM': ('heartbeat %1 estimated BPM', '心跳模組 %1 估算 BPM'),
             'MINIMUM': ('heartbeat %1 minimum signal amplitude %2', '心跳模組 %1 最小訊號振幅 %2'),
             'UPDATE_TIP': ('Put once at the start of each fast loop. Sampling is limited to one reading per 10 ms; check events before the next update.', '放在快速迴圈開頭，每圈一次。每 10ms 採樣一次；請先更新再判斷，下一次更新會清除瞬間波峰事件。'),
             'BPM_TIP': ('An estimate after three similar peaks. Returns 0 before a stable signal and after 2.5 s without a peak.', '至少三個相近間距波峰後才估算；訊號不穩定或超過 2.5 秒無波峰回傳 0。'),
             'BEGIN_TIP': ('Keep the fingertip still, shield external light, and match ADC full scale to your board.', '手指保持穩定並遮蔽環境光，ADC 最大值需符合目前控制板設定。'),
         }),
]

for c in configs:
    folder = extensions / c['id']
    folder.mkdir(parents=True, exist_ok=True)
    (folder / 'assets').mkdir(exist_ok=True)
    metadata = dict(extensionId=c['id'], version='1.0.0', supportDevice=support,
                    author='TubitBlock Community', iconURL='assets/module.jpg', featured=True, disabled=False,
                    blocks='blocks.js', generator='generator.js', toolbox='toolbox.js',
                    translations='translations.js', library='lib', tags=['sensor'], helpLink=c['help'])
    index = 'const extension = formatMessage => ({\n' + '\n'.join('    '+json.dumps(k)+': '+json.dumps(v, ensure_ascii=False)+',' for k,v in metadata.items())
    index += '\n    name: formatMessage({id: '+json.dumps(c['id']+'.name')+', default: '+json.dumps(c['title'])+'}),'
    index += '\n    description: formatMessage({id: '+json.dumps(c['id']+'.description')+', default: '+json.dumps(c['desc'])+'})\n});\nmodule.exports = extension;\n'
    (folder / 'index.js').write_text(index, encoding='utf-8')
    prefix = c['id'].upper() + '_'
    en = {prefix+k:v[0] for k,v in c['messages'].items()}
    zh = {prefix+k:v[1] for k,v in c['messages'].items()}
    for key, a, b in [('NONE', 'not connected', '不接'), ('HIGH', 'HIGH', '高電位'), ('LOW', 'LOW', '低電位'),
                      ('GROUND','GND','GND'), ('VCC','VCC','VCC')]:
        en[prefix+key] = a
        zh[prefix+key] = b
    trans = 'function getInterfaceTranslations () { return '+json.dumps({
        'en': {c['id']+'.name':c['title'],c['id']+'.description':c['desc']},
        'zh-tw': {c['id']+'.name':c['zh'],c['id']+'.description':c['zhdesc']}
    }, ensure_ascii=False, indent=4)+'; }\n'
    trans += 'function registerScratchExtensionTranslations () { return {}; }\n'
    trans += 'function registerBlocksMessages (Blockly) {\n    const messages = '+json.dumps({'en':en,'zh-tw':zh}, ensure_ascii=False, indent=4)+';\n'
    trans += '    Object.keys(messages).forEach(locale => {\n        if (!Blockly.ScratchMsgs.locales[locale]) Blockly.ScratchMsgs.locales[locale] = {};\n        Object.assign(Blockly.ScratchMsgs.locales[locale], messages[locale]);\n    });\n    return Blockly;\n}\n'
    trans += "if (typeof module !== 'undefined') module.exports = {getInterfaceTranslations};\nexports = registerScratchExtensionTranslations;\nexports = registerBlocksMessages;\n"
    (folder / 'translations.js').write_text(trans, encoding='utf-8')
    (folder / 'msg.json').write_text(json.dumps(en, ensure_ascii=False, indent=4)+'\n',encoding='utf-8')
    blocks = '''function registerBlocks (Blockly) {
    const prefix = '__PREFIX__';
    const msg = key => Blockly.Msg[prefix + key] || key;
    const isESP = () => /esp32/i.test(Blockly.Device.getDeviceId ? Blockly.Device.getDeviceId() : '');
    const id = () => ({type: 'field_dropdown', name: 'ID', options: [['1','1'],['2','2'],['3','3'],['4','4']]});
    const pins = (kind, name, optional) => {
        const options = Blockly.Device.getPinOptions(kind === 'analog' ? 'arduino_pin_readAnalogPin' : 'arduino_pin_readDigitalPin')
            .map(option => [String(option[0]), String(option[1])]);
        if (!options.length) throw new Error('Select a supported Arduino / ESP32 device first.');
        const preferred = isESP() ? (kind === 'analog' ? ['15','12','2','0'] : ['23','15','12','5','2','0']) : (kind === 'analog' ? ['A0','0'] : ['2','3','4']);
        const selected = preferred.find(pin => options.some(option => option[1] === pin));
        options.sort((a,b) => Number(b[1] === selected) - Number(a[1] === selected));
        if (optional) options.unshift([msg('NONE'), '-1']);
        return {type: 'field_dropdown', name: name, options: options};
    };
    const adc = () => ({type:'field_dropdown', name:'ADC_MAX', options: isESP() ? [['4095 (12 bit)','4095'],['1023 (10 bit)','1023']] : [['1023 (10 bit)','1023'],['4095 (12 bit)','4095']]});
    const number = name => ({type:'input_value', name: name, check:'Number'});
    const add = (opcode, key, args, shape, tooltip) => {
        Blockly.Blocks[opcode] = {init: function () {
            this.jsonInit({message0: msg(key), args0: args(), colour:'__COLOR__', secondaryColour:'__SECONDARY__',
                extensions:[shape], tooltip: tooltip ? msg(tooltip) : ''});
        }};
    };
__BLOCKS__
    return Blockly;
}
exports = registerBlocks;
'''.replace('__PREFIX__',prefix).replace('__COLOR__',c['color']).replace('__SECONDARY__',c['secondary'])
    if c['id'] == 'kitTemperature':
        entries = [
            "    add('kitTemperature_begin','BEGIN',() => [id(),pins('analog','AO'),pins('digital','DO',true),{type:'field_dropdown',name:'ACTIVE',options:[[msg('HIGH'),'HIGH'],[msg('LOW'),'LOW']]},adc()],'shape_statement','BEGIN_TIP');",
            "    add('kitTemperature_configure','CONFIGURE',() => [id(),number('R0'),number('BETA'),number('SERIES'),number('NOMINAL')],'shape_statement');",
            "    add('kitTemperature_raw','RAW',() => [id()],'output_number');",
            "    add('kitTemperature_nativeRaw','NATIVE',() => [id()],'output_number');",
            "    add('kitTemperature_celsius','CELSIUS',() => [id(),{type:'field_dropdown',name:'SIDE',options:[[msg('GROUND'),'true'],[msg('VCC'),'false']]}],'output_number','CELSIUS_TIP');",
            "    add('kitTemperature_thresholdReached','THRESHOLD',() => [id()],'output_boolean');"
        ]
    else:
        entries = [
            "    add('kitHeartbeat_begin','BEGIN',() => [id(),pins('analog','PIN'),adc()],'shape_statement','BEGIN_TIP');",
            "    add('kitHeartbeat_update','UPDATE',() => [id()],'shape_statement','UPDATE_TIP');",
            "    add('kitHeartbeat_setMinimumAmplitude','MINIMUM',() => [id(),number('AMPLITUDE')],'shape_statement');"
        ]
        for opcode,key,shape in [('raw','RAW','output_number'),('acSignal','AC','output_number'),('amplitude','AMPLITUDE','output_number'),('beatDetected','BEAT','output_boolean'),('signalAvailable','AVAILABLE','output_boolean'),('bpm','BPM','output_number')]:
            entries.append("    add('kitHeartbeat_"+opcode+"','"+key+"',() => [id()],'"+shape+"'"+(",'BPM_TIP'" if opcode == 'bpm' else '')+");")
    (folder / 'blocks.js').write_text(blocks.replace('__BLOCKS__','\n'.join(entries)),encoding='utf-8')

    gen = '''function registerGenerators (Blockly) {
    const Arduino = Blockly.Arduino;
    const object = block => {
        const id = String(block.getFieldValue('ID'));
        if (!/^[1-4]$/.test(id)) throw new Error('__ID__: ID must be 1, 2, 3 or 4.');
        Arduino.includes_.__ID__ = '#include <__LIB__.h>';
        const name = '__ID___' + id;
        Arduino.definitions_[name] = '__LIB__ ' + name + ';';
        return name;
    };
    const pin = (block, field, optional) => {
        const raw = block.getFieldValue(field);
        if (raw === null || typeof raw === 'undefined') throw new Error('__ID__: missing pin.');
        const value = String(raw);
        if ((optional && value === '-1') || /^(?:\\d+|[A-Za-z_][A-Za-z0-9_]*)$/.test(value)) return value;
        throw new Error('__ID__: invalid pin.');
    };
    const adc = block => {
        const value = String(block.getFieldValue('ADC_MAX'));
        if (value !== '1023' && value !== '4095') throw new Error('__ID__: ADC full scale must be 1023 or 4095.');
        return value;
    };
    const begin = (name, code) => {
        const key = name + '_begin';
        if (Arduino.setups_[key] && Arduino.setups_[key] !== code) throw new Error('__ID__: conflicting initialization for one ID.');
        Arduino.setups_[key] = code;
        return '';
    };
__GENERATORS__
    return Blockly;
}
exports = registerGenerators;
'''.replace('__ID__',c['id']).replace('__LIB__',c['lib'])
    if c['id'] == 'kitTemperature':
        body = '''    Arduino.kitTemperature_begin = function (block) {
        const name = object(block);
        const ao = pin(block,'AO',false);
        const dout = pin(block,'DO',true);
        const active = String(block.getFieldValue('ACTIVE'));
        if (active !== 'LOW' && active !== 'HIGH') throw new Error('kitTemperature: invalid active level.');
        if (ao === dout) throw new Error('kitTemperature: AO and DO must use different pins.');
        return begin(name, `${name}.begin(${ao}, ${dout}, ${active === 'LOW'}, ${adc(block)});`);
    };
    Arduino.kitTemperature_configure = function (block) {
        const name = object(block);
        const values = ['R0','BETA','SERIES','NOMINAL'].map((field,index) => Arduino.valueToCode(block,field,Arduino.ORDER_NONE) || ['10000','3950','10000','25'][index]);
        return `${name}.configure(${values.join(', ')});\\n`;
    };
    ['raw','nativeRaw','thresholdReached'].forEach(method => {
        Arduino['kitTemperature_' + method] = function (block) { return [`${object(block)}.${method}()`,Arduino.ORDER_ATOMIC]; };
    });
    Arduino.kitTemperature_celsius = function (block) {
        const side = String(block.getFieldValue('SIDE'));
        if (side !== 'true' && side !== 'false') throw new Error('kitTemperature: invalid NTC divider side.');
        return [`${object(block)}.celsius(${side})`,Arduino.ORDER_ATOMIC];
    };'''
        toolbox = '''    <block type="kitTemperature_begin"><field name="ID">1</field></block>
    <block type="kitTemperature_raw"><field name="ID">1</field></block>
    <block type="kitTemperature_nativeRaw"><field name="ID">1</field></block>
    <block type="kitTemperature_celsius"><field name="ID">1</field></block>
    <block type="kitTemperature_thresholdReached"><field name="ID">1</field></block>
    <block type="kitTemperature_configure"><field name="ID">1</field>
      <value name="R0"><shadow type="math_number"><field name="NUM">10000</field></shadow></value>
      <value name="BETA"><shadow type="math_number"><field name="NUM">3950</field></shadow></value>
      <value name="SERIES"><shadow type="math_number"><field name="NUM">10000</field></shadow></value>
      <value name="NOMINAL"><shadow type="math_number"><field name="NUM">25</field></shadow></value>
    </block>'''
    else:
        body = '''    Arduino.kitHeartbeat_begin = function (block) {
        const name = object(block);
        return begin(name, `${name}.begin(${pin(block,'PIN',false)}, ${adc(block)});`);
    };
    Arduino.kitHeartbeat_update = function (block) { return `${object(block)}.update();\\n`; };
    Arduino.kitHeartbeat_setMinimumAmplitude = function (block) {
        const name = object(block);
        const value = Arduino.valueToCode(block,'AMPLITUDE',Arduino.ORDER_NONE) || '12';
        return `${name}.setMinimumAmplitude(${value});\\n`;
    };
    ['raw','acSignal','amplitude','beatDetected','signalAvailable','bpm'].forEach(method => {
        Arduino['kitHeartbeat_' + method] = function (block) { return [`${object(block)}.${method}()`,Arduino.ORDER_ATOMIC]; };
    });'''
        toolbox = '\n'.join('    <block type="kitHeartbeat_'+op+'"><field name="ID">1</field></block>' for op in ['begin','update','raw','acSignal','amplitude','beatDetected','signalAvailable','bpm'])
        toolbox += '\n    <block type="kitHeartbeat_setMinimumAmplitude"><field name="ID">1</field><value name="AMPLITUDE"><shadow type="math_number"><field name="NUM">12</field></shadow></value></block>'
    body = body.replace(chr(92) + chr(92) + 'n', chr(92) + 'n')
    (folder / 'generator.js').write_text(gen.replace('__GENERATORS__',body),encoding='utf-8')
    (folder / 'toolbox.js').write_text('function registerToolboxs () { return `\n<category name="%{BKY_'+prefix+'CATEGORY}" id="'+prefix+'CATEGORY" colour="'+c['color']+'" secondaryColour="'+c['secondary']+'">\n'+toolbox+'\n</category>`; }\nexports = registerToolboxs;\n',encoding='utf-8')
    props = dict(name=c['lib'],version='1.0.0',author='TubitBlock contributors',maintainer='TubitBlock contributors',
                 sentence=c['desc'],paragraph='Portable Arduino API library bundled with TubitBlock 37 Sensors Kit blocks.',
                 category='Sensors',url=c['help'],architectures='*',includes=c['lib']+'.h',license='MIT')
    libfolder = folder / 'lib' / c['lib']
    (libfolder / 'library.properties').write_text('\n'.join(k+'='+v for k,v in props.items())+'\n',encoding='utf-8')
    (libfolder / 'LICENSE').write_text('''MIT License

Copyright (c) 2026 TubitBlock contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
''',encoding='utf-8')
    print(c['id'],len(entries),'blocks')
