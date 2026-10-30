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
            "passiveBuzzer.name": "Passive Buzzer",
            "passiveBuzzer.description": "Unlike the active buzzer, the passive buzzer can be used to make different tones of sound and play some ringtones."
        },
        "ru": {
            "passiveBuzzer.name": "Пассивный зуммер",
            "passiveBuzzer.description": "В отличие от активного зуммера, пассивный зуммер можно использовать для создания различных тонов звука и воспроизведения некоторых мелодий звонка."
        },
        "zh-cn": {
            "passiveBuzzer.name": "无源蜂鸣器",
            "passiveBuzzer.description": "不同于有源蜂鸣器，无源蜂鸣器可以用来播放不同音调的声音和播放铃声。"
        },
        "zh-tw": {
            "passiveBuzzer.name": "無源蜂鳴器",
            "passiveBuzzer.description": "不同於有源蜂鳴器，無源蜂鳴器可以用來播放不同音調的聲音和播放鈴聲。"
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
            "INIT_GUARD_LABEL_PASSIVEBUZZER": "Passive Buzzer"
        },
        "ru": {
            "INIT_GUARD_TUBIT_REQUIRED": "Поместите блок «Инициализация TUBIT» под блоком «когда Arduino запускается».",
            "INIT_GUARD_SENSOR_REQUIRED": "Поместите блок «Инициализация: %1 %2» под блоком «когда Arduino запускается» перед блоками чтения или использования модуля.",
            "INIT_GUARD_INIT_PLACEMENT": "Поместите блок «Инициализация: %1 %2» непосредственно под блоком «когда Arduino запускается», перед циклами и условиями.",
            "INIT_GUARD_OLED_REQUIRED": "Сначала добавьте блок вывода на OLED и поместите блоки рисования внутрь него либо разместите перед ними блок очистки или обновления дисплея.",
            "INIT_GUARD_PIN_SUFFIX": "контакт %1",
            "INIT_GUARD_INVALID_ID": "Введите неотрицательный целый номер модуля.",
            "INIT_GUARD_LABEL_PASSIVEBUZZER": "Пассивный зуммер"
        },
        "zh-cn": {
            "INIT_GUARD_TUBIT_REQUIRED": "请在Arduino启动的积木底下放置\"TUBIT初始化\"积木",
            "INIT_GUARD_SENSOR_REQUIRED": "请在Arduino启动的积木底下放置\"%1%2初始化\"积木，并放在读取／使用积木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "请将\"%1%2初始化\"积木直接放在Arduino启动底下，且放在重复执行或条件判断之前。",
            "INIT_GUARD_OLED_REQUIRED": "请先放置OLED显示积木，并将绘图积木放在其内，或先放清除／更新显示积木。",
            "INIT_GUARD_PIN_SUFFIX": "引脚%1",
            "INIT_GUARD_INVALID_ID": "模组编号请输入非负整数。",
            "INIT_GUARD_LABEL_PASSIVEBUZZER": "无源蜂鸣器"
        },
        "zh-tw": {
            "INIT_GUARD_TUBIT_REQUIRED": "請在Arduino啟動的積木底下放置\"TUBIT初始化\"積木",
            "INIT_GUARD_SENSOR_REQUIRED": "請在Arduino啟動的積木底下放置\"%1%2初始化\"積木，並放在讀取／使用積木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "請將\"%1%2初始化\"積木直接放在Arduino啟動底下，且放在重複執行或條件判斷之前。",
            "INIT_GUARD_OLED_REQUIRED": "請先放置OLED顯示積木，並將繪圖積木放在其內，或先放清除／更新顯示積木。",
            "INIT_GUARD_PIN_SUFFIX": "腳位%1",
            "INIT_GUARD_INVALID_ID": "模組編號請輸入非負整數。",
            "INIT_GUARD_LABEL_PASSIVEBUZZER": "無源蜂鳴器"
        }
    };
    Object.keys(__initGuardMessages).forEach(function (locale) {
        if (!Blockly.ScratchMsgs.locales[locale]) Blockly.ScratchMsgs.locales[locale] = {};
        Object.assign(Blockly.ScratchMsgs.locales[locale], __initGuardMessages[locale]);
    });

    Object.assign(Blockly.ScratchMsgs.locales["en"],
        {
            "PASSIVEBUZZER_CATEGORY": "Passive Buzzer",
            "PASSIVEBUZZER_CONFUSED": "confused",
            "PASSIVEBUZZER_CONNECTION": "connection",
            "PASSIVEBUZZER_CUDDLY": "cuddly",
            "PASSIVEBUZZER_DIDI": "button pushed",
            "PASSIVEBUZZER_DISCONNECTION": "disconnet",
            "PASSIVEBUZZER_FART1": "fart1",
            "PASSIVEBUZZER_FART2": "fart2",
            "PASSIVEBUZZER_FART3": "fart3",
            "PASSIVEBUZZER_HAPPY": "happy",
            "PASSIVEBUZZER_HAPPYSHORT": "happy short",
            "PASSIVEBUZZER_INIT": "init passive buzzer pin %1",
            "PASSIVEBUZZER_MODE1": "mode1",
            "PASSIVEBUZZER_MODE2": "mode2",
            "PASSIVEBUZZER_MODE3": "mode3",
            "PASSIVEBUZZER_OHOOH": "OhOoh",
            "PASSIVEBUZZER_OHOOH2": "OhOoh2",
            "PASSIVEBUZZER_PLAYRINGTONE": "play ringtone %1",
            "PASSIVEBUZZER_PLAYTONEFORBEAT": "play tone %1 for %2 beat",
            "PASSIVEBUZZER_SAD": "sad",
            "PASSIVEBUZZER_SETTEMPO": "set tempo to (bpm) %1",
            "PASSIVEBUZZER_SLEEPING": "sleeping",
            "PASSIVEBUZZER_SUPERHAPPY": "super happy",
            "PASSIVEBUZZER_SURPRISE": "surprise"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["ru"],
        {
            "PASSIVEBUZZER_CATEGORY": "Пассивный зуммер",
            "PASSIVEBUZZER_CONFUSED": "Смущенный",
            "PASSIVEBUZZER_CONNECTION": "Соединение",
            "PASSIVEBUZZER_CUDDLY": "Приятный",
            "PASSIVEBUZZER_DIDI": "Кнопка нажата",
            "PASSIVEBUZZER_DISCONNECTION": "Отключить",
            "PASSIVEBUZZER_FART1": "Выдох1",
            "PASSIVEBUZZER_FART2": "Выдох2",
            "PASSIVEBUZZER_FART3": "Выдох3",
            "PASSIVEBUZZER_HAPPY": "Счастливый",
            "PASSIVEBUZZER_HAPPYSHORT": "Немного счастлив",
            "PASSIVEBUZZER_INIT": "Инициализировать пассивный зуммер на пине %1",
            "PASSIVEBUZZER_MODE1": "Режим1",
            "PASSIVEBUZZER_MODE2": "Режим2",
            "PASSIVEBUZZER_MODE3": "Режим3",
            "PASSIVEBUZZER_OHOOH": "Ой-ой",
            "PASSIVEBUZZER_OHOOH2": "Ой-ой-ой",
            "PASSIVEBUZZER_PLAYRINGTONE": "Проиграть рингтон %1",
            "PASSIVEBUZZER_PLAYTONEFORBEAT": "Играть ноту %1  длительностью %2 ударов",
            "PASSIVEBUZZER_SAD": "Грустный",
            "PASSIVEBUZZER_SETTEMPO": "Установить темп в %1 ударов в минуту",
            "PASSIVEBUZZER_SLEEPING": "Спящий",
            "PASSIVEBUZZER_SUPERHAPPY": "Очень счастливый",
            "PASSIVEBUZZER_SURPRISE": "Сюрприз"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-cn"],
        {
            "PASSIVEBUZZER_CATEGORY": "无源蜂鸣器",
            "PASSIVEBUZZER_CONFUSED": "困惑",
            "PASSIVEBUZZER_CONNECTION": "连接",
            "PASSIVEBUZZER_CUDDLY": "可爱",
            "PASSIVEBUZZER_DIDI": "按键按下",
            "PASSIVEBUZZER_DISCONNECTION": "断开",
            "PASSIVEBUZZER_FART1": "放屁1",
            "PASSIVEBUZZER_FART2": "放屁2",
            "PASSIVEBUZZER_FART3": "放屁3",
            "PASSIVEBUZZER_HAPPY": "开心",
            "PASSIVEBUZZER_HAPPYSHORT": "开心短",
            "PASSIVEBUZZER_INIT": "初始化无源蜂鸣器引脚 %1",
            "PASSIVEBUZZER_MODE1": "模式1",
            "PASSIVEBUZZER_MODE2": "模式2",
            "PASSIVEBUZZER_MODE3": "模式3",
            "PASSIVEBUZZER_OHOOH": "哦哦",
            "PASSIVEBUZZER_OHOOH2": "哦哦2",
            "PASSIVEBUZZER_PLAYRINGTONE": "播放铃声 %1",
            "PASSIVEBUZZER_PLAYTONEFORBEAT": "播放音调 %1 持续 %2 节拍",
            "PASSIVEBUZZER_SAD": "难过",
            "PASSIVEBUZZER_SETTEMPO": "设置节奏为 (bpm) %1",
            "PASSIVEBUZZER_SLEEPING": "正在睡觉",
            "PASSIVEBUZZER_SUPERHAPPY": "非常开心",
            "PASSIVEBUZZER_SURPRISE": "惊讶"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-tw"],
        {
            "PASSIVEBUZZER_CATEGORY": "無源蜂鳴器",
            "PASSIVEBUZZER_CONFUSED": "困惑",
            "PASSIVEBUZZER_CONNECTION": "連接",
            "PASSIVEBUZZER_CUDDLY": "可愛",
            "PASSIVEBUZZER_DIDI": "按鍵按下",
            "PASSIVEBUZZER_DISCONNECTION": "斷開",
            "PASSIVEBUZZER_FART1": "放屁1",
            "PASSIVEBUZZER_FART2": "放屁2",
            "PASSIVEBUZZER_FART3": "放屁3",
            "PASSIVEBUZZER_HAPPY": "開心",
            "PASSIVEBUZZER_HAPPYSHORT": "開心短",
            "PASSIVEBUZZER_INIT": "初始化無源蜂鳴器管腳 %1",
            "PASSIVEBUZZER_MODE1": "模式1",
            "PASSIVEBUZZER_MODE2": "模式2",
            "PASSIVEBUZZER_MODE3": "模式3",
            "PASSIVEBUZZER_OHOOH": "哦哦",
            "PASSIVEBUZZER_OHOOH2": "哦哦2",
            "PASSIVEBUZZER_PLAYRINGTONE": "播放鈴聲 %1",
            "PASSIVEBUZZER_PLAYTONEFORBEAT": "播放音調 %1 持續 %2 節拍",
            "PASSIVEBUZZER_SAD": "難過",
            "PASSIVEBUZZER_SETTEMPO": "設置節奏為 (bpm) %1",
            "PASSIVEBUZZER_SLEEPING": "正在睡覺",
            "PASSIVEBUZZER_SUPERHAPPY": "非常開心",
            "PASSIVEBUZZER_SURPRISE": "驚訝"
        }
    );

    return Blockly;
}

if (typeof module !== 'undefined') {
    module.exports = {getInterfaceTranslations};
}
exports = registerScratchExtensionTranslations;
exports = registerBlocksMessages;
