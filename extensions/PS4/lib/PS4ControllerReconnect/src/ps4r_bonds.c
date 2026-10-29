// Case #40 experiment: remove stored Classic Bluetooth bonds before listening.
// No NVS/Flash erase and no name lookup; remote controllers may be powered off.
#ifndef LOG_LOCAL_LEVEL
#define LOG_LOCAL_LEVEL 3
#endif
#include <stdint.h>
#include <stdbool.h>
#include <string.h>
#include "esp_gap_bt_api.h"
#include "esp_log.h"
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "freertos/queue.h"

typedef struct {
    uint8_t peer[6];
    int status;
} ps4r_bond_result_t;

// Keep this queue alive: a GAP completion may arrive after a timeout.
static QueueHandle_t removal_results;

void ps4r_bond_removed(const uint8_t* peer, int status) {
    if (!removal_results || !peer) return;
    ps4r_bond_result_t result;
    memcpy(result.peer, peer, sizeof(result.peer));
    result.status = status;
    xQueueSend(removal_results, &result, 0);
}

bool ps4r_clear_bonds(void) {
    const int count = esp_bt_gap_get_bond_device_num();
    ESP_LOGI("PS4R", "BONDS BEFORE count=%d scope=ALL_STORED_CLASSIC_BONDS", count);
    // Refuse unexpected sizes instead of deleting a truncated device list.
    esp_bd_addr_t peers[32];
    if (count < 0 || count > (int)(sizeof(peers) / sizeof(peers[0]))) {
        ESP_LOGE("PS4R", "BONDS FAILED invalid count=%d", count);
        return false;
    }
    if (count == 0) {
        ESP_LOGI("PS4R", "BONDS DONE remaining=0 (nothing to remove)");
        return true;
    }
    int listed = count;
    const esp_err_t list_result = esp_bt_gap_get_bond_device_list(&listed, peers);
    if (list_result != ESP_OK || listed != count) {
        ESP_LOGE("PS4R", "BONDS FAILED list result=%d expected=%d actual=%d", (int)list_result, count, listed);
        return false;
    }
    if (!removal_results) removal_results = xQueueCreate(1, sizeof(ps4r_bond_result_t));
    if (!removal_results) {
        ESP_LOGE("PS4R", "BONDS FAILED completion queue allocation");
        return false;
    }
    for (int i = 0; i < listed; ++i) {
        xQueueReset(removal_results);
        const esp_err_t request = esp_bt_gap_remove_bond_device(peers[i]);
        ESP_LOGI("PS4R", "BOND REMOVE request=%d peer=%02x:%02x:%02x:%02x:%02x:%02x", (int)request,
            peers[i][0], peers[i][1], peers[i][2], peers[i][3], peers[i][4], peers[i][5]);
        if (request != ESP_OK) return false;
        const TickType_t start = xTaskGetTickCount();
        const TickType_t budget = pdMS_TO_TICKS(5000) ? pdMS_TO_TICKS(5000) : 1;
        bool completed = false;
        for (;;) {
            const TickType_t elapsed = (TickType_t)(xTaskGetTickCount() - start);
            if (elapsed >= budget) break;
            const TickType_t remaining = budget - elapsed;
            ps4r_bond_result_t result;
            if (xQueueReceive(removal_results, &result, remaining) != pdTRUE) break;
            // Ignore unrelated or late completions from another peer.
            if (memcmp(result.peer, peers[i], sizeof(result.peer)) != 0) continue;
            if (result.status != ESP_BT_STATUS_SUCCESS) {
                ESP_LOGE("PS4R", "BONDS FAILED completion status=%d", result.status);
                return false;
            }
            completed = true;
            break;
        }
        if (!completed) {
            ESP_LOGE("PS4R", "BONDS FAILED timeout waiting for removal (5000 ms)");
            return false;
        }
    }
    const int remaining = esp_bt_gap_get_bond_device_num();
    ESP_LOGI("PS4R", "BONDS DONE remaining=%d", remaining);
    return remaining == 0;
}
