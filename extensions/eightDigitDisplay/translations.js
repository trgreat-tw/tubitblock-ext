// This file was automatically generated. Do not modify.
/* eslint-disable func-style */
/* eslint-disable require-jsdoc */
/* eslint-disable quotes */
/* eslint-disable quote-props */
/* eslint-disable dot-notation */
/* eslint-disable max-len */
function getInterfaceTranslations () {
    return {
        "en": {
            "eightDigitDisplay.name": "8-Digit Display",
            "eightDigitDisplay.description": "8-digit display module based on MAX7219."
        },
        "ru": {
            "eightDigitDisplay.name": "8-разрядный дисплей",
            "eightDigitDisplay.description": "8-разрядный дисплейный модуль на базе MAX7219."
        },
        "zh-cn": {
            "eightDigitDisplay.name": "8位数码管",
            "eightDigitDisplay.description": "基于 MAX7219 的8位数码管。"
        },
        "zh-tw": {
            "eightDigitDisplay.name": "8位數碼管",
            "eightDigitDisplay.description": "基於 MAX7219 的8位數碼管。"
        }
    }
    ;
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
            "INIT_GUARD_LABEL_EIGHTDIGITDISPLAY": "8-Digit Display"
        },
        "ru": {
            "INIT_GUARD_TUBIT_REQUIRED": "Поместите блок «Инициализация TUBIT» под блоком «когда Arduino запускается».",
            "INIT_GUARD_SENSOR_REQUIRED": "Поместите блок «Инициализация: %1 %2» под блоком «когда Arduino запускается» перед блоками чтения или использования модуля.",
            "INIT_GUARD_INIT_PLACEMENT": "Поместите блок «Инициализация: %1 %2» непосредственно под блоком «когда Arduino запускается», перед циклами и условиями.",
            "INIT_GUARD_OLED_REQUIRED": "Сначала добавьте блок вывода на OLED и поместите блоки рисования внутрь него либо разместите перед ними блок очистки или обновления дисплея.",
            "INIT_GUARD_PIN_SUFFIX": "контакт %1",
            "INIT_GUARD_INVALID_ID": "Введите неотрицательный целый номер модуля.",
            "INIT_GUARD_LABEL_EIGHTDIGITDISPLAY": "8-разрядный дисплей"
        },
        "zh-cn": {
            "INIT_GUARD_TUBIT_REQUIRED": "请在Arduino启动的积木底下放置\"TUBIT初始化\"积木",
            "INIT_GUARD_SENSOR_REQUIRED": "请在Arduino启动的积木底下放置\"%1%2初始化\"积木，并放在读取／使用积木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "请将\"%1%2初始化\"积木直接放在Arduino启动底下，且放在重复执行或条件判断之前。",
            "INIT_GUARD_OLED_REQUIRED": "请先放置OLED显示积木，并将绘图积木放在其内，或先放清除／更新显示积木。",
            "INIT_GUARD_PIN_SUFFIX": "引脚%1",
            "INIT_GUARD_INVALID_ID": "模组编号请输入非负整数。",
            "INIT_GUARD_LABEL_EIGHTDIGITDISPLAY": "8位数码管"
        },
        "zh-tw": {
            "INIT_GUARD_TUBIT_REQUIRED": "請在Arduino啟動的積木底下放置\"TUBIT初始化\"積木",
            "INIT_GUARD_SENSOR_REQUIRED": "請在Arduino啟動的積木底下放置\"%1%2初始化\"積木，並放在讀取／使用積木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "請將\"%1%2初始化\"積木直接放在Arduino啟動底下，且放在重複執行或條件判斷之前。",
            "INIT_GUARD_OLED_REQUIRED": "請先放置OLED顯示積木，並將繪圖積木放在其內，或先放清除／更新顯示積木。",
            "INIT_GUARD_PIN_SUFFIX": "腳位%1",
            "INIT_GUARD_INVALID_ID": "模組編號請輸入非負整數。",
            "INIT_GUARD_LABEL_EIGHTDIGITDISPLAY": "8位數碼管"
        }
    };
    Object.keys(__initGuardMessages).forEach(function (locale) {
        if (!Blockly.ScratchMsgs.locales[locale]) Blockly.ScratchMsgs.locales[locale] = {};
        Object.assign(Blockly.ScratchMsgs.locales[locale], __initGuardMessages[locale]);
    });

    Object.assign(Blockly.ScratchMsgs.locales["en"],
        {
            "EIGHTDIGITDISPLAY_CATEGORY": "8-Digit Display",
            "EIGHTDIGITDISPLAY_CLEAR": "clear 8-digit display",
            "EIGHTDIGITDISPLAY_DISPLAYNUMBER": "8-digit display show number %1 decimal %2",
            "EIGHTDIGITDISPLAY_INIT": "init 8-digit display pin DIN %1 CS %2 CLK %3",
            "EIGHTDIGITDISPLAY_SETBRIGHTNESS": "set 8-digit display brightness %1"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["ru"],
        {
            "EIGHTDIGITDISPLAY_CATEGORY": "8-разрядный дисплей",
            "EIGHTDIGITDISPLAY_CLEAR": "Очистить 8-разрядный дисплей",
            "EIGHTDIGITDISPLAY_DISPLAYNUMBER": "8-разрядный дисплей показывает число %1 десятичный %2",
            "EIGHTDIGITDISPLAY_INIT": "init 8-разрядный контакт дисплея DIN %1 CS %2 CLK %3",
            "EIGHTDIGITDISPLAY_SETBRIGHTNESS": "установить яркость 8-разрядного дисплея %1"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-cn"],
        {
            "EIGHTDIGITDISPLAY_CATEGORY": "8位数码管",
            "EIGHTDIGITDISPLAY_CLEAR": "清空8位数码管",
            "EIGHTDIGITDISPLAY_DISPLAYNUMBER": "8位数码管显示数字 %1 保留小数点后 %2 位",
            "EIGHTDIGITDISPLAY_INIT": "初始化 8位数码管引脚 DIN %1 CS %2 CLK %3",
            "EIGHTDIGITDISPLAY_SETBRIGHTNESS": "设置8位数码管亮度 %1"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-tw"],
        {
            "EIGHTDIGITDISPLAY_CATEGORY": "8位數碼管",
            "EIGHTDIGITDISPLAY_CLEAR": "清空8位數碼管",
            "EIGHTDIGITDISPLAY_DISPLAYNUMBER": "8位數碼管顯示數字 %1 保留小數點後 %2 位",
            "EIGHTDIGITDISPLAY_INIT": "初始化 8位數碼管管腳 DIN %1 CS %2 CLK %3",
            "EIGHTDIGITDISPLAY_SETBRIGHTNESS": "設置8位數碼管亮度 %1"
        }
    );

    return Blockly;
}

if (typeof module !== 'undefined') {
    module.exports = {getInterfaceTranslations};
}
exports = registerScratchExtensionTranslations;
exports = registerBlocksMessages;
