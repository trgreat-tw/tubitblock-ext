/* Module labels are complete for the desktop app's four enabled locales. */
function getInterfaceTranslations () {
    return {
    "en": {
        "kitTouch.name": "Touch Sensor",
        "kitTouch.description": "Blocks for Touch Sensor on Arduino / ESP32."
    },
    "ru": {
        "kitTouch.name": "Датчик касания",
        "kitTouch.description": "Блоки Arduino / ESP32 для модуля «Датчик касания»."
    },
    "zh-cn": {
        "kitTouch.name": "人体触摸感测器",
        "kitTouch.description": "Arduino／ESP32通用的人体触摸感测器积木。"
    },
    "zh-tw": {
        "kitTouch.name": "人體觸摸感測器",
        "kitTouch.description": "Arduino／ESP32共用的人體觸摸感測器積木。"
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
            "INIT_GUARD_LABEL_KITTOUCH": "Touch Sensor"
        },
        "ru": {
            "INIT_GUARD_TUBIT_REQUIRED": "Поместите блок «Инициализация TUBIT» под блоком «когда Arduino запускается».",
            "INIT_GUARD_SENSOR_REQUIRED": "Поместите блок «Инициализация: %1 %2» под блоком «когда Arduino запускается» перед блоками чтения или использования модуля.",
            "INIT_GUARD_INIT_PLACEMENT": "Поместите блок «Инициализация: %1 %2» непосредственно под блоком «когда Arduino запускается», перед циклами и условиями.",
            "INIT_GUARD_OLED_REQUIRED": "Сначала добавьте блок вывода на OLED и поместите блоки рисования внутрь него либо разместите перед ними блок очистки или обновления дисплея.",
            "INIT_GUARD_PIN_SUFFIX": "контакт %1",
            "INIT_GUARD_INVALID_ID": "Введите неотрицательный целый номер модуля.",
            "INIT_GUARD_LABEL_KITTOUCH": "Датчик касания"
        },
        "zh-cn": {
            "INIT_GUARD_TUBIT_REQUIRED": "请在Arduino启动的积木底下放置\"TUBIT初始化\"积木",
            "INIT_GUARD_SENSOR_REQUIRED": "请在Arduino启动的积木底下放置\"%1%2初始化\"积木，并放在读取／使用积木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "请将\"%1%2初始化\"积木直接放在Arduino启动底下，且放在重复执行或条件判断之前。",
            "INIT_GUARD_OLED_REQUIRED": "请先放置OLED显示积木，并将绘图积木放在其内，或先放清除／更新显示积木。",
            "INIT_GUARD_PIN_SUFFIX": "引脚%1",
            "INIT_GUARD_INVALID_ID": "模组编号请输入非负整数。",
            "INIT_GUARD_LABEL_KITTOUCH": "人体触摸感测器"
        },
        "zh-tw": {
            "INIT_GUARD_TUBIT_REQUIRED": "請在Arduino啟動的積木底下放置\"TUBIT初始化\"積木",
            "INIT_GUARD_SENSOR_REQUIRED": "請在Arduino啟動的積木底下放置\"%1%2初始化\"積木，並放在讀取／使用積木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "請將\"%1%2初始化\"積木直接放在Arduino啟動底下，且放在重複執行或條件判斷之前。",
            "INIT_GUARD_OLED_REQUIRED": "請先放置OLED顯示積木，並將繪圖積木放在其內，或先放清除／更新顯示積木。",
            "INIT_GUARD_PIN_SUFFIX": "腳位%1",
            "INIT_GUARD_INVALID_ID": "模組編號請輸入非負整數。",
            "INIT_GUARD_LABEL_KITTOUCH": "人體觸摸感測器"
        }
    };
    Object.keys(__initGuardMessages).forEach(function (locale) {
        if (!Blockly.ScratchMsgs.locales[locale]) Blockly.ScratchMsgs.locales[locale] = {};
        Object.assign(Blockly.ScratchMsgs.locales[locale], __initGuardMessages[locale]);
    });

    const messages = {
    "en": {
        "KITTOUCH_CATEGORY": "Touch Sensor",
        "KITTOUCH_BEGIN": "touch sensor %1 initialize pin %2 active level %3",
        "KITTOUCH_UPDATE": "touch sensor %1 update",
        "KITTOUCH_ACTIVE": "read %1 touch sensor value",
        "KITTOUCH_JUST_ACTIVATED": "read %1 touch sensor newly active value",
        "KITTOUCH_JUST_RELEASED": "read %1 touch sensor newly released value",
        "KITTOUCH_RAW": "read %1 touch sensor raw value (0/1)",
        "KITTOUCH_HIGH": "HIGH",
        "KITTOUCH_LOW": "LOW",
        "KITTOUCH_ON": "on",
        "KITTOUCH_OFF": "off",
        "KITTOUCH_BEGIN_TIP": "Enter a nonnegative whole-number ID. Internal pull-up and suitable switch debounce are automatic.",
        "KITTOUCH_UPDATE_TIP": "Update once each loop before reading. Next update clears edge events.",
        "KITTOUCH_READ_TIP": "Samples when read; no update block is needed. Read repeatedly in the main loop.",
        "KITTOUCH_ANALOG": "read pin %1 touch sensor analog value",
        "KITTOUCH_ANALOG_TIP": "Optional analog output, read directly. Arduino normally uses 0–1023 and ESP32 0–4095.",
        "KITMODULE_ERROR_ID": "Enter a non-negative whole-number module ID.",
        "KITMODULE_ERROR_PIN": "Select a valid pin.",
        "KITMODULE_ERROR_OPTION": "Select a valid setting.",
        "KITMODULE_ERROR_CONFLICT": "The same module number has conflicting initialization settings.",
        "KITMODULE_ERROR_DUPLICATE_PIN": "Use different pins for these signals."
    },
    "zh-tw": {
        "KITTOUCH_CATEGORY": "人體觸摸感測器",
        "KITTOUCH_BEGIN": "人體觸摸感測器%1初始化 腳位%2 觸發電位%3",
        "KITTOUCH_UPDATE": "人體觸摸感測器（%1）更新狀態",
        "KITTOUCH_ACTIVE": "讀取%1 人體觸摸感測器數值",
        "KITTOUCH_JUST_ACTIVATED": "讀取%1 人體觸摸感測器剛觸發數值",
        "KITTOUCH_JUST_RELEASED": "讀取%1 人體觸摸感測器剛解除數值",
        "KITTOUCH_RAW": "讀取%1 人體觸摸感測器原始數值（0／1）",
        "KITTOUCH_HIGH": "高電位 HIGH",
        "KITTOUCH_LOW": "低電位 LOW",
        "KITTOUCH_ON": "開啟",
        "KITTOUCH_OFF": "關閉",
        "KITTOUCH_BEGIN_TIP": "編號可自行輸入非負整數。內建上拉；按鈕與接點開關自動去彈跳。",
        "KITTOUCH_UPDATE_TIP": "每輪先更新，再讀狀態。下一次更新會清除瞬間事件。",
        "KITTOUCH_READ_TIP": "讀取時自動採樣，不需更新狀態積木。放在迴圈持續讀取。",
        "KITTOUCH_ANALOG": "讀取腳位%1 人體觸摸感測器類比數值",
        "KITTOUCH_ANALOG_TIP": "選接類比輸出，直接讀取。Arduino通常為0～1023，ESP32通常為0～4095。",
        "KITMODULE_ERROR_ID": "模組編號請輸入非負整數。",
        "KITMODULE_ERROR_PIN": "請選擇有效腳位。",
        "KITMODULE_ERROR_OPTION": "請選擇有效設定。",
        "KITMODULE_ERROR_CONFLICT": "相同模組編號有互相衝突的初始化設定。",
        "KITMODULE_ERROR_DUPLICATE_PIN": "各訊號必須使用不同腳位。"
    },
    "ru": {
        "KITTOUCH_HIGH": "HIGH",
        "KITTOUCH_LOW": "LOW",
        "KITTOUCH_ON": "включить",
        "KITTOUCH_OFF": "выключить",
        "KITTOUCH_CATEGORY": "Датчик касания",
        "KITTOUCH_BEGIN": "инициализировать датчика касания %1 контакт %2 активный уровень %3",
        "KITTOUCH_UPDATE": "обновить датчика касания %1",
        "KITTOUCH_ACTIVE": "прочитать значение датчика касания %1",
        "KITTOUCH_JUST_ACTIVATED": "прочитать новое срабатывание датчика касания %1",
        "KITTOUCH_JUST_RELEASED": "прочитать новое отключение датчика касания %1",
        "KITTOUCH_RAW": "прочитать исходное значение датчика касания %1 (0/1)",
        "KITTOUCH_BEGIN_TIP": "Введите неотрицательный целый номер модуля. Подтяжка и подходящее подавление дребезга настраиваются автоматически.",
        "KITTOUCH_UPDATE_TIP": "Обновляйте один раз за проход цикла перед чтением. Следующее обновление очищает события перехода.",
        "KITTOUCH_READ_TIP": "Значение измеряется при чтении. Блок обновления не нужен; читайте значение в основном цикле.",
        "KITTOUCH_ANALOG": "прочитать аналоговое значение датчика касания с контакта %1",
        "KITTOUCH_ANALOG_TIP": "Необязательный аналоговый выход читается напрямую. Обычно диапазон Arduino — 0–1023, ESP32 — 0–4095.",
        "KITMODULE_ERROR_ID": "Введите неотрицательный целый номер модуля.",
        "KITMODULE_ERROR_PIN": "Выберите допустимый контакт.",
        "KITMODULE_ERROR_OPTION": "Выберите допустимую настройку.",
        "KITMODULE_ERROR_CONFLICT": "Для одного номера модуля заданы разные настройки инициализации.",
        "KITMODULE_ERROR_DUPLICATE_PIN": "Для этих сигналов нужны разные контакты."
    },
    "zh-cn": {
        "KITTOUCH_CATEGORY": "人体触摸感测器",
        "KITTOUCH_BEGIN": "人体触摸感测器%1初始化 引脚%2 触发电位%3",
        "KITTOUCH_UPDATE": "人体触摸感测器（%1）更新状态",
        "KITTOUCH_ACTIVE": "读取%1 人体触摸感测器数值",
        "KITTOUCH_JUST_ACTIVATED": "读取%1 人体触摸感测器刚触发数值",
        "KITTOUCH_JUST_RELEASED": "读取%1 人体触摸感测器刚解除数值",
        "KITTOUCH_RAW": "读取%1 人体触摸感测器原始数值（0／1）",
        "KITTOUCH_HIGH": "高电位 HIGH",
        "KITTOUCH_LOW": "低电位 LOW",
        "KITTOUCH_ON": "开启",
        "KITTOUCH_OFF": "关闭",
        "KITTOUCH_BEGIN_TIP": "编号可自行输入非负整数。内建上拉；按钮与接点开关自动消抖。",
        "KITTOUCH_UPDATE_TIP": "每轮先更新，再读状态。下一次更新会清除瞬间事件。",
        "KITTOUCH_READ_TIP": "读取时自动采样，不需更新状态积木。放在回圈持续读取。",
        "KITTOUCH_ANALOG": "读取引脚%1 人体触摸感测器模拟数值",
        "KITTOUCH_ANALOG_TIP": "选接模拟输出，直接读取。Arduino通常为0～1023，ESP32通常为0～4095。",
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
