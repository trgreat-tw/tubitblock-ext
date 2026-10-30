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
            "sdCard.name": "SD Card Module",
            "sdCard.description": "Save or read your data in SD card."
        },
        "ru": {
            "sdCard.name": "Модуль SD карты",
            "sdCard.description": "Сохраните или прочитайте свои данные на SD-карте."
        },
        "zh-cn": {
            "sdCard.name": "SD卡模块",
            "sdCard.description": "在SD卡中保存和读取你的数据。"
        },
        "zh-tw": {
            "sdCard.name": "SD卡模塊",
            "sdCard.description": "在SD卡中保存和讀取你的數據。"
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
            "INIT_GUARD_LABEL_SDCARD": "SD Card Module"
        },
        "ru": {
            "INIT_GUARD_TUBIT_REQUIRED": "Поместите блок «Инициализация TUBIT» под блоком «когда Arduino запускается».",
            "INIT_GUARD_SENSOR_REQUIRED": "Поместите блок «Инициализация: %1 %2» под блоком «когда Arduino запускается» перед блоками чтения или использования модуля.",
            "INIT_GUARD_INIT_PLACEMENT": "Поместите блок «Инициализация: %1 %2» непосредственно под блоком «когда Arduino запускается», перед циклами и условиями.",
            "INIT_GUARD_OLED_REQUIRED": "Сначала добавьте блок вывода на OLED и поместите блоки рисования внутрь него либо разместите перед ними блок очистки или обновления дисплея.",
            "INIT_GUARD_PIN_SUFFIX": "контакт %1",
            "INIT_GUARD_INVALID_ID": "Введите неотрицательный целый номер модуля.",
            "INIT_GUARD_LABEL_SDCARD": "Модуль SD карты"
        },
        "zh-cn": {
            "INIT_GUARD_TUBIT_REQUIRED": "请在Arduino启动的积木底下放置\"TUBIT初始化\"积木",
            "INIT_GUARD_SENSOR_REQUIRED": "请在Arduino启动的积木底下放置\"%1%2初始化\"积木，并放在读取／使用积木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "请将\"%1%2初始化\"积木直接放在Arduino启动底下，且放在重复执行或条件判断之前。",
            "INIT_GUARD_OLED_REQUIRED": "请先放置OLED显示积木，并将绘图积木放在其内，或先放清除／更新显示积木。",
            "INIT_GUARD_PIN_SUFFIX": "引脚%1",
            "INIT_GUARD_INVALID_ID": "模组编号请输入非负整数。",
            "INIT_GUARD_LABEL_SDCARD": "SD卡模块"
        },
        "zh-tw": {
            "INIT_GUARD_TUBIT_REQUIRED": "請在Arduino啟動的積木底下放置\"TUBIT初始化\"積木",
            "INIT_GUARD_SENSOR_REQUIRED": "請在Arduino啟動的積木底下放置\"%1%2初始化\"積木，並放在讀取／使用積木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "請將\"%1%2初始化\"積木直接放在Arduino啟動底下，且放在重複執行或條件判斷之前。",
            "INIT_GUARD_OLED_REQUIRED": "請先放置OLED顯示積木，並將繪圖積木放在其內，或先放清除／更新顯示積木。",
            "INIT_GUARD_PIN_SUFFIX": "腳位%1",
            "INIT_GUARD_INVALID_ID": "模組編號請輸入非負整數。",
            "INIT_GUARD_LABEL_SDCARD": "SD卡模塊"
        }
    };
    Object.keys(__initGuardMessages).forEach(function (locale) {
        if (!Blockly.ScratchMsgs.locales[locale]) Blockly.ScratchMsgs.locales[locale] = {};
        Object.assign(Blockly.ScratchMsgs.locales[locale], __initGuardMessages[locale]);
    });

    Object.assign(Blockly.ScratchMsgs.locales["en"],
        {
            "SDCARD_CATEGORY": "SD Card",
            "SDCARD_CLOSEFILE": "sd card close file",
            "SDCARD_CREATEFILE": "sd card create file %1",
            "SDCARD_DELETEFILE": "sd card delet file %1",
            "SDCARD_EOL_NOWARP": "no-warp",
            "SDCARD_EOL_WARP": "warp",
            "SDCARD_FILEDATAAVAILABLE": "sd card file data available",
            "SDCARD_INIT": "init sd card pin CS %1",
            "SDCARD_ISFILEEXISTS": "sd card file %1 exists?",
            "SDCARD_MODE_READ": "read only",
            "SDCARD_MODE_READWRITE": "read & write",
            "SDCARD_OPENFILE": "sd card open file %1 mode %2",
            "SDCARD_OPENFILE_TOOLTIP": "If file not exists, it will be created automatically.",
            "SDCARD_PRINT": "print %1 %2 to file",
            "SDCARD_READFILEDATA": "sd card read file data"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["ru"],
        {
            "SDCARD_CATEGORY": "SD-карта",
            "SDCARD_CLOSEFILE": "SD-карта закрыть файл",
            "SDCARD_CREATEFILE": "создать файл %1 на SD-карте",
            "SDCARD_DELETEFILE": "удалить файл %1 с SD-карты",
            "SDCARD_EOL_NOWARP": "не деформировать",
            "SDCARD_EOL_WARP": "деформировать",
            "SDCARD_FILEDATAAVAILABLE": "Доступны данные файла SD-карты",
            "SDCARD_INIT": "инициировать SD-карту на пине CS %1",
            "SDCARD_ISFILEEXISTS": "файл %1 на SD-карте существует?",
            "SDCARD_MODE_READ": "только для чтения",
            "SDCARD_MODE_READWRITE": "чтение и запись",
            "SDCARD_OPENFILE": "открыть файл %1 на SD-карте в режиме %2",
            "SDCARD_OPENFILE_TOOLTIP": "Если файл не существует, он будет создан автоматически.",
            "SDCARD_PRINT": "распечатать %1 %2 в файл",
            "SDCARD_READFILEDATA": "читать данные файла с SD-карты"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-cn"],
        {
            "SDCARD_CATEGORY": "SD卡",
            "SDCARD_CLOSEFILE": "sd卡关闭文件",
            "SDCARD_CREATEFILE": "sd卡创建文件 %1",
            "SDCARD_DELETEFILE": "sd卡删除文件 %1",
            "SDCARD_EOL_NOWARP": "不换行",
            "SDCARD_EOL_WARP": "换行",
            "SDCARD_FILEDATAAVAILABLE": "sd卡文件可读取字节数",
            "SDCARD_INIT": "初始化sd卡引脚 CS %1",
            "SDCARD_ISFILEEXISTS": "sd卡文件 %1 存在？",
            "SDCARD_MODE_READ": "只读",
            "SDCARD_MODE_READWRITE": "读写",
            "SDCARD_OPENFILE": "sd卡打开文件 %1 模式 %2",
            "SDCARD_OPENFILE_TOOLTIP": "如果文件不存在，它将被自动创建。",
            "SDCARD_PRINT": "打印 %1 %2 到文件",
            "SDCARD_READFILEDATA": "sd卡读取文件数据"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-tw"],
        {
            "SDCARD_CATEGORY": "SD卡",
            "SDCARD_CLOSEFILE": "sd卡關閉文件",
            "SDCARD_CREATEFILE": "sd卡創建文件 %1",
            "SDCARD_DELETEFILE": "sd卡刪除文件 %1",
            "SDCARD_EOL_NOWARP": "不換行",
            "SDCARD_EOL_WARP": "換行",
            "SDCARD_FILEDATAAVAILABLE": "sd卡文件可讀取字節數",
            "SDCARD_INIT": "初始化sd卡管腳 CS %1",
            "SDCARD_ISFILEEXISTS": "sd卡文件 %1 存在？",
            "SDCARD_MODE_READ": "只讀",
            "SDCARD_MODE_READWRITE": "讀寫",
            "SDCARD_OPENFILE": "sd卡打開文件 %1 模式 %2",
            "SDCARD_OPENFILE_TOOLTIP": "如果文件不存在，它將被自動創建。",
            "SDCARD_PRINT": "打印 %1 %2 到文件",
            "SDCARD_READFILEDATA": "sd卡讀取文件數據"
        }
    );

    return Blockly;
}

if (typeof module !== 'undefined') {
    module.exports = {getInterfaceTranslations};
}
exports = registerScratchExtensionTranslations;
exports = registerBlocksMessages;
