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
            "pca9685.name": "PCA9685 Module",
            "pca9685.description": "The 16 channel PWM driver module based on PCA9685, uses IIC bus for communication."
        },
        "ru": {
            "pca9685.name": "Модуль PCA9685 ",
            "pca9685.description": "16-канальный модуль ШИМ-драйвера на базе PCA9685 использующий для связи шину IIC."
        },
        "zh-cn": {
            "pca9685.name": "PCA9685 模块",
            "pca9685.description": "基于 PCA9685 的16通道 PWM 驱动模块, 使用 I2C 总线进行通讯。"
        },
        "zh-tw": {
            "pca9685.name": "PCA9685 模塊",
            "pca9685.description": "基於 PCA9685 的16通道 PWM 驅動模塊, 使用 I2C 總線進行通訊。"
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
            "INIT_GUARD_LABEL_PCA9685": "PCA9685 Module"
        },
        "ru": {
            "INIT_GUARD_TUBIT_REQUIRED": "Поместите блок «Инициализация TUBIT» под блоком «когда Arduino запускается».",
            "INIT_GUARD_SENSOR_REQUIRED": "Поместите блок «Инициализация: %1 %2» под блоком «когда Arduino запускается» перед блоками чтения или использования модуля.",
            "INIT_GUARD_INIT_PLACEMENT": "Поместите блок «Инициализация: %1 %2» непосредственно под блоком «когда Arduino запускается», перед циклами и условиями.",
            "INIT_GUARD_OLED_REQUIRED": "Сначала добавьте блок вывода на OLED и поместите блоки рисования внутрь него либо разместите перед ними блок очистки или обновления дисплея.",
            "INIT_GUARD_PIN_SUFFIX": "контакт %1",
            "INIT_GUARD_INVALID_ID": "Введите неотрицательный целый номер модуля.",
            "INIT_GUARD_LABEL_PCA9685": "Модуль PCA9685"
        },
        "zh-cn": {
            "INIT_GUARD_TUBIT_REQUIRED": "请在Arduino启动的积木底下放置\"TUBIT初始化\"积木",
            "INIT_GUARD_SENSOR_REQUIRED": "请在Arduino启动的积木底下放置\"%1%2初始化\"积木，并放在读取／使用积木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "请将\"%1%2初始化\"积木直接放在Arduino启动底下，且放在重复执行或条件判断之前。",
            "INIT_GUARD_OLED_REQUIRED": "请先放置OLED显示积木，并将绘图积木放在其内，或先放清除／更新显示积木。",
            "INIT_GUARD_PIN_SUFFIX": "引脚%1",
            "INIT_GUARD_INVALID_ID": "模组编号请输入非负整数。",
            "INIT_GUARD_LABEL_PCA9685": "PCA9685 模块"
        },
        "zh-tw": {
            "INIT_GUARD_TUBIT_REQUIRED": "請在Arduino啟動的積木底下放置\"TUBIT初始化\"積木",
            "INIT_GUARD_SENSOR_REQUIRED": "請在Arduino啟動的積木底下放置\"%1%2初始化\"積木，並放在讀取／使用積木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "請將\"%1%2初始化\"積木直接放在Arduino啟動底下，且放在重複執行或條件判斷之前。",
            "INIT_GUARD_OLED_REQUIRED": "請先放置OLED顯示積木，並將繪圖積木放在其內，或先放清除／更新顯示積木。",
            "INIT_GUARD_PIN_SUFFIX": "腳位%1",
            "INIT_GUARD_INVALID_ID": "模組編號請輸入非負整數。",
            "INIT_GUARD_LABEL_PCA9685": "PCA9685 模塊"
        }
    };
    Object.keys(__initGuardMessages).forEach(function (locale) {
        if (!Blockly.ScratchMsgs.locales[locale]) Blockly.ScratchMsgs.locales[locale] = {};
        Object.assign(Blockly.ScratchMsgs.locales[locale], __initGuardMessages[locale]);
    });

    Object.assign(Blockly.ScratchMsgs.locales["en"],
        {
            "PCA9685_CATEGORY": "PCA9685",
            "PCA9685_INIT": "init pca9685 iic address %1",
            "PCA9685_SETALLCHANNELPWM": "pca9685 set all channel pwm value %1",
            "PCA9685_SETALLSERVOANGLE": "pca9685 set all servo angle %1",
            "PCA9685_SETCHANNELPWM": "pca9685 set channel %1 pwm value %2",
            "PCA9685_SETPWMFREQUENCY": "pca9685 set pwm frequency %1",
            "PCA9685_SETSERVOANGLE": "pca9685 set channel %1 servo angle %2",
            "PCA9685_SETTOSERVOMODE": "pca9685 set to servo mode"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["ru"],
        {
            "PCA9685_CATEGORY": "PCA9685",
            "PCA9685_INIT": "инициализировать pca9685 iic адрес %1",
            "PCA9685_SETALLCHANNELPWM": "драйверу pca9685 установить значение ШИМ для всех каналов %1",
            "PCA9685_SETALLSERVOANGLE": "драйверу pca9685 установить все углы сервопривода %1",
            "PCA9685_SETCHANNELPWM": "драйверу pca9685 установить канал %1 значение ШИМ %2",
            "PCA9685_SETPWMFREQUENCY": "драйверу pca9685 установить частоту ШИМ %1",
            "PCA9685_SETSERVOANGLE": "драйверу pca9685 установить канал %1 угол сервопривода %2",
            "PCA9685_SETTOSERVOMODE": "драйвер pca9685 установить в режим сервопривода"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-cn"],
        {
            "PCA9685_CATEGORY": "PCA9685",
            "PCA9685_INIT": "初始化 pca9685 iic 地址 %1",
            "PCA9685_SETALLCHANNELPWM": "pca9685 设置所有通道 pwm 值 %1",
            "PCA9685_SETALLSERVOANGLE": "pca9685 设置所有舵机角度 %1",
            "PCA9685_SETCHANNELPWM": "pca9685 设置通道 %1 pwm 值 %2",
            "PCA9685_SETPWMFREQUENCY": "pca9685 设置 pwm 频率 %1",
            "PCA9685_SETSERVOANGLE": "pca9685 设置通道 %1 舵机角度 %2",
            "PCA9685_SETTOSERVOMODE": "pca9685 设置为舵机模式"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-tw"],
        {
            "PCA9685_CATEGORY": "PCA9685",
            "PCA9685_INIT": "初始化 pca9685 iic 地址 %1",
            "PCA9685_SETALLCHANNELPWM": "pca9685 設置所有通道 pwm 值 %1",
            "PCA9685_SETALLSERVOANGLE": "pca9685 設置所有舵機角度 %1",
            "PCA9685_SETCHANNELPWM": "pca9685 設置通道 %1 pwm 值 %2",
            "PCA9685_SETPWMFREQUENCY": "pca9685 設置 pwm 頻率 %1",
            "PCA9685_SETSERVOANGLE": "pca9685 設置通道 %1 舵機角度 %2",
            "PCA9685_SETTOSERVOMODE": "pca9685 設置為舵機模式"
        }
    );

    return Blockly;
}

if (typeof module !== 'undefined') {
    module.exports = {getInterfaceTranslations};
}
exports = registerScratchExtensionTranslations;
exports = registerBlocksMessages;
