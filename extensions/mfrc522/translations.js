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
            "mfrc522.name": "MFRC-522 Module",
            "mfrc522.description": "13.56MHz radio frequency identification module using spi interface."
        },
        "ru": {
            "mfrc522.name": "Модуль MFRC-522",
            "mfrc522.description": "Модуль радиочастотной идентификации 13,56 МГц с использованием интерфейса spi."
        },
        "zh-cn": {
            "mfrc522.name": "MFRC-522 模块",
            "mfrc522.description": "使用 SPI 接口的 13.56MHz 射频识别模块。"
        },
        "zh-tw": {
            "mfrc522.name": "MFRC-522 模塊",
            "mfrc522.description": "使用 SPI 接口的 13.56MHz 射頻識別模塊。"
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
            "INIT_GUARD_LABEL_MFRC522": "MFRC-522 Module"
        },
        "ru": {
            "INIT_GUARD_TUBIT_REQUIRED": "Поместите блок «Инициализация TUBIT» под блоком «когда Arduino запускается».",
            "INIT_GUARD_SENSOR_REQUIRED": "Поместите блок «Инициализация: %1 %2» под блоком «когда Arduino запускается» перед блоками чтения или использования модуля.",
            "INIT_GUARD_INIT_PLACEMENT": "Поместите блок «Инициализация: %1 %2» непосредственно под блоком «когда Arduino запускается», перед циклами и условиями.",
            "INIT_GUARD_OLED_REQUIRED": "Сначала добавьте блок вывода на OLED и поместите блоки рисования внутрь него либо разместите перед ними блок очистки или обновления дисплея.",
            "INIT_GUARD_PIN_SUFFIX": "контакт %1",
            "INIT_GUARD_INVALID_ID": "Введите неотрицательный целый номер модуля.",
            "INIT_GUARD_LABEL_MFRC522": "Модуль MFRC-522"
        },
        "zh-cn": {
            "INIT_GUARD_TUBIT_REQUIRED": "请在Arduino启动的积木底下放置\"TUBIT初始化\"积木",
            "INIT_GUARD_SENSOR_REQUIRED": "请在Arduino启动的积木底下放置\"%1%2初始化\"积木，并放在读取／使用积木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "请将\"%1%2初始化\"积木直接放在Arduino启动底下，且放在重复执行或条件判断之前。",
            "INIT_GUARD_OLED_REQUIRED": "请先放置OLED显示积木，并将绘图积木放在其内，或先放清除／更新显示积木。",
            "INIT_GUARD_PIN_SUFFIX": "引脚%1",
            "INIT_GUARD_INVALID_ID": "模组编号请输入非负整数。",
            "INIT_GUARD_LABEL_MFRC522": "MFRC-522 模块"
        },
        "zh-tw": {
            "INIT_GUARD_TUBIT_REQUIRED": "請在Arduino啟動的積木底下放置\"TUBIT初始化\"積木",
            "INIT_GUARD_SENSOR_REQUIRED": "請在Arduino啟動的積木底下放置\"%1%2初始化\"積木，並放在讀取／使用積木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "請將\"%1%2初始化\"積木直接放在Arduino啟動底下，且放在重複執行或條件判斷之前。",
            "INIT_GUARD_OLED_REQUIRED": "請先放置OLED顯示積木，並將繪圖積木放在其內，或先放清除／更新顯示積木。",
            "INIT_GUARD_PIN_SUFFIX": "腳位%1",
            "INIT_GUARD_INVALID_ID": "模組編號請輸入非負整數。",
            "INIT_GUARD_LABEL_MFRC522": "MFRC-522 模塊"
        }
    };
    Object.keys(__initGuardMessages).forEach(function (locale) {
        if (!Blockly.ScratchMsgs.locales[locale]) Blockly.ScratchMsgs.locales[locale] = {};
        Object.assign(Blockly.ScratchMsgs.locales[locale], __initGuardMessages[locale]);
    });

    Object.assign(Blockly.ScratchMsgs.locales["en"],
        {
            "MFRC522_CATEGORY": "MFRC522",
            "MFRC522_DATATYPE_NUBMER": "number",
            "MFRC522_DATATYPE_STRING": "string",
            "MFRC522_GETBLOCKDATA": "mfrc522 block data (type %1)",
            "MFRC522_GETBLOCKDATA_TOOLTIP": "String length less than 16 byte.",
            "MFRC522_GETCARDTYPENAME": "mfrc522 get card type name",
            "MFRC522_GETCARDUID": "mfrc522 get card UID",
            "MFRC522_HALT": "mfrc522 halt",
            "MFRC522_INIT": "init mfrc522 pin CS %1 RST %2",
            "MFRC522_ISNEWCARDPRESENT": "new card present?",
            "MFRC522_NUMBERTOHEXSTRING": "mfrc522 %1 to hex string",
            "MFRC522_PRINTSECTORDATA": "mfrc522 print sector %1 data",
            "MFRC522_READBLOCKDATA": "mfrc522 read block %1",
            "MFRC522_READCARDSERIAL": "mfrc522 successfully read card serial number?",
            "MFRC522_SETKEY": "mfrc522 set secret key %1",
            "MFRC522_VERIFICATIONKEY": "mfrc522 verification block %1 key is correct?",
            "MFRC522_WRITEBLOCKDATA": "mfrc522 write %1 to block %2 (type %3)",
            "MFRC522_WRITEKEYTOSECTOR": "mfrc522 write key %1 to sector %2"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["ru"],
        {
            "MFRC522_CATEGORY": "MFRC522",
            "MFRC522_DATATYPE_NUBMER": "число",
            "MFRC522_DATATYPE_STRING": "строка",
            "MFRC522_GETBLOCKDATA": "данные блока mfrc522 (тип %1)",
            "MFRC522_GETBLOCKDATA_TOOLTIP": "Длина строки менее 16 байт.",
            "MFRC522_GETCARDTYPENAME": "mfrc522 получил название типа карты",
            "MFRC522_GETCARDUID": "mfrc522 получил UID карты",
            "MFRC522_HALT": "остановить mfrc522",
            "MFRC522_INIT": "инициализировать mfrc522 пины CS %1 RST %2",
            "MFRC522_ISNEWCARDPRESENT": "новая карта присутствует?",
            "MFRC522_NUMBERTOHEXSTRING": "mfrc522 %1 в шестнадцатеричный формат",
            "MFRC522_PRINTSECTORDATA": "mfrc522 печать данные в сектор %1",
            "MFRC522_READBLOCKDATA": "mfrc522 прочитать блок %1",
            "MFRC522_READCARDSERIAL": "mfrc522 успешно прочитал серийный номер карты?",
            "MFRC522_SETKEY": "mfrc522 установить секретный ключ %1",
            "MFRC522_VERIFICATIONKEY": "mfrc522 блок проверки %1 ключ правильный?",
            "MFRC522_WRITEBLOCKDATA": "mfrc522 записать %1 в блок %2 (тип %3)",
            "MFRC522_WRITEKEYTOSECTOR": "mfrc522 записать ключ %1 в сектор %2"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-cn"],
        {
            "MFRC522_CATEGORY": "MFRC522",
            "MFRC522_DATATYPE_NUBMER": "数字",
            "MFRC522_DATATYPE_STRING": "字符串",
            "MFRC522_GETBLOCKDATA": "mfrc522 块数据 (类型 %1)",
            "MFRC522_GETBLOCKDATA_TOOLTIP": "字符串长度小于 16 字节。",
            "MFRC522_GETCARDTYPENAME": "mfrc522 获取卡类型名称",
            "MFRC522_GETCARDUID": "mfrc522 获取卡 UID",
            "MFRC522_HALT": "mfrc522 挂起",
            "MFRC522_INIT": "初始化 mfrc522 引脚 CS %1 RST %2",
            "MFRC522_ISNEWCARDPRESENT": "是否有新卡?",
            "MFRC522_NUMBERTOHEXSTRING": "mfrc522 %1 转为16进制字符串",
            "MFRC522_PRINTSECTORDATA": "mfrc522 打印扇区 %1 数据",
            "MFRC522_READBLOCKDATA": "mfrc522 读取块 %1",
            "MFRC522_READCARDSERIAL": "mfrc522 成功读取到卡序列号?",
            "MFRC522_SETKEY": "mfrc522 设置密钥 %1",
            "MFRC522_VERIFICATIONKEY": "mfrc522 验证块 %1 密码正确？",
            "MFRC522_WRITEBLOCKDATA": "mfrc522 写 %1 到块 %2 (类型 %3)",
            "MFRC522_WRITEKEYTOSECTOR": "mfrc522 写密码 %1 到扇区 %2"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-tw"],
        {
            "MFRC522_CATEGORY": "MFRC522",
            "MFRC522_DATATYPE_NUBMER": "數字",
            "MFRC522_DATATYPE_STRING": "字符串",
            "MFRC522_GETBLOCKDATA": "mfrc522 塊數據 (類型 %1)",
            "MFRC522_GETBLOCKDATA_TOOLTIP": "字符串長度小於 16 字節。",
            "MFRC522_GETCARDTYPENAME": "mfrc522 獲取卡類型名稱",
            "MFRC522_GETCARDUID": "mfrc522 獲取卡 UID",
            "MFRC522_HALT": "mfrc522 掛起",
            "MFRC522_INIT": "初始化 mfrc522 管腳 CS %1 RST %2",
            "MFRC522_ISNEWCARDPRESENT": "是否有新卡?",
            "MFRC522_NUMBERTOHEXSTRING": "mfrc522 %1 轉為16進製字符串",
            "MFRC522_PRINTSECTORDATA": "mfrc522 打印扇區 %1 數據",
            "MFRC522_READBLOCKDATA": "mfrc522 讀取塊 %1",
            "MFRC522_READCARDSERIAL": "mfrc522 成功讀取到卡序列號?",
            "MFRC522_SETKEY": "mfrc522 設置密鑰 %1",
            "MFRC522_VERIFICATIONKEY": "mfrc522 驗證塊 %1 密碼正確？",
            "MFRC522_WRITEBLOCKDATA": "mfrc522 寫 %1 到塊 %2 (類型 %3)",
            "MFRC522_WRITEKEYTOSECTOR": "mfrc522 寫密碼 %1 到扇區 %2"
        }
    );

    return Blockly;
}

if (typeof module !== 'undefined') {
    module.exports = {getInterfaceTranslations};
}
exports = registerScratchExtensionTranslations;
exports = registerBlocksMessages;
