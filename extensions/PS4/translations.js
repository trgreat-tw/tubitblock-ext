// This file was automatically generated.  Do not modify.
/* eslint-disable func-style */
/* eslint-disable require-jsdoc */
/* eslint-disable quote-props */
/* eslint-disable quotes */
/* eslint-disable dot-notation */

function getInterfaceTranslations () {
    return {
        "en": {
            "ps4_controller.name": "ps4_controller",
            "ps4_controller.description": "Connecting a PS4 controller with ESP32."
        },
        "zh-cn": {
            "ps4_controller.name": "ps4_controller",
            "ps4_controller.description": "Connecting a PS4 controller with ESP32."
        },
        "zh-tw": {
            "ps4_controller.name": "PS4 Controller",
            "ps4_controller.description": "使用 ESP32 連接 PS4 手把。"
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
            "INIT_GUARD_LABEL_PS4": "ps4_controller"
        },
        "ru": {
            "INIT_GUARD_TUBIT_REQUIRED": "Поместите блок «Инициализация TUBIT» под блоком «когда Arduino запускается».",
            "INIT_GUARD_SENSOR_REQUIRED": "Поместите блок «Инициализация: %1 %2» под блоком «когда Arduino запускается» перед блоками чтения или использования модуля.",
            "INIT_GUARD_INIT_PLACEMENT": "Поместите блок «Инициализация: %1 %2» непосредственно под блоком «когда Arduino запускается», перед циклами и условиями.",
            "INIT_GUARD_OLED_REQUIRED": "Сначала добавьте блок вывода на OLED и поместите блоки рисования внутрь него либо разместите перед ними блок очистки или обновления дисплея.",
            "INIT_GUARD_PIN_SUFFIX": "контакт %1",
            "INIT_GUARD_INVALID_ID": "Введите неотрицательный целый номер модуля.",
            "INIT_GUARD_LABEL_PS4": "Контроллер PS4"
        },
        "zh-cn": {
            "INIT_GUARD_TUBIT_REQUIRED": "请在Arduino启动的积木底下放置\"TUBIT初始化\"积木",
            "INIT_GUARD_SENSOR_REQUIRED": "请在Arduino启动的积木底下放置\"%1%2初始化\"积木，并放在读取／使用积木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "请将\"%1%2初始化\"积木直接放在Arduino启动底下，且放在重复执行或条件判断之前。",
            "INIT_GUARD_OLED_REQUIRED": "请先放置OLED显示积木，并将绘图积木放在其内，或先放清除／更新显示积木。",
            "INIT_GUARD_PIN_SUFFIX": "引脚%1",
            "INIT_GUARD_INVALID_ID": "模组编号请输入非负整数。",
            "INIT_GUARD_LABEL_PS4": "ps4_controller"
        },
        "zh-tw": {
            "INIT_GUARD_TUBIT_REQUIRED": "請在Arduino啟動的積木底下放置\"TUBIT初始化\"積木",
            "INIT_GUARD_SENSOR_REQUIRED": "請在Arduino啟動的積木底下放置\"%1%2初始化\"積木，並放在讀取／使用積木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "請將\"%1%2初始化\"積木直接放在Arduino啟動底下，且放在重複執行或條件判斷之前。",
            "INIT_GUARD_OLED_REQUIRED": "請先放置OLED顯示積木，並將繪圖積木放在其內，或先放清除／更新顯示積木。",
            "INIT_GUARD_PIN_SUFFIX": "腳位%1",
            "INIT_GUARD_INVALID_ID": "模組編號請輸入非負整數。",
            "INIT_GUARD_LABEL_PS4": "PS4 Controller"
        }
    };
    Object.keys(__initGuardMessages).forEach(function (locale) {
        if (!Blockly.ScratchMsgs.locales[locale]) Blockly.ScratchMsgs.locales[locale] = {};
        Object.assign(Blockly.ScratchMsgs.locales[locale], __initGuardMessages[locale]);
    });

    Object.assign(Blockly.ScratchMsgs.locales["en"],
{
    "PS4_CONTROLLER_CATEGORY": "PS4 Controller",

    "PS4_CONTROLLER_INIT": "Initialize PS4 connection MAC: %1",
    "PS4_CONTROLLER_HELP": "Clears all stored Classic Bluetooth bonds at initialization. MAC is the host address remembered by the controller; all zeros uses the factory address.",
    "PS4_CONTROLLER_IS_CONNECTED": "PS4 is connected",

    "PS4_CONTROLLER_DUMP": "Serial output PS4 status",

    "PS4_CONTROLLER_GET_JOYSTICK": "Read PS4 %1",
    "PS4_CONTROLLER_JOYSTICK_LSTICKX": "Left Stick X",
    "PS4_CONTROLLER_JOYSTICK_LSTICKY": "Left Stick Y",
    "PS4_CONTROLLER_JOYSTICK_RSTICKX": "Right Stick X",
    "PS4_CONTROLLER_JOYSTICK_RSTICKY": "Right Stick Y",
    "PS4_CONTROLLER_JOYSTICK_L2VALUE": "L2",
    "PS4_CONTROLLER_JOYSTICK_R2VALUE": "R2",

    "PS4_CONTROLLER_IS_PRESSED": "PS4 button %1 is pressed",
    "PS4_CONTROLLER_JOYSTICK_BUTTON_UP": "Up",
    "PS4_CONTROLLER_JOYSTICK_BUTTON_DOWN": "Down",
    "PS4_CONTROLLER_JOYSTICK_BUTTON_LEFT": "Left",
    "PS4_CONTROLLER_JOYSTICK_BUTTON_RIGHT": "Right",
    "PS4_CONTROLLER_JOYSTICK_BUTTON_TRIANGLE": "Triangle",
    "PS4_CONTROLLER_JOYSTICK_BUTTON_CIRCLE": "Circle",
    "PS4_CONTROLLER_JOYSTICK_BUTTON_CROSS": "Cross",
    "PS4_CONTROLLER_JOYSTICK_BUTTON_SQUARE": "Square",
    "PS4_CONTROLLER_JOYSTICK_BUTTON_L1": "L1",
    "PS4_CONTROLLER_JOYSTICK_BUTTON_L2": "L2",
    "PS4_CONTROLLER_JOYSTICK_BUTTON_L3": "L3",
    "PS4_CONTROLLER_JOYSTICK_BUTTON_R1": "R1",
    "PS4_CONTROLLER_JOYSTICK_BUTTON_R2": "R2",
    "PS4_CONTROLLER_JOYSTICK_BUTTON_R3": "R3",
    "PS4_CONTROLLER_JOYSTICK_BUTTON_SHARE": "Share",
    "PS4_CONTROLLER_JOYSTICK_BUTTON_OPTIONS": "Options",
    "PS4_CONTROLLER_JOYSTICK_BUTTON_PS": "PS",
    "PS4_CONTROLLER_JOYSTICK_BUTTON_TOUCHPAD": "Touchpad",

    "PS4_CONTROLLER_SET_LED": "Set PS4 LED color to r %1 g %2 b %3",

    "PS4_CONTROLLER_SET_RUMBLE": "Set PS4 rumble strength to %1",

    "PS4_CONTROLLER_GET_ADDRESS": "Get MAC address",

    "PS4_CONTROLLER_GET_BATTERY": "PS4 battery level",
});

Object.assign(Blockly.ScratchMsgs.locales["zh-cn"],
{
    "PS4_CONTROLLER_CATEGORY": "PS4手柄",

    "PS4_CONTROLLER_INIT": "PS4连接初始化 MAC：%1",
    "PS4_CONTROLLER_HELP": "初始化时自动清除ESP32的蓝牙配对记录。MAC填手柄记住的主机地址；全零使用原生地址。",
    "PS4_CONTROLLER_IS_CONNECTED": "PS4已连接",

    "PS4_CONTROLLER_DUMP": "串口输出PS4状态",

    "PS4_CONTROLLER_GET_JOYSTICK": "读取PS4的 %1",
    "PS4_CONTROLLER_JOYSTICK_LSTICKX": "左摇杆 X轴",
    "PS4_CONTROLLER_JOYSTICK_LSTICKY": "左摇杆 Y轴",
    "PS4_CONTROLLER_JOYSTICK_RSTICKX": "右摇杆 X轴",
    "PS4_CONTROLLER_JOYSTICK_RSTICKY": "右摇杆 Y轴",
    "PS4_CONTROLLER_JOYSTICK_L2VALUE": "L2",
    "PS4_CONTROLLER_JOYSTICK_R2VALUE": "R2",

    "PS4_CONTROLLER_IS_PRESSED": "PS4的按钮 %1 被按下",
    "PS4_CONTROLLER_JOYSTICK_BUTTON_UP": "上",
    "PS4_CONTROLLER_JOYSTICK_BUTTON_DOWN": "下",
    "PS4_CONTROLLER_JOYSTICK_BUTTON_LEFT": "左",
    "PS4_CONTROLLER_JOYSTICK_BUTTON_RIGHT": "右",
    "PS4_CONTROLLER_JOYSTICK_BUTTON_TRIANGLE": "三角",
    "PS4_CONTROLLER_JOYSTICK_BUTTON_CIRCLE": "圆",
    "PS4_CONTROLLER_JOYSTICK_BUTTON_CROSS": "叉",
    "PS4_CONTROLLER_JOYSTICK_BUTTON_SQUARE": "方",
    "PS4_CONTROLLER_JOYSTICK_BUTTON_L1": "L1",
    "PS4_CONTROLLER_JOYSTICK_BUTTON_L2": "L2",
    "PS4_CONTROLLER_JOYSTICK_BUTTON_L3": "L3",
    "PS4_CONTROLLER_JOYSTICK_BUTTON_R1": "R1",
    "PS4_CONTROLLER_JOYSTICK_BUTTON_R2": "R2",
    "PS4_CONTROLLER_JOYSTICK_BUTTON_R3": "R3",
    "PS4_CONTROLLER_JOYSTICK_BUTTON_SHARE": "share",
    "PS4_CONTROLLER_JOYSTICK_BUTTON_OPTIONS": "options",
    "PS4_CONTROLLER_JOYSTICK_BUTTON_PS": "PS",
    "PS4_CONTROLLER_JOYSTICK_BUTTON_TOUCHPAD": "touchpad",

    "PS4_CONTROLLER_SET_LED": "设置PS4的灯光为 r %1 g %2 b %3",

    "PS4_CONTROLLER_SET_RUMBLE": "PS4的震动强度为 %1",

    "PS4_CONTROLLER_GET_ADDRESS": "读取控制板MAC地址",

    "PS4_CONTROLLER_GET_BATTERY": "PS4电池电量",
});


    Object.assign(Blockly.ScratchMsgs.locales["zh-tw"],
        {   
            "PS4_CONTROLLER_CATEGORY": "PS4手把",
            
            "PS4_CONTROLLER_INIT": "PS4連線初始化 MAC：%1",
    "PS4_CONTROLLER_HELP": "初始化時自動清除ESP32的藍牙配對紀錄。MAC填手把記住的主機位址；全零使用原生位址。",
            "PS4_CONTROLLER_IS_CONNECTED": "PS4已連接",

            "PS4_CONTROLLER_DUMP": "串口輸出PS4狀態",

            "PS4_CONTROLLER_GET_JOYSTICK": "讀取PS4的 %1",
            "PS4_CONTROLLER_JOYSTICK_LSTICKX": "左搖桿 X 軸",
            "PS4_CONTROLLER_JOYSTICK_LSTICKY": "左搖桿 Y 軸",
            "PS4_CONTROLLER_JOYSTICK_RSTICKX": "右搖桿 X 軸",
            "PS4_CONTROLLER_JOYSTICK_RSTICKY": "右搖桿 Y 軸",
            "PS4_CONTROLLER_JOYSTICK_L2VALUE": "L2",
            "PS4_CONTROLLER_JOYSTICK_R2VALUE": "R2",

            "PS4_CONTROLLER_IS_PRESSED": "PS4的按鈕 %1 被按下",
            "PS4_CONTROLLER_JOYSTICK_BUTTON_UP": "上",
            "PS4_CONTROLLER_JOYSTICK_BUTTON_DOWN": "下",
            "PS4_CONTROLLER_JOYSTICK_BUTTON_LEFT": "左",
            "PS4_CONTROLLER_JOYSTICK_BUTTON_RIGHT": "右",
            "PS4_CONTROLLER_JOYSTICK_BUTTON_TRIANGLE": "三角",
            "PS4_CONTROLLER_JOYSTICK_BUTTON_CIRCLE": "圓",
            "PS4_CONTROLLER_JOYSTICK_BUTTON_CROSS": "叉",
            "PS4_CONTROLLER_JOYSTICK_BUTTON_SQUARE": "方",
            "PS4_CONTROLLER_JOYSTICK_BUTTON_L1": "L1",
            "PS4_CONTROLLER_JOYSTICK_BUTTON_L2": "L2",
            "PS4_CONTROLLER_JOYSTICK_BUTTON_L3": "L3",
            "PS4_CONTROLLER_JOYSTICK_BUTTON_R1": "R1",
            "PS4_CONTROLLER_JOYSTICK_BUTTON_R2": "R2",
            "PS4_CONTROLLER_JOYSTICK_BUTTON_R3": "R3",
            "PS4_CONTROLLER_JOYSTICK_BUTTON_SHARE": "share",
            "PS4_CONTROLLER_JOYSTICK_BUTTON_OPTIONS": "options",
            "PS4_CONTROLLER_JOYSTICK_BUTTON_PS": "PS",
            "PS4_CONTROLLER_JOYSTICK_BUTTON_TOUCHPAD": "touchpad",

            "PS4_CONTROLLER_SET_LED": "設定PS4的燈光為 r %1 g %2 b %3",

            "PS4_CONTROLLER_SET_RUMBLE": "PS4的震動強度為 %1",

            "PS4_CONTROLLER_GET_ADDRESS": "讀取控制板MAC位址",

            "PS4_CONTROLLER_GET_BATTERY": "PS4電池電量",
        }
    );

    return Blockly;
}

if (typeof module !== 'undefined') {
    module.exports = {getInterfaceTranslations};
}

exports = registerScratchExtensionTranslations;
exports = registerBlocksMessages;
