// This file was automatically generated.  Do not modify.
/* eslint-disable func-style */
/* eslint-disable require-jsdoc */
/* eslint-disable quote-props */
/* eslint-disable quotes */
/* eslint-disable dot-notation */
function getInterfaceTranslations () {
    return {
        "en": {
            "tubitv2mtc.name": "TUBIT V2 MTC V3 ROBOT",
            "tubitv2mtc.description": "For MTC V3 ROBOT."
        },
        "zh-cn": {
            "tubitv2mtc.name": "TUBIT V2 MTC V3 ROBOT",
            "tubitv2mtc.description": "For MTC V3 ROBOT."
        },
        "zh-tw": {
            "tubitv2mtc.name": "TUBIT V2 MTC V3 機器人套件",
            "tubitv2mtc.description": "MTC麥克納姆輪機器人控制積木."
        }
    };
}

function registerScratchExtensionTranslations () {
    return {};
}

function registerBlocksMessages (Blockly) {

    Object.assign(Blockly.ScratchMsgs.locales["en"],
        {
        "TUBITV2_MTC_CATEGORY": "MTC Robot",
        "TUBITV2_MTC_LABEL_WHEEL_RATIO": "MTC: Four-wheel ratio adjustment",
        "TUBITV2_MTC_LABEL_BASIC_OPEN_LOOP": "MTC: Open-loop control",
        "TUBITV2_MTC_SET_MOTOR_OFFSET": "Wheel speed ratio adjustment % M1: %1 M2: %2 M3: %3 M4: %4",
        "TUBITV2_MTC_SET_MOTOR_OFFSET_TOOLTIP": "0 keeps the original speed; positive values increase it and negative values decrease it. Each wheel is limited to -80% through +100%.",
        "TUBITV2_MTC_LABEL_OPEN_LOOP": "-- Open-loop control --",
        "TUBITV2_MTC_LABEL_CLOSED_LOOP": "-- Closed-loop control --",
        "TUBITV2_MTC_BNO_SET_MOVE_ORIGIN": "BNO set current direction as movement origin",
        "TUBITV2_MTC_BNO_SET_MOVE_ORIGIN_TOOLTIP": "Requires the BNO055 extension. Run once after placing the robot and before each new motion sequence; the current heading becomes 0 degrees and establishes the fixed X/Y axes.",
        "TUBITV2_MTC_BNO_AMOVE_SCURVE": "BNO move x: %1 y: %2 (cm), segment rotation: %3 (deg), max speed: %4, acceleration: %5",
        "TUBITV2_MTC_BNO_AMOVE_SCURVE_TOOLTIP": "Requires the BNO055 extension. Rotation is relative for each segment: -20 then +20 returns to the starting heading, 0 holds, and +720 turns right twice. Deceleration is the negative acceleration; start and end speeds are 0.",
        "TUBITV2_MTC_BNO_MOVE_SCURVE": "BNO move x: %1 y: %2 (cm), segment rotation: %3 (deg), max speed: %4, acceleration: %5, deceleration: %6, start speed: %7, end speed: %8",
            "TUBITV2_MTC_BNO_MOVE_SCURVE_TOOLTIP": "Requires the BNO055 extension. X/Y use the fixed axes captured at motion start. Rotation is relative for each segment: -20 then +20 returns to the starting heading, 0 holds, and +720 turns right twice.",
        "TUBITV2_MTC_RUNDEG": "MTC Move to %1 degrees, Speed: %2",
        "TUBITV2_MTC_RUNXYR": "MTC Move toward x: %1 y: %2 rotation: %3",
        "TUBITV2_MTC_SETXYRDATA":"MTC set parameters Wheel Diameter:%1 Wheel Width:%2 Body Length:%3 Body Width:%4 (cm)",
        "TUBITV2_MTC_ADDXYRDATA":"MTC adjust parameters X:%1 Y:%2 Rotation:%3",
        "TUBITV2_MTC_AMOVE": "MTC Move x: %1 y: %2 (cm) rotation: %3 (deg), Max speed: %4 Acc: %5",
        "TUBITV2_MTC_MOVE": "MTC Move x: %1 y: %2 (cm) rotation: %3 (deg), Max speed: %4 Acc: %5 Dec: %6, Start speed: %7, End speed: %8",
        "TUBITV2_MTC_AMOVECURVE": "MTC Move x: %1 y: %2 (cm) rotation: %3 (deg), Arc offset %4 (cm), Max speed: %5 Acc: %6",
        "TUBITV2_MTC_MOVECURVE": "MTC Move x: %1 y: %2 (cm) rotation: %3 (deg), Arc offset %4 (cm), Max speed: %5 Acc: %6 Dec: %7, Start speed: %8, End speed: %9",
        "TUBITV2_MTC_SETCPR": "Set motor 1:%1 ppr:%2",
        "TUBITV2_MTC_SETPID": "Set motor PID P %1 I %2 D %3",
        "TUBITV2_MTC_INTERRSET": "MTC Set interrupt action %1",
        "TUBITV2_MTC_INTERREVENT": "Motion interrupt %1 execution block",
        "TUBITV2_MTC_RETURNA": "Return %1",
        "TUBITV2_MTC_INTERR": "Read interrupt motion %1",
        "TUBITV2_MTC_X": "X",
        "TUBITV2_MTC_Y": "Y",
        "TUBITV2_MTC_Z": "Z",
        "TUBITV2_MTC_BNOMOVE": "MTC %1 move function x: %2 y: %3 rotation: %4, Current angle: %5",
        "TUBITV2_MTC_BNON": "No encoder",
        "TUBITV2_MTC_BNOENC": "With encoder",
        "TUBITV2_MTC_LABEL_ADVANCE_A": "MTC: Advanced Parameter Settings",
        "TUBITV2_MTC_LABEL_ADVANCE_B": "MTC: Advanced Motion Control",
        "TUBITV2_MTC_LABEL_ADVANCE_C": "MTC: Interrupt Settings",
        "TUBITV2_MTC_LABEL_ADVANCE_D": "MTC: BNO055 Gyroscope",
        "TUBITV2_MTC_SETBODYDEG": "Set MTC body angle to %1",
        "TUBITV2_MTC_RUNXYRV7RC":"MTC REMOTE  x: %1 y: %2 L:%3 R:%4"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-cn"],
                {
            "TUBITV2_MTC_CATEGORY": "MTC Robot",
            "TUBITV2_MTC_LABEL_WHEEL_RATIO": "MTC：四轮比例调整",
            "TUBITV2_MTC_LABEL_BASIC_OPEN_LOOP": "MTC：开环控制",
            "TUBITV2_MTC_SET_MOTOR_OFFSET": "轮子速度比例调整% M1:%1 M2:%2 M3:%3 M4:%4",
            "TUBITV2_MTC_SET_MOTOR_OFFSET_TOOLTIP": "0为原速，正值加快，负值减慢；每个轮子的范围限制为-80%到+100%。",
            "TUBITV2_MTC_LABEL_OPEN_LOOP": "-- 开环控制 --",
            "TUBITV2_MTC_LABEL_CLOSED_LOOP": "-- 闭环控制 --",
            "TUBITV2_MTC_BNO_SET_MOVE_ORIGIN": "BNO 以当前方向设置移动起点",
            "TUBITV2_MTC_BNO_SET_MOVE_ORIGIN_TOOLTIP": "需同时加入BNO055扩展。摆好机器人后、每次新移动流程开始前执行一次；当前朝向会成为0度并建立固定X/Y坐标。",
            "TUBITV2_MTC_BNO_AMOVE_SCURVE": "BNO 移动 x：%1 y：%2 (cm) 本段旋转：%3 (度)，最大速度：%4 加速度：%5",
            "TUBITV2_MTC_BNO_AMOVE_SCURVE_TOOLTIP": "需同时加入BNO055扩展。旋转为每段相对转角：-20后+20会回到起始方向，0保持方向，+720向右两圈；减速度自动为负加速度，起始与结束速度为0。",
            "TUBITV2_MTC_BNO_MOVE_SCURVE": "BNO 移动 x：%1 y：%2 (cm) 本段旋转：%3 (度)，最大速度：%4 加速度：%5 减速度：%6 起始速度：%7 结束速度：%8",
            "TUBITV2_MTC_BNO_MOVE_SCURVE_TOOLTIP": "需同时加入BNO055扩展。X/Y使用移动开始时取得的固定坐标；旋转为每段相对转角，-20后+20会回到起始方向，0保持方向，+720向右两圈。",
            "TUBITV2_MTC_RUNDEG": "MTC 移动到 %1 度，速度：%2",
            "TUBITV2_MTC_RUNXYR": "MTC 移动到 x：%1 y：%2 旋转：%3",
            "TUBITV2_MTC_SETXYRDATA":"MTC 设置参数 轮直径:%1 轮宽:%2 车体长:%3 车体宽:%4 (cm)",
            "TUBITV2_MTC_ADDXYRDATA":"MTC 微调参数 x:%1 y:%2 旋转:%3",
            "TUBITV2_MTC_AMOVE": "MTC 移动 x：%1 y：%2 (cm) 旋转：%3 (度)，最大速度：%4 加速度：%5",
            "TUBITV2_MTC_MOVE": "MTC 移动 x：%1 y：%2 (cm) 旋转：%3 (度)，最大速度：%4 加速度：%5 减速度：%6，起始速度：%7，结束速度：%8",
            "TUBITV2_MTC_AMOVECURVE": "MTC 移动 x：%1 y：%2 (cm) 旋转：%3 (度)，偏移弧距离 %4 (cm)，最大速度：%5 加速度：%6",
            "TUBITV2_MTC_MOVECURVE": "MTC 移动 x：%1 y：%2 (cm) 旋转：%3 (度)，偏移弧距离 %4 (cm)，最大速度：%5 加速度：%6 减速度：%7，起始速度：%8，结束速度：%9",
            "TUBITV2_MTC_SETCPR":"设置电机 1:%1 ppr:%2",
            "TUBITV2_MTC_SETPID": "设置电机 PID P %1 I %2 D %3",
            "TUBITV2_MTC_INTERRSET": "MTC 设置中断执行 %1",
            "TUBITV2_MTC_INTERREVENT": "运动中断 %1 执行区块",
            "TUBITV2_MTC_RETURNA": "返回 %1",
            "TUBITV2_MTC_INTERR": "读取中断运动 %1",
            "TUBITV2_MTC_X": "X",
            "TUBITV2_MTC_Y": "Y",
            "TUBITV2_MTC_Z": "Z",
            "TUBITV2_MTC_BNOMOVE": "MTC %1 功能移动 x：%2 y：%3 旋转：%4，当前角度：%5",
            "TUBITV2_MTC_BNON": "无编码器",
            "TUBITV2_MTC_BNOENC": "有编码器",
            "TUBITV2_MTC_LABEL_ADVANCE_A": "MTC：高级移动参数设置",
            "TUBITV2_MTC_LABEL_ADVANCE_B": "MTC：高级运动控制",
            "TUBITV2_MTC_LABEL_ADVANCE_C": "MTC：中断设置",
            "TUBITV2_MTC_LABEL_ADVANCE_D": "MTC：BNO055陀螺仪",
            "TUBITV2_MTC_SETBODYDEG": "设置MTC自身角度为%1",
            "TUBITV2_MTC_RUNXYRV7RC":"MTC 移动  x: %1 y: %2 L:%3 R:%4"
            }

    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-tw"],
        {
            "TUBITV2_MTC_CATEGORY": "MTC Robot",
            "TUBITV2_MTC_LABEL_WHEEL_RATIO": "MTC:四輪比例調整",
            "TUBITV2_MTC_LABEL_BASIC_OPEN_LOOP": "MTC:開迴路控制",
            "TUBITV2_MTC_SET_MOTOR_OFFSET": "輪子速度比例調整% M1:%1 M2:%2 M3:%3 M4:%4",
            "TUBITV2_MTC_SET_MOTOR_OFFSET_TOOLTIP": "0為原速，正值加快，負值減慢；每個輪子的範圍限制為-80%到+100%。",
            "TUBITV2_MTC_LABEL_OPEN_LOOP": "--開迴路控制--",
            "TUBITV2_MTC_LABEL_CLOSED_LOOP": "--閉迴路控制--",
            "TUBITV2_MTC_BNO_SET_MOVE_ORIGIN": "BNO 以目前方向設定移動起點",
            "TUBITV2_MTC_BNO_SET_MOVE_ORIGIN_TOOLTIP": "需同時加入BNO055擴充。擺好機器人後、每次新移動流程開始前執行一次；目前朝向會成為0度並建立固定X/Y座標。",
            "TUBITV2_MTC_BNO_AMOVE_SCURVE": "BNO 移動 x:%1 y:%2 (cm) 本段旋轉:%3 (度)，最大速度:%4 加速度:%5",
            "TUBITV2_MTC_BNO_AMOVE_SCURVE_TOOLTIP": "需同時加入BNO055擴充。旋轉為每段相對轉角：-20後+20會回到起始方向，0保持方向，+720向右兩圈；減速度自動為負加速度，起始與結束速度為0。",
            "TUBITV2_MTC_BNO_MOVE_SCURVE": "BNO 移動 x:%1 y:%2 (cm) 本段旋轉:%3 (度)，最大速度:%4 加速度:%5 減速度:%6 起始速度:%7 結束速度:%8",
            "TUBITV2_MTC_BNO_MOVE_SCURVE_TOOLTIP": "需同時加入BNO055擴充。X/Y使用移動開始時取得的固定座標；旋轉為每段相對轉角，-20後+20會回到起始方向，0保持方向，+720向右兩圈。",
            "TUBITV2_MTC_RUNDEG":"MTC 移動到 %1度, 速度 : %2 ",
            "TUBITV2_MTC_RUNXYR":"MTC 往 x: %1 y: %2 旋轉: %3",
            "TUBITV2_MTC_SETXYRDATA":"MTC 設定參數 輪直徑:%1 輪寬:%2 車體長:%3 車體寬:%4 (cm)",
            "TUBITV2_MTC_ADDXYRDATA":"MTC 微調參數 x:%1 y:%2 旋轉:%3",
            "TUBITV2_MTC_AMOVE":"MTC 移動 x: %1 y: %2 (cm) 旋轉: %3 (deg), 最大速度: %4 加速度: %5",
            "TUBITV2_MTC_MOVE":"MTC 移動 x: %1 y: %2 (cm) 旋轉: %3  (deg) , 最大速度: %4 加速度: %5 減速度: %6, 起始速度: %7,結束速度: %8",
            "TUBITV2_MTC_AMOVECURVE":"MTC 移動 x: %1 y: %2 (cm) 旋轉: %3 (deg),偏移弧距離 %4 (cm) , 最大速度: %5 加速度: %6",
            "TUBITV2_MTC_MOVECURVE":"MTC 移動 x: %1 y: %2 (cm) 旋轉: %3  (deg) ,偏移弧距離 %4 (cm), 最大速度: %5 加速度: %6 減速度: %7, 起始速度: %8,結束速度: %9",
            "TUBITV2_MTC_SETCPR":"設定馬達 齒輪比1:%1 編碼數ppr:%2",
            "TUBITV2_MTC_SETPID":"設定馬達 P %1 I %2 D %3",
            "TUBITV2_MTC_INTERRSET":"MTC設定中斷執行%1",
            "TUBITV2_MTC_INTERREVENT":"移動中斷%1執行區塊",
            "TUBITV2_MTC_RETURNA":"回傳%1",
            "TUBITV2_MTC_INTERR":"讀取中斷移動%1",
            "TUBITV2_MTC_X":"X",
            "TUBITV2_MTC_Y":"Y",
            "TUBITV2_MTC_Z":"Z",
            "TUBITV2_MTC_BNOMOVE":"MTC移動%1功能往x : %2 y: %3 旋轉: %4 , 目前角度%5",
            "TUBITV2_MTC_BNON":"無編碼器",
            "TUBITV2_MTC_BNOENC":"有編碼器",
            "TUBITV2_MTC_LABEL_ADVANCE_A": "MTC:進階移動參數設定",
            "TUBITV2_MTC_LABEL_ADVANCE_B": "MTC:進階移動控制",
            "TUBITV2_MTC_LABEL_ADVANCE_C":"MTC:中斷設定",
            "TUBITV2_MTC_LABEL_ADVANCE_D":"MTC:BNO055陀螺儀",
            "TUBITV2_MTC_SETBODYDEG":"設定MTC自身角度為%1",
            "TUBITV2_MTC_RUNXYRV7RC":"MTC 遙控移動  x: %1 y: %2 左轉:%3 右轉:%4"
        }
    );

    return Blockly;
}

if (typeof module !== 'undefined') {
    module.exports = {getInterfaceTranslations};
}

exports = registerScratchExtensionTranslations;
exports = registerBlocksMessages;
