#ifndef TU_KIT_RELAY_H
#define TU_KIT_RELAY_H

#include <Arduino.h>

class TuKitRelay {
 public:
  TuKitRelay() : _pin(255), _high(true), _begun(false), _state(false) {}
  void begin(uint8_t pin, bool activeHigh) {
    _pin = pin; _high = activeHigh; _state = false;
    digitalWrite(_pin, _high ? LOW : HIGH);
    pinMode(_pin, OUTPUT);
    _begun = true;
  }
  void write(bool on) {
    if (!_begun) return;
    _state = on;
    digitalWrite(_pin, on == _high ? HIGH : LOW);
  }
  bool state() const { return _state; }
 private:
  uint8_t _pin;
  bool _high, _begun, _state;
};

#endif
