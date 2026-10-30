// This file was automatically generated.  Do not modify.
/* eslint-disable func-style */
/* eslint-disable require-jsdoc */
/* eslint-disable quote-props */
/* eslint-disable quotes */
/* eslint-disable dot-notation */

function getInterfaceTranslations () {
    return {
        "en": {
            "tubitv2v7rc.name": "V7RC APP",
            "tubitv2v7rc.description": "For V7RC BLE/WIFI Remote APP."
        },
        "zh-tw": {
            "tubitv2v7rc.name": "V7RC 遙控APP",
            "tubitv2v7rc.description": "透過V7RC APP使用BLE/WIFI無線控制"
        },
        "zh-cn": {
            "tubitv2v7rc.name": "V7RC 遙控APP",
            "tubitv2v7rc.description": "透过V7RC APP使用BLE/WIFI无线控制"
        }
    };
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
            "INIT_GUARD_LABEL_V7RC": "V7RC APP"
        },
        "ru": {
            "INIT_GUARD_TUBIT_REQUIRED": "Поместите блок «Инициализация TUBIT» под блоком «когда Arduino запускается».",
            "INIT_GUARD_SENSOR_REQUIRED": "Поместите блок «Инициализация: %1 %2» под блоком «когда Arduino запускается» перед блоками чтения или использования модуля.",
            "INIT_GUARD_INIT_PLACEMENT": "Поместите блок «Инициализация: %1 %2» непосредственно под блоком «когда Arduino запускается», перед циклами и условиями.",
            "INIT_GUARD_OLED_REQUIRED": "Сначала добавьте блок вывода на OLED и поместите блоки рисования внутрь него либо разместите перед ними блок очистки или обновления дисплея.",
            "INIT_GUARD_PIN_SUFFIX": "контакт %1",
            "INIT_GUARD_INVALID_ID": "Введите неотрицательный целый номер модуля.",
            "INIT_GUARD_LABEL_V7RC": "Дистанционное управление V7RC"
        },
        "zh-cn": {
            "INIT_GUARD_TUBIT_REQUIRED": "请在Arduino启动的积木底下放置\"TUBIT初始化\"积木",
            "INIT_GUARD_SENSOR_REQUIRED": "请在Arduino启动的积木底下放置\"%1%2初始化\"积木，并放在读取／使用积木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "请将\"%1%2初始化\"积木直接放在Arduino启动底下，且放在重复执行或条件判断之前。",
            "INIT_GUARD_OLED_REQUIRED": "请先放置OLED显示积木，并将绘图积木放在其内，或先放清除／更新显示积木。",
            "INIT_GUARD_PIN_SUFFIX": "引脚%1",
            "INIT_GUARD_INVALID_ID": "模组编号请输入非负整数。",
            "INIT_GUARD_LABEL_V7RC": "V7RC 遙控APP"
        },
        "zh-tw": {
            "INIT_GUARD_TUBIT_REQUIRED": "請在Arduino啟動的積木底下放置\"TUBIT初始化\"積木",
            "INIT_GUARD_SENSOR_REQUIRED": "請在Arduino啟動的積木底下放置\"%1%2初始化\"積木，並放在讀取／使用積木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "請將\"%1%2初始化\"積木直接放在Arduino啟動底下，且放在重複執行或條件判斷之前。",
            "INIT_GUARD_OLED_REQUIRED": "請先放置OLED顯示積木，並將繪圖積木放在其內，或先放清除／更新顯示積木。",
            "INIT_GUARD_PIN_SUFFIX": "腳位%1",
            "INIT_GUARD_INVALID_ID": "模組編號請輸入非負整數。",
            "INIT_GUARD_LABEL_V7RC": "V7RC 遙控APP"
        }
    };
    Object.keys(__initGuardMessages).forEach(function (locale) {
        if (!Blockly.ScratchMsgs.locales[locale]) Blockly.ScratchMsgs.locales[locale] = {};
        Object.assign(Blockly.ScratchMsgs.locales[locale], __initGuardMessages[locale]);
    });


    Object.assign(Blockly.ScratchMsgs.locales["en"],
        {
    "TUBITV2V7RC_CATEGORY": "V7RC",
    "TUBITV2V7RC_INIT":"V7RC INIT%1",
    "TUBITV2V7RC_BLE":"BLE",
    "TUBITV2V7RC_WIFI":"WIFI",
    "TUBITV2V7RC_BLESET":"V7RC BLE %1",
    "TUBITV2V7RC_WIFISET":"V7RC WIFI SSID: %1 PASSWORD: %2 CHANNEL: %3",
    "TUBITV2V7RC_CONNECT":"V7RC connect",
    "TUBITV2V7RC_READALLDATA":"read data",
    "TUBITV2V7RC_MODE":"read %1 mode ",
    "TUBITV2V7RC_READDATA":"read data %1",
    "TUBITV2V7RC_DATA1":"1",
    "TUBITV2V7RC_DATA2":"2",
    "TUBITV2V7RC_DATA3":"3",
    "TUBITV2V7RC_DATA4":"4",
    "TUBITV2V7RC_C1": "1",
    "TUBITV2V7RC_C2": "2",
    "TUBITV2V7RC_C3": "3",
    "TUBITV2V7RC_C4": "4",
    "TUBITV2V7RC_C5": "5",
    "TUBITV2V7RC_C6": "6",
    "TUBITV2V7RC_C7": "7",
    "TUBITV2V7RC_C8": "8",
    "TUBITV2V7RC_C9": "9",
    "TUBITV2V7RC_C10": "10",
    "TUBITV2V7RC_C11": "11",
    "TUBITV2V7RC_C12": "12",
    "TUBITV2V7RC_C13": "13",
    "V7RCINITSET": "Connection Mode Setting",
    "V7RCCONN": "Check Connection",
    "V7RCADVMODE": "Game ADV Mode",
    "V7RCADSET": "Advanced Features",
    "TUBITV2V7RC_DATAX": "X",
    "TUBITV2V7RC_DATAY": "Y",
    "TUBITV2V7RC_U": "Up",
    "TUBITV2V7RC_D": "Down",
    "TUBITV2V7RC_L": "Left",
    "TUBITV2V7RC_R": "Right",
    "TUBITV2V7RC_UL": "Up Left",
    "TUBITV2V7RC_DL": "Down Left",
    "TUBITV2V7RC_UR": "Up Right",
    "TUBITV2V7RC_DR": "Down Right",
    "TUBITV2V7RC_advxy": "Read left joystick %1 value",
    "TUBITV2V7RC_advbut": "Read right %1 button"

        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-cn"],
        {
            "TUBITV2V7RC_CATEGORY": "V7RC",
            "TUBITV2V7RC_INIT":"V7RC 初始化%1",
            "TUBITV2V7RC_BLE":"蓝牙",
            "TUBITV2V7RC_WIFI":"无线网络",
            "TUBITV2V7RC_BLESET":"V7RC 蓝牙 %1",
            "TUBITV2V7RC_WIFISET":"V7RC 无线网络 SSID: %1 密码: %2 频道: %3",
            "TUBITV2V7RC_CONNECT":"V7RC 连接",
            "TUBITV2V7RC_READALLDATA":"读取所有数据",
            "TUBITV2V7RC_MODE":"V7RC 读取 %1 模式",
            "TUBITV2V7RC_READDATA":"V7RC 读取数据 %1",
            "TUBITV2V7RC_DATA1":"1",
            "TUBITV2V7RC_DATA2":"2",
            "TUBITV2V7RC_DATA3":"3",
            "TUBITV2V7RC_DATA4":"4",
            "TUBITV2V7RC_C1": "1",
            "TUBITV2V7RC_C2": "2",
            "TUBITV2V7RC_C3": "3",
            "TUBITV2V7RC_C4": "4",
            "TUBITV2V7RC_C5": "5",
            "TUBITV2V7RC_C6": "6",
            "TUBITV2V7RC_C7": "7",
            "TUBITV2V7RC_C8": "8",
            "TUBITV2V7RC_C9": "9",
            "TUBITV2V7RC_C10": "10",
            "TUBITV2V7RC_C11": "11",
            "TUBITV2V7RC_C12": "12",
            "TUBITV2V7RC_C13": "13",
            "V7RCINITSET": "连接方式设定",
            "V7RCCONN": "判断是否连接",
            "V7RCADVMODE": "游戏 ADV 模式",
            "V7RCADSET": "进阶功能",
            "TUBITV2V7RC_DATAX": "X",
            "TUBITV2V7RC_DATAY": "Y",
            "TUBITV2V7RC_U": "上",
            "TUBITV2V7RC_D": "下",
            "TUBITV2V7RC_L": "左",
            "TUBITV2V7RC_R": "右",
            "TUBITV2V7RC_UL": "左上",
            "TUBITV2V7RC_DL": "左下",
            "TUBITV2V7RC_UR": "右上",
            "TUBITV2V7RC_DR": "右下",
            "TUBITV2V7RC_advxy": "读取左摇杆%1数值",
            "TUBITV2V7RC_advbut": "读取右边%1按钮"
       }
    );
    

    Object.assign(Blockly.ScratchMsgs.locales["zh-tw"],
        {
            "TUBITV2V7RC_CATEGORY": "V7RC",
            "TUBITV2V7RC_INIT":"V7RC 初始化%1",
            "TUBITV2V7RC_BLE":"藍牙 BLE",
            "TUBITV2V7RC_WIFI":"無線網路 WIFI",
            "TUBITV2V7RC_BLESET":"V7RC 設定藍牙名稱 %1",
            "TUBITV2V7RC_WIFISET":"V7RC 設定無線網路 SSID: %1 密碼: %2 頻道: %3",
            "TUBITV2V7RC_CONNECT":"V7RC 連線",
            "TUBITV2V7RC_READALLDATA":"讀取所有資料",
            "TUBITV2V7RC_MODE":"V7RC 讀取 %1 模式",
            "TUBITV2V7RC_READDATA":"V7RC 讀取資料 %1",
            "TUBITV2V7RC_DATA1":"1",
            "TUBITV2V7RC_DATA2":"2",
            "TUBITV2V7RC_DATA3":"3",
            "TUBITV2V7RC_DATA4":"4",
            "TUBITV2V7RC_C1": "1",
            "TUBITV2V7RC_C2": "2",
            "TUBITV2V7RC_C3": "3",
            "TUBITV2V7RC_C4": "4",
            "TUBITV2V7RC_C5": "5",
            "TUBITV2V7RC_C6": "6",
            "TUBITV2V7RC_C7": "7",
            "TUBITV2V7RC_C8": "8",
            "TUBITV2V7RC_C9": "9",
            "TUBITV2V7RC_C10": "10",
            "TUBITV2V7RC_C11": "11",
            "TUBITV2V7RC_C12": "12",
            "TUBITV2V7RC_C13": "13",
            "V7RCINITSET" : "連線方式設定",
            "V7RCCONN":"判斷是否連線",
            "V7RCADVMODE":" GAME ADV模式",
            "V7RCADSET":"進階功能",
            "TUBITV2V7RC_DATAX":"X",
            "TUBITV2V7RC_DATAY":"Y",
            "TUBITV2V7RC_U":"上",
            "TUBITV2V7RC_D":"下",
            "TUBITV2V7RC_L":"左",
            "TUBITV2V7RC_R":"右",
            "TUBITV2V7RC_UL":"左上",
            "TUBITV2V7RC_DL":"左下",
            "TUBITV2V7RC_UR":"右上",
            "TUBITV2V7RC_DR":"右下",
            "TUBITV2V7RC_advxy":"讀取搖桿%1數值",
            "TUBITV2V7RC_advbut":"讀取%1按鈕"

        }
    );
    

    return Blockly;
}

if (typeof module !== 'undefined') {
    module.exports = {getInterfaceTranslations};
}

exports = registerScratchExtensionTranslations;
exports = registerBlocksMessages;