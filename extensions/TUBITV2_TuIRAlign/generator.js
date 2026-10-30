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

    const ensureNumber = function (code, fallback) {
        return code || fallback;
    };

    const numberToCode = function (block, name, fallback) {
        return ensureNumber(Blockly.Arduino.valueToCode(block, name, Blockly.Arduino.ORDER_ATOMIC), fallback);
    };

    const irGetter = {
        UP: 'getFilteredUP',
        BK: 'getFilteredBK',
        LU: 'getFilteredLU',
        LB: 'getFilteredLB',
        RU: 'getFilteredRU',
        RB: 'getFilteredRB'
    };

    const pidAxisSetters = {
        Y: 'setPidY',
        X: 'setXPID',
        Z: 'setZPID'
    };

    const isSideDirection = function (direction) {
        return direction === 'IR_L' || direction === 'IR_R';
    };

    const isNoDirection = function (direction) {
        return direction === 'IR_NONE';
    };

    const secondsToMillisCode = function (seconds) {
        return `(unsigned long)((${seconds}) * 1000UL)`;
    };

    const ensureRobot = function (robot) {
        const isOtc = robot === 'TuOTC';
        const includeKey = isOtc ? 'tubitv2otc' : 'tubitv2mtc';
        const header = isOtc ? 'TuOTC.h' : 'TuMTC.h';
        const robotName = isOtc ? 'otc' : 'mtc';
        const declaration = `${robot} ${robotName}(tubit);`;

        Blockly.Arduino.includes_.tubitv2_set = `#include <TuBitCore.h>\n#include <Wire.h>`;
        Blockly.Arduino.includes_[includeKey] = `#include <${header}>`;

        const coreDefinitions = Blockly.Arduino.definitions_.tubitv2_set || '';
        if (!coreDefinitions.includes('TuBitCore tubit;')) {
            Blockly.Arduino.definitions_.tubitv2_set = `TuBitCore tubit;${coreDefinitions ? `\n${coreDefinitions}` : ''}`;
        }

        // MTC uses its own definition key; OTC currently shares the core key.
        if (isOtc) {
            if (!Blockly.Arduino.definitions_.tubitv2_set.includes(declaration)) {
                Blockly.Arduino.definitions_.tubitv2_set += `\n${declaration}`;
            }
        } else {
            Blockly.Arduino.definitions_[includeKey] = declaration;
        }

        Blockly.Arduino.setups_.TUBITV2_SET = `tubit.init();`;
        return robotName;
    };

    Blockly.Arduino.tubitv2tuiralign_init = function (block) {
        const robot = block.getFieldValue('ROBOT');
        const robotName = ensureRobot(robot);
        Blockly.Arduino.includes_.tubitv2tuiralign = `#include <TuIRAlign.h>`;
        Blockly.Arduino.definitions_.tubitv2tuiralign = `extern TuBitCore tubit;\n${robot}& tuirRobot() {\n    return ${robotName};\n}\nTuIRAlign<${robot}>& tuirAlign() {\n    static TuIRAlign<${robot}> align(tubit, tuirRobot());\n    return align;\n}\n`;
        return `tuirAlign();\n`;
    };

    Blockly.Arduino.tubitv2tuiralign_setpins = function (block) {
        const front = block.getFieldValue('FRONT');
        const back = block.getFieldValue('BACK');
        const leftBack = block.getFieldValue('LEFT_BACK');
        const leftFront = block.getFieldValue('LEFT_FRONT');
        const rightBack = block.getFieldValue('RIGHT_BACK');
        const rightFront = block.getFieldValue('RIGHT_FRONT');
        return `tuirAlign().setPins(${front},${back},${leftBack},${leftFront},${rightBack},${rightFront});\n`;
    };

    Blockly.Arduino.tubitv2tuiralign_settargets = function (block) {
        const front = numberToCode(block, 'FRONT', '25');
        const back = numberToCode(block, 'BACK', '25');
        const leftFront = numberToCode(block, 'LEFT_FRONT', '25');
        const leftBack = numberToCode(block, 'LEFT_BACK', '25');
        const rightFront = numberToCode(block, 'RIGHT_FRONT', '25');
        const rightBack = numberToCode(block, 'RIGHT_BACK', '25');
        return `tuirAlign().setTargets(${front},${back},${leftFront},${leftBack},${rightFront},${rightBack});\n`;
    };

    Blockly.Arduino.tubitv2tuiralign_setratioangle = function (block) {
        const enabled = block.getFieldValue('ENABLE') === 'TRUE' ? 'true' : 'false';
        return `tuirAlign().setUseRatioAngle(${enabled});\n`;
    };

    Blockly.Arduino.tubitv2tuiralign_setdeadbands = function (block) {
        const distance = numberToCode(block, 'DISTANCE', '0.3');
        const angle = numberToCode(block, 'ANGLE', '0.3');
        return `tuirAlign().setDeadbands(${distance},${angle});\n`;
    };

    Blockly.Arduino.tubitv2tuiralign_settolerance = function (block) {
        const percent = numberToCode(block, 'PERCENT', '5.0');
        return `tuirAlign().setTolerancePercent(${percent});\n`;
    };

    Blockly.Arduino.tubitv2tuiralign_setoutputlimits = function (block) {
        const vx = numberToCode(block, 'VX', '20');
        const vy = numberToCode(block, 'VY', '20');
        const wz = numberToCode(block, 'WZ', '360');
        const wzScale = numberToCode(block, 'WZ_SCALE', '2.5');
        return `tuirAlign().setOutputLimits(${vx},${vy},${wz},${wzScale});\n`;
    };

    Blockly.Arduino.tubitv2tuiralign_setpidaxis = function (block) {
        const axis = block.getFieldValue('AXIS');
        const setter = pidAxisSetters[axis] || pidAxisSetters.Y;
        const p = numberToCode(block, 'P', '0');
        const i = numberToCode(block, 'I', '0');
        const d = numberToCode(block, 'D', '0');
        return `tuirAlign().${setter}(${p},${i},${d});\n`;
    };

    Blockly.Arduino.tubitv2tuiralign_setpidxz = function (block) {
        const xp = numberToCode(block, 'X_P', '5.0');
        const xi = numberToCode(block, 'X_I', '0');
        const xd = numberToCode(block, 'X_D', '0.035');
        const zp = numberToCode(block, 'Z_P', '38');
        const zi = numberToCode(block, 'Z_I', '0');
        const zd = numberToCode(block, 'Z_D', '0.04');
        return `tuirAlign().setXZPID(${xp},${xi},${xd},${zp},${zi},${zd});\n`;
    };

    Blockly.Arduino.tubitv2tuiralign_setpidall = function (block) {
        const yp = numberToCode(block, 'Y_P', '3.0');
        const yi = numberToCode(block, 'Y_I', '0');
        const yd = numberToCode(block, 'Y_D', '0.004');
        const xp = numberToCode(block, 'X_P', '5.0');
        const xi = numberToCode(block, 'X_I', '0');
        const xd = numberToCode(block, 'X_D', '0.035');
        const zp = numberToCode(block, 'Z_P', '38');
        const zi = numberToCode(block, 'Z_I', '0');
        const zd = numberToCode(block, 'Z_D', '0.04');
        return `tuirAlign().setPidAll(${yp},${yi},${yd},${xp},${xi},${xd},${zp},${zi},${zd});\n`;
    };

    Blockly.Arduino.tubitv2tuiralign_align = function (block) {
        const main = block.getFieldValue('MAIN');
        const secondary = block.getFieldValue('SECONDARY');
        if (isNoDirection(main) && isNoDirection(secondary)) {
            return '';
        }
        if (isNoDirection(main)) {
            return `tuirAlign().alignBlocking(IR_NONE,${secondary});\n`;
        }
        if (isSideDirection(secondary)) {
            return `if (tuirAlign().alignBlocking(${main},IR_NONE)) {\n    tuirAlign().alignBlocking(IR_NONE,${secondary});\n}\n`;
        }
        return `tuirAlign().alignBlocking(${main},${secondary});\n`;
    };

    Blockly.Arduino.tubitv2tuiralign_align_timeout = function (block) {
        const main = block.getFieldValue('MAIN');
        const secondary = block.getFieldValue('SECONDARY');
        const timeout = secondsToMillisCode(numberToCode(block, 'TIMEOUT', '8'));
        const confirm = secondsToMillisCode(numberToCode(block, 'CONFIRM', '1'));
        if (isNoDirection(main) && isNoDirection(secondary)) {
            return '';
        }
        if (isNoDirection(main)) {
            return `tuirAlign().alignBlocking(IR_NONE,${secondary},${timeout},${confirm});\n`;
        }
        if (isSideDirection(secondary)) {
            return `if (tuirAlign().alignBlocking(${main},IR_NONE,${timeout},${confirm})) {\n    tuirAlign().alignBlocking(IR_NONE,${secondary},${timeout},${confirm});\n}\n`;
        }
        return `tuirAlign().alignBlocking(${main},${secondary},${timeout},${confirm});\n`;
    };

    Blockly.Arduino.tubitv2tuiralign_align_single = function (block) {
        const direction = block.getFieldValue('DIRECTION');
        const timeout = secondsToMillisCode(numberToCode(block, 'TIMEOUT', '8'));
        const confirm = secondsToMillisCode(numberToCode(block, 'CONFIRM', '1'));
        return `tuirAlign().alignBlocking(IR_NONE,${direction},${timeout},${confirm});\n`;
    };

    Blockly.Arduino.tubitv2tuiralign_step = function (block) {
        const main = block.getFieldValue('MAIN');
        const secondary = block.getFieldValue('SECONDARY');
        if (isNoDirection(main) && isNoDirection(secondary)) {
            return ['true', Blockly.Arduino.ORDER_ATOMIC];
        }
        if (isNoDirection(main)) {
            return [`tuirAlign().step(IR_NONE,${secondary})`, Blockly.Arduino.ORDER_ATOMIC];
        }
        if (isSideDirection(secondary)) {
            return [`tuirAlign().step(IR_NONE,${secondary})`, Blockly.Arduino.ORDER_ATOMIC];
        }
        return [`tuirAlign().step(${main},${secondary})`, Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino.tubitv2tuiralign_step_single = function (block) {
        const direction = block.getFieldValue('DIRECTION');
        return [`tuirAlign().step(IR_NONE,${direction})`, Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino.tubitv2tuiralign_readir = function (block) {
        const ir = block.getFieldValue('IR');
        const getter = irGetter[ir] || irGetter.UP;
        const code = `(tuirAlign().readAllIR_(), tuirAlign().${getter}())`;
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };

    // BEGIN TUBIT INIT GUARD WRAPPERS
    const __tubitInitGuard = createTubitInitGuard(Blockly);
    const __tubitInitRules = {
        "tubitv2tuiralign_init": [
            {
                "initTypes": [
                    "tubitv2_set"
                ],
                "kind": "tubit",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_SET",
                "label": "TUBIT"
            },
            {
                "initTypes": [
                    "tubitv2tuiralign_init"
                ],
                "kind": "sensor",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_TUIRALIGN",
                "label": "TuIRAlign IR 靠牆校正"
            }
        ],
        "tubitv2tuiralign_setpins": [
            {
                "initTypes": [
                    "tubitv2_set"
                ],
                "kind": "tubit",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_SET",
                "label": "TUBIT"
            },
            {
                "initTypes": [
                    "tubitv2tuiralign_init"
                ],
                "kind": "sensor",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_TUIRALIGN",
                "label": "TuIRAlign IR 靠牆校正"
            }
        ],
        "tubitv2tuiralign_settargets": [
            {
                "initTypes": [
                    "tubitv2_set"
                ],
                "kind": "tubit",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_SET",
                "label": "TUBIT"
            },
            {
                "initTypes": [
                    "tubitv2tuiralign_init"
                ],
                "kind": "sensor",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_TUIRALIGN",
                "label": "TuIRAlign IR 靠牆校正"
            }
        ],
        "tubitv2tuiralign_setratioangle": [
            {
                "initTypes": [
                    "tubitv2_set"
                ],
                "kind": "tubit",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_SET",
                "label": "TUBIT"
            },
            {
                "initTypes": [
                    "tubitv2tuiralign_init"
                ],
                "kind": "sensor",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_TUIRALIGN",
                "label": "TuIRAlign IR 靠牆校正"
            }
        ],
        "tubitv2tuiralign_setdeadbands": [
            {
                "initTypes": [
                    "tubitv2_set"
                ],
                "kind": "tubit",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_SET",
                "label": "TUBIT"
            },
            {
                "initTypes": [
                    "tubitv2tuiralign_init"
                ],
                "kind": "sensor",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_TUIRALIGN",
                "label": "TuIRAlign IR 靠牆校正"
            }
        ],
        "tubitv2tuiralign_settolerance": [
            {
                "initTypes": [
                    "tubitv2_set"
                ],
                "kind": "tubit",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_SET",
                "label": "TUBIT"
            },
            {
                "initTypes": [
                    "tubitv2tuiralign_init"
                ],
                "kind": "sensor",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_TUIRALIGN",
                "label": "TuIRAlign IR 靠牆校正"
            }
        ],
        "tubitv2tuiralign_setoutputlimits": [
            {
                "initTypes": [
                    "tubitv2_set"
                ],
                "kind": "tubit",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_SET",
                "label": "TUBIT"
            },
            {
                "initTypes": [
                    "tubitv2tuiralign_init"
                ],
                "kind": "sensor",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_TUIRALIGN",
                "label": "TuIRAlign IR 靠牆校正"
            }
        ],
        "tubitv2tuiralign_setpidaxis": [
            {
                "initTypes": [
                    "tubitv2_set"
                ],
                "kind": "tubit",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_SET",
                "label": "TUBIT"
            },
            {
                "initTypes": [
                    "tubitv2tuiralign_init"
                ],
                "kind": "sensor",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_TUIRALIGN",
                "label": "TuIRAlign IR 靠牆校正"
            }
        ],
        "tubitv2tuiralign_setpidxz": [
            {
                "initTypes": [
                    "tubitv2_set"
                ],
                "kind": "tubit",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_SET",
                "label": "TUBIT"
            },
            {
                "initTypes": [
                    "tubitv2tuiralign_init"
                ],
                "kind": "sensor",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_TUIRALIGN",
                "label": "TuIRAlign IR 靠牆校正"
            }
        ],
        "tubitv2tuiralign_setpidall": [
            {
                "initTypes": [
                    "tubitv2_set"
                ],
                "kind": "tubit",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_SET",
                "label": "TUBIT"
            },
            {
                "initTypes": [
                    "tubitv2tuiralign_init"
                ],
                "kind": "sensor",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_TUIRALIGN",
                "label": "TuIRAlign IR 靠牆校正"
            }
        ],
        "tubitv2tuiralign_align": [
            {
                "initTypes": [
                    "tubitv2_set"
                ],
                "kind": "tubit",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_SET",
                "label": "TUBIT"
            },
            {
                "initTypes": [
                    "tubitv2tuiralign_init"
                ],
                "kind": "sensor",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_TUIRALIGN",
                "label": "TuIRAlign IR 靠牆校正"
            }
        ],
        "tubitv2tuiralign_align_timeout": [
            {
                "initTypes": [
                    "tubitv2_set"
                ],
                "kind": "tubit",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_SET",
                "label": "TUBIT"
            },
            {
                "initTypes": [
                    "tubitv2tuiralign_init"
                ],
                "kind": "sensor",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_TUIRALIGN",
                "label": "TuIRAlign IR 靠牆校正"
            }
        ],
        "tubitv2tuiralign_align_single": [
            {
                "initTypes": [
                    "tubitv2_set"
                ],
                "kind": "tubit",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_SET",
                "label": "TUBIT"
            },
            {
                "initTypes": [
                    "tubitv2tuiralign_init"
                ],
                "kind": "sensor",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_TUIRALIGN",
                "label": "TuIRAlign IR 靠牆校正"
            }
        ],
        "tubitv2tuiralign_step": [
            {
                "initTypes": [
                    "tubitv2_set"
                ],
                "kind": "tubit",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_SET",
                "label": "TUBIT"
            },
            {
                "initTypes": [
                    "tubitv2tuiralign_init"
                ],
                "kind": "sensor",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_TUIRALIGN",
                "label": "TuIRAlign IR 靠牆校正"
            }
        ],
        "tubitv2tuiralign_step_single": [
            {
                "initTypes": [
                    "tubitv2_set"
                ],
                "kind": "tubit",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_SET",
                "label": "TUBIT"
            },
            {
                "initTypes": [
                    "tubitv2tuiralign_init"
                ],
                "kind": "sensor",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_TUIRALIGN",
                "label": "TuIRAlign IR 靠牆校正"
            }
        ],
        "tubitv2tuiralign_readir": [
            {
                "initTypes": [
                    "tubitv2_set"
                ],
                "kind": "tubit",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_SET",
                "label": "TUBIT"
            },
            {
                "initTypes": [
                    "tubitv2tuiralign_init"
                ],
                "kind": "sensor",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_TUIRALIGN",
                "label": "TuIRAlign IR 靠牆校正"
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
