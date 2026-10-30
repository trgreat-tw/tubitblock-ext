// This file was automatically generated.  Do not modify.
/* eslint-disable func-style */
/* eslint-disable require-jsdoc */
/* eslint-disable quote-props */
/* eslint-disable quotes */
/* eslint-disable dot-notation */

function getInterfaceTranslations () {
    return {
        "en": {
            "hrmeb.name": "HR_MEB",
            "hrmeb.description": "HR_MEB ESP32 Motor Expansion Board."
        },
        "zh-cn": {
            "hrmeb.name": "HR_MEB电机扩展板",
            "hrmeb.description": "HR_MEB ESP32 电机扩展板"
        },
        "zh-tw": {
            "hrmeb.name": "HR_MEB馬達擴展板",
            "hrmeb.description": "HR_MEB ESP32 馬達擴展板"
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
            "INIT_GUARD_LABEL_HR_MEB": "HR_MEB"
        },
        "ru": {
            "INIT_GUARD_TUBIT_REQUIRED": "Поместите блок «Инициализация TUBIT» под блоком «когда Arduino запускается».",
            "INIT_GUARD_SENSOR_REQUIRED": "Поместите блок «Инициализация: %1 %2» под блоком «когда Arduino запускается» перед блоками чтения или использования модуля.",
            "INIT_GUARD_INIT_PLACEMENT": "Поместите блок «Инициализация: %1 %2» непосредственно под блоком «когда Arduino запускается», перед циклами и условиями.",
            "INIT_GUARD_OLED_REQUIRED": "Сначала добавьте блок вывода на OLED и поместите блоки рисования внутрь него либо разместите перед ними блок очистки или обновления дисплея.",
            "INIT_GUARD_PIN_SUFFIX": "контакт %1",
            "INIT_GUARD_INVALID_ID": "Введите неотрицательный целый номер модуля.",
            "INIT_GUARD_LABEL_HR_MEB": "Плата управления двигателями HR MEB"
        },
        "zh-cn": {
            "INIT_GUARD_TUBIT_REQUIRED": "请在Arduino启动的积木底下放置\"TUBIT初始化\"积木",
            "INIT_GUARD_SENSOR_REQUIRED": "请在Arduino启动的积木底下放置\"%1%2初始化\"积木，并放在读取／使用积木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "请将\"%1%2初始化\"积木直接放在Arduino启动底下，且放在重复执行或条件判断之前。",
            "INIT_GUARD_OLED_REQUIRED": "请先放置OLED显示积木，并将绘图积木放在其内，或先放清除／更新显示积木。",
            "INIT_GUARD_PIN_SUFFIX": "引脚%1",
            "INIT_GUARD_INVALID_ID": "模组编号请输入非负整数。",
            "INIT_GUARD_LABEL_HR_MEB": "HR_MEB电机扩展板"
        },
        "zh-tw": {
            "INIT_GUARD_TUBIT_REQUIRED": "請在Arduino啟動的積木底下放置\"TUBIT初始化\"積木",
            "INIT_GUARD_SENSOR_REQUIRED": "請在Arduino啟動的積木底下放置\"%1%2初始化\"積木，並放在讀取／使用積木之前。",
            "INIT_GUARD_INIT_PLACEMENT": "請將\"%1%2初始化\"積木直接放在Arduino啟動底下，且放在重複執行或條件判斷之前。",
            "INIT_GUARD_OLED_REQUIRED": "請先放置OLED顯示積木，並將繪圖積木放在其內，或先放清除／更新顯示積木。",
            "INIT_GUARD_PIN_SUFFIX": "腳位%1",
            "INIT_GUARD_INVALID_ID": "模組編號請輸入非負整數。",
            "INIT_GUARD_LABEL_HR_MEB": "HR_MEB馬達擴展板"
        }
    };
    Object.keys(__initGuardMessages).forEach(function (locale) {
        if (!Blockly.ScratchMsgs.locales[locale]) Blockly.ScratchMsgs.locales[locale] = {};
        Object.assign(Blockly.ScratchMsgs.locales[locale], __initGuardMessages[locale]);
    });


    Object.assign(Blockly.ScratchMsgs.locales["en"],
        {
        "HRMEB_CATEGORY": "HR_MEB",
	    "HRMEB_SET":"HR_MEB INIT motor freq %1Hz",
        "HRMEB_READBUTTON":" HR_MEB read button ",
        "HRMEB_MOTOR":"motor %1 speed %2",
        "HRMEB_MOTOR_ALLRUN":"all motor run M1 %1 M2 %2 M3 %3 M4 %4",
        "HRMEB_MOTOR_STOP":"all motor stop",
        "HRMEB_MOTOR_M1":"M1",
        "HRMEB_MOTOR_M2":"M2",
        "HRMEB_MOTOR_M3":"M3",
        "HRMEB_MOTOR_M4":"M4",
        "HRMEB_SET_MOTOR":"Set motor direction M1 %1 M2 %2 M3 %3 M4 %4",
        "HRMEB_MOTOR_TD":"Forward",
        "HRMEB_MOTOR_FD":"Reverse"

        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-cn"],
        {
            "HRMEB_CATEGORY": "HR_MEB",
            "HRMEB_SET": "HR_MEB 初始化 设置电机频率 %1Hz",
            "HRMEB_READBUTTON": "HR_MEB 读取按钮",
            "HRMEB_MOTOR": "电机 %1 速度 %2",
            "HRMEB_MOTOR_ALLRUN": "所有电机运行 M1 %1 M2 %2 M3 %3 M4 %4",
            "HRMEB_MOTOR_STOP": "所有电机停止",
            "HRMEB_MOTOR_M1": "M1",
            "HRMEB_MOTOR_M2": "M2",
            "HRMEB_MOTOR_M3": "M3",
            "HRMEB_MOTOR_M4": "M4",
            "HRMEB_SET_MOTOR":"设置电机 M1 %1 M2 %2 M3 %3 M4 %4",
            "HRMEB_MOTOR_TD":"正转",
            "HRMEB_MOTOR_FD":"反转"
		
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-tw"],
        {
            "HRMEB_CATEGORY": "HR_MEB",
            "HRMEB_SET": "HR_MEB 初始化 設定馬達頻率%1Hz",
            "HRMEB_READBUTTON": "HR_MEB 讀取按鈕",
            "HRMEB_MOTOR": "馬達 %1 速度 %2",
            "HRMEB_MOTOR_ALLRUN": "控制馬達 M1 %1 M2 %2 M3 %3 M4 %4",
            "HRMEB_MOTOR_STOP": "停止所有馬達",
            "HRMEB_MOTOR_M1": "M1",
            "HRMEB_MOTOR_M2": "M2",
            "HRMEB_MOTOR_M3": "M3",
            "HRMEB_MOTOR_M4": "M4",
            "HRMEB_SET_MOTOR":"設定馬達轉向 M1 %1 M2 %2 M3 %3 M4 %4",
            "HRMEB_MOTOR_TD":"正轉",
            "HRMEB_MOTOR_FD":"反轉"
        }
    );

    return Blockly;
}

if (typeof module !== 'undefined') {
    module.exports = {getInterfaceTranslations};
}

exports = registerScratchExtensionTranslations;
exports = registerBlocksMessages;