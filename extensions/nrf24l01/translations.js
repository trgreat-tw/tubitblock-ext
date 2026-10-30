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
            "nrf24l01.description": "2.4G RF transceiver module."
        },
        "ru": {
            "nrf24l01.description": "Модуль приемопередатчика 2,4 ГГц."
        },
        "zh-cn": {
            "nrf24l01.description": "2.4G 无线射频传输模块。"
        },
        "zh-tw": {
            "nrf24l01.description": "2.4G 無線射頻傳輸模塊。"
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
            "INIT_GUARD_LABEL_NRF24L01": "NRF24L01 Radio"
        },
        "ru": {
            "INIT_GUARD_TUBIT_REQUIRED": "Поместите блок «Инициализация TUBIT» под блоком «когда Arduino запускается».",
            "INIT_GUARD_SENSOR_REQUIRED": "Поместите блок «Инициализация: %1 %2» под блоком «когда Arduino запускается» перед блоками чтения или использования модуля.",
            "INIT_GUARD_INIT_PLACEMENT": "Поместите блок «Инициализация: %1 %2» непосредственно под блоком «когда Arduino запускается», перед циклами и условиями.",
            "INIT_GUARD_OLED_REQUIRED": "Сначала добавьте блок вывода на OLED и поместите блоки рисования внутрь него либо разместите перед ними блок очистки или обновления дисплея.",
            "INIT_GUARD_PIN_SUFFIX": "контакт %1",
            "INIT_GUARD_INVALID_ID": "Введите неотрицательный целый номер модуля.",
            "INIT_GUARD_LABEL_NRF24L01": "Радиомодуль NRF24L01"
        },
        "zh-cn": {
            "INIT_GUARD_TUBIT_REQUIRED": "请在Arduino启动的积木底下放置\"TUBIT初始化\"积木",
            "INIT_GUARD_SENSOR_REQUIRED": "请在Arduino启动的积木底下放置\"%1%2初始化\"积木，并放在读取／使用积木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "请将\"%1%2初始化\"积木直接放在Arduino启动底下，且放在重复执行或条件判断之前。",
            "INIT_GUARD_OLED_REQUIRED": "请先放置OLED显示积木，并将绘图积木放在其内，或先放清除／更新显示积木。",
            "INIT_GUARD_PIN_SUFFIX": "引脚%1",
            "INIT_GUARD_INVALID_ID": "模组编号请输入非负整数。",
            "INIT_GUARD_LABEL_NRF24L01": "NRF24L01无线模块"
        },
        "zh-tw": {
            "INIT_GUARD_TUBIT_REQUIRED": "請在Arduino啟動的積木底下放置\"TUBIT初始化\"積木",
            "INIT_GUARD_SENSOR_REQUIRED": "請在Arduino啟動的積木底下放置\"%1%2初始化\"積木，並放在讀取／使用積木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "請將\"%1%2初始化\"積木直接放在Arduino啟動底下，且放在重複執行或條件判斷之前。",
            "INIT_GUARD_OLED_REQUIRED": "請先放置OLED顯示積木，並將繪圖積木放在其內，或先放清除／更新顯示積木。",
            "INIT_GUARD_PIN_SUFFIX": "腳位%1",
            "INIT_GUARD_INVALID_ID": "模組編號請輸入非負整數。",
            "INIT_GUARD_LABEL_NRF24L01": "NRF24L01無線模組"
        }
    };
    Object.keys(__initGuardMessages).forEach(function (locale) {
        if (!Blockly.ScratchMsgs.locales[locale]) Blockly.ScratchMsgs.locales[locale] = {};
        Object.assign(Blockly.ScratchMsgs.locales[locale], __initGuardMessages[locale]);
    });

    Object.assign(Blockly.ScratchMsgs.locales["en"],
        {
            "NRF24L01_CATEGORY": "NRF24l01",
            "NRF24L01_HASDATA": "nrf24l01 received data?",
            "NRF24L01_INIT": "init nrf24l01 pin CE %1 CSN %2 id %3",
            "NRF24L01_PARSENUMBER": "nrf24l01 parse number",
            "NRF24L01_PARSESTRING": "nrf24l01 parse string",
            "NRF24L01_PARSEVALUE": "nrf24l01 parse value %1",
            "NRF24L01_READDATA": "nrf24l01 read data",
            "NRF24L01_SENDNUMBER": "nrf24l01 send number %1 to id %2",
            "NRF24L01_SENDSTRING": "nrf24l01 send string %1 to id %2",
            "NRF24L01_SENDVALUE": "nrf24l01 send value %1 = %2 to id %3",
            "NRF24L01_VALUEAVAILABLE": "nrf24l01 value %1 available?"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["ru"],
        {
            "NRF24L01_CATEGORY": "NRF24l01",
            "NRF24L01_HASDATA": "nrf24l01 получены данные?",
            "NRF24L01_INIT": "Инициализировать nrf24l01 на пинах CE %1 CSN %2 id %3",
            "NRF24L01_PARSENUMBER": "nrf24l01 парсить номер",
            "NRF24L01_PARSESTRING": "nrf24l01 парсить строку",
            "NRF24L01_PARSEVALUE": "nrf24l01 парсить значение %1",
            "NRF24L01_READDATA": "nrf24l01  читать данные",
            "NRF24L01_SENDNUMBER": "nrf24l01 отправить номер %1 на id %2",
            "NRF24L01_SENDSTRING": "nrf24l01 отправить строку %1 to id %2",
            "NRF24L01_SENDVALUE": "nrf24l01 отправить значение %1 = %2 на id %3",
            "NRF24L01_VALUEAVAILABLE": "nrf24l01 значение %1 доступно?"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-cn"],
        {
            "NRF24L01_CATEGORY": "NRF24l01",
            "NRF24L01_HASDATA": "nrf24l01 接收到数据？",
            "NRF24L01_INIT": "初始化 nrf24l01 引脚 CE %1 CSN %2 id %3",
            "NRF24L01_PARSENUMBER": "nrf24l01 解析数字",
            "NRF24L01_PARSESTRING": "nrf24l01 解析字符串",
            "NRF24L01_PARSEVALUE": "nrf24l01 解析数值 %1",
            "NRF24L01_READDATA": "nrf24l01 读取数据",
            "NRF24L01_SENDNUMBER": "nrf24l01 发送数字 %1 到 id %2",
            "NRF24L01_SENDSTRING": "nrf24l01 发送字符串 %1 到 id %2",
            "NRF24L01_SENDVALUE": "nrf24l01 发送数值 %1 = %2 到 id %3",
            "NRF24L01_VALUEAVAILABLE": "nrf24l01 数值 %1 可用？"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-tw"],
        {
            "NRF24L01_CATEGORY": "NRF24l01",
            "NRF24L01_HASDATA": "nrf24l01 接收到數據？",
            "NRF24L01_INIT": "初始化 nrf24l01 管腳 CE %1 CSN %2 id %3",
            "NRF24L01_PARSENUMBER": "nrf24l01 解析數字",
            "NRF24L01_PARSESTRING": "nrf24l01 解析字符串",
            "NRF24L01_PARSEVALUE": "nrf24l01 解析數值 %1",
            "NRF24L01_READDATA": "nrf24l01 讀取數據",
            "NRF24L01_SENDNUMBER": "nrf24l01 發送數字 %1 到 id %2",
            "NRF24L01_SENDSTRING": "nrf24l01 發送字符串 %1 到 id %2",
            "NRF24L01_SENDVALUE": "nrf24l01 發送數值 %1 = %2 到 id %3",
            "NRF24L01_VALUEAVAILABLE": "nrf24l01 數值 %1 可用？"
        }
    );

    return Blockly;
}

if (typeof module !== 'undefined') {
    module.exports = {getInterfaceTranslations};
}
exports = registerScratchExtensionTranslations;
exports = registerBlocksMessages;
