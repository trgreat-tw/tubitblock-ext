#ifndef TU_KIT_OUTPUT_PWM_H
#define TU_KIT_OUTPUT_PWM_H

#include <Arduino.h>

// Shared by kitRGB and kitBuzzer. The final LEDC timer pair is reserved
// for one passive tone, so changing its frequency cannot change RGB PWM.
#if defined(ARDUINO_ARCH_ESP32)
#include <esp_arduino_version.h>
#include <soc/soc_caps.h>
#if defined(SOC_LEDC_SUPPORT_HS_MODE) && SOC_LEDC_SUPPORT_HS_MODE
#define KIT37_LEDC_COUNT (SOC_LEDC_CHANNEL_NUM * 2)
#else
#define KIT37_LEDC_COUNT SOC_LEDC_CHANNEL_NUM
#endif
inline bool kit37PwmAttach(uint8_t pin, uint16_t channel) {
  if (channel >= KIT37_LEDC_COUNT - 2) return false;
#if ESP_ARDUINO_VERSION_MAJOR >= 3
  return ledcAttachChannel(pin, 5000, 8, static_cast<uint8_t>(channel));
#else
  if (ledcSetup(static_cast<uint8_t>(channel), 5000, 8) == 0) return false;
  ledcAttachPin(pin, static_cast<uint8_t>(channel));
  return true;
#endif
}
inline void kit37PwmWrite(uint8_t pin, uint16_t channel, uint8_t value) {
#if ESP_ARDUINO_VERSION_MAJOR >= 3
  (void)channel;
  ledcWrite(pin, value);
#else
  (void)pin;
  ledcWrite(static_cast<uint8_t>(channel), value);
#endif
}
#else
inline bool kit37PwmAttach(uint8_t pin, uint16_t channel) {
  (void)pin; (void)channel;
  return true;
}
inline void kit37PwmWrite(uint8_t pin, uint16_t channel, uint8_t value) {
  (void)channel;
  analogWrite(pin, value);
}
#endif
inline int16_t &kit37ToneOwner() {
  static int16_t pin = -1;
  return pin;
}
inline void kit37ToneStop(uint8_t pin) {
  if (kit37ToneOwner() != pin) return;
#if defined(ARDUINO_ARCH_ESP32)
#if ESP_ARDUINO_VERSION_MAJOR >= 3
  ledcWriteTone(pin, 0);
  ledcDetach(pin);
#else
  ledcWriteTone(KIT37_LEDC_COUNT - 2, 0);
  ledcDetachPin(pin);
#endif
#else
  noTone(pin);
#endif
  digitalWrite(pin, LOW);
  kit37ToneOwner() = -1;
}
inline bool kit37ToneStart(uint8_t pin, long frequency) {
  if (frequency <= 0) { kit37ToneStop(pin); return true; }
  if (frequency < 31) frequency = 31;
  if (frequency > 20000) frequency = 20000;
  if (kit37ToneOwner() >= 0 && kit37ToneOwner() != pin) kit37ToneStop((uint8_t)kit37ToneOwner());
#if defined(ARDUINO_ARCH_ESP32)
  if (kit37ToneOwner() != pin) {
#if ESP_ARDUINO_VERSION_MAJOR >= 3
    if (!ledcAttachChannel(pin, (uint32_t)frequency, 10, KIT37_LEDC_COUNT - 2)) return false;
#else
    if (ledcSetup(KIT37_LEDC_COUNT - 2, (uint32_t)frequency, 10) == 0) return false;
    ledcAttachPin(pin, KIT37_LEDC_COUNT - 2);
#endif
  }
#if ESP_ARDUINO_VERSION_MAJOR >= 3
  if (ledcWriteTone(pin, (uint32_t)frequency) == 0) return false;
#else
  if (ledcWriteTone(KIT37_LEDC_COUNT - 2, (uint32_t)frequency) == 0) return false;
#endif
#else
  tone(pin, (unsigned int)frequency);
#endif
  kit37ToneOwner() = pin;
  return true;
}

#endif
