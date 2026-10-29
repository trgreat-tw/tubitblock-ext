const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert/strict');

const extension = path.resolve(__dirname, '..');
const repo = process.env.TUBITBLOCK_TEST_REPO || [
    path.resolve(extension, '../../../..'),
    path.resolve(extension, '../..')
].find(root => fs.existsSync(path.join(root, 'web/15.bundle.js')));
assert(repo, 'Set TUBITBLOCK_TEST_REPO to the local TubitBlock online source directory.');
const dependencies = process.env.TUBITBLOCK_TEST_NODE_MODULES;
const loadDependency = name => require(dependencies ? path.join(dependencies, name) : name);
const { chromium } = loadDependency('playwright-core');
const JSZip = loadDependency('jszip');
const output = path.join(__dirname, 'results');
fs.mkdirSync(output, {recursive: true});

// Load the actual bundled OpenBlock Blockly/Arduino modules without starting
// the editor, network compiler, updater or hardware connection code.
const chunks = {webpackJsonp: []};
let evaluated = [];
vm.runInNewContext(fs.readFileSync(path.join(repo, 'web/15.bundle.js'), 'utf8'), {
    window: chunks, eval: code => evaluated.push(code)
});
const factories = chunks.webpackJsonp[0][1];
const arduinoId = Number(Object.keys(factories).find(id => factories[id].toString().includes('Blockly.Arduino.init')));
assert(arduinoId, 'Actual Blockly Arduino module not found');
const pending = [arduinoId], modules = new Map();
while (pending.length) {
    const id = pending.pop();
    if (modules.has(id)) continue;
    assert(factories[id], `Missing bundled module ${id}`);
    evaluated = [];
    factories[id]({exports: {}}, {}, () => {});
    const code = evaluated[0] || factories[id].toString();
    modules.set(id, factories[id].toString());
    for (const dependency of code.matchAll(/__webpack_require__\((\d+)\)/g)) pending.push(Number(dependency[1]));
}
const bootstrap = `(function(factories) {
    const cache = {};
    function load(id) {
        if (cache[id]) return cache[id].exports;
        const module = cache[id] = {exports: {}};
        factories[id](module, module.exports, load);
        return module.exports;
    }
    load.o = (object, key) => Object.prototype.hasOwnProperty.call(object, key);
    load.d = (object, key, getter) => Object.defineProperty(object, key, {enumerable:true, get:getter});
    load.r = object => Object.defineProperty(object, '__esModule', {value:true});
    load.n = value => {const getter = value && value.__esModule ? () => value.default : () => value; load.d(getter, 'a', getter); return getter;};
    window.Blockly = load(207);
    load(${arduinoId});
})({${[...modules].map(([id, factory]) => `${id}:${factory}`).join(',')}});`;

// Use the real SB3 block codec. Asset/renderer imports are unused by these
// pure block-codec functions; Bluetooth and the network compiler are not run.
evaluated = [];
factories[224]({exports:{}}, {}, () => {});
const sb3Module = {exports:{}};
vm.runInNewContext(evaluated[0], {
    module:sb3Module, console,
    __webpack_require__:id => id === 69 ? console : id === 155 ? () => require('crypto').randomUUID() : {}
});

(async () => {
 const launchOptions={headless:true};
 if(process.env.TUBITBLOCK_TEST_BROWSER)launchOptions.executablePath=process.env.TUBITBLOCK_TEST_BROWSER;
 const browser=await chromium.launch(launchOptions);
 try {
  const page=await browser.newPage({viewport:{width:1440,height:900}});
  await page.setContent('<!doctype html><html><head><meta charset="utf-8"></head><body style="margin:0"><div id="blocks" style="width:1440px;height:900px"></div></body></html>');
  await page.addScriptTag({content:bootstrap});
  for(const file of ['translations.js','blocks.js','generator.js'])await page.addScriptTag({content:fs.readFileSync(path.join(extension,file),'utf8')});
  const results=await page.evaluate(({baseline})=>{
   const B=window.Blockly,checks=[];
   const check=(condition,message)=>{if(!condition)throw new Error(message);checks.push(message);};
   registerBlocksMessages(B);B.ScratchMsgs.setLocale('zh-tw');registerBlocks(B);registerGenerators(B);
            // These two built-in serial blocks are normally registered from
            // device metadata by the VM. Their fields/inputs match that metadata.
            B.defineBlocksWithJsonArray([
                {type:'arduino_serial_multiSerialBegin', message0:'Serial %1 begin %2', args0:[{type:'field_dropdown',name:'NO',options:[['0','0']]},{type:'field_dropdown', name:'VALUE', options:[['115200','115200']]}], extensions:['shape_statement']},
                {type:'arduino_serial_multiSerialPrint', message0:'Serial %1 print %2 %3', args0:[{type:'field_dropdown',name:'NO',options:[['0','0']]},{type:'input_value', name:'VALUE'}, {type:'field_dropdown', name:'EOL', options:[['println','warp'],['print','noWarp']]}], extensions:['shape_statement']}
            ]);

            const w = new B.Workspace();
            B.mainWorkspace = w;
            const block = type => w.newBlock(type);
            const attach = (parent, next) => parent.nextConnection.connect(next.previousConnection);
            const input = (parent, name, reporter) => parent.getInput(name).connection.connect(reporter.outputConnection);
            const text = value => {const b = block('text'); b.setFieldValue(value, 'TEXT'); return b;};
            const number = value => {const b = block('math_number'); b.setFieldValue(String(value), 'NUM'); return b;};
            const hat = block('event_whenarduinobegin');
            const serial = block('arduino_serial_multiSerialBegin'); serial.setFieldValue('115200', 'VALUE');
            const init = block('ps4_controller_init'); input(init, 'MAC', text('00:00:00:00:00:00'));
            check(!init.getField('LIB'), 'Initialization has no LIB dropdown');
            attach(hat, serial); attach(serial, init);
            const forever = block('control_forever'); attach(init, forever);
            const items = [];
            const print = reporter => {const p = block('arduino_serial_multiSerialPrint'); p.setFieldValue('warp', 'EOL'); input(p, 'VALUE', reporter); items.push(p);};
            print(text('PS4 compare: connected, LX, LY, RX, RY, L2, R2, all buttons, battery, board MAC'));
            print(block('ps4_controller_isConnected'));
            for (const option of ['LStickX','LStickY','RStickX','RStickY','L2Value','R2Value']) {
                const b = block('ps4_controller_getJoystick'); b.setFieldValue(option, 'JOYSTICK'); print(b);
            }
            for (const option of ['Up','Down','Left','Right','Triangle','Circle','Cross','Square','L1','L2','L3','R1','R2','R3','Share','Options','PSButton','TouchPad']) {
                const b = block('ps4_controller_isPressed'); b.setFieldValue(option, 'BUTTON'); print(b);
            }
            print(block('ps4_controller_getbattery')); print(block('ps4_controller_getAddress'));
            const wait = block('control_wait'); input(wait, 'DURATION', number(0.1)); items.push(wait);
            forever.getInput('SUBSTACK').connection.connect(items[0].previousConnection);
            for (let i = 1; i < items.length; i++) attach(items[i-1], items[i]);
            // Output blocks are behind an existing button condition to avoid
            // continuously flooding LED/rumble while comparing input latency.
            const condition = block('control_if');
            const cross = block('ps4_controller_isPressed'); cross.setFieldValue('Cross', 'BUTTON'); input(condition, 'CONDITION', cross);
            const led = block('ps4_controller_setLED'); input(led, 'LED_RED', number(20)); input(led, 'LED_GREEN', number(0)); input(led, 'LED_BLUE', number(80));
            const rumble = block('ps4_controller_setRumble'); input(rumble, 'RUMBLE', number(100));
            condition.getInput('SUBSTACK').connection.connect(led.previousConnection); attach(led, rumble); attach(wait, condition);


            const serializeProject = () => {
                const blocks = {};
                for (const b of w.getAllBlocks(false)) {
                    const entry = {opcode: b.type, next: b.getNextBlock() ? b.getNextBlock().id : null, parent: b.getParent() ? b.getParent().id : null,
                        inputs: {}, fields: {}, shadow: b.isShadow(), topLevel: !b.getParent()};
                    for (const i of b.inputList) {
                        for (const f of i.fieldRow) if (f.name) entry.fields[f.name] = [f.getValue(), null];
                        const child = i.connection && i.connection.targetBlock();
                        if (child) entry.inputs[i.name] = [child.isShadow() ? 1 : 2, child.id];
                    }
                    if (entry.topLevel) {entry.x = 48; entry.y = 40;}
                    blocks[b.id] = entry;
                }
                return {targets: [{isStage:true, name:'Stage', variables:{}, lists:{}, broadcasts:{}, blocks, comments:{}, currentCostume:0,
                    costumes:[], sounds:[], volume:100, layerOrder:0, tempo:60, videoTransparency:50, videoState:'off', textToSpeechLanguage:null}],
                    monitors:[], extensions:[], deviceExtensions:['ps4_controller'],
                    device:{deviceId:'arduinoEsp32', type:'arduino', pnpIdList:[]}, programMode:'upload', programLanguage:'block',
                    meta:{semver:'3.0.0', vm:'TubitBlock local PS4 comparison', agent:navigator.userAgent}};
            };

            const code=B.Arduino.workspaceToCode(w);
            const xml=B.Xml.domToText(B.Xml.workspaceToDom(w));
            check(!B.Msg.PS4_CONTROLLER_INIT.includes('LIB'),'Initialization label omits LIB');
            check(code.includes('#include <PS4ControllerReconnect.h>'),'Includes the retained reconnect library');
            check(!code.includes('PS4Controller.h')&&!code.includes('TubitBlockDS4')&&!code.includes('tubitDS4.'),'No removed backend in generated code');
            check(code.indexOf('PS4R.setClearBondsOnStart(true);')>=0&&code.indexOf('PS4R.setClearBondsOnStart(true);')<code.indexOf('PS4R.begin();'),'Automatic cleanup precedes begin');
            check((code.match(/setClearBondsOnStart\(true\)/g)||[]).length===1,'Cleanup setting is generated once');
            check(!code.includes('setLegacyPairing'),'No legacy pairing mode is generated');
            const normalize=s=>s.split(/\r?\n/).map(line=>line.trim()).filter(Boolean).join('\n');
            check(normalize(code)===normalize(baseline),'Generated controls match the previously working PS4RB program');
            for(const locale of ['en','zh-cn','zh-tw']) {
                const messages=B.ScratchMsgs.locales[locale];
                check(!messages.PS4_CONTROLLER_INIT.includes('%2')&&Boolean(messages.PS4_CONTROLLER_HELP),locale+' initialization has one input and cleanup tooltip');
            }
            const reopened=new B.Workspace();B.Xml.domToWorkspace(B.Xml.textToDom(xml),reopened);
            check(!reopened.getAllBlocks(false).find(b=>b.type==='ps4_controller_init').getField('LIB'),'Reopened project has no LIB field');
            check(B.Arduino.workspaceToCode(reopened)===code,'Reopened project generates identical code');reopened.dispose();
            for(const legacy of ['PS4C','PS4R','PS4RL','PS4RB','DS4']) {
                const dom=B.Xml.textToDom(xml),element=dom.querySelector('block[type="ps4_controller_init"]');
                const field=dom.ownerDocument.createElement('field');field.setAttribute('name','LIB');field.textContent=legacy;element.appendChild(field);
                const imported=new B.Workspace();B.Xml.domToWorkspace(dom,imported);
                check(!imported.getAllBlocks(false).find(b=>b.type==='ps4_controller_init').getField('LIB')&&B.Arduino.workspaceToCode(imported)===code,legacy+' obsolete LIB field migrates to fixed cleanup behavior');
                check(!B.Xml.domToText(B.Xml.workspaceToDom(imported)).includes('name="LIB"'),legacy+' is omitted when the project is saved again');
                imported.dispose();
            }
            const macBlock=init.getInputTargetBlock('MAC');macBlock.setFieldValue('02:00:00:12:34:56','TEXT');
            const custom=B.Arduino.workspaceToCode(w);
            check(custom.includes('PS4R.begin("02:00:00:12:34:56");')&&custom.indexOf('setClearBondsOnStart(true)')<custom.indexOf('PS4R.begin('),'Custom MAC retains cleanup ordering');
            macBlock.setFieldValue('00:00:00:00:00:00','TEXT');
            B.Arduino.init(w);const reporter=w.getAllBlocks(false).find(b=>b.type==='ps4_controller_getJoystick');
            check(B.Arduino.ps4_controller_getJoystick.call(reporter,reporter)[0].startsWith('PS4R.'),'Reporters visited before initialization use the fixed backend');B.Arduino.finish('');
            const project=serializeProject();
            const visual=B.inject('blocks',{scrollbars:true,sounds:false,zoom:{startScale:1}});
            B.Xml.domToWorkspace(B.Xml.textToDom('<xml><block type="ps4_controller_init" x="40" y="40"><value name="MAC"><shadow type="text"><field name="TEXT">00:00:00:00:00:00</field></shadow></value></block></xml>'),visual);
            window.visualWorkspace=visual;w.dispose();return {code,xml,project,checks};

  },{baseline:fs.readFileSync(path.join(__dirname,'fixtures/pre-default.ino'),'utf8')});
  const sketch=path.join(output,'PS4Default');fs.mkdirSync(sketch,{recursive:true});
  fs.writeFileSync(path.join(sketch,'PS4Default.ino'),results.code);
  fs.writeFileSync(path.join(output,'PS4-default.xml'),results.xml);
  const backdrop='<svg xmlns="http://www.w3.org/2000/svg" width="480" height="360" viewBox="0 0 480 360"><rect width="480" height="360" fill="#ffffff"/></svg>';
  const assetId=require('crypto').createHash('md5').update(backdrop).digest('hex');
  results.project.targets[0].costumes=[{assetId,name:'backdrop1',bitmapResolution:1,md5ext:assetId+'.svg',dataFormat:'svg',rotationCenterX:240,rotationCenterY:180}];
  const stage=results.project.targets[0];
  results.project.targets.push({isStage:false,name:'PS4 test',variables:{},lists:{},broadcasts:{},blocks:stage.blocks,comments:stage.comments,currentCostume:0,costumes:stage.costumes,sounds:[],volume:100,layerOrder:1,visible:true,x:0,y:0,size:100,direction:90,draggable:false,rotationStyle:'all around'});
  stage.blocks={};stage.comments={};
  for(const target of results.project.targets) {
   for(const block of Object.values(target.blocks)) {
    for(const field of Object.values(block.fields||{}))if(typeof field[0]==='number')field[0]=String(field[0]);
    if(['text','math_number'].includes(block.opcode)&&block.parent)block.shadow=true;
   }
   target.blocks=sb3Module.exports.serializeBlocks(sb3Module.exports.deserializeBlocks(target.blocks))[0];
  }
  const zip=new JSZip();zip.file(assetId+'.svg',backdrop);zip.file('project.json',JSON.stringify(results.project));
  const bytes=await zip.generateAsync({type:'nodebuffer'});fs.writeFileSync(path.join(output,'PS4-default.sb3'),bytes);
  const onDisk=JSON.parse(await (await JSZip.loadAsync(bytes)).file('project.json').async('string'));
  const decoded=sb3Module.exports.deserializeBlocks(onDisk.targets.find(target=>!target.isStage).blocks);
  const initializer=Object.values(decoded).find(b=>b.opcode==='ps4_controller_init');
  assert(initializer&&!initializer.fields.LIB,'SB3 has no LIB field');
  const [resaved]=sb3Module.exports.serializeBlocks(decoded);assert(!resaved[initializer.id].fields.LIB,'SB3 resave has no LIB field');
  results.checks.push('Actual SB3 codec import/resave preserves the simplified initialization');
  for(const legacy of ['PS4C','PS4R','PS4RL','PS4RB','DS4']) {
   const prior=structuredClone(onDisk),target=prior.targets.find(target=>!target.isStage);Object.values(target.blocks).find(b=>b.opcode==='ps4_controller_init').fields.LIB=[legacy,null];
   const parsed=sb3Module.exports.deserializeBlocks(target.blocks);
   assert(Object.values(parsed).find(b=>b.opcode==='ps4_controller_init'),'Legacy SB3 initialization accepted');
   results.checks.push(legacy+' legacy SB3 accepted by the actual VM codec');
  }
  fs.writeFileSync(path.join(output,'block-tests.json'),JSON.stringify({checks:results.checks},null,2));
  await page.screenshot({path:path.join(output,'PS4-initialization.png')});
  console.log('PASS: '+results.checks.length+' actual Blockly/Arduino migration checks; '+output);
 } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
