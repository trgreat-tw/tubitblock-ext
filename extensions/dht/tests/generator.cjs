const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const graph = require('../../../tests/graph-fixtures.cjs');
const root = path.resolve(__dirname, '..');
let checks = 0;
function check(action) { action(); checks++; }
function load(file) {
    const context = {exports: {}, module: {exports: {}}};
    vm.runInNewContext(fs.readFileSync(path.join(root, file), 'utf8'), context);
    return context;
}
function scene(options = {}) {
    const s = graph.scene('dht', {id: '1', ...options, operation: 'dht_readTemperature'});
    s.init.type = 'dht_init';
    Object.assign(s.init.fields, {PIN: options.pin || '12', MODEL: options.model || '11'});
    s.init.setInput('NO', new graph.Block('math_number', {NUM: options.initId || options.id || '1'}));
    s.read.setInput('NO', new graph.Block('math_number', {NUM: options.id || '1'}));
    s.read.fields.UNIT = options.unit || 'false';
    return s;
}
function host(s) {
    const B = {getMainWorkspace: () => s.workspace, Arduino: {
        includes_: {}, definitions_: {}, setups_: {}, loops_: {}, ORDER_ATOMIC: 0,
        valueToCode: (block, name) => block.getInputTargetBlock(name)?.getFieldValue('NUM') || '0',
        init() { this.includes_ = {}; this.definitions_ = {}; this.setups_ = {}; this.loops_ = {}; }
    }, ScratchMsgs: {locales: {en: {}, ru: {}, 'zh-cn': {}, 'zh-tw': {}}}};
    load('translations.js').exports(B); B.Msg = B.ScratchMsgs.locales['zh-tw'];
    load('generator.js').exports(B); return B;
}
for (const model of ['11', '21', '22']) for (const unit of ['false', 'true']) for (const pin of ['12', '33']) check(() => {
    const s = scene({model, unit, pin}); const B = host(s); B.Arduino.init(s.workspace);
    B.Arduino.dht_init.call(s.init, s.init);
    assert.equal(B.Arduino.definitions_.dht_init_1, 'DHT dht_1(' + pin + ', ' + model + ');');
    assert.equal(B.Arduino.setups_.dht_init_1, 'dht_1.begin();');
    assert.equal(B.Arduino.dht_readTemperature.call(s.read, s.read)[0], 'dht_1.readTemperature(' + unit + ')');
    assert.equal(B.Arduino.dht_readHumidity.call(s.read, s.read)[0], 'dht_1.readHumidity()');
    B.Arduino.dht_init.call(s.init, s.init);
    assert.equal(Object.values(B.Arduino.setups_).filter(code => code === 'dht_1.begin();').length, 1);
});
for (const [position, options, expected] of [
    ['missing', {}, 'missing'], ['startup', {disabled: true}, 'missing'],
    ['startup', {initId: '42'}, 'missing'], ['after-use', {}, 'order'],
    ['nested', {}, 'placement'], ['detached', {}, 'placement']
]) check(() => {
    const s = scene({position, ...options}); const B = host(s); let error;
    try { B.Arduino.init(s.workspace); B.Arduino.dht_readTemperature.call(s.read, s.read); } catch (e) { error = e; }
    assert(error); assert.equal(error.initGuardCode, expected);
});
check(() => {
    const s = scene({id: '8'}); const second = new graph.Block('dht_init', {PIN: '33', MODEL: '22'});
    second.setInput('NO', new graph.Block('math_number', {NUM: '42'}));
    graph.chain(s.hat, s.init, second, s.loop);
    const all = [...s.workspace.getAllBlocks(), second]; s.workspace.getAllBlocks = () => all;
    const B = host(s); B.Arduino.init(s.workspace);
    B.Arduino.dht_init.call(s.init, s.init); B.Arduino.dht_init.call(second, second);
    assert.equal(B.Arduino.setups_.dht_init_8, 'dht_8.begin();');
    assert.equal(B.Arduino.setups_.dht_init_42, 'dht_42.begin();');
});
check(() => {
    const s = scene(); const B = host(s); const initialized = B.Arduino.init;
    for (let i = 0; i < 3; i++) load('generator.js').exports(B);
    assert.equal(B.Arduino.init, initialized);
});
check(() => {
    assert.equal(load('index.js').module.exports(m => m.default).extensionId, 'dht');
    const props = fs.readFileSync(path.join(root, 'lib/DHT_sensor_library/library.properties'), 'utf8');
    assert(props.includes('version=1.4.7')); assert(props.includes('Adafruit Unified Sensor'));
    assert(fs.readFileSync(path.join(root, 'lib/Adafruit_Sensor/library.properties'), 'utf8').includes('version=1.1.15'));
});
console.log('PASS: ' + checks + ' DHT initialization, model/unit, pin, multi-instance and dependency checks');
