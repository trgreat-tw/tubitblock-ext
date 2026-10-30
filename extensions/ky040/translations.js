/* Module labels are complete for the desktop app's four enabled locales. */
function getInterfaceTranslations () {
    return {
    "en": {
        "ky040.name": "Rotary Encoder",
        "ky040.description": "Blocks for Rotary Encoder on Arduino / ESP32."
    },
    "ru": {
        "ky040.name": "Поворотный энкодер",
        "ky040.description": "Блоки Arduino / ESP32 для модуля «Поворотный энкодер»."
    },
    "zh-cn": {
        "ky040.name": "旋转编码器",
        "ky040.description": "Arduino／ESP32通用的旋转编码器积木。"
    },
    "zh-tw": {
        "ky040.name": "旋轉編碼器",
        "ky040.description": "Arduino／ESP32共用的旋轉編碼器積木。"
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
            "INIT_GUARD_LABEL_KY040": "Rotary Encoder"
        },
        "ru": {
            "INIT_GUARD_TUBIT_REQUIRED": "Поместите блок «Инициализация TUBIT» под блоком «когда Arduino запускается».",
            "INIT_GUARD_SENSOR_REQUIRED": "Поместите блок «Инициализация: %1 %2» под блоком «когда Arduino запускается» перед блоками чтения или использования модуля.",
            "INIT_GUARD_INIT_PLACEMENT": "Поместите блок «Инициализация: %1 %2» непосредственно под блоком «когда Arduino запускается», перед циклами и условиями.",
            "INIT_GUARD_OLED_REQUIRED": "Сначала добавьте блок вывода на OLED и поместите блоки рисования внутрь него либо разместите перед ними блок очистки или обновления дисплея.",
            "INIT_GUARD_PIN_SUFFIX": "контакт %1",
            "INIT_GUARD_INVALID_ID": "Введите неотрицательный целый номер модуля.",
            "INIT_GUARD_LABEL_KY040": "Поворотный энкодер"
        },
        "zh-cn": {
            "INIT_GUARD_TUBIT_REQUIRED": "请在Arduino启动的积木底下放置\"TUBIT初始化\"积木",
            "INIT_GUARD_SENSOR_REQUIRED": "请在Arduino启动的积木底下放置\"%1%2初始化\"积木，并放在读取／使用积木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "请将\"%1%2初始化\"积木直接放在Arduino启动底下，且放在重复执行或条件判断之前。",
            "INIT_GUARD_OLED_REQUIRED": "请先放置OLED显示积木，并将绘图积木放在其内，或先放清除／更新显示积木。",
            "INIT_GUARD_PIN_SUFFIX": "引脚%1",
            "INIT_GUARD_INVALID_ID": "模组编号请输入非负整数。",
            "INIT_GUARD_LABEL_KY040": "旋转编码器"
        },
        "zh-tw": {
            "INIT_GUARD_TUBIT_REQUIRED": "請在Arduino啟動的積木底下放置\"TUBIT初始化\"積木",
            "INIT_GUARD_SENSOR_REQUIRED": "請在Arduino啟動的積木底下放置\"%1%2初始化\"積木，並放在讀取／使用積木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "請將\"%1%2初始化\"積木直接放在Arduino啟動底下，且放在重複執行或條件判斷之前。",
            "INIT_GUARD_OLED_REQUIRED": "請先放置OLED顯示積木，並將繪圖積木放在其內，或先放清除／更新顯示積木。",
            "INIT_GUARD_PIN_SUFFIX": "腳位%1",
            "INIT_GUARD_INVALID_ID": "模組編號請輸入非負整數。",
            "INIT_GUARD_LABEL_KY040": "旋轉編碼器"
        }
    };
    Object.keys(__initGuardMessages).forEach(function (locale) {
        if (!Blockly.ScratchMsgs.locales[locale]) Blockly.ScratchMsgs.locales[locale] = {};
        Object.assign(Blockly.ScratchMsgs.locales[locale], __initGuardMessages[locale]);
    });

    const messages = {
    "en": {
        "KY040_CATEGORY": "Rotary Encoder",
        "KY040_BEGIN": "rotary encoder %1 initialize CLK %2 DT %3 SW %4 multiplier %5",
        "KY040_MULTIPLIER_1": "1x",
        "KY040_MULTIPLIER_2": "2x",
        "KY040_MULTIPLIER_4": "4x",
        "KY040_UPDATE": "encoder %1 update",
        "KY040_POSITION": "read %1 rotary encoder count value",
        "KY040_DIRECTION": "read %1 rotary encoder direction value (-1/0/1)",
        "KY040_PRESSED": "read %1 rotary encoder button value",
        "KY040_JUST_PRESSED": "read %1 rotary encoder newly pressed value",
        "KY040_JUST_RELEASED": "read %1 rotary encoder newly released value",
        "KY040_SET_POSITION": "encoder %1 set position %2",
        "KY040_SET_REVERSED": "encoder %1 reverse direction %2",
        "KY040_ROTATED": "read %1 rotary encoder movement value for direction %2",
        "KY040_NO_BUTTON": "none",
        "KY040_OFF": "off",
        "KY040_ON": "on",
        "KY040_POSITIVE": "positive (+1)",
        "KY040_NEGATIVE": "negative (-1)",
        "KY040_BEGIN_TOOLTIP": "Initialize once; sampling runs automatically. Select 1x, 2x or 4x counts per complete CLK/DT signal cycle. Default: 1x. Counts per detent depend on the encoder.",
        "KY040_UPDATE_TOOLTIP": "Put once near the start of each fast loop, before reading values or events. Avoid long delay blocks.",
        "KY040_DIRECTION_TOOLTIP": "The latest update: +1 positive, -1 negative, 0 no full step. Reverse direction if required.",
        "KY040_EVENT_TOOLTIP": "True until the next update. Reading does not consume the event; check after update and before the next update.",
        "KY040_NO_PINS": "select an Arduino or ESP32 device first.",
        "KY040_INVALID_ID": "enter a non-negative integer module number.",
        "KY040_INVALID_PIN": "select a valid pin from the current device menu.",
        "KY040_DUPLICATE_PIN": "CLK, DT and SW must use different pins.",
        "KY040_INVALID_TRANSITIONS": "select a count multiplier of 1x, 2x or 4x.",
        "KY040_DUPLICATE_ID": "one encoder ID has conflicting initialization pins or count multipliers.",
        "KY040_INVALID_REVERSED": "reverse direction must be on or off.",
        "KY040_INVALID_DIRECTION": "direction must be +1 or -1.",
        "KITMODULE_ERROR_ID": "Enter a non-negative whole-number module ID.",
        "KITMODULE_ERROR_PIN": "Select a valid pin.",
        "KITMODULE_ERROR_OPTION": "Select a valid setting.",
        "KITMODULE_ERROR_CONFLICT": "The same module number has conflicting initialization settings.",
        "KITMODULE_ERROR_DUPLICATE_PIN": "Use different pins for these signals."
    },
    "zh-tw": {
        "KY040_CATEGORY": "旋轉編碼器",
        "KY040_BEGIN": "旋轉編碼器%1初始化 CLK%2 DT%3 SW%4 倍頻%5",
        "KY040_MULTIPLIER_1": "1倍",
        "KY040_MULTIPLIER_2": "2倍",
        "KY040_MULTIPLIER_4": "4倍",
        "KY040_UPDATE": "編碼器 %1 更新狀態",
        "KY040_POSITION": "讀取%1 旋轉編碼器計數值",
        "KY040_DIRECTION": "讀取%1 旋轉編碼器方向數值（-1／0／1）",
        "KY040_PRESSED": "讀取%1 旋轉編碼器按鈕數值",
        "KY040_JUST_PRESSED": "讀取%1 旋轉編碼器按鈕剛按下數值",
        "KY040_JUST_RELEASED": "讀取%1 旋轉編碼器按鈕剛放開數值",
        "KY040_SET_POSITION": "編碼器 %1 設定計數為 %2",
        "KY040_SET_REVERSED": "編碼器 %1 反轉計數方向 %2",
        "KY040_ROTATED": "讀取%1 旋轉編碼器往%2旋轉數值",
        "KY040_NO_BUTTON": "不使用按鈕",
        "KY040_OFF": "關閉",
        "KY040_ON": "開啟",
        "KY040_POSITIVE": "正方向（+1）",
        "KY040_NEGATIVE": "反方向（-1）",
        "KY040_BEGIN_TOOLTIP": "初始化一次，程式自動採樣。倍頻可選1／2／4倍，每個完整CLK／DT訊號週期分別計1／2／4次，預設1倍；每個卡點的計數依編碼器而異。",
        "KY040_UPDATE_TOOLTIP": "放在快速重複執行迴圈前端，每圈更新一次，再讀取數值與事件。避免長時間等待。",
        "KY040_DIRECTION_TOOLTIP": "最近一次更新：+1 正方向、-1 反方向、0 未完成一格。需要時可反轉計數方向。",
        "KY040_EVENT_TOOLTIP": "事件保持到下一次更新；讀取不會清除。請先更新，再判斷，之後才進行下一次更新。",
        "KY040_NO_PINS": "請先選擇 Arduino 或 ESP32 控制板。",
        "KY040_INVALID_ID": "請自行輸入非負整數編號，例如 0、1、8、42。",
        "KY040_INVALID_PIN": "請從目前控制板的選單選擇有效腳位。",
        "KY040_DUPLICATE_PIN": "CLK、DT 與 SW 必須使用不同腳位。",
        "KY040_INVALID_TRANSITIONS": "計數倍頻請選擇1倍、2倍或4倍。",
        "KY040_DUPLICATE_ID": "同一編碼器編號出現不同的初始化腳位或倍頻設定。",
        "KY040_INVALID_REVERSED": "反轉計數方向必須選擇開啟或關閉。",
        "KY040_INVALID_DIRECTION": "方向必須為 +1 或 -1。",
        "KITMODULE_ERROR_ID": "模組編號請輸入非負整數。",
        "KITMODULE_ERROR_PIN": "請選擇有效腳位。",
        "KITMODULE_ERROR_OPTION": "請選擇有效設定。",
        "KITMODULE_ERROR_CONFLICT": "相同模組編號有互相衝突的初始化設定。",
        "KITMODULE_ERROR_DUPLICATE_PIN": "各訊號必須使用不同腳位。"
    },
    "ru": {
        "KY040_NO_PINS": "Сначала выберите поддерживаемую плату Arduino или ESP32.",
        "KY040_INVALID_ID": "Введите неотрицательное целое число в качестве номера модуля.",
        "KY040_INVALID_PIN": "Выберите допустимый контакт платы.",
        "KY040_ON": "включить",
        "KY040_OFF": "выключить",
        "KY040_CATEGORY": "Поворотный энкодер",
        "KY040_BEGIN": "инициализировать энкодер %1 CLK %2 DT %3 SW %4 множитель %5",
        "KY040_MULTIPLIER_1": "1x",
        "KY040_MULTIPLIER_2": "2x",
        "KY040_MULTIPLIER_4": "4x",
        "KY040_UPDATE": "обновить энкодер %1",
        "KY040_POSITION": "прочитать счётчик энкодера %1",
        "KY040_DIRECTION": "прочитать направление энкодера %1 (−1/0/1)",
        "KY040_PRESSED": "прочитать значение кнопки энкодера %1",
        "KY040_JUST_PRESSED": "прочитать новое нажатие кнопки энкодера %1",
        "KY040_JUST_RELEASED": "прочитать новое отпускание кнопки энкодера %1",
        "KY040_SET_POSITION": "установить счётчик энкодера %1 в %2",
        "KY040_SET_REVERSED": "энкодер %1: инверсия направления %2",
        "KY040_ROTATED": "прочитать движение энкодера %1 в направлении %2",
        "KY040_NO_BUTTON": "кнопка не используется",
        "KY040_POSITIVE": "положительное (+1)",
        "KY040_NEGATIVE": "отрицательное (−1)",
        "KY040_BEGIN_TOOLTIP": "Инициализируйте один раз; опрос автоматический. Множитель 1x, 2x или 4x даёт 1, 2 или 4 отсчёта за полный цикл CLK/DT. По умолчанию: 1x. Число отсчётов на щелчок зависит от энкодера.",
        "KY040_UPDATE_TOOLTIP": "Для старых проектов: разместите один раз в начале быстрого цикла, до чтения значений и событий. Избегайте долгих задержек.",
        "KY040_DIRECTION_TOOLTIP": "Последнее обновление: +1 — положительное, −1 — отрицательное, 0 — нет полного шага. При необходимости инвертируйте направление.",
        "KY040_EVENT_TOOLTIP": "Событие сохраняется до следующего обновления. Чтение его не очищает; проверяйте событие после обновления.",
        "KY040_DUPLICATE_PIN": "Для CLK, DT и SW нужны разные контакты.",
        "KY040_INVALID_TRANSITIONS": "Выберите множитель счёта 1x, 2x или 4x.",
        "KY040_DUPLICATE_ID": "Для одного номера энкодера заданы разные контакты или множители счёта.",
        "KY040_INVALID_REVERSED": "Инверсия направления должна быть включена или выключена.",
        "KY040_INVALID_DIRECTION": "Направление должно быть +1 или −1.",
        "KITMODULE_ERROR_ID": "Введите неотрицательный целый номер модуля.",
        "KITMODULE_ERROR_PIN": "Выберите допустимый контакт.",
        "KITMODULE_ERROR_OPTION": "Выберите допустимую настройку.",
        "KITMODULE_ERROR_CONFLICT": "Для одного номера модуля заданы разные настройки инициализации.",
        "KITMODULE_ERROR_DUPLICATE_PIN": "Для этих сигналов нужны разные контакты."
    },
    "zh-cn": {
        "KY040_CATEGORY": "旋转编码器",
        "KY040_BEGIN": "旋转编码器%1初始化 CLK%2 DT%3 SW%4 倍频%5",
        "KY040_MULTIPLIER_1": "1倍",
        "KY040_MULTIPLIER_2": "2倍",
        "KY040_MULTIPLIER_4": "4倍",
        "KY040_UPDATE": "编码器 %1 更新状态",
        "KY040_POSITION": "读取%1 旋转编码器计数值",
        "KY040_DIRECTION": "读取%1 旋转编码器方向数值（-1／0／1）",
        "KY040_PRESSED": "读取%1 旋转编码器按钮数值",
        "KY040_JUST_PRESSED": "读取%1 旋转编码器按钮刚按下数值",
        "KY040_JUST_RELEASED": "读取%1 旋转编码器按钮刚放开数值",
        "KY040_SET_POSITION": "编码器 %1 设定计数为 %2",
        "KY040_SET_REVERSED": "编码器 %1 反转计数方向 %2",
        "KY040_ROTATED": "读取%1 旋转编码器往%2旋转数值",
        "KY040_NO_BUTTON": "不使用按钮",
        "KY040_OFF": "关闭",
        "KY040_ON": "开启",
        "KY040_POSITIVE": "正方向（+1）",
        "KY040_NEGATIVE": "反方向（-1）",
        "KY040_BEGIN_TOOLTIP": "初始化一次，程序自动采样。倍频可选1／2／4倍，每个完整CLK／DT信号周期分别计1／2／4次，默认1倍；每个卡点的计数依编码器而异。",
        "KY040_UPDATE_TOOLTIP": "放在快速重复执行回圈前端，每圈更新一次，再读取数值与事件。避免长时间等待。",
        "KY040_DIRECTION_TOOLTIP": "最近一次更新：+1 正方向、-1 反方向、0 未完成一格。需要时可反转计数方向。",
        "KY040_EVENT_TOOLTIP": "事件保持到下一次更新；读取不会清除。请先更新，再判断，之後才进行下一次更新。",
        "KY040_NO_PINS": "请先选择 Arduino 或 ESP32 控制板。",
        "KY040_INVALID_ID": "请自行输入非负整数编号，例如 0、1、8、42。",
        "KY040_INVALID_PIN": "请从目前控制板的选单选择有效引脚。",
        "KY040_DUPLICATE_PIN": "CLK、DT 与 SW 必须使用不同引脚。",
        "KY040_INVALID_TRANSITIONS": "计数倍频请选择1倍、2倍或4倍。",
        "KY040_DUPLICATE_ID": "同一编码器编号出现不同的初始化引脚或倍频设定。",
        "KY040_INVALID_REVERSED": "反转计数方向必须选择开启或关闭。",
        "KY040_INVALID_DIRECTION": "方向必须为 +1 或 -1。",
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
