// This file was automatically generated.
/* eslint-disable func-style */
/* eslint-disable require-jsdoc */
/* eslint-disable quote-props */
/* eslint-disable quotes */
/* eslint-disable dot-notation */

function getInterfaceTranslations () {
return {
    "en": {
        "tubitv2tuiralign.name": "TuIRAlign Wall Alignment",
        "tubitv2tuiralign.description": "IR wall alignment control for TuBit V2 OTC/MTC robot kits, updated for TuIRAlign v2.0."
    },
    "zh-tw": {
        "tubitv2tuiralign.name": "TuIRAlign IR 靠牆校正",
        "tubitv2tuiralign.description": "適用 TuBit V2 OTC/MTC 機器人的 IR 靠牆校正控制，已更新 TuIRAlign v2.0 功能。"
    },
    "zh-cn": {
        "tubitv2tuiralign.name": "TuIRAlign IR 靠墙校正",
        "tubitv2tuiralign.description": "适用 TuBit V2 OTC/MTC 机器人的 IR 靠墙校正控制，已更新 TuIRAlign v2.0 功能。"
    }
};

}

function registerScratchExtensionTranslations () {
    return {};
}

const zhTwMessages = {
    "TUBITV2TUIRALIGN_CATEGORY": "IR 靠牆校正",
    "TUBITV2TUIRALIGN_SETUP": "初始化與感測器",
    "TUBITV2TUIRALIGN_PARAMETERS": "v2.0 調校參數",
    "TUBITV2TUIRALIGN_PID": "PID 調整",
    "TUBITV2TUIRALIGN_RUN": "讀感測器數值",
    "TUBITV2TUIRALIGN_MAIN_RUN": "校正功能",
    "TUBITV2TUIRALIGN_SECONDARY_RUN": "次校正（前／後／左／右／無）",
    "TUBITV2TUIRALIGN_STEP_RUN": "非阻塞單步",
    "TUBITV2TUIRALIGN_INIT": "初始化 IR 靠牆校正模式 %1",
    "TUBITV2TUIRALIGN_SETPINS": "設定 IR 腳位 1前 %1 2後 %2 3左後 %3 4左前 %4 5右後 %5 6右前 %6",
    "TUBITV2TUIRALIGN_SETTARGETS": "設定 IR 目標值 前 %1 後 %2 左前 %3 左後 %4 右前 %5 右後 %6",
    "TUBITV2TUIRALIGN_SETRATIOANGLE": "設定 IR 比例角度模式 %1",
    "TUBITV2TUIRALIGN_SETDEADBANDS": "設定 IR 誤差範圍 距離 %1 角度 %2",
    "TUBITV2TUIRALIGN_SETTOLERANCE": "設定 IR 容許誤差百分比 %1",
    "TUBITV2TUIRALIGN_SETOUTPUTLIMITS": "設定 IR 輸出限制 X %1 Y %2 Z %3 旋轉倍率 %4",
    "TUBITV2TUIRALIGN_SETPIDAXIS": "設定 IR %1 PID P %2 I %3 D %4",
    "TUBITV2TUIRALIGN_SETPIDXZ": "設定 IR X/Z PID X P %1 I %2 D %3 Z P %4 I %5 D %6",
    "TUBITV2TUIRALIGN_SETPIDALL": "設定全部 IR PID Y P %1 I %2 D %3 X P %4 I %5 D %6 Z P %7 I %8 D %9",
    "TUBITV2TUIRALIGN_ALIGN": "執行 IR 靠牆校正 主校正 %1 次校正 %2",
    "TUBITV2TUIRALIGN_ALIGN_TIMEOUT": "執行 IR 靠牆校正 主校正 %1 次校正 %2 逾時秒數 %3 確認秒數 %4",
    "TUBITV2TUIRALIGN_ALIGN_SINGLE": "執行 IR 次校正 方向 %1 逾時秒數 %2 確認秒數 %3",
    "TUBITV2TUIRALIGN_STEP": "IR 主校正單步 主校正 %1 次校正 %2 完成?",
    "TUBITV2TUIRALIGN_STEP_SINGLE": "IR 次校正單步 方向 %1 完成?",
    "TUBITV2TUIRALIGN_READIR": "讀取 IR %1 數值",
    "TUBITV2TUIRALIGN_MTC": "麥克納姆輪 MTC",
    "TUBITV2TUIRALIGN_OTC": "全向輪 OTC",
    "TUBITV2TUIRALIGN_FRONT": "前",
    "TUBITV2TUIRALIGN_BACK": "後",
    "TUBITV2TUIRALIGN_LEFT": "左",
    "TUBITV2TUIRALIGN_RIGHT": "右",
    "TUBITV2TUIRALIGN_NONE": "無",
    "TUBITV2TUIRALIGN_AXIS_Y": "Y 前後",
    "TUBITV2TUIRALIGN_AXIS_X": "X 左右距離",
    "TUBITV2TUIRALIGN_AXIS_Z": "Z 旋轉",
    "TUBITV2TUIRALIGN_LEFT_FRONT": "左前",
    "TUBITV2TUIRALIGN_LEFT_BACK": "左後",
    "TUBITV2TUIRALIGN_RIGHT_FRONT": "右前",
    "TUBITV2TUIRALIGN_RIGHT_BACK": "右後",
    "TUBITV2TUIRALIGN_IR_1": "1 前",
    "TUBITV2TUIRALIGN_IR_2": "2 後",
    "TUBITV2TUIRALIGN_IR_3": "3 左後",
    "TUBITV2TUIRALIGN_IR_4": "4 左前",
    "TUBITV2TUIRALIGN_IR_5": "5 右後",
    "TUBITV2TUIRALIGN_IR_6": "6 右前"
};

const enMessages = {
    "TUBITV2TUIRALIGN_CATEGORY": "IR Wall Alignment",
    "TUBITV2TUIRALIGN_SETUP": "Init and Sensors",
    "TUBITV2TUIRALIGN_PARAMETERS": "v2.0 Tuning",
    "TUBITV2TUIRALIGN_PID": "PID Tuning",
    "TUBITV2TUIRALIGN_RUN": "Align and Read",
    "TUBITV2TUIRALIGN_MAIN_RUN": "Main/Secondary Alignment (None Optional)",
    "TUBITV2TUIRALIGN_SECONDARY_RUN": "Secondary Alignment (Front/Back/Left/Right/None)",
    "TUBITV2TUIRALIGN_STEP_RUN": "Non-blocking Step",
    "TUBITV2TUIRALIGN_INIT": "initialize IR wall alignment mode %1",
    "TUBITV2TUIRALIGN_SETPINS": "set IR pins 1 front %1 2 back %2 3 left back %3 4 left front %4 5 right back %5 6 right front %6",
    "TUBITV2TUIRALIGN_SETTARGETS": "set IR target values front %1 back %2 left front %3 left back %4 right front %5 right back %6",
    "TUBITV2TUIRALIGN_SETRATIOANGLE": "set IR ratio angle mode %1",
    "TUBITV2TUIRALIGN_SETDEADBANDS": "set IR tolerance range distance %1 angle %2",
    "TUBITV2TUIRALIGN_SETTOLERANCE": "set IR tolerance percent %1",
    "TUBITV2TUIRALIGN_SETOUTPUTLIMITS": "set IR output limits X %1 Y %2 Z %3 turn scale %4",
    "TUBITV2TUIRALIGN_SETPIDAXIS": "set IR %1 PID P %2 I %3 D %4",
    "TUBITV2TUIRALIGN_SETPIDXZ": "set IR X/Z PID X P %1 I %2 D %3 Z P %4 I %5 D %6",
    "TUBITV2TUIRALIGN_SETPIDALL": "set all IR PID Y P %1 I %2 D %3 X P %4 I %5 D %6 Z P %7 I %8 D %9",
    "TUBITV2TUIRALIGN_ALIGN": "run IR wall alignment main %1 secondary %2",
    "TUBITV2TUIRALIGN_ALIGN_TIMEOUT": "run IR wall alignment main %1 secondary %2 timeout seconds %3 confirm seconds %4",
    "TUBITV2TUIRALIGN_ALIGN_SINGLE": "run IR secondary alignment direction %1 timeout seconds %2 confirm seconds %3",
    "TUBITV2TUIRALIGN_STEP": "IR main alignment step main %1 secondary %2 done?",
    "TUBITV2TUIRALIGN_STEP_SINGLE": "IR secondary alignment step direction %1 done?",
    "TUBITV2TUIRALIGN_READIR": "read IR %1 value",
    "TUBITV2TUIRALIGN_MTC": "Mecanum MTC",
    "TUBITV2TUIRALIGN_OTC": "Omni-wheel OTC",
    "TUBITV2TUIRALIGN_FRONT": "front",
    "TUBITV2TUIRALIGN_BACK": "back",
    "TUBITV2TUIRALIGN_LEFT": "left",
    "TUBITV2TUIRALIGN_RIGHT": "right",
    "TUBITV2TUIRALIGN_NONE": "none",
    "TUBITV2TUIRALIGN_AXIS_Y": "Y front/back",
    "TUBITV2TUIRALIGN_AXIS_X": "X side distance",
    "TUBITV2TUIRALIGN_AXIS_Z": "Z turn",
    "TUBITV2TUIRALIGN_LEFT_FRONT": "left front",
    "TUBITV2TUIRALIGN_LEFT_BACK": "left back",
    "TUBITV2TUIRALIGN_RIGHT_FRONT": "right front",
    "TUBITV2TUIRALIGN_RIGHT_BACK": "right back",
    "TUBITV2TUIRALIGN_IR_1": "1 front",
    "TUBITV2TUIRALIGN_IR_2": "2 back",
    "TUBITV2TUIRALIGN_IR_3": "3 left back",
    "TUBITV2TUIRALIGN_IR_4": "4 left front",
    "TUBITV2TUIRALIGN_IR_5": "5 right back",
    "TUBITV2TUIRALIGN_IR_6": "6 right front"
};

const zhCnMessages = Object.assign({}, zhTwMessages, {
    "TUBITV2TUIRALIGN_CATEGORY": "IR 靠墙校正",
    "TUBITV2TUIRALIGN_SETUP": "初始化与传感器",
    "TUBITV2TUIRALIGN_PARAMETERS": "v2.0 调校参数",
    "TUBITV2TUIRALIGN_PID": "PID 调整",
    "TUBITV2TUIRALIGN_RUN": "校正与读值",
    "TUBITV2TUIRALIGN_MAIN_RUN": "主校正／次校正（可选无）",
    "TUBITV2TUIRALIGN_SECONDARY_RUN": "次校正（前／后／左／右／无）",
    "TUBITV2TUIRALIGN_INIT": "初始化 IR 靠墙校正模式 %1",
    "TUBITV2TUIRALIGN_SETPINS": "设置 IR 脚位 1前 %1 2后 %2 3左后 %3 4左前 %4 5右后 %5 6右前 %6",
    "TUBITV2TUIRALIGN_SETTARGETS": "设置 IR 目标值 前 %1 后 %2 左前 %3 左后 %4 右前 %5 右后 %6",
    "TUBITV2TUIRALIGN_SETRATIOANGLE": "设置 IR 比例角度模式 %1",
    "TUBITV2TUIRALIGN_SETDEADBANDS": "设置 IR 误差范围 距离 %1 角度 %2",
    "TUBITV2TUIRALIGN_SETTOLERANCE": "设置 IR 容许误差百分比 %1",
    "TUBITV2TUIRALIGN_SETOUTPUTLIMITS": "设置 IR 输出限制 X %1 Y %2 Z %3 旋转倍率 %4",
    "TUBITV2TUIRALIGN_SETPIDAXIS": "设置 IR %1 PID P %2 I %3 D %4",
    "TUBITV2TUIRALIGN_SETPIDXZ": "设置 IR X/Z PID X P %1 I %2 D %3 Z P %4 I %5 D %6",
    "TUBITV2TUIRALIGN_SETPIDALL": "设置全部 IR PID Y P %1 I %2 D %3 X P %4 I %5 D %6 Z P %7 I %8 D %9",
    "TUBITV2TUIRALIGN_ALIGN": "执行 IR 靠墙校正 主校正 %1 次校正 %2",
    "TUBITV2TUIRALIGN_ALIGN_TIMEOUT": "执行 IR 靠墙校正 主校正 %1 次校正 %2 逾时秒数 %3 确认秒数 %4",
    "TUBITV2TUIRALIGN_ALIGN_SINGLE": "执行 IR 次校正 方向 %1 逾时秒数 %2 确认秒数 %3",
    "TUBITV2TUIRALIGN_STEP": "IR 主校正单步 主校正 %1 次校正 %2 完成?",
    "TUBITV2TUIRALIGN_STEP_SINGLE": "IR 次校正单步 方向 %1 完成?",
    "TUBITV2TUIRALIGN_READIR": "读取 IR %1 数值",
    "TUBITV2TUIRALIGN_MTC": "麦克纳姆轮 MTC",
    "TUBITV2TUIRALIGN_FRONT": "前",
    "TUBITV2TUIRALIGN_BACK": "后",
    "TUBITV2TUIRALIGN_NONE": "无",
    "TUBITV2TUIRALIGN_AXIS_Y": "Y 前后",
    "TUBITV2TUIRALIGN_IR_2": "2 后",
    "TUBITV2TUIRALIGN_IR_3": "3 左后",
    "TUBITV2TUIRALIGN_IR_5": "5 右后"
});

function registerBlocksMessages (Blockly) {
    // Shared initialization diagnostics for all enabled product languages.
    const __initGuardMessages = {
        "en": {
            "INIT_GUARD_TUBIT_REQUIRED": "Place the \"TUBIT initialization\" block under the \"when Arduino starts\" block.",
            "INIT_GUARD_SENSOR_REQUIRED": "Place the \"%1 %2 initialization\" block under \"when Arduino starts\", before any blocks that read or use the module.",
            "INIT_GUARD_INIT_PLACEMENT": "Place the \"%1 %2 initialization\" block directly under \"when Arduino starts\", before loops or conditions.",
            "INIT_GUARD_OLED_REQUIRED": "First add an OLED display block and put the drawing blocks inside it, or place a clear/update display block before them.",
            "INIT_GUARD_PIN_SUFFIX": "pin %1",
            "INIT_GUARD_INVALID_ID": "Enter a non-negative whole-number module ID.",
            "INIT_GUARD_LABEL_TUBITV2_TUIRALIGN": "TuIRAlign Wall Alignment"
        },
        "ru": {
            "INIT_GUARD_TUBIT_REQUIRED": "Поместите блок «Инициализация TUBIT» под блоком «когда Arduino запускается».",
            "INIT_GUARD_SENSOR_REQUIRED": "Поместите блок «Инициализация: %1 %2» под блоком «когда Arduino запускается» перед блоками чтения или использования модуля.",
            "INIT_GUARD_INIT_PLACEMENT": "Поместите блок «Инициализация: %1 %2» непосредственно под блоком «когда Arduino запускается», перед циклами и условиями.",
            "INIT_GUARD_OLED_REQUIRED": "Сначала добавьте блок вывода на OLED и поместите блоки рисования внутрь него либо разместите перед ними блок очистки или обновления дисплея.",
            "INIT_GUARD_PIN_SUFFIX": "контакт %1",
            "INIT_GUARD_INVALID_ID": "Введите неотрицательный целый номер модуля.",
            "INIT_GUARD_LABEL_TUBITV2_TUIRALIGN": "Выравнивание по ИК-датчикам"
        },
        "zh-cn": {
            "INIT_GUARD_TUBIT_REQUIRED": "请在Arduino启动的积木底下放置\"TUBIT初始化\"积木",
            "INIT_GUARD_SENSOR_REQUIRED": "请在Arduino启动的积木底下放置\"%1%2初始化\"积木，并放在读取／使用积木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "请将\"%1%2初始化\"积木直接放在Arduino启动底下，且放在重复执行或条件判断之前。",
            "INIT_GUARD_OLED_REQUIRED": "请先放置OLED显示积木，并将绘图积木放在其内，或先放清除／更新显示积木。",
            "INIT_GUARD_PIN_SUFFIX": "引脚%1",
            "INIT_GUARD_INVALID_ID": "模组编号请输入非负整数。",
            "INIT_GUARD_LABEL_TUBITV2_TUIRALIGN": "TuIRAlign IR 靠墙校正"
        },
        "zh-tw": {
            "INIT_GUARD_TUBIT_REQUIRED": "請在Arduino啟動的積木底下放置\"TUBIT初始化\"積木",
            "INIT_GUARD_SENSOR_REQUIRED": "請在Arduino啟動的積木底下放置\"%1%2初始化\"積木，並放在讀取／使用積木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "請將\"%1%2初始化\"積木直接放在Arduino啟動底下，且放在重複執行或條件判斷之前。",
            "INIT_GUARD_OLED_REQUIRED": "請先放置OLED顯示積木，並將繪圖積木放在其內，或先放清除／更新顯示積木。",
            "INIT_GUARD_PIN_SUFFIX": "腳位%1",
            "INIT_GUARD_INVALID_ID": "模組編號請輸入非負整數。",
            "INIT_GUARD_LABEL_TUBITV2_TUIRALIGN": "TuIRAlign IR 靠牆校正"
        }
    };
    Object.keys(__initGuardMessages).forEach(function (locale) {
        if (!Blockly.ScratchMsgs.locales[locale]) Blockly.ScratchMsgs.locales[locale] = {};
        Object.assign(Blockly.ScratchMsgs.locales[locale], __initGuardMessages[locale]);
    });


    Object.assign(Blockly.ScratchMsgs.locales["en"], enMessages);
    Object.assign(Blockly.ScratchMsgs.locales["zh-cn"], zhCnMessages);
    Object.assign(Blockly.ScratchMsgs.locales["zh-tw"], zhTwMessages);

    return Blockly;
}

if (typeof module !== 'undefined') {
    module.exports = {getInterfaceTranslations};
}

exports = registerScratchExtensionTranslations;
exports = registerBlocksMessages;
