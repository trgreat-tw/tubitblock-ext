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
            "tubitv2flamesensor.name": "火焰感測器",
            "tubitv2flamesensor.description": "偵測周遭的火焰"
        },
        "ru": {
            "tubitv2flamesensor.name": "火焰感測器",
            "tubitv2flamesensor.description": "偵測周遭的火焰"
        },
        "zh-cn": {
            "tubitv2flamesensor.name": "火焰感測器",
            "tubitv2flamesensor.description": "偵測周遭的火焰"
        },
        "zh-tw": {
            "tubitv2flamesensor.name": "火焰感測器",
            "tubitv2flamesensor.description": "偵測周遭的火焰"
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
            "INIT_GUARD_LABEL_FLAME": "火焰感測器"
        },
        "ru": {
            "INIT_GUARD_TUBIT_REQUIRED": "Поместите блок «Инициализация TUBIT» под блоком «когда Arduino запускается».",
            "INIT_GUARD_SENSOR_REQUIRED": "Поместите блок «Инициализация: %1 %2» под блоком «когда Arduino запускается» перед блоками чтения или использования модуля.",
            "INIT_GUARD_INIT_PLACEMENT": "Поместите блок «Инициализация: %1 %2» непосредственно под блоком «когда Arduino запускается», перед циклами и условиями.",
            "INIT_GUARD_OLED_REQUIRED": "Сначала добавьте блок вывода на OLED и поместите блоки рисования внутрь него либо разместите перед ними блок очистки или обновления дисплея.",
            "INIT_GUARD_PIN_SUFFIX": "контакт %1",
            "INIT_GUARD_INVALID_ID": "Введите неотрицательный целый номер модуля.",
            "INIT_GUARD_LABEL_FLAME": "火焰感測器"
        },
        "zh-cn": {
            "INIT_GUARD_TUBIT_REQUIRED": "请在Arduino启动的积木底下放置\"TUBIT初始化\"积木",
            "INIT_GUARD_SENSOR_REQUIRED": "请在Arduino启动的积木底下放置\"%1%2初始化\"积木，并放在读取／使用积木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "请将\"%1%2初始化\"积木直接放在Arduino启动底下，且放在重复执行或条件判断之前。",
            "INIT_GUARD_OLED_REQUIRED": "请先放置OLED显示积木，并将绘图积木放在其内，或先放清除／更新显示积木。",
            "INIT_GUARD_PIN_SUFFIX": "引脚%1",
            "INIT_GUARD_INVALID_ID": "模组编号请输入非负整数。",
            "INIT_GUARD_LABEL_FLAME": "火焰感測器"
        },
        "zh-tw": {
            "INIT_GUARD_TUBIT_REQUIRED": "請在Arduino啟動的積木底下放置\"TUBIT初始化\"積木",
            "INIT_GUARD_SENSOR_REQUIRED": "請在Arduino啟動的積木底下放置\"%1%2初始化\"積木，並放在讀取／使用積木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "請將\"%1%2初始化\"積木直接放在Arduino啟動底下，且放在重複執行或條件判斷之前。",
            "INIT_GUARD_OLED_REQUIRED": "請先放置OLED顯示積木，並將繪圖積木放在其內，或先放清除／更新顯示積木。",
            "INIT_GUARD_PIN_SUFFIX": "腳位%1",
            "INIT_GUARD_INVALID_ID": "模組編號請輸入非負整數。",
            "INIT_GUARD_LABEL_FLAME": "火焰感測器"
        }
    };
    Object.keys(__initGuardMessages).forEach(function (locale) {
        if (!Blockly.ScratchMsgs.locales[locale]) Blockly.ScratchMsgs.locales[locale] = {};
        Object.assign(Blockly.ScratchMsgs.locales[locale], __initGuardMessages[locale]);
    });

    Object.assign(Blockly.ScratchMsgs.locales["en"],
        {
            "TUBITV2FLAMESENSOR_CATEGORY": "Flame Sensor",
            "TUBITV2FLAMESENSOR_INIT": "Init flame sensor pin %1 ",
            "TUBITV2FLAMESENSOR_READ": "Read %1 flame sensor data",
            "TUBITV2_ESP32_DIGITAL_GPIO0": "0",
            "TUBITV2_ESP32_DIGITAL_GPIO1": "1",
            "TUBITV2_ESP32_DIGITAL_GPIO2": "2",
            "TUBITV2_ESP32_DIGITAL_GPIO4": "4",
            "TUBITV2_ESP32_DIGITAL_GPIO5": "5",
            "TUBITV2_ESP32_DIGITAL_GPIO12": "12",
            "TUBITV2_ESP32_DIGITAL_GPIO13": "13",
            "TUBITV2_ESP32_DIGITAL_GPIO14": "14",
            "TUBITV2_ESP32_DIGITAL_GPIO15": "15",
            "TUBITV2_ESP32_DIGITAL_GPIO16": "16",
            "TUBITV2_ESP32_DIGITAL_GPIO17": "17",
            "TUBITV2_ESP32_DIGITAL_GPIO18": "18",
            "TUBITV2_ESP32_DIGITAL_GPIO19": "19",
            "TUBITV2_ESP32_DIGITAL_GPIO20": "20",
            "TUBITV2_ESP32_DIGITAL_GPIO21": "21",
            "TUBITV2_ESP32_DIGITAL_GPIO22": "22",
            "TUBITV2_ESP32_DIGITAL_GPIO23": "23",
            "TUBITV2_ESP32_DIGITAL_GPIO24": "24",
            "TUBITV2_ESP32_DIGITAL_GPIO25": "25",
            "TUBITV2_ESP32_DIGITAL_GPIO26": "26",
            "TUBITV2_ESP32_DIGITAL_GPIO27": "27",
            "TUBITV2_ESP32_DIGITAL_GPIO32": "32",
            "TUBITV2_ESP32_DIGITAL_GPIO33": "33"
        }
    );
    
    Object.assign(Blockly.ScratchMsgs.locales["ru"],
        {
            "TUBITV2FLAMESENSOR_CATEGORY": "Датчик пламени",
            "TUBITV2FLAMESENSOR_INIT": "Инициализация датчика пламени pin %1",
            "TUBITV2FLAMESENSOR_READ": "Чтение данных с датчика пламени%1",
            "TUBITV2_ESP32_DIGITAL_GPIO0": "0",
            "TUBITV2_ESP32_DIGITAL_GPIO1": "1",
            "TUBITV2_ESP32_DIGITAL_GPIO2": "2",
            "TUBITV2_ESP32_DIGITAL_GPIO4": "4",
            "TUBITV2_ESP32_DIGITAL_GPIO5": "5",
            "TUBITV2_ESP32_DIGITAL_GPIO12": "12",
            "TUBITV2_ESP32_DIGITAL_GPIO13": "13",
            "TUBITV2_ESP32_DIGITAL_GPIO14": "14",
            "TUBITV2_ESP32_DIGITAL_GPIO15": "15",
            "TUBITV2_ESP32_DIGITAL_GPIO16": "16",
            "TUBITV2_ESP32_DIGITAL_GPIO17": "17",
            "TUBITV2_ESP32_DIGITAL_GPIO18": "18",
            "TUBITV2_ESP32_DIGITAL_GPIO19": "19",
            "TUBITV2_ESP32_DIGITAL_GPIO20": "20",
            "TUBITV2_ESP32_DIGITAL_GPIO21": "21",
            "TUBITV2_ESP32_DIGITAL_GPIO22": "22",
            "TUBITV2_ESP32_DIGITAL_GPIO23": "23",
            "TUBITV2_ESP32_DIGITAL_GPIO24": "24",
            "TUBITV2_ESP32_DIGITAL_GPIO25": "25",
            "TUBITV2_ESP32_DIGITAL_GPIO26": "26",
            "TUBITV2_ESP32_DIGITAL_GPIO27": "27",
            "TUBITV2_ESP32_DIGITAL_GPIO32": "32",
            "TUBITV2_ESP32_DIGITAL_GPIO33": "33"
        }
    );
    
    Object.assign(Blockly.ScratchMsgs.locales["zh-cn"],
        {
            "TUBITV2FLAMESENSOR_CATEGORY": "火焰感测器",
            "TUBITV2FLAMESENSOR_INIT": "设置火焰感测器引脚 %1 ",
            "TUBITV2FLAMESENSOR_READ": "读取%1火焰感测器数据",
            "TUBITV2_ESP32_DIGITAL_GPIO0": "0",
            "TUBITV2_ESP32_DIGITAL_GPIO1": "1",
            "TUBITV2_ESP32_DIGITAL_GPIO2": "2",
            "TUBITV2_ESP32_DIGITAL_GPIO4": "4",
            "TUBITV2_ESP32_DIGITAL_GPIO5": "5",
            "TUBITV2_ESP32_DIGITAL_GPIO12": "12",
            "TUBITV2_ESP32_DIGITAL_GPIO13": "13",
            "TUBITV2_ESP32_DIGITAL_GPIO14": "14",
            "TUBITV2_ESP32_DIGITAL_GPIO15": "15",
            "TUBITV2_ESP32_DIGITAL_GPIO16": "16",
            "TUBITV2_ESP32_DIGITAL_GPIO17": "17",
            "TUBITV2_ESP32_DIGITAL_GPIO18": "18",
            "TUBITV2_ESP32_DIGITAL_GPIO19": "19",
            "TUBITV2_ESP32_DIGITAL_GPIO20": "20",
            "TUBITV2_ESP32_DIGITAL_GPIO21": "21",
            "TUBITV2_ESP32_DIGITAL_GPIO22": "22",
            "TUBITV2_ESP32_DIGITAL_GPIO23": "23",
            "TUBITV2_ESP32_DIGITAL_GPIO24": "24",
            "TUBITV2_ESP32_DIGITAL_GPIO25": "25",
            "TUBITV2_ESP32_DIGITAL_GPIO26": "26",
            "TUBITV2_ESP32_DIGITAL_GPIO27": "27",
            "TUBITV2_ESP32_DIGITAL_GPIO32": "32",
            "TUBITV2_ESP32_DIGITAL_GPIO33": "33"
        }
    );
    
    Object.assign(Blockly.ScratchMsgs.locales["zh-tw"],
        {
            "TUBITV2FLAMESENSOR_CATEGORY": "火焰感測器",
            "TUBITV2FLAMESENSOR_INIT": "初始化火焰感測器腳位 %1",
            "TUBITV2FLAMESENSOR_READ": "讀取%1火焰感測器資料",
            "TUBITV2_ESP32_DIGITAL_GPIO0": "0",
            "TUBITV2_ESP32_DIGITAL_GPIO1": "1",
            "TUBITV2_ESP32_DIGITAL_GPIO2": "2",
            "TUBITV2_ESP32_DIGITAL_GPIO4": "4",
            "TUBITV2_ESP32_DIGITAL_GPIO5": "5",
            "TUBITV2_ESP32_DIGITAL_GPIO12": "12",
            "TUBITV2_ESP32_DIGITAL_GPIO13": "13",
            "TUBITV2_ESP32_DIGITAL_GPIO14": "14",
            "TUBITV2_ESP32_DIGITAL_GPIO15": "15",
            "TUBITV2_ESP32_DIGITAL_GPIO16": "16",
            "TUBITV2_ESP32_DIGITAL_GPIO17": "17",
            "TUBITV2_ESP32_DIGITAL_GPIO18": "18",
            "TUBITV2_ESP32_DIGITAL_GPIO19": "19",
            "TUBITV2_ESP32_DIGITAL_GPIO20": "20",
            "TUBITV2_ESP32_DIGITAL_GPIO21": "21",
            "TUBITV2_ESP32_DIGITAL_GPIO22": "22",
            "TUBITV2_ESP32_DIGITAL_GPIO23": "23",
            "TUBITV2_ESP32_DIGITAL_GPIO24": "24",
            "TUBITV2_ESP32_DIGITAL_GPIO25": "25",
            "TUBITV2_ESP32_DIGITAL_GPIO26": "26",
            "TUBITV2_ESP32_DIGITAL_GPIO27": "27",
            "TUBITV2_ESP32_DIGITAL_GPIO32": "32",
            "TUBITV2_ESP32_DIGITAL_GPIO33": "33"
        }
    );
    

    return Blockly;
}

if (typeof module !== 'undefined') {
    module.exports = {getInterfaceTranslations};
}
exports = registerScratchExtensionTranslations;
exports = registerBlocksMessages;
