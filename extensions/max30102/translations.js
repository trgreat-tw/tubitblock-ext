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
            "max30102.name": "MAX30102 Sensor",
            "max30102.description": "Blood oxygen and heart rate detection module based on MAX30102."
        },
        "ru": {
            "max30102.name": "Датчик MAX30102 ",
            "max30102.description": "Модуль определения кислорода в крови и пульса на базе MAX30102."
        },
        "zh-cn": {
            "max30102.name": "MAX30102 传感器",
            "max30102.description": "基于 MAX30102 的血氧心跳探测模块。"
        },
        "zh-tw": {
            "max30102.name": "MAX30102 傳感器",
            "max30102.description": "基於 MAX30102 的血氧心跳探測模塊。"
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
            "INIT_GUARD_LABEL_MAX30102": "MAX30102 Sensor"
        },
        "ru": {
            "INIT_GUARD_TUBIT_REQUIRED": "Поместите блок «Инициализация TUBIT» под блоком «когда Arduino запускается».",
            "INIT_GUARD_SENSOR_REQUIRED": "Поместите блок «Инициализация: %1 %2» под блоком «когда Arduino запускается» перед блоками чтения или использования модуля.",
            "INIT_GUARD_INIT_PLACEMENT": "Поместите блок «Инициализация: %1 %2» непосредственно под блоком «когда Arduino запускается», перед циклами и условиями.",
            "INIT_GUARD_OLED_REQUIRED": "Сначала добавьте блок вывода на OLED и поместите блоки рисования внутрь него либо разместите перед ними блок очистки или обновления дисплея.",
            "INIT_GUARD_PIN_SUFFIX": "контакт %1",
            "INIT_GUARD_INVALID_ID": "Введите неотрицательный целый номер модуля.",
            "INIT_GUARD_LABEL_MAX30102": "Датчик MAX30102"
        },
        "zh-cn": {
            "INIT_GUARD_TUBIT_REQUIRED": "请在Arduino启动的积木底下放置\"TUBIT初始化\"积木",
            "INIT_GUARD_SENSOR_REQUIRED": "请在Arduino启动的积木底下放置\"%1%2初始化\"积木，并放在读取／使用积木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "请将\"%1%2初始化\"积木直接放在Arduino启动底下，且放在重复执行或条件判断之前。",
            "INIT_GUARD_OLED_REQUIRED": "请先放置OLED显示积木，并将绘图积木放在其内，或先放清除／更新显示积木。",
            "INIT_GUARD_PIN_SUFFIX": "引脚%1",
            "INIT_GUARD_INVALID_ID": "模组编号请输入非负整数。",
            "INIT_GUARD_LABEL_MAX30102": "MAX30102 传感器"
        },
        "zh-tw": {
            "INIT_GUARD_TUBIT_REQUIRED": "請在Arduino啟動的積木底下放置\"TUBIT初始化\"積木",
            "INIT_GUARD_SENSOR_REQUIRED": "請在Arduino啟動的積木底下放置\"%1%2初始化\"積木，並放在讀取／使用積木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "請將\"%1%2初始化\"積木直接放在Arduino啟動底下，且放在重複執行或條件判斷之前。",
            "INIT_GUARD_OLED_REQUIRED": "請先放置OLED顯示積木，並將繪圖積木放在其內，或先放清除／更新顯示積木。",
            "INIT_GUARD_PIN_SUFFIX": "腳位%1",
            "INIT_GUARD_INVALID_ID": "模組編號請輸入非負整數。",
            "INIT_GUARD_LABEL_MAX30102": "MAX30102 傳感器"
        }
    };
    Object.keys(__initGuardMessages).forEach(function (locale) {
        if (!Blockly.ScratchMsgs.locales[locale]) Blockly.ScratchMsgs.locales[locale] = {};
        Object.assign(Blockly.ScratchMsgs.locales[locale], __initGuardMessages[locale]);
    });

    Object.assign(Blockly.ScratchMsgs.locales["en"],
        {
            "MAX30102_CATEGORY": "MAX30102",
            "MAX30102_GETDATA": "max30102 get date",
            "MAX30102_HEARTBEAT": "max30102 heart beat value per minite",
            "MAX30102_INIT": "init max30102",
            "MAX30102_IRVALUE": "max30102 IR value",
            "MAX30102_ISTOUCHED": "max30102 is touched?"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["ru"],
        {
            "MAX30102_CATEGORY": "MAX30102",
            "MAX30102_GETDATA": "получить дату с max30102",
            "MAX30102_HEARTBEAT": "max30102 количество ударов сердца в минуту",
            "MAX30102_INIT": "инициализировать max30102",
            "MAX30102_IRVALUE": "max30102 значение IR",
            "MAX30102_ISTOUCHED": "коснулся max30102?"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-cn"],
        {
            "MAX30102_CATEGORY": "MAX30102",
            "MAX30102_GETDATA": "max30102 获取数据",
            "MAX30102_HEARTBEAT": "max30102 每分钟心跳数",
            "MAX30102_INIT": "初始化 max30102",
            "MAX30102_IRVALUE": "max30102 IR 数值",
            "MAX30102_ISTOUCHED": "max30102 被触碰?"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-tw"],
        {
            "MAX30102_CATEGORY": "MAX30102",
            "MAX30102_GETDATA": "max30102 獲取數據",
            "MAX30102_HEARTBEAT": "max30102 每分鐘心跳數",
            "MAX30102_INIT": "初始化 max30102",
            "MAX30102_IRVALUE": "max30102 IR 數值",
            "MAX30102_ISTOUCHED": "max30102 被觸碰?"
        }
    );

    return Blockly;
}

if (typeof module !== 'undefined') {
    module.exports = {getInterfaceTranslations};
}
exports = registerScratchExtensionTranslations;
exports = registerBlocksMessages;
