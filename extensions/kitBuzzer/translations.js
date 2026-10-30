/* Module labels are complete for the desktop app's four enabled locales. */
function getInterfaceTranslations () {
    return {
    "en": {
        "kitBuzzer.name": "Active / Passive Buzzer",
        "kitBuzzer.description": "Blocks for Active / Passive Buzzer on Arduino / ESP32."
    },
    "ru": {
        "kitBuzzer.name": "Активный / пассивный зуммер",
        "kitBuzzer.description": "Блоки Arduino / ESP32 для модуля «Активный / пассивный зуммер»."
    },
    "zh-cn": {
        "kitBuzzer.name": "有源／无源蜂鸣器",
        "kitBuzzer.description": "Arduino／ESP32通用的有源／无源蜂鸣器积木。"
    },
    "zh-tw": {
        "kitBuzzer.name": "有源／無源蜂鳴器",
        "kitBuzzer.description": "Arduino／ESP32共用的有源／無源蜂鳴器積木。"
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
            "INIT_GUARD_LABEL_KITBUZZER": "Active / Passive Buzzer"
        },
        "ru": {
            "INIT_GUARD_TUBIT_REQUIRED": "Поместите блок «Инициализация TUBIT» под блоком «когда Arduino запускается».",
            "INIT_GUARD_SENSOR_REQUIRED": "Поместите блок «Инициализация: %1 %2» под блоком «когда Arduino запускается» перед блоками чтения или использования модуля.",
            "INIT_GUARD_INIT_PLACEMENT": "Поместите блок «Инициализация: %1 %2» непосредственно под блоком «когда Arduino запускается», перед циклами и условиями.",
            "INIT_GUARD_OLED_REQUIRED": "Сначала добавьте блок вывода на OLED и поместите блоки рисования внутрь него либо разместите перед ними блок очистки или обновления дисплея.",
            "INIT_GUARD_PIN_SUFFIX": "контакт %1",
            "INIT_GUARD_INVALID_ID": "Введите неотрицательный целый номер модуля.",
            "INIT_GUARD_LABEL_KITBUZZER": "Активный / пассивный зуммер"
        },
        "zh-cn": {
            "INIT_GUARD_TUBIT_REQUIRED": "请在Arduino启动的积木底下放置\"TUBIT初始化\"积木",
            "INIT_GUARD_SENSOR_REQUIRED": "请在Arduino启动的积木底下放置\"%1%2初始化\"积木，并放在读取／使用积木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "请将\"%1%2初始化\"积木直接放在Arduino启动底下，且放在重复执行或条件判断之前。",
            "INIT_GUARD_OLED_REQUIRED": "请先放置OLED显示积木，并将绘图积木放在其内，或先放清除／更新显示积木。",
            "INIT_GUARD_PIN_SUFFIX": "引脚%1",
            "INIT_GUARD_INVALID_ID": "模组编号请输入非负整数。",
            "INIT_GUARD_LABEL_KITBUZZER": "有源／无源蜂鸣器"
        },
        "zh-tw": {
            "INIT_GUARD_TUBIT_REQUIRED": "請在Arduino啟動的積木底下放置\"TUBIT初始化\"積木",
            "INIT_GUARD_SENSOR_REQUIRED": "請在Arduino啟動的積木底下放置\"%1%2初始化\"積木，並放在讀取／使用積木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "請將\"%1%2初始化\"積木直接放在Arduino啟動底下，且放在重複執行或條件判斷之前。",
            "INIT_GUARD_OLED_REQUIRED": "請先放置OLED顯示積木，並將繪圖積木放在其內，或先放清除／更新顯示積木。",
            "INIT_GUARD_PIN_SUFFIX": "腳位%1",
            "INIT_GUARD_INVALID_ID": "模組編號請輸入非負整數。",
            "INIT_GUARD_LABEL_KITBUZZER": "有源／無源蜂鳴器"
        }
    };
    Object.keys(__initGuardMessages).forEach(function (locale) {
        if (!Blockly.ScratchMsgs.locales[locale]) Blockly.ScratchMsgs.locales[locale] = {};
        Object.assign(Blockly.ScratchMsgs.locales[locale], __initGuardMessages[locale]);
    });

    const messages = {
    "en": {
        "KITBUZZER_NO_PINS": "Select a supported Arduino or ESP32 device first.",
        "KITBUZZER_INVALID_OPTION": "Invalid option.",
        "KITBUZZER_INVALID_ID": "Enter a non-negative whole number for the module number.",
        "KITBUZZER_INVALID_PIN": "Select a valid output pin.",
        "KITBUZZER_CONFLICT": "One module ID has conflicting initialization settings.",
        "KITBUZZER_CATEGORY": "Active / Passive Buzzer",
        "KITBUZZER_BEGIN": "buzzer %1 initialize signal %2 type %3 active level %4",
        "KITBUZZER_PASSIVE": "passive buzzer",
        "KITBUZZER_ACTIVE": "active buzzer",
        "KITBUZZER_HIGH": "HIGH",
        "KITBUZZER_LOW": "LOW",
        "KITBUZZER_ACTIVE_WRITE": "active buzzer %1 %2",
        "KITBUZZER_ON": "on",
        "KITBUZZER_OFF": "off",
        "KITBUZZER_TONE": "passive buzzer %1 play %2 Hz (no wait)",
        "KITBUZZER_NOTE": "passive buzzer %1 play %2 %3 (no wait)",
        "KITBUZZER_OCTAVE_LOW": "low (3)",
        "KITBUZZER_OCTAVE_MIDDLE": "middle (4)",
        "KITBUZZER_OCTAVE_HIGH": "high (5)",
        "KITBUZZER_NOTE_DO": "Do (C)",
        "KITBUZZER_NOTE_DO_SHARP": "Do# (C#)",
        "KITBUZZER_NOTE_RE": "Re (D)",
        "KITBUZZER_NOTE_RE_SHARP": "Re# (D#)",
        "KITBUZZER_NOTE_MI": "Mi (E)",
        "KITBUZZER_NOTE_FA": "Fa (F)",
        "KITBUZZER_NOTE_FA_SHARP": "Fa# (F#)",
        "KITBUZZER_NOTE_SOL": "Sol (G)",
        "KITBUZZER_NOTE_SOL_SHARP": "Sol# (G#)",
        "KITBUZZER_NOTE_LA": "La (A)",
        "KITBUZZER_NOTE_LA_SHARP": "La# (A#)",
        "KITBUZZER_NOTE_SI": "Si (B)",
        "KITBUZZER_NOTE_TIP": "Passive buzzer only. Low/middle/high use octaves 3/4/5. Sound continues until another note or stop. Add wait blocks between notes to set the rhythm.",
        "KITBUZZER_STOP": "buzzer %1 stop",
        "KITBUZZER_PLAYING": "read %1 buzzer commanded state value",
        "KITBUZZER_READY": "read %1 buzzer ready value",
        "KITBUZZER_BEGIN_TIP": "Select active or passive type. Active level applies only to an active buzzer.",
        "KITBUZZER_ACTIVE_TIP": "Only for the active type. Passive buzzer pitch is controlled by the frequency block.",
        "KITBUZZER_TONE_TIP": "Nonblocking. 31-20000 Hz; 0 stops. One passive buzzer sounds at a time; a new one replaces the previous one.",
        "KITMODULE_ERROR_ID": "Enter a non-negative whole-number module ID.",
        "KITMODULE_ERROR_PIN": "Select a valid pin.",
        "KITMODULE_ERROR_OPTION": "Select a valid setting.",
        "KITMODULE_ERROR_CONFLICT": "The same module number has conflicting initialization settings.",
        "KITMODULE_ERROR_DUPLICATE_PIN": "Use different pins for these signals."
    },
    "zh-tw": {
        "KITBUZZER_NO_PINS": "請先選擇支援的 Arduino 或 ESP32 控制板。",
        "KITBUZZER_INVALID_OPTION": "選項無效。",
        "KITBUZZER_INVALID_ID": "蜂鳴器：模組編號請輸入 0 或正整數。",
        "KITBUZZER_INVALID_PIN": "請選擇有效輸出腳位。",
        "KITBUZZER_CONFLICT": "相同模組編號有互相衝突的初始化設定。",
        "KITBUZZER_CATEGORY": "有源／無源蜂鳴器",
        "KITBUZZER_BEGIN": "蜂鳴器%1初始化 訊號%2 類型%3 有效電位%4",
        "KITBUZZER_PASSIVE": "無源蜂鳴器",
        "KITBUZZER_ACTIVE": "有源蜂鳴器",
        "KITBUZZER_HIGH": "高電位",
        "KITBUZZER_LOW": "低電位",
        "KITBUZZER_ACTIVE_WRITE": "有源蜂鳴器 %1 %2",
        "KITBUZZER_ON": "開啟",
        "KITBUZZER_OFF": "關閉",
        "KITBUZZER_TONE": "無源蜂鳴器 %1 播放 %2 Hz（不等待）",
        "KITBUZZER_NOTE": "無源蜂鳴器 %1 播放 %2 %3（不等待）",
        "KITBUZZER_OCTAVE_LOW": "低音",
        "KITBUZZER_OCTAVE_MIDDLE": "中音",
        "KITBUZZER_OCTAVE_HIGH": "高音",
        "KITBUZZER_NOTE_DO": "Do（C）",
        "KITBUZZER_NOTE_DO_SHARP": "Do♯（C♯）",
        "KITBUZZER_NOTE_RE": "Re（D）",
        "KITBUZZER_NOTE_RE_SHARP": "Re♯（D♯）",
        "KITBUZZER_NOTE_MI": "Mi（E）",
        "KITBUZZER_NOTE_FA": "Fa（F）",
        "KITBUZZER_NOTE_FA_SHARP": "Fa♯（F♯）",
        "KITBUZZER_NOTE_SOL": "Sol（G）",
        "KITBUZZER_NOTE_SOL_SHARP": "Sol♯（G♯）",
        "KITBUZZER_NOTE_LA": "La（A）",
        "KITBUZZER_NOTE_LA_SHARP": "La♯（A♯）",
        "KITBUZZER_NOTE_SI": "Si（B）",
        "KITBUZZER_NOTE_TIP": "僅適用無源蜂鳴器。低／中／高音對應第3／4／5八度；持續發聲直到新音符或停止，請在音符之間加入等待積木控制節拍。",
        "KITBUZZER_STOP": "蜂鳴器 %1 停止",
        "KITBUZZER_PLAYING": "讀取%1 蜂鳴器發聲狀態數值",
        "KITBUZZER_READY": "讀取%1 蜂鳴器初始化狀態數值",
        "KITBUZZER_BEGIN_TIP": "請依模組選有源或無源；觸發電位只用於有源蜂鳴器。",
        "KITBUZZER_ACTIVE_TIP": "僅適用有源類型；無源蜂鳴器請使用頻率積木。",
        "KITBUZZER_TONE_TIP": "不阻塞迴圈。31～20000 Hz；0 表示停止。同時只播放一個無源蜂鳴器，新播放取代上一個。",
        "KITMODULE_ERROR_ID": "模組編號請輸入非負整數。",
        "KITMODULE_ERROR_PIN": "請選擇有效腳位。",
        "KITMODULE_ERROR_OPTION": "請選擇有效設定。",
        "KITMODULE_ERROR_CONFLICT": "相同模組編號有互相衝突的初始化設定。",
        "KITMODULE_ERROR_DUPLICATE_PIN": "各訊號必須使用不同腳位。"
    },
    "ru": {
        "KITBUZZER_NO_PINS": "Сначала выберите поддерживаемую плату Arduino или ESP32.",
        "KITBUZZER_INVALID_OPTION": "Недопустимый параметр.",
        "KITBUZZER_INVALID_ID": "Введите неотрицательное целое число в качестве номера модуля.",
        "KITBUZZER_INVALID_PIN": "Выберите допустимый контакт платы.",
        "KITBUZZER_CONFLICT": "Для одного номера модуля заданы разные настройки инициализации.",
        "KITBUZZER_HIGH": "HIGH",
        "KITBUZZER_LOW": "LOW",
        "KITBUZZER_ON": "включить",
        "KITBUZZER_OFF": "выключить",
        "KITBUZZER_CATEGORY": "Активный / пассивный зуммер",
        "KITBUZZER_BEGIN": "инициализировать зуммер %1 сигнал %2 тип %3 активный уровень %4",
        "KITBUZZER_PASSIVE": "пассивный зуммер",
        "KITBUZZER_ACTIVE": "активный зуммер",
        "KITBUZZER_ACTIVE_WRITE": "активный зуммер %1: %2",
        "KITBUZZER_TONE": "пассивный зуммер %1: частота %2 Гц без ожидания",
        "KITBUZZER_NOTE": "пассивный зуммер %1: играть %2 %3 без ожидания",
        "KITBUZZER_OCTAVE_LOW": "низкий (3)",
        "KITBUZZER_OCTAVE_MIDDLE": "средний (4)",
        "KITBUZZER_OCTAVE_HIGH": "высокий (5)",
        "KITBUZZER_NOTE_DO": "До (C)",
        "KITBUZZER_NOTE_DO_SHARP": "До♯ (C♯)",
        "KITBUZZER_NOTE_RE": "Ре (D)",
        "KITBUZZER_NOTE_RE_SHARP": "Ре♯ (D♯)",
        "KITBUZZER_NOTE_MI": "Ми (E)",
        "KITBUZZER_NOTE_FA": "Фа (F)",
        "KITBUZZER_NOTE_FA_SHARP": "Фа♯ (F♯)",
        "KITBUZZER_NOTE_SOL": "Соль (G)",
        "KITBUZZER_NOTE_SOL_SHARP": "Соль♯ (G♯)",
        "KITBUZZER_NOTE_LA": "Ля (A)",
        "KITBUZZER_NOTE_LA_SHARP": "Ля♯ (A♯)",
        "KITBUZZER_NOTE_SI": "Си (B)",
        "KITBUZZER_NOTE_TIP": "Только для пассивного зуммера. Регистры соответствуют октавам 3/4/5. Звук длится до следующей ноты или остановки. Задавайте ритм блоками ожидания между нотами.",
        "KITBUZZER_STOP": "остановить зуммер %1",
        "KITBUZZER_PLAYING": "прочитать заданное состояние зуммера %1",
        "KITBUZZER_READY": "прочитать готовность зуммера %1",
        "KITBUZZER_BEGIN_TIP": "Выберите активный или пассивный тип. Активный уровень используется только для активного зуммера.",
        "KITBUZZER_ACTIVE_TIP": "Только для активного типа. Высота звука пассивного зуммера задаётся блоком частоты.",
        "KITBUZZER_TONE_TIP": "Без блокировки. 31–20000 Гц; 0 останавливает звук. Одновременно звучит один пассивный зуммер, новый заменяет предыдущий.",
        "KITMODULE_ERROR_ID": "Введите неотрицательный целый номер модуля.",
        "KITMODULE_ERROR_PIN": "Выберите допустимый контакт.",
        "KITMODULE_ERROR_OPTION": "Выберите допустимую настройку.",
        "KITMODULE_ERROR_CONFLICT": "Для одного номера модуля заданы разные настройки инициализации.",
        "KITMODULE_ERROR_DUPLICATE_PIN": "Для этих сигналов нужны разные контакты."
    },
    "zh-cn": {
        "KITBUZZER_NO_PINS": "请先选择支援的 Arduino 或 ESP32 控制板。",
        "KITBUZZER_INVALID_OPTION": "选项无效。",
        "KITBUZZER_INVALID_ID": "蜂鸣器：模块编号请输入 0 或正整数。",
        "KITBUZZER_INVALID_PIN": "请选择有效输出引脚。",
        "KITBUZZER_CONFLICT": "相同模块编号有互相冲突的初始化设定。",
        "KITBUZZER_CATEGORY": "有源／无源蜂鸣器",
        "KITBUZZER_BEGIN": "蜂鸣器%1初始化 信号%2 类型%3 有效电位%4",
        "KITBUZZER_PASSIVE": "无源蜂鸣器",
        "KITBUZZER_ACTIVE": "有源蜂鸣器",
        "KITBUZZER_HIGH": "高电位",
        "KITBUZZER_LOW": "低电位",
        "KITBUZZER_ACTIVE_WRITE": "有源蜂鸣器 %1 %2",
        "KITBUZZER_ON": "开启",
        "KITBUZZER_OFF": "关闭",
        "KITBUZZER_TONE": "无源蜂鸣器 %1 播放 %2 Hz（不等待）",
        "KITBUZZER_NOTE": "无源蜂鸣器 %1 播放 %2 %3（不等待）",
        "KITBUZZER_OCTAVE_LOW": "低音",
        "KITBUZZER_OCTAVE_MIDDLE": "中音",
        "KITBUZZER_OCTAVE_HIGH": "高音",
        "KITBUZZER_NOTE_DO": "Do（C）",
        "KITBUZZER_NOTE_DO_SHARP": "Do♯（C♯）",
        "KITBUZZER_NOTE_RE": "Re（D）",
        "KITBUZZER_NOTE_RE_SHARP": "Re♯（D♯）",
        "KITBUZZER_NOTE_MI": "Mi（E）",
        "KITBUZZER_NOTE_FA": "Fa（F）",
        "KITBUZZER_NOTE_FA_SHARP": "Fa♯（F♯）",
        "KITBUZZER_NOTE_SOL": "Sol（G）",
        "KITBUZZER_NOTE_SOL_SHARP": "Sol♯（G♯）",
        "KITBUZZER_NOTE_LA": "La（A）",
        "KITBUZZER_NOTE_LA_SHARP": "La♯（A♯）",
        "KITBUZZER_NOTE_SI": "Si（B）",
        "KITBUZZER_NOTE_TIP": "仅适用无源蜂鸣器。低／中／高音对应第3／4／5八度；持续发声直到新音符或停止，请在音符之间加入等待积木控制节拍。",
        "KITBUZZER_STOP": "蜂鸣器 %1 停止",
        "KITBUZZER_PLAYING": "读取%1 蜂鸣器发声状态数值",
        "KITBUZZER_READY": "读取%1 蜂鸣器初始化状态数值",
        "KITBUZZER_BEGIN_TIP": "请依模块选有源或无源；触发电位只用於有源蜂鸣器。",
        "KITBUZZER_ACTIVE_TIP": "仅适用有源类型；无源蜂鸣器请使用频率积木。",
        "KITBUZZER_TONE_TIP": "不阻塞回圈。31～20000 Hz；0 表示停止。同时只播放一个无源蜂鸣器，新播放取代上一个。",
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
