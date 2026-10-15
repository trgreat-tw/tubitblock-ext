#include <Wire.h>
#include <math.h>
#include <EasyBNO055_ESP.h>
#include <TuBitCore.h>
#include <TuMTC.h>

TuBitCore tubit;
TuMTC mtc(tubit);
EasyBNO055_ESP bno;

// TuMTC 會在每個控制週期重新讀取 bno.orientationZ。
double readBnoOrientationZ() {
  return bno.isReady() ? bno.orientationZ : NAN;
}

// 移動途中按下 B 鍵可立即中止。
bool emergencyStop() {
  return tubit.readButton(Button_B);
}

void setup() {
  Serial.begin(115200);
  Wire.begin();
  tubit.init();

  bno.start();

  // EasyBNO055_ESP 會在背景完成啟動歸零，最多等待 5 秒。
  const unsigned long waitStart = millis();
  while (!bno.isReady() && millis() - waitStart < 5000UL) {
    delay(20);
  }

  if (!bno.isReady()) {
    Serial.println("BNO055 not ready");
    return;
  }

  mtc.setYawReader(readBnoOrientationZ);
  mtc.setYawDirection(1);  // 本機器人：右轉為正，左轉為負
  mtc.setHeadingPid(3.0, 0.0, 0.03, 120.0, 60.0);
  mtc.setHeadingSettle(1.0, 100, 1500);
  mtc.setInterruptCallback(emergencyStop);

  Serial.println("Ready: press Button A");
}

void loop() {
  if (!bno.isReady()) return;

  if (tubit.readButtonEdge(Button_A, true)) {
    // 每次按下開始前都可任意擺放機器人；此刻才建立角度 0 與固定 XY。
    if (!mtc.captureBnoStartFrame()) {
      Serial.println("BNO start frame failed");
      return;
    }

    // 不需要模式，也不需要 targetYawDeg／forwardYaw。
    // 第一步：沿起始 +X 移動 50 cm，同時相對右轉 90 度。
    const bool firstOk = mtc.moveSCurveBno(
        50.0, 0.0, 90.0,
        800.0, 400.0, -400.0,
        0.0, 0.0);

    if (!firstOk) {
      Serial.println("First move failed/stopped");
      return;
    }

    // 第二步：z=0 保持車頭 90 度，沿固定起始 +Y 移動 50 cm。
    // 因車頭已朝右，此時車體會向左橫移，但場地路徑仍是原始 +Y。
    const bool secondOk = mtc.moveSCurveBno(
        0.0, 50.0, 0.0,
        800.0, 400.0, -400.0,
        0.0, 0.0);

    // 若要從目前命令航向再向右兩圈，可直接呼叫：
    // mtc.moveSCurveBno(0, 0, 720, 800, 400, -400, 0, 0);

    Serial.println(secondOk ? "Both moves done" : "Second move failed/stopped");
  }
}
