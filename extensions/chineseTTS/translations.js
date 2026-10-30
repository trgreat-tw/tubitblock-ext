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
            "chineseTTS.name": "Chinese TTS",
            "chineseTTS.description": "Text to speech module based on SYN6288, support Chinese and English letters and numbers."
        },
        "ru": {
            "chineseTTS.name": "Перевод текста в речь на китайском",
            "chineseTTS.description": "Модуль преобразования текста в речь на основе SYN6288, поддерживает китайские и английские буквы и цифры."
        },
        "zh-cn": {
            "chineseTTS.name": "中文 TTS",
            "chineseTTS.description": "基于 SYN6288 的语音合成模块, 支持中文、英文字母以及数字。"
        },
        "zh-tw": {
            "chineseTTS.name": "中文 TTS",
            "chineseTTS.description": "基於 SYN6288 的語音合成模塊, 支持中文、英文字母以及數字。"
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
            "INIT_GUARD_LABEL_CHINESETTS": "Chinese TTS"
        },
        "ru": {
            "INIT_GUARD_TUBIT_REQUIRED": "Поместите блок «Инициализация TUBIT» под блоком «когда Arduino запускается».",
            "INIT_GUARD_SENSOR_REQUIRED": "Поместите блок «Инициализация: %1 %2» под блоком «когда Arduino запускается» перед блоками чтения или использования модуля.",
            "INIT_GUARD_INIT_PLACEMENT": "Поместите блок «Инициализация: %1 %2» непосредственно под блоком «когда Arduino запускается», перед циклами и условиями.",
            "INIT_GUARD_OLED_REQUIRED": "Сначала добавьте блок вывода на OLED и поместите блоки рисования внутрь него либо разместите перед ними блок очистки или обновления дисплея.",
            "INIT_GUARD_PIN_SUFFIX": "контакт %1",
            "INIT_GUARD_INVALID_ID": "Введите неотрицательный целый номер модуля.",
            "INIT_GUARD_LABEL_CHINESETTS": "Перевод текста в речь на китайском"
        },
        "zh-cn": {
            "INIT_GUARD_TUBIT_REQUIRED": "请在Arduino启动的积木底下放置\"TUBIT初始化\"积木",
            "INIT_GUARD_SENSOR_REQUIRED": "请在Arduino启动的积木底下放置\"%1%2初始化\"积木，并放在读取／使用积木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "请将\"%1%2初始化\"积木直接放在Arduino启动底下，且放在重复执行或条件判断之前。",
            "INIT_GUARD_OLED_REQUIRED": "请先放置OLED显示积木，并将绘图积木放在其内，或先放清除／更新显示积木。",
            "INIT_GUARD_PIN_SUFFIX": "引脚%1",
            "INIT_GUARD_INVALID_ID": "模组编号请输入非负整数。",
            "INIT_GUARD_LABEL_CHINESETTS": "中文 TTS"
        },
        "zh-tw": {
            "INIT_GUARD_TUBIT_REQUIRED": "請在Arduino啟動的積木底下放置\"TUBIT初始化\"積木",
            "INIT_GUARD_SENSOR_REQUIRED": "請在Arduino啟動的積木底下放置\"%1%2初始化\"積木，並放在讀取／使用積木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "請將\"%1%2初始化\"積木直接放在Arduino啟動底下，且放在重複執行或條件判斷之前。",
            "INIT_GUARD_OLED_REQUIRED": "請先放置OLED顯示積木，並將繪圖積木放在其內，或先放清除／更新顯示積木。",
            "INIT_GUARD_PIN_SUFFIX": "腳位%1",
            "INIT_GUARD_INVALID_ID": "模組編號請輸入非負整數。",
            "INIT_GUARD_LABEL_CHINESETTS": "中文 TTS"
        }
    };
    Object.keys(__initGuardMessages).forEach(function (locale) {
        if (!Blockly.ScratchMsgs.locales[locale]) Blockly.ScratchMsgs.locales[locale] = {};
        Object.assign(Blockly.ScratchMsgs.locales[locale], __initGuardMessages[locale]);
    });

    Object.assign(Blockly.ScratchMsgs.locales["en"],
        {
            "CHINESETTS_CATEGORY": "Chinese TTS",
            "CHINESETTS_INIT": "init chinese TTS module pin RX %1 TX %2",
            "CHINESETTS_PLAYSOUND": "chinese TTS module play sound %1",
            "CHINESETTS_PLAYSOUNDUNTILLFINISH": "chinese TTS module play sound %1 untill finish",
            "CHINESETTS_SAY": "chinese TTS module say %1",
            "CHINESETTS_SAYUNTILLFINISH": "chinese TTS module say %1 untill finish",
            "CHINESETTS_SETPOWERONPROMPT": "chinese TTS module set sound of power on prompt %1",
            "CHINESETTS_SETSPEECHRATE": "chinese TTS module set speech rate %1",
            "CHINESETTS_SETVOLUME": "chinese TTS module set volume %1",
            "CHINESETTS_STATE_OFF": "off"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["ru"],
        {
            "CHINESETTS_CATEGORY": "Модуль текст-в-речь на китайском",
            "CHINESETTS_INIT": "Инициализировать модуль текст-в-речь на китайском пины RX %1 TX %2",
            "CHINESETTS_PLAYSOUND": "Модуль текст-в-речь на китайском проиграет звук %1",
            "CHINESETTS_PLAYSOUNDUNTILLFINISH": "Модуль текст-в-речь на китайском проиграет звук %1 до конца",
            "CHINESETTS_SAY": "Модуль текст-в-речь на китайском скажет %1",
            "CHINESETTS_SAYUNTILLFINISH": "Модуль текст-в-речь на китайском скажет %1 до конка",
            "CHINESETTS_SETPOWERONPROMPT": "Модулю текст-в-речь на китайском установить звук включения подсказки %1",
            "CHINESETTS_SETSPEECHRATE": "Модулю текст-в-речь на китайском установить скорость речи %1",
            "CHINESETTS_SETVOLUME": "Модулю текст-в-речь на китайском установить громкость %1",
            "CHINESETTS_STATE_OFF": "Выключить"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-cn"],
        {
            "CHINESETTS_CATEGORY": "中文 TTS",
            "CHINESETTS_INIT": "初始化中文 TTS 模块引脚 RX %1 TX %2",
            "CHINESETTS_PLAYSOUND": "中文 TTS 模块播放音效 %1",
            "CHINESETTS_PLAYSOUNDUNTILLFINISH": "中文 TTS 模块播放音效 %1 直到完成",
            "CHINESETTS_SAY": "中文 TTS 模块说 %1",
            "CHINESETTS_SAYUNTILLFINISH": "中文 TTS 模块说 %1 直到完成",
            "CHINESETTS_SETPOWERONPROMPT": "中文 TTS 模块设置上电提示音效 %1",
            "CHINESETTS_SETSPEECHRATE": "中文 TTS 模块设置语速 %1",
            "CHINESETTS_SETVOLUME": "中文 TTS 模块设置音量 %1",
            "CHINESETTS_STATE_OFF": "关闭"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-tw"],
        {
            "CHINESETTS_CATEGORY": "中文 TTS",
            "CHINESETTS_INIT": "初始化中文 TTS 模塊管腳 RX %1 TX %2",
            "CHINESETTS_PLAYSOUND": "中文 TTS 模塊播放音效 %1",
            "CHINESETTS_PLAYSOUNDUNTILLFINISH": "中文 TTS 模塊播放音效 %1 直到完成",
            "CHINESETTS_SAY": "中文 TTS 模塊說 %1",
            "CHINESETTS_SAYUNTILLFINISH": "中文 TTS 模塊說 %1 直到完成",
            "CHINESETTS_SETPOWERONPROMPT": "中文 TTS 模塊設置上電提示音效 %1",
            "CHINESETTS_SETSPEECHRATE": "中文 TTS 模塊設置語速 %1",
            "CHINESETTS_SETVOLUME": "中文 TTS 模塊設置音量 %1",
            "CHINESETTS_STATE_OFF": "關閉"
        }
    );

    return Blockly;
}

if (typeof module !== 'undefined') {
    module.exports = {getInterfaceTranslations};
}
exports = registerScratchExtensionTranslations;
exports = registerBlocksMessages;
