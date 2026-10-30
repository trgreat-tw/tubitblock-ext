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
            "tcs3200.description": "Color sensor module based on TCS3200."
        },
        "ru": {
            "tcs3200.description": "Модуль датчика цвета на базе TCS3200."
        },
        "zh-cn": {
            "tcs3200.description": "基于 TCS3200 的颜色传感器模块。"
        },
        "zh-tw": {
            "tcs3200.description": "基於 TCS3200 的顏色傳感器模塊。"
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
            "INIT_GUARD_LABEL_TCS3200": "TCS3200 Color Sensor"
        },
        "ru": {
            "INIT_GUARD_TUBIT_REQUIRED": "Поместите блок «Инициализация TUBIT» под блоком «когда Arduino запускается».",
            "INIT_GUARD_SENSOR_REQUIRED": "Поместите блок «Инициализация: %1 %2» под блоком «когда Arduino запускается» перед блоками чтения или использования модуля.",
            "INIT_GUARD_INIT_PLACEMENT": "Поместите блок «Инициализация: %1 %2» непосредственно под блоком «когда Arduino запускается», перед циклами и условиями.",
            "INIT_GUARD_OLED_REQUIRED": "Сначала добавьте блок вывода на OLED и поместите блоки рисования внутрь него либо разместите перед ними блок очистки или обновления дисплея.",
            "INIT_GUARD_PIN_SUFFIX": "контакт %1",
            "INIT_GUARD_INVALID_ID": "Введите неотрицательный целый номер модуля.",
            "INIT_GUARD_LABEL_TCS3200": "Датчик цвета TCS3200"
        },
        "zh-cn": {
            "INIT_GUARD_TUBIT_REQUIRED": "请在Arduino启动的积木底下放置\"TUBIT初始化\"积木",
            "INIT_GUARD_SENSOR_REQUIRED": "请在Arduino启动的积木底下放置\"%1%2初始化\"积木，并放在读取／使用积木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "请将\"%1%2初始化\"积木直接放在Arduino启动底下，且放在重复执行或条件判断之前。",
            "INIT_GUARD_OLED_REQUIRED": "请先放置OLED显示积木，并将绘图积木放在其内，或先放清除／更新显示积木。",
            "INIT_GUARD_PIN_SUFFIX": "引脚%1",
            "INIT_GUARD_INVALID_ID": "模组编号请输入非负整数。",
            "INIT_GUARD_LABEL_TCS3200": "TCS3200颜色传感器"
        },
        "zh-tw": {
            "INIT_GUARD_TUBIT_REQUIRED": "請在Arduino啟動的積木底下放置\"TUBIT初始化\"積木",
            "INIT_GUARD_SENSOR_REQUIRED": "請在Arduino啟動的積木底下放置\"%1%2初始化\"積木，並放在讀取／使用積木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "請將\"%1%2初始化\"積木直接放在Arduino啟動底下，且放在重複執行或條件判斷之前。",
            "INIT_GUARD_OLED_REQUIRED": "請先放置OLED顯示積木，並將繪圖積木放在其內，或先放清除／更新顯示積木。",
            "INIT_GUARD_PIN_SUFFIX": "腳位%1",
            "INIT_GUARD_INVALID_ID": "模組編號請輸入非負整數。",
            "INIT_GUARD_LABEL_TCS3200": "TCS3200顏色感測器"
        }
    };
    Object.keys(__initGuardMessages).forEach(function (locale) {
        if (!Blockly.ScratchMsgs.locales[locale]) Blockly.ScratchMsgs.locales[locale] = {};
        Object.assign(Blockly.ScratchMsgs.locales[locale], __initGuardMessages[locale]);
    });

    Object.assign(Blockly.ScratchMsgs.locales["en"],
        {
            "TCS3200_CALIBRATEBLACK": "tcs3200 calibrate black",
            "TCS3200_CALIBRATEWHITE": "tcs3200 calibrate white",
            "TCS3200_CATEGORY": "TCS3200",
            "TCS3200_COLOR_BLUE": "blue",
            "TCS3200_COLOR_GREEN": "green",
            "TCS3200_COLOR_RED": "red",
            "TCS3200_GETCOLORVALUE": "tcs3200 get %1 value",
            "TCS3200_INIT": "init tcs3200 pin S0 %1 S1 %2 S2 %3 S3 %4 S5 %5",
            "TCS3200_INIT_TOOLTIP": "The out pin is fixed: Arduino Uno pin 5, Arduino Leonardo pin 12, Arduino Mega pin 47",
            "TCS3200_MEASURECOLOR": "tcs3200 measure color"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["ru"],
        {
            "TCS3200_CALIBRATEBLACK": "tcs3200 калибровать черный",
            "TCS3200_CALIBRATEWHITE": "tcs3200 калибровать белый",
            "TCS3200_CATEGORY": "TCS3200",
            "TCS3200_COLOR_BLUE": "синий",
            "TCS3200_COLOR_GREEN": "зеленый",
            "TCS3200_COLOR_RED": "красный",
            "TCS3200_GETCOLORVALUE": "tcs3200 получить %1  значение",
            "TCS3200_INIT": "инициализировать tcs3200 пины S0 %1 S1 %2 S2 %3 S3 %4 S5 %5",
            "TCS3200_INIT_TOOLTIP": "Выходной контакт фиксирован: Arduino Uno, контакт 5, Arduino Leonardo, контакт 12, Arduino Mega, контакт 47.",
            "TCS3200_MEASURECOLOR": "tcs3200 измерить цвет"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-cn"],
        {
            "TCS3200_CALIBRATEBLACK": "tcs3200 校准黑色",
            "TCS3200_CALIBRATEWHITE": "tcs3200 校准白色",
            "TCS3200_CATEGORY": "TCS3200",
            "TCS3200_COLOR_BLUE": "蓝色",
            "TCS3200_COLOR_GREEN": "绿色",
            "TCS3200_COLOR_RED": "红色",
            "TCS3200_GETCOLORVALUE": "tcs3200 获取 %1 数值",
            "TCS3200_INIT": "初始化 tcs3200 引脚 S0 %1 S1 %2 S2 %3 S3 %4 S5 %5",
            "TCS3200_INIT_TOOLTIP": "OUT 引脚是固定的: Arduino Uno 引脚 5, Arduino Leonardo 引脚 12, Arduino Mega 引脚 47",
            "TCS3200_MEASURECOLOR": "tcs3200 测量颜色"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-tw"],
        {
            "TCS3200_CALIBRATEBLACK": "tcs3200 校準黑色",
            "TCS3200_CALIBRATEWHITE": "tcs3200 校準白色",
            "TCS3200_CATEGORY": "TCS3200",
            "TCS3200_COLOR_BLUE": "藍色",
            "TCS3200_COLOR_GREEN": "綠色",
            "TCS3200_COLOR_RED": "紅色",
            "TCS3200_GETCOLORVALUE": "tcs3200 獲取 %1 數值",
            "TCS3200_INIT": "初始化 tcs3200 管腳 S0 %1 S1 %2 S2 %3 S3 %4 S5 %5",
            "TCS3200_INIT_TOOLTIP": "OUT 管腳是固定的: Arduino Uno 管腳 5, Arduino Leonardo 管腳 12, Arduino Mega 管腳 47",
            "TCS3200_MEASURECOLOR": "tcs3200 測量顏色"
        }
    );

    return Blockly;
}

if (typeof module !== 'undefined') {
    module.exports = {getInterfaceTranslations};
}
exports = registerScratchExtensionTranslations;
exports = registerBlocksMessages;
