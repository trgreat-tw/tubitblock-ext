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
            "rgbLedStrip.name": "RGB LED Strip",
            "rgbLedStrip.description": "Single-wire-based RGB LED pixels and strip."
        },
        "ru": {
            "rgbLedStrip.name": "RGB-светодиодная лента",
            "rgbLedStrip.description": "Светодиодные RGB-пиксели и лента на основе одножильных проводов."
        },
        "zh-cn": {
            "rgbLedStrip.name": "RGB LED 灯条",
            "rgbLedStrip.description": "基于单总线的 RGB LED 的单个像素或灯条。"
        },
        "zh-tw": {
            "rgbLedStrip.name": "RGB LED 燈條",
            "rgbLedStrip.description": "基於單總線的 RGB LED 的單個像素或燈條。"
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
            "INIT_GUARD_LABEL_RGBLEDSTRIP": "RGB LED Strip"
        },
        "ru": {
            "INIT_GUARD_TUBIT_REQUIRED": "Поместите блок «Инициализация TUBIT» под блоком «когда Arduino запускается».",
            "INIT_GUARD_SENSOR_REQUIRED": "Поместите блок «Инициализация: %1 %2» под блоком «когда Arduino запускается» перед блоками чтения или использования модуля.",
            "INIT_GUARD_INIT_PLACEMENT": "Поместите блок «Инициализация: %1 %2» непосредственно под блоком «когда Arduino запускается», перед циклами и условиями.",
            "INIT_GUARD_OLED_REQUIRED": "Сначала добавьте блок вывода на OLED и поместите блоки рисования внутрь него либо разместите перед ними блок очистки или обновления дисплея.",
            "INIT_GUARD_PIN_SUFFIX": "контакт %1",
            "INIT_GUARD_INVALID_ID": "Введите неотрицательный целый номер модуля.",
            "INIT_GUARD_LABEL_RGBLEDSTRIP": "RGB-светодиодная лента"
        },
        "zh-cn": {
            "INIT_GUARD_TUBIT_REQUIRED": "请在Arduino启动的积木底下放置\"TUBIT初始化\"积木",
            "INIT_GUARD_SENSOR_REQUIRED": "请在Arduino启动的积木底下放置\"%1%2初始化\"积木，并放在读取／使用积木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "请将\"%1%2初始化\"积木直接放在Arduino启动底下，且放在重复执行或条件判断之前。",
            "INIT_GUARD_OLED_REQUIRED": "请先放置OLED显示积木，并将绘图积木放在其内，或先放清除／更新显示积木。",
            "INIT_GUARD_PIN_SUFFIX": "引脚%1",
            "INIT_GUARD_INVALID_ID": "模组编号请输入非负整数。",
            "INIT_GUARD_LABEL_RGBLEDSTRIP": "RGB LED 灯条"
        },
        "zh-tw": {
            "INIT_GUARD_TUBIT_REQUIRED": "請在Arduino啟動的積木底下放置\"TUBIT初始化\"積木",
            "INIT_GUARD_SENSOR_REQUIRED": "請在Arduino啟動的積木底下放置\"%1%2初始化\"積木，並放在讀取／使用積木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "請將\"%1%2初始化\"積木直接放在Arduino啟動底下，且放在重複執行或條件判斷之前。",
            "INIT_GUARD_OLED_REQUIRED": "請先放置OLED顯示積木，並將繪圖積木放在其內，或先放清除／更新顯示積木。",
            "INIT_GUARD_PIN_SUFFIX": "腳位%1",
            "INIT_GUARD_INVALID_ID": "模組編號請輸入非負整數。",
            "INIT_GUARD_LABEL_RGBLEDSTRIP": "RGB LED 燈條"
        }
    };
    Object.keys(__initGuardMessages).forEach(function (locale) {
        if (!Blockly.ScratchMsgs.locales[locale]) Blockly.ScratchMsgs.locales[locale] = {};
        Object.assign(Blockly.ScratchMsgs.locales[locale], __initGuardMessages[locale]);
    });

    Object.assign(Blockly.ScratchMsgs.locales["en"],
        {
            "RGBLEDSTRIP_CATEGORY": "RGB LED Strip",
            "RGBLEDSTRIP_CLEAR": "clear all rgb led",
            "RGBLEDSTRIP_COLOR": "rgb led strip color R %1 G %2 B %3",
            "RGBLEDSTRIP_FILL": "rgb led fill from pixel %1 count %2 with color %3",
            "RGBLEDSTRIP_INIT": "init rgb led strip length %1 pin %2",
            "RGBLEDSTRIP_SETBRIGHTNESS": "set rgb led brightness %1",
            "RGBLEDSTRIP_SETPIXELCOLOR": "rgb led set pixel %1 color %2",
            "RGBLEDSTRIP_SHOW": "refresh rgb led display"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["ru"],
        {
            "RGBLEDSTRIP_CATEGORY": "Светодиодная лента RGB",
            "RGBLEDSTRIP_CLEAR": "очистить все светодиоды rgb",
            "RGBLEDSTRIP_COLOR": "цвет RGB ленты R %1 G %2 B %3",
            "RGBLEDSTRIP_FILL": "заливка RGB от пикселя %1 длиной %2 цвет %3",
            "RGBLEDSTRIP_INIT": "инициализировать RGB ленту %1 пин %2",
            "RGBLEDSTRIP_SETBRIGHTNESS": "установить яркость светодиодной ленты в %1",
            "RGBLEDSTRIP_SETPIXELCOLOR": "установить пиксель RGB ленты %1 цвет %2",
            "RGBLEDSTRIP_SHOW": "обновить светодиодный rgb-дисплей"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-cn"],
        {
            "RGBLEDSTRIP_CATEGORY": "RGB LED灯条",
            "RGBLEDSTRIP_CLEAR": "清除所有 rgb led",
            "RGBLEDSTRIP_COLOR": "rgb led 灯条颜色 R %1 G %2 B %3",
            "RGBLEDSTRIP_FILL": "rgb led 从像素 %1 开始 共填充 %2 颜色 %3",
            "RGBLEDSTRIP_INIT": "初始化 rgb led 灯条长度 %1 引脚 %2",
            "RGBLEDSTRIP_SETBRIGHTNESS": "设置 rgb led 亮度 %1",
            "RGBLEDSTRIP_SETPIXELCOLOR": "rgb led 设置像素 %1 颜色 %2",
            "RGBLEDSTRIP_SHOW": "刷新 rgb led 显示"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-tw"],
        {
            "RGBLEDSTRIP_CATEGORY": "RGB LED 燈條",
            "RGBLEDSTRIP_CLEAR": "清除所有 rgb led",
            "RGBLEDSTRIP_COLOR": "rgb led 燈條顏色 R %1 G %2 B %3",
            "RGBLEDSTRIP_FILL": "rgb led 從像素 %1 開始 共填充 %2 顏色 %3",
            "RGBLEDSTRIP_INIT": "初始化 rgb led 燈條長度 %1 管腳 %2",
            "RGBLEDSTRIP_SETBRIGHTNESS": "設置 rgb led 亮度 %1",
            "RGBLEDSTRIP_SETPIXELCOLOR": "rgb led 設置像素 %1 顏色 %2",
            "RGBLEDSTRIP_SHOW": "刷新 rgb led 顯示"
        }
    );

    return Blockly;
}

if (typeof module !== 'undefined') {
    module.exports = {getInterfaceTranslations};
}
exports = registerScratchExtensionTranslations;
exports = registerBlocksMessages;
