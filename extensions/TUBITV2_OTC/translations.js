// This file was automatically generated.  Do not modify.
/* eslint-disable func-style */
/* eslint-disable require-jsdoc */
/* eslint-disable quote-props */
/* eslint-disable quotes */
/* eslint-disable dot-notation */
function getInterfaceTranslations () {
    return {
        "en": {
            "tubitv2otc.name": "TUBIT V2 OTC V2 ROBOT",
            "tubitv2otc.description": "For OTC V2 ROBOT."
        },
        "zh-cn": {
            "tubitv2otc.name": "TUBIT V2 OTC V2 ROBOT",
            "tubitv2otc.description": "For OTC V2 ROBOT."
        },
        "zh-tw": {
            "tubitv2otc.name": "TUBIT V2 OTC V2 機器人套件",
            "tubitv2otc.description": "OTC全向輪機器人套件專用積木。"
        }
    };
}

function registerScratchExtensionTranslations () {
    return {};
}

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
            "INIT_GUARD_LABEL_TUBITV2_OTC": "TUBIT V2 OTC V2 ROBOT"
        },
        "ru": {
            "INIT_GUARD_TUBIT_REQUIRED": "Поместите блок «Инициализация TUBIT» под блоком «когда Arduino запускается».",
            "INIT_GUARD_SENSOR_REQUIRED": "Поместите блок «Инициализация: %1 %2» под блоком «когда Arduino запускается» перед блоками чтения или использования модуля.",
            "INIT_GUARD_INIT_PLACEMENT": "Поместите блок «Инициализация: %1 %2» непосредственно под блоком «когда Arduino запускается», перед циклами и условиями.",
            "INIT_GUARD_OLED_REQUIRED": "Сначала добавьте блок вывода на OLED и поместите блоки рисования внутрь него либо разместите перед ними блок очистки или обновления дисплея.",
            "INIT_GUARD_PIN_SUFFIX": "контакт %1",
            "INIT_GUARD_INVALID_ID": "Введите неотрицательный целый номер модуля.",
            "INIT_GUARD_LABEL_TUBITV2_OTC": "Робот с всенаправленными колёсами"
        },
        "zh-cn": {
            "INIT_GUARD_TUBIT_REQUIRED": "请在Arduino启动的积木底下放置\"TUBIT初始化\"积木",
            "INIT_GUARD_SENSOR_REQUIRED": "请在Arduino启动的积木底下放置\"%1%2初始化\"积木，并放在读取／使用积木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "请将\"%1%2初始化\"积木直接放在Arduino启动底下，且放在重复执行或条件判断之前。",
            "INIT_GUARD_OLED_REQUIRED": "请先放置OLED显示积木，并将绘图积木放在其内，或先放清除／更新显示积木。",
            "INIT_GUARD_PIN_SUFFIX": "引脚%1",
            "INIT_GUARD_INVALID_ID": "模组编号请输入非负整数。",
            "INIT_GUARD_LABEL_TUBITV2_OTC": "TUBIT V2 OTC V2 ROBOT"
        },
        "zh-tw": {
            "INIT_GUARD_TUBIT_REQUIRED": "請在Arduino啟動的積木底下放置\"TUBIT初始化\"積木",
            "INIT_GUARD_SENSOR_REQUIRED": "請在Arduino啟動的積木底下放置\"%1%2初始化\"積木，並放在讀取／使用積木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "請將\"%1%2初始化\"積木直接放在Arduino啟動底下，且放在重複執行或條件判斷之前。",
            "INIT_GUARD_OLED_REQUIRED": "請先放置OLED顯示積木，並將繪圖積木放在其內，或先放清除／更新顯示積木。",
            "INIT_GUARD_PIN_SUFFIX": "腳位%1",
            "INIT_GUARD_INVALID_ID": "模組編號請輸入非負整數。",
            "INIT_GUARD_LABEL_TUBITV2_OTC": "TUBIT V2 OTC V2 機器人套件"
        }
    };
    Object.keys(__initGuardMessages).forEach(function (locale) {
        if (!Blockly.ScratchMsgs.locales[locale]) Blockly.ScratchMsgs.locales[locale] = {};
        Object.assign(Blockly.ScratchMsgs.locales[locale], __initGuardMessages[locale]);
    });


    Object.assign(Blockly.ScratchMsgs.locales["en"],
        { 
"TUBITV2_OTC_CATEGORY": "OTC ROBOT",
"TUBITV2_OTC_RUNDEG": "OTC move to %1°, speed: %2",
"TUBITV2_OTC_RUNXYR": "OTC move toward x:%1 y:%2 rotation:%3",
"TUBITV2_OTC_AMOVE": "OTC move x:%1 y:%2 (cm) rotation:%3 (deg), max speed:%4 acceleration:%5",
"TUBITV2_OTC_MOVE": "OTC move x:%1 y:%2 (cm) rotation:%3 (deg), max speed:%4 acceleration:%5 deceleration:%6, start speed:%7, end speed:%8",
"TUBITV2_OTC_AMOVECURVE": "OTC move x:%1 y:%2 (cm) rotation:%3 (deg), offset arc distance:%4 (cm), max speed:%5 acceleration:%6",
"TUBITV2_OTC_MOVECURVE": "OTC move x:%1 y:%2 (cm) rotation:%3 (deg), offset arc distance:%4 (cm), max speed:%5 acceleration:%6 deceleration:%7, start speed:%8, end speed:%9",
"TUBITV2_OTC_SETPID": "Set motor P:%1 I:%2 D:%3",
"TUBITV2_OTC_INTERRSET": "OTC set interrupt execute %1",
"TUBITV2_OTC_INTERREVENT": "Interrupt %1 execution block during motion",
"TUBITV2_OTC_RETURNA": "Return %1",
"TUBITV2_OTC_INTERR": "Read interrupt motion %1",
"TUBITV2_OTC_X": "X",
"TUBITV2_OTC_Y": "Y",
"TUBITV2_OTC_Z": "Z",
"TUBITV2_OTC_BNOMOVE": "OTC move %1 function toward x:%2 y:%3 rotation:%4, current angle:%5",
"TUBITV2_OTC_BNON": "Without encoder",
"TUBITV2_OTC_BNOENC": "With encoder",
"TUBITV2_OTC_LABEL_ADVANCE_A": "OTC: Advanced motion parameter settings",
"TUBITV2_OTC_LABEL_ADVANCE_B": "OTC: Advanced motion control",
"TUBITV2_OTC_LABEL_ADVANCE_C": "OTC: Interrupt settings",
"TUBITV2_OTC_LABEL_ADVANCE_D": "OTC: BNO055 module",
"TUBITV2_OTC_SETBODYDEG": "Set OTC body angle to %1",
"TUBITV2_OTC_RUNXYRV7RC": "OTC remote move x:%1 y:%2 turn left:%3 turn right:%4",
"TUBITV2_OTC_SETCPR": "Set motor gear ratio:%1 encoder PPR:%2",
"TUBITV2_OTC_SETXYRDATA": "OTC set parameters Wheel Diameter:%1 Wheel Width:%2 Body Diameter:%3(cm)",
"TUBITV2_OTC_ADDXYRDATA": "OTC adjust parameters X:%1 Y:%2 Rotation:%3",


        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-cn"],
        {
"TUBITV2_OTC_CATEGORY": "OTC 机器人",
"TUBITV2_OTC_RUNDEG": "OTC 移动到 %1度, 速度: %2",
"TUBITV2_OTC_RUNXYR": "OTC 移动方向 x:%1 y:%2 旋转:%3",
"TUBITV2_OTC_AMOVE": "OTC 移动 x:%1 y:%2 (cm) 旋转:%3 (度), 最大速度:%4 加速度:%5",
"TUBITV2_OTC_MOVE": "OTC 移动 x:%1 y:%2 (cm) 旋转:%3 (度), 最大速度:%4 加速度:%5 减速度:%6, 起始速度:%7, 结束速度:%8",
"TUBITV2_OTC_AMOVECURVE": "OTC 移动 x:%1 y:%2 (cm) 旋转:%3 (度), 偏移弧距离:%4 (cm), 最大速度:%5 加速度:%6",
"TUBITV2_OTC_MOVECURVE": "OTC 移动 x:%1 y:%2 (cm) 旋转:%3 (度), 偏移弧距离:%4 (cm), 最大速度:%5 加速度:%6 减速度:%7, 起始速度:%8, 结束速度:%9",
"TUBITV2_OTC_SETPID": "设置电机 P:%1 I:%2 D:%3",
"TUBITV2_OTC_INTERRSET": "OTC 设置中断执行 %1",
"TUBITV2_OTC_INTERREVENT": "移动中断 %1 执行区块",
"TUBITV2_OTC_RETURNA": "返回 %1",
"TUBITV2_OTC_INTERR": "读取中断移动 %1",
"TUBITV2_OTC_X": "X",
"TUBITV2_OTC_Y": "Y",
"TUBITV2_OTC_Z": "Z",
"TUBITV2_OTC_BNOMOVE": "OTC 移动 %1 功能，方向 x:%2 y:%3 旋转:%4, 当前角度:%5",
"TUBITV2_OTC_BNON": "无编码器",
"TUBITV2_OTC_BNOENC": "有编码器",
"TUBITV2_OTC_LABEL_ADVANCE_A": "OTC: 高级移动参数设置",
"TUBITV2_OTC_LABEL_ADVANCE_B": "OTC: 高级移动控制",
"TUBITV2_OTC_LABEL_ADVANCE_C": "OTC: 中断设置",
"TUBITV2_OTC_LABEL_ADVANCE_D": "OTC: BNO055 模块",
"TUBITV2_OTC_SETBODYDEG": "设置 OTC 自身角度为 %1",
"TUBITV2_OTC_RUNXYRV7RC": "OTC 遥控移动 x:%1 y:%2 左转:%3 右转:%4",
"TUBITV2_OTC_SETCPR": "设置电机 齿轮比:%1 编码数 PPR:%2",
"TUBITV2_OTC_SETXYRDATA": "OTC 设置参数 轮直径:%1 轮宽:%2 车体直径:%3(cm)",
"TUBITV2_OTC_ADDXYRDATA": "OTC 微调参数 x:%1 y:%2 旋转:%3",


        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-tw"],
        {
            "TUBITV2_OTC_CATEGORY": "OTC ROBOT",
            "TUBITV2_OTC_RUNDEG":"OTC 移動到 %1度, 速度 : %2 ",
            "TUBITV2_OTC_RUNXYR":"OTC 移動往 x: %1 y: %2 旋轉: %3",
            "TUBITV2_OTC_AMOVE":"OTC 移動 x: %1 y: %2 (cm) 旋轉: %3 (deg), 最大速度: %4 加速度: %5",
            "TUBITV2_OTC_MOVE":"OTC 移動 x: %1 y: %2 (cm) 旋轉: %3  (deg) , 最大速度: %4 加速度: %5 減速度: %6, 起始速度: %7,結束速度: %8",
            "TUBITV2_OTC_AMOVECURVE":"OTC 移動 x: %1 y: %2 (cm) 旋轉: %3 (deg),偏移弧距離 %4 (cm) , 最大速度: %5 加速度: %6",
            "TUBITV2_OTC_MOVECURVE":"OTC 移動 x: %1 y: %2 (cm) 旋轉: %3  (deg) ,偏移弧距離 %4 (cm), 最大速度: %5 加速度: %6 減速度: %7, 起始速度: %8,結束速度: %9",
            "TUBITV2_OTC_SETPID":"設定馬達 P %1 I %2 D %3",
            "TUBITV2_OTC_INTERRSET":"OTC設定中斷執行%1",
            "TUBITV2_OTC_INTERREVENT":"移動中斷%1執行區塊",
            "TUBITV2_OTC_RETURNA":"回傳%1",
            "TUBITV2_OTC_INTERR":"讀取中斷移動%1",
            "TUBITV2_OTC_X":"X",
            "TUBITV2_OTC_Y":"Y",
            "TUBITV2_OTC_Z":"Z",
            "TUBITV2_OTC_BNOMOVE":"OTC移動%1功能往x : %2 y: %3 旋轉: %4 , 目前角度%5",
            "TUBITV2_OTC_BNON":"無編碼器",
            "TUBITV2_OTC_BNOENC":"有編碼器",
            "TUBITV2_OTC_LABEL_ADVANCE_A": "OTC:進階移動參數設定",
            "TUBITV2_OTC_LABEL_ADVANCE_B": "OTC:進階移動控制",
            "TUBITV2_OTC_LABEL_ADVANCE_C":"OTC:中斷設定",
            "TUBITV2_OTC_LABEL_ADVANCE_D":"OTC:BNO055模組",
            "TUBITV2_OTC_SETBODYDEG":"設定OTC自身角度為%1",
            "TUBITV2_OTC_RUNXYRV7RC":"OTC 遙控移動  x: %1 y: %2 左轉:%3 右轉:%4",
            "TUBITV2_OTC_SETCPR":"設定馬達 齒輪比:%1 編碼數PPR:%2",
            "TUBITV2_OTC_SETXYRDATA":"OTC 設定參數 輪直徑:%1 輪寬:%2 車體直徑:%3(cm)",
            "TUBITV2_OTC_ADDXYRDATA":"OTC 微調參數 x:%1 y:%2 旋轉:%3",
        }
    );

    return Blockly;
}

if (typeof module !== 'undefined') {
    module.exports = {getInterfaceTranslations};
}

exports = registerScratchExtensionTranslations;
exports = registerBlocksMessages;