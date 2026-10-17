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
            "l298n.name": "Motor Control",
            "l298n.description": "Universal two-pin DC motor control using MA and MB."
        },
        "ru": {
            "l298n.name": "Управление двигателем",
            "l298n.description": "Универсальное двухконтактное управление двигателем постоянного тока через MA и MB."
        },
        "zh-cn": {
            "l298n.name": "电机控制",
            "l298n.description": "使用 MA 与 MB 两个 PWM 引脚控制单颗直流电机。"
        },
        "zh-tw": {
            "l298n.name": "馬達控制",
            "l298n.description": "使用 MA 與 MB 兩個 PWM 腳位控制單顆直流馬達。"
        }
    }
    ;
}

function registerScratchExtensionTranslations () {
    return {};
}

function registerBlocksMessages (Blockly) {
    Object.assign(Blockly.ScratchMsgs.locales["en"],
        {
            "L298N_BACK": "back",
            "L298N_CATEGORY": "Motor Control",
            "L298N_FORWARD": "forward",
            "L298N_INIT": "init channel %1 pin IN1 %2 IN2 %3 EN %4",
            "L298N_RUN": "channel %1 run %2 speed %3",
            "L298N_STOP": "channel %1 stop",
            "MOTOR_CONTROL_BACKWARD": "backward",
            "MOTOR_CONTROL_FORWARD": "forward",
            "MOTOR_CONTROL_INIT": "initialize motor control MA pin %1 MB pin %2",
            "MOTOR_CONTROL_INIT_TOOLTIP": "Connect one motor's red wire to MA and black wire to MB. Choose two different PWM-capable control pins. For L298N, keep the channel enable jumper installed.",
            "MOTOR_CONTROL_RUN": "motor run %1 speed %2",
            "MOTOR_CONTROL_RUN_TOOLTIP": "Forward outputs PWM on MA and LOW on MB; backward swaps the two outputs.",
            "MOTOR_CONTROL_STOP": "stop motor"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["ru"],
        {
            "L298N_BACK": "Назад",
            "L298N_CATEGORY": "Управление двигателем",
            "L298N_FORWARD": "Вперед",
            "L298N_INIT": "Инициализировать канал %1 на пинах IN1 %2 IN2 %3 EN %4",
            "L298N_RUN": "Канал %1 включить %2 скорость %3",
            "L298N_STOP": "Канал %1 остановить",
            "MOTOR_CONTROL_BACKWARD": "Назад",
            "MOTOR_CONTROL_FORWARD": "Вперед",
            "MOTOR_CONTROL_INIT": "Инициализировать двигатель: пин MA %1, пин MB %2",
            "MOTOR_CONTROL_INIT_TOOLTIP": "Подключите красный провод одного двигателя к MA, а черный — к MB. Выберите два разных управляющих пина с поддержкой ШИМ. Для L298N оставьте перемычку разрешения канала установленной.",
            "MOTOR_CONTROL_RUN": "Двигатель: %1, скорость %2",
            "MOTOR_CONTROL_RUN_TOOLTIP": "При движении вперед на MA подается ШИМ, а на MB — LOW; при движении назад выходы меняются местами.",
            "MOTOR_CONTROL_STOP": "Остановить двигатель"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-cn"],
        {
            "L298N_BACK": "后",
            "L298N_CATEGORY": "电机控制",
            "L298N_FORWARD": "前",
            "L298N_INIT": "初始化通道 %1 引脚 IN1 %2 IN2 %3 EN %4",
            "L298N_RUN": "通道 %1 向 %2 速度 %3",
            "L298N_STOP": "通道 %1 停止",
            "MOTOR_CONTROL_BACKWARD": "反转",
            "MOTOR_CONTROL_FORWARD": "正转",
            "MOTOR_CONTROL_INIT": "初始化电机控制 MA 引脚 %1 MB 引脚 %2",
            "MOTOR_CONTROL_INIT_TOOLTIP": "单颗电机的红线接 MA、黑线接 MB；请选择两个不同且支持 PWM 的控制引脚。使用 L298N 时请保留通道 EN 跳线。",
            "MOTOR_CONTROL_RUN": "电机 %1 速度 %2",
            "MOTOR_CONTROL_RUN_TOOLTIP": "正转时 MA 输出 PWM、MB 输出 LOW；反转时交换两路输出。",
            "MOTOR_CONTROL_STOP": "停止电机"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-tw"],
        {
            "L298N_BACK": "後",
            "L298N_CATEGORY": "馬達控制",
            "L298N_FORWARD": "前",
            "L298N_INIT": "初始化通道 %1 管腳 IN1 %2 IN2 %3 EN %4",
            "L298N_RUN": "通道 %1 向 %2 速度 %3",
            "L298N_STOP": "通道 %1 停止",
            "MOTOR_CONTROL_BACKWARD": "反轉",
            "MOTOR_CONTROL_FORWARD": "正轉",
            "MOTOR_CONTROL_INIT": "初始化馬達控制 MA 腳位 %1 MB 腳位 %2",
            "MOTOR_CONTROL_INIT_TOOLTIP": "單顆馬達紅線接 MA、黑線接 MB；請選擇兩個不同且支援 PWM 的控制腳位。使用 L298N 時請保留通道 EN 跳線。",
            "MOTOR_CONTROL_RUN": "馬達 %1 速度 %2",
            "MOTOR_CONTROL_RUN_TOOLTIP": "正轉時 MA 輸出 PWM、MB 輸出 LOW；反轉時交換兩路輸出。",
            "MOTOR_CONTROL_STOP": "停止馬達"
        }
    );

    return Blockly;
}

if (typeof module !== 'undefined') {
    module.exports = {getInterfaceTranslations};
}
exports = registerScratchExtensionTranslations;
exports = registerBlocksMessages;
