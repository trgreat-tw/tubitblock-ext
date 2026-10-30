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
            "mpu6050.name": "MPU6050 Sensor",
            "mpu6050.description": "6-axis attitude sensor module based on MPU6050."
        },
        "ru": {
            "mpu6050.name": "Датчик MPU6050 ",
            "mpu6050.description": "Модуль 6-осевого датчика положения на базе MPU6050."
        },
        "zh-cn": {
            "mpu6050.name": "MPU6050 陀螺儀",
            "mpu6050.description": "基于 MPU6050 的6轴姿态陀螺儀。"
        },
        "zh-tw": {
            "mpu6050.name": "MPU6050 陀螺儀",
            "mpu6050.description": "基於 MPU6050 的6軸姿態陀螺儀。"
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
            "INIT_GUARD_LABEL_MPU6050": "MPU6050 Sensor"
        },
        "ru": {
            "INIT_GUARD_TUBIT_REQUIRED": "Поместите блок «Инициализация TUBIT» под блоком «когда Arduino запускается».",
            "INIT_GUARD_SENSOR_REQUIRED": "Поместите блок «Инициализация: %1 %2» под блоком «когда Arduino запускается» перед блоками чтения или использования модуля.",
            "INIT_GUARD_INIT_PLACEMENT": "Поместите блок «Инициализация: %1 %2» непосредственно под блоком «когда Arduino запускается», перед циклами и условиями.",
            "INIT_GUARD_OLED_REQUIRED": "Сначала добавьте блок вывода на OLED и поместите блоки рисования внутрь него либо разместите перед ними блок очистки или обновления дисплея.",
            "INIT_GUARD_PIN_SUFFIX": "контакт %1",
            "INIT_GUARD_INVALID_ID": "Введите неотрицательный целый номер модуля.",
            "INIT_GUARD_LABEL_MPU6050": "Датчик MPU6050"
        },
        "zh-cn": {
            "INIT_GUARD_TUBIT_REQUIRED": "请在Arduino启动的积木底下放置\"TUBIT初始化\"积木",
            "INIT_GUARD_SENSOR_REQUIRED": "请在Arduino启动的积木底下放置\"%1%2初始化\"积木，并放在读取／使用积木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "请将\"%1%2初始化\"积木直接放在Arduino启动底下，且放在重复执行或条件判断之前。",
            "INIT_GUARD_OLED_REQUIRED": "请先放置OLED显示积木，并将绘图积木放在其内，或先放清除／更新显示积木。",
            "INIT_GUARD_PIN_SUFFIX": "引脚%1",
            "INIT_GUARD_INVALID_ID": "模组编号请输入非负整数。",
            "INIT_GUARD_LABEL_MPU6050": "MPU6050 陀螺儀"
        },
        "zh-tw": {
            "INIT_GUARD_TUBIT_REQUIRED": "請在Arduino啟動的積木底下放置\"TUBIT初始化\"積木",
            "INIT_GUARD_SENSOR_REQUIRED": "請在Arduino啟動的積木底下放置\"%1%2初始化\"積木，並放在讀取／使用積木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "請將\"%1%2初始化\"積木直接放在Arduino啟動底下，且放在重複執行或條件判斷之前。",
            "INIT_GUARD_OLED_REQUIRED": "請先放置OLED顯示積木，並將繪圖積木放在其內，或先放清除／更新顯示積木。",
            "INIT_GUARD_PIN_SUFFIX": "腳位%1",
            "INIT_GUARD_INVALID_ID": "模組編號請輸入非負整數。",
            "INIT_GUARD_LABEL_MPU6050": "MPU6050 陀螺儀"
        }
    };
    Object.keys(__initGuardMessages).forEach(function (locale) {
        if (!Blockly.ScratchMsgs.locales[locale]) Blockly.ScratchMsgs.locales[locale] = {};
        Object.assign(Blockly.ScratchMsgs.locales[locale], __initGuardMessages[locale]);
    });

    Object.assign(Blockly.ScratchMsgs.locales["en"],
        {
            "MPU6050_ACCELERATION": "mpu6050 %1 axis acceleration (m/s^2)",
            "MPU6050_CATEGORY": "MPU6050",
            "MPU6050_GYRO": "mpu6050 %1 axis rotation (rad/s)",
            "MPU6050_INIT": "init mpu6050 accelerometer range %1 gyro range %2 filter bandwidth %3",
            "MPU6050_READDATA": "mpu6050 read data",
            "MPU6050_TEMPERATURE": "mpu6050 temperature (℃)",
            "MPU6050_CALIBRATE": "mpu6050 calibrate angle",
            "MPU6050_UPDATEYAW": "mpu6050 update yaw angle data",
            "MPU6050_GETYAW": "mpu6050 get angle (Yaw)"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-cn"],
        {
            "MPU6050_ACCELERATION": "mpu6050 %1 轴加速度 (m/s^2)",
            "MPU6050_CATEGORY": "MPU6050",
            "MPU6050_GYRO": "mpu6050 %1 轴角速度 (rad/s)",
            "MPU6050_INIT": "初始化 mpu6050 加速度计范围 %1 陀螺仪范围 %2 滤波器带宽 %3",
            "MPU6050_READDATA": "mpu6050 读取数据",
            "MPU6050_TEMPERATURE": "mpu6050 温度 (℃)",
            "MPU6050_CALIBRATE": "mpu6050校准角度",
            "MPU6050_UPDATEYAW": "mpu6050更新角度数据",
            "MPU6050_GETYAW": "mpu6050读取角度(Yaw)"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-tw"],
        {
            "MPU6050_ACCELERATION": "mpu6050 %1 軸加速度 (m/s^2)",
            "MPU6050_CATEGORY": "MPU6050",
            "MPU6050_GYRO": "mpu6050 %1 軸角速度 (rad/s)",
            "MPU6050_INIT": "初始化 mpu6050 加速度計範圍 %1 陀螺儀範圍 %2 濾波器帶寬 %3",
            "MPU6050_READDATA": "mpu6050 讀取數據",
            "MPU6050_TEMPERATURE": "mpu6050 溫度 (℃)",
            "MPU6050_CALIBRATE":"mpu6050校正角度",
            "MPU6050_UPDATEYAW":"mpu6050更新角度數據",
            "MPU6050_GETYAW":"mpu6050讀取角度(Yaw)"
        }
    );

    return Blockly;
}

if (typeof module !== 'undefined') {
    module.exports = {getInterfaceTranslations};
}
exports = registerScratchExtensionTranslations;
exports = registerBlocksMessages;
