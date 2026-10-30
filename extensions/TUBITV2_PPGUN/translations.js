// This file was automatically generated.  Do not modify.
/* eslint-disable func-style */
/* eslint-disable require-jsdoc */
/* eslint-disable quote-props */
/* eslint-disable quotes */
/* eslint-disable dot-notation */

function getInterfaceTranslations () {
return {
    "en": {
        "tubitv2ppgun.name": "PPGUN kit",
        "tubitv2ppgun.description": "Ping Pong Launcher Control for TuBit V2 MTC Robot Kit."
    },
    "zh-tw": {
        "tubitv2ppgun.name": "乒乓球發射器套件",
        "tubitv2ppgun.description": "適用於 TuBit V2 M/OTC 機器人套件的乒乓球發射器控制"
    },
    "zh-cn": {
        "tubitv2ppgun.name": "乒乓球发射器套件",
        "tubitv2ppgun.description": "适用于 TuBit V2 M/OTC 机器人套件的乒乓球发射器控制"
    }
};

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
            "INIT_GUARD_LABEL_TUBITV2_PPGUN": "PPGUN kit"
        },
        "ru": {
            "INIT_GUARD_TUBIT_REQUIRED": "Поместите блок «Инициализация TUBIT» под блоком «когда Arduino запускается».",
            "INIT_GUARD_SENSOR_REQUIRED": "Поместите блок «Инициализация: %1 %2» под блоком «когда Arduino запускается» перед блоками чтения или использования модуля.",
            "INIT_GUARD_INIT_PLACEMENT": "Поместите блок «Инициализация: %1 %2» непосредственно под блоком «когда Arduino запускается», перед циклами и условиями.",
            "INIT_GUARD_OLED_REQUIRED": "Сначала добавьте блок вывода на OLED и поместите блоки рисования внутрь него либо разместите перед ними блок очистки или обновления дисплея.",
            "INIT_GUARD_PIN_SUFFIX": "контакт %1",
            "INIT_GUARD_INVALID_ID": "Введите неотрицательный целый номер модуля.",
            "INIT_GUARD_LABEL_TUBITV2_PPGUN": "Устройство запуска мячей"
        },
        "zh-cn": {
            "INIT_GUARD_TUBIT_REQUIRED": "请在Arduino启动的积木底下放置\"TUBIT初始化\"积木",
            "INIT_GUARD_SENSOR_REQUIRED": "请在Arduino启动的积木底下放置\"%1%2初始化\"积木，并放在读取／使用积木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "请将\"%1%2初始化\"积木直接放在Arduino启动底下，且放在重复执行或条件判断之前。",
            "INIT_GUARD_OLED_REQUIRED": "请先放置OLED显示积木，并将绘图积木放在其内，或先放清除／更新显示积木。",
            "INIT_GUARD_PIN_SUFFIX": "引脚%1",
            "INIT_GUARD_INVALID_ID": "模组编号请输入非负整数。",
            "INIT_GUARD_LABEL_TUBITV2_PPGUN": "乒乓球发射器套件"
        },
        "zh-tw": {
            "INIT_GUARD_TUBIT_REQUIRED": "請在Arduino啟動的積木底下放置\"TUBIT初始化\"積木",
            "INIT_GUARD_SENSOR_REQUIRED": "請在Arduino啟動的積木底下放置\"%1%2初始化\"積木，並放在讀取／使用積木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "請將\"%1%2初始化\"積木直接放在Arduino啟動底下，且放在重複執行或條件判斷之前。",
            "INIT_GUARD_OLED_REQUIRED": "請先放置OLED顯示積木，並將繪圖積木放在其內，或先放清除／更新顯示積木。",
            "INIT_GUARD_PIN_SUFFIX": "腳位%1",
            "INIT_GUARD_INVALID_ID": "模組編號請輸入非負整數。",
            "INIT_GUARD_LABEL_TUBITV2_PPGUN": "乒乓球發射器套件"
        }
    };
    Object.keys(__initGuardMessages).forEach(function (locale) {
        if (!Blockly.ScratchMsgs.locales[locale]) Blockly.ScratchMsgs.locales[locale] = {};
        Object.assign(Blockly.ScratchMsgs.locales[locale], __initGuardMessages[locale]);
    });


    Object.assign(Blockly.ScratchMsgs.locales["en"],
        {
            "TUBITV2PPGUN_CATEGORY": "Ping Pong Launcher",
            "TUBITV2PPGUN_INIT": "Initialize Ping Pong Launcher Pan Servo %1, Tilt Servo %2, Launch Servo %3",
            "PPGUN_LAUNCH_CONTROL": "Launcher control",
            "TUBITV2SM_0": "S0",
            "TUBITV2SM_1": "S1",
            "TUBITV2SM_2": "S2",
            "TUBITV2SM_3": "S3",
            "TUBITV2SM_4": "S4",
            "TUBITV2SM_5": "S5",
            "TUBITV2SM_6": "S6",
            "TUBITV2SM_7": "S7",
            "TUBITV2PPGUN_LAUNCH": "Launch Ping Pong Ball",
            "TUBITV2PPGUN_LAUNCHANGLE": "Launch Ping Pong Ball, pusher %1°",
            "TUBITV2PPGUN_CHANGETOCRING": "Change to C-ring launcher",
            "TUBITV2PPGUN_CHANGETOCRINGANGLE": "Change to C-ring, pusher %1°",
            "TUBITV2PPGUN_TRCONTROLADD": "Rotate pan by %1 degrees",
            "TUBITV2PPGUN_UDCONTROLADD": "Tilt up/down by %1 degrees",
            "TUBITV2PPGUN_TRCONTROL": "Rotate pan to %1 degrees,%2s",
            "TUBITV2PPGUN_UDCONTROL": "Tilt to %1 degrees,%2s",
            "PPGUN_DEGADD": "Increment Angle Control",
            "PPGUN_DEGSET": "Set Angle (Smooth Motion)"

        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-cn"],
        {
        "TUBITV2PPGUN_CATEGORY": "乒乓球发射器",
        "TUBITV2PPGUN_INIT": "初始化乒乓球发射器 旋转马达%1 , 抬头马达%2 , 发射马达 %3",
        "PPGUN_LAUNCH_CONTROL": "发射器控制",
        "TUBITV2SM_0": "S0",
        "TUBITV2SM_1": "S1",
        "TUBITV2SM_2": "S2",
        "TUBITV2SM_3": "S3",
        "TUBITV2SM_4": "S4",
        "TUBITV2SM_5": "S5",
        "TUBITV2SM_6": "S6",
        "TUBITV2SM_7": "S7",
        "TUBITV2PPGUN_LAUNCH": "发射乒乓球",
        "TUBITV2PPGUN_LAUNCHANGLE": "发射乒乓球 推杆%1度",
        "TUBITV2PPGUN_CHANGETOCRING": "更换C型发射环",
        "TUBITV2PPGUN_CHANGETOCRINGANGLE": "更换C型环 推杆%1度",
        "TUBITV2PPGUN_TRCONTROLADD": "控制转头改变%1度",
        "TUBITV2PPGUN_UDCONTROLADD": "控制抬头改变%1度",
        "TUBITV2PPGUN_TRCONTROL": "控制转头转至%1度,%2秒",
        "TUBITV2PPGUN_UDCONTROL": "控制抬头转至%1度,%2秒",
        "PPGUN_DEGADD": "累加角度控制",
        "PPGUN_DEGSET": "直接设定角度 (平滑转动)"
       }
    );
    

    Object.assign(Blockly.ScratchMsgs.locales["zh-tw"],
        {
            "TUBITV2PPGUN_CATEGORY": "乒乓球發射器",
            "TUBITV2PPGUN_INIT": "初始化乒乓球發射器 水平雲台(轉頭)馬達%1 , 垂直雲台(抬頭)馬達%2 , 發射馬達 %3",
            "PPGUN_LAUNCH_CONTROL": "發射器控制",
            "TUBITV2SM_0": "S0",
            "TUBITV2SM_1": "S1",
            "TUBITV2SM_2": "S2",
            "TUBITV2SM_3": "S3",
            "TUBITV2SM_4": "S4",
            "TUBITV2SM_5": "S5",
            "TUBITV2SM_6": "S6",
            "TUBITV2SM_7": "S7",
            "TUBITV2PPGUN_LAUNCH": "發射乒乓球",
            "TUBITV2PPGUN_LAUNCHANGLE": "發射乒乓球 推桿%1度",
            "TUBITV2PPGUN_CHANGETOCRING": "更換C型發射環",
            "TUBITV2PPGUN_CHANGETOCRINGANGLE": "更換C型環 推桿%1度",
            "TUBITV2PPGUN_TRCONTROLADD": "水平雲台(轉頭)改變%1度",
            "TUBITV2PPGUN_UDCONTROLADD": "垂直雲台(抬頭)改變%1度",
            "TUBITV2PPGUN_TRCONTROL": "水平雲台(轉頭)至%1度,%2秒",
            "TUBITV2PPGUN_UDCONTROL": "垂直雲台(抬頭)至%1度,%2秒",
            "PPGUN_DEGADD": "累加角度控制",
            "PPGUN_DEGSET": "直接設定角度 (平滑轉動)"

        }
    );
    

    return Blockly;
}

if (typeof module !== 'undefined') {
    module.exports = {getInterfaceTranslations};
}

exports = registerScratchExtensionTranslations;
exports = registerBlocksMessages;
