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
            "softwareSerial.name": "Software Serial",
            "softwareSerial.description": "Allow serial communication on other digital pins of the Arduino."
        },
        "ru": {
            "softwareSerial.name": "Серийный номер программного обеспечения",
            "softwareSerial.description": "Разрешите последовательную связь на других цифровых выводах Arduino."
        },
        "zh-cn": {
            "softwareSerial.name": "软件串口",
            "softwareSerial.description": "使 Arduino 可以使用其他数字口进行串口通信。"
        },
        "zh-tw": {
            "softwareSerial.name": "軟件串口",
            "softwareSerial.description": "使 Arduino 可以使用其他數字口進行串口通信。"
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
            "INIT_GUARD_LABEL_SOFTWARESERIALPORT": "Software Serial"
        },
        "ru": {
            "INIT_GUARD_TUBIT_REQUIRED": "Поместите блок «Инициализация TUBIT» под блоком «когда Arduino запускается».",
            "INIT_GUARD_SENSOR_REQUIRED": "Поместите блок «Инициализация: %1 %2» под блоком «когда Arduino запускается» перед блоками чтения или использования модуля.",
            "INIT_GUARD_INIT_PLACEMENT": "Поместите блок «Инициализация: %1 %2» непосредственно под блоком «когда Arduino запускается», перед циклами и условиями.",
            "INIT_GUARD_OLED_REQUIRED": "Сначала добавьте блок вывода на OLED и поместите блоки рисования внутрь него либо разместите перед ними блок очистки или обновления дисплея.",
            "INIT_GUARD_PIN_SUFFIX": "контакт %1",
            "INIT_GUARD_INVALID_ID": "Введите неотрицательный целый номер модуля.",
            "INIT_GUARD_LABEL_SOFTWARESERIALPORT": "Серийный номер программного обеспечения"
        },
        "zh-cn": {
            "INIT_GUARD_TUBIT_REQUIRED": "请在Arduino启动的积木底下放置\"TUBIT初始化\"积木",
            "INIT_GUARD_SENSOR_REQUIRED": "请在Arduino启动的积木底下放置\"%1%2初始化\"积木，并放在读取／使用积木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "请将\"%1%2初始化\"积木直接放在Arduino启动底下，且放在重复执行或条件判断之前。",
            "INIT_GUARD_OLED_REQUIRED": "请先放置OLED显示积木，并将绘图积木放在其内，或先放清除／更新显示积木。",
            "INIT_GUARD_PIN_SUFFIX": "引脚%1",
            "INIT_GUARD_INVALID_ID": "模组编号请输入非负整数。",
            "INIT_GUARD_LABEL_SOFTWARESERIALPORT": "软件串口"
        },
        "zh-tw": {
            "INIT_GUARD_TUBIT_REQUIRED": "請在Arduino啟動的積木底下放置\"TUBIT初始化\"積木",
            "INIT_GUARD_SENSOR_REQUIRED": "請在Arduino啟動的積木底下放置\"%1%2初始化\"積木，並放在讀取／使用積木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "請將\"%1%2初始化\"積木直接放在Arduino啟動底下，且放在重複執行或條件判斷之前。",
            "INIT_GUARD_OLED_REQUIRED": "請先放置OLED顯示積木，並將繪圖積木放在其內，或先放清除／更新顯示積木。",
            "INIT_GUARD_PIN_SUFFIX": "腳位%1",
            "INIT_GUARD_INVALID_ID": "模組編號請輸入非負整數。",
            "INIT_GUARD_LABEL_SOFTWARESERIALPORT": "軟件串口"
        }
    };
    Object.keys(__initGuardMessages).forEach(function (locale) {
        if (!Blockly.ScratchMsgs.locales[locale]) Blockly.ScratchMsgs.locales[locale] = {};
        Object.assign(Blockly.ScratchMsgs.locales[locale], __initGuardMessages[locale]);
    });

    Object.assign(Blockly.ScratchMsgs.locales["en"],
        {
            "SOFTWARESERIAL_AVAILABLE": "software serial %1 available data length",
            "SOFTWARESERIAL_BEGIN": "software serial %1 RX pin %2 TX pin %3 begin baudrate %4",
            "SOFTWARESERIAL_CATEGORY": "software serial",
            "SOFTWARESERIAL_NOWARP": "no-warp",
            "SOFTWARESERIAL_PRINT": "software serial %1 print %2 %3",
            "SOFTWARESERIAL_READABYTE": "software serial %1 read a byte",
            "SOFTWARESERIAL_WARP": "warp"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["ru"],
        {
            "SOFTWARESERIAL_AVAILABLE": "доступная длина данных в последовательном порту %1",
            "SOFTWARESERIAL_BEGIN": "последовательный порт %1 пины RX %2 TX %3 скорость передачи %4",
            "SOFTWARESERIAL_CATEGORY": "последовательный порт",
            "SOFTWARESERIAL_NOWARP": "не деформировать",
            "SOFTWARESERIAL_PRINT": "В последовательный порт %1 печатать %2 %3",
            "SOFTWARESERIAL_READABYTE": "Считать байт из последовательного порта %1",
            "SOFTWARESERIAL_WARP": "деформировать"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-cn"],
        {
            "SOFTWARESERIAL_AVAILABLE": "软件串口 %1 可用数据长度",
            "SOFTWARESERIAL_BEGIN": "软件串口 %1 RX 引脚 %2 TX 引脚 %3 开启波特率 %4",
            "SOFTWARESERIAL_CATEGORY": "软件串口",
            "SOFTWARESERIAL_NOWARP": "不换行",
            "SOFTWARESERIAL_PRINT": "软件串口  %1 打印 %2 %3",
            "SOFTWARESERIAL_READABYTE": "软件串口 %1 读取一个字节",
            "SOFTWARESERIAL_WARP": "换行"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-tw"],
        {
            "SOFTWARESERIAL_AVAILABLE": "軟件串口 %1 可用數據長度",
            "SOFTWARESERIAL_BEGIN": "軟件串口 %1 RX 管腳 %2 TX 管腳 %3 開啟波特率 %4",
            "SOFTWARESERIAL_CATEGORY": "軟件串口",
            "SOFTWARESERIAL_NOWARP": "不換行",
            "SOFTWARESERIAL_PRINT": "軟件串口 %1 打印 %2 %3",
            "SOFTWARESERIAL_READABYTE": "軟件串口 %1 讀取一個字節",
            "SOFTWARESERIAL_WARP": "換行"
        }
    );

    return Blockly;
}

if (typeof module !== 'undefined') {
    module.exports = {getInterfaceTranslations};
}
exports = registerScratchExtensionTranslations;
exports = registerBlocksMessages;
