/* Module labels are complete for the desktop app's four enabled locales. */
function getInterfaceTranslations () {
    return {
    "en": {
        "kitTemperature.name": "Temperature Sensor",
        "kitTemperature.description": "Blocks for Temperature Sensor on Arduino / ESP32."
    },
    "ru": {
        "kitTemperature.name": "Датчик температуры",
        "kitTemperature.description": "Блоки Arduino / ESP32 для модуля «Датчик температуры»."
    },
    "zh-cn": {
        "kitTemperature.name": "温度感测器",
        "kitTemperature.description": "Arduino／ESP32通用的温度感测器积木。"
    },
    "zh-tw": {
        "kitTemperature.name": "溫度感測器",
        "kitTemperature.description": "Arduino／ESP32共用的溫度感測器積木。"
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
            "INIT_GUARD_LABEL_KITTEMPERATURE": "Temperature Sensor"
        },
        "ru": {
            "INIT_GUARD_TUBIT_REQUIRED": "Поместите блок «Инициализация TUBIT» под блоком «когда Arduino запускается».",
            "INIT_GUARD_SENSOR_REQUIRED": "Поместите блок «Инициализация: %1 %2» под блоком «когда Arduino запускается» перед блоками чтения или использования модуля.",
            "INIT_GUARD_INIT_PLACEMENT": "Поместите блок «Инициализация: %1 %2» непосредственно под блоком «когда Arduino запускается», перед циклами и условиями.",
            "INIT_GUARD_OLED_REQUIRED": "Сначала добавьте блок вывода на OLED и поместите блоки рисования внутрь него либо разместите перед ними блок очистки или обновления дисплея.",
            "INIT_GUARD_PIN_SUFFIX": "контакт %1",
            "INIT_GUARD_INVALID_ID": "Введите неотрицательный целый номер модуля.",
            "INIT_GUARD_LABEL_KITTEMPERATURE": "Датчик температуры"
        },
        "zh-cn": {
            "INIT_GUARD_TUBIT_REQUIRED": "请在Arduino启动的积木底下放置\"TUBIT初始化\"积木",
            "INIT_GUARD_SENSOR_REQUIRED": "请在Arduino启动的积木底下放置\"%1%2初始化\"积木，并放在读取／使用积木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "请将\"%1%2初始化\"积木直接放在Arduino启动底下，且放在重复执行或条件判断之前。",
            "INIT_GUARD_OLED_REQUIRED": "请先放置OLED显示积木，并将绘图积木放在其内，或先放清除／更新显示积木。",
            "INIT_GUARD_PIN_SUFFIX": "引脚%1",
            "INIT_GUARD_INVALID_ID": "模组编号请输入非负整数。",
            "INIT_GUARD_LABEL_KITTEMPERATURE": "温度感测器"
        },
        "zh-tw": {
            "INIT_GUARD_TUBIT_REQUIRED": "請在Arduino啟動的積木底下放置\"TUBIT初始化\"積木",
            "INIT_GUARD_SENSOR_REQUIRED": "請在Arduino啟動的積木底下放置\"%1%2初始化\"積木，並放在讀取／使用積木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "請將\"%1%2初始化\"積木直接放在Arduino啟動底下，且放在重複執行或條件判斷之前。",
            "INIT_GUARD_OLED_REQUIRED": "請先放置OLED顯示積木，並將繪圖積木放在其內，或先放清除／更新顯示積木。",
            "INIT_GUARD_PIN_SUFFIX": "腳位%1",
            "INIT_GUARD_INVALID_ID": "模組編號請輸入非負整數。",
            "INIT_GUARD_LABEL_KITTEMPERATURE": "溫度感測器"
        }
    };
    Object.keys(__initGuardMessages).forEach(function (locale) {
        if (!Blockly.ScratchMsgs.locales[locale]) Blockly.ScratchMsgs.locales[locale] = {};
        Object.assign(Blockly.ScratchMsgs.locales[locale], __initGuardMessages[locale]);
    });

    const messages = {
    "en": {
        "KITTEMPERATURE_CATEGORY": "Temperature Sensor",
        "KITTEMPERATURE_BEGIN": "temperature sensor %1 initialize AO %2 DO %3 active level %4",
        "KITTEMPERATURE_CONFIGURE": "temperature %1 NTC R at nominal %2 Ω B %3 series R %4 Ω nominal °C %5",
        "KITTEMPERATURE_RAW": "read %1 temperature sensor analog value (0–1023)",
        "KITTEMPERATURE_NATIVE": "read %1 temperature sensor native ADC value",
        "KITTEMPERATURE_CELSIUS": "read %1 temperature sensor value (°C) NTC connected to %2",
        "KITTEMPERATURE_THRESHOLD": "read %1 temperature sensor digital threshold value",
        "KITTEMPERATURE_BEGIN_TIP": "Enter a non-negative module number. The analog input is required; the digital threshold input is optional. ADC scaling follows the selected board.",
        "KITTEMPERATURE_CELSIUS_TIP": "For an NTC divider. Calibrate the component values and select divider orientation. Open or short inputs return NaN.",
        "KITTEMPERATURE_NONE": "not connected",
        "KITTEMPERATURE_HIGH": "HIGH",
        "KITTEMPERATURE_LOW": "LOW",
        "KITTEMPERATURE_GROUND": "GND",
        "KITTEMPERATURE_VCC": "VCC",
        "KITMODULE_ERROR_ID": "Enter a non-negative whole-number module ID.",
        "KITMODULE_ERROR_PIN": "Select a valid pin.",
        "KITMODULE_ERROR_OPTION": "Select a valid setting.",
        "KITMODULE_ERROR_CONFLICT": "The same module number has conflicting initialization settings.",
        "KITMODULE_ERROR_DUPLICATE_PIN": "Use different pins for these signals."
    },
    "zh-tw": {
        "KITTEMPERATURE_CATEGORY": "溫度感測器",
        "KITTEMPERATURE_BEGIN": "溫度感測器%1初始化 AO%2 DO%3 觸發電位%4",
        "KITTEMPERATURE_CONFIGURE": "溫度模組 %1 NTC 標稱電阻 %2 Ω B 值 %3 分壓電阻 %4 Ω 標稱溫度 %5 °C",
        "KITTEMPERATURE_RAW": "讀取%1 溫度感測器類比數值（0～1023）",
        "KITTEMPERATURE_NATIVE": "讀取%1 溫度感測器原始ADC數值",
        "KITTEMPERATURE_CELSIUS": "讀取%1 溫度感測器數值（°C）NTC接%2",
        "KITTEMPERATURE_THRESHOLD": "讀取%1 溫度感測器數位門檻數值",
        "KITTEMPERATURE_BEGIN_TIP": "編號可自行輸入非負整數。使用類比輸入，數位門檻輸入可不接；自動配合控制板ADC刻度。",
        "KITTEMPERATURE_CELSIUS_TIP": "適用NTC分壓電路。請校準元件值並選擇NTC位置；開路或短路回傳NaN。",
        "KITTEMPERATURE_NONE": "不接",
        "KITTEMPERATURE_HIGH": "高電位",
        "KITTEMPERATURE_LOW": "低電位",
        "KITTEMPERATURE_GROUND": "GND",
        "KITTEMPERATURE_VCC": "VCC",
        "KITMODULE_ERROR_ID": "模組編號請輸入非負整數。",
        "KITMODULE_ERROR_PIN": "請選擇有效腳位。",
        "KITMODULE_ERROR_OPTION": "請選擇有效設定。",
        "KITMODULE_ERROR_CONFLICT": "相同模組編號有互相衝突的初始化設定。",
        "KITMODULE_ERROR_DUPLICATE_PIN": "各訊號必須使用不同腳位。"
    },
    "ru": {
        "KITTEMPERATURE_HIGH": "HIGH",
        "KITTEMPERATURE_LOW": "LOW",
        "KITTEMPERATURE_GROUND": "GND",
        "KITTEMPERATURE_VCC": "VCC",
        "KITTEMPERATURE_NONE": "не подключено",
        "KITTEMPERATURE_CATEGORY": "Датчик температуры",
        "KITTEMPERATURE_BEGIN": "инициализировать датчик температуры %1 AO %2 DO %3 активный уровень %4",
        "KITTEMPERATURE_CONFIGURE": "датчик температуры %1: R при номинале %2 Ω, B %3, последовательное R %4 Ω, номинал %5 °C",
        "KITTEMPERATURE_RAW": "прочитать аналоговое значение датчика температуры %1 (0–1023)",
        "KITTEMPERATURE_NATIVE": "прочитать исходное значение АЦП датчика температуры %1",
        "KITTEMPERATURE_CELSIUS": "прочитать температуру датчика %1 (°C), NTC подключён к %2",
        "KITTEMPERATURE_THRESHOLD": "прочитать цифровое пороговое значение датчика температуры %1",
        "KITTEMPERATURE_BEGIN_TIP": "Введите неотрицательный номер модуля. Аналоговый вход обязателен, цифровой пороговый вход можно не подключать. Диапазон АЦП выбирается по плате.",
        "KITTEMPERATURE_CELSIUS_TIP": "Для делителя с NTC. Уточните параметры компонентов и положение термистора. При обрыве или коротком замыкании возвращается NaN.",
        "KITMODULE_ERROR_ID": "Введите неотрицательный целый номер модуля.",
        "KITMODULE_ERROR_PIN": "Выберите допустимый контакт.",
        "KITMODULE_ERROR_OPTION": "Выберите допустимую настройку.",
        "KITMODULE_ERROR_CONFLICT": "Для одного номера модуля заданы разные настройки инициализации.",
        "KITMODULE_ERROR_DUPLICATE_PIN": "Для этих сигналов нужны разные контакты."
    },
    "zh-cn": {
        "KITTEMPERATURE_CATEGORY": "温度感测器",
        "KITTEMPERATURE_BEGIN": "温度感测器%1初始化 AO%2 DO%3 触发电位%4",
        "KITTEMPERATURE_CONFIGURE": "温度模块 %1 NTC 标称电阻 %2 Ω B 值 %3 分压电阻 %4 Ω 标称温度 %5 °C",
        "KITTEMPERATURE_RAW": "读取%1 温度感测器模拟数值（0～1023）",
        "KITTEMPERATURE_NATIVE": "读取%1 温度感测器原始ADC数值",
        "KITTEMPERATURE_CELSIUS": "读取%1 温度感测器数值（°C）NTC接%2",
        "KITTEMPERATURE_THRESHOLD": "读取%1 温度感测器数位门槛数值",
        "KITTEMPERATURE_BEGIN_TIP": "编号可自行输入非负整数。使用模拟输入，数位门槛输入可不接；自动配合控制板ADC刻度。",
        "KITTEMPERATURE_CELSIUS_TIP": "适用NTC分压电路。请校准元件值并选择NTC位置；开路或短路回传NaN。",
        "KITTEMPERATURE_NONE": "不接",
        "KITTEMPERATURE_HIGH": "高电位",
        "KITTEMPERATURE_LOW": "低电位",
        "KITTEMPERATURE_GROUND": "GND",
        "KITTEMPERATURE_VCC": "VCC",
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
