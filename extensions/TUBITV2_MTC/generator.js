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
    return Blockly;
}

exports = registerGenerators;
