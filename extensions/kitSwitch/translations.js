/* Module labels are complete for the desktop app's four enabled locales. */
function getInterfaceTranslations () {
    return {
    "en": {
        "kitSwitch.name": "Tilt / Mercury / Reed Switch",
        "kitSwitch.description": "Blocks for Tilt / Mercury / Reed Switch on Arduino / ESP32."
    },
    "ru": {
        "kitSwitch.name": "Датчик наклона / ртутный / геркон",
        "kitSwitch.description": "Блоки Arduino / ESP32 для модуля «Датчик наклона / ртутный / геркон»."
    },
    "zh-cn": {
        "kitSwitch.name": "倾斜／水银／磁簧开关",
        "kitSwitch.description": "Arduino／ESP32通用的倾斜／水银／磁簧开关积木。"
    },
    "zh-tw": {
        "kitSwitch.name": "傾斜／水銀／磁簧開關",
        "kitSwitch.description": "Arduino／ESP32共用的傾斜／水銀／磁簧開關積木。"
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
            "INIT_GUARD_LABEL_KITSWITCH": "Tilt / Mercury / Reed Switch"
        },
        "ru": {
            "INIT_GUARD_TUBIT_REQUIRED": "Поместите блок «Инициализация TUBIT» под блоком «когда Arduino запускается».",
            "INIT_GUARD_SENSOR_REQUIRED": "Поместите блок «Инициализация: %1 %2» под блоком «когда Arduino запускается» перед блоками чтения или использования модуля.",
            "INIT_GUARD_INIT_PLACEMENT": "Поместите блок «Инициализация: %1 %2» непосредственно под блоком «когда Arduino запускается», перед циклами и условиями.",
            "INIT_GUARD_OLED_REQUIRED": "Сначала добавьте блок вывода на OLED и поместите блоки рисования внутрь него либо разместите перед ними блок очистки или обновления дисплея.",
            "INIT_GUARD_PIN_SUFFIX": "контакт %1",
            "INIT_GUARD_INVALID_ID": "Введите неотрицательный целый номер модуля.",
            "INIT_GUARD_LABEL_KITSWITCH": "Датчик наклона / ртутный / геркон"
        },
        "zh-cn": {
            "INIT_GUARD_TUBIT_REQUIRED": "请在Arduino启动的积木底下放置\"TUBIT初始化\"积木",
            "INIT_GUARD_SENSOR_REQUIRED": "请在Arduino启动的积木底下放置\"%1%2初始化\"积木，并放在读取／使用积木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "请将\"%1%2初始化\"积木直接放在Arduino启动底下，且放在重复执行或条件判断之前。",
            "INIT_GUARD_OLED_REQUIRED": "请先放置OLED显示积木，并将绘图积木放在其内，或先放清除／更新显示积木。",
            "INIT_GUARD_PIN_SUFFIX": "引脚%1",
            "INIT_GUARD_INVALID_ID": "模组编号请输入非负整数。",
            "INIT_GUARD_LABEL_KITSWITCH": "倾斜／水银／磁簧开关"
        },
        "zh-tw": {
            "INIT_GUARD_TUBIT_REQUIRED": "請在Arduino啟動的積木底下放置\"TUBIT初始化\"積木",
            "INIT_GUARD_SENSOR_REQUIRED": "請在Arduino啟動的積木底下放置\"%1%2初始化\"積木，並放在讀取／使用積木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "請將\"%1%2初始化\"積木直接放在Arduino啟動底下，且放在重複執行或條件判斷之前。",
            "INIT_GUARD_OLED_REQUIRED": "請先放置OLED顯示積木，並將繪圖積木放在其內，或先放清除／更新顯示積木。",
            "INIT_GUARD_PIN_SUFFIX": "腳位%1",
            "INIT_GUARD_INVALID_ID": "模組編號請輸入非負整數。",
            "INIT_GUARD_LABEL_KITSWITCH": "傾斜／水銀／磁簧開關"
        }
    };
    Object.keys(__initGuardMessages).forEach(function (locale) {
        if (!Blockly.ScratchMsgs.locales[locale]) Blockly.ScratchMsgs.locales[locale] = {};
        Object.assign(Blockly.ScratchMsgs.locales[locale], __initGuardMessages[locale]);
    });

    const messages = {
    "en": {
        "KITSWITCH_CATEGORY": "Tilt / Mercury / Reed Switch",
        "KITSWITCH_BEGIN": "switch %1 initialize type %2 pin %3 active level %4",
        "KITSWITCH_UPDATE": "switch sensor %1 update",
        "KITSWITCH_ACTIVE": "read %1 switch sensor value",
        "KITSWITCH_JUST_ACTIVATED": "read %1 switch sensor newly active value",
        "KITSWITCH_JUST_RELEASED": "read %1 switch sensor newly released value",
        "KITSWITCH_RAW": "read %1 switch sensor raw value (0/1)",
        "KITSWITCH_HIGH": "HIGH",
        "KITSWITCH_LOW": "LOW",
        "KITSWITCH_ON": "on",
        "KITSWITCH_OFF": "off",
        "KITSWITCH_BEGIN_TIP": "Enter a nonnegative whole-number ID. Internal pull-up and suitable switch debounce are automatic.",
        "KITSWITCH_UPDATE_TIP": "Update once each loop before reading. Next update clears edge events.",
        "KITSWITCH_READ_TIP": "Samples when read; no update block is needed. Read repeatedly in the main loop.",
        "KITSWITCH_TILT": "tilt switch",
        "KITSWITCH_MERCURY": "mercury switch",
        "KITSWITCH_REED": "reed switch",
        "KITMODULE_ERROR_ID": "Enter a non-negative whole-number module ID.",
        "KITMODULE_ERROR_PIN": "Select a valid pin.",
        "KITMODULE_ERROR_OPTION": "Select a valid setting.",
        "KITMODULE_ERROR_CONFLICT": "The same module number has conflicting initialization settings.",
        "KITMODULE_ERROR_DUPLICATE_PIN": "Use different pins for these signals."
    },
    "zh-tw": {
        "KITSWITCH_CATEGORY": "傾斜／水銀／磁簧開關",
        "KITSWITCH_BEGIN": "開關感測器%1初始化 類型%2 腳位%3 觸發電位%4",
        "KITSWITCH_UPDATE": "開關感測器（%1）更新狀態",
        "KITSWITCH_ACTIVE": "讀取%1 開關感測器數值",
        "KITSWITCH_JUST_ACTIVATED": "讀取%1 開關感測器剛觸發數值",
        "KITSWITCH_JUST_RELEASED": "讀取%1 開關感測器剛解除數值",
        "KITSWITCH_RAW": "讀取%1 開關感測器原始數值（0／1）",
        "KITSWITCH_HIGH": "高電位 HIGH",
        "KITSWITCH_LOW": "低電位 LOW",
        "KITSWITCH_ON": "開啟",
        "KITSWITCH_OFF": "關閉",
        "KITSWITCH_BEGIN_TIP": "編號可自行輸入非負整數。內建上拉；按鈕與接點開關自動去彈跳。",
        "KITSWITCH_UPDATE_TIP": "每輪先更新，再讀狀態。下一次更新會清除瞬間事件。",
        "KITSWITCH_READ_TIP": "讀取時自動採樣，不需更新狀態積木。放在迴圈持續讀取。",
        "KITSWITCH_TILT": "傾斜開關",
        "KITSWITCH_MERCURY": "水銀開關",
        "KITSWITCH_REED": "磁簧開關",
        "KITMODULE_ERROR_ID": "模組編號請輸入非負整數。",
        "KITMODULE_ERROR_PIN": "請選擇有效腳位。",
        "KITMODULE_ERROR_OPTION": "請選擇有效設定。",
        "KITMODULE_ERROR_CONFLICT": "相同模組編號有互相衝突的初始化設定。",
        "KITMODULE_ERROR_DUPLICATE_PIN": "各訊號必須使用不同腳位。"
    },
    "ru": {
        "KITSWITCH_HIGH": "HIGH",
        "KITSWITCH_LOW": "LOW",
        "KITSWITCH_ON": "включить",
        "KITSWITCH_OFF": "выключить",
        "KITSWITCH_CATEGORY": "Датчик наклона / ртутный / геркон",
        "KITSWITCH_BEGIN": "инициализировать переключатель %1 тип %2 контакт %3 активный уровень %4",
        "KITSWITCH_UPDATE": "обновить датчика переключателя %1",
        "KITSWITCH_ACTIVE": "прочитать значение датчика переключателя %1",
        "KITSWITCH_JUST_ACTIVATED": "прочитать новое срабатывание датчика переключателя %1",
        "KITSWITCH_JUST_RELEASED": "прочитать новое отключение датчика переключателя %1",
        "KITSWITCH_RAW": "прочитать исходное значение датчика переключателя %1 (0/1)",
        "KITSWITCH_BEGIN_TIP": "Введите неотрицательный целый номер модуля. Подтяжка и подходящее подавление дребезга настраиваются автоматически.",
        "KITSWITCH_UPDATE_TIP": "Обновляйте один раз за проход цикла перед чтением. Следующее обновление очищает события перехода.",
        "KITSWITCH_READ_TIP": "Значение измеряется при чтении. Блок обновления не нужен; читайте значение в основном цикле.",
        "KITSWITCH_TILT": "датчик наклона",
        "KITSWITCH_MERCURY": "ртутный переключатель",
        "KITSWITCH_REED": "геркон",
        "KITMODULE_ERROR_ID": "Введите неотрицательный целый номер модуля.",
        "KITMODULE_ERROR_PIN": "Выберите допустимый контакт.",
        "KITMODULE_ERROR_OPTION": "Выберите допустимую настройку.",
        "KITMODULE_ERROR_CONFLICT": "Для одного номера модуля заданы разные настройки инициализации.",
        "KITMODULE_ERROR_DUPLICATE_PIN": "Для этих сигналов нужны разные контакты."
    },
    "zh-cn": {
        "KITSWITCH_CATEGORY": "倾斜／水银／磁簧开关",
        "KITSWITCH_BEGIN": "开关感测器%1初始化 类型%2 引脚%3 触发电位%4",
        "KITSWITCH_UPDATE": "开关感测器（%1）更新状态",
        "KITSWITCH_ACTIVE": "读取%1 开关感测器数值",
        "KITSWITCH_JUST_ACTIVATED": "读取%1 开关感测器刚触发数值",
        "KITSWITCH_JUST_RELEASED": "读取%1 开关感测器刚解除数值",
        "KITSWITCH_RAW": "读取%1 开关感测器原始数值（0／1）",
        "KITSWITCH_HIGH": "高电位 HIGH",
        "KITSWITCH_LOW": "低电位 LOW",
        "KITSWITCH_ON": "开启",
        "KITSWITCH_OFF": "关闭",
        "KITSWITCH_BEGIN_TIP": "编号可自行输入非负整数。内建上拉；按钮与接点开关自动消抖。",
        "KITSWITCH_UPDATE_TIP": "每轮先更新，再读状态。下一次更新会清除瞬间事件。",
        "KITSWITCH_READ_TIP": "读取时自动采样，不需更新状态积木。放在回圈持续读取。",
        "KITSWITCH_TILT": "倾斜开关",
        "KITSWITCH_MERCURY": "水银开关",
        "KITSWITCH_REED": "磁簧开关",
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
