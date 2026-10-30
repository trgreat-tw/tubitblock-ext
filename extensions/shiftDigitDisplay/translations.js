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
            "shiftDigitDisplay.name": "Shift Digit Display",
            "shiftDigitDisplay.description": "Digital dislapy based on 74HC595 with dynamic scanning display."
        },
        "ru": {
            "shiftDigitDisplay.name": "Цифровой дисплей со сдвигом",
            "shiftDigitDisplay.description": "Цифровой дисплей на базе 74HC595 с динамической разверткой дисплея."
        },
        "zh-cn": {
            "shiftDigitDisplay.name": "七段顯示器",
            "shiftDigitDisplay.description": "使用动态扫描方式显示的基于 74HC595 的顯示器。"
        },
        "zh-tw": {
            "shiftDigitDisplay.name": "七段顯示器",
            "shiftDigitDisplay.description": "使用動態掃描方式顯示的基於 74HC595 的顯示器。"
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
            "INIT_GUARD_LABEL_SHIFTDIGITDISPLAY": "Shift Digit Display"
        },
        "ru": {
            "INIT_GUARD_TUBIT_REQUIRED": "Поместите блок «Инициализация TUBIT» под блоком «когда Arduino запускается».",
            "INIT_GUARD_SENSOR_REQUIRED": "Поместите блок «Инициализация: %1 %2» под блоком «когда Arduino запускается» перед блоками чтения или использования модуля.",
            "INIT_GUARD_INIT_PLACEMENT": "Поместите блок «Инициализация: %1 %2» непосредственно под блоком «когда Arduino запускается», перед циклами и условиями.",
            "INIT_GUARD_OLED_REQUIRED": "Сначала добавьте блок вывода на OLED и поместите блоки рисования внутрь него либо разместите перед ними блок очистки или обновления дисплея.",
            "INIT_GUARD_PIN_SUFFIX": "контакт %1",
            "INIT_GUARD_INVALID_ID": "Введите неотрицательный целый номер модуля.",
            "INIT_GUARD_LABEL_SHIFTDIGITDISPLAY": "Цифровой дисплей со сдвигом"
        },
        "zh-cn": {
            "INIT_GUARD_TUBIT_REQUIRED": "请在Arduino启动的积木底下放置\"TUBIT初始化\"积木",
            "INIT_GUARD_SENSOR_REQUIRED": "请在Arduino启动的积木底下放置\"%1%2初始化\"积木，并放在读取／使用积木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "请将\"%1%2初始化\"积木直接放在Arduino启动底下，且放在重复执行或条件判断之前。",
            "INIT_GUARD_OLED_REQUIRED": "请先放置OLED显示积木，并将绘图积木放在其内，或先放清除／更新显示积木。",
            "INIT_GUARD_PIN_SUFFIX": "引脚%1",
            "INIT_GUARD_INVALID_ID": "模组编号请输入非负整数。",
            "INIT_GUARD_LABEL_SHIFTDIGITDISPLAY": "七段顯示器"
        },
        "zh-tw": {
            "INIT_GUARD_TUBIT_REQUIRED": "請在Arduino啟動的積木底下放置\"TUBIT初始化\"積木",
            "INIT_GUARD_SENSOR_REQUIRED": "請在Arduino啟動的積木底下放置\"%1%2初始化\"積木，並放在讀取／使用積木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "請將\"%1%2初始化\"積木直接放在Arduino啟動底下，且放在重複執行或條件判斷之前。",
            "INIT_GUARD_OLED_REQUIRED": "請先放置OLED顯示積木，並將繪圖積木放在其內，或先放清除／更新顯示積木。",
            "INIT_GUARD_PIN_SUFFIX": "腳位%1",
            "INIT_GUARD_INVALID_ID": "模組編號請輸入非負整數。",
            "INIT_GUARD_LABEL_SHIFTDIGITDISPLAY": "七段顯示器"
        }
    };
    Object.keys(__initGuardMessages).forEach(function (locale) {
        if (!Blockly.ScratchMsgs.locales[locale]) Blockly.ScratchMsgs.locales[locale] = {};
        Object.assign(Blockly.ScratchMsgs.locales[locale], __initGuardMessages[locale]);
    });

    Object.assign(Blockly.ScratchMsgs.locales["en"],
        {
            "SHIFTDIGITDISPLAY_CATEGORY": "Shift Digit Display",
            "SHIFTDIGITDISPLAY_DISPLAYNUMBER": "shift digit display display number %1 decimal %2",
            "SHIFTDIGITDISPLAY_DISPLAYSTRING": "shift digit display display string %1",
            "SHIFTDIGITDISPLAY_INIT": "init shift digit display length %1 pin SCLK %2 RCLK %3 DIO %4",
            "SHIFTDIGITDISPLAY_REFRESH_TOOLTIP": "This command will block the program.",
            "SHIFTDIGITDISPLAY_SHOW": "shift digit display show for %1 ms"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["ru"],
        {
            "SHIFTDIGITDISPLAY_CATEGORY": "Цифровой дисплей со сдвигом\n ",
            "SHIFTDIGITDISPLAY_DISPLAYNUMBER": "цифровому индикатору отобразить число %1 десятичное %2",
            "SHIFTDIGITDISPLAY_DISPLAYSTRING": "цифровому индикатору отобразить строку %1",
            "SHIFTDIGITDISPLAY_INIT": "инициализировать сдвиговый дисплей %1 пин SCLK %2 RCLK %3 DIO %4",
            "SHIFTDIGITDISPLAY_REFRESH_TOOLTIP": "Эта команда заблокирует программу.",
            "SHIFTDIGITDISPLAY_SHOW": "цифровому индикатору отобразить на %1 мс"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-cn"],
        {
            "SHIFTDIGITDISPLAY_CATEGORY": "七段顯示器",
            "SHIFTDIGITDISPLAY_DISPLAYNUMBER": "七段顯示器显示数字 %1 保留小数点后 %2 位",
            "SHIFTDIGITDISPLAY_DISPLAYSTRING": "七段顯示器显示字符串 %1",
            "SHIFTDIGITDISPLAY_INIT": "初始化七段顯示器 长度 %1 引脚 SCLK %2 RCLK %3 DIO %4",
            "SHIFTDIGITDISPLAY_REFRESH_TOOLTIP": "这条指令将会阻塞程序。",
            "SHIFTDIGITDISPLAY_SHOW": "七段顯示器显示 %1 ms"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-tw"],
        {
            "SHIFTDIGITDISPLAY_CATEGORY": "七段顯示器",
            "SHIFTDIGITDISPLAY_DISPLAYNUMBER": "七段顯示器顯示數字 %1 保留小數點後 %2 位",
            "SHIFTDIGITDISPLAY_DISPLAYSTRING": "七段顯示器顯示字符串 %1",
            "SHIFTDIGITDISPLAY_INIT": "初始化七段顯示器 長度 %1 管腳 SCLK %2 RCLK %3 DIO %4",
            "SHIFTDIGITDISPLAY_REFRESH_TOOLTIP": "這條指令將會阻塞程序。",
            "SHIFTDIGITDISPLAY_SHOW": "七段顯示器顯示 %1 ms"
        }
    );

    return Blockly;
}

if (typeof module !== 'undefined') {
    module.exports = {getInterfaceTranslations};
}
exports = registerScratchExtensionTranslations;
exports = registerBlocksMessages;
