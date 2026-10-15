# TuMTC V3.0.4

TuBit V2 MTC 麥克納姆輪控制函式庫參考版本。

本文所稱的「IR／BNO 校正」是車輛行進中的閉迴路修正，不是感測器
黑白閾值學習或 BNO offset 寫入功能。

## V3 主要功能

1. 保留 V2 的開迴路、編碼器閉迴路、S 型移動與貝茲曲線移動。
2. 加入四輪獨立百分比補償。
3. 加入五路 IR 循跡，MTC 預設以橫移 X 軸修正位置。
4. 加入 BNO 航向 PID，可在直線、斜向與邊走邊轉時即時修正。
5. 可同時使用 IR、BNO、四輪補償及四輪編碼器 PID。

## 四輪補償

```cpp
mtc.SetMotorOffset(-10, 0, 20, 0);
```

數值為百分比：

- `-10`：M1 目標輸出降低 10%。
- `20`：M3 目標輸出增加 20%。
- `0`：不補償。

補償會在麥克納姆輪運動學計算後、送入編碼器 PID 前套用。開迴路輸出會限制在 `-255~255`。

## 循跡修正

```cpp
mtc.initLineSensor(IR1, IR2, IR3, IR4, IR5);
mtc.setLinePositionMapping(-5, -2, 0, 2, 5);
mtc.setLineCorrectionAxis(TuMTC::LineCorrectionAxis::X);
mtc.setLinePid(2.0, 0.02, 0.08, 20.0, 50.0);
```

IR1～IR5 依照 DTC 的定義由左至右排列，預設權重為
`-5、-2、0、2、5`。預設 `HIGH` 表示看到黑線；模組若為低態有效，
請呼叫 `setLinePolarity(false)`。也保留 DTC 常用名稱
`initIRsensor()`、`readIR()` 與 `setPosMapping()`，方便移植測試程式。

如果車子沿 Y 軸前進，建議用 `LineCorrectionAxis::X` 左右橫移回到線中央。如果修正方向相反，將位置權重改成：

```cpp
mtc.setLinePositionMapping(5, 2, 0, -2, -5);
```

只用 IR 且想模擬 DTC 的差速轉向行為時，可以改用：

```cpp
mtc.setLineCorrectionAxis(TuMTC::LineCorrectionAxis::YAW);
mtc.setLinePid(2.0, 0.02, 0.0, 20.0, 50.0);  // DTC 式 PI 結構
```

DTC 與 MTC 的旋轉命令單位不同，上述增益只是低速起始值，不能直接視為
DTC 原參數；請架空或低速重新調整。

同時啟用 BNO 時建議維持 `LineCorrectionAxis::X`：IR 負責橫向位置，
BNO 負責航向，避免兩個控制器同時爭用旋轉軸。五路 IR 全部遺線時，
IR 修正會暫時歸零；未呼叫 `initLineSensor()`／`initIRsensor()` 時，
循線移動函式會回傳 `false` 並停止馬達。

## BNO 航向控制

函式庫本體不綁定特定 BNO055 函式庫。此專案的左右轉以
`EasyBNO055_ESP::orientationZ` 為實際車頭角，透過回呼持續讀取：

```cpp
#include <EasyBNO055_ESP.h>

EasyBNO055_ESP bno;

double readBnoOrientationZ() {
  return bno.isReady() ? bno.orientationZ : NAN;
}

bno.start();
mtc.setYawReader(readBnoOrientationZ);
mtc.setYawDirection(1);
mtc.setHeadingPid(3.0, 0.0, 0.03, 120.0, 60.0);
```

`orientationZ` 是啟動時歸零並可跨越 0/360 的連續角度。TuMTC 每個
控制週期都重新讀取它，不可把某一刻的 `orientationZ` 複製後固定使用。
它是 EasyBNO 對 BNO055 Euler heading（Adafruit event 的
`orientation.x`）解圈後的欄位；請勿改讀 raw `event.orientation.z`。

本機器人的方向定義與 `orientationZ` 一致：**右轉為正角度，左轉為負角度**，
因此使用 `mtc.setYawDirection(1)`。不要為了修正馬達方向把它設成 `-1`；
馬達旋轉映射已在函式庫內統一。若換用安裝方向相反的感測器，才需要調整
感測器方向。

一般移動不需要選擇模式，也不必先讀取或傳入 `forwardYaw`、
`targetYawDeg`。機器人擺好並開始一串新動作時，先擷取一次移動起點；
當下車頭會成為 0 度，X/Y 也以當下方向建立固定座標：

```cpp
if (!mtc.captureBnoStartFrame()) {
  // BNO 尚未可用
  return;
}

// x/y 固定在剛擷取的座標；z 是這一段要增加的相對轉角。
mtc.moveSCurveBno(x, y, z, vm, a, ad, Vs, Ve);
```

- 擷取時的 `+X` 是右方、`+Y` 是前方；之後車頭轉向，XY 軸不會跟著旋轉。
- 若省略擷取，第一個 BNO 移動會自動擷取；但每次重新按下流程並可能手動擺車時，建議明確呼叫一次。
- `moveSCurveBno(0, 100, 0, ...)`：沿起始 `+Y` 走並保持車頭。
- `moveSCurveBno(50, 0, 0, ...)`：沿起始 `+X` 移動並保持車頭。
- `moveSCurveBno(0, 100, 90, ...)`：本段向右增加 `90°`。
- `moveSCurveBno(0, 100, -90, ...)`：本段向左增加 `90°`。
- `moveSCurveBno(0, 0, 720, ...)`：從目前命令航向向右旋轉完整兩圈。

直接移動並保持角度：

```cpp
// 沿起始 +X 移動 50 cm，同時向右轉 90 度。
mtc.moveSCurveBno(50, 0, 90, 800, 400, -400, 0, 0);

// 保持車頭 90 度，沿起始 +Y 移動 50 cm。
// 此時換算成車體動作會是向左橫移，但固定路徑仍是起始 +Y。
mtc.moveSCurveBno(0, 50, 0, 800, 400, -400, 0, 0);
```

也就是說，`x/y` 描述從擷取起點建立的固定方向，`z` 描述本段相對轉角；
兩者彼此獨立。每一段移動不會重新定義 XY。

主 API 的 `z` 是「這一段再增加多少」：例如先給 `-20`，命令航向會到
起始方向的 `-20°`；下一段再給 `+20`，命令航向會回到起始 `0°`。
依序給四次 `+90` 會得到 `90、180、270、360°`。單次 `+360` 會完整
右轉一圈，單次 `+720` 會完整右轉兩圈，不會縮成最短方向。

`z=0` 代表「這一段不要增加轉角」，所以轉到 90 度後，再用 `z=0`
做直線或橫移，仍會保持 90 度。若要明確回到感測器絕對方位 0 度，使用
`moveSCurveBnoAbsolute(..., 0, ...)`。
`z=0` 只固定車頭方向，`x/y` 仍是擷取時建立的固定座標。

每次新的流程開始前，若可能手動改變過車體方向，呼叫下面這個函式會同時
把目前方向設成新的角度 0 度與 X/Y 起始座標；這不是模式參數：

```cpp
mtc.captureBnoStartFrame();
```

若只想在中止後接受目前車頭方向，但仍保留原本的固定 X/Y 座標，使用
`syncBnoHeading()`。`moveSCurveBnoRelative()` 與 `turnBnoRelative()`
仍保留為語意明確的相對轉向介面：

```cpp
// +90：右轉 90 度；-90：左轉 90 度。
mtc.turnBnoRelative(90.0,
                    600.0, 900.0, 900.0,
                    0.0, 0.0);
```

`turnBnoRelative(360, ...)` 會完整右轉一圈；`-360` 會完整左轉一圈。

這條路徑會持續對照 `bno.orientationZ`，並使用編碼器閉迴路；舊的
`driveVectorOpen(..., z)` 只是裸馬達旋轉命令，不負責角度到位判斷。

V3 的 `driveVectorOpen()`、`driveVectorClosed()` 與全部 BNO 轉向均統一為
`+z` 右轉、`-z` 左轉。這也修正了 V2.4 開／閉迴路旋轉符號不一致的情況；
若舊程式曾依賴 V2.4 的閉迴路 `z` 方向，移植時需將該 `z` 參數反號。

## 常用移動函式

只使用 IR 循跡：

```cpp
mtc.moveSCurveLine(x, y, vm, a, ad, Vs, Ve);
```

一般程式只需使用這個 BNO XYZ 介面；`x/y` 是擷取時建立的固定座標，
`z` 為本段相對轉角、`z=0` 保持航向，沒有 mode、`forwardYaw`
或額外 target 參數：

```cpp
mtc.moveSCurveBno(x, y, z, vm, a, ad, Vs, Ve);
```

下列 Absolute／Relative 函式只為進階或舊程式相容保留；一般移動不需要
選擇它們。若要指定模 360 的絕對方位並走最短方向，才使用：

```cpp
mtc.moveSCurveBnoAbsolute(x, y, targetYaw, vm, a, ad, Vs, Ve);
```

IR 修正位置，同時由 BNO 保持或執行本段相對轉角；路徑 `x/y` 同樣使用
擷取時的固定座標，IR 修正量則維持感測器所在的車體座標：

```cpp
mtc.moveSCurveLineBno(x, y, z, vm, a, ad, Vs, Ve);
```

貝茲曲線加 BNO 也不需要模式或絕對起始角，曲線控制點使用擷取時的固定座標：

```cpp
mtc.moveCurveSCurveBno(
    x, y, z, bulge,
    vm, a, ad, Vs, Ve);
```

若進階程式需要模 360 的最短方位，可分別使用
`moveSCurveBnoAbsolute()`、`moveSCurveLineBnoAbsolute()` 或
`moveCurveSCurveBnoAbsolute()`。

## 第一次測試順序

1. 將車輪架空，確認 M1～M4 正反方向與編碼器方向。
2. 將 `SetMotorOffset(0,0,0,0)`，先測試原始閉迴路直線。
3. 每次只調整一顆馬達，建議補償不要先超過 ±25%。
4. 單獨測試 BNO 原地航向保持，確認右轉時 `orientationZ` 增加；本機器人使用 `setYawDirection(1)`。
5. 擺好機器人後呼叫 `captureBnoStartFrame()`，再低速測試起始 `+Y` 的 `moveSCurveBno(0, 30, 0, ...)`。
6. 最後才啟用 `moveSCurveLineBno()`。

## 注意事項

- BNO 只能校正航向，無法直接量測車體的 X/Y 位移；擷取後固定的 XY 是命令
  方向的座標轉換，不代表具有場地位置回授。
- 累積目標角依賴連續的 `orientationZ`；ESP32 重啟或重新上傳後 EasyBNO
  會重新歸零，上一輪程式的 270／360 度座標不會保留。
- 一排 IR 可校正線路的橫向偏移，但不能完整區分橫向偏移與車頭歪斜；BNO 用來補足角度資訊。
- 馬達補償是底盤校正值，不應拿來取代 BNO 或循跡 PID。
- BNO 請遠離馬達、電池大電流線與強磁性螺絲，測試前確認校正狀態。
- `a` 與 `ad` 在 V3 可傳正值或負值，內部會取絕對值作為加、減速度大小。
- `bnoMoveOpen()`／`bnoMoveClosed()` 保留 V2.4 的 `D + yaw` 座標換算，且不套用 `setYawDirection()`；V3 的連續角度增加為右轉、減少為左轉，相對介面的正值右轉、負值左轉。新程式建議使用 `setYawReader()` 搭配 `moveSCurveBno*()`。
- V2.4 的 `setMtcParameters()`、`adjustMtcConstantsAdd()` 與 `TuMTC::TuMtcInterruptCallback` 已保留，舊草稿可繼續編譯。
