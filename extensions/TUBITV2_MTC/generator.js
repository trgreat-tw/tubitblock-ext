// BEGIN TUBIT INIT GUARD
/* Shared generator-side initialization validation. No C++ is emitted here. */
function createTubitInitGuard (Blockly) {
    const Arduino = Blockly.Arduino || (Blockly.Arduino = {});
    if (Arduino.__tubitInitGuard && Arduino.__tubitInitGuard.version === '20261030.1') {
        return Arduino.__tubitInitGuard;
    }
    const rules = [];
    const keys = Object.create(null);
    const starts = ['event_whenarduinobegin'];
    const procedureTypes = ['procedures_definition', 'procedures_defnoreturn', 'procedures_defreturn'];
    const callTypes = ['procedures_call', 'procedures_callnoreturn', 'procedures_callreturn'];
    const callbackTypes = ['tubitv2bno055_oiu', 'tubitv2_espnow_on_send', 'tubitv2_espnow_on_recv'];
    const getParent = block => block && typeof block.getParent === 'function' ? block.getParent() : null;
    const getNext = block => block && typeof block.getNextBlock === 'function' ? block.getNextBlock() : null;
    const input = (block, name) => block && typeof block.getInputTargetBlock === 'function' ? block.getInputTargetBlock(name) : null;
    const field = (block, name) => block && typeof block.getFieldValue === 'function' ? block.getFieldValue(name) : null;
    const rootOf = block => {
        if (block && typeof block.getRootBlock === 'function') return block.getRootBlock();
        const seen = new Set();
        while (block && getParent(block) && !seen.has(block)) { seen.add(block); block = getParent(block); }
        return block;
    };
    const active = block => {
        const seen = new Set();
        while (block && !seen.has(block)) {
            seen.add(block);
            if (block.disabled || (typeof block.isEnabled === 'function' && !block.isEnabled()) ||
                (typeof block.isInsertionMarker === 'function' && block.isInsertionMarker()) ||
                (typeof block.isInFlyout === 'function' ? block.isInFlyout() : block.isInFlyout) ||
                (block.workspace && block.workspace.isFlyout)) return false;
            if (typeof block.getSurroundParent === 'function') {
                block = block.getSurroundParent();
            } else {
                // In Blockly, a next statement's parent is its predecessor;
                // disabling that predecessor does not disable this statement.
                let child = block;
                let parent = getParent(child);
                while (parent && getNext(parent) === child) { child = parent; parent = getParent(child); }
                block = parent;
            }
        }
        return true;
    };
    const canonicalId = value => {
        if (value === null || typeof value === 'undefined') return null;
        const text = String(value).trim();
        return /^\d+$/.test(text) ? text.replace(/^0+(?=\d)/, '') : null;
    };
    const signature = (block, seen) => {
        if (!block) return '';
        seen = seen || new Set();
        if (seen.has(block)) return '[cycle]';
        seen.add(block);
        const fields = Object.create(null);
        if (block.fields && typeof block.fields === 'object') Object.keys(block.fields).forEach(name => { fields[name] = block.fields[name]; });
        (block.inputList || []).forEach(row => (row.fieldRow || []).forEach(item => {
            if (item.name && typeof item.getValue === 'function') fields[item.name] = item.getValue();
        }));
        ['NUM','TEXT','VAR','VARIABLE','OP','VALUE'].forEach(name => {
            const value = field(block, name);
            if (value !== null && typeof value !== 'undefined') fields[name] = value;
        });
        const children = (block.inputList || []).map(row => [row.name, signature(input(block, row.name), new Set(seen))]);
        return JSON.stringify([block.type, Object.keys(fields).sort().map(name => [name, String(fields[name])]), children]);
    };
    const inputSelector = (block, name, identifier) => {
        const child = input(block, name);
        if (!child) return null;
        const numeric = field(child, 'NUM');
        if (numeric !== null && typeof numeric !== 'undefined') {
            const number = Number(numeric);
            if (!isFinite(number) || number < 0 || Math.floor(number) !== number) return null;
            const canonical = canonicalId(String(number));
            return canonical === null ? null : {key: 'number:' + canonical, display: canonical};
        }
        // Legacy extensions sometimes use the same static expression in both
        // initialization and lookup. Compare its graph, never run a generator.
        const text = field(child, 'TEXT');
        if (identifier && text !== null && typeof text !== 'undefined') {
            const canonical = canonicalId(text);
            if (canonical === null) return null;
            return {key: 'number:' + canonical, display: canonical};
        }
        const display = typeof child.toString === 'function' && child.toString !== Object.prototype.toString ? child.toString() : '';
        return {key: 'expression:' + signature(child), display: display};
    };
    const selector = (block, rule) => {
        const result = {parts: [], display: ''};
        if (rule.idField) {
            const id = canonicalId(field(block, rule.idField));
            if (id === null) return null;
            result.parts.push('id:' + id); result.display = id;
        }
        if (rule.idInput) {
            const id = inputSelector(block, rule.idInput, true);
            if (!id) return null;
            result.parts.push('idInput:' + id.key); result.display = id.display;
        }
        const fields = rule.matchFields || (rule.matchField ? [rule.matchField] : []);
        for (let index = 0; index < fields.length; index++) {
            const item = fields[index];
            const name = typeof item === 'string' ? item : (rule.initTypes.indexOf(block.type) >= 0 ? item.init : item.use);
            const value = field(block, name);
            if (value === null || typeof value === 'undefined' || String(value).trim() === '') return null;
            const text = String(value).trim();
            if (/^-\d/.test(text)) return null;
            result.parts.push('field' + index + ':' + text);
            if (!result.display) result.display = text;
        }
        for (let index = 0; index < (rule.matchInputs || []).length; index++) {
            const item = rule.matchInputs[index];
            const name = typeof item === 'string' ? item : (rule.initTypes.indexOf(block.type) >= 0 ? item.init : item.use);
            const value = inputSelector(block, name, false);
            if (!value) return null;
            result.parts.push('input' + index + ':' + value.key);
            if (!result.display) result.display = value.display;
        }
        result.key = result.parts.join('|');
        return result;
    };
    const workspaceFor = block => block && block.workspace ? block.workspace :
        (typeof Blockly.getMainWorkspace === 'function' ? Blockly.getMainWorkspace() : null);
    const graphFor = (workspace, rule) => {
        const all = workspace.getAllBlocks(false);
        const tops = typeof workspace.getTopBlocks === 'function' ? workspace.getTopBlocks(true) : all.filter(block => !getParent(block));
        const startTypes = rule.startTypes || starts;
        const chains = [];
        tops.forEach((root, order) => {
            if (startTypes.indexOf(root.type) < 0 || !active(root)) return;
            const blocks = []; const seen = new Set(); let block = root;
            while (block && !seen.has(block)) { seen.add(block); blocks.push(block); block = getNext(block); }
            chains.push({root: root, order: order, blocks: blocks});
        });
        return {all: all, tops: tops, chains: chains};
    };
    const directPosition = (block, graph) => {
        for (let index = 0; index < graph.chains.length; index++) {
            const chain = graph.chains[index]; const position = chain.blocks.indexOf(block);
            if (position >= 0) {
                // A forever loop cannot be followed by startup work. Blockly's
                // shape normally enforces this, but malformed XML must not pass.
                for (let prior = 1; prior < position; prior++) {
                    if (active(chain.blocks[prior]) && chain.blocks[prior].type === 'control_forever') return null;
                }
                return {root: chain.root, order: chain.order, index: position};
            }
        }
        return null;
    };
    const surroundingPosition = (block, graph) => {
        const seen = new Set();
        while (block && !seen.has(block)) {
            seen.add(block); const position = directPosition(block, graph);
            if (position) return position;
            block = getParent(block);
        }
        return null;
    };
    const procedureName = block => {
        if (!block) return '';
        if (typeof block.getProcCode === 'function') return String(block.getProcCode());
        const prototype = input(block, 'custom_block');
        if (prototype && typeof prototype.getProcCode === 'function') return String(prototype.getProcCode());
        const name = field(block, 'NAME');
        return name === null || typeof name === 'undefined' ? '' : String(name);
    };
    const codeRoot = (root, rule) => {
        if (!root) return false;
        if ((rule.startTypes || starts).indexOf(root.type) >= 0 || procedureTypes.indexOf(root.type) >= 0 ||
            callbackTypes.concat(rule.callbackTypes || [], rule.allowedRootTypes || []).indexOf(root.type) >= 0) return true;
        // Other extension-defined C hats are accepted by the real generator.
        // A floating command has a previous connection and cannot satisfy this.
        return root.previousConnection === null && !root.outputConnection;
    };
    const effectiveSites = (block, graph, rule, visited) => {
        const root = rootOf(block);
        const direct = surroundingPosition(block, graph);
        if (direct) return [direct];
        if (procedureTypes.indexOf(root && root.type) < 0) return codeRoot(root, rule) ? [{callback: true}] : [];
        const name = procedureName(root);
        if (!name) return [{declaration: true}];
        visited = visited || new Set();
        if (visited.has(name)) return [];
        visited.add(name);
        let sites = [];
        graph.all.forEach(call => {
            if (active(call) && callTypes.indexOf(call.type) >= 0 && procedureName(call) === name) {
                sites = sites.concat(effectiveSites(call, graph, rule, new Set(visited)));
            }
        });
        // The host still emits unused procedure bodies, so their global
        // declarations must exist, while there is no runtime order to check.
        return sites.length ? sites : [{declaration: true}];
    };
    const ancestorOf = (candidate, block) => {
        const seen = new Set();
        while (block && !seen.has(block)) { if (block === candidate) return true; seen.add(block); block = getParent(block); }
        return false;
    };
    const labelFor = rule => (rule.labelKey && Blockly.Msg && Blockly.Msg[rule.labelKey]) || rule.label || '感測器';
    const fail = (block, rule, value, code) => {
        const messages = Blockly.Msg || {};
        const isBoard = rule.kind === 'tubit';
        const key = rule.messageKey || (isBoard ? 'INIT_GUARD_TUBIT_REQUIRED' :
            code === 'placement' ? 'INIT_GUARD_INIT_PLACEMENT' : 'INIT_GUARD_SENSOR_REQUIRED');
        const fallback = isBoard ? '請在Arduino啟動的積木底下放置"TUBIT初始化"積木。' :
            code === 'placement' ? '請將"%1%2初始化"積木直接放在Arduino啟動的積木底下，並放在讀取／使用積木之前。' :
                '請在Arduino啟動的積木底下放置"%1%2初始化"積木，並放在讀取／使用積木之前。';
        let identity = value ? value.display : '';
        if (identity && !rule.idField && !rule.idInput && (rule.matchField || rule.matchFields)) {
            identity = (messages.INIT_GUARD_PIN_SUFFIX || '腳位%1').replace(/%1/g, identity);
        }
        const parameters = [labelFor(rule), identity];
        const message = (messages[key] || fallback).replace(/%([12])/g, (match, number) => parameters[Number(number) - 1]);
        const error = new Error(message);
        error.initGuardCode = code;
        error.blockId = block && block.id;
        throw error;
    };
    const check = (block, rule, options) => {
        options = options || {};
        rule = rule || {};
        const workspace = workspaceFor(block);
        // Older isolated generator tests have no Blockly graph. Real Blockly
        // blocks always have workspace and parent/root APIs; never use setups_.
        if (!block || !workspace || typeof workspace.getAllBlocks !== 'function' ||
            (typeof block.getParent !== 'function' && typeof block.getRootBlock !== 'function')) {
            return {checked: false, reason: 'no-graph'};
        }
        if (!active(block)) return {checked: false, reason: 'inactive'};
        const value = selector(block, rule);
        if (!value) {
            if (options.fromPreflight && (rule.idField || rule.idInput)) {
                const error = new Error((Blockly.Msg && (Blockly.Msg.INIT_GUARD_INVALID_ID || Blockly.Msg.KITMODULE_ERROR_ID)) || '模組編號請輸入非負整數。');
                error.initGuardCode = 'invalid-id'; error.blockId = block.id; throw error;
            }
            return {checked: false, reason: 'invalid-selector'};
        }
        const graph = graphFor(workspace, rule);
        const isInitializer = rule.initTypes.indexOf(block.type) >= 0;
        if (isInitializer && !rule.declarationOnly) {
            if (!directPosition(block, graph)) fail(block, rule, value, 'placement');
            return {checked: true};
        }
        const root = rootOf(block);
        if (!codeRoot(root, rule)) return {checked: false, reason: 'inactive-code'};
        const candidates = graph.all.filter(candidate => {
            if (!active(candidate) || rule.initTypes.indexOf(candidate.type) < 0) return false;
            const candidateValue = selector(candidate, rule);
            if (!candidateValue || candidateValue.key !== value.key) return false;
            return rule.declarationOnly ? codeRoot(rootOf(candidate), rule) : !!directPosition(candidate, graph);
        });
        if (!candidates.length) fail(block, rule, value, 'missing');
        if (rule.declarationOnly) return {checked: true};
        const sites = effectiveSites(block, graph, rule);
        for (let index = 0; index < sites.length; index++) {
            const site = sites[index];
            if (site.callback || site.declaration) continue;
            const valid = candidates.some(candidate => {
                if (rule.allowAncestor && ancestorOf(candidate, block)) return true;
                const position = directPosition(candidate, graph);
                return position.root === site.root ? position.index < site.index : position.order < site.order;
            });
            if (!valid) fail(block, rule, value, 'order');
        }
        return {checked: true};
    };
    const guard = {
        version: '20261030.1',
        check: check,
        preflight: workspace => {
            if (!workspace || typeof workspace.getAllBlocks !== 'function' || workspace.isFlyout) return;
            workspace.getAllBlocks(false).forEach(block => {
                if (!active(block)) return;
                rules.forEach(rule => {
                    if (!rule.declarationOnly && rule.initTypes.indexOf(block.type) >= 0) check(block, rule, {fromPreflight: true});
                });
            });
        },
        installPreflight: () => {
            if (typeof Arduino.init !== 'function' || Arduino.init.__tubitInitGuard === guard) return;
            const original = Arduino.init;
            const wrapped = function (workspace) {
                // control_forever sets this flag before generating its body.
                // A body error bypasses finish(), so explicitly recover it at
                // the start of every generation, even when preflight fails.
                Arduino.firstLoop = true;
                const result = original.apply(this, arguments);
                guard.preflight(workspace || (typeof Blockly.getMainWorkspace === 'function' ? Blockly.getMainWorkspace() : null));
                return result;
            };
            wrapped.__tubitInitGuard = guard;
            Arduino.init = wrapped;
        },
        register: rule => {
            if (!rule || !Array.isArray(rule.initTypes) || !rule.initTypes.length) throw new Error('Initialization rule requires initTypes.');
            const key = rule.key || JSON.stringify([rule.initTypes, rule.idField, rule.idInput, rule.matchField,
                rule.matchFields, rule.matchInputs, !!rule.declarationOnly, !!rule.allowAncestor, rule.kind]);
            if (!keys[key]) { keys[key] = true; rules.push(rule); }
            guard.installPreflight();
            return guard;
        }
    };
    Arduino.__tubitInitGuard = guard;
    return guard;
}

// END TUBIT INIT GUARD
/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerGenerators (Blockly) {
    const ensureTuMtcDependencies = function () {
        Blockly.Arduino.includes_.tubitv2_set = `#include <TuBitCore.h>\n#include <Wire.h>`;
        Blockly.Arduino.includes_.tubitv2mtc = `#include <TuMTC_V3.h>`;

        const coreDefinitions = Blockly.Arduino.definitions_.tubitv2_set || '';
        if (!coreDefinitions.includes('TuBitCore tubit;')) {
            Blockly.Arduino.definitions_.tubitv2_set = `TuBitCore tubit;${coreDefinitions ? `\n${coreDefinitions}` : ''}`;
        }
        Blockly.Arduino.definitions_.tubitv2mtc = `TuMTC mtc(tubit);`;
        Blockly.Arduino.setups_.TUBITV2_SET = `tubit.init();`;
    };

    const ensureTuMtcBnoDependencies = function () {
        ensureTuMtcDependencies();

        // 與獨立 BNO055 擴充共用相同 key，兩邊同時使用也不會重複宣告。
        Blockly.Arduino.includes_.tubitv2bno055_init = `#include <EasyBNO055_ESP.h>`;
        Blockly.Arduino.includes_.tubitv2mtc_bno_math = `#include <math.h>`;
        Blockly.Arduino.definitions_.tubitv2bno055_init = `EasyBNO055_ESP bno;`;

        const workspace = Blockly.getMainWorkspace();
        const hasOtherI2CUpdate = workspace && workspace.getAllBlocks(false)
            .some(blockItem => blockItem.type === 'tubitv2bno055_oiu');
        Blockly.Arduino.setups_.tubitv2bno055_init = hasOtherI2CUpdate ?
            `bno.start(&otherI2CUpdate);` : `bno.start();`;

        Blockly.Arduino.definitions_.tubitv2mtc_bno_reader =
            `struct TuMtcBnoReadyCompat {\n` +
            `  template <typename SensorT>\n` +
            `  static auto read(SensorT &sensor, int) -> decltype(sensor.isReady(), bool()) {\n` +
            `    return sensor.isReady();\n` +
            `  }\n` +
            `  template <typename SensorT>\n` +
            `  static bool read(SensorT &, long) {\n` +
            `    return true;\n` +
            `  }\n` +
            `};\n` +
            `double readTuMtcBnoOrientationZ() {\n` +
            `  return TuMtcBnoReadyCompat::read(bno, 0) ? bno.orientationZ : NAN;\n` +
            `}`;
        Blockly.Arduino.setups_.tubitv2mtc_bno_wait =
            `unsigned long tuMtcBnoWaitStart = millis();\n` +
            `while (!TuMtcBnoReadyCompat::read(bno, 0) && millis() - tuMtcBnoWaitStart < 5000UL) {\n` +
            `  delay(20);\n` +
            `}`;
        Blockly.Arduino.setups_.tubitv2mtc_bno_heading =
            `mtc.setYawReader(readTuMtcBnoOrientationZ);\n` +
            `mtc.setYawDirection(1);\n` +
            `mtc.setHeadingPid(3.0, 0.0, 0.03, 120.0, 60.0);\n` +
            `mtc.setHeadingSettle(1.0, 100, 1500);`;
    };

    Blockly.Arduino.tubitv2mtc_setmotoroffset = function (block) {
        ensureTuMtcDependencies();

        const m1 = Blockly.Arduino.valueToCode(block, 'M1', Blockly.Arduino.ORDER_ATOMIC) || '0';
        const m2 = Blockly.Arduino.valueToCode(block, 'M2', Blockly.Arduino.ORDER_ATOMIC) || '0';
        const m3 = Blockly.Arduino.valueToCode(block, 'M3', Blockly.Arduino.ORDER_ATOMIC) || '0';
        const m4 = Blockly.Arduino.valueToCode(block, 'M4', Blockly.Arduino.ORDER_ATOMIC) || '0';
        return `mtc.SetMotorOffset(${m1},${m2},${m3},${m4});\n`;
    };


    Blockly.Arduino.tubitv2mtc_setcpr = function (block) {
        ensureTuMtcDependencies();

        const gs = Blockly.Arduino.valueToCode(block, 'GS', Blockly.Arduino.ORDER_ATOMIC);
        const ppr = Blockly.Arduino.valueToCode(block, 'PPR', Blockly.Arduino.ORDER_ATOMIC);
        return `tubit.setEncoderCPR(${gs}*4*${ppr});\n`;
    };
    Blockly.Arduino.tubitv2mtc_setpid = function (block) {
        ensureTuMtcDependencies();
        
        const p = Blockly.Arduino.valueToCode(block, 'P', Blockly.Arduino.ORDER_ATOMIC);
        const i = Blockly.Arduino.valueToCode(block, 'I', Blockly.Arduino.ORDER_ATOMIC);
        const d = Blockly.Arduino.valueToCode(block, 'D', Blockly.Arduino.ORDER_ATOMIC);
        return `tubit.setPIDTunings(${p},${i},${d});\n`;
    };

    Blockly.Arduino.tubitv2mtc_rundeg = function (block) {
        ensureTuMtcDependencies();
        const deg = Blockly.Arduino.valueToCode(block, 'DEG', Blockly.Arduino.ORDER_ATOMIC);
        const speed = Blockly.Arduino.valueToCode(block, 'SPEED', Blockly.Arduino.ORDER_ATOMIC);
        return `mtc.angleToXY(${deg},${speed});\n`;
    };

    Blockly.Arduino.tubitv2mtc_runxyr = function (block) {
        ensureTuMtcDependencies();
        const x = Blockly.Arduino.valueToCode(block, 'X', Blockly.Arduino.ORDER_ATOMIC);
        const y = Blockly.Arduino.valueToCode(block, 'Y', Blockly.Arduino.ORDER_ATOMIC);
        const r = Blockly.Arduino.valueToCode(block, 'R', Blockly.Arduino.ORDER_ATOMIC);
        return `mtc.driveVectorOpen(${x},${y},${r});\n`;
    };
    Blockly.Arduino.tubitv2mtc_runxyrv7rc = function (block) {
        ensureTuMtcDependencies();
        const x = Blockly.Arduino.valueToCode(block, 'X', Blockly.Arduino.ORDER_ATOMIC);
        const y = Blockly.Arduino.valueToCode(block, 'Y', Blockly.Arduino.ORDER_ATOMIC);
        const LR = Blockly.Arduino.valueToCode(block, 'LR', Blockly.Arduino.ORDER_ATOMIC);
        const RR = Blockly.Arduino.valueToCode(block, 'RR', Blockly.Arduino.ORDER_ATOMIC);
        return `mtc.driveVectorOpen(${x},${y},${LR}*-180 + ${RR}*180);\n`;
    };
    Blockly.Arduino.tubitv2mtc_setxyrdata = function (block) {
        ensureTuMtcDependencies();
        const  wh= Blockly.Arduino.valueToCode(block, 'WH', Blockly.Arduino.ORDER_ATOMIC);
        const ww = Blockly.Arduino.valueToCode(block, 'WW', Blockly.Arduino.ORDER_ATOMIC);
        const mh = Blockly.Arduino.valueToCode(block, 'MH', Blockly.Arduino.ORDER_ATOMIC);
        const mw = Blockly.Arduino.valueToCode(block, 'MW', Blockly.Arduino.ORDER_ATOMIC);
        return `mtc.setMtcParameters(${wh},${ww},${mh},${mw});\n`;
    };
    Blockly.Arduino.tubitv2mtc_addxyrdata = function (block) {
        ensureTuMtcDependencies();
        const x = Blockly.Arduino.valueToCode(block, 'MX', Blockly.Arduino.ORDER_ATOMIC);
        const y = Blockly.Arduino.valueToCode(block, 'MY', Blockly.Arduino.ORDER_ATOMIC);
        const r = Blockly.Arduino.valueToCode(block, 'MZ', Blockly.Arduino.ORDER_ATOMIC);
        return `mtc.adjustMtcConstantsAdd(${x},${y},${r});\n`;
    };

    Blockly.Arduino.tubitv2mtc_amove = function (block) {
        ensureTuMtcDependencies();
        const x = Blockly.Arduino.valueToCode(block, 'X', Blockly.Arduino.ORDER_ATOMIC);
        const y = Blockly.Arduino.valueToCode(block, 'Y', Blockly.Arduino.ORDER_ATOMIC);
        const r = Blockly.Arduino.valueToCode(block, 'R', Blockly.Arduino.ORDER_ATOMIC);
        const vm = Blockly.Arduino.valueToCode(block, 'VM', Blockly.Arduino.ORDER_ATOMIC);
        const a = Blockly.Arduino.valueToCode(block, 'A', Blockly.Arduino.ORDER_ATOMIC);
        return `mtc.moveSCurve(${x},${y},${r},${vm},${a},-(${a}),0,0);\n`;
    };

    Blockly.Arduino.tubitv2mtc_move = function (block) {
        ensureTuMtcDependencies();
        const x = Blockly.Arduino.valueToCode(block, 'X', Blockly.Arduino.ORDER_ATOMIC);
        const y = Blockly.Arduino.valueToCode(block, 'Y', Blockly.Arduino.ORDER_ATOMIC);
        const r = Blockly.Arduino.valueToCode(block, 'R', Blockly.Arduino.ORDER_ATOMIC);
        const vm = Blockly.Arduino.valueToCode(block, 'VM', Blockly.Arduino.ORDER_ATOMIC);
        const a = Blockly.Arduino.valueToCode(block, 'A', Blockly.Arduino.ORDER_ATOMIC);
        const ad = Blockly.Arduino.valueToCode(block, 'AD', Blockly.Arduino.ORDER_ATOMIC);
        const vs = Blockly.Arduino.valueToCode(block, 'VS', Blockly.Arduino.ORDER_ATOMIC);
        const ve = Blockly.Arduino.valueToCode(block, 'VE', Blockly.Arduino.ORDER_ATOMIC);
        return `mtc.moveSCurve(${x},${y},${r},${vm},${a},${ad},${vs},${ve});\n`;
    };

        Blockly.Arduino.tubitv2mtc_amovecurve = function (block) {
        ensureTuMtcDependencies();
        const x = Blockly.Arduino.valueToCode(block, 'X', Blockly.Arduino.ORDER_ATOMIC);
        const y = Blockly.Arduino.valueToCode(block, 'Y', Blockly.Arduino.ORDER_ATOMIC);
        const r = Blockly.Arduino.valueToCode(block, 'R', Blockly.Arduino.ORDER_ATOMIC);
        const bulge = Blockly.Arduino.valueToCode(block, 'BULGE', Blockly.Arduino.ORDER_ATOMIC);
        const vm = Blockly.Arduino.valueToCode(block, 'VM', Blockly.Arduino.ORDER_ATOMIC);
        const a = Blockly.Arduino.valueToCode(block, 'A', Blockly.Arduino.ORDER_ATOMIC);
        return `mtc.moveCurveSCurve(${x},${y},${r},${bulge},${vm},${a},-(${a}),0,0);\n`;
    };

    Blockly.Arduino.tubitv2mtc_movecurve = function (block) {
        ensureTuMtcDependencies();
        const x = Blockly.Arduino.valueToCode(block, 'X', Blockly.Arduino.ORDER_ATOMIC);
        const y = Blockly.Arduino.valueToCode(block, 'Y', Blockly.Arduino.ORDER_ATOMIC);
        const r = Blockly.Arduino.valueToCode(block, 'R', Blockly.Arduino.ORDER_ATOMIC);
        const bulge = Blockly.Arduino.valueToCode(block, 'BULGE', Blockly.Arduino.ORDER_ATOMIC);
        const vm = Blockly.Arduino.valueToCode(block, 'VM', Blockly.Arduino.ORDER_ATOMIC);
        const a = Blockly.Arduino.valueToCode(block, 'A', Blockly.Arduino.ORDER_ATOMIC);
        const ad = Blockly.Arduino.valueToCode(block, 'AD', Blockly.Arduino.ORDER_ATOMIC);
        const vs = Blockly.Arduino.valueToCode(block, 'VS', Blockly.Arduino.ORDER_ATOMIC);
        const ve = Blockly.Arduino.valueToCode(block, 'VE', Blockly.Arduino.ORDER_ATOMIC);
        return `mtc.moveCurveSCurve(${x},${y},${r},${bulge},${vm},${a},${ad},${vs},${ve});\n`;
    };
 
    Blockly.Arduino.tubitv2mtc_setbodydeg = function (block) {
        ensureTuMtcDependencies();
        const vn = Blockly.Arduino.valueToCode(block, 'DEG', Blockly.Arduino.ORDER_ATOMIC) || '0';
        return `mtc.moveBody(0, 0, 0, true,fmod(360.0 - ${vn}, 360.0));\n`;
    };

    Blockly.Arduino.tubitv2mtc_interrset = function (block) {
        ensureTuMtcDependencies();
        const vn = Blockly.Arduino.valueToCode(block, 'INTTNAME', Blockly.Arduino.ORDER_ATOMIC).slice(1, -1);
        return `mtc.setInterruptCallback(&${vn});\n`;
    };

    Blockly.Arduino.tubitv2mtc_interrevent = function (block) {
        ensureTuMtcDependencies();
        const vn = Blockly.Arduino.valueToCode(block, 'INTTNAME', Blockly.Arduino.ORDER_ATOMIC).slice(1, -1);
        var branch = Blockly.Arduino.statementToCode(block, 'SUBSTACK');

        let code = `bool ${vn}() {\n`;
        code += branch.slice(2).replace(/\n  /g, '\n');
        code += `}\n`

        Blockly.Arduino.definitions_['TUBITV2_mtc' + vn] =code;
        return '';
    };

    Blockly.Arduino.tubitv2mtc_return = function (block) {
        ensureTuMtcDependencies();
        const boolCode = Blockly.Arduino.valueToCode(block, 'B', Blockly.Arduino.ORDER_ATOMIC);
        return `return ${boolCode};\n`;
    };

    Blockly.Arduino.tubitv2mtc_interr = function (block) {
        ensureTuMtcDependencies();
        const type = block.getFieldValue('TYPE');
        return [`mtc.${type}`, Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino.tubitv2mtc_bno_set_move_origin = function () {
        ensureTuMtcBnoDependencies();
        return `mtc.captureBnoStartFrame();\n`;
    };

    Blockly.Arduino.tubitv2mtc_bno_amove_scurve = function (block) {
        ensureTuMtcBnoDependencies();
        const x = Blockly.Arduino.valueToCode(block, 'X', Blockly.Arduino.ORDER_ATOMIC) || '0';
        const y = Blockly.Arduino.valueToCode(block, 'Y', Blockly.Arduino.ORDER_ATOMIC) || '0';
        const z = Blockly.Arduino.valueToCode(block, 'Z', Blockly.Arduino.ORDER_ATOMIC) || '0';
        const vm = Blockly.Arduino.valueToCode(block, 'VM', Blockly.Arduino.ORDER_ATOMIC) || '800';
        const a = Blockly.Arduino.valueToCode(block, 'A', Blockly.Arduino.ORDER_ATOMIC) || '400';
        return `mtc.moveSCurveBno(${x},${y},${z},${vm},${a},-(${a}),0,0);\n`;
    };

    Blockly.Arduino.tubitv2mtc_bno_move_scurve = function (block) {
        ensureTuMtcBnoDependencies();
        const x = Blockly.Arduino.valueToCode(block, 'X', Blockly.Arduino.ORDER_ATOMIC) || '0';
        const y = Blockly.Arduino.valueToCode(block, 'Y', Blockly.Arduino.ORDER_ATOMIC) || '0';
        const z = Blockly.Arduino.valueToCode(block, 'Z', Blockly.Arduino.ORDER_ATOMIC) || '0';
        const vm = Blockly.Arduino.valueToCode(block, 'VM', Blockly.Arduino.ORDER_ATOMIC) || '800';
        const a = Blockly.Arduino.valueToCode(block, 'A', Blockly.Arduino.ORDER_ATOMIC) || '400';
        const ad = Blockly.Arduino.valueToCode(block, 'AD', Blockly.Arduino.ORDER_ATOMIC) || '-400';
        const vs = Blockly.Arduino.valueToCode(block, 'VS', Blockly.Arduino.ORDER_ATOMIC) || '0';
        const ve = Blockly.Arduino.valueToCode(block, 'VE', Blockly.Arduino.ORDER_ATOMIC) || '0';
        return `mtc.moveSCurveBno(${x},${y},${z},${vm},${a},${ad},${vs},${ve});\n`;
    };

    Blockly.Arduino.tubitv2mtc_bnomove = function (block) {
        ensureTuMtcDependencies();
        const type = block.getFieldValue('TYPE');
        const x = Blockly.Arduino.valueToCode(block, 'X', Blockly.Arduino.ORDER_ATOMIC);
        const y = Blockly.Arduino.valueToCode(block, 'Y', Blockly.Arduino.ORDER_ATOMIC);
        const z = Blockly.Arduino.valueToCode(block, 'Z', Blockly.Arduino.ORDER_ATOMIC);
        const nowz = Blockly.Arduino.valueToCode(block, 'NOWZ', Blockly.Arduino.ORDER_ATOMIC);

        if (type === 'ENC') {
            return `mtc.bnoMoveClosed(${x}, ${y}, ${z}, ${nowz});\n`;
        } else {
            return `mtc.bnoMoveOpen(${x}, ${y}, ${z}, ${nowz});\n`;
        }
    };

     /*
    Blockly.Arduino.tubitv2mtc_movestartevent = function (block) {

        var branch = Blockly.Arduino.statementToCode(block, 'SUBSTACK');

        let code = `void onMoveStart() {\n`;
        code += branch.slice(2).replace(/\n  /g, '\n');
        code += `}\n`

        Blockly.Arduino.definitions_.tubitv2mtc_movestartevent =code;
        Blockly.Arduino.setups_.tubitv2mtc_movestartevent = 'tubit.setMoveStartCallback(onMoveStart);';
        return '';
    };

    Blockly.Arduino.tubitv2mtc_moveloopevent = function (block) {

        var branch = Blockly.Arduino.statementToCode(block, 'SUBSTACK');

        let code = `void onEachLoop() {\n`;
        code += branch.slice(2).replace(/\n  /g, '\n');
        code += `}\n`

        Blockly.Arduino.definitions_.tubitv2mtc_moveloopevent =code;
        Blockly.Arduino.setups_.tubitv2mtc_moveloopevent = 'tubit.setMoveLoopCallback(onEachLoop);';
        return '';
    };

   
    Blockly.Arduino.tubitv2mtc_gcsmove = function (block) {
        const x = Blockly.Arduino.valueToCode(block, 'X', Blockly.Arduino.ORDER_ATOMIC);
        const y = Blockly.Arduino.valueToCode(block, 'Y', Blockly.Arduino.ORDER_ATOMIC);
        const z = Blockly.Arduino.valueToCode(block, 'Z', Blockly.Arduino.ORDER_ATOMIC);
        const sec = Blockly.Arduino.valueToCode(block, 'SEC', Blockly.Arduino.ORDER_ATOMIC);
        const rkp = Blockly.Arduino.valueToCode(block, 'RKP', Blockly.Arduino.ORDER_ATOMIC);
        const nowz = Blockly.Arduino.valueToCode(block, 'NOWZ', Blockly.Arduino.ORDER_ATOMIC);
        return `tubit.MTC_GCS_MOVE(${x}, ${y}, ${z}, ${sec}, ${rkp}, &(${nowz}));\n`;
    };
   */
    // BEGIN TUBIT INIT GUARD WRAPPERS
    const __tubitInitGuard = createTubitInitGuard(Blockly);
    const __tubitInitRules = {
        "tubitv2mtc_setmotoroffset": [
            {
                "initTypes": [
                    "tubitv2_set"
                ],
                "kind": "tubit",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_SET",
                "label": "TUBIT"
            }
        ],
        "tubitv2mtc_setcpr": [
            {
                "initTypes": [
                    "tubitv2_set"
                ],
                "kind": "tubit",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_SET",
                "label": "TUBIT"
            }
        ],
        "tubitv2mtc_setpid": [
            {
                "initTypes": [
                    "tubitv2_set"
                ],
                "kind": "tubit",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_SET",
                "label": "TUBIT"
            }
        ],
        "tubitv2mtc_rundeg": [
            {
                "initTypes": [
                    "tubitv2_set"
                ],
                "kind": "tubit",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_SET",
                "label": "TUBIT"
            }
        ],
        "tubitv2mtc_runxyr": [
            {
                "initTypes": [
                    "tubitv2_set"
                ],
                "kind": "tubit",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_SET",
                "label": "TUBIT"
            }
        ],
        "tubitv2mtc_runxyrv7rc": [
            {
                "initTypes": [
                    "tubitv2_set"
                ],
                "kind": "tubit",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_SET",
                "label": "TUBIT"
            }
        ],
        "tubitv2mtc_setxyrdata": [
            {
                "initTypes": [
                    "tubitv2_set"
                ],
                "kind": "tubit",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_SET",
                "label": "TUBIT"
            }
        ],
        "tubitv2mtc_addxyrdata": [
            {
                "initTypes": [
                    "tubitv2_set"
                ],
                "kind": "tubit",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_SET",
                "label": "TUBIT"
            }
        ],
        "tubitv2mtc_amove": [
            {
                "initTypes": [
                    "tubitv2_set"
                ],
                "kind": "tubit",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_SET",
                "label": "TUBIT"
            }
        ],
        "tubitv2mtc_move": [
            {
                "initTypes": [
                    "tubitv2_set"
                ],
                "kind": "tubit",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_SET",
                "label": "TUBIT"
            }
        ],
        "tubitv2mtc_amovecurve": [
            {
                "initTypes": [
                    "tubitv2_set"
                ],
                "kind": "tubit",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_SET",
                "label": "TUBIT"
            }
        ],
        "tubitv2mtc_movecurve": [
            {
                "initTypes": [
                    "tubitv2_set"
                ],
                "kind": "tubit",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_SET",
                "label": "TUBIT"
            }
        ],
        "tubitv2mtc_setbodydeg": [
            {
                "initTypes": [
                    "tubitv2_set"
                ],
                "kind": "tubit",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_SET",
                "label": "TUBIT"
            }
        ],
        "tubitv2mtc_interrset": [
            {
                "initTypes": [
                    "tubitv2_set"
                ],
                "kind": "tubit",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_SET",
                "label": "TUBIT"
            }
        ],
        "tubitv2mtc_interrevent": [
            {
                "initTypes": [
                    "tubitv2_set"
                ],
                "kind": "tubit",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_SET",
                "label": "TUBIT"
            }
        ],
        "tubitv2mtc_return": [
            {
                "initTypes": [
                    "tubitv2_set"
                ],
                "kind": "tubit",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_SET",
                "label": "TUBIT"
            }
        ],
        "tubitv2mtc_interr": [
            {
                "initTypes": [
                    "tubitv2_set"
                ],
                "kind": "tubit",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_SET",
                "label": "TUBIT"
            }
        ],
        "tubitv2mtc_bno_set_move_origin": [
            {
                "initTypes": [
                    "tubitv2_set"
                ],
                "kind": "tubit",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_SET",
                "label": "TUBIT"
            }
        ],
        "tubitv2mtc_bno_amove_scurve": [
            {
                "initTypes": [
                    "tubitv2_set"
                ],
                "kind": "tubit",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_SET",
                "label": "TUBIT"
            }
        ],
        "tubitv2mtc_bno_move_scurve": [
            {
                "initTypes": [
                    "tubitv2_set"
                ],
                "kind": "tubit",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_SET",
                "label": "TUBIT"
            }
        ],
        "tubitv2mtc_bnomove": [
            {
                "initTypes": [
                    "tubitv2_set"
                ],
                "kind": "tubit",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_SET",
                "label": "TUBIT"
            }
        ]
    };
    Object.keys(__tubitInitRules).forEach(function (type) {
        const original = Blockly.Arduino[type];
        if (typeof original !== "function") return;
        const rules = __tubitInitRules[type];
        rules.forEach(function (rule) { __tubitInitGuard.register(rule); });
        Blockly.Arduino[type] = function (block) {
            const current = block && block.type ? block : this;
            rules.forEach(function (rule) { __tubitInitGuard.check(current, rule); });
            if (type !== "tubitv2_set" && rules.some(function (rule) { return rule.kind === "tubit"; })) {
                // Valid startup initialization may be visited after a procedure body.
                Blockly.Arduino.includes_.tubitv2_set = "#include <TuBitCore.h>\n#include <Wire.h>";
                const existing = Blockly.Arduino.definitions_.tubitv2_set || "";
                if (!existing.includes("TuBitCore tubit;")) Blockly.Arduino.definitions_.tubitv2_set = "TuBitCore tubit;" + (existing ? "\n" + existing : "");
                Blockly.Arduino.setups_.TUBITV2_SET = "tubit.init();";
            }
            return original.apply(this, arguments);
        };
    });
// END TUBIT INIT GUARD WRAPPERS
return Blockly;
}

exports = registerGenerators;
