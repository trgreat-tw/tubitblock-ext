# RGB LED v1.2.0

適用37 Sensors Kit的一般RGB LED，共陰／共陽可選。Arduino與ESP32共用，工具箱只保留兩個常用積木，不需要更新狀態。

## 兩個積木

1. **RGB LED（編號）初始化**：設定R／G／B接腳與共陰／共陽，程式會在setup初始化一次。
2. **RGB LED（編號）設定紅／綠／藍**：亮度各為0～255；全部設0即關閉。

編號可直接輸入任意非負整數，例如0、8、42、100；初始化和控制時使用相同編號。編號是物件名稱，不是PWM channel編號。每顆模組使用不同編號與不同接腳。

| 訊號 | Uno／Nano預設 | ESP32預設 |
| --- | --- | --- |
| R／G／B | D5／D6／D9 | 23／15／12 |
| 共用端 | 共陰接GND；共陽接相符電源 | 共陰接GND；共陽接3V3 |

初始化後使用設定顏色積木即可，例如「RGB LED 42 設定紅255綠0藍0」。設定紅0綠0藍0即可關閉。

這是一般RGB模組，並非WS2812燈條。以實物絲印確認R／G／B排列；裸LED每色需限流電阻。ESP32使用3.3V訊號，共陽模組不要將5V回送到GPIO。

ESP32每顆RGB按實際出現順序分配3個LEDC channel，並保留最後一對timer給本批無源蜂鳴器；編號大小不影響分配。可同時控制的顆數仍受板卡PWM資源與腳位限制，經典ESP32通常最多4組。與其他伺服／PWM函式庫共用時需避開其channel配置。

Uno／Nano預設D5／D6／D9避開標準tone的D3／D11 Timer2衝突。GPIO12／15可能影響經典ESP32開機，必要時改選其他可用腳位。

舊專案中的關閉／初始化狀態積木仍可載入，但不再列於工具箱。無第三方函式庫依賴，支援ESP32 core 2.x與3.x。

資料：[KY-009](https://sensorkit.joy-it.net/en/sensors/ky-009)、[KY-016](https://sensorkit.joy-it.net/en/sensors/ky-016)。實物照片以600×372 SVG畫布等比例顯示，原圖與來源SHA256保留於 assets/SOURCES.json。

## 專屬函式庫

擴充附帶 `TuKitRGB`，產生的程式只會 `#include <TuKitRGB.h>`，再宣告物件與呼叫方法；class與硬體處理函式均在函式庫內。保留 `lib/TuKitRGB` 完整資料夾即可編譯，無額外第三方函式庫依賴。
