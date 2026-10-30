const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const {scene} = require('./graph-fixtures.cjs');
const root = path.resolve(__dirname, '../extensions');
const sensors = 'kitJoystick kitRGB kitRelay kitTouch kitTemperature kitBuzzer ky040 kitButton kitLine kitHeartbeat kitSwitch kitLightGate'.split(' ');
const locales = ['en', 'ru', 'zh-cn', 'zh-tw'];
let checks = 0;
function check(name, action) { action(); checks++; }
function load(id, file) {
    const c = {exports: {}, module: {exports: {}}};
    vm.runInNewContext(fs.readFileSync(path.join(root, id, file), 'utf8'), c, {filename: id + '/' + file});
    return c;
}
function host(id, s, locale = 'zh-tw') {
    const messages = {ScratchMsgs: {locales: Object.fromEntries(locales.map(l => [l, {}]))}};
    load(id, 'translations.js').exports(messages);
    const B = {Msg: messages.ScratchMsgs.locales[locale], getMainWorkspace: () => s.workspace,
        Device: {getDeviceId: () => 'tubitv2_arduinoEsp32'},
        Arduino: {includes_: {}, definitions_: {}, setups_: {}, loops_: {}, ORDER_ATOMIC: 0,
            valueToCode: (b, name) => ({R: '12', G: '34', B: '56', FREQUENCY: '440'}[name] || '1'),
            statementToCode: () => '', init() { this.firstLoop = true; }}};
    load(id, 'generator.js').exports(B);
    return B;
}
function throws(action, code) {
    let error; try { action(); } catch (e) { error = e; }
    assert(error, 'Expected initialization error');
    assert.equal(error.initGuardCode, code);
}
let visible = 0;
const colours = new Set();
for (const id of sensors) {
    check(id + ' source metadata', () => {
        const entry = load(id, 'index.js').module.exports(m => m.default);
        assert.equal(entry.extensionId, id); assert.equal(entry.library, 'lib');
        for (const key of ['blocks', 'generator', 'toolbox', 'translations', 'iconURL']) assert(fs.existsSync(path.join(root, id, entry[key])));
        const xml = load(id, 'toolbox.js').exports();
        visible += (xml.match(/<block\b/g) || []).length;
        assert(!/<block[^>]+type="[^"]*update/.test(xml));
    });
    const messages = {ScratchMsgs: {locales: Object.fromEntries(locales.map(l => [l, {}]))}};
    load(id, 'translations.js').exports(messages);
    for (const locale of locales) check(id + '/' + locale + ' blocks', () => {
        const B = {Blocks: {}, Msg: messages.ScratchMsgs.locales[locale],
            Device: {getDeviceId: () => 'tubitv2_arduinoEsp32',
                getPinOptions: () => ['23', '15', '12', '5', '2', '0'].map(p => [p, p])}};
        load(id, 'blocks.js').exports(B);
        for (const [type, definition] of Object.entries(B.Blocks)) definition.init.call({jsonInit(json) {
            assert(json.message0); colours.add(json.colour);
            if (type === id + '_begin') assert(!/[（(]%1[）)]/.test(json.message0));
        }});
    });
    for (const [position, options, error] of [
        ['missing', {}, 'missing'], ['startup', {initId: '42'}, 'missing'],
        ['startup', {disabled: true}, 'missing'], ['after-use', {}, 'order'],
        ['nested', {}, 'placement'], ['detached', {}, 'placement']
    ]) check(id + ' initialization ' + position + JSON.stringify(options), () => {
        const s = scene(id, {position, ...options}); const B = host(id, s);
        const rule = {initTypes: [id + '_begin'], idField: 'ID', kind: 'sensor', label: id};
        if (error === 'placement') throws(() => { B.Arduino.__tubitInitGuard.register(rule); B.Arduino.init(s.workspace); }, error);
        else throws(() => B.Arduino.__tubitInitGuard.check(s.read, rule), error);
    });
    check(id + ' arbitrary IDs and normalization', () => {
        for (const [idValue, initId] of [['0', '0'], ['8', '0008'], ['42', '42']]) {
            const s = scene(id, {id: idValue, initId}); const B = host(id, s);
            B.Arduino.__tubitInitGuard.check(s.read, {initTypes: [id + '_begin'], idField: 'ID', kind: 'sensor'});
        }
    });
}
check('visible blocks and distinct palettes', () => { assert.equal(visible, 33); assert.equal(colours.size, 12); });
let guarded = 0; let protectedOpcodes = 0;
for (const id of fs.readdirSync(root)) {
    const file = path.join(root, id, 'generator.js'); if (!fs.existsSync(file)) continue;
    const source = fs.readFileSync(file, 'utf8');
    if (!source.includes('// BEGIN TUBIT INIT GUARD')) continue;
    guarded++;
    check(id + ' generator and JSON syntax', () => {
        new vm.Script(source); load(id, 'translations.js'); JSON.parse(fs.readFileSync(path.join(root, id, 'msg.json')));
        const match = source.match(/const __tubitInitRules\s*=\s*([\s\S]*?);\s*Object\.keys\(__tubitInitRules\)/);
        assert(match); protectedOpcodes += Object.keys(JSON.parse(match[1])).length;
        const s = scene('kitButton'); const B = host(id, s); const initialized = B.Arduino.init;
        load(id, 'generator.js').exports(B); assert.equal(B.Arduino.init, initialized);
        assert.equal(B.Msg.INIT_GUARD_TUBIT_REQUIRED, '請在Arduino啟動的積木底下放置"TUBIT初始化"積木');
    });
}
check('complete guard scope, including new note', () => { assert.equal(guarded, 66); assert.equal(protectedOpcodes, 462); });
check('RGB and encoder final mappings', () => {
    const s = scene('kitRGB'); Object.assign(s.init.fields, {RED: '23', GREEN: '15', BLUE: '12', MODE: 'false'});
    const B = host('kitRGB', s); B.Arduino.kitRGB_begin.call(s.init, s.init);
    assert(Object.values(B.Arduino.setups_).some(v => v.includes('.begin(23, 15, 12, false)')));
    for (const value of [undefined, '4', '2', '1']) {
        const e = scene('ky040'); Object.assign(e.init.fields, {CLK: '23', DT: '15', SW: '12'});
        if (value !== undefined) e.init.fields.TRANSITIONS = value;
        const E = host('ky040', e); E.Arduino.ky040_begin.call(e.init, e.init);
        assert(Object.values(E.Arduino.setups_).some(v => v.includes('.begin(23, 15, 12, ' + (value || '4') + ')')));
    }
});
check('all 36 buzzer pitches and legacy Hz', () => {
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    for (const octave of [3, 4, 5]) for (let i = 0; i < notes.length; i++) {
        const s = scene('kitBuzzer', {operation: 'kitBuzzer_note'});
        Object.assign(s.read.fields, {NOTE: notes[i], OCTAVE: String(octave)});
        const B = host('kitBuzzer', s);
        const hz = Math.round(440 * 2 ** (((octave + 1) * 12 + i - 69) / 12));
        assert(B.Arduino.kitBuzzer_note.call(s.read, s.read).includes('.play(' + hz + ')'));
    }
    const s = scene('kitBuzzer', {operation: 'kitBuzzer_tone'}); const B = host('kitBuzzer', s);
    assert(B.Arduino.kitBuzzer_tone.call(s.read, s.read).includes('.play(440)'));
});
console.log('PASS: ' + checks + ' source regressions, ' + guarded + ' guarded extensions, ' + protectedOpcodes + ' protected opcodes');
