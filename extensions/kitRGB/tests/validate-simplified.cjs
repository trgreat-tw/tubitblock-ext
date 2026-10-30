const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert');
const extensions = path.resolve(__dirname, '../..');
const palettes = {
    kitRGB: ['kitRGB_begin','kitRGB_color'],
    kitRelay: ['kitRelay_begin','kitRelay_write'],
    kitBuzzer: ['kitBuzzer_begin','kitBuzzer_active','kitBuzzer_tone','kitBuzzer_stop']
};
const load = (extension, file) => {
    const context = {exports: {}, module: {exports: {}}};
    vm.runInNewContext(fs.readFileSync(path.join(extensions, extension, file), 'utf8'), context);
    return context;
};
const block = (ID, extras = {}) => ({getFieldValue: name => name === 'ID' ? ID : extras[name]});
const makeGenerator = () => {
    const Arduino = {definitions_: {}, includes_: {}, setups_: {}, ORDER_ATOMIC: 0, ORDER_NONE: 99,
        valueToCode: () => '17'};
    const Msg = {};
    const locale = {ScratchMsgs: {locales: {en: {}, 'zh-tw': {}}}};
    for (const extension of Object.keys(palettes)) load(extension, 'translations.js').exports(locale);
    Object.assign(Msg, locale.ScratchMsgs.locales['zh-tw']);
    for (const extension of Object.keys(palettes)) load(extension, 'generator.js').exports({Arduino, Msg});
    return Arduino;
};
for (const [extension, expected] of Object.entries(palettes)) {
    const Blockly = {Blocks: {}, Msg: {}, Device: {getDeviceId: () => 'arduinoEsp32',
        getPinOptions: () => ['23','15','12','5','2','0'].map(pin => [pin,pin])}};
    load(extension, 'blocks.js').exports(Blockly);
    for (const definition of Object.values(Blockly.Blocks)) {
        let json;
        definition.init.call({jsonInit: value => {json = value;}});
        const id = json.args0.find(arg => arg.name === 'ID');
        assert.strictEqual(id.type, 'field_input');
        assert.strictEqual(id.text, '1');
    }
    const xml = load(extension, 'toolbox.js').exports();
    const visible = Array.from(xml.matchAll(/<block type="([^"]+)"/g), match => match[1]);
    assert.deepStrictEqual(visible, expected);
    for (const opcode of visible) assert(Blockly.Blocks[opcode]);
    const locales = {ScratchMsgs: {locales: {en: {}, 'zh-tw': {}}}};
    load(extension, 'translations.js').exports(locales);
    assert.deepStrictEqual(JSON.parse(fs.readFileSync(path.join(extensions, extension, 'msg.json'), 'utf8')),
        JSON.parse(JSON.stringify(locales.ScratchMsgs.locales.en)));
}

const generator = makeGenerator();
// Reporter first and initialization later must retain the assigned slot.
generator.kitRGB_ready(block('42'));
assert.strictEqual(generator.definitions_.kitRGB_42, 'Kit37Rgb kitRGB_42(0);');
generator.kitRGB_begin(block('00042', {RED:'23', GREEN:'15', BLUE:'12', MODE:'false'}));
assert.strictEqual(generator.definitions_.kitRGB_42, 'Kit37Rgb kitRGB_42(0);');
generator.kitRGB_color(block('0'));
assert.strictEqual(generator.definitions_.kitRGB_0, 'Kit37Rgb kitRGB_0(3);');
const huge = '900719925474099312345678901234567890';
generator.kitRGB_off(block(huge));
assert.strictEqual(generator.definitions_['kitRGB_' + huge], `Kit37Rgb kitRGB_${huge}(6);`);
generator.kitRGB_color(block('8'));
assert.strictEqual(generator.definitions_.kitRGB_8, 'Kit37Rgb kitRGB_8(9);');
for (const id of ['0','8','42',huge]) {
    assert(generator.kitRelay_state(block(id))[0].includes('kitRelay_' + id));
    assert(generator.kitBuzzer_playing(block(id))[0].includes('kitBuzzer_' + id));
}
const shared = generator.definitions_.kit37_output_pwm;
generator.kitBuzzer_tone(block('42'));
assert.strictEqual(generator.definitions_.kit37_output_pwm, shared);
for (const id of ['','-1','1.5','hello','1;digitalWrite(2,HIGH)',null,undefined]) {
    assert.throws(() => generator.kitRGB_color(block(id)), /編號/);
    assert.throws(() => generator.kitRelay_state(block(id)), /編號/);
    assert.throws(() => generator.kitBuzzer_ready(block(id)), /編號/);
}
assert.throws(() => generator.kitRGB_begin(block('42', {RED:'5', GREEN:'6', BLUE:'9', MODE:'false'})), /衝突/);

// Simulate Blockly.Arduino.init() replacing its dictionaries in a fresh run.
generator.definitions_ = {};
generator.setups_ = {};
generator.kitRGB_color(block('123456789'));
assert.strictEqual(generator.definitions_.kitRGB_123456789, 'Kit37Rgb kitRGB_123456789(0);');
generator.kitRGB_begin(block('123456789', {RED:'23', GREEN:'15', BLUE:'12', MODE:'false'}));
assert.strictEqual(Object.keys(generator.setups_).length, 1);
console.log('PASS: 2/2/4 palettes, editable IDs, arbitrary/canonical IDs, injection rejection, dense RGB slots, reporter-first ordering and fresh-generation reset.');
