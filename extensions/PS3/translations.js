// This file was automatically generated.  Do not modify.
/* eslint-disable func-style */
/* eslint-disable require-jsdoc */
/* eslint-disable quote-props */
/* eslint-disable quotes */
/* eslint-disable dot-notation */

function getInterfaceTranslations () {
    return {
        "en": {
            "ps3_controller.name": "ps3_controller",
            "ps3_controller.description": "Connecting a PS3 controller with ESP32."
        },
        "zh-cn": {
            "ps3_controller.name": "ps3_controller",
            "ps3_controller.description": "Connecting a PS3 controller with ESP32."
        },
        "zh-tw": {
            "ps3_controller.name": "PS3 Controller",
            "ps3_controller.description": "使用 ESP32 連接 PS3 手把。"
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
            "INIT_GUARD_LABEL_PS3": "ps3_controller"
        },
        "ru": {
            "INIT_GUARD_TUBIT_REQUIRED": "Поместите блок «Инициализация TUBIT» под блоком «когда Arduino запускается».",
            "INIT_GUARD_SENSOR_REQUIRED": "Поместите блок «Инициализация: %1 %2» под блоком «когда Arduino запускается» перед блоками чтения или использования модуля.",
            "INIT_GUARD_INIT_PLACEMENT": "Поместите блок «Инициализация: %1 %2» непосредственно под блоком «когда Arduino запускается», перед циклами и условиями.",
            "INIT_GUARD_OLED_REQUIRED": "Сначала добавьте блок вывода на OLED и поместите блоки рисования внутрь него либо разместите перед ними блок очистки или обновления дисплея.",
            "INIT_GUARD_PIN_SUFFIX": "контакт %1",
            "INIT_GUARD_INVALID_ID": "Введите неотрицательный целый номер модуля.",
            "INIT_GUARD_LABEL_PS3": "Контроллер PS3"
        },
        "zh-cn": {
            "INIT_GUARD_TUBIT_REQUIRED": "请在Arduino启动的积木底下放置\"TUBIT初始化\"积木",
            "INIT_GUARD_SENSOR_REQUIRED": "请在Arduino启动的积木底下放置\"%1%2初始化\"积木，并放在读取／使用积木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "请将\"%1%2初始化\"积木直接放在Arduino启动底下，且放在重复执行或条件判断之前。",
            "INIT_GUARD_OLED_REQUIRED": "请先放置OLED显示积木，并将绘图积木放在其内，或先放清除／更新显示积木。",
            "INIT_GUARD_PIN_SUFFIX": "引脚%1",
            "INIT_GUARD_INVALID_ID": "模组编号请输入非负整数。",
            "INIT_GUARD_LABEL_PS3": "ps3_controller"
        },
        "zh-tw": {
            "INIT_GUARD_TUBIT_REQUIRED": "請在Arduino啟動的積木底下放置\"TUBIT初始化\"積木",
            "INIT_GUARD_SENSOR_REQUIRED": "請在Arduino啟動的積木底下放置\"%1%2初始化\"積木，並放在讀取／使用積木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "請將\"%1%2初始化\"積木直接放在Arduino啟動底下，且放在重複執行或條件判斷之前。",
            "INIT_GUARD_OLED_REQUIRED": "請先放置OLED顯示積木，並將繪圖積木放在其內，或先放清除／更新顯示積木。",
            "INIT_GUARD_PIN_SUFFIX": "腳位%1",
            "INIT_GUARD_INVALID_ID": "模組編號請輸入非負整數。",
            "INIT_GUARD_LABEL_PS3": "PS3 Controller"
        }
    };
    Object.keys(__initGuardMessages).forEach(function (locale) {
        if (!Blockly.ScratchMsgs.locales[locale]) Blockly.ScratchMsgs.locales[locale] = {};
        Object.assign(Blockly.ScratchMsgs.locales[locale], __initGuardMessages[locale]);
    });

    Object.assign(Blockly.ScratchMsgs.locales["en"], {
        "PS3_CONTROLLER_CATEGORY": "PS3 Controller",
        "PS3_CONTROLLER_INIT": "Initialize PS3 connection MAC: %1",
        "PS3_CONTROLLER_IS_CONNECTED": "PS3 is connected",
        "PS3_CONTROLLER_DUMP": "Output PS3 status",
        "PS3_CONTROLLER_GET_JOYSTICK": "Read PS3 %1",
        "PS3_CONTROLLER_JOYSTICK_LSTICKX": "Left Stick X",
        "PS3_CONTROLLER_JOYSTICK_LSTICKY": "Left Stick Y",
        "PS3_CONTROLLER_JOYSTICK_RSTICKX": "Right Stick X",
        "PS3_CONTROLLER_JOYSTICK_RSTICKY": "Right Stick Y",
        "PS3_CONTROLLER_JOYSTICK_L2VALUE": "L2",
        "PS3_CONTROLLER_JOYSTICK_R2VALUE": "R2",
        "PS3_CONTROLLER_IS_PRESSED": "PS3 button %1 is pressed",
        "PS3_CONTROLLER_JOYSTICK_BUTTON_UP": "Up",
        "PS3_CONTROLLER_JOYSTICK_BUTTON_DOWN": "Down",
        "PS3_CONTROLLER_JOYSTICK_BUTTON_LEFT": "Left",
        "PS3_CONTROLLER_JOYSTICK_BUTTON_RIGHT": "Right",
        "PS3_CONTROLLER_JOYSTICK_BUTTON_TRIANGLE": "Triangle",
        "PS3_CONTROLLER_JOYSTICK_BUTTON_CIRCLE": "Circle",
        "PS3_CONTROLLER_JOYSTICK_BUTTON_CROSS": "Cross",
        "PS3_CONTROLLER_JOYSTICK_BUTTON_SQUARE": "Square",
        "PS3_CONTROLLER_JOYSTICK_BUTTON_L1": "L1",
        "PS3_CONTROLLER_JOYSTICK_BUTTON_L2": "L2",
        "PS3_CONTROLLER_JOYSTICK_BUTTON_L3": "L3",
        "PS3_CONTROLLER_JOYSTICK_BUTTON_R1": "R1",
        "PS3_CONTROLLER_JOYSTICK_BUTTON_R2": "R2",
        "PS3_CONTROLLER_JOYSTICK_BUTTON_R3": "R3",
        "PS3_CONTROLLER_JOYSTICK_BUTTON_SHARE": "SELECT",
        "PS3_CONTROLLER_JOYSTICK_BUTTON_OPTIONS": "START",
        "PS3_CONTROLLER_JOYSTICK_BUTTON_PS": "PS",
        "PS3_CONTROLLER_JOYSTICK_BUTTON_TOUCHPAD": "Touchpad",
        "PS3_CONTROLLER_SET_PLAYER": "Set PS3 player number to %1",
        "PS3_CONTROLLER_SET_RUMBLE_MS": "Set PS3 rumble to %1 intensity for %2 ms",
        "PS3_CONTROLLER_GET_ADDRESS": "Get MAC address",
        "PS3_CONTROLLER_GET_BATTERY": "PS3 battery level",
        "PS3_ON_BUTTON_EVENT": "When PS3 button %1 is %2",
        "PS3_ON_CONNECT_EVENT": "When PS3 is %1",
        "PS3_ON_JOYSTICK_CHANGE": "When %1 axis changes"
    });

    Object.assign(Blockly.ScratchMsgs.locales["zh-cn"], {
        "PS3_CONTROLLER_CATEGORY": "PS3手柄",
        "PS3_CONTROLLER_INIT": "PS3连接初始化 MAC：%1",
        "PS3_CONTROLLER_IS_CONNECTED": "PS3已连接",
        "PS3_CONTROLLER_DUMP": "输出PS3状态",
        "PS3_CONTROLLER_GET_JOYSTICK": "读取PS3的 %1",
        "PS3_CONTROLLER_JOYSTICK_LSTICKX": "左摇杆 X轴",
        "PS3_CONTROLLER_JOYSTICK_LSTICKY": "左摇杆 Y轴",
        "PS3_CONTROLLER_JOYSTICK_RSTICKX": "右摇杆 X轴",
        "PS3_CONTROLLER_JOYSTICK_RSTICKY": "右摇杆 Y轴",
        "PS3_CONTROLLER_JOYSTICK_L2VALUE": "L2",
        "PS3_CONTROLLER_JOYSTICK_R2VALUE": "R2",
        "PS3_CONTROLLER_IS_PRESSED": "PS3的按钮 %1 被按下",
        "PS3_CONTROLLER_JOYSTICK_BUTTON_UP": "上",
        "PS3_CONTROLLER_JOYSTICK_BUTTON_DOWN": "下",
        "PS3_CONTROLLER_JOYSTICK_BUTTON_LEFT": "左",
        "PS3_CONTROLLER_JOYSTICK_BUTTON_RIGHT": "右",
        "PS3_CONTROLLER_JOYSTICK_BUTTON_TRIANGLE": "三角",
        "PS3_CONTROLLER_JOYSTICK_BUTTON_CIRCLE": "圆",
        "PS3_CONTROLLER_JOYSTICK_BUTTON_CROSS": "叉",
        "PS3_CONTROLLER_JOYSTICK_BUTTON_SQUARE": "方",
        "PS3_CONTROLLER_JOYSTICK_BUTTON_L1": "L1",
        "PS3_CONTROLLER_JOYSTICK_BUTTON_L2": "L2",
        "PS3_CONTROLLER_JOYSTICK_BUTTON_L3": "L3",
        "PS3_CONTROLLER_JOYSTICK_BUTTON_R1": "R1",
        "PS3_CONTROLLER_JOYSTICK_BUTTON_R2": "R2",
        "PS3_CONTROLLER_JOYSTICK_BUTTON_R3": "R3",
        "PS3_CONTROLLER_JOYSTICK_BUTTON_SHARE": "SELECT",
        "PS3_CONTROLLER_JOYSTICK_BUTTON_OPTIONS": "START",
        "PS3_CONTROLLER_JOYSTICK_BUTTON_PS": "PS",
        "PS3_CONTROLLER_JOYSTICK_BUTTON_TOUCHPAD": "touchpad",
        "PS3_CONTROLLER_SET_PLAYER": "设置PS3的玩家编号为 %1",
        "PS3_CONTROLLER_SET_RUMBLE_MS": "设置PS3震动强度为 %1，持续 %2 毫秒",
        "PS3_CONTROLLER_GET_ADDRESS": "读取控制板MAC地址",
        "PS3_CONTROLLER_GET_BATTERY": "PS3电池电量",
        "PS3_ON_BUTTON_EVENT": "当PS3的按键 %1 被 %2 时",
        "PS3_ON_CONNECT_EVENT": "当 PS3 %1 时",
        "PS3_ON_JOYSTICK_CHANGE": "当 %1 轴的数值发生变化时"
    });

    Object.assign(Blockly.ScratchMsgs.locales["zh-tw"], {
        "PS3_CONTROLLER_CATEGORY": "PS3手把",
        "PS3_CONTROLLER_INIT": "PS3連線初始化 MAC：%1",
        "PS3_CONTROLLER_IS_CONNECTED": "PS3已連接",
        "PS3_CONTROLLER_DUMP": "輸出PS3狀態",
        "PS3_CONTROLLER_GET_JOYSTICK": "讀取PS3的 %1",
        "PS3_CONTROLLER_JOYSTICK_LSTICKX": "左搖桿 X 軸",
        "PS3_CONTROLLER_JOYSTICK_LSTICKY": "左搖桿 Y 軸",
        "PS3_CONTROLLER_JOYSTICK_RSTICKX": "右搖桿 X 軸",
        "PS3_CONTROLLER_JOYSTICK_RSTICKY": "右搖桿 Y 軸",
        "PS3_CONTROLLER_JOYSTICK_L2VALUE": "L2",
        "PS3_CONTROLLER_JOYSTICK_R2VALUE": "R2",
        "PS3_CONTROLLER_IS_PRESSED": "PS3的按鈕 %1 被按下",
        "PS3_CONTROLLER_JOYSTICK_BUTTON_UP": "上",
        "PS3_CONTROLLER_JOYSTICK_BUTTON_DOWN": "下",
        "PS3_CONTROLLER_JOYSTICK_BUTTON_LEFT": "左",
        "PS3_CONTROLLER_JOYSTICK_BUTTON_RIGHT": "右",
        "PS3_CONTROLLER_JOYSTICK_BUTTON_TRIANGLE": "三角",
        "PS3_CONTROLLER_JOYSTICK_BUTTON_CIRCLE": "圓",
        "PS3_CONTROLLER_JOYSTICK_BUTTON_CROSS": "叉",
        "PS3_CONTROLLER_JOYSTICK_BUTTON_SQUARE": "方",
        "PS3_CONTROLLER_JOYSTICK_BUTTON_L1": "L1",
        "PS3_CONTROLLER_JOYSTICK_BUTTON_L2": "L2",
        "PS3_CONTROLLER_JOYSTICK_BUTTON_L3": "L3",
        "PS3_CONTROLLER_JOYSTICK_BUTTON_R1": "R1",
        "PS3_CONTROLLER_JOYSTICK_BUTTON_R2": "R2",
        "PS3_CONTROLLER_JOYSTICK_BUTTON_R3": "R3",
        "PS3_CONTROLLER_JOYSTICK_BUTTON_SHARE": "SELECT",
        "PS3_CONTROLLER_JOYSTICK_BUTTON_OPTIONS": "START",
        "PS3_CONTROLLER_JOYSTICK_BUTTON_PS": "PS",
        "PS3_CONTROLLER_JOYSTICK_BUTTON_TOUCHPAD": "touchpad",
        "PS3_CONTROLLER_SET_PLAYER": "設定PS3的玩家編號為 %1",
        "PS3_CONTROLLER_SET_RUMBLE_MS": "設定PS3的震動強度為 %1，持續 %2 毫秒",
        "PS3_CONTROLLER_GET_ADDRESS": "讀取控制板MAC位址",
        "PS3_CONTROLLER_GET_BATTERY": "PS3電池電量",
        "PS3_ON_BUTTON_EVENT": "當 PS3 的按鈕 %1 被 %2 時",
        "PS3_ON_CONNECT_EVENT": "當 PS3 %1 時",
        "PS3_ON_JOYSTICK_CHANGE": "當 %1 軸的值改變時"
    });

    return Blockly;
}

if (typeof module !== 'undefined') {
    module.exports = {getInterfaceTranslations};
}

exports = registerScratchExtensionTranslations;
exports = registerBlocksMessages;
