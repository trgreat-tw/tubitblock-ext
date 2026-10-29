#ifndef LOG_LOCAL_LEVEL
#define LOG_LOCAL_LEVEL 3
#endif
#include "PS4RMac.h"
#include "esp_log.h"
#include "PS4ControllerReconnect.h"
#include <esp_bt_defs.h>
#include <esp_bt_main.h>
#include <esp_idf_version.h>

extern "C" {
#include "esp_bt_device.h"
#include "ps4r.h"
}
#define ESP_BD_ADDR_HEX_STR "%hhx:%hhx:%hhx:%hhx:%hhx:%hhx"
#define ESP_BD_ADDR_HEX_ARR(addr) addr[0], addr[1], addr[2], addr[3], addr[4], addr[5]
#define ESP_BD_ADDR_HEX_PTR(addr) \
  (uint8_t*)addr + 0, (uint8_t*)addr + 1, (uint8_t*)addr + 2, \
  (uint8_t*)addr + 3, (uint8_t*)addr + 4, (uint8_t*)addr + 5

PS4ControllerReconnect::PS4ControllerReconnect() : data{}, event{}, output{} {}

bool PS4ControllerReconnect::setLegacyPairing(bool enabled) {
  if (started_) {
    Serial.println("[PS4R] Cannot change pairing mode after begin; restart ESP32 to compare modes.");
    return false;
  }
  legacyPairing_ = enabled;
  return true;
}

bool PS4ControllerReconnect::setClearBondsOnStart(bool enabled) {
  if (started_) {
    Serial.println("[PS4R] Cannot change bond cleanup after begin; restart ESP32 to compare modes.");
    return false;
  }
  clearBondsOnStart_ = enabled;
  return true;
}

bool PS4ControllerReconnect::begin() {
  if (started_) return true;
  esp_log_level_set("PS4R", ESP_LOG_INFO);
  esp_log_level_set("PS4_SPP", ESP_LOG_INFO);
  ps4rSetEventObjectCallback(this, &PS4ControllerReconnect::_event_callback);
  ps4rSetConnectionObjectCallback(this, &PS4ControllerReconnect::_connection_callback);

  if (!btStarted() && !btStart()) {
    log_e("btStart failed");
    return false;
  }

  esp_bluedroid_status_t btState = esp_bluedroid_get_status();
  if (btState == ESP_BLUEDROID_STATUS_UNINITIALIZED) {
#if ESP_IDF_VERSION >= ESP_IDF_VERSION_VAL(5, 2, 1)
    esp_bluedroid_config_t config = BT_BLUEDROID_INIT_CONFIG_DEFAULT();
    config.ssp_en = !legacyPairing_;
    const int initResult = esp_bluedroid_init_with_cfg(&config);
#else
    if (legacyPairing_) {
      Serial.println("[PS4R] Legacy experiment requires ESP-IDF 5.2.1 or later.");
      return false;
    }
    const int initResult = esp_bluedroid_init();
#endif
    if (initResult) {
      log_e("esp_bluedroid_init failed");
      return false;
    }
  } else if (legacyPairing_ || clearBondsOnStart_) {
    Serial.println("[PS4R] INIT FAILED: this test mode needs a fresh Bluetooth stack. Restart ESP32 and initialize PS4R first.");
    return false;
  } else {
    Serial.println("[PS4R] Bluetooth stack already initialized; existing SSP configuration is retained.");
  }

  if (btState != ESP_BLUEDROID_STATUS_ENABLED) {
    if (esp_bluedroid_enable()) {
      log_e("esp_bluedroid_enable failed");
      return false;
    }
  }

  ps4r_sppSetLegacyPairing(legacyPairing_);
  ps4r_sppSetClearBondsOnStart(clearBondsOnStart_);
  ESP_LOGI("PS4R", "REV=1.1.1-r4 PAIRING=%s CLEAR_BONDS=%u", legacyPairing_ ? "LEGACY_TEST" : "SSP", clearBondsOnStart_);
  started_ = ps4rInit();
  Serial.printf("[PS4R] STACK_INIT=%s BT_MAC=%s\n", started_ ? "OK" : "FAILED", getAddress().c_str());
  return started_;
}

bool PS4ControllerReconnect::begin(const char* mac) {
  uint8_t address[6];
  if (!ps4rParseMac(mac,address)) {
    Serial.printf("[PS4R] INIT FAILED: invalid unicast BT MAC '%s'. Use six hex pairs; first byte must be even.\n", mac ? mac : "(null)");
    return false;
  }
  if (btStarted()) {
    const uint8_t* current=esp_bt_dev_get_address();
    if (!current || memcmp(current,address,6) != 0) {
      Serial.println("[PS4R] INIT FAILED: Bluetooth already started with another MAC.");
      return false;
    }
  } else if (!ps4rSetBluetoothMacAddress(address)) {
    Serial.println("[PS4R] INIT FAILED: Core rejected the requested BT MAC.");
    return false;
  }
  if (!begin()) return false;
  const uint8_t* effective=esp_bt_dev_get_address();
  if (!effective || memcmp(effective,address,6) != 0) {
    Serial.printf("[PS4R] INIT FAILED: requested BT MAC %s differs from actual %s.\n", mac, getAddress().c_str());
    end();
    return false;
  }
  Serial.printf("[PS4R] MAC confirmed: %s\n", mac);
  return true;
}

bool PS4ControllerReconnect::end() {
  if (started_) ps4rDeinit();
  started_ = false;
  return true;
}

String PS4ControllerReconnect::getAddress() {
  String address = "";

  if (btStarted()) {
    char mac[18];
    const uint8_t* addr = esp_bt_dev_get_address();
    if (!addr) return address;
    sprintf(mac, ESP_BD_ADDR_STR, ESP_BD_ADDR_HEX_ARR(addr));
    address = String(mac);
  }
  
  return address;
}

bool PS4ControllerReconnect::isConnected() {
  return ps4rIsConnected();
}

void PS4ControllerReconnect::setLed(uint8_t r, uint8_t g, uint8_t b) {
  output.r = r;
  output.g = g;
  output.b = b;
}

void PS4ControllerReconnect::setRumble(uint8_t small, uint8_t large) {
  output.smallRumble = small;
  output.largeRumble = large;
}

void PS4ControllerReconnect::setFlashRate(uint8_t onTime, uint8_t offTime) {
  output.flashOn = onTime;
  output.flashOff = offTime;
}

void PS4ControllerReconnect::sendToController() {
  ps4rSetOutput(output);
}

void PS4ControllerReconnect::attach(callback_t callback) {
  _callback_event = callback;
}

void PS4ControllerReconnect::attachOnConnect(callback_t callback) {
  _callback_connect = callback;
}

void PS4ControllerReconnect::attachOnDisconnect(callback_t callback) {
  _callback_disconnect = callback;
}

void PS4ControllerReconnect::_event_callback(
  void* object, ps4r_t data, ps4r_event_t event) {
  PS4ControllerReconnect* This = (PS4ControllerReconnect*)object;

  memcpy(&This->data, &data, sizeof(ps4r_t));
  memcpy(&This->event, &event, sizeof(ps4r_event_t));

  if (This->_callback_event) {
    This->_callback_event();
  }
}

void PS4ControllerReconnect::_connection_callback(void* object, uint8_t isConnected) {
  PS4ControllerReconnect* This = (PS4ControllerReconnect*)object;

  if (isConnected) {

    if (This->_callback_connect) {
      This->_callback_connect();
    }
  } else {
    memset(&This->data, 0, sizeof(This->data));
    memset(&This->event, 0, sizeof(This->event));
    if (This->_callback_disconnect) {
      This->_callback_disconnect();
    }
  }
}

#if !defined(NO_GLOBAL_INSTANCES)
PS4ControllerReconnect PS4R;
#endif
