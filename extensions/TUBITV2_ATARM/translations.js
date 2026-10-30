// This file was automatically generated.  Do not modify.
/* eslint-disable func-style */
/* eslint-disable require-jsdoc */
/* eslint-disable quote-props */
/* eslint-disable quotes */
/* eslint-disable dot-notation */

function getInterfaceTranslations () {
return {
  "en": {
    "tubitv2atarm.name": "ROBOT ARM kit",
    "tubitv2atarm.description": "Robot Arm Control for TuBit V2 M/OTC Robot Kit."
  },
  "zh-tw": {
    "tubitv2atarm.name": "機械手臂套件",
    "tubitv2atarm.description": "適用於 TuBit V2 M/OTC 機器人套件的機械手臂控制"
  },
  "zh-cn": {
    "tubitv2atarm.name": "机械手臂套件",
    "tubitv2atarm.description": "适用于 TuBit V2 M/OTC 机器人套件的机械手臂控制"
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
            "INIT_GUARD_LABEL_TUBITV2_ATARM": "ROBOT ARM kit"
        },
        "ru": {
            "INIT_GUARD_TUBIT_REQUIRED": "Поместите блок «Инициализация TUBIT» под блоком «когда Arduino запускается».",
            "INIT_GUARD_SENSOR_REQUIRED": "Поместите блок «Инициализация: %1 %2» под блоком «когда Arduino запускается» перед блоками чтения или использования модуля.",
            "INIT_GUARD_INIT_PLACEMENT": "Поместите блок «Инициализация: %1 %2» непосредственно под блоком «когда Arduino запускается», перед циклами и условиями.",
            "INIT_GUARD_OLED_REQUIRED": "Сначала добавьте блок вывода на OLED и поместите блоки рисования внутрь него либо разместите перед ними блок очистки или обновления дисплея.",
            "INIT_GUARD_PIN_SUFFIX": "контакт %1",
            "INIT_GUARD_INVALID_ID": "Введите неотрицательный целый номер модуля.",
            "INIT_GUARD_LABEL_TUBITV2_ATARM": "Роботизированная рука"
        },
        "zh-cn": {
            "INIT_GUARD_TUBIT_REQUIRED": "请在Arduino启动的积木底下放置\"TUBIT初始化\"积木",
            "INIT_GUARD_SENSOR_REQUIRED": "请在Arduino启动的积木底下放置\"%1%2初始化\"积木，并放在读取／使用积木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "请将\"%1%2初始化\"积木直接放在Arduino启动底下，且放在重复执行或条件判断之前。",
            "INIT_GUARD_OLED_REQUIRED": "请先放置OLED显示积木，并将绘图积木放在其内，或先放清除／更新显示积木。",
            "INIT_GUARD_PIN_SUFFIX": "引脚%1",
            "INIT_GUARD_INVALID_ID": "模组编号请输入非负整数。",
            "INIT_GUARD_LABEL_TUBITV2_ATARM": "机械手臂套件"
        },
        "zh-tw": {
            "INIT_GUARD_TUBIT_REQUIRED": "請在Arduino啟動的積木底下放置\"TUBIT初始化\"積木",
            "INIT_GUARD_SENSOR_REQUIRED": "請在Arduino啟動的積木底下放置\"%1%2初始化\"積木，並放在讀取／使用積木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "請將\"%1%2初始化\"積木直接放在Arduino啟動底下，且放在重複執行或條件判斷之前。",
            "INIT_GUARD_OLED_REQUIRED": "請先放置OLED顯示積木，並將繪圖積木放在其內，或先放清除／更新顯示積木。",
            "INIT_GUARD_PIN_SUFFIX": "腳位%1",
            "INIT_GUARD_INVALID_ID": "模組編號請輸入非負整數。",
            "INIT_GUARD_LABEL_TUBITV2_ATARM": "機械手臂套件"
        }
    };
    Object.keys(__initGuardMessages).forEach(function (locale) {
        if (!Blockly.ScratchMsgs.locales[locale]) Blockly.ScratchMsgs.locales[locale] = {};
        Object.assign(Blockly.ScratchMsgs.locales[locale], __initGuardMessages[locale]);
    });


    Object.assign(Blockly.ScratchMsgs.locales["en"],
        {
        "TUBITV2ATARM_CATEGORY": "Robot Arm",
        "TUBITV2ATARM_INIT": "Initialize Robot Arm Horizontal gimbal (pan) motor %1 , Vertical gimbal (lift) motor %2 , Claw motor %3",
        "TUBITV2SM_0": "S0",
        "TUBITV2SM_1": "S1",
        "TUBITV2SM_2": "S2",
        "TUBITV2SM_3": "S3",
        "TUBITV2SM_4": "S4",
        "TUBITV2SM_5": "S5",
        "TUBITV2SM_6": "S6",
        "TUBITV2SM_7": "S7",
        "ATARM_CLAW": "Claw control",
        "TUBITV2ATARM_SET": "Arm motor parameter settings",
        "TUBITV2ATARM_CLAWSET_NOTE":"Default claw open/close angle: smaller angle opens the claw",
        "TUBITV2ATARM_CLAWSET":"Claw settings Release/Open angle %1° Grab/Close angle %2°",
        "TUBITV2ATARM_LIFTSET":"Lift settings Lower at %1° ,Raise at %2°",
        "TUBITV2ATARM_PANSET":"Pan settings  Left:%1,Right%2",
        "TUBITV2ATARM_CLAW":"Claw %1,%2s",
        "TUBITV2CLAW_OP":"Grab",
        "TUBITV2CLAW_CL":"Release",
        "TUBITV2ATARM_CLAWADD": "Incrementally %1 claw by %2°",
        "TUBITV2CLAW_ADD_OPEN": "open",
        "TUBITV2CLAW_ADD_CLOSE": "close",
        "TUBITV2ATARM_TRCONTROLADD": "Horizontal gimbal (pan) change %1°",
        "TUBITV2ATARM_UDCONTROLADD": "Vertical gimbal (lift) change %1°",
        "TUBITV2ATARM_TRCONTROL": "Horizontal gimbal (pan) to %1° in %2s",
        "TUBITV2ATARM_UDCONTROL": "Vertical gimbal (lift) to %1° in %2s",
        "ATARM_DEGADD": "Incremental angle control",
        "ATARM_DEGSET": "Direct angle setting (smooth movement)"

        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-cn"],
        {
        "TUBITV2ATARM_CATEGORY": "机械手臂",
        "TUBITV2ATARM_INIT": "初始化机械手臂 水平云台(转头)马达%1 , 垂直云台(抬臂)马达%2 , 夹爪马达 %3",
        "TUBITV2SM_0": "S0",
        "TUBITV2SM_1": "S1",
        "TUBITV2SM_2": "S2",
        "TUBITV2SM_3": "S3",
        "TUBITV2SM_4": "S4",
        "TUBITV2SM_5": "S5",
        "TUBITV2SM_6": "S6",
        "TUBITV2SM_7": "S7",
        "ATARM_CLAW": "夹爪控制",
        "TUBITV2ATARM_SET": "手臂马达参数设置",
        "TUBITV2ATARM_CLAWSET_NOTE":"默认夹爪开合角度：角度越小，夹爪越开",
        "TUBITV2ATARM_CLAWSET":"夹爪设置 放开角度%1度 抓取角度%2度",
        "TUBITV2ATARM_LIFTSET":"抬臂设置 放下%1度,抬起%2度",
        "TUBITV2ATARM_PANSET":"水平云台設定 最左邊%1,最右邊%2",
        "TUBITV2ATARM_CLAW":"夹爪%1,%2秒数",
        "TUBITV2CLAW_OP":"抓起",
        "TUBITV2CLAW_CL":"放开",
        "TUBITV2ATARM_CLAWADD": "夹爪累计%1 %2度",
        "TUBITV2CLAW_ADD_OPEN": "打开",
        "TUBITV2CLAW_ADD_CLOSE": "关闭",
        "TUBITV2ATARM_TRCONTROLADD": "水平云台(转头)改变%1度",
        "TUBITV2ATARM_UDCONTROLADD": "垂直云台(抬臂)改变%1度",
        "TUBITV2ATARM_TRCONTROL": "水平云台(转头)至%1度,%2秒",
        "TUBITV2ATARM_UDCONTROL": "垂直云台(抬臂)至%1度,%2秒",
        "ATARM_DEGADD": "累加角度控制",
        "ATARM_DEGSET": "直接设置角度 (平滑转动)"
       }
    );
    

    Object.assign(Blockly.ScratchMsgs.locales["zh-tw"],
        {
            "TUBITV2ATARM_CATEGORY": "機械手臂",
            "TUBITV2ATARM_INIT": "初始化機械手臂 水平雲台(轉頭)馬達%1 , 垂直雲台(抬頭)馬達%2 , 夾爪馬達 %3",
            "TUBITV2SM_0": "S0",
            "TUBITV2SM_1": "S1",
            "TUBITV2SM_2": "S2",
            "TUBITV2SM_3": "S3",
            "TUBITV2SM_4": "S4",
            "TUBITV2SM_5": "S5",
            "TUBITV2SM_6": "S6",
            "TUBITV2SM_7": "S7",
            "ATARM_CLAW": "夾爪控制",
            "TUBITV2ATARM_SET": "手臂馬達參數設定",
            "TUBITV2ATARM_CLAWSET_NOTE":"預設夾抓開闔角度：角度越小，夾抓越開",
            "TUBITV2ATARM_CLAWSET":"夾爪設定 放開角度%1度 抓取角度%2度",
            "TUBITV2ATARM_LIFTSET":"抬臂設定 放下角度%1,抬起角度%2",
            "TUBITV2ATARM_PANSET":"轉軸設定 最左邊%1,最右邊%2",
            "TUBITV2ATARM_CLAW":"夾爪%1,%2秒",
            "TUBITV2CLAW_OP":"抓起",
            "TUBITV2CLAW_CL":"放開",
            "TUBITV2ATARM_CLAWADD": "夾爪累計%1 %2度",
            "TUBITV2CLAW_ADD_OPEN": "打開",
            "TUBITV2CLAW_ADD_CLOSE": "關閉",
            "TUBITV2ATARM_TRCONTROLADD": "水平雲台(轉軸)改變%1度",
            "TUBITV2ATARM_UDCONTROLADD": "垂直雲台(抬臂)改變%1度",
            "TUBITV2ATARM_TRCONTROL": "水平雲台(轉軸)至%1度,%2秒",
            "TUBITV2ATARM_UDCONTROL": "垂直雲台(抬臂)至%1度,%2秒",
            "ATARM_DEGADD": "累加角度控制",
            "ATARM_DEGSET": "直接設定角度 (平滑轉動)"

        }
    );
    

    return Blockly;
}

if (typeof module !== 'undefined') {
    module.exports = {getInterfaceTranslations};
}

exports = registerScratchExtensionTranslations;
exports = registerBlocksMessages;
