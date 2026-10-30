/* Module labels are complete for the desktop app's four enabled locales. */
function getInterfaceTranslations () {
    return {
    "en": {
        "kitRelay.name": "Relay",
        "kitRelay.description": "Blocks for Relay on Arduino / ESP32."
    },
    "ru": {
        "kitRelay.name": "Реле",
        "kitRelay.description": "Блоки Arduino / ESP32 для модуля «Реле»."
    },
    "zh-cn": {
        "kitRelay.name": "继电器",
        "kitRelay.description": "Arduino／ESP32通用的继电器积木。"
    },
    "zh-tw": {
        "kitRelay.name": "繼電器",
        "kitRelay.description": "Arduino／ESP32共用的繼電器積木。"
    }
};
}
function registerScratchExtensionTranslations () { return {}; }
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
            "INIT_GUARD_LABEL_KITRELAY": "Relay"
        },
        "ru": {
            "INIT_GUARD_TUBIT_REQUIRED": "Поместите блок «Инициализация TUBIT» под блоком «когда Arduino запускается».",
            "INIT_GUARD_SENSOR_REQUIRED": "Поместите блок «Инициализация: %1 %2» под блоком «когда Arduino запускается» перед блоками чтения или использования модуля.",
            "INIT_GUARD_INIT_PLACEMENT": "Поместите блок «Инициализация: %1 %2» непосредственно под блоком «когда Arduino запускается», перед циклами и условиями.",
            "INIT_GUARD_OLED_REQUIRED": "Сначала добавьте блок вывода на OLED и поместите блоки рисования внутрь него либо разместите перед ними блок очистки или обновления дисплея.",
            "INIT_GUARD_PIN_SUFFIX": "контакт %1",
            "INIT_GUARD_INVALID_ID": "Введите неотрицательный целый номер модуля.",
            "INIT_GUARD_LABEL_KITRELAY": "Реле"
        },
        "zh-cn": {
            "INIT_GUARD_TUBIT_REQUIRED": "请在Arduino启动的积木底下放置\"TUBIT初始化\"积木",
            "INIT_GUARD_SENSOR_REQUIRED": "请在Arduino启动的积木底下放置\"%1%2初始化\"积木，并放在读取／使用积木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "请将\"%1%2初始化\"积木直接放在Arduino启动底下，且放在重复执行或条件判断之前。",
            "INIT_GUARD_OLED_REQUIRED": "请先放置OLED显示积木，并将绘图积木放在其内，或先放清除／更新显示积木。",
            "INIT_GUARD_PIN_SUFFIX": "引脚%1",
            "INIT_GUARD_INVALID_ID": "模组编号请输入非负整数。",
            "INIT_GUARD_LABEL_KITRELAY": "继电器"
        },
        "zh-tw": {
            "INIT_GUARD_TUBIT_REQUIRED": "請在Arduino啟動的積木底下放置\"TUBIT初始化\"積木",
            "INIT_GUARD_SENSOR_REQUIRED": "請在Arduino啟動的積木底下放置\"%1%2初始化\"積木，並放在讀取／使用積木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "請將\"%1%2初始化\"積木直接放在Arduino啟動底下，且放在重複執行或條件判斷之前。",
            "INIT_GUARD_OLED_REQUIRED": "請先放置OLED顯示積木，並將繪圖積木放在其內，或先放清除／更新顯示積木。",
            "INIT_GUARD_PIN_SUFFIX": "腳位%1",
            "INIT_GUARD_INVALID_ID": "模組編號請輸入非負整數。",
            "INIT_GUARD_LABEL_KITRELAY": "繼電器"
        }
    };
    Object.keys(__initGuardMessages).forEach(function (locale) {
        if (!Blockly.ScratchMsgs.locales[locale]) Blockly.ScratchMsgs.locales[locale] = {};
        Object.assign(Blockly.ScratchMsgs.locales[locale], __initGuardMessages[locale]);
    });

    const messages = {
    "en": {
        "KITRELAY_NO_PINS": "Select a supported Arduino or ESP32 device first.",
        "KITRELAY_INVALID_OPTION": "Invalid option.",
        "KITRELAY_INVALID_ID": "Enter a non-negative whole number for the module number.",
        "KITRELAY_INVALID_PIN": "Select a valid output pin.",
        "KITRELAY_CONFLICT": "One module ID has conflicting initialization settings.",
        "KITRELAY_CATEGORY": "Relay",
        "KITRELAY_BEGIN": "relay %1 initialize signal %2 active level %3",
        "KITRELAY_HIGH": "HIGH",
        "KITRELAY_LOW": "LOW",
        "KITRELAY_WRITE": "relay %1 %2",
        "KITRELAY_ON": "on",
        "KITRELAY_OFF": "off",
        "KITRELAY_STATE": "read %1 relay commanded state value",
        "KITRELAY_BEGIN_TIP": "Initialization writes the inactive level before setting OUTPUT. Select the active level for your module.",
        "KITMODULE_ERROR_ID": "Enter a non-negative whole-number module ID.",
        "KITMODULE_ERROR_PIN": "Select a valid pin.",
        "KITMODULE_ERROR_OPTION": "Select a valid setting.",
        "KITMODULE_ERROR_CONFLICT": "The same module number has conflicting initialization settings.",
        "KITMODULE_ERROR_DUPLICATE_PIN": "Use different pins for these signals."
    },
    "zh-tw": {
        "KITRELAY_NO_PINS": "請先選擇支援的 Arduino 或 ESP32 控制板。",
        "KITRELAY_INVALID_OPTION": "選項無效。",
        "KITRELAY_INVALID_ID": "繼電器：模組編號請輸入 0 或正整數。",
        "KITRELAY_INVALID_PIN": "請選擇有效輸出腳位。",
        "KITRELAY_CONFLICT": "相同模組編號有互相衝突的初始化設定。",
        "KITRELAY_CATEGORY": "繼電器",
        "KITRELAY_BEGIN": "繼電器%1初始化 訊號%2 觸發電位%3",
        "KITRELAY_HIGH": "高電位",
        "KITRELAY_LOW": "低電位",
        "KITRELAY_WRITE": "繼電器 %1 %2",
        "KITRELAY_ON": "開啟",
        "KITRELAY_OFF": "關閉",
        "KITRELAY_STATE": "讀取%1 繼電器控制狀態數值",
        "KITRELAY_BEGIN_TIP": "初始化先寫入關閉電位再設為輸出；請依實際模組選擇觸發電位。",
        "KITMODULE_ERROR_ID": "模組編號請輸入非負整數。",
        "KITMODULE_ERROR_PIN": "請選擇有效腳位。",
        "KITMODULE_ERROR_OPTION": "請選擇有效設定。",
        "KITMODULE_ERROR_CONFLICT": "相同模組編號有互相衝突的初始化設定。",
        "KITMODULE_ERROR_DUPLICATE_PIN": "各訊號必須使用不同腳位。"
    },
    "ru": {
        "KITRELAY_NO_PINS": "Сначала выберите поддерживаемую плату Arduino или ESP32.",
        "KITRELAY_INVALID_OPTION": "Недопустимый параметр.",
        "KITRELAY_INVALID_ID": "Введите неотрицательное целое число в качестве номера модуля.",
        "KITRELAY_INVALID_PIN": "Выберите допустимый контакт платы.",
        "KITRELAY_CONFLICT": "Для одного номера модуля заданы разные настройки инициализации.",
        "KITRELAY_HIGH": "HIGH",
        "KITRELAY_LOW": "LOW",
        "KITRELAY_ON": "включить",
        "KITRELAY_OFF": "выключить",
        "KITRELAY_CATEGORY": "Реле",
        "KITRELAY_BEGIN": "инициализировать реле %1 сигнал %2 активный уровень %3",
        "KITRELAY_WRITE": "реле %1: %2",
        "KITRELAY_STATE": "прочитать заданное состояние реле %1",
        "KITRELAY_BEGIN_TIP": "До включения режима OUTPUT устанавливается неактивный уровень. Выберите активный уровень своего модуля.",
        "KITMODULE_ERROR_ID": "Введите неотрицательный целый номер модуля.",
        "KITMODULE_ERROR_PIN": "Выберите допустимый контакт.",
        "KITMODULE_ERROR_OPTION": "Выберите допустимую настройку.",
        "KITMODULE_ERROR_CONFLICT": "Для одного номера модуля заданы разные настройки инициализации.",
        "KITMODULE_ERROR_DUPLICATE_PIN": "Для этих сигналов нужны разные контакты."
    },
    "zh-cn": {
        "KITRELAY_NO_PINS": "请先选择支援的 Arduino 或 ESP32 控制板。",
        "KITRELAY_INVALID_OPTION": "选项无效。",
        "KITRELAY_INVALID_ID": "继电器：模块编号请输入 0 或正整数。",
        "KITRELAY_INVALID_PIN": "请选择有效输出引脚。",
        "KITRELAY_CONFLICT": "相同模块编号有互相冲突的初始化设定。",
        "KITRELAY_CATEGORY": "继电器",
        "KITRELAY_BEGIN": "继电器%1初始化 信号%2 触发电位%3",
        "KITRELAY_HIGH": "高电位",
        "KITRELAY_LOW": "低电位",
        "KITRELAY_WRITE": "继电器 %1 %2",
        "KITRELAY_ON": "开启",
        "KITRELAY_OFF": "关闭",
        "KITRELAY_STATE": "读取%1 继电器控制状态数值",
        "KITRELAY_BEGIN_TIP": "初始化先写入关闭电位再设为输出；请依实际模块选择触发电位。",
        "KITMODULE_ERROR_ID": "模块编号请输入非负整数。",
        "KITMODULE_ERROR_PIN": "请选择有效引脚。",
        "KITMODULE_ERROR_OPTION": "请选择有效设定。",
        "KITMODULE_ERROR_CONFLICT": "相同模块编号有互相冲突的初始化设定。",
        "KITMODULE_ERROR_DUPLICATE_PIN": "各信号必须使用不同引脚。"
    }
};
    Object.keys(messages).forEach(locale => {
        if (!Blockly.ScratchMsgs.locales[locale]) Blockly.ScratchMsgs.locales[locale] = {};
        Object.assign(Blockly.ScratchMsgs.locales[locale], messages[locale]);
    });
    return Blockly;
}
if (typeof module !== 'undefined') module.exports = {getInterfaceTranslations};
exports = registerScratchExtensionTranslations;
exports = registerBlocksMessages;
