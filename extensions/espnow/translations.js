// This file was automatically generated.  Do not modify.
/* eslint-disable func-style */
/* eslint-disable require-jsdoc */
/* eslint-disable quote-props */
/* eslint-disable quotes */
/* eslint-disable dot-notation */

function getInterfaceTranslations () {
        return {
            "en": {
                "tubitv2_espnow.name": "ESP-NOW",
                "tubitv2_espnow.description": "Communicate with other ESP32 devices"
            },
            "zh-cn": {
                "tubitv2_espnow.name": "ESP-NOW",
                "tubitv2_espnow.description": "与其他 ESP32 通信"
            },
            "zh-tw": {
                "tubitv2_espnow.name": "ESP-NOW",
                "tubitv2_espnow.description": "與其他 EPS32 通訊"
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
            "INIT_GUARD_LABEL_ESPNOW": "ESP-NOW"
        },
        "ru": {
            "INIT_GUARD_TUBIT_REQUIRED": "Поместите блок «Инициализация TUBIT» под блоком «когда Arduino запускается».",
            "INIT_GUARD_SENSOR_REQUIRED": "Поместите блок «Инициализация: %1 %2» под блоком «когда Arduino запускается» перед блоками чтения или использования модуля.",
            "INIT_GUARD_INIT_PLACEMENT": "Поместите блок «Инициализация: %1 %2» непосредственно под блоком «когда Arduino запускается», перед циклами и условиями.",
            "INIT_GUARD_OLED_REQUIRED": "Сначала добавьте блок вывода на OLED и поместите блоки рисования внутрь него либо разместите перед ними блок очистки или обновления дисплея.",
            "INIT_GUARD_PIN_SUFFIX": "контакт %1",
            "INIT_GUARD_INVALID_ID": "Введите неотрицательный целый номер модуля.",
            "INIT_GUARD_LABEL_ESPNOW": "ESP-NOW"
        },
        "zh-cn": {
            "INIT_GUARD_TUBIT_REQUIRED": "请在Arduino启动的积木底下放置\"TUBIT初始化\"积木",
            "INIT_GUARD_SENSOR_REQUIRED": "请在Arduino启动的积木底下放置\"%1%2初始化\"积木，并放在读取／使用积木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "请将\"%1%2初始化\"积木直接放在Arduino启动底下，且放在重复执行或条件判断之前。",
            "INIT_GUARD_OLED_REQUIRED": "请先放置OLED显示积木，并将绘图积木放在其内，或先放清除／更新显示积木。",
            "INIT_GUARD_PIN_SUFFIX": "引脚%1",
            "INIT_GUARD_INVALID_ID": "模组编号请输入非负整数。",
            "INIT_GUARD_LABEL_ESPNOW": "ESP-NOW"
        },
        "zh-tw": {
            "INIT_GUARD_TUBIT_REQUIRED": "請在Arduino啟動的積木底下放置\"TUBIT初始化\"積木",
            "INIT_GUARD_SENSOR_REQUIRED": "請在Arduino啟動的積木底下放置\"%1%2初始化\"積木，並放在讀取／使用積木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "請將\"%1%2初始化\"積木直接放在Arduino啟動底下，且放在重複執行或條件判斷之前。",
            "INIT_GUARD_OLED_REQUIRED": "請先放置OLED顯示積木，並將繪圖積木放在其內，或先放清除／更新顯示積木。",
            "INIT_GUARD_PIN_SUFFIX": "腳位%1",
            "INIT_GUARD_INVALID_ID": "模組編號請輸入非負整數。",
            "INIT_GUARD_LABEL_ESPNOW": "ESP-NOW"
        }
    };
    Object.keys(__initGuardMessages).forEach(function (locale) {
        if (!Blockly.ScratchMsgs.locales[locale]) Blockly.ScratchMsgs.locales[locale] = {};
        Object.assign(Blockly.ScratchMsgs.locales[locale], __initGuardMessages[locale]);
    });


    Object.assign(Blockly.ScratchMsgs.locales["en"],
        {
            "TUBITV2_ESPNOW_CATEGORY": "ESP-NOW",
            "TUBITV2_ESPNOW_INIT": "Initialize ESP-NOW",
            "TUBITV2_ESPNOW_DEVICE_MAC_ADDR": "This device's MAC address",
            "TUBITV2_ESPNOW_ADD_PEER": "Add to peer list: MAC %1, Channel %2",
            "TUBITV2_ESPNOW_SEND": "Send to MAC %1: Data %2",
            "TUBITV2_ESPNOW_BROADCAST": "Broadcast data to all devices: %1",
            "TUBITV2_ESPNOW_ON_RECV": "on packet received",
            "TUBITV2_ESPNOW_ON_SEND": "on packet sent",
            "TUBITV2_ESPNOW_GET_RECV_DATA": "Received data"
        }
    );
    

    Object.assign(Blockly.ScratchMsgs.locales["zh-cn"],
        {
            "TUBITV2_ESPNOW_CATEGORY": "ESP-NOW",
            "TUBITV2_ESPNOW_INIT": "ESP-NOW 初始化",
            "TUBITV2_ESPNOW_DEVICE_MAC_ADDR": "本设备的 MAC 地址",
            "TUBITV2_ESPNOW_ADD_PEER": "添加通信列表中的 MAC : %1 频道 : %2",
            "TUBITV2_ESPNOW_SEND": "发送到 MAC : %1 数据 : %2",
            "TUBITV2_ESPNOW_BROADCAST": "广播数据给所有设备 : %1",
            "TUBITV2_ESPNOW_ON_RECV": "收到数据包时执行",
            "TUBITV2_ESPNOW_ON_SEND": "发送数据包时执行",
            "TUBITV2_ESPNOW_GET_RECV_DATA": "接收到的数据"
        }
    );
    

    Object.assign(Blockly.ScratchMsgs.locales["zh-tw"],
        {
            "TUBITV2_ESPNOW_CATEGORY": "ESP-NOW",
            "TUBITV2_ESPNOW_INIT": "ESP-NOW 初始化",
            "TUBITV2_ESPNOW_DEVICE_MAC_ADDR": "此裝置的 MAC 地址",
            "TUBITV2_ESPNOW_ADD_PEER": "在通訊清單中加入 MAC : %1 頻道 : %2",
            "TUBITV2_ESPNOW_SEND": "傳送到 MAC : %1 資料 : %2",
            "TUBITV2_ESPNOW_BROADCAST": "向所有設備廣播資料 : %1",
            "TUBITV2_ESPNOW_ON_RECV": "收到封包時執行",
            "TUBITV2_ESPNOW_ON_SEND": "傳送封包時執行",
            "TUBITV2_ESPNOW_GET_RECV_DATA": "接收到的資料"
        }
    );

    return Blockly;
}

if (typeof module !== 'undefined') {
    module.exports = {getInterfaceTranslations};
}

exports = registerScratchExtensionTranslations;
exports = registerBlocksMessages;