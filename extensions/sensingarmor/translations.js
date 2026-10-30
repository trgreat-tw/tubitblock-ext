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
            "sensorarmor.name": "Sensing Armor",
            "sensorarmor.description": "Detect gas levels, sensing touch force, sensing table tennis shooting"
        },
        "ru": {
            "sensorarmor.name": "Sensing Armor",
            "sensorarmor.description": "Обнаружение уровня газа, определение силы нажатия, обнаружение выстрелов шарика для настольного тенниса"
        },
        "zh-cn": {
            "sensorarmor.name": "传感装甲",
            "sensorarmor.description": "检测触摸力度，检测乒乓球发射"
        },
        "zh-tw": {
            "sensorarmor.name": "感測裝甲",
            "sensorarmor.description": "偵測觸碰力道、偵測乒乓球射擊"
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
            "INIT_GUARD_LABEL_SENSINGARMOR": "Sensing Armor"
        },
        "ru": {
            "INIT_GUARD_TUBIT_REQUIRED": "Поместите блок «Инициализация TUBIT» под блоком «когда Arduino запускается».",
            "INIT_GUARD_SENSOR_REQUIRED": "Поместите блок «Инициализация: %1 %2» под блоком «когда Arduino запускается» перед блоками чтения или использования модуля.",
            "INIT_GUARD_INIT_PLACEMENT": "Поместите блок «Инициализация: %1 %2» непосредственно под блоком «когда Arduino запускается», перед циклами и условиями.",
            "INIT_GUARD_OLED_REQUIRED": "Сначала добавьте блок вывода на OLED и поместите блоки рисования внутрь него либо разместите перед ними блок очистки или обновления дисплея.",
            "INIT_GUARD_PIN_SUFFIX": "контакт %1",
            "INIT_GUARD_INVALID_ID": "Введите неотрицательный целый номер модуля.",
            "INIT_GUARD_LABEL_SENSINGARMOR": "Sensing Armor"
        },
        "zh-cn": {
            "INIT_GUARD_TUBIT_REQUIRED": "请在Arduino启动的积木底下放置\"TUBIT初始化\"积木",
            "INIT_GUARD_SENSOR_REQUIRED": "请在Arduino启动的积木底下放置\"%1%2初始化\"积木，并放在读取／使用积木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "请将\"%1%2初始化\"积木直接放在Arduino启动底下，且放在重复执行或条件判断之前。",
            "INIT_GUARD_OLED_REQUIRED": "请先放置OLED显示积木，并将绘图积木放在其内，或先放清除／更新显示积木。",
            "INIT_GUARD_PIN_SUFFIX": "引脚%1",
            "INIT_GUARD_INVALID_ID": "模组编号请输入非负整数。",
            "INIT_GUARD_LABEL_SENSINGARMOR": "传感装甲"
        },
        "zh-tw": {
            "INIT_GUARD_TUBIT_REQUIRED": "請在Arduino啟動的積木底下放置\"TUBIT初始化\"積木",
            "INIT_GUARD_SENSOR_REQUIRED": "請在Arduino啟動的積木底下放置\"%1%2初始化\"積木，並放在讀取／使用積木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "請將\"%1%2初始化\"積木直接放在Arduino啟動底下，且放在重複執行或條件判斷之前。",
            "INIT_GUARD_OLED_REQUIRED": "請先放置OLED顯示積木，並將繪圖積木放在其內，或先放清除／更新顯示積木。",
            "INIT_GUARD_PIN_SUFFIX": "腳位%1",
            "INIT_GUARD_INVALID_ID": "模組編號請輸入非負整數。",
            "INIT_GUARD_LABEL_SENSINGARMOR": "感測裝甲"
        }
    };
    Object.keys(__initGuardMessages).forEach(function (locale) {
        if (!Blockly.ScratchMsgs.locales[locale]) Blockly.ScratchMsgs.locales[locale] = {};
        Object.assign(Blockly.ScratchMsgs.locales[locale], __initGuardMessages[locale]);
    });

    Object.assign(Blockly.ScratchMsgs.locales["en"],
        {
            "SENSORARMOR_CATEGORY": "Sensing Armor",
            "SENSINGARMOR_INIT": "Sensing Armor Init pin %1",
            "SENSINGARMOR_READ": "Read %1 Sensing Armor",
            "SENSINGARMOR_SETRANGE": "Set %1 Sensing Armor range %2",
            "SENSINGARMOR_READPPSTRIKE": "%1 Sensing Armor hit?"
        }
    );
    
    Object.assign(Blockly.ScratchMsgs.locales["ru"],
        {
            "SENSORARMOR_CATEGORY": "Sensing Armor",
            "SENSINGARMOR_INIT": "Инициализация Sensing Armor пин %1",
            "SENSINGARMOR_READ": "Считать %1 Sensing Armor",
            "SENSINGARMOR_SETRANGE": "Установить %1 диапазон Sensing Armor %2",
            "SENSINGARMOR_READPPSTRIKE": "%1 удар по Sensing Armor?"
        }
    );
    
    Object.assign(Blockly.ScratchMsgs.locales["zh-cn"],
        {
            "SENSORARMOR_CATEGORY": "传感装甲",
            "SENSINGARMOR_INIT": "初始化传感装甲引脚 %1",
            "SENSINGARMOR_READ": "读取%1传感装甲",
            "SENSINGARMOR_SETRANGE": "设置%1传感装甲范围%2",
            "SENSINGARMOR_READPPSTRIKE": "%1传感装甲被击中？"
        }
    );
    
    Object.assign(Blockly.ScratchMsgs.locales["zh-tw"],
        {
            "SENSORARMOR_CATEGORY": "感測裝甲",
            "SENSINGARMOR_INIT": "初始化感測裝甲腳位 %1",
            "SENSINGARMOR_READ": "讀取%1感測裝甲數值",
            "SENSINGARMOR_SETRANGE": "設定%1感測裝甲範圍%2",
            "SENSINGARMOR_READPPSTRIKE": "%1感測裝甲被擊中？"
        }
    );
    
    return Blockly;
}

if (typeof module !== 'undefined') {
    module.exports = {getInterfaceTranslations};
}
exports = registerScratchExtensionTranslations;
exports = registerBlocksMessages;
