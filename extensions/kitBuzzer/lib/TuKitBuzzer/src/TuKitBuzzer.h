#ifndef TU_KIT_BUZZER_H
#define TU_KIT_BUZZER_H

#include <Arduino.h>
#include "TuKitOutputPwm.h"

class TuKitBuzzer {
 public:
  TuKitBuzzer() : _pin(255), _passive(true), _high(true), _begun(false), _ok(false), _active(false) {}
  void begin(uint8_t pin, bool passive, bool activeHigh) {
    _pin = pin; _passive = passive; _high = activeHigh; _active = false;
    digitalWrite(_pin, _passive ? LOW : (_high ? LOW : HIGH));
    pinMode(_pin, OUTPUT);
    _begun = true; _ok = true;
  }
  void active(bool on) {
    if (!_begun || _passive) return;
    _active = on;
    digitalWrite(_pin, on == _high ? HIGH : LOW);
  }
  void play(long frequency) {
    if (!_begun || !_passive) return;
    _ok = kit37ToneStart(_pin, frequency);
  }
  void stop() {
    if (!_begun) return;
    if (_passive) kit37ToneStop(_pin);
    else active(false);
  }
  bool playing() const {
    return _begun && (_passive ? kit37ToneOwner() == _pin : _active);
  }
  bool ready() const { return _begun && _ok; }
 private:
  uint8_t _pin;
  bool _passive, _high, _begun, _ok, _active;
};

#endif
