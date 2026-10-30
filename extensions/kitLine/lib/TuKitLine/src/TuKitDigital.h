#ifndef TU_KIT_DIGITAL_INTERNAL_H
#define TU_KIT_DIGITAL_INTERNAL_H

#include <Arduino.h>

class TubitKitDigital {
public:
    TubitKitDigital() : _pin(-1), _level(LOW), _debounce(20), _changed(0),
        _rawHigh(false), _candidate(false), _state(false), _rose(false), _fell(false) {}
    void begin(int16_t pin, uint8_t level, bool pullup, uint16_t debounce) {
        _pin=pin; _level=level; _debounce=debounce; _rose=_fell=false;
        if (_pin<0) { _rawHigh=_candidate=_state=false; return; }
        pinMode(_pin,pullup ? INPUT_PULLUP : INPUT);
        _rawHigh=digitalRead(_pin)==HIGH;
        _candidate=_rawHigh==(_level==HIGH); _state=_candidate;
        _changed=(uint32_t)millis();
    }
    void update() { refresh(true); }
    bool readActive() { refresh(false); return _state; }
    bool active() const { return _state; }
    bool justActivated() const { return _rose; }
    bool justReleased() const { return _fell; }
    int raw() const { return _rawHigh ? 1 : 0; }
private:
    void refresh(bool clearEvents) {
        if (clearEvents) _rose=_fell=false;
        if (_pin<0) return;
        const uint32_t now=(uint32_t)millis();
        _rawHigh=digitalRead(_pin)==HIGH;
        const bool candidate=_rawHigh==(_level==HIGH);
        if (candidate!=_candidate) { _candidate=candidate; _changed=now; }
        if (_candidate!=_state && (uint32_t)(now-_changed)>=_debounce) {
            _state=_candidate; _rose=_state; _fell=!_state;
        }
    }
    int16_t _pin; uint8_t _level; uint16_t _debounce; uint32_t _changed;
    bool _rawHigh,_candidate,_state,_rose,_fell;
};

#endif
