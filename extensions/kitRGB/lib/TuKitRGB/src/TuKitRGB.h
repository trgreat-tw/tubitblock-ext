#ifndef TU_KIT_RGB_H
#define TU_KIT_RGB_H

#include <Arduino.h>
#include "TuKitOutputPwm.h"

class TuKitRGB {
 public:
  explicit TuKitRGB(uint16_t base) : _base(base), _anode(false), _ready(false) {
    _pins[0] = _pins[1] = _pins[2] = 255;
  }
  void begin(uint8_t red, uint8_t green, uint8_t blue, bool commonAnode) {
    _pins[0] = red; _pins[1] = green; _pins[2] = blue;
    _anode = commonAnode; _ready = false;
    if (red == green || red == blue || green == blue) return;
#if defined(ARDUINO_ARCH_ESP32)
    if (_base + 2 >= KIT37_LEDC_COUNT - 2) return;
#endif
    for (uint8_t i = 0; i < 3; ++i) {
      digitalWrite(_pins[i], _anode ? HIGH : LOW);
      pinMode(_pins[i], OUTPUT);
      if (!kit37PwmAttach(_pins[i], _base + i)) return;
      kit37PwmWrite(_pins[i], _base + i, static_cast<uint8_t>(_anode ? 255 : 0));
    }
    _ready = true;
  }
  bool ready() const { return _ready; }
  void write(long red, long green, long blue) {
    if (!_ready) return;
    long values[3] = {red, green, blue};
    for (uint8_t i = 0; i < 3; ++i) {
      const uint8_t value = (uint8_t)(values[i] < 0 ? 0 : values[i] > 255 ? 255 : values[i]);
      kit37PwmWrite(_pins[i], _base + i, static_cast<uint8_t>(_anode ? 255 - value : value));
    }
  }
 private:
  uint16_t _base;
  uint8_t _pins[3];
  bool _anode, _ready;
};

#endif
