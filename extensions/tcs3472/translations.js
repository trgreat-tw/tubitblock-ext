// This file was automatically generated.  Do not modify.
/* eslint-disable func-style */
/* eslint-disable require-jsdoc */
/* eslint-disable quote-props */
/* eslint-disable quotes */
/* eslint-disable dot-notation */

function getInterfaceTranslations () {
    return {
        "en": {
            "tubitv2tcs3472.name": "TCS3472 RGB Sensor",
            "tubitv2tcs3472.description": "RGB Sensor."
        },
        "zh-cn": {
            "tubitv2tcs3472.name": "TCS3472 RGB顏色感測模組",
            "tubitv2tcs3472.description": "RGB Sensor."
        },
        "zh-tw": {
            "tubitv2tcs3472.name": "TCS3472 RGB顏色感測模組",
            "tubitv2tcs3472.description": "RGB顏色感測模組.."
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
            "INIT_GUARD_LABEL_TCS3472": "TCS3472 RGB Sensor"
        },
        "ru": {
            "INIT_GUARD_TUBIT_REQUIRED": "Поместите блок «Инициализация TUBIT» под блоком «когда Arduino запускается».",
            "INIT_GUARD_SENSOR_REQUIRED": "Поместите блок «Инициализация: %1 %2» под блоком «когда Arduino запускается» перед блоками чтения или использования модуля.",
            "INIT_GUARD_INIT_PLACEMENT": "Поместите блок «Инициализация: %1 %2» непосредственно под блоком «когда Arduino запускается», перед циклами и условиями.",
            "INIT_GUARD_OLED_REQUIRED": "Сначала добавьте блок вывода на OLED и поместите блоки рисования внутрь него либо разместите перед ними блок очистки или обновления дисплея.",
            "INIT_GUARD_PIN_SUFFIX": "контакт %1",
            "INIT_GUARD_INVALID_ID": "Введите неотрицательный целый номер модуля.",
            "INIT_GUARD_LABEL_TCS3472": "Датчик цвета TCS3472"
        },
        "zh-cn": {
            "INIT_GUARD_TUBIT_REQUIRED": "请在Arduino启动的积木底下放置\"TUBIT初始化\"积木",
            "INIT_GUARD_SENSOR_REQUIRED": "请在Arduino启动的积木底下放置\"%1%2初始化\"积木，并放在读取／使用积木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "请将\"%1%2初始化\"积木直接放在Arduino启动底下，且放在重复执行或条件判断之前。",
            "INIT_GUARD_OLED_REQUIRED": "请先放置OLED显示积木，并将绘图积木放在其内，或先放清除／更新显示积木。",
            "INIT_GUARD_PIN_SUFFIX": "引脚%1",
            "INIT_GUARD_INVALID_ID": "模组编号请输入非负整数。",
            "INIT_GUARD_LABEL_TCS3472": "TCS3472 RGB顏色感測模組"
        },
        "zh-tw": {
            "INIT_GUARD_TUBIT_REQUIRED": "請在Arduino啟動的積木底下放置\"TUBIT初始化\"積木",
            "INIT_GUARD_SENSOR_REQUIRED": "請在Arduino啟動的積木底下放置\"%1%2初始化\"積木，並放在讀取／使用積木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "請將\"%1%2初始化\"積木直接放在Arduino啟動底下，且放在重複執行或條件判斷之前。",
            "INIT_GUARD_OLED_REQUIRED": "請先放置OLED顯示積木，並將繪圖積木放在其內，或先放清除／更新顯示積木。",
            "INIT_GUARD_PIN_SUFFIX": "腳位%1",
            "INIT_GUARD_INVALID_ID": "模組編號請輸入非負整數。",
            "INIT_GUARD_LABEL_TCS3472": "TCS3472 RGB顏色感測模組"
        }
    };
    Object.keys(__initGuardMessages).forEach(function (locale) {
        if (!Blockly.ScratchMsgs.locales[locale]) Blockly.ScratchMsgs.locales[locale] = {};
        Object.assign(Blockly.ScratchMsgs.locales[locale], __initGuardMessages[locale]);
    });


    Object.assign(Blockly.ScratchMsgs.locales["en"],
        {
        "TUBITV2TCS3472_CATEGORY":"TCS3472 RGB Sensor",
	    "TUBITV2TCS3472_SET":"TCS3472 init , led pin %1 ",
        "TUBITV2TCS3472_READCOLOR":"TCS3472 get data",
        "TUBITV2TCS3472_READRGB":"get %1 data",
        "TUBITV2TCS3472_SETLIGHT":"set led brightness %1",
        "TUBITV2TCS3472_READLUX":"TCS3472 get lux value",
        "TUBITV2TCS3472_23":"23",
        "TUBITV2TCS3472_15":"15",
        "TUBITV2TCS3472_12":"12",
        "TUBITV2TCS3472_5":"5",
        "TUBITV2TCS3472_2":"2",
        "TUBITV2TCS3472_0":"0",
        "TUBITV2TCS3472_33":"33",
        "TUBITV2TCS3472_32":"32",
        "TUBITV2TCS3472_R":"R",
        "TUBITV2TCS3472_G":"G",
        "TUBITV2TCS3472_B":"B"

        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-cn"],
        {
            "TUBITV2TCS3472_CATEGORY":"TCS3472 RGB顏色感測模組",
            "TUBITV2TCS3472_SET":"初始化 TCS3472，LED 引脚 %1",
            "TUBITV2TCS3472_READCOLOR":"获取 TCS3472 数据",
            "TUBITV2TCS3472_READRGB":"获取 %1 数据",
            "TUBITV2TCS3472_SETLIGHT":"设置 LED 亮度 %1",
            "TUBITV2TCS3472_READLUX":"获取 TCS3472 光照值",
            "TUBITV2TCS3472_23":"23",
            "TUBITV2TCS3472_15":"15",
            "TUBITV2TCS3472_12":"12",
            "TUBITV2TCS3472_5":"5",
            "TUBITV2TCS3472_2":"2",
            "TUBITV2TCS3472_0":"0",
            "TUBITV2TCS3472_33":"33",
            "TUBITV2TCS3472_32":"32",
            "TUBITV2TCS3472_R":"R",
            "TUBITV2TCS3472_G":"G",
            "TUBITV2TCS3472_B":"B"
		
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-tw"],
        {
            "TUBITV2TCS3472_CATEGORY": "TCS3472 RGB顏色感測模組",
            "TUBITV2TCS3472_SET": "TCS3472初始化 , LED 腳位 %1",
            "TUBITV2TCS3472_READCOLOR": "讀取 TCS3472 RGB資料",
            "TUBITV2TCS3472_READRGB": "讀取 %1",
            "TUBITV2TCS3472_SETLIGHT": "設定 LED 亮度 %1",
            "TUBITV2TCS3472_READLUX": "讀取 TCS3472 光照值",
            "TUBITV2TCS3472_23": "23",
            "TUBITV2TCS3472_15": "15",
            "TUBITV2TCS3472_12": "12",
            "TUBITV2TCS3472_5": "5",
            "TUBITV2TCS3472_2": "2",
            "TUBITV2TCS3472_0": "0",
            "TUBITV2TCS3472_33": "33",
            "TUBITV2TCS3472_32": "32",
            "TUBITV2TCS3472_R": "R",
            "TUBITV2TCS3472_G": "G",
            "TUBITV2TCS3472_B": "B"
        }
    );

    return Blockly;
}

if (typeof module !== 'undefined') {
    module.exports = {getInterfaceTranslations};
}

exports = registerScratchExtensionTranslations;
exports = registerBlocksMessages;