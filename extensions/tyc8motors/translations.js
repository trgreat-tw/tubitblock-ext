// This file was automatically generated.  Do not modify.
/* eslint-disable func-style */
/* eslint-disable require-jsdoc */
/* eslint-disable quote-props */
/* eslint-disable quotes */
/* eslint-disable dot-notation */

function getInterfaceTranslations () {
    return {
        "en": {
            "tyc8.name": "TYC 8-Motor Board",
            "tyc8.description": "TYC ESP32 8-Channel Motor Expansion Board."
        },
        "zh-cn": {
            "tyc8.name": "TYC 8路电机扩展板",
            "tyc8.description": "TYC ESP32 8路电机扩展板"
        },
        "zh-tw": {
            "tyc8.name": "TYC 8路馬達擴展板",
            "tyc8.description": "TYC ESP32 8路馬達擴展板"
        }
    };
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
            "INIT_GUARD_LABEL_TYC8MOTORS": "TYC 8-Motor Board"
        },
        "ru": {
            "INIT_GUARD_TUBIT_REQUIRED": "Поместите блок «Инициализация TUBIT» под блоком «когда Arduino запускается».",
            "INIT_GUARD_SENSOR_REQUIRED": "Поместите блок «Инициализация: %1 %2» под блоком «когда Arduino запускается» перед блоками чтения или использования модуля.",
            "INIT_GUARD_INIT_PLACEMENT": "Поместите блок «Инициализация: %1 %2» непосредственно под блоком «когда Arduino запускается», перед циклами и условиями.",
            "INIT_GUARD_OLED_REQUIRED": "Сначала добавьте блок вывода на OLED и поместите блоки рисования внутрь него либо разместите перед ними блок очистки или обновления дисплея.",
            "INIT_GUARD_PIN_SUFFIX": "контакт %1",
            "INIT_GUARD_INVALID_ID": "Введите неотрицательный целый номер модуля.",
            "INIT_GUARD_LABEL_TYC8MOTORS": "Восьмиканальная плата двигателей"
        },
        "zh-cn": {
            "INIT_GUARD_TUBIT_REQUIRED": "请在Arduino启动的积木底下放置\"TUBIT初始化\"积木",
            "INIT_GUARD_SENSOR_REQUIRED": "请在Arduino启动的积木底下放置\"%1%2初始化\"积木，并放在读取／使用积木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "请将\"%1%2初始化\"积木直接放在Arduino启动底下，且放在重复执行或条件判断之前。",
            "INIT_GUARD_OLED_REQUIRED": "请先放置OLED显示积木，并将绘图积木放在其内，或先放清除／更新显示积木。",
            "INIT_GUARD_PIN_SUFFIX": "引脚%1",
            "INIT_GUARD_INVALID_ID": "模组编号请输入非负整数。",
            "INIT_GUARD_LABEL_TYC8MOTORS": "TYC 8路电机扩展板"
        },
        "zh-tw": {
            "INIT_GUARD_TUBIT_REQUIRED": "請在Arduino啟動的積木底下放置\"TUBIT初始化\"積木",
            "INIT_GUARD_SENSOR_REQUIRED": "請在Arduino啟動的積木底下放置\"%1%2初始化\"積木，並放在讀取／使用積木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "請將\"%1%2初始化\"積木直接放在Arduino啟動底下，且放在重複執行或條件判斷之前。",
            "INIT_GUARD_OLED_REQUIRED": "請先放置OLED顯示積木，並將繪圖積木放在其內，或先放清除／更新顯示積木。",
            "INIT_GUARD_PIN_SUFFIX": "腳位%1",
            "INIT_GUARD_INVALID_ID": "模組編號請輸入非負整數。",
            "INIT_GUARD_LABEL_TYC8MOTORS": "TYC 8路馬達擴展板"
        }
    };
    Object.keys(__initGuardMessages).forEach(function (locale) {
        if (!Blockly.ScratchMsgs.locales[locale]) Blockly.ScratchMsgs.locales[locale] = {};
        Object.assign(Blockly.ScratchMsgs.locales[locale], __initGuardMessages[locale]);
    });

    Object.assign(Blockly.ScratchMsgs.locales["en"], {
        "TYC8_CATEGORY": "TYC 8-Motor",
        "TYC8_BEGIN": "TYC8 Init %1",
        "TYC8_INIT_FULL": "M1~M8 Motors (All)",
        "TYC8_INIT_SIX": "M1~M6 Motors (Release I2C/Servo Pins)",
        "TYC8_MOTOR": "Motor %1 Speed %2",
        "TYC8_SET_INVERTED": "Set Motor %1 Inverted %2",
        "TYC8_STOP_ALL": "Stop All Motors",
        "TYC8_M1": "M1", "TYC8_M2": "M2", "TYC8_M3": "M3", "TYC8_M4": "M4",
        "TYC8_M5": "M5", "TYC8_M6": "M6", "TYC8_M7": "M7", "TYC8_M8": "M8",
	"TYC8_MOTOR_VAR": "Control Motor No. %1 Speed %2"
    });

    Object.assign(Blockly.ScratchMsgs.locales["zh-tw"], {
        "TYC8_CATEGORY": "TYC 8路馬達",
        "TYC8_BEGIN": "TYC8 初始化設定 %1",
        "TYC8_INIT_FULL": "M1~M8 顆馬達初始化",
        "TYC8_INIT_SIX": "M1~M6 馬達初始化 (釋放 I2C/伺服腳位)",
        "TYC8_MOTOR": "馬達 %1 速度 %2",
        "TYC8_SET_INVERTED": "設定馬達 %1 反向轉動 %2",
        "TYC8_STOP_ALL": "停止所有馬達",
        "TYC8_M1": "M1", "TYC8_M2": "M2", "TYC8_M3": "M3", "TYC8_M4": "M4",
        "TYC8_M5": "M5", "TYC8_M6": "M6", "TYC8_M7": "M7", "TYC8_M8": "M8",
	"TYC8_MOTOR_VAR": "控制馬達 第 %1 顆 速度 %2"
    });

    return Blockly;
}

if (typeof module !== 'undefined') {
    module.exports = {getInterfaceTranslations};
}

//exports = registerScratchExtensionTranslations;
exports = registerBlocksMessages;