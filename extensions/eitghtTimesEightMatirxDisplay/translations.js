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
            "eitghtTimesEightMatirxDisplay.name": "8x8 Matrix Display",
            "eitghtTimesEightMatirxDisplay.description": "8x8 matrix display module based on MAX7219."
        },
        "ru": {
            "eitghtTimesEightMatirxDisplay.name": "Матричный дисплей 8x8",
            "eitghtTimesEightMatirxDisplay.description": "Матричный дисплейный модуль 8x8 на базе MAX7219."
        },
        "zh-cn": {
            "eitghtTimesEightMatirxDisplay.name": "8x8点阵屏",
            "eitghtTimesEightMatirxDisplay.description": "基于MAX7219的8x8点阵屏。"
        },
        "zh-tw": {
            "eitghtTimesEightMatirxDisplay.name": "8x8點陣屏",
            "eitghtTimesEightMatirxDisplay.description": "基於MAX7219的8x8點陣屏。"
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
            "INIT_GUARD_LABEL_EITGHTTIMESEIGHTMATIRXDISPLAY": "8x8 Matrix Display"
        },
        "ru": {
            "INIT_GUARD_TUBIT_REQUIRED": "Поместите блок «Инициализация TUBIT» под блоком «когда Arduino запускается».",
            "INIT_GUARD_SENSOR_REQUIRED": "Поместите блок «Инициализация: %1 %2» под блоком «когда Arduino запускается» перед блоками чтения или использования модуля.",
            "INIT_GUARD_INIT_PLACEMENT": "Поместите блок «Инициализация: %1 %2» непосредственно под блоком «когда Arduino запускается», перед циклами и условиями.",
            "INIT_GUARD_OLED_REQUIRED": "Сначала добавьте блок вывода на OLED и поместите блоки рисования внутрь него либо разместите перед ними блок очистки или обновления дисплея.",
            "INIT_GUARD_PIN_SUFFIX": "контакт %1",
            "INIT_GUARD_INVALID_ID": "Введите неотрицательный целый номер модуля.",
            "INIT_GUARD_LABEL_EITGHTTIMESEIGHTMATIRXDISPLAY": "Матричный дисплей 8x8"
        },
        "zh-cn": {
            "INIT_GUARD_TUBIT_REQUIRED": "请在Arduino启动的积木底下放置\"TUBIT初始化\"积木",
            "INIT_GUARD_SENSOR_REQUIRED": "请在Arduino启动的积木底下放置\"%1%2初始化\"积木，并放在读取／使用积木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "请将\"%1%2初始化\"积木直接放在Arduino启动底下，且放在重复执行或条件判断之前。",
            "INIT_GUARD_OLED_REQUIRED": "请先放置OLED显示积木，并将绘图积木放在其内，或先放清除／更新显示积木。",
            "INIT_GUARD_PIN_SUFFIX": "引脚%1",
            "INIT_GUARD_INVALID_ID": "模组编号请输入非负整数。",
            "INIT_GUARD_LABEL_EITGHTTIMESEIGHTMATIRXDISPLAY": "8x8点阵屏"
        },
        "zh-tw": {
            "INIT_GUARD_TUBIT_REQUIRED": "請在Arduino啟動的積木底下放置\"TUBIT初始化\"積木",
            "INIT_GUARD_SENSOR_REQUIRED": "請在Arduino啟動的積木底下放置\"%1%2初始化\"積木，並放在讀取／使用積木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "請將\"%1%2初始化\"積木直接放在Arduino啟動底下，且放在重複執行或條件判斷之前。",
            "INIT_GUARD_OLED_REQUIRED": "請先放置OLED顯示積木，並將繪圖積木放在其內，或先放清除／更新顯示積木。",
            "INIT_GUARD_PIN_SUFFIX": "腳位%1",
            "INIT_GUARD_INVALID_ID": "模組編號請輸入非負整數。",
            "INIT_GUARD_LABEL_EITGHTTIMESEIGHTMATIRXDISPLAY": "8x8點陣屏"
        }
    };
    Object.keys(__initGuardMessages).forEach(function (locale) {
        if (!Blockly.ScratchMsgs.locales[locale]) Blockly.ScratchMsgs.locales[locale] = {};
        Object.assign(Blockly.ScratchMsgs.locales[locale], __initGuardMessages[locale]);
    });

    Object.assign(Blockly.ScratchMsgs.locales["en"],
        {
            "EITGHTTIMESEIGHTMATIRXDISPLAY_CATEGORY": "8x8 Matrix Display",
            "EITGHTTIMESEIGHTMATIRXDISPLAY_DRAWPATTERN": "8x8 matrix display draw pattern %1",
            "EITGHTTIMESEIGHTMATIRXDISPLAY_DRAWPATTERN_TOOLTIP": "Click the 8x8 grid to design a complete pattern. Replaces the previous pattern and refreshes the display automatically.",
            "EITGHTTIMESEIGHTMATIRXDISPLAY_COLOR_BLACK": "black",
            "EITGHTTIMESEIGHTMATIRXDISPLAY_COLOR_RED": "red",
            "EITGHTTIMESEIGHTMATIRXDISPLAY_DRAWLINE": "8x8 martix display draw line x0: %1 y0: %2, x1: %3 y1: %4 color %5",
            "EITGHTTIMESEIGHTMATIRXDISPLAY_DRAWPIXEL": "8x8 martix display draw pixel x: %1 y: %2 color %3",
            "EITGHTTIMESEIGHTMATIRXDISPLAY_FILL": "8x8 martix display fill color %1",
            "EITGHTTIMESEIGHTMATIRXDISPLAY_INIT": "init 8x8 matrix display pin CS %1",
            "EITGHTTIMESEIGHTMATIRXDISPLAY_INIT_WITH_PINS": "init 8x8 matrix display pin DIN %1 CS %2 CLK %3",
            "EITGHTTIMESEIGHTMATIRXDISPLAY_INIT_TOOLTIP": "Arduino Nano uses software SPI on the selected DIN, CS and CLK pins.",
            "EITGHTTIMESEIGHTMATIRXDISPLAY_REFRESH": "refresh the display of 8x8 martix display",
            "EITGHTTIMESEIGHTMATIRXDISPLAY_SETBRIGHTNESS": "8x8 martix display set brightness %1",
            "EITGHTTIMESEIGHTMATIRXDISPLAY_SETROTATION": "8x8 martix display set rotation %1",
            "EITGHTTIMESEIGHTMATIRXDISPLAY_SHOWCHAR": "8x8 martix display show char %1 color %2",
            "EITGHTTIMESEIGHTMATIRXDISPLAY_SHOWNUMBER": "8x8 martix display show number %1 color %2"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["ru"],
        {
            "EITGHTTIMESEIGHTMATIRXDISPLAY_CATEGORY": "Матричный дисплей 8x8",
            "EITGHTTIMESEIGHTMATIRXDISPLAY_DRAWPATTERN": "На матрице 8x8 нарисовать узор %1",
            "EITGHTTIMESEIGHTMATIRXDISPLAY_DRAWPATTERN_TOOLTIP": "Нажмите на сетку 8x8, чтобы создать узор. Заменяет предыдущий узор и автоматически обновляет дисплей.",
            "EITGHTTIMESEIGHTMATIRXDISPLAY_COLOR_BLACK": "Черный",
            "EITGHTTIMESEIGHTMATIRXDISPLAY_COLOR_RED": "Красный",
            "EITGHTTIMESEIGHTMATIRXDISPLAY_DRAWLINE": "На матрице 8x8 нарисовать линию из (x0: %1 y0: %2) в (x1: %3 y1: %4) цвет %5",
            "EITGHTTIMESEIGHTMATIRXDISPLAY_DRAWPIXEL": "На матричном дисплее 8x8 нарисовать пиксель в точке (x: %1 y: %2) цвет %3",
            "EITGHTTIMESEIGHTMATIRXDISPLAY_FILL": "Матричный дисплей 8х8 залить цветом %1",
            "EITGHTTIMESEIGHTMATIRXDISPLAY_INIT": "инициализировать матричный дисплей 8x8 пин CS %1",
            "EITGHTTIMESEIGHTMATIRXDISPLAY_INIT_WITH_PINS": "инициализировать матричный дисплей 8x8, пины DIN %1 CS %2 CLK %3",
            "EITGHTTIMESEIGHTMATIRXDISPLAY_INIT_TOOLTIP": "Arduino Nano использует программный SPI на выбранных пинах DIN, CS и CLK.",
            "EITGHTTIMESEIGHTMATIRXDISPLAY_REFRESH": "Обновить матричный дисплей 8х8",
            "EITGHTTIMESEIGHTMATIRXDISPLAY_SETBRIGHTNESS": "Установить яркость матричного дисплея 8х8 в %1",
            "EITGHTTIMESEIGHTMATIRXDISPLAY_SETROTATION": "Установить вращение матричного дисплея 8х8 в %1",
            "EITGHTTIMESEIGHTMATIRXDISPLAY_SHOWCHAR": "На матричном дисплее 8x8 отобразить символ %1 цвет %2",
            "EITGHTTIMESEIGHTMATIRXDISPLAY_SHOWNUMBER": "На матричном дисплее 8x8 отобразить число %1 цвет %2"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-cn"],
        {
            "EITGHTTIMESEIGHTMATIRXDISPLAY_CATEGORY": "8x8点阵屏",
            "EITGHTTIMESEIGHTMATIRXDISPLAY_DRAWPATTERN": "8x8点阵屏绘制图案 %1",
            "EITGHTTIMESEIGHTMATIRXDISPLAY_DRAWPATTERN_TOOLTIP": "点击8x8格子设计完整图案。自动替换上一个图案并刷新显示，无需另外添加刷新积木。",
            "EITGHTTIMESEIGHTMATIRXDISPLAY_COLOR_BLACK": "黑色",
            "EITGHTTIMESEIGHTMATIRXDISPLAY_COLOR_RED": "红色",
            "EITGHTTIMESEIGHTMATIRXDISPLAY_DRAWLINE": "8x8点阵屏绘制直线 x0: %1 y0: %2, x1: %3 y1: %4 颜色 %5",
            "EITGHTTIMESEIGHTMATIRXDISPLAY_DRAWPIXEL": "8x8点阵屏绘制点 x: %1 y: %2 颜色 %3",
            "EITGHTTIMESEIGHTMATIRXDISPLAY_FILL": "8x8点阵屏填充颜色 %1",
            "EITGHTTIMESEIGHTMATIRXDISPLAY_INIT": "初始化8x8点阵屏引脚 CS %1",
            "EITGHTTIMESEIGHTMATIRXDISPLAY_INIT_WITH_PINS": "初始化8x8点阵屏引脚 DIN %1 CS %2 CLK %3",
            "EITGHTTIMESEIGHTMATIRXDISPLAY_INIT_TOOLTIP": "Arduino Nano 会在所选 DIN、CS 和 CLK 引脚上使用软件 SPI。",
            "EITGHTTIMESEIGHTMATIRXDISPLAY_REFRESH": "刷新8x8点阵屏显示",
            "EITGHTTIMESEIGHTMATIRXDISPLAY_SETBRIGHTNESS": "8x8点阵屏设置亮度 %1",
            "EITGHTTIMESEIGHTMATIRXDISPLAY_SETROTATION": "8x8点阵屏设置旋转 %1",
            "EITGHTTIMESEIGHTMATIRXDISPLAY_SHOWCHAR": "8x8点阵屏显示字符 %1 颜色 %2",
            "EITGHTTIMESEIGHTMATIRXDISPLAY_SHOWNUMBER": "8x8点阵屏显示数字 %1 颜色 %2"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-tw"],
        {
            "EITGHTTIMESEIGHTMATIRXDISPLAY_CATEGORY": "8x8點陣屏",
            "EITGHTTIMESEIGHTMATIRXDISPLAY_DRAWPATTERN": "8x8點陣屏繪製圖案 %1",
            "EITGHTTIMESEIGHTMATIRXDISPLAY_DRAWPATTERN_TOOLTIP": "點選8x8格子設計完整圖案。自動取代上一個圖案並刷新顯示，不必另外加入刷新積木。",
            "EITGHTTIMESEIGHTMATIRXDISPLAY_COLOR_BLACK": "黑色",
            "EITGHTTIMESEIGHTMATIRXDISPLAY_COLOR_RED": "紅色",
            "EITGHTTIMESEIGHTMATIRXDISPLAY_DRAWLINE": "8x8點陣屏繪製直線 x0: %1 y0: %2, x1: %3 y1: %4 顏色 %5",
            "EITGHTTIMESEIGHTMATIRXDISPLAY_DRAWPIXEL": "8x8點陣屏繪製點 x: %1 y: %2 顏色 %3",
            "EITGHTTIMESEIGHTMATIRXDISPLAY_FILL": "8x8點陣屏填充顏色 %1",
            "EITGHTTIMESEIGHTMATIRXDISPLAY_INIT": "初始化8x8點陣屏管腳 CS %1",
            "EITGHTTIMESEIGHTMATIRXDISPLAY_INIT_WITH_PINS": "初始化8x8點陣屏腳位 DIN %1 CS %2 CLK %3",
            "EITGHTTIMESEIGHTMATIRXDISPLAY_INIT_TOOLTIP": "Arduino Nano 會在所選 DIN、CS 和 CLK 腳位使用軟體 SPI。",
            "EITGHTTIMESEIGHTMATIRXDISPLAY_REFRESH": "刷新8x8點陣屏顯示",
            "EITGHTTIMESEIGHTMATIRXDISPLAY_SETBRIGHTNESS": "8x8點陣屏設置亮度 %1",
            "EITGHTTIMESEIGHTMATIRXDISPLAY_SETROTATION": "8x8點陣屏設置旋轉 %1",
            "EITGHTTIMESEIGHTMATIRXDISPLAY_SHOWCHAR": "8x8點陣屏顯示字符 %1 顏色 %2",
            "EITGHTTIMESEIGHTMATIRXDISPLAY_SHOWNUMBER": "8x8點陣屏顯示數字 %1 顏色 %2"
        }
    );

    return Blockly;
}

if (typeof module !== 'undefined') {
    module.exports = {getInterfaceTranslations};
}
exports = registerScratchExtensionTranslations;
exports = registerBlocksMessages;
