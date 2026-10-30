#ifndef TU_KIT_TEMPERATURE_H
#define TU_KIT_TEMPERATURE_H

#include <Arduino.h>
#include <math.h>

class TuKitTemperature {
public:
    TuKitTemperature() : _pin(0), _digitalPin(-1), _activeLow(false),
        _adcMax(1023), _r0(10000.0f), _beta(3950.0f),
        _series(10000.0f), _nominalC(25.0f), _begun(false) {}

    void begin(uint8_t pin, int16_t digitalPin, bool activeLow, uint16_t adcMax) {
        _pin = pin;
        _digitalPin = digitalPin >= 0 && digitalPin <= 255 ? digitalPin : -1;
        _activeLow = activeLow;
        _adcMax = adcMax > 1 ? adcMax : 1023;
        pinMode(_pin, INPUT);
        if (_digitalPin >= 0) pinMode(static_cast<uint8_t>(_digitalPin), INPUT);
        _begun = true;
    }

    void configure(float resistanceAtNominal, float beta, float seriesResistance, float nominalC) {
        _r0 = resistanceAtNominal;
        _beta = beta;
        _series = seriesResistance;
        _nominalC = nominalC;
    }

    int nativeRaw() const {
        if (!_begun) return 0;
        const int value = analogRead(_pin);
        return value < 0 ? 0 : value > _adcMax ? _adcMax : value;
    }

    // Normalize without changing the application's global ADC resolution.
    int raw() const {
        return static_cast<int>((static_cast<uint32_t>(nativeRaw()) * 1023U + _adcMax / 2U) / _adcMax);
    }

    bool thresholdReached() const {
        return _begun && _digitalPin >= 0 &&
            (digitalRead(static_cast<uint8_t>(_digitalPin)) == (_activeLow ? LOW : HIGH));
    }

    // ntcToGround: VCC--fixed resistor--AO--NTC--GND.
    // false: VCC--NTC--AO--fixed resistor--GND.
    float celsius(bool ntcToGround = true) const {
        const int sample = nativeRaw();
        if (!_begun || sample <= 0 || sample >= _adcMax ||
            !(_r0 > 0.0f) || !(_beta > 0.0f) || !(_series > 0.0f) ||
            !(_nominalC > -273.15f) || !isfinite(_r0) || !isfinite(_beta) ||
            !isfinite(_series) || !isfinite(_nominalC)) return NAN;
        const float ratio = static_cast<float>(sample) / static_cast<float>(_adcMax - sample);
        const float resistance = ntcToGround ? _series * ratio : _series / ratio;
        if (!(resistance > 0.0f) || !isfinite(resistance)) return NAN;
        const float inverseK = 1.0f / (_nominalC + 273.15f) + logf(resistance / _r0) / _beta;
        if (!(inverseK > 0.0f) || !isfinite(inverseK)) return NAN;
        const float result = 1.0f / inverseK - 273.15f;
        return isfinite(result) ? result : NAN;
    }

private:
    uint8_t _pin;
    int16_t _digitalPin;
    bool _activeLow;
    uint16_t _adcMax;
    float _r0, _beta, _series, _nominalC;
    bool _begun;
};

#endif
