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
    let oled_matrix_counter = 0;

    Blockly.Arduino.tubitv2_oled_start = function (block) {
        // 使用獨立 Key 避免覆蓋其他擴充庫
        Blockly.Arduino.includes_.tubitv2_base = `#include <Adafruit_GFX.h>\n#include <Adafruit_SH110X.h>`;
        Blockly.Arduino.definitions_.tubitv2o= `Adafruit_SH1106G display(128, 64, &Wire);\n`;
        Blockly.Arduino.setups_['TUBITV2_OLED'] = `display.begin(0x3C, true);`;
        var branch = Blockly.Arduino.statementToCode(block, 'SUBSTACK');
        var code = "display.clearDisplay();\n";
        code += branch.slice(2).replace(/\n  /g, '\n');
        code += "display.display();\n"

        return code;
    };

    Blockly.Arduino.tubitv2_oled_update = function (block) {
        Blockly.Arduino.includes_.tubitv2_base = `#include <Adafruit_GFX.h>\n#include <Adafruit_SH110X.h>`;
        Blockly.Arduino.definitions_.tubitv2o= `Adafruit_SH1106G display(128, 64, &Wire);\n`;
        Blockly.Arduino.setups_['TUBITV2_OLED'] = `display.begin(0x3C, true);\ndisplay.setRotation(0);\ndisplay.clearDisplay();`;
        return "display.display();\n";
    };

    Blockly.Arduino.tubitv2_oled_clear = function (block) {
        Blockly.Arduino.includes_.tubitv2_base = `#include <Adafruit_GFX.h>\n#include <Adafruit_SH110X.h>`;
        Blockly.Arduino.definitions_.tubitv2o= `Adafruit_SH1106G display(128, 64, &Wire);\n`;
        Blockly.Arduino.setups_['TUBITV2_OLED'] = `display.begin(0x3C, true);\ndisplay.setRotation(0);\ndisplay.clearDisplay();`;
        return "display.clearDisplay();\n";
    };

    Blockly.Arduino.tubitv2_oled_drawrline= function (block) {
        const x0 = Blockly.Arduino.valueToCode(block, 'X', Blockly.Arduino.ORDER_ATOMIC);
        const y0 = Blockly.Arduino.valueToCode(block, 'Y', Blockly.Arduino.ORDER_ATOMIC);
        const x1 = Blockly.Arduino.valueToCode(block, 'X1', Blockly.Arduino.ORDER_ATOMIC);
        const y1 = Blockly.Arduino.valueToCode(block, 'Y1', Blockly.Arduino.ORDER_ATOMIC);

        return `display.drawLine(${x0}, ${y0}, ${x1}, ${y1}, SH110X_WHITE);\n`;
    };

    Blockly.Arduino.tubitv2_oled_drawaxisalignedline= function (block) {
        const x = Blockly.Arduino.valueToCode(block, 'X', Blockly.Arduino.ORDER_ATOMIC);
        const y = Blockly.Arduino.valueToCode(block, 'Y', Blockly.Arduino.ORDER_ATOMIC);
        const length = Blockly.Arduino.valueToCode(block, 'LENGTH', Blockly.Arduino.ORDER_ATOMIC);
        const is_vertical = block.getFieldValue('IS_VERTICAL');

        if(is_vertical=="VERTICAL"){
            return `display.drawLine(${x}, ${y}, ${x}, ${y}+${length}, SH110X_WHITE);\n`;

        }else{
            return `display.drawLine(${x}, ${y}, ${x}+${length}, ${y}, SH110X_WHITE);\n`;
        }

    };

    Blockly.Arduino.tubitv2_oled_drawrectangle= function (block) {
        const x = Blockly.Arduino.valueToCode(block, 'X', Blockly.Arduino.ORDER_ATOMIC);
        const y = Blockly.Arduino.valueToCode(block, 'Y', Blockly.Arduino.ORDER_ATOMIC);
        const width = Blockly.Arduino.valueToCode(block, 'WIDTH', Blockly.Arduino.ORDER_ATOMIC);
        const height = Blockly.Arduino.valueToCode(block, 'HEIGHT', Blockly.Arduino.ORDER_ATOMIC);
        const corner_radius = Blockly.Arduino.valueToCode(block, 'CORNER_RADIUS', Blockly.Arduino.ORDER_ATOMIC);
        const is_filled = block.getFieldValue('IS_FILLED');

        if(is_filled=="FILLED"){
            return `display.fillRoundRect(${x}, ${y}, ${width}, ${height}, ${corner_radius}, SH110X_WHITE);\n`;
             
        }else{
            return `display.drawRoundRect(${x}, ${y}, ${width}, ${height}, ${corner_radius}, SH110X_WHITE);\n`;
        }
    };

    Blockly.Arduino.tubitv2_oled_drawrcircle= function (block) {
        const x = Blockly.Arduino.valueToCode(block, 'X', Blockly.Arduino.ORDER_ATOMIC);
        const y = Blockly.Arduino.valueToCode(block, 'Y', Blockly.Arduino.ORDER_ATOMIC);
        const radius = Blockly.Arduino.valueToCode(block, 'RADIUS', Blockly.Arduino.ORDER_ATOMIC);
        const is_filled = block.getFieldValue('IS_FILLED');

        if(is_filled=="FILLED"){
            return `display.fillCircle(${x}, ${y}, ${radius}, SH110X_WHITE);\n`;
            
        }

        return `display.drawCircle(${x}, ${y}, ${radius}, SH110X_WHITE);\n`;

    };

    Blockly.Arduino.tubitv2_oled_drawrtriangle= function (block) {
        const x0 = Blockly.Arduino.valueToCode(block, 'X', Blockly.Arduino.ORDER_ATOMIC);
        const y0 = Blockly.Arduino.valueToCode(block, 'Y', Blockly.Arduino.ORDER_ATOMIC);
        const x1 = Blockly.Arduino.valueToCode(block, 'X1', Blockly.Arduino.ORDER_ATOMIC);
        const y1 = Blockly.Arduino.valueToCode(block, 'Y1', Blockly.Arduino.ORDER_ATOMIC);
        const x2 = Blockly.Arduino.valueToCode(block, 'X2', Blockly.Arduino.ORDER_ATOMIC);
        const y2 = Blockly.Arduino.valueToCode(block, 'Y2', Blockly.Arduino.ORDER_ATOMIC);
        const is_filled = block.getFieldValue('IS_FILLED');

        if(is_filled=="FILLED"){
            return `display.fillTriangle(${x0}, ${y0}, ${x1}, ${y1}, ${x2}, ${y2}, SH110X_WHITE);\n`;
        }
        return `display.drawTriangle(${x0}, ${y0}, ${x1}, ${y1}, ${x2}, ${y2}, SH110X_WHITE);\n`;
    };

    Blockly.Arduino.tubitv2_oled_font = function (block) {
    const font = block.getFieldValue('FONT');
    const string = Blockly.Arduino.valueToCode(block, 'STRING', Blockly.Arduino.ORDER_ATOMIC);
    const x = Blockly.Arduino.valueToCode(block, 'X', Blockly.Arduino.ORDER_ATOMIC);
    const y = Blockly.Arduino.valueToCode(block, 'Y', Blockly.Arduino.ORDER_ATOMIC);
    
    if (font === 'u8g2_font_unifont_t_chinese1') {
        Blockly.Arduino.includes_['TUBITV2_OLED_FONT'] = `#include <U8g2_for_Adafruit_GFX.h>`;
        Blockly.Arduino.definitions_['TUBITV2_OLED_FONT'] = `U8G2_FOR_ADAFRUIT_GFX u8g2;`;
        Blockly.Arduino.setups_['TUBITV2_OLED_FONT'] = `u8g2.begin(display);`;
    }

    if (font === '') {
        return `display.setFont();\ndisplay.setTextSize(1);\ndisplay.setTextColor(SH110X_WHITE);\ndisplay.setCursor(${x}, ${y});\ndisplay.print(${string});\n`;
    } else {
        return `u8g2.setFont(${font});\nu8g2.setCursor(${x}, ${y});\nu8g2.print(${string});\n`;
    }
        
    };

    /* --- ANIMATION --- */

    Blockly.Arduino.tubitv2_oled_anim_draw_eyes = function (block) {
        Blockly.Arduino.includes_['TUBITV2_OLED_ANI']= `#include <eye_anim.h>`;
        Blockly.Arduino.setups_['TUBITV2_OLED_ANI'] = `init_eye_display(&display);`;

        const update = block.getFieldValue('UPDATE');

        if(update=="TRUE"){
            return `draw_eyes(true); \n`;
        }

        return `draw_eyes(false);\n`;
    };

    Blockly.Arduino.tubitv2_oled_anim_reset_eyes = function (block) {
        Blockly.Arduino.includes_['TUBITV2_OLED_ANI']= `#include <eye_anim.h>`;
        Blockly.Arduino.setups_['TUBITV2_OLED_ANI'] = `init_eye_display(&display);`;

        const update = block.getFieldValue('UPDATE');

        if(update=="TRUE"){
            return `reset_eyes(true);\n`;
        }

        return `reset_eyes(false);\n`;
    };
    
    Blockly.Arduino.tubitv2_oled_anim_blink = function (block) {
        Blockly.Arduino.includes_['TUBITV2_OLED_ANI']= `#include <eye_anim.h>`;
        Blockly.Arduino.setups_['TUBITV2_OLED_ANI'] = `init_eye_display(&display);`;
        const speed = Blockly.Arduino.valueToCode(block, 'SPEED', Blockly.Arduino.ORDER_ATOMIC);
        return `blink(${speed});\n`;
    };
    
    Blockly.Arduino.tubitv2_oled_anim_move_big_eye = function (block) {
        Blockly.Arduino.includes_['TUBITV2_OLED_ANI']= `#include <eye_anim.h>`;
        Blockly.Arduino.setups_['TUBITV2_OLED_ANI'] = `init_eye_display(&display);`;
        const direction = block.getFieldValue('DIRECTION');
        return `move_big_eye("${direction}");\n`;
    };
    
    Blockly.Arduino.tubitv2_oled_anim_saccade = function (block) {
        Blockly.Arduino.includes_['TUBITV2_OLED_ANI']= `#include <eye_anim.h>`;
        Blockly.Arduino.setups_['TUBITV2_OLED_ANI'] = `init_eye_display(&display);`;
        const direction_x = block.getFieldValue('DIRECTION_X');
        const direction_y = block.getFieldValue('DIRECTION_Y');
        return `saccade("${direction_x}", "${direction_y}");\n`;
    };
    
    Blockly.Arduino.tubitv2_oled_anim_launch_animation_with_index = function (block) {
        Blockly.Arduino.includes_['TUBITV2_OLED_ANI']= `#include <eye_anim.h>`;
        Blockly.Arduino.setups_['TUBITV2_OLED_ANI'] = `init_eye_display(&display);`;
        const index = block.getFieldValue('ANIM_INDEX');
        return `launch_animation_with_index(${index});\n`;
    };

    //chart...

    Blockly.Arduino.tubitv2_oled_draw_chart = function (block) {
        Blockly.Arduino.includes_.tubitv2_base = `#include <Adafruit_GFX.h>\n#include <Adafruit_SH110X.h>`;
        Blockly.Arduino.definitions_.tubitv2o= `Adafruit_SH1106G display(128, 64, &Wire);\n`;
        Blockly.Arduino.setups_['TUBITV2_OLED'] = `display.begin(0x3C, true);`;
        Blockly.Arduino.includes_['TUBITV2_OLED_CHART']= `#include <chart_display.h>`;
        Blockly.Arduino.definitions_['TUBITV2_OLED_CHART'] = `#define SCREEN_WIDTH 128\n#define SCREEN_HEIGHT 64\n#define OLED_RESET -1static int t = 0;\nstatic int mode = 0;\nstatic unsigned long lastSwitch = 0;\nint chartData[SCREEN_WIDTH];`;
        Blockly.Arduino.setups_['TUBITV2_OLED_CHART'] = `init_chart_display(&display);\n  clearChart(chartData, SCREEN_WIDTH);`;

        const value = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_ATOMIC);
        const chart_type = block.getFieldValue('CHART_TYPE');
        const direction = block.getFieldValue('DIRECTION');
        return `chartData[SCREEN_WIDTH - 1] = ${value};\ndrawChart(chartData, ${chart_type}, ${direction});\n`;
    };

    Blockly.Arduino.tubitv2_oled_matrix= function (block) {
        const matrix_data = block.getFieldValue('MATRIX');
        const rows = [];

        for (let i = 0; i < 7; i++) {
            rows.push(`0b${matrix_data.slice(i * 14, (i + 1) * 14)}00`);
        }
        
        // 修正處：拆分 Key，避免基礎庫覆寫點陣圖庫
        Blockly.Arduino.includes_.tubitv2_base = `#include <Adafruit_GFX.h>\n#include <Adafruit_SH110X.h>`;
        Blockly.Arduino.includes_.tubitv2_dotmatrix = `#include <dot_matrix.h>`;
        
        if(!Blockly.Arduino.definitions_.tubitv2o){
            Blockly.Arduino.definitions_.tubitv2o = `Adafruit_SH1106G display(128, 64, &Wire, -1);\n`;
        }

        let hash = 0;
        for (let i = 0; i < matrix_data.length; i++) {
            hash = ((hash << 5) - hash) + matrix_data.charCodeAt(i);
            hash |= 0; // 轉成32-bit整數
        }
        const hex_id = `oled_matrix_buf${Math.abs(hash).toString(16)}`;

        Blockly.Arduino.definitions_[hex_id] = `uint16_t ${hex_id}[7] = {${rows.join(',')}};`;
        Blockly.Arduino.setups_['TUBITV2_OLED'] = `display.begin(0x3C, true);`;
        Blockly.Arduino.setups_['TUBITV2_OLED'] += `\n  display.setRotation(0);`;
        Blockly.Arduino.setups_['TUBITV2_OLED'] += `\n  init_dot_matrix(&display);`;
        
        return `drawDotMatrix8x12(${hex_id});\n`;
    };

    Blockly.Arduino.tubitv2_oled_createimage= function (block) {
    const imagename = Blockly.Arduino.valueToCode(block, 'IMAGENAME', Blockly.Arduino.ORDER_ATOMIC).slice(1, -1);
	const bmpdata = Blockly.Arduino.valueToCode(block, 'BMPDATA', Blockly.Arduino.ORDER_ATOMIC).slice(1, -1);
	const code =`static const unsigned char PROGMEM ${imagename}[] ={ ${bmpdata} };`;
	Blockly.Arduino.definitions_["tubitv2_oled_img_"+imagename] = code; 
        return '';
    };

    Blockly.Arduino.tubitv2_oled_displayimage= function (block) {

        const x = Blockly.Arduino.valueToCode(block, 'X', Blockly.Arduino.ORDER_ATOMIC);
        const y = Blockly.Arduino.valueToCode(block, 'Y', Blockly.Arduino.ORDER_ATOMIC);
        const w = Blockly.Arduino.valueToCode(block, 'W', Blockly.Arduino.ORDER_ATOMIC);
        const h = Blockly.Arduino.valueToCode(block, 'H', Blockly.Arduino.ORDER_ATOMIC);
        const imagename = Blockly.Arduino.valueToCode(block, 'IMAGENAME', Blockly.Arduino.ORDER_ATOMIC).slice(1, -1);

        return `display.drawBitmap(${x},${y},${imagename},${w},${h}, SH110X_WHITE);\n`;
        
        
    };

    // BEGIN TUBIT INIT GUARD WRAPPERS
    const __tubitInitGuard = createTubitInitGuard(Blockly);
    const __tubitInitRules = {
        "tubitv2_oled_start": [
            {
                "initTypes": [
                    "tubitv2_oled_start",
                    "tubitv2_oled_update",
                    "tubitv2_oled_clear",
                    "tubitv2_oled_draw_chart",
                    "tubitv2_oled_matrix"
                ],
                "kind": "sensor",
                "declarationOnly": true,
                "allowAncestor": true,
                "messageKey": "INIT_GUARD_OLED_REQUIRED",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_OLED",
                "label": "OLED"
            }
        ],
        "tubitv2_oled_update": [
            {
                "initTypes": [
                    "tubitv2_oled_start",
                    "tubitv2_oled_update",
                    "tubitv2_oled_clear",
                    "tubitv2_oled_draw_chart",
                    "tubitv2_oled_matrix"
                ],
                "kind": "sensor",
                "declarationOnly": true,
                "allowAncestor": true,
                "messageKey": "INIT_GUARD_OLED_REQUIRED",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_OLED",
                "label": "OLED"
            }
        ],
        "tubitv2_oled_clear": [
            {
                "initTypes": [
                    "tubitv2_oled_start",
                    "tubitv2_oled_update",
                    "tubitv2_oled_clear",
                    "tubitv2_oled_draw_chart",
                    "tubitv2_oled_matrix"
                ],
                "kind": "sensor",
                "declarationOnly": true,
                "allowAncestor": true,
                "messageKey": "INIT_GUARD_OLED_REQUIRED",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_OLED",
                "label": "OLED"
            }
        ],
        "tubitv2_oled_drawrline": [
            {
                "initTypes": [
                    "tubitv2_oled_start",
                    "tubitv2_oled_update",
                    "tubitv2_oled_clear",
                    "tubitv2_oled_draw_chart",
                    "tubitv2_oled_matrix"
                ],
                "kind": "sensor",
                "declarationOnly": true,
                "allowAncestor": true,
                "messageKey": "INIT_GUARD_OLED_REQUIRED",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_OLED",
                "label": "OLED"
            }
        ],
        "tubitv2_oled_drawaxisalignedline": [
            {
                "initTypes": [
                    "tubitv2_oled_start",
                    "tubitv2_oled_update",
                    "tubitv2_oled_clear",
                    "tubitv2_oled_draw_chart",
                    "tubitv2_oled_matrix"
                ],
                "kind": "sensor",
                "declarationOnly": true,
                "allowAncestor": true,
                "messageKey": "INIT_GUARD_OLED_REQUIRED",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_OLED",
                "label": "OLED"
            }
        ],
        "tubitv2_oled_drawrectangle": [
            {
                "initTypes": [
                    "tubitv2_oled_start",
                    "tubitv2_oled_update",
                    "tubitv2_oled_clear",
                    "tubitv2_oled_draw_chart",
                    "tubitv2_oled_matrix"
                ],
                "kind": "sensor",
                "declarationOnly": true,
                "allowAncestor": true,
                "messageKey": "INIT_GUARD_OLED_REQUIRED",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_OLED",
                "label": "OLED"
            }
        ],
        "tubitv2_oled_drawrcircle": [
            {
                "initTypes": [
                    "tubitv2_oled_start",
                    "tubitv2_oled_update",
                    "tubitv2_oled_clear",
                    "tubitv2_oled_draw_chart",
                    "tubitv2_oled_matrix"
                ],
                "kind": "sensor",
                "declarationOnly": true,
                "allowAncestor": true,
                "messageKey": "INIT_GUARD_OLED_REQUIRED",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_OLED",
                "label": "OLED"
            }
        ],
        "tubitv2_oled_drawrtriangle": [
            {
                "initTypes": [
                    "tubitv2_oled_start",
                    "tubitv2_oled_update",
                    "tubitv2_oled_clear",
                    "tubitv2_oled_draw_chart",
                    "tubitv2_oled_matrix"
                ],
                "kind": "sensor",
                "declarationOnly": true,
                "allowAncestor": true,
                "messageKey": "INIT_GUARD_OLED_REQUIRED",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_OLED",
                "label": "OLED"
            }
        ],
        "tubitv2_oled_font": [
            {
                "initTypes": [
                    "tubitv2_oled_start",
                    "tubitv2_oled_update",
                    "tubitv2_oled_clear",
                    "tubitv2_oled_draw_chart",
                    "tubitv2_oled_matrix"
                ],
                "kind": "sensor",
                "declarationOnly": true,
                "allowAncestor": true,
                "messageKey": "INIT_GUARD_OLED_REQUIRED",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_OLED",
                "label": "OLED"
            }
        ],
        "tubitv2_oled_anim_draw_eyes": [
            {
                "initTypes": [
                    "tubitv2_oled_start",
                    "tubitv2_oled_update",
                    "tubitv2_oled_clear",
                    "tubitv2_oled_draw_chart",
                    "tubitv2_oled_matrix"
                ],
                "kind": "sensor",
                "declarationOnly": true,
                "allowAncestor": true,
                "messageKey": "INIT_GUARD_OLED_REQUIRED",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_OLED",
                "label": "OLED"
            }
        ],
        "tubitv2_oled_anim_reset_eyes": [
            {
                "initTypes": [
                    "tubitv2_oled_start",
                    "tubitv2_oled_update",
                    "tubitv2_oled_clear",
                    "tubitv2_oled_draw_chart",
                    "tubitv2_oled_matrix"
                ],
                "kind": "sensor",
                "declarationOnly": true,
                "allowAncestor": true,
                "messageKey": "INIT_GUARD_OLED_REQUIRED",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_OLED",
                "label": "OLED"
            }
        ],
        "tubitv2_oled_anim_blink": [
            {
                "initTypes": [
                    "tubitv2_oled_start",
                    "tubitv2_oled_update",
                    "tubitv2_oled_clear",
                    "tubitv2_oled_draw_chart",
                    "tubitv2_oled_matrix"
                ],
                "kind": "sensor",
                "declarationOnly": true,
                "allowAncestor": true,
                "messageKey": "INIT_GUARD_OLED_REQUIRED",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_OLED",
                "label": "OLED"
            }
        ],
        "tubitv2_oled_anim_move_big_eye": [
            {
                "initTypes": [
                    "tubitv2_oled_start",
                    "tubitv2_oled_update",
                    "tubitv2_oled_clear",
                    "tubitv2_oled_draw_chart",
                    "tubitv2_oled_matrix"
                ],
                "kind": "sensor",
                "declarationOnly": true,
                "allowAncestor": true,
                "messageKey": "INIT_GUARD_OLED_REQUIRED",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_OLED",
                "label": "OLED"
            }
        ],
        "tubitv2_oled_anim_saccade": [
            {
                "initTypes": [
                    "tubitv2_oled_start",
                    "tubitv2_oled_update",
                    "tubitv2_oled_clear",
                    "tubitv2_oled_draw_chart",
                    "tubitv2_oled_matrix"
                ],
                "kind": "sensor",
                "declarationOnly": true,
                "allowAncestor": true,
                "messageKey": "INIT_GUARD_OLED_REQUIRED",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_OLED",
                "label": "OLED"
            }
        ],
        "tubitv2_oled_anim_launch_animation_with_index": [
            {
                "initTypes": [
                    "tubitv2_oled_start",
                    "tubitv2_oled_update",
                    "tubitv2_oled_clear",
                    "tubitv2_oled_draw_chart",
                    "tubitv2_oled_matrix"
                ],
                "kind": "sensor",
                "declarationOnly": true,
                "allowAncestor": true,
                "messageKey": "INIT_GUARD_OLED_REQUIRED",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_OLED",
                "label": "OLED"
            }
        ],
        "tubitv2_oled_draw_chart": [
            {
                "initTypes": [
                    "tubitv2_oled_start",
                    "tubitv2_oled_update",
                    "tubitv2_oled_clear",
                    "tubitv2_oled_draw_chart",
                    "tubitv2_oled_matrix"
                ],
                "kind": "sensor",
                "declarationOnly": true,
                "allowAncestor": true,
                "messageKey": "INIT_GUARD_OLED_REQUIRED",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_OLED",
                "label": "OLED"
            }
        ],
        "tubitv2_oled_matrix": [
            {
                "initTypes": [
                    "tubitv2_oled_start",
                    "tubitv2_oled_update",
                    "tubitv2_oled_clear",
                    "tubitv2_oled_draw_chart",
                    "tubitv2_oled_matrix"
                ],
                "kind": "sensor",
                "declarationOnly": true,
                "allowAncestor": true,
                "messageKey": "INIT_GUARD_OLED_REQUIRED",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_OLED",
                "label": "OLED"
            }
        ],
        "tubitv2_oled_createimage": [
            {
                "initTypes": [
                    "tubitv2_oled_start",
                    "tubitv2_oled_update",
                    "tubitv2_oled_clear",
                    "tubitv2_oled_draw_chart",
                    "tubitv2_oled_matrix"
                ],
                "kind": "sensor",
                "declarationOnly": true,
                "allowAncestor": true,
                "messageKey": "INIT_GUARD_OLED_REQUIRED",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_OLED",
                "label": "OLED"
            }
        ],
        "tubitv2_oled_displayimage": [
            {
                "initTypes": [
                    "tubitv2_oled_start",
                    "tubitv2_oled_update",
                    "tubitv2_oled_clear",
                    "tubitv2_oled_draw_chart",
                    "tubitv2_oled_matrix"
                ],
                "kind": "sensor",
                "declarationOnly": true,
                "allowAncestor": true,
                "messageKey": "INIT_GUARD_OLED_REQUIRED",
                "labelKey": "INIT_GUARD_LABEL_TUBITV2_OLED",
                "label": "OLED"
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