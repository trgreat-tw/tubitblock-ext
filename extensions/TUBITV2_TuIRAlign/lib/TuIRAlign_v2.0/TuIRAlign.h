#pragma once

#include <Arduino.h>
#include <math.h>
#include <PID_v1.h>
#include "TuBitCore.h"

#define TUIRALIGN_VERSION "2.0.3"


// 方向列舉：主牆 / 次牆用
enum IRDir {
  IR_UP   = 0,
  IR_BACK = 1,
  IR_L    = 2,
  IR_R    = 3,
  IR_NONE = -1
};

// IR 腳位設定
struct TuIRPins {
  int up   = -1;
  int back = -1;
  int lu   = -1;
  int lb   = -1;
  int ru   = -1;
  int rb   = -1;
};

// IR 目標值（建議用 analogRead()/100 實測後填）
struct TuIRTargets {
  double up   = 25;
  double back = 25;
  double lu   = 25;
  double lb   = 25;
  double ru   = 25;
  double rb   = 25;
};

template<typename Robot>
class TuIRAlign {
public:
  TuIRAlign(TuBitCore& core, Robot& robot);

  // 設定 IR 腳位，參數依實體通道順序：
  // 1 前、2 後、3 左後、4 左前、5 右後、6 右前
  void setPins(int IR_1, int IR_2,
               int IR_3, int IR_4,
               int IR_5, int IR_6);

  // 設定 IR 目標（建議以距牆 10cm 的量測值 /100）
  void setTargets(double t_up, double t_back,
                  double t_lu, double t_lb,
                  double t_ru, double t_rb);

  // 切換角度計算方式：false=用上下差值，true=用比例 (LU/LB 或 RU/RB)
  void setUseRatioAngle(bool enable);

  // 調整距離與角度 deadband
  void setDeadbands(double distDb, double angDb);

  // 調整相對容許範圍；5 表示目標值的 ±5%，0 可關閉
  void setTolerancePercent(double percent);

  // 調整輸出上限與角度比例
  void setOutputLimits(double vxLim, double vyLim, double wzLim, double wzScale);

  // 調整起步加速度上限（速度單位/秒、角度速度單位/秒）；設為 0 可關閉
  void setAccelerationLimits(double linearPerSecond, double angularPerSecond);

  // 外部微調 PID 參數，參數順序皆為 Kp, Ki, Kd
  void setPidY(double kp, double ki, double kd);
  void setPidX(double kp, double ki, double kd);
  void setPidZ(double kp, double ki, double kd);
  void setPidT(double kp, double ki, double kd); // 舊版相容：等同 setPidZ()
  void setPidXZ(double x_kp, double x_ki, double x_kd,
                double z_kp, double z_ki, double z_kd);
  void setXPID(double kp, double ki, double kd);
  void setZPID(double kp, double ki, double kd);
  void setXZPID(double x_kp, double x_ki, double x_kd,
                double z_kp, double z_ki, double z_kd);

  // 一次設定三組 PID 參數（Y, X, Z）
  void setPidAll(double y_kp, double y_ki, double y_kd,
                 double x_kp, double x_ki, double x_kd,
                 double z_kp, double z_ki, double z_kd);

  // 單步校正（非阻塞），回傳 true 表示已對齊完成
  bool step(IRDir mainDir, IRDir secDir);

  // 阻塞式校正，timeout_ms 內達成回傳 true，超時回傳 false
  bool alignBlocking(IRDir mainDir,
                   IRDir secDir,
                   unsigned long timeout_ms  = 8000,
                   unsigned long confirm_ms  = 1000);


  // 若要除錯用，可以拿到目前濾波後的 IR 值
  double getFilteredLU() const;
  double getFilteredLB() const;
  double getFilteredRU() const;
  double getFilteredRB() const;
  double getFilteredUP() const;
  double getFilteredBK() const;
  void   readAllIR_();

private:
  TuBitCore& core_;
  Robot&     robot_;

  TuIRPins    pins_;
  TuIRTargets targets_;

  bool   use_ratio_angle_ = false;
  double deadband_dist_   = 0.3;
  double deadband_ang_    = 0.3;
  double tolerance_ratio_ = 0.05;

  double vx_limit_ = 20;
  double vy_limit_ = 20;
  double wz_limit_ = 360;
  double wz_scale_ = 2.5;

  // 預設約 0.5 秒到達各軸輸出上限；只限制加速，不延遲 PID 減速
  double linear_accel_limit_  = 40;
  double angular_accel_limit_ = 360;
  double command_vx_ = 0;
  double command_vy_ = 0;
  double command_wz_ = 0;
  unsigned long last_command_us_ = 0;
  bool command_initialized_ = false;

  enum SideAlignPhase {
    SIDE_PHASE_APPROACH,
    SIDE_PHASE_ROTATE
  };

  bool has_active_request_ = false;
  IRDir active_main_dir_ = IR_NONE;
  IRDir active_sec_dir_ = IR_NONE;
  SideAlignPhase side_phase_ = SIDE_PHASE_APPROACH;

  // 濾波後 IR 值
  double fLU_, fLB_, fRU_, fRB_, fUP_, fBK_;

  // PID I/O 變數
  double IR_Y_IN_, IR_Y_OU_, IR_Y_SP_;
  double IR_X_IN_, IR_X_OU_, IR_X_SP_;
  double IR_T_IN_, IR_T_OU_, IR_T_SP_;

  PID pidY_;
  PID pidX_;
  PID pidT_;

  // === 內部工具 ===
  double readIR_(int pin);
  bool   reached_(double in, double sp, double db) const;
  bool   sideDistanceReached_(IRDir dir) const;
  void   selectSideDistanceTarget_(IRDir dir, double& in, double& sp) const;
  void   driveRamped_(double targetVx, double targetVy, double targetWz);
  double rampUp_(double current, double target, double maxDelta) const;
  void   resetCommand_();
  void   resetPidState_();
  void   resetState_();
  double ema_(double prev, double now, double alpha);
};

// 為了讓 .cpp 做顯式實體化，這裡先 forward declare MTC / OTC
class TuMTC;
class TuOTC;

// 告訴編譯器：這兩個實例會在 TuIRAlign.cpp 裡產生
extern template class TuIRAlign<TuMTC>;
extern template class TuIRAlign<TuOTC>;
