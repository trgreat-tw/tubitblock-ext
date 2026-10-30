/* Module labels are complete for the desktop app's four enabled locales. */
function getInterfaceTranslations () {
    return {
    "en": {
        "kitRGB.name": "RGB LED",
        "kitRGB.description": "Blocks for RGB LED on Arduino / ESP32."
    },
    "ru": {
        "kitRGB.name": "Светодиод RGB",
        "kitRGB.description": "Блоки Arduino / ESP32 для модуля «Светодиод RGB»."
    },
    "zh-cn": {
        "kitRGB.name": "RGB LED",
        "kitRGB.description": "Arduino／ESP32通用的RGB LED积木。"
    },
    "zh-tw": {
        "kitRGB.name": "RGB LED",
        "kitRGB.description": "Arduino／ESP32共用的RGB LED積木。"
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
            "INIT_GUARD_LABEL_KITRGB": "RGB LED"
        },
        "ru": {
            "INIT_GUARD_TUBIT_REQUIRED": "Поместите блок «Инициализация TUBIT» под блоком «когда Arduino запускается».",
            "INIT_GUARD_SENSOR_REQUIRED": "Поместите блок «Инициализация: %1 %2» под блоком «когда Arduino запускается» перед блоками чтения или использования модуля.",
            "INIT_GUARD_INIT_PLACEMENT": "Поместите блок «Инициализация: %1 %2» непосредственно под блоком «когда Arduino запускается», перед циклами и условиями.",
            "INIT_GUARD_OLED_REQUIRED": "Сначала добавьте блок вывода на OLED и поместите блоки рисования внутрь него либо разместите перед ними блок очистки или обновления дисплея.",
            "INIT_GUARD_PIN_SUFFIX": "контакт %1",
            "INIT_GUARD_INVALID_ID": "Введите неотрицательный целый номер модуля.",
            "INIT_GUARD_LABEL_KITRGB": "Светодиод RGB"
        },
        "zh-cn": {
            "INIT_GUARD_TUBIT_REQUIRED": "请在Arduino启动的积木底下放置\"TUBIT初始化\"积木",
            "INIT_GUARD_SENSOR_REQUIRED": "请在Arduino启动的积木底下放置\"%1%2初始化\"积木，并放在读取／使用积木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "请将\"%1%2初始化\"积木直接放在Arduino启动底下，且放在重复执行或条件判断之前。",
            "INIT_GUARD_OLED_REQUIRED": "请先放置OLED显示积木，并将绘图积木放在其内，或先放清除／更新显示积木。",
            "INIT_GUARD_PIN_SUFFIX": "引脚%1",
            "INIT_GUARD_INVALID_ID": "模组编号请输入非负整数。",
            "INIT_GUARD_LABEL_KITRGB": "RGB LED"
        },
        "zh-tw": {
            "INIT_GUARD_TUBIT_REQUIRED": "請在Arduino啟動的積木底下放置\"TUBIT初始化\"積木",
            "INIT_GUARD_SENSOR_REQUIRED": "請在Arduino啟動的積木底下放置\"%1%2初始化\"積木，並放在讀取／使用積木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "請將\"%1%2初始化\"積木直接放在Arduino啟動底下，且放在重複執行或條件判斷之前。",
            "INIT_GUARD_OLED_REQUIRED": "請先放置OLED顯示積木，並將繪圖積木放在其內，或先放清除／更新顯示積木。",
            "INIT_GUARD_PIN_SUFFIX": "腳位%1",
            "INIT_GUARD_INVALID_ID": "模組編號請輸入非負整數。",
            "INIT_GUARD_LABEL_KITRGB": "RGB LED"
        }
    };
    Object.keys(__initGuardMessages).forEach(function (locale) {
        if (!Blockly.ScratchMsgs.locales[locale]) Blockly.ScratchMsgs.locales[locale] = {};
        Object.assign(Blockly.ScratchMsgs.locales[locale], __initGuardMessages[locale]);
    });

    const messages = {
    "en": {
        "KITRGB_NO_PINS": "Select a supported Arduino or ESP32 device first.",
        "KITRGB_INVALID_OPTION": "Invalid option.",
        "KITRGB_INVALID_ID": "Enter a non-negative whole number for the module number.",
        "KITRGB_INVALID_PIN": "Select a valid output pin.",
        "KITRGB_CONFLICT": "One module ID has conflicting initialization settings.",
        "KITRGB_CATEGORY": "RGB LED",
        "KITRGB_BEGIN": "RGB LED %1 initialize R %2 G %3 B %4 type %5",
        "KITRGB_CATHODE": "common cathode (-)",
        "KITRGB_ANODE": "common anode (+)",
        "KITRGB_COLOR": "RGB LED %1 set R %2 G %3 B %4 (0-255)",
        "KITRGB_OFF": "RGB LED %1 off",
        "KITRGB_READY": "read %1 RGB LED ready value",
        "KITRGB_BEGIN_TIP": "Use three different PWM output pins. Initialization is generated in setup().",
        "KITRGB_COLOR_TIP": "Values are clamped to 0-255. This is an ordinary RGB LED, not a WS2812 LED strip.",
        "KITRGB_DUPLICATE_PIN": "RGB LED: R, G and B must use different PWM pins.",
        "KITMODULE_ERROR_ID": "Enter a non-negative whole-number module ID.",
        "KITMODULE_ERROR_PIN": "Select a valid pin.",
        "KITMODULE_ERROR_OPTION": "Select a valid setting.",
        "KITMODULE_ERROR_CONFLICT": "The same module number has conflicting initialization settings.",
        "KITMODULE_ERROR_DUPLICATE_PIN": "Use different pins for these signals."
    },
    "zh-tw": {
        "KITRGB_NO_PINS": "請先選擇支援的 Arduino 或 ESP32 控制板。",
        "KITRGB_INVALID_OPTION": "選項無效。",
        "KITRGB_INVALID_ID": "RGB LED：模組編號請輸入 0 或正整數。",
        "KITRGB_INVALID_PIN": "請選擇有效輸出腳位。",
        "KITRGB_CONFLICT": "相同模組編號有互相衝突的初始化設定。",
        "KITRGB_CATEGORY": "RGB LED",
        "KITRGB_BEGIN": "RGB LED%1初始化 R%2 G%3 B%4 類型%5",
        "KITRGB_CATHODE": "共陰極（－）",
        "KITRGB_ANODE": "共陽極（＋）",
        "KITRGB_COLOR": "RGB LED %1 設定 紅 %2 綠 %3 藍 %4（0～255）",
        "KITRGB_OFF": "RGB LED %1 關閉",
        "KITRGB_READY": "讀取%1 RGB LED初始化狀態數值",
        "KITRGB_BEGIN_TIP": "請選三個不同的 PWM 輸出腳位；初始化產生於 setup()。",
        "KITRGB_COLOR_TIP": "數值限制在 0～255；適用一般 RGB 模組，不適用 WS2812 燈條。",
        "KITRGB_DUPLICATE_PIN": "RGB LED：R、G、B 必須使用不同 PWM 腳位。",
        "KITMODULE_ERROR_ID": "模組編號請輸入非負整數。",
        "KITMODULE_ERROR_PIN": "請選擇有效腳位。",
        "KITMODULE_ERROR_OPTION": "請選擇有效設定。",
        "KITMODULE_ERROR_CONFLICT": "相同模組編號有互相衝突的初始化設定。",
        "KITMODULE_ERROR_DUPLICATE_PIN": "各訊號必須使用不同腳位。"
    },
    "ru": {
        "KITRGB_NO_PINS": "Сначала выберите поддерживаемую плату Arduino или ESP32.",
        "KITRGB_INVALID_OPTION": "Недопустимый параметр.",
        "KITRGB_INVALID_ID": "Введите неотрицательное целое число в качестве номера модуля.",
        "KITRGB_INVALID_PIN": "Выберите допустимый контакт платы.",
        "KITRGB_CONFLICT": "Для одного номера модуля заданы разные настройки инициализации.",
        "KITRGB_OFF": "выключить RGB-светодиод %1",
        "KITRGB_CATEGORY": "Светодиод RGB",
        "KITRGB_BEGIN": "инициализировать RGB-светодиод %1 R %2 G %3 B %4 тип %5",
        "KITRGB_CATHODE": "общий катод (−)",
        "KITRGB_ANODE": "общий анод (+)",
        "KITRGB_COLOR": "RGB-светодиод %1: R %2 G %3 B %4 (0–255)",
        "KITRGB_READY": "прочитать готовность RGB-светодиода %1",
        "KITRGB_BEGIN_TIP": "Выберите три разных контакта с ШИМ. Инициализация добавляется в setup().",
        "KITRGB_COLOR_TIP": "Значения ограничены диапазоном 0–255. Это обычный RGB-светодиод, а не лента WS2812.",
        "KITRGB_DUPLICATE_PIN": "Для R, G и B нужны разные контакты с ШИМ.",
        "KITMODULE_ERROR_ID": "Введите неотрицательный целый номер модуля.",
        "KITMODULE_ERROR_PIN": "Выберите допустимый контакт.",
        "KITMODULE_ERROR_OPTION": "Выберите допустимую настройку.",
        "KITMODULE_ERROR_CONFLICT": "Для одного номера модуля заданы разные настройки инициализации.",
        "KITMODULE_ERROR_DUPLICATE_PIN": "Для этих сигналов нужны разные контакты."
    },
    "zh-cn": {
        "KITRGB_NO_PINS": "请先选择支援的 Arduino 或 ESP32 控制板。",
        "KITRGB_INVALID_OPTION": "选项无效。",
        "KITRGB_INVALID_ID": "RGB LED：模块编号请输入 0 或正整数。",
        "KITRGB_INVALID_PIN": "请选择有效输出引脚。",
        "KITRGB_CONFLICT": "相同模块编号有互相冲突的初始化设定。",
        "KITRGB_CATEGORY": "RGB LED",
        "KITRGB_BEGIN": "RGB LED%1初始化 R%2 G%3 B%4 类型%5",
        "KITRGB_CATHODE": "共阴极（－）",
        "KITRGB_ANODE": "共阳极（＋）",
        "KITRGB_COLOR": "RGB LED %1 设定 红 %2 绿 %3 蓝 %4（0～255）",
        "KITRGB_OFF": "RGB LED %1 关闭",
        "KITRGB_READY": "读取%1 RGB LED初始化状态数值",
        "KITRGB_BEGIN_TIP": "请选三个不同的 PWM 输出引脚；初始化产生於 setup()。",
        "KITRGB_COLOR_TIP": "数值限制在 0～255；适用一般 RGB 模块，不适用 WS2812 灯条。",
        "KITRGB_DUPLICATE_PIN": "RGB LED：R、G、B 必须使用不同 PWM 引脚。",
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
