TubitBlock PS4 積木 1.3.0（2026-10-29）

固定使用 PS4ControllerReconnect 1.1.1-r4。
PS4 初始化積木只保留 MAC 欄位，沒有 LIB 選單。
初始化時自動產生：
PS4R.setClearBondsOnStart(true);
PS4R.begin(); 或 PS4R.begin("原本的主機MAC");

此設定沿用使用者實測可用的清除配對流程。底層重連、驗證與 MAC 檢查邏輯未改動。
每次 ESP32 啟動並初始化時，會清除全部已儲存的 Classic Bluetooth 配對紀錄；等待刪除完成後開放連線。
同一次持續開機期間，手把關機與重連不會再次執行清除。
SSP 維持開啟；不清空整個 NVS 或 Flash。

使用方式
1. 儲存專案，完全關閉並重新開啟 TubitBlock。
2. PS4 初始化使用原本的 MAC，重新編譯燒錄即可。
3. MAC 欄位是手把記住的「主機位址」，不是手把自己的位址。
4. 00:00:00:00:00:00 代表使用 ESP32 原生藍牙位址。
5. 舊專案儲存的 LIB 欄位會被忽略，統一使用目前的固定行為。

清理內容
移除 LIB 選單、舊模式產碼、舊比較範例、DS4Arduino、TubitBlockPS4DS4 及使用中目錄的原版 PS4Controller。
原版、DS4 與更新前的其他檔案均保留在擴充目錄之外的完整備份，可依其中的 RESTORE.txt 還原。
剩餘唯一的編譯用函式庫是 lib/PS4ControllerReconnect。

驗證
31 項真實 Blockly／Arduino 與 SB3 相容性檢查通過。
包含五種舊 LIB 欄位的載入、移除選單、全零／自訂 MAC，以及清除設定必須先於 begin。
完整控制積木產生碼與先前可用的清配對版本一致，僅整理格式。
積木產生的程式與 PS4Connection 範例均使用官方 Core 3.1.3 編譯通過。
沒有更新 Core、GitHub、NAS 或線上網站，沒有代為燒錄 ESP32。
