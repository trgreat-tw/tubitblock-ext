/****************************************************
 * 東業創新科技有限公司 × 鴻兔科技
 * Author  : Xun
 * Date    : 2026-10-03
 * Version : mtc-v3.0.4
 *
 * TuBit V2 MTC 麥克納姆輪控制函式庫
 *
 * V3 新增：
 *  - 四輪獨立百分比補償 setMotorOffset()
 *  - 五路循跡感測器與橫移／縱移／旋轉修正
 *  - BNO 航向外迴路，可在移動及轉彎時即時校正
 *  - BNO＋循跡＋四輪編碼器的串級控制
 ****************************************************/

#pragma once

#include <Arduino.h>
#include "TuBitCore.h"

using TuMtcInterruptCallback = bool (*)();
using TuMtcYawReader = double (*)();

class TuMTC {
public:
  // 保留 V2.4 可由 TuMTC::TuMtcInterruptCallback 取用的型別名稱。
  using TuMtcInterruptCallback = ::TuMtcInterruptCallback;

  enum class LineCorrectionAxis : uint8_t {
    X,      // 麥克納姆輪左右橫移修正（建議）
    Y,      // 前後方向修正
    YAW     // 以旋轉方式修正，行為接近雙輪循跡車
  };

  explicit TuMTC(TuBitCore& core);
  ~TuMTC();

  // ---------- 基礎向量控制 ----------
  void angleToXY(double angleDeg, double speed);
  // z > 0 右轉，z < 0 左轉；開迴路與編碼器閉迴路使用相同方向定義。
  void driveVectorOpen(double x, double y, double z);
  void driveVectorClosed(double x, double y, double z);

  void setMtcXytConstants(double xConst, double yConst, double turnConst);
  // V2.4 相容 API；使用原版幾何換算公式。
  void setMtcParameters(double wheel_H, double wheel_W,
                        double MTC_H, double MTC_W);
  void adjustMtcConstantsAdd(double dx, double dy, double dturn);
  // setInitialYaw=true 時只初始化內部航向，該次呼叫不送出馬達命令。
  void moveBody(double R, double yawRateDegPerSec, double directionDeg,
                bool setInitialYaw, double initialYawDeg);

  // ---------- 四輪補償 ----------
  // 單位為百分比，例如：(-10, 0, 20, 0) = M1 -10%、M3 +20%。
  void setMotorOffset(double m1Percent, double m2Percent,
                      double m3Percent, double m4Percent);

  // 保留使用者要求的函式名稱，與 setMotorOffset() 完全相同。
  inline void SetMotorOffset(double m1Percent, double m2Percent,
                             double m3Percent, double m4Percent) {
    setMotorOffset(m1Percent, m2Percent, m3Percent, m4Percent);
  }

  void getMotorOffset(double outPercent[4]) const;

  // ---------- 五路循跡 ----------
  void initLineSensor(int ir1, int ir2, int ir3, int ir4, int ir5);
  // DTC 相容名稱。readIR() 採 1~5 索引，true 代表偵測到線。
  inline void initIRsensor(int ir1, int ir2, int ir3, int ir4, int ir5) {
    initLineSensor(ir1, ir2, ir3, ir4, ir5);
  }
  bool readIR(int index) const;
  bool lineSensorsReady() const;
  void setLinePolarity(bool highMeansLine);
  void setLinePositionMapping(double p0, double p1, double p2,
                              double p3, double p4);
  inline void setPosMapping(int p0, int p1, int p2, int p3, int p4) {
    setLinePositionMapping(p0, p1, p2, p3, p4);
  }
  bool readLineError(double& error) const;
  double getLineError() const;

  void setLinePid(double kp, double ki, double kd,
                  double maxCorrection = 20.0,
                  double integralLimit = 50.0);
  void setLineCorrectionAxis(LineCorrectionAxis axis);
  void resetLineController();

  // ---------- BNO 航向控制 ----------
  // reader 必須回傳連續角度（degree）；EasyBNO 的 orientationZ 可直接使用。
  // 連續右轉可超過 +360，連續左轉可低於 -360。
  void setYawReader(TuMtcYawReader reader);
  void setYawDirection(int direction);  // 1：原方向；-1：反向
  bool readYaw(double& yawDeg) const;

  // 以呼叫當下的車頭方向重新建立 BNO 移動座標：當下方向成為 0 度，
  // x/y 也從這個方向建立固定座標。每次新的移動流程開始前可呼叫一次。
  bool captureBnoStartFrame();

  // 將目前命令航向同步到實際 orientationZ，但不旋轉已建立的 x/y 座標。
  // 人工轉動車體或中止後，只想接受目前車頭方向時可主動呼叫。
  bool syncBnoHeading();

  void setHeadingPid(double kp, double ki, double kd,
                     double maxCorrectionDegPerSec = 120.0,
                     double integralLimit = 60.0);
  void setHeadingSettle(double toleranceDeg,
                        uint16_t stableTimeMs = 100,
                        uint16_t timeoutMs = 1500);
  void resetHeadingController();

  // 低階即時航向保持；x/y 是車體座標速度，不做世界座標轉換。
  // plannedYawRate 是前饋旋轉速度。
  bool driveVectorHeadingClosed(double x, double y,
                                double plannedYawRateDegPerSec,
                                double targetYawDeg);

  // ---------- 原有 S 型精準移動（相容 V2） ----------
  void moveSCurve(double x, double y, double z,
                  double vm, double a, double ad,
                  double Vs, double Ve,
                  TuMtcInterruptCallback cb);

  inline void moveSCurve(double x, double y, double z,
                         double vm, double a, double ad,
                         double Vs, double Ve) {
    moveSCurve(x, y, z, vm, a, ad, Vs, Ve, nullptr);
  }

  void moveCurveSCurve(double x, double y, double targetYawDeg,
                       double bulge,
                       double vm, double a, double ad,
                       double Vs, double Ve,
                       TuMtcInterruptCallback cb);

  inline void moveCurveSCurve(double x, double y, double targetYawDeg,
                              double bulge,
                              double vm, double a, double ad,
                              double Vs, double Ve) {
    moveCurveSCurve(x, y, targetYawDeg, bulge,
                    vm, a, ad, Vs, Ve, nullptr);
  }

  // ---------- V3 修正型精準移動 ----------
  // 線路修正預設作用於 X 軸，適合沿 Y 軸前進時保持在線中央。
  bool moveSCurveLine(double x, double y,
                      double vm, double a, double ad,
                      double Vs, double Ve,
                      TuMtcInterruptCallback cb = nullptr);

  // 主要 BNO XYZ 介面，不需模式、forwardYaw 或額外目標變數。
  // x/y 固定在 captureBnoStartFrame() 擷取時的座標，不隨每段車頭改變。
  // z 是本段相對轉角，z=0 保持上一個命令航向；+ 為右轉、- 為左轉。
  // 例如 -20 後再給 +20 會回到起始方向，單次 +720 會右轉完整兩圈。
  bool moveSCurveBno(double x, double y, double z,
                     double vm, double a, double ad,
                     double Vs, double Ve,
                     TuMtcInterruptCallback cb = nullptr);

  // 進階用途：指定模 360 的絕對方位並走最短方向；可用它明確回到 0 度。
  bool moveSCurveBnoAbsolute(double x, double y, double targetYawDeg,
                             double vm, double a, double ad,
                             double Vs, double Ve,
                             TuMtcInterruptCallback cb = nullptr);

  // 明確相對轉角；+360 會完整右轉一圈，-360 會完整左轉一圈。
  bool moveSCurveBnoRelative(double x, double y, double deltaYawDeg,
                             double vm, double a, double ad,
                             double Vs, double Ve,
                             TuMtcInterruptCallback cb = nullptr);

  // 原地相對轉向。yaw reader 應持續回傳即時 bno.orientationZ；
  // 本機器人角度定義：deltaYawDeg > 0 右轉，< 0 左轉。
  inline bool turnBnoRelative(double deltaYawDeg,
                              double vm, double a, double ad,
                              double Vs, double Ve,
                              TuMtcInterruptCallback cb = nullptr) {
    return moveSCurveBnoRelative(0.0, 0.0, deltaYawDeg,
                                 vm, a, ad, Vs, Ve, cb);
  }

  // IR＋BNO 的 x/y 同樣固定在擷取的起始座標；z 是本段相對轉角。
  bool moveSCurveLineBno(double x, double y, double z,
                         double vm, double a, double ad,
                         double Vs, double Ve,
                         TuMtcInterruptCallback cb = nullptr);

  bool moveSCurveLineBnoAbsolute(double x, double y,
                                 double targetYawDeg,
                                 double vm, double a, double ad,
                                 double Vs, double Ve,
                                 TuMtcInterruptCallback cb = nullptr);

  // 貝茲曲線＋BNO 也使用擷取的固定起始座標及每段相對轉角。
  bool moveCurveSCurveBno(double x, double y, double z,
                          double bulge,
                          double vm, double a, double ad,
                          double Vs, double Ve,
                          TuMtcInterruptCallback cb = nullptr);

  bool moveCurveSCurveBnoAbsolute(double x, double y,
                                  double targetYawDeg, double bulge,
                                  double vm, double a, double ad,
                                  double Vs, double Ve,
                                  TuMtcInterruptCallback cb = nullptr);

  // ---------- 相容原有 BNO 即時控制 ----------
  void bnoMoveOpen(double x, double y, double z, double nowYawDeg);
  void bnoMoveClosed(double x, double y, double z, double nowYawDeg);

  void setInterruptCallback(TuMtcInterruptCallback cb);
  void syncPidReference(bool keepOutput) {
    core_.syncPidReference(keepOutput);
  }

  double interruptedX() const { return ix_; }
  double interruptedY() const { return iy_; }
  double interruptedZ() const { return iz_; }

private:
  struct MotionProfile {
    double peak = 0.0;
    double t1 = 0.0;
    double t2 = 0.0;
    double t3 = 0.0;
    double total = 0.0;
  };

  TuBitCore& core_;

  double kx_ = 20.16;
  double ky_ = 19.2;
  double kturn_ = 5.1408;
  double yawAccumDeg_ = 0.0;

  double motorOffsetPercent_[4] = {0.0, 0.0, 0.0, 0.0};

  int linePins_[5] = {-1, -1, -1, -1, -1};
  double linePosition_[5] = {-5.0, -2.0, 0.0, 2.0, 5.0};
  bool lineHighMeansLine_ = true;
  LineCorrectionAxis lineAxis_ = LineCorrectionAxis::X;
  double lineKp_ = 2.0;
  double lineKi_ = 0.0;
  double lineKd_ = 0.08;
  double lineMaxCorrection_ = 20.0;
  double lineIntegralLimit_ = 50.0;
  double lineIntegral_ = 0.0;
  double linePrevError_ = 0.0;
  bool lineHasPrevious_ = false;

  TuMtcYawReader yawReader_ = nullptr;
  int yawDirection_ = 1;
  double bnoFrameYawDeg_ = 0.0;
  bool bnoFrameValid_ = false;
  double bnoTargetYawDeg_ = 0.0;
  bool bnoTargetValid_ = false;
  double headingKp_ = 3.0;
  double headingKi_ = 0.0;
  double headingKd_ = 0.03;
  double headingMaxCorrection_ = 120.0;
  double headingIntegralLimit_ = 60.0;
  double headingIntegral_ = 0.0;
  double headingPrevError_ = 0.0;
  double headingDerivativeFiltered_ = 0.0;
  bool headingHasPrevious_ = false;
  double headingToleranceDeg_ = 1.0;
  uint16_t headingStableTimeMs_ = 100;
  uint16_t headingTimeoutMs_ = 1500;

  TuMtcInterruptCallback cb_ = nullptr;
  double ix_ = 0.0;
  double iy_ = 0.0;
  double iz_ = 0.0;

  void distributeOpenLoop(double x, double y, double r,
                          double out[4]) const;
  void distributeClosedLoop(double x, double y, double r,
                            double out[4]) const;
  void applyMotorOffset(double values[4], bool pwmOutput) const;
  void sendPwm(const double values[4]);
  void sendSpeed(const double values[4]);

  bool shouldInterrupt(TuMtcInterruptCallback localCb) const;
  double computeLineCorrection(double dt, bool& lineDetected);
  double computeHeadingCorrection(double targetYawDeg,
                                  double actualYawDeg,
                                  double dt);
  bool ensureBnoStartFrame();
  bool selectBnoTarget(double commandYawDeg,
                       double& targetYawDeg);
  bool advanceBnoTarget(double deltaYawDeg,
                        double& targetYawDeg);
  bool resolveAbsoluteBnoTarget(double bearingYawDeg,
                                double& targetYawDeg);
  bool settleHeading(double targetYawDeg,
                     TuMtcInterruptCallback cb);

  static MotionProfile makeProfile(double distance,
                                   double vm, double a, double ad,
                                   double Vs, double Ve);
  static double profileVelocity(const MotionProfile& profile,
                                double t, double Vs, double Ve);

  bool moveSCurveCorrected(double x, double y, double targetYawDeg,
                           bool useLine, bool useBno,
                           double vm, double a, double ad,
                           double Vs, double Ve,
                           TuMtcInterruptCallback cb);

  bool moveCurveSCurveBnoTarget(double x, double y,
                                double targetYawDeg, double bulge,
                                double vm, double a, double ad,
                                double Vs, double Ve,
                                TuMtcInterruptCallback cb);

  static double easeInOut(double u);
  static double wrap180(double deg);
  static double clampValue(double value, double minValue, double maxValue);
};

