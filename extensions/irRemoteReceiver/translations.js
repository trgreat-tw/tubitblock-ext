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
            "irRemoteReceiver.name": "IR Remote Receiver",
            "irRemoteReceiver.description": "Receiving and decoding data in infrared carrier."
        },
        "ru": {
            "irRemoteReceiver.name": "ИК-пульт дистанционного управления",
            "irRemoteReceiver.description": "Прием и декодирование данных в инфракрасном носителе."
        },
        "zh-cn": {
            "irRemoteReceiver.name": "红外遥控接收器",
            "irRemoteReceiver.description": "接收并解码红外载波中的数据。"
        },
        "zh-tw": {
            "irRemoteReceiver.name": "紅外遙控接收器",
            "irRemoteReceiver.description": "接收並解碼紅外載波中的數據。"
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
            "INIT_GUARD_LABEL_IRREMOTERECEIVER": "IR Remote Receiver"
        },
        "ru": {
            "INIT_GUARD_TUBIT_REQUIRED": "Поместите блок «Инициализация TUBIT» под блоком «когда Arduino запускается».",
            "INIT_GUARD_SENSOR_REQUIRED": "Поместите блок «Инициализация: %1 %2» под блоком «когда Arduino запускается» перед блоками чтения или использования модуля.",
            "INIT_GUARD_INIT_PLACEMENT": "Поместите блок «Инициализация: %1 %2» непосредственно под блоком «когда Arduino запускается», перед циклами и условиями.",
            "INIT_GUARD_OLED_REQUIRED": "Сначала добавьте блок вывода на OLED и поместите блоки рисования внутрь него либо разместите перед ними блок очистки или обновления дисплея.",
            "INIT_GUARD_PIN_SUFFIX": "контакт %1",
            "INIT_GUARD_INVALID_ID": "Введите неотрицательный целый номер модуля.",
            "INIT_GUARD_LABEL_IRREMOTERECEIVER": "ИК-пульт дистанционного управления"
        },
        "zh-cn": {
            "INIT_GUARD_TUBIT_REQUIRED": "请在Arduino启动的积木底下放置\"TUBIT初始化\"积木",
            "INIT_GUARD_SENSOR_REQUIRED": "请在Arduino启动的积木底下放置\"%1%2初始化\"积木，并放在读取／使用积木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "请将\"%1%2初始化\"积木直接放在Arduino启动底下，且放在重复执行或条件判断之前。",
            "INIT_GUARD_OLED_REQUIRED": "请先放置OLED显示积木，并将绘图积木放在其内，或先放清除／更新显示积木。",
            "INIT_GUARD_PIN_SUFFIX": "引脚%1",
            "INIT_GUARD_INVALID_ID": "模组编号请输入非负整数。",
            "INIT_GUARD_LABEL_IRREMOTERECEIVER": "红外遥控接收器"
        },
        "zh-tw": {
            "INIT_GUARD_TUBIT_REQUIRED": "請在Arduino啟動的積木底下放置\"TUBIT初始化\"積木",
            "INIT_GUARD_SENSOR_REQUIRED": "請在Arduino啟動的積木底下放置\"%1%2初始化\"積木，並放在讀取／使用積木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "請將\"%1%2初始化\"積木直接放在Arduino啟動底下，且放在重複執行或條件判斷之前。",
            "INIT_GUARD_OLED_REQUIRED": "請先放置OLED顯示積木，並將繪圖積木放在其內，或先放清除／更新顯示積木。",
            "INIT_GUARD_PIN_SUFFIX": "腳位%1",
            "INIT_GUARD_INVALID_ID": "模組編號請輸入非負整數。",
            "INIT_GUARD_LABEL_IRREMOTERECEIVER": "紅外遙控接收器"
        }
    };
    Object.keys(__initGuardMessages).forEach(function (locale) {
        if (!Blockly.ScratchMsgs.locales[locale]) Blockly.ScratchMsgs.locales[locale] = {};
        Object.assign(Blockly.ScratchMsgs.locales[locale], __initGuardMessages[locale]);
    });

    Object.assign(Blockly.ScratchMsgs.locales["en"],
        {
            "IRREMOTERECEIVER_CATEGORY": "IR Remote Receiver",
            "IRREMOTERECEIVER_DATAAVAILABLE": "IR remote receiver data available?",
            "IRREMOTERECEIVER_INIT": "init IR remote receiver pin %1",
            "IRREMOTERECEIVER_RECIVEDCOMMAND": "IR remote recived command",
            "IRREMOTERECEIVER_RESUME": "IR remote resume recive"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["ru"],
        {
            "IRREMOTERECEIVER_CATEGORY": "ИК-пульт",
            "IRREMOTERECEIVER_DATAAVAILABLE": "Доступны данные ИК-пульта?",
            "IRREMOTERECEIVER_INIT": "Инициализировать ИК-пульт на пине %1",
            "IRREMOTERECEIVER_RECIVEDCOMMAND": "Полученная команда с ИК-пульта",
            "IRREMOTERECEIVER_RESUME": "Получена команда с ИК-пульта"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-cn"],
        {
            "IRREMOTERECEIVER_CATEGORY": "红外遥控接收器",
            "IRREMOTERECEIVER_DATAAVAILABLE": "红外遥控接收器数据可用？",
            "IRREMOTERECEIVER_INIT": "初始化红外遥控接收器引脚 %1",
            "IRREMOTERECEIVER_RECIVEDCOMMAND": "红外遥控接收器收到的指令",
            "IRREMOTERECEIVER_RESUME": "红外遥控接收器继续接收"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-tw"],
        {
            "IRREMOTERECEIVER_CATEGORY": "紅外遙控接收器",
            "IRREMOTERECEIVER_DATAAVAILABLE": "紅外遙控接收器數據可用？",
            "IRREMOTERECEIVER_INIT": "初始化紅外遙控接收器管腳 %1",
            "IRREMOTERECEIVER_RECIVEDCOMMAND": "紅外遙控接收器收到的指令",
            "IRREMOTERECEIVER_RESUME": "紅外遙控接收器繼續接收"
        }
    );

    return Blockly;
}

if (typeof module !== 'undefined') {
    module.exports = {getInterfaceTranslations};
}
exports = registerScratchExtensionTranslations;
exports = registerBlocksMessages;
