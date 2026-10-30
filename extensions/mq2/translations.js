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
            "tubitv2mq2.name": "MQ2 Sensor",
            "tubitv2mq2.description": "Detect gas levels"
        },
        "ru": {
            "tubitv2mq2.name": "Датчик MQ2",
            "tubitv2mq2.description": "Обнаружение уровня газа"
        },
        "zh-cn": {
            "tubitv2mq2.name": "MQ2传感器",
            "tubitv2mq2.description": "检测气体水平"
        },
        "zh-tw": {
            "tubitv2mq2.name": "MQ2感測器",
            "tubitv2mq2.description": "偵測氣體濃度"
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
            "INIT_GUARD_LABEL_MQ2": "MQ2 Sensor"
        },
        "ru": {
            "INIT_GUARD_TUBIT_REQUIRED": "Поместите блок «Инициализация TUBIT» под блоком «когда Arduino запускается».",
            "INIT_GUARD_SENSOR_REQUIRED": "Поместите блок «Инициализация: %1 %2» под блоком «когда Arduino запускается» перед блоками чтения или использования модуля.",
            "INIT_GUARD_INIT_PLACEMENT": "Поместите блок «Инициализация: %1 %2» непосредственно под блоком «когда Arduino запускается», перед циклами и условиями.",
            "INIT_GUARD_OLED_REQUIRED": "Сначала добавьте блок вывода на OLED и поместите блоки рисования внутрь него либо разместите перед ними блок очистки или обновления дисплея.",
            "INIT_GUARD_PIN_SUFFIX": "контакт %1",
            "INIT_GUARD_INVALID_ID": "Введите неотрицательный целый номер модуля.",
            "INIT_GUARD_LABEL_MQ2": "Датчик MQ2"
        },
        "zh-cn": {
            "INIT_GUARD_TUBIT_REQUIRED": "请在Arduino启动的积木底下放置\"TUBIT初始化\"积木",
            "INIT_GUARD_SENSOR_REQUIRED": "请在Arduino启动的积木底下放置\"%1%2初始化\"积木，并放在读取／使用积木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "请将\"%1%2初始化\"积木直接放在Arduino启动底下，且放在重复执行或条件判断之前。",
            "INIT_GUARD_OLED_REQUIRED": "请先放置OLED显示积木，并将绘图积木放在其内，或先放清除／更新显示积木。",
            "INIT_GUARD_PIN_SUFFIX": "引脚%1",
            "INIT_GUARD_INVALID_ID": "模组编号请输入非负整数。",
            "INIT_GUARD_LABEL_MQ2": "MQ2传感器"
        },
        "zh-tw": {
            "INIT_GUARD_TUBIT_REQUIRED": "請在Arduino啟動的積木底下放置\"TUBIT初始化\"積木",
            "INIT_GUARD_SENSOR_REQUIRED": "請在Arduino啟動的積木底下放置\"%1%2初始化\"積木，並放在讀取／使用積木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "請將\"%1%2初始化\"積木直接放在Arduino啟動底下，且放在重複執行或條件判斷之前。",
            "INIT_GUARD_OLED_REQUIRED": "請先放置OLED顯示積木，並將繪圖積木放在其內，或先放清除／更新顯示積木。",
            "INIT_GUARD_PIN_SUFFIX": "腳位%1",
            "INIT_GUARD_INVALID_ID": "模組編號請輸入非負整數。",
            "INIT_GUARD_LABEL_MQ2": "MQ2感測器"
        }
    };
    Object.keys(__initGuardMessages).forEach(function (locale) {
        if (!Blockly.ScratchMsgs.locales[locale]) Blockly.ScratchMsgs.locales[locale] = {};
        Object.assign(Blockly.ScratchMsgs.locales[locale], __initGuardMessages[locale]);
    });

    Object.assign(Blockly.ScratchMsgs.locales["en"],
        {
            "TUBITV2MQ2_CATEGORY": "MQ2 Sensor",
            "TUBITV2MQ2_INIT": "Set MQ2 sensor pin %1",
            "TUBITV2MQ2_READ": "Read %1 MQ2 sensor %2 signal",
            "TUBITV2MQ2_TYPED": "Digital",
            "TUBITV2MQ2_TYPEA": "Analog"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["ru"],
        {
            "TUBITV2MQ2_CATEGORY": "Датчик MQ2",
            "TUBITV2MQ2_INIT": "Установить пин датчика MQ2 %1",
            "TUBITV2MQ2_READ": "Считать %1 сигнал датчика MQ2 %2",
            "TUBITV2MQ2_TYPED": "Цифровой",
            "TUBITV2MQ2_TYPEA": "Аналоговый"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-cn"],
        {
            "TUBITV2MQ2_CATEGORY": "MQ2传感器",
            "TUBITV2MQ2_INIT": "设置MQ2传感器引脚 %1",
            "TUBITV2MQ2_READ": "读取%1 MQ2传感器 %2信号",
            "TUBITV2MQ2_TYPED": "数字",
            "TUBITV2MQ2_TYPEA": "模拟"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-tw"],
        {
            "TUBITV2MQ2_CATEGORY": "MQ2感測器",
            "TUBITV2MQ2_INIT": "設定MQ2感測器腳位 %1",
            "TUBITV2MQ2_READ": "讀取%1 MQ2感測器 %2訊號",
            "TUBITV2MQ2_TYPED": "數位",
            "TUBITV2MQ2_TYPEA": "類比"
        }
    );

    return Blockly;
}

if (typeof module !== 'undefined') {
    module.exports = {getInterfaceTranslations};
}
exports = registerScratchExtensionTranslations;
exports = registerBlocksMessages;
