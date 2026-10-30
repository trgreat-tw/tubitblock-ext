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
            "apds9960.description": "Proximity, Light, RGB, and Gesture Sensor which uses an I2C interface."
        },
        "ru": {
            "apds9960.description": "Датчик приближения, света, RGB и жестов, использующий интерфейс I2C."
        },
        "zh-cn": {
            "apds9960.description": "使用 I2C 接口的接近、灯光、RGB和手势传感器。"
        },
        "zh-tw": {
            "apds9960.description": "使用 I2C 接口的接近、燈光、RGB和手勢傳感器。"
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
            "INIT_GUARD_LABEL_APDS9960": "APDS9960 Gesture Sensor"
        },
        "ru": {
            "INIT_GUARD_TUBIT_REQUIRED": "Поместите блок «Инициализация TUBIT» под блоком «когда Arduino запускается».",
            "INIT_GUARD_SENSOR_REQUIRED": "Поместите блок «Инициализация: %1 %2» под блоком «когда Arduino запускается» перед блоками чтения или использования модуля.",
            "INIT_GUARD_INIT_PLACEMENT": "Поместите блок «Инициализация: %1 %2» непосредственно под блоком «когда Arduino запускается», перед циклами и условиями.",
            "INIT_GUARD_OLED_REQUIRED": "Сначала добавьте блок вывода на OLED и поместите блоки рисования внутрь него либо разместите перед ними блок очистки или обновления дисплея.",
            "INIT_GUARD_PIN_SUFFIX": "контакт %1",
            "INIT_GUARD_INVALID_ID": "Введите неотрицательный целый номер модуля.",
            "INIT_GUARD_LABEL_APDS9960": "Датчик жестов APDS9960"
        },
        "zh-cn": {
            "INIT_GUARD_TUBIT_REQUIRED": "请在Arduino启动的积木底下放置\"TUBIT初始化\"积木",
            "INIT_GUARD_SENSOR_REQUIRED": "请在Arduino启动的积木底下放置\"%1%2初始化\"积木，并放在读取／使用积木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "请将\"%1%2初始化\"积木直接放在Arduino启动底下，且放在重复执行或条件判断之前。",
            "INIT_GUARD_OLED_REQUIRED": "请先放置OLED显示积木，并将绘图积木放在其内，或先放清除／更新显示积木。",
            "INIT_GUARD_PIN_SUFFIX": "引脚%1",
            "INIT_GUARD_INVALID_ID": "模组编号请输入非负整数。",
            "INIT_GUARD_LABEL_APDS9960": "APDS9960手势传感器"
        },
        "zh-tw": {
            "INIT_GUARD_TUBIT_REQUIRED": "請在Arduino啟動的積木底下放置\"TUBIT初始化\"積木",
            "INIT_GUARD_SENSOR_REQUIRED": "請在Arduino啟動的積木底下放置\"%1%2初始化\"積木，並放在讀取／使用積木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "請將\"%1%2初始化\"積木直接放在Arduino啟動底下，且放在重複執行或條件判斷之前。",
            "INIT_GUARD_OLED_REQUIRED": "請先放置OLED顯示積木，並將繪圖積木放在其內，或先放清除／更新顯示積木。",
            "INIT_GUARD_PIN_SUFFIX": "腳位%1",
            "INIT_GUARD_INVALID_ID": "模組編號請輸入非負整數。",
            "INIT_GUARD_LABEL_APDS9960": "APDS9960手勢感測器"
        }
    };
    Object.keys(__initGuardMessages).forEach(function (locale) {
        if (!Blockly.ScratchMsgs.locales[locale]) Blockly.ScratchMsgs.locales[locale] = {};
        Object.assign(Blockly.ScratchMsgs.locales[locale], __initGuardMessages[locale]);
    });

    Object.assign(Blockly.ScratchMsgs.locales["en"],
        {
            "APDS9960_CATEGORY": "APDS9960",
            "APDS9960_GESTURE_DOWN": "down",
            "APDS9960_GESTURE_LEFT": "left",
            "APDS9960_GESTURE_RIGHT": "right",
            "APDS9960_GESTURE_UP": "up",
            "APDS9960_INIT": "init apds9960",
            "APDS9960_ISGESTURE": "apds9960 read gesture %1?",
            "APDS9960_ISGESTUREAVAILABLE": "apds9960 gesture data ready?",
            "APDS9960_ISPROXIMITYAVAILABLE": "apds9960 color data available?",
            "APDS9960_READGESTURE": "apds9960 read gesture",
            "APDS9960_READPROXIMITY": "apds9960 read proximity"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["ru"],
        {
            "APDS9960_CATEGORY": "APDS9960",
            "APDS9960_GESTURE_DOWN": "вниз",
            "APDS9960_GESTURE_LEFT": "налево",
            "APDS9960_GESTURE_RIGHT": "направо",
            "APDS9960_GESTURE_UP": "вверх",
            "APDS9960_INIT": "инициализировать apds9960",
            "APDS9960_ISGESTURE": "apds9960 прочитать жест %1",
            "APDS9960_ISGESTUREAVAILABLE": "Данные датчика жестов apds9960 готовы?",
            "APDS9960_ISPROXIMITYAVAILABLE": "apds9960 доступны данные о цвете?",
            "APDS9960_READGESTURE": "apds9960 прочитать жест",
            "APDS9960_READPROXIMITY": "apds9960 определить расстояние"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-cn"],
        {
            "APDS9960_CATEGORY": "APDS9960",
            "APDS9960_GESTURE_DOWN": "下",
            "APDS9960_GESTURE_LEFT": "左",
            "APDS9960_GESTURE_RIGHT": "右",
            "APDS9960_GESTURE_UP": "上",
            "APDS9960_INIT": "初始化 apds9960",
            "APDS9960_ISGESTURE": "apds9960 读取到手势 %1？",
            "APDS9960_ISGESTUREAVAILABLE": "apds9960 手势数据准备就绪？",
            "APDS9960_ISPROXIMITYAVAILABLE": "apds9960 接近值可用？",
            "APDS9960_READGESTURE": "apds9960 读取手势",
            "APDS9960_READPROXIMITY": "apds9960 读取接近值"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-tw"],
        {
            "APDS9960_CATEGORY": "APDS9960",
            "APDS9960_GESTURE_DOWN": "下",
            "APDS9960_GESTURE_LEFT": "左",
            "APDS9960_GESTURE_RIGHT": "右",
            "APDS9960_GESTURE_UP": "上",
            "APDS9960_INIT": "初始化 apds9960",
            "APDS9960_ISGESTURE": "apds9960 讀取到手勢 %1？",
            "APDS9960_ISGESTUREAVAILABLE": "apds9960 手勢數據準備就緒？",
            "APDS9960_ISPROXIMITYAVAILABLE": "apds9960 接近值可用？",
            "APDS9960_READGESTURE": "apds9960 讀取手勢",
            "APDS9960_READPROXIMITY": "apds9960 讀取接近值"
        }
    );

    return Blockly;
}

if (typeof module !== 'undefined') {
    module.exports = {getInterfaceTranslations};
}
exports = registerScratchExtensionTranslations;
exports = registerBlocksMessages;
