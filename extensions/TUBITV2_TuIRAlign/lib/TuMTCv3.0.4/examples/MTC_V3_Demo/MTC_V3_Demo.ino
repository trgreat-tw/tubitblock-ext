#include <Wire.h>
#include <math.h>
#include <EasyBNO055_ESP.h>
#include <TuBitCore.h>
#include <TuMTC.h>

TuBitCore tubit;
TuMTC mtc(tubit);
EasyBNO055_ESP bno;

// 請依實際 PCB 修改。GPIO34、35、39 僅能輸入，適合接循跡訊號。
constexpr int IR1 = 32;
constexpr int IR2 = 33;
constexpr int IR3 = 34;
constexpr int IR4 = 35;
constexpr int IR5 = 39;

double readBnoOrientationZ() {
  // orientationZ 由 EasyBNO055_ESP 背景工作持續更新；未就緒時
  // 回傳 NAN，TuMTC 會停止馬達並回報失敗。
  return bno.isReady() ? bno.orientationZ : NAN;
}

bool emergencyStop() {
  return tubit.readButton(Button_B);
}

void setup() {
  Serial.begin(115200);
  Wire.begin();
  tubit.init();

  bno.start();
  if (!bno.isReady()) {
    Serial.println("EasyBNO055 orientationZ not ready");
  }

  // 1. 第一次測試先不補償；確認原始走向後再逐輪微調。
  mtc.SetMotorOffset(0, 0, 0, 0);

  // 2. 五路循跡：預設權重由左至右為 -5、-2、0、2、5。
  mtc.initLineSensor(IR1, IR2, IR3, IR4, IR5);
  mtc.setLinePolarity(true);  // HIGH 代表壓到黑線；若模組相反請改 false
  mtc.setLinePositionMapping(-5, -2, 0, 2, 5);
  // IR+BNO 同時使用時讓 IR 修正橫移；若只用 IR 且要模擬 DTC
  // 的差速轉向，可改成 LineCorrectionAxis::YAW，並將 Kd 設為 0。
  mtc.setLineCorrectionAxis(TuMTC::LineCorrectionAxis::X);
  mtc.setLinePid(2.0, 0.02, 0.08, 20.0, 50.0);

  // 3. BNO 航向閉迴路。
  mtc.setYawReader(readBnoOrientationZ);
  // 本機器人 bno.orientationZ：右轉增加、左轉減少，固定使用 1。
  mtc.setYawDirection(1);
  mtc.setHeadingPid(3.0, 0.0, 0.03, 120.0, 60.0);
  mtc.setHeadingSettle(1.0, 100, 1500);
  mtc.setInterruptCallback(emergencyStop);
}

void loop() {
  if (tubit.readButtonEdge(Button_A, true)) {
    // 每次按下前都可任意擺放；此刻才建立角度 0 與固定 XY。
    if (!mtc.captureBnoStartFrame()) {
      Serial.println("BNO start frame failed");
      return;
    }

    // 沿起始 +Y 移動 100 cm：IR 修正左右偏移；後續 z=0 都持續
    // 守住目前命令航向，不必傳 startYaw／forwardYaw。
    const bool ok = mtc.moveSCurveLineBno(
        0.0, 100.0, 0.0,
        900.0, 1200.0, 1200.0,
        0.0, 0.0);

    Serial.println(ok ? "MTC V3 move done" : "MTC V3 move failed");
  }

  // 原地轉向也直接使用同一個主介面，不需模式或另一組參數。
  // 從目前命令航向相對向右轉 +90 度：
  // mtc.moveSCurveBno(
  //     0.0, 0.0, 90.0,
  //     600.0, 900.0, -900.0,
  //     0.0, 0.0);

  // 範例：沿固定起始 +Y 邊走邊相對右轉 90 度。
  // mtc.moveSCurveBno(
  //     0.0, 100.0, 90.0,
  //     900.0, 1200.0, 1200.0,
  //     0.0, 0.0);

  delay(10);
}
