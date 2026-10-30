const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert');
const {spawnSync} = require('child_process');
const extensions = path.resolve(__dirname, '../..');
const build = path.join(__dirname, '.build');
fs.mkdirSync(build, {recursive: true});
const generator = {includes_: {}, definitions_: {}, setups_: {}, ORDER_ATOMIC: 0, ORDER_NONE: 99,
    valueToCode: (block, name) => block.values && block.values[name] || ''};
const block = (fields, values = {}) => ({getFieldValue: name => fields[name], values});
for (const extension of ['kitRGB', 'kitRelay', 'kitBuzzer']) {
    const context = {exports: {}, module: {exports: {}}};
    vm.runInNewContext(fs.readFileSync(path.join(extensions, extension, 'generator.js'), 'utf8'), context);
    context.exports({Arduino: generator, Msg: {}});
}
generator.kitRGB_begin(block({ID: '1', RED: '5', GREEN: '6', BLUE: '9', MODE: 'false'}));
generator.kitRelay_begin(block({ID: '1', PIN: '2', LEVEL: 'true'}));
generator.kitBuzzer_begin(block({ID: '1', PIN: '4', TYPE: 'true', LEVEL: 'true'}));
assert.strictEqual(Object.keys(generator.definitions_).filter(key => key === 'kit37_output_pwm').length, 1);
assert.throws(() => generator.kitRGB_begin(block({ID:'2',RED:'5',GREEN:'5',BLUE:'9',MODE:'false'})));
assert.throws(() => generator.kitRelay_begin(block({ID:'1',PIN:'3',LEVEL:'true'})));
assert.throws(() => generator.kitBuzzer_begin(block({ID:'1',PIN:'2',TYPE:'maybe',LEVEL:'true'})));
const declarations = ['kit37_output_pwm', 'kitRGB_class', 'kitRelay_class', 'kitBuzzer_class']
    .map(key => generator.definitions_[key]).join('\n');

const fake = `#include <stdint.h>
#include <assert.h>
#include <stdio.h>
#define HIGH 1
#define LOW 0
#define OUTPUT 1
static int signal[256], pwm[256], channelPin[16], channelDuty[16], channelFrequency[16];
static int eventKind[256], eventValue[256], events;
static int tonePin = -1, toneFrequency = 0;
void digitalWrite(uint8_t pin, int value) { signal[pin] = value; eventKind[events] = 1; eventValue[events++] = value; }
void pinMode(uint8_t pin, int mode) { (void)pin; eventKind[events] = 2; eventValue[events++] = mode; }
void analogWrite(uint8_t pin, int value) { pwm[pin] = value; }
void tone(uint8_t pin, unsigned int frequency) { tonePin = pin; toneFrequency = frequency; }
void noTone(uint8_t pin) { if (tonePin == pin) tonePin = -1; }
#if defined(ARDUINO_ARCH_ESP32)
bool ledcAttachChannel(uint8_t pin, uint32_t frequency, uint8_t bits, uint8_t channel) {
  (void)bits; channelPin[channel] = pin; channelFrequency[channel] = frequency; return true;
}
uint32_t ledcSetup(uint8_t channel, uint32_t frequency, uint8_t bits) {
  (void)bits; channelFrequency[channel] = frequency; return frequency;
}
void ledcAttachPin(uint8_t pin, uint8_t channel) { channelPin[channel] = pin; }
void ledcDetachPin(uint8_t pin) { for (int i=0;i<16;i++) if(channelPin[i]==pin) channelPin[i]=-1; }
void ledcDetach(uint8_t pin) { ledcDetachPin(pin); }
void ledcWrite(uint8_t key, uint32_t value) {
#if ESP_ARDUINO_VERSION_MAJOR >= 3
  for (int i=0;i<16;i++) if(channelPin[i]==key) {channelDuty[i]=value;pwm[key]=value;}
#else
  channelDuty[key]=value; pwm[channelPin[key]]=value;
#endif
}
uint32_t ledcWriteTone(uint8_t key, uint32_t frequency) {
  toneFrequency = frequency;
#if ESP_ARDUINO_VERSION_MAJOR >= 3
  for (int i=0;i<16;i++) if(channelPin[i]==key) channelFrequency[i]=frequency;
#else
  channelFrequency[key]=frequency;
#endif
  return frequency;
}
#endif
`;
const tests = `
int main() {
  for (int i=0;i<16;++i) channelPin[i]=-1;
  Kit37Rgb rgb(0); rgb.begin(5,6,9,false); assert(rgb.ready());
  rgb.write(-10,300,17); assert(pwm[5]==0 && pwm[6]==255 && pwm[9]==17);
  Kit37Rgb anode(3); anode.begin(10,11,12,true); assert(anode.ready());
  anode.write(-10,300,17); assert(pwm[10]==255 && pwm[11]==0 && pwm[12]==238);
  anode.write(0,0,0); assert(pwm[10]==255 && pwm[11]==255 && pwm[12]==255);
  Kit37Rgb invalid(6); invalid.begin(5,5,9,false); assert(!invalid.ready());
  Kit37Relay relay; events=0; relay.begin(2,true);
  assert(events==2 && eventKind[0]==1 && eventValue[0]==LOW && eventKind[1]==2);
  assert(!relay.state()); relay.write(true); assert(signal[2]==HIGH && relay.state());
  Kit37Relay lowRelay; events=0; lowRelay.begin(3,false);
  assert(eventKind[0]==1 && eventValue[0]==HIGH && eventKind[1]==2);
  lowRelay.write(true); assert(signal[3]==LOW); lowRelay.write(false); assert(signal[3]==HIGH);
  Kit37Buzzer active; active.begin(4,false,false); assert(signal[4]==HIGH && !active.playing());
  active.active(true); assert(signal[4]==LOW && active.playing()); active.play(440); assert(active.playing());
  active.stop(); assert(signal[4]==HIGH && !active.playing());
  Kit37Buzzer first, second; first.begin(7,true,true); second.begin(8,true,true);
  first.play(1); assert(first.playing() && toneFrequency==31);
  second.play(40000); assert(!first.playing() && second.playing() && toneFrequency==20000);
  first.stop(); assert(second.playing());
#if defined(ARDUINO_ARCH_ESP32)
  assert(channelFrequency[0]==5000 && channelFrequency[1]==5000 && channelFrequency[2]==5000);
  assert(channelFrequency[KIT37_LEDC_COUNT-2]==20000);
#endif
  second.stop(); assert(!second.playing());
  first.play(440); first.play(0); assert(!first.playing());
  puts("PASS: clamp, common-anode inversion, relay off-before-output, active polarity, single-tone replacement and PWM timer separation");
}
`;
fs.mkdirSync(path.join(build, 'soc'), {recursive: true});
fs.writeFileSync(path.join(build, 'soc/soc_caps.h'), '#define SOC_LEDC_CHANNEL_NUM 8\n#define SOC_LEDC_SUPPORT_HS_MODE 1\n');
const results = [];
for (const version of [0,2,3]) {
    fs.writeFileSync(path.join(build, 'esp_arduino_version.h'), `#define ESP_ARDUINO_VERSION_MAJOR ${version}\n`);
    const cpp = path.join(build, 'output-test.cpp');
    fs.writeFileSync(cpp, fake + declarations + tests);
    const exe = path.join(build, `outputs-${version}.exe`);
    const compiler = String.raw`C:\Program Files (x86)\Microsoft Visual Studio\2017\BuildTools\VC\Auxiliary\Build\vcvars64.bat`;
    const commandFile = path.join(build, 'compile.cmd');
    fs.writeFileSync(commandFile, `@echo off\r\ncall "${compiler}" >nul\r\nif errorlevel 1 exit /b 1\r\ncl /nologo /EHsc /I. ${version ? '/DARDUINO_ARCH_ESP32 /DESP_ARDUINO_VERSION_MAJOR='+version : ''} output-test.cpp /Fe:outputs-${version}.exe /Fo:outputs-${version}.obj\r\n`);
    const compiled = spawnSync('cmd.exe', ['/d','/c','compile.cmd'], {cwd:build,encoding:'utf8'});
    if (compiled.status !== 0) throw new Error(compiled.stdout + compiled.stderr);
    const run = spawnSync(exe, [], {encoding:'utf8'});
    if (run.status !== 0) throw new Error(run.stdout + run.stderr);
    results.push({variant: version ? `ESP32 core ${version}.x API stub` : 'Arduino API stub', pass: true, output: run.stdout.trim()});
}
fs.writeFileSync(path.join(build, 'validation.json'), JSON.stringify(results,null,2));
console.log(JSON.stringify(results,null,2));
