# TuIRAlign v2.0.3

TuBit V2 的六路紅外線靠牆校正函式庫，可搭配 `TuMTC` 麥克納姆輪與
`TuOTC` 全向輪底盤。函式庫會濾波 IR 讀值，並使用 PID 修正前後距離、
側向距離及車身角度。

## v2.0.3 腳位順序

`setPins()` 的六個參數依照感測器的**實體通道編號**排列：

| 參數 | 實體位置 | 內部名稱 | TuBit V2 預設 GPIO | 讀值函式 |
| --- | --- | --- | ---: | --- |
| 1 | 前 | `UP` | 33 | `getFilteredUP()` |
| 2 | 後 | `BK` | 32 | `getFilteredBK()` |
| 3 | 左後 | `LB` | 34 | `getFilteredLB()` |
| 4 | 左前 | `LU` | 35 | `getFilteredLU()` |
| 5 | 右後 | `RB` | 39 | `getFilteredRB()` |
| 6 | 右前 | `RU` | 36 | `getFilteredRU()` |

因此 TuBit V2 的初始化方式是：

```cpp
ir.setPins(33, 32, 34, 35, 39, 36);
```

函式庫內部會轉換為以下邏輯位置：

```text
[前, 後, 左前, 左後, 右前, 右後] = [參數1, 參數2, 參數4, 參數3, 參數6, 參數5]
```

也就是內部映射為 `[1, 2, 4, 3, 6, 5]`。最後一項是第 5 顆感測器，
不可寫成 `[1, 2, 4, 3, 6, 4]`，否則會重複左前感測器並漏掉右後感測器。

> 注意：`setPins()` 從 v2.0.3 起使用上述實體通道順序。舊程式若使用
> 「前、後、左前、左後、右前、右後」順序，請重新排列第三至第六個參數。

## 目標值順序

`setTargets()` 沒有跟著改成實體通道順序；它仍依照**邏輯位置**排列：

```cpp
ir.setTargets(front, back, leftFront, leftBack, rightFront, rightBack);
```

例如六顆感測器的目標讀值都是 25：

```cpp
ir.setTargets(25, 25, 25, 25, 25, 25);
```

若用不同數值確認順序，下面依序代表前、後、左前、左後、右前、右後：

```cpp
ir.setTargets(21, 22, 23, 24, 25, 26);
```

目標值使用 `analogRead(pin) / 100.0` 的單位，建議將車子放在預定的靠牆
距離後，先讀取六顆感測器的實測值再填入。

## 完整初始化範例

```cpp
#include <Wire.h>
#include <TuBitCore.h>
#include <TuMTC.h>
#include <TuIRAlign.h>

TuBitCore core;
TuMTC mtc(core);
TuIRAlign<TuMTC> ir(core, mtc);

void setup() {
  core.init();

  // 1前、2後、3左後、4左前、5右後、6右前
  ir.setPins(33, 32, 34, 35, 39, 36);

  // 前、後、左前、左後、右前、右後
  ir.setTargets(25, 25, 25, 25, 25, 25);

  ir.setTolerancePercent(5.0);
  ir.setDeadbands(0.3, 0.3);
  ir.setAccelerationLimits(40, 360);

  // 主校正左牆，同時修正後方距離。
  bool aligned = ir.alignBlocking(IR_L, IR_BACK, 8000, 1000);
}

void loop() {
}
```

若使用 OTC，只要將型別改成 `TuOTC`：

```cpp
#include <TuOTC.h>

TuOTC otc(core);
TuIRAlign<TuOTC> ir(core, otc);
```

## 緩加速與減速

v2.0.2 起，每次開始校正或切換校正方向時，速度命令會從 0 緩慢增加，
避免馬達瞬間全速啟動：

```cpp
ir.setAccelerationLimits(40, 360);
```

- 第一個參數是 X/Y 線速度每秒最多增加的量，預設為 `40`。
- 第二個參數是旋轉速度每秒最多增加的量，預設為 `360`。
- 設為 `0` 可關閉對應的起步加速度限制。
- 靠近目標時仍會立即跟隨 PID 降速，不會因緩加速設定而延遲減速。
- 完成、逾時或開始新的校正要求時，速度與 PID 狀態都會重設。

## 常用校正方式

阻塞式校正：

```cpp
ir.alignBlocking(mainDir, secondaryDir, timeoutMs, confirmMs);
```

它會在校正成功時回傳 `true`，逾時時回傳 `false`；預設逾時為 8000 ms，
達標後的確認時間為 1000 ms。側牆主校正會先橫移到目標距離，再旋轉修正
車身角度，並可同時搭配前方或後方的次校正。

方向可使用：

- `IR_L`、`IR_R`：左牆或右牆的側距與角度校正。
- `IR_UP`、`IR_BACK`：前方或後方距離校正。
- `IR_NONE`：不執行該方向的校正。

非阻塞式程式可在 `loop()` 中持續呼叫：

```cpp
if (ir.step(IR_L, IR_BACK)) {
  // 校正完成
}
```

## 讀取六顆感測器

先更新讀值，再依邏輯位置取得濾波結果：

```cpp
ir.readAllIR_();

double front      = ir.getFilteredUP();  // 實體 1
double back       = ir.getFilteredBK();  // 實體 2
double leftBack   = ir.getFilteredLB();  // 實體 3
double leftFront  = ir.getFilteredLU();  // 實體 4
double rightBack  = ir.getFilteredRB();  // 實體 5
double rightFront = ir.getFilteredRU();  // 實體 6
```

## PID 與輸出設定

```cpp
ir.setPidY(3.0, 0, 0.004);       // 前後距離
ir.setXPID(5.0, 0, 0.035);       // 左右側向距離
ir.setZPID(38.0, 0, 0.04);       // 車身角度
ir.setOutputLimits(20, 20, 360, 2.5);
```

`setOutputLimits()` 的第四個參數是旋轉倍率的除數，必須大於 0。

建議先確認六顆感測器的位置與讀值，再以低速調整 PID。若校正方向相反，
請先檢查實體通道、GPIO 與馬達方向，不要直接用過大的 PID 值補償接線錯誤。

## 第一次測試

1. 先將輪子架空，確認馬達方向及急停方式。
2. 逐顆遮蔽或靠近第 1～6 顆感測器，確認 getter 與積木讀值位置相符。
3. 先單獨測試前／後距離，再測試左牆或右牆校正。
4. 使用較低的輸出限制測試方向，確認無誤後再逐步提高。
5. 最後才加入完整 PID、前後次校正及較長的阻塞校正流程。

## 版本紀錄

- `2.0.3`：依實際接線修正 `setPins()` 實體通道順序及積木讀值對應。
- `2.0.2`：加入每次校正開始時的緩加速，保留靠近目標時的 PID 減速。
- `2.0.0`：加入百分比容許範圍、X/Z PID 設定及分階段側牆校正。

可用以下巨集確認函式庫版本：

```cpp
TUIRALIGN_VERSION  // "2.0.3"
```
