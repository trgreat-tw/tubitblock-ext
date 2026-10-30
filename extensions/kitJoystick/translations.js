/* Module labels are complete for the desktop app's four enabled locales. */
function getInterfaceTranslations () {
    return {
    "en": {
        "kitJoystick.name": "XY Joystick",
        "kitJoystick.description": "Blocks for XY Joystick on Arduino / ESP32."
    },
    "ru": {
        "kitJoystick.name": "Джойстик XY",
        "kitJoystick.description": "Блоки Arduino / ESP32 для модуля «Джойстик XY»."
    },
    "zh-cn": {
        "kitJoystick.name": "XY 摇杆",
        "kitJoystick.description": "Arduino／ESP32通用的XY 摇杆积木。"
    },
    "zh-tw": {
        "kitJoystick.name": "XY 搖桿",
        "kitJoystick.description": "Arduino／ESP32共用的XY 搖桿積木。"
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
            "INIT_GUARD_LABEL_KITJOYSTICK": "XY Joystick"
        },
        "ru": {
            "INIT_GUARD_TUBIT_REQUIRED": "Поместите блок «Инициализация TUBIT» под блоком «когда Arduino запускается».",
            "INIT_GUARD_SENSOR_REQUIRED": "Поместите блок «Инициализация: %1 %2» под блоком «когда Arduino запускается» перед блоками чтения или использования модуля.",
            "INIT_GUARD_INIT_PLACEMENT": "Поместите блок «Инициализация: %1 %2» непосредственно под блоком «когда Arduino запускается», перед циклами и условиями.",
            "INIT_GUARD_OLED_REQUIRED": "Сначала добавьте блок вывода на OLED и поместите блоки рисования внутрь него либо разместите перед ними блок очистки или обновления дисплея.",
            "INIT_GUARD_PIN_SUFFIX": "контакт %1",
            "INIT_GUARD_INVALID_ID": "Введите неотрицательный целый номер модуля.",
            "INIT_GUARD_LABEL_KITJOYSTICK": "Джойстик XY"
        },
        "zh-cn": {
            "INIT_GUARD_TUBIT_REQUIRED": "请在Arduino启动的积木底下放置\"TUBIT初始化\"积木",
            "INIT_GUARD_SENSOR_REQUIRED": "请在Arduino启动的积木底下放置\"%1%2初始化\"积木，并放在读取／使用积木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "请将\"%1%2初始化\"积木直接放在Arduino启动底下，且放在重复执行或条件判断之前。",
            "INIT_GUARD_OLED_REQUIRED": "请先放置OLED显示积木，并将绘图积木放在其内，或先放清除／更新显示积木。",
            "INIT_GUARD_PIN_SUFFIX": "引脚%1",
            "INIT_GUARD_INVALID_ID": "模组编号请输入非负整数。",
            "INIT_GUARD_LABEL_KITJOYSTICK": "XY 摇杆"
        },
        "zh-tw": {
            "INIT_GUARD_TUBIT_REQUIRED": "請在Arduino啟動的積木底下放置\"TUBIT初始化\"積木",
            "INIT_GUARD_SENSOR_REQUIRED": "請在Arduino啟動的積木底下放置\"%1%2初始化\"積木，並放在讀取／使用積木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "請將\"%1%2初始化\"積木直接放在Arduino啟動底下，且放在重複執行或條件判斷之前。",
            "INIT_GUARD_OLED_REQUIRED": "請先放置OLED顯示積木，並將繪圖積木放在其內，或先放清除／更新顯示積木。",
            "INIT_GUARD_PIN_SUFFIX": "腳位%1",
            "INIT_GUARD_INVALID_ID": "模組編號請輸入非負整數。",
            "INIT_GUARD_LABEL_KITJOYSTICK": "XY 搖桿"
        }
    };
    Object.keys(__initGuardMessages).forEach(function (locale) {
        if (!Blockly.ScratchMsgs.locales[locale]) Blockly.ScratchMsgs.locales[locale] = {};
        Object.assign(Blockly.ScratchMsgs.locales[locale], __initGuardMessages[locale]);
    });

    const messages = {
    "en": {
        "KITJOYSTICK_CATEGORY": "XY Joystick",
        "KITJOYSTICK_BEGIN": "joystick %1 initialize X %2 Y %3 SW %4",
        "KITJOYSTICK_UPDATE": "joystick %1 update",
        "KITJOYSTICK_RAW": "read %1 joystick axis %2 value",
        "KITJOYSTICK_PERCENT": "read %1 joystick axis %2 value (0–100) reversed %3",
        "KITJOYSTICK_PRESSED": "read %1 joystick button value",
        "KITJOYSTICK_JUST_PRESSED": "read %1 joystick newly pressed value",
        "KITJOYSTICK_JUST_RELEASED": "read %1 joystick newly released value",
        "KITJOYSTICK_NONE": "none",
        "KITJOYSTICK_ON": "on",
        "KITJOYSTICK_OFF": "off",
        "KITJOYSTICK_BEGIN_TIP": "Enter a nonnegative whole-number ID. ADC defaults follow Arduino / ESP32 without changing global resolution.",
        "KITJOYSTICK_UPDATE_TIP": "Update once each loop before reading. The next update clears edge events. Button debounce is 20 ms.",
        "KITJOYSTICK_PERCENT_TIP": "ADC range scaled to 0..100, center near 50. Reverse swaps the ends; physical voltage and ADC attenuation may affect the range.",
        "KITMODULE_ERROR_ID": "Enter a non-negative whole-number module ID.",
        "KITMODULE_ERROR_PIN": "Select a valid pin.",
        "KITMODULE_ERROR_OPTION": "Select a valid setting.",
        "KITMODULE_ERROR_CONFLICT": "The same module number has conflicting initialization settings.",
        "KITMODULE_ERROR_DUPLICATE_PIN": "Use different pins for these signals."
    },
    "zh-tw": {
        "KITJOYSTICK_CATEGORY": "XY 搖桿",
        "KITJOYSTICK_BEGIN": "搖桿%1初始化 X%2 Y%3 按鈕SW%4",
        "KITJOYSTICK_UPDATE": "搖桿 %1 更新狀態",
        "KITJOYSTICK_RAW": "讀取%1 搖桿%2軸數值",
        "KITJOYSTICK_PERCENT": "讀取%1 搖桿%2軸數值（0～100）反轉%3",
        "KITJOYSTICK_PRESSED": "讀取%1 搖桿按鈕數值",
        "KITJOYSTICK_JUST_PRESSED": "讀取%1 搖桿按鈕剛按下數值",
        "KITJOYSTICK_JUST_RELEASED": "讀取%1 搖桿按鈕剛放開數值",
        "KITJOYSTICK_NONE": "不使用按鈕",
        "KITJOYSTICK_ON": "開啟",
        "KITJOYSTICK_OFF": "關閉",
        "KITJOYSTICK_BEGIN_TIP": "編號可自行輸入非負整數。Arduino／ESP32自動選用預設ADC刻度，不更改全域ADC設定。",
        "KITJOYSTICK_UPDATE_TIP": "每輪先更新再讀快取。下次更新清除瞬間事件。按鈕去彈跳20毫秒。",
        "KITJOYSTICK_PERCENT_TIP": "依ADC位數換算0～100，中心約50；反轉交換兩端。實際電壓與ADC衰減影響行程。",
        "KITMODULE_ERROR_ID": "模組編號請輸入非負整數。",
        "KITMODULE_ERROR_PIN": "請選擇有效腳位。",
        "KITMODULE_ERROR_OPTION": "請選擇有效設定。",
        "KITMODULE_ERROR_CONFLICT": "相同模組編號有互相衝突的初始化設定。",
        "KITMODULE_ERROR_DUPLICATE_PIN": "各訊號必須使用不同腳位。"
    },
    "ru": {
        "KITJOYSTICK_ON": "включить",
        "KITJOYSTICK_OFF": "выключить",
        "KITJOYSTICK_NONE": "кнопка не используется",
        "KITJOYSTICK_CATEGORY": "Джойстик XY",
        "KITJOYSTICK_BEGIN": "инициализировать джойстик %1 X %2 Y %3 SW %4",
        "KITJOYSTICK_UPDATE": "обновить джойстик %1",
        "KITJOYSTICK_RAW": "прочитать значение оси %2 джойстика %1",
        "KITJOYSTICK_PERCENT": "прочитать значение оси %2 джойстика %1 (0–100), инверсия %3",
        "KITJOYSTICK_PRESSED": "прочитать значение кнопки джойстика %1",
        "KITJOYSTICK_JUST_PRESSED": "прочитать новое нажатие кнопки джойстика %1",
        "KITJOYSTICK_JUST_RELEASED": "прочитать новое отпускание кнопки джойстика %1",
        "KITJOYSTICK_BEGIN_TIP": "Введите неотрицательный целый номер. Диапазон АЦП выбирается для Arduino или ESP32 без изменения общей настройки разрешения.",
        "KITJOYSTICK_UPDATE_TIP": "Обновляйте один раз за проход цикла перед чтением. Следующее обновление очищает события. Подавление дребезга кнопки — 20 мс.",
        "KITJOYSTICK_PERCENT_TIP": "Диапазон АЦП приводится к 0–100, центр около 50. Инверсия меняет концы местами. Напряжение и ослабление АЦП влияют на диапазон.",
        "KITMODULE_ERROR_ID": "Введите неотрицательный целый номер модуля.",
        "KITMODULE_ERROR_PIN": "Выберите допустимый контакт.",
        "KITMODULE_ERROR_OPTION": "Выберите допустимую настройку.",
        "KITMODULE_ERROR_CONFLICT": "Для одного номера модуля заданы разные настройки инициализации.",
        "KITMODULE_ERROR_DUPLICATE_PIN": "Для этих сигналов нужны разные контакты."
    },
    "zh-cn": {
        "KITJOYSTICK_CATEGORY": "XY 摇杆",
        "KITJOYSTICK_BEGIN": "摇杆%1初始化 X%2 Y%3 按钮SW%4",
        "KITJOYSTICK_UPDATE": "摇杆 %1 更新状态",
        "KITJOYSTICK_RAW": "读取%1 摇杆%2轴数值",
        "KITJOYSTICK_PERCENT": "读取%1 摇杆%2轴数值（0～100）反转%3",
        "KITJOYSTICK_PRESSED": "读取%1 摇杆按钮数值",
        "KITJOYSTICK_JUST_PRESSED": "读取%1 摇杆按钮刚按下数值",
        "KITJOYSTICK_JUST_RELEASED": "读取%1 摇杆按钮刚放开数值",
        "KITJOYSTICK_NONE": "不使用按钮",
        "KITJOYSTICK_ON": "开启",
        "KITJOYSTICK_OFF": "关闭",
        "KITJOYSTICK_BEGIN_TIP": "编号可自行输入非负整数。Arduino／ESP32自动选用预设ADC刻度，不更改全域ADC设定。",
        "KITJOYSTICK_UPDATE_TIP": "每轮先更新再读快取。下次更新清除瞬间事件。按钮消抖20毫秒。",
        "KITJOYSTICK_PERCENT_TIP": "依ADC位数换算0～100，中心约50；反转交换两端。实际电压与ADC衰减影响行程。",
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
