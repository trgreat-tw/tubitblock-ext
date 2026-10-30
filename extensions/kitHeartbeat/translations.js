/* Module labels are complete for the desktop app's four enabled locales. */
function getInterfaceTranslations () {
    return {
    "en": {
        "kitHeartbeat.name": "Finger Pulse Sensor",
        "kitHeartbeat.description": "Blocks for Finger Pulse Sensor on Arduino / ESP32."
    },
    "ru": {
        "kitHeartbeat.name": "Датчик пульса",
        "kitHeartbeat.description": "Блоки Arduino / ESP32 для модуля «Датчик пульса»."
    },
    "zh-cn": {
        "kitHeartbeat.name": "手指心跳感测器",
        "kitHeartbeat.description": "Arduino／ESP32通用的手指心跳感测器积木。"
    },
    "zh-tw": {
        "kitHeartbeat.name": "手指心跳感測器",
        "kitHeartbeat.description": "Arduino／ESP32共用的手指心跳感測器積木。"
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
            "INIT_GUARD_LABEL_KITHEARTBEAT": "Finger Pulse Sensor"
        },
        "ru": {
            "INIT_GUARD_TUBIT_REQUIRED": "Поместите блок «Инициализация TUBIT» под блоком «когда Arduino запускается».",
            "INIT_GUARD_SENSOR_REQUIRED": "Поместите блок «Инициализация: %1 %2» под блоком «когда Arduino запускается» перед блоками чтения или использования модуля.",
            "INIT_GUARD_INIT_PLACEMENT": "Поместите блок «Инициализация: %1 %2» непосредственно под блоком «когда Arduino запускается», перед циклами и условиями.",
            "INIT_GUARD_OLED_REQUIRED": "Сначала добавьте блок вывода на OLED и поместите блоки рисования внутрь него либо разместите перед ними блок очистки или обновления дисплея.",
            "INIT_GUARD_PIN_SUFFIX": "контакт %1",
            "INIT_GUARD_INVALID_ID": "Введите неотрицательный целый номер модуля.",
            "INIT_GUARD_LABEL_KITHEARTBEAT": "Датчик пульса"
        },
        "zh-cn": {
            "INIT_GUARD_TUBIT_REQUIRED": "请在Arduino启动的积木底下放置\"TUBIT初始化\"积木",
            "INIT_GUARD_SENSOR_REQUIRED": "请在Arduino启动的积木底下放置\"%1%2初始化\"积木，并放在读取／使用积木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "请将\"%1%2初始化\"积木直接放在Arduino启动底下，且放在重复执行或条件判断之前。",
            "INIT_GUARD_OLED_REQUIRED": "请先放置OLED显示积木，并将绘图积木放在其内，或先放清除／更新显示积木。",
            "INIT_GUARD_PIN_SUFFIX": "引脚%1",
            "INIT_GUARD_INVALID_ID": "模组编号请输入非负整数。",
            "INIT_GUARD_LABEL_KITHEARTBEAT": "手指心跳感测器"
        },
        "zh-tw": {
            "INIT_GUARD_TUBIT_REQUIRED": "請在Arduino啟動的積木底下放置\"TUBIT初始化\"積木",
            "INIT_GUARD_SENSOR_REQUIRED": "請在Arduino啟動的積木底下放置\"%1%2初始化\"積木，並放在讀取／使用積木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "請將\"%1%2初始化\"積木直接放在Arduino啟動底下，且放在重複執行或條件判斷之前。",
            "INIT_GUARD_OLED_REQUIRED": "請先放置OLED顯示積木，並將繪圖積木放在其內，或先放清除／更新顯示積木。",
            "INIT_GUARD_PIN_SUFFIX": "腳位%1",
            "INIT_GUARD_INVALID_ID": "模組編號請輸入非負整數。",
            "INIT_GUARD_LABEL_KITHEARTBEAT": "手指心跳感測器"
        }
    };
    Object.keys(__initGuardMessages).forEach(function (locale) {
        if (!Blockly.ScratchMsgs.locales[locale]) Blockly.ScratchMsgs.locales[locale] = {};
        Object.assign(Blockly.ScratchMsgs.locales[locale], __initGuardMessages[locale]);
    });

    const messages = {
    "en": {
        "KITHEARTBEAT_CATEGORY": "Finger Pulse Sensor",
        "KITHEARTBEAT_BEGIN": "finger pulse sensor %1 initialize signal %2",
        "KITHEARTBEAT_UPDATE": "heartbeat %1 update",
        "KITHEARTBEAT_RAW": "read %1 finger pulse sensor analog value (0–1023)",
        "KITHEARTBEAT_AC": "read %1 finger pulse sensor filtered value",
        "KITHEARTBEAT_AMPLITUDE": "read %1 finger pulse sensor amplitude value",
        "KITHEARTBEAT_BEAT": "read %1 finger pulse sensor new peak value",
        "KITHEARTBEAT_AVAILABLE": "read %1 finger pulse sensor stable signal value",
        "KITHEARTBEAT_BPM": "read %1 finger pulse sensor value (BPM)",
        "KITHEARTBEAT_MINIMUM": "heartbeat %1 minimum signal amplitude %2",
        "KITHEARTBEAT_UPDATE_TIP": "Put once at the start of each fast loop. Sampling is limited to one reading per 10 ms; check events before the next update.",
        "KITHEARTBEAT_BPM_TIP": "An estimate after three similar peaks. Returns 0 before a stable signal and after 2.5 s without a peak.",
        "KITHEARTBEAT_BEGIN_TIP": "Enter any non-negative module number. Sampling runs automatically; keep the loop fast and fingertip still.",
        "KITHEARTBEAT_NONE": "not connected",
        "KITHEARTBEAT_HIGH": "HIGH",
        "KITHEARTBEAT_LOW": "LOW",
        "KITHEARTBEAT_GROUND": "GND",
        "KITHEARTBEAT_VCC": "VCC",
        "KITMODULE_ERROR_ID": "Enter a non-negative whole-number module ID.",
        "KITMODULE_ERROR_PIN": "Select a valid pin.",
        "KITMODULE_ERROR_OPTION": "Select a valid setting.",
        "KITMODULE_ERROR_CONFLICT": "The same module number has conflicting initialization settings.",
        "KITMODULE_ERROR_DUPLICATE_PIN": "Use different pins for these signals."
    },
    "zh-tw": {
        "KITHEARTBEAT_CATEGORY": "手指心跳感測器",
        "KITHEARTBEAT_BEGIN": "手指心跳感測器%1初始化 訊號%2",
        "KITHEARTBEAT_UPDATE": "心跳模組 %1 更新狀態",
        "KITHEARTBEAT_RAW": "讀取%1 手指心跳感測器類比數值（0～1023）",
        "KITHEARTBEAT_AC": "讀取%1 手指心跳感測器濾波數值",
        "KITHEARTBEAT_AMPLITUDE": "讀取%1 手指心跳感測器振幅數值",
        "KITHEARTBEAT_BEAT": "讀取%1 手指心跳感測器新波峰數值",
        "KITHEARTBEAT_AVAILABLE": "讀取%1 手指心跳感測器穩定訊號數值",
        "KITHEARTBEAT_BPM": "讀取%1 手指心跳感測器數值（BPM）",
        "KITHEARTBEAT_MINIMUM": "心跳模組 %1 最小訊號振幅 %2",
        "KITHEARTBEAT_UPDATE_TIP": "放在快速迴圈開頭，每圈一次。每 10ms 採樣一次；請先更新再判斷，下一次更新會清除瞬間波峰事件。",
        "KITHEARTBEAT_BPM_TIP": "至少三個相近間距波峰後才估算；訊號不穩定或超過 2.5 秒無波峰回傳 0。",
        "KITHEARTBEAT_BEGIN_TIP": "編號可自行輸入非負整數。程式會自動採樣，請保持主迴圈快速執行，手指保持穩定並遮蔽環境光。",
        "KITHEARTBEAT_NONE": "不接",
        "KITHEARTBEAT_HIGH": "高電位",
        "KITHEARTBEAT_LOW": "低電位",
        "KITHEARTBEAT_GROUND": "GND",
        "KITHEARTBEAT_VCC": "VCC",
        "KITMODULE_ERROR_ID": "模組編號請輸入非負整數。",
        "KITMODULE_ERROR_PIN": "請選擇有效腳位。",
        "KITMODULE_ERROR_OPTION": "請選擇有效設定。",
        "KITMODULE_ERROR_CONFLICT": "相同模組編號有互相衝突的初始化設定。",
        "KITMODULE_ERROR_DUPLICATE_PIN": "各訊號必須使用不同腳位。"
    },
    "ru": {
        "KITHEARTBEAT_HIGH": "HIGH",
        "KITHEARTBEAT_LOW": "LOW",
        "KITHEARTBEAT_GROUND": "GND",
        "KITHEARTBEAT_VCC": "VCC",
        "KITHEARTBEAT_NONE": "не подключено",
        "KITHEARTBEAT_CATEGORY": "Датчик пульса",
        "KITHEARTBEAT_BEGIN": "инициализировать датчик пульса %1 сигнал %2",
        "KITHEARTBEAT_UPDATE": "обновить датчик пульса %1",
        "KITHEARTBEAT_RAW": "прочитать аналоговое значение датчика пульса %1 (0–1023)",
        "KITHEARTBEAT_AC": "прочитать фильтрованное значение датчика пульса %1",
        "KITHEARTBEAT_AMPLITUDE": "прочитать амплитуду датчика пульса %1",
        "KITHEARTBEAT_BEAT": "прочитать новый пик датчика пульса %1",
        "KITHEARTBEAT_AVAILABLE": "прочитать наличие устойчивого сигнала датчика пульса %1",
        "KITHEARTBEAT_BPM": "прочитать значение датчика пульса %1 (уд/мин)",
        "KITHEARTBEAT_MINIMUM": "датчик пульса %1: минимальная амплитуда %2",
        "KITHEARTBEAT_UPDATE_TIP": "Для старых проектов: обновляйте в начале быстрого цикла. Измерение — не чаще одного раза за 10 мс; проверяйте события до следующего обновления.",
        "KITHEARTBEAT_BPM_TIP": "Оценка после трёх похожих пиков. Возвращает 0 до появления устойчивого сигнала и через 2,5 с без пиков.",
        "KITHEARTBEAT_BEGIN_TIP": "Введите неотрицательный номер модуля. Опрос выполняется автоматически; поддерживайте быстрый цикл и держите палец неподвижно.",
        "KITMODULE_ERROR_ID": "Введите неотрицательный целый номер модуля.",
        "KITMODULE_ERROR_PIN": "Выберите допустимый контакт.",
        "KITMODULE_ERROR_OPTION": "Выберите допустимую настройку.",
        "KITMODULE_ERROR_CONFLICT": "Для одного номера модуля заданы разные настройки инициализации.",
        "KITMODULE_ERROR_DUPLICATE_PIN": "Для этих сигналов нужны разные контакты."
    },
    "zh-cn": {
        "KITHEARTBEAT_CATEGORY": "手指心跳感测器",
        "KITHEARTBEAT_BEGIN": "手指心跳感测器%1初始化 信号%2",
        "KITHEARTBEAT_UPDATE": "心跳模块 %1 更新状态",
        "KITHEARTBEAT_RAW": "读取%1 手指心跳感测器模拟数值（0～1023）",
        "KITHEARTBEAT_AC": "读取%1 手指心跳感测器滤波数值",
        "KITHEARTBEAT_AMPLITUDE": "读取%1 手指心跳感测器振幅数值",
        "KITHEARTBEAT_BEAT": "读取%1 手指心跳感测器新波峰数值",
        "KITHEARTBEAT_AVAILABLE": "读取%1 手指心跳感测器稳定信号数值",
        "KITHEARTBEAT_BPM": "读取%1 手指心跳感测器数值（BPM）",
        "KITHEARTBEAT_MINIMUM": "心跳模块 %1 最小信号振幅 %2",
        "KITHEARTBEAT_UPDATE_TIP": "放在快速回圈开头，每圈一次。每 10ms 采样一次；请先更新再判断，下一次更新会清除瞬间波峰事件。",
        "KITHEARTBEAT_BPM_TIP": "至少三个相近间距波峰後才估算；信号不稳定或超过 2.5 秒无波峰回传 0。",
        "KITHEARTBEAT_BEGIN_TIP": "编号可自行输入非负整数。程式会自动采样，请保持主回圈快速执行，手指保持稳定并遮蔽环境光。",
        "KITHEARTBEAT_NONE": "不接",
        "KITHEARTBEAT_HIGH": "高电位",
        "KITHEARTBEAT_LOW": "低电位",
        "KITHEARTBEAT_GROUND": "GND",
        "KITHEARTBEAT_VCC": "VCC",
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
