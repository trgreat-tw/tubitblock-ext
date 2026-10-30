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
            "fourDigitClockDisplay.name": "4-Digit Clock Display",
            "fourDigitClockDisplay.description": "4-digit clock display module based on TM1637."
        },
        "ru": {
            "fourDigitClockDisplay.name": "4-разрядный индикатор для часов",
            "fourDigitClockDisplay.description": "4-разрядный индикатор для часов на базе TM1637."
        },
        "zh-cn": {
            "fourDigitClockDisplay.name": "4位时钟数码管",
            "fourDigitClockDisplay.description": "基于 TM1637 的4位时钟数码管。"
        },
        "zh-tw": {
            "fourDigitClockDisplay.name": "4位時鐘數碼管",
            "fourDigitClockDisplay.description": "基於 TM1637 的4位時鐘數碼管。"
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
            "INIT_GUARD_LABEL_FOURDIGITCLOCKDISPLAY": "4-Digit Clock Display"
        },
        "ru": {
            "INIT_GUARD_TUBIT_REQUIRED": "Поместите блок «Инициализация TUBIT» под блоком «когда Arduino запускается».",
            "INIT_GUARD_SENSOR_REQUIRED": "Поместите блок «Инициализация: %1 %2» под блоком «когда Arduino запускается» перед блоками чтения или использования модуля.",
            "INIT_GUARD_INIT_PLACEMENT": "Поместите блок «Инициализация: %1 %2» непосредственно под блоком «когда Arduino запускается», перед циклами и условиями.",
            "INIT_GUARD_OLED_REQUIRED": "Сначала добавьте блок вывода на OLED и поместите блоки рисования внутрь него либо разместите перед ними блок очистки или обновления дисплея.",
            "INIT_GUARD_PIN_SUFFIX": "контакт %1",
            "INIT_GUARD_INVALID_ID": "Введите неотрицательный целый номер модуля.",
            "INIT_GUARD_LABEL_FOURDIGITCLOCKDISPLAY": "4-разрядный индикатор для часов"
        },
        "zh-cn": {
            "INIT_GUARD_TUBIT_REQUIRED": "请在Arduino启动的积木底下放置\"TUBIT初始化\"积木",
            "INIT_GUARD_SENSOR_REQUIRED": "请在Arduino启动的积木底下放置\"%1%2初始化\"积木，并放在读取／使用积木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "请将\"%1%2初始化\"积木直接放在Arduino启动底下，且放在重复执行或条件判断之前。",
            "INIT_GUARD_OLED_REQUIRED": "请先放置OLED显示积木，并将绘图积木放在其内，或先放清除／更新显示积木。",
            "INIT_GUARD_PIN_SUFFIX": "引脚%1",
            "INIT_GUARD_INVALID_ID": "模组编号请输入非负整数。",
            "INIT_GUARD_LABEL_FOURDIGITCLOCKDISPLAY": "4位时钟数码管"
        },
        "zh-tw": {
            "INIT_GUARD_TUBIT_REQUIRED": "請在Arduino啟動的積木底下放置\"TUBIT初始化\"積木",
            "INIT_GUARD_SENSOR_REQUIRED": "請在Arduino啟動的積木底下放置\"%1%2初始化\"積木，並放在讀取／使用積木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "請將\"%1%2初始化\"積木直接放在Arduino啟動底下，且放在重複執行或條件判斷之前。",
            "INIT_GUARD_OLED_REQUIRED": "請先放置OLED顯示積木，並將繪圖積木放在其內，或先放清除／更新顯示積木。",
            "INIT_GUARD_PIN_SUFFIX": "腳位%1",
            "INIT_GUARD_INVALID_ID": "模組編號請輸入非負整數。",
            "INIT_GUARD_LABEL_FOURDIGITCLOCKDISPLAY": "4位時鐘數碼管"
        }
    };
    Object.keys(__initGuardMessages).forEach(function (locale) {
        if (!Blockly.ScratchMsgs.locales[locale]) Blockly.ScratchMsgs.locales[locale] = {};
        Object.assign(Blockly.ScratchMsgs.locales[locale], __initGuardMessages[locale]);
    });

    Object.assign(Blockly.ScratchMsgs.locales["en"],
        {
            "FOURDIGITCLOCKDISPLAY_CATEGORY": "4-Digit Clock Display",
            "FOURDIGITCLOCKDISPLAY_CLEAR": "clear 4-digit clock display",
            "FOURDIGITCLOCKDISPLAY_DISPLAY": "4-digit clock display show %1 at bit %2",
            "FOURDIGITCLOCKDISPLAY_DISPLAYNUMBER": "4-digit clock display show number %1",
            "FOURDIGITCLOCKDISPLAY_DISPLAYSTRING": "4-digit clock display show string %1",
            "FOURDIGITCLOCKDISPLAY_INIT": "init 4-digit clock display pin DIO %1 CLK %2",
            "FOURDIGITCLOCKDISPLAY_SETBRIGHTNESS": "set 4-digit clock display brightness %1",
            "FOURDIGITCLOCKDISPLAY_SETPOINT": "4-digit clock display set point %1",
            "FOURDIGITCLOCKDISPLAY_SETPOINT_TOOLTIP": "It will take effect after the next update of the display.",
            "FOURDIGITCLOCKDISPLAY_STATE_OFF": "off",
            "FOURDIGITCLOCKDISPLAY_STATE_ON": "on"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["ru"],
        {
            "FOURDIGITCLOCKDISPLAY_CATEGORY": "4-значный дисплей часов",
            "FOURDIGITCLOCKDISPLAY_CLEAR": "Очистить 4-значный дисплей часов",
            "FOURDIGITCLOCKDISPLAY_DISPLAY": "Отобразить число %1 как бит %2 на 4-разрядном дисплее часов",
            "FOURDIGITCLOCKDISPLAY_DISPLAYNUMBER": "Отобразить число %1 на 4-разрядном дисплее часов",
            "FOURDIGITCLOCKDISPLAY_DISPLAYSTRING": "Отобразить строку %1 на 4-разрядном дисплее часов",
            "FOURDIGITCLOCKDISPLAY_INIT": "Инициализировать 4-разрядный дисплей часов DIO %1 CLK %2",
            "FOURDIGITCLOCKDISPLAY_SETBRIGHTNESS": "установить яркость 4-разрядного дисплея часов в %1",
            "FOURDIGITCLOCKDISPLAY_SETPOINT": "Отобразить точку %1 на 4-разрядном дисплее часов",
            "FOURDIGITCLOCKDISPLAY_SETPOINT_TOOLTIP": "Это вступит в силу после следующего обновления дисплея.",
            "FOURDIGITCLOCKDISPLAY_STATE_OFF": "Выключить",
            "FOURDIGITCLOCKDISPLAY_STATE_ON": "Включить"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-cn"],
        {
            "FOURDIGITCLOCKDISPLAY_CATEGORY": "4位时钟数码管",
            "FOURDIGITCLOCKDISPLAY_CLEAR": "清空4位时钟数码管",
            "FOURDIGITCLOCKDISPLAY_DISPLAY": "4位时钟数码管显示 %1 第 %2 位",
            "FOURDIGITCLOCKDISPLAY_DISPLAYNUMBER": "4位时钟数码管显示数字 %1",
            "FOURDIGITCLOCKDISPLAY_DISPLAYSTRING": "4位时钟数码管显示字符 %1",
            "FOURDIGITCLOCKDISPLAY_INIT": "初始化4位时钟数码管引脚 DIO %1 CLK %2",
            "FOURDIGITCLOCKDISPLAY_SETBRIGHTNESS": "设置4位时钟数码管亮度 %1",
            "FOURDIGITCLOCKDISPLAY_SETPOINT": "4位时钟数码管设置点 %1",
            "FOURDIGITCLOCKDISPLAY_SETPOINT_TOOLTIP": "将在下次更新显示后生效.",
            "FOURDIGITCLOCKDISPLAY_STATE_OFF": "关",
            "FOURDIGITCLOCKDISPLAY_STATE_ON": "开"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-tw"],
        {
            "FOURDIGITCLOCKDISPLAY_CATEGORY": "4位時鐘數碼管",
            "FOURDIGITCLOCKDISPLAY_CLEAR": "清空4位時鐘數碼管",
            "FOURDIGITCLOCKDISPLAY_DISPLAY": "4位時鐘數碼管顯示 %1 第 %2 位",
            "FOURDIGITCLOCKDISPLAY_DISPLAYNUMBER": "4位時鐘數碼管顯示數字 %1",
            "FOURDIGITCLOCKDISPLAY_DISPLAYSTRING": "4位時鐘數碼管顯示字符 %1",
            "FOURDIGITCLOCKDISPLAY_INIT": "初始化4位時鐘數碼管管腳 DIO %1 CLK %2",
            "FOURDIGITCLOCKDISPLAY_SETBRIGHTNESS": "設置4位時鐘數碼管亮度 %1",
            "FOURDIGITCLOCKDISPLAY_SETPOINT": "4位時鐘數碼管設置點 %1",
            "FOURDIGITCLOCKDISPLAY_SETPOINT_TOOLTIP": "將在下次更新顯示後生效.",
            "FOURDIGITCLOCKDISPLAY_STATE_OFF": "關閉",
            "FOURDIGITCLOCKDISPLAY_STATE_ON": "打開"
        }
    );

    return Blockly;
}

if (typeof module !== 'undefined') {
    module.exports = {getInterfaceTranslations};
}
exports = registerScratchExtensionTranslations;
exports = registerBlocksMessages;
