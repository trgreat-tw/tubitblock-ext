const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert');
const {spawnSync} = require('child_process');
const extensions = path.resolve(__dirname, '../..');
const build = path.join(__dirname, '.build/headers');
fs.mkdirSync(path.join(build, 'soc'), {recursive: true});
const libraries = ['kitRGB/lib/TuKitRGB/src', 'kitRelay/lib/TuKitRelay/src', 'kitBuzzer/lib/TuKitBuzzer/src']
    .map(relative => path.join(extensions, relative));
const declarations = '#include <TuKitRGB.h>\n#include <TuKitRelay.h>\n#include <TuKitBuzzer.h>\n';
const prior = fs.readFileSync(path.join(__dirname, 'validate-outputs.cjs'), 'utf8');
const fake = vm.runInNewContext(prior.match(/const fake = (`[\s\S]*?`);/)[1]);
let tests = vm.runInNewContext(prior.match(/const tests = (`[\s\S]*?`);/)[1]);
tests = tests.replaceAll('Kit37Rgb', 'TuKitRGB').replaceAll('Kit37Relay', 'TuKitRelay').replaceAll('Kit37Buzzer', 'TuKitBuzzer');
fs.writeFileSync(path.join(build, 'Arduino.h'), '#ifndef FAKE_ARDUINO_H\n#define FAKE_ARDUINO_H\n' + fake + '\n#endif\n');
fs.writeFileSync(path.join(build, 'soc/soc_caps.h'), '#define SOC_LEDC_CHANNEL_NUM 8\n#define SOC_LEDC_SUPPORT_HS_MODE 1\n');
const Arduino = {includes_: {}, definitions_: {}, setups_: {}, ORDER_ATOMIC: 0, ORDER_NONE: 99,
    valueToCode: () => '17'};
for (const folder of ['kitRGB', 'kitRelay', 'kitBuzzer']) {
    const context = {exports: {}};
    vm.runInNewContext(fs.readFileSync(path.join(extensions, folder, 'generator.js'), 'utf8'), context);
    context.exports({Arduino, Msg: {}});
}
const block = (ID, fields = {}) => ({getFieldValue: name => name === 'ID' ? ID : fields[name]});
Arduino.kitRGB_ready(block('42'));
assert.strictEqual(Arduino.definitions_.kitRGB_42, 'TuKitRGB kitRGB_42(0);');
Arduino.kitRGB_begin(block('00042', {RED:'23',GREEN:'15',BLUE:'12',MODE:'false'}));
Arduino.kitRGB_color(block('0'));
assert.strictEqual(Arduino.definitions_.kitRGB_0, 'TuKitRGB kitRGB_0(3);');
Arduino.kitRelay_state(block('8'));
Arduino.kitBuzzer_ready(block('8'));
assert.deepStrictEqual(Object.keys(Arduino.includes_).sort(), ['kitBuzzer','kitRGB','kitRelay']);
assert(Object.values(Arduino.definitions_).every(value => !/\b(class|struct)\s|\{/.test(value)));
assert.strictEqual(fs.readFileSync(path.join(libraries[0], 'TuKitOutputPwm.h'), 'utf8'),
    fs.readFileSync(path.join(libraries[2], 'TuKitOutputPwm.h'), 'utf8'));
for (const invalid of ['-1','1.5','abc','1;doSomething()']) assert.throws(() => Arduino.kitRGB_color(block(invalid)));
Arduino.definitions_ = {};
Arduino.setups_ = {};
Arduino.kitRGB_color(block('999999999999999999999999'));
assert.strictEqual(Arduino.definitions_.kitRGB_999999999999999999999999, 'TuKitRGB kitRGB_999999999999999999999999(0);');

const results = [];
for (const version of [0, 2, 3]) {
    fs.writeFileSync(path.join(build, 'esp_arduino_version.h'), '#define ESP_ARDUINO_VERSION_MAJOR ' + version + '\n');
    fs.writeFileSync(path.join(build, 'headers-test.cpp'), declarations + tests);
    const compiler = String.raw`C:\Program Files (x86)\Microsoft Visual Studio\2017\BuildTools\VC\Auxiliary\Build\vcvars64.bat`;
    const includeFlags = ['/I.', ...libraries.map(folder => '/I"' + folder + '"')].join(' ');
    const executable = 'headers-' + version + '.exe';
    fs.writeFileSync(path.join(build, 'compile.cmd'), '@echo off\r\ncall "' + compiler + '" >nul\r\nif errorlevel 1 exit /b 1\r\ncl /nologo /EHsc /W4 /WX ' + includeFlags + ' ' + (version ? '/DARDUINO_ARCH_ESP32 /DESP_ARDUINO_VERSION_MAJOR=' + version : '') + ' headers-test.cpp /Fe:' + executable + ' /Fo:headers-' + version + '.obj\r\n');
    const compiled = spawnSync('cmd.exe', ['/d','/c','compile.cmd'], {cwd: build, encoding:'utf8'});
    if (compiled.status !== 0) throw new Error(compiled.stdout + compiled.stderr);
    const run = spawnSync(path.join(build, executable), [], {encoding:'utf8'});
    if (run.status !== 0) throw new Error(run.stdout + run.stderr);
    results.push({branch: version ? 'ESP32 core ' + version : 'Arduino', pass: true, output: run.stdout.trim()});
}
fs.writeFileSync(path.join(build, 'validation.json'), JSON.stringify(results,null,2));
console.log(JSON.stringify({generatorPass: true, noInlineClasses: true, sharedHeaderIdentical: true, native: results}, null, 2));
