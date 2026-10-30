#ifndef TU_KIT_JOYSTICK_H
#define TU_KIT_JOYSTICK_H

#include <Arduino.h>
#include "TuKitDigital.h"

#if defined(ARDUINO_ARCH_ESP32)
#define TUBITKIT_DEFAULT_ADC_BITS 12
#else
#define TUBITKIT_DEFAULT_ADC_BITS 10
#endif
class TuKitJoystick {
public:
    TuKitJoystick() : _x(-1), _y(-1), _adcMaximum(1023), _xRaw(0), _yRaw(0) {}
    void begin(int16_t x,int16_t y,int16_t sw,uint8_t bits=TUBITKIT_DEFAULT_ADC_BITS) {
        _x=x; _y=y; if (bits<9 || bits>16) bits=TUBITKIT_DEFAULT_ADC_BITS;
        _adcMaximum=((uint32_t)1<<bits)-1;
        pinMode(_x,INPUT); pinMode(_y,INPUT); _button.begin(sw,LOW,true,20);
        _xRaw=analogRead(_x); _yRaw=analogRead(_y);
    }
    void update() { if (_x>=0) _xRaw=analogRead(_x); if (_y>=0) _yRaw=analogRead(_y); _button.update(); }
    int readRaw(bool y) { const int16_t pin=y?_y:_x; const int value=pin>=0?analogRead(pin):0; if (y) _yRaw=value; else _xRaw=value; return value; }
    int raw(bool y) const { return y ? _yRaw : _xRaw; }
    int percent(bool y,bool reversed) const {
        long value=raw(y); if (value<0) value=0; if ((uint32_t)value>_adcMaximum) value=(long)_adcMaximum;
        const int result=(int)((uint32_t)value*100UL/_adcMaximum); return reversed?100-result:result;
    }
    int readPercent(bool y,bool reversed) { readRaw(y); return percent(y,reversed); }
    bool readPressed() { return _button.readActive(); }
    bool pressed() const { return _button.active(); }
    bool justPressed() const { return _button.justActivated(); }
    bool justReleased() const { return _button.justReleased(); }
private:
    int16_t _x,_y; uint32_t _adcMaximum; int _xRaw,_yRaw; TubitKitDigital _button;
};

#endif
