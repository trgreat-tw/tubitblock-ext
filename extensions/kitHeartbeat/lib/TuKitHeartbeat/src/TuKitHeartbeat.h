#ifndef TU_KIT_HEARTBEAT_H
#define TU_KIT_HEARTBEAT_H

#include <Arduino.h>
#include <math.h>

// An educational waveform detector. It cannot identify a finger reliably.
// Read all accessors after update(); only update() samples or clears events.
class TuKitHeartbeat {
public:
    TuKitHeartbeat() : _pin(0), _adcMax(1023), _minimumAmplitude(12.0f),
        _begun(false), _raw(0), _baseline(0), _filtered(0), _high(0), _low(0),
        _amplitude(0), _bpm(0), _armed(true), _beat(false), _valid(false),
        _haveCandidate(false), _consistent(0), _startedAt(0), _sampleAt(0),
        _lastCandidateAt(0), _previousInterval(0) {}

    void begin(uint8_t pin, uint16_t adcMax = 1023) {
        _pin = pin;
        _adcMax = adcMax > 1 ? adcMax : 1023;
        pinMode(_pin, INPUT);
        _begun = true;
        const uint32_t now = static_cast<uint32_t>(millis());
        resetSignal(sample(), now);
    }

    void setMinimumAmplitude(float value) {
        if (isfinite(value) && value > 0.0f) {
            _minimumAmplitude = value > 1023.0f ? 1023.0f : value;
        }
    }

    void update() {
        _beat = false;
        if (!_begun) return;
        const uint32_t now = static_cast<uint32_t>(millis());
        const uint32_t elapsed = now - _sampleAt;
        // Timeout also applies if no new sample is due yet.
        if (_haveCandidate && static_cast<uint32_t>(now - _lastCandidateAt) > 2500U) {
            _valid = false;
            _bpm = 0;
            _consistent = 0;
            _haveCandidate = false;
        }
        if (elapsed < 10U) return;
        if (elapsed > 500U) {
            resetSignal(sample(), now);
            return;
        }
        _sampleAt = now;
        _raw = sample();
        if (_raw <= 1 || _raw >= 1022) {
            resetSignal(_raw, now);
            return;
        }

        // Baseline removal (~600 ms), then a short low-pass (~35 ms).
        // Coefficients account for varying loop intervals without busy waits.
        const float dt = static_cast<float>(elapsed);
        _baseline += (dt / (600.0f + dt)) * (static_cast<float>(_raw) - _baseline);
        _filtered += (dt / (35.0f + dt)) * ((static_cast<float>(_raw) - _baseline) - _filtered);
        const float decay = 1500.0f / (1500.0f + dt);
        _high *= decay;
        _low *= decay;
        if (_filtered > _high) _high = _filtered;
        if (_filtered < _low) _low = _filtered;
        _amplitude = _high - _low;
        if (_amplitude < _minimumAmplitude) {
            _valid = false;
            _bpm = 0;
            _consistent = 0;
            _haveCandidate = false;
        }

        const float threshold = fmaxf(_minimumAmplitude * 0.30f, _amplitude * 0.30f);
        if (_filtered < threshold * 0.20f) _armed = true;
        // Reject startup, DC/small-noise signals, and overly rapid crossings.
        if (static_cast<uint32_t>(now - _startedAt) < 1000U ||
            _amplitude < _minimumAmplitude || !_armed || _filtered <= threshold) return;
        _armed = false;
        if (_haveCandidate && static_cast<uint32_t>(now - _lastCandidateAt) < 250U) return;

        _beat = true;
        if (_haveCandidate) {
            const uint32_t interval = now - _lastCandidateAt;
            if (interval >= 300U && interval <= 2000U) {
                // Two similar intervals (three candidate peaks) are required.
                const bool consistent = _previousInterval == 0 ||
                    (static_cast<uint64_t>(interval) * 100U >= static_cast<uint64_t>(_previousInterval) * 70U &&
                     static_cast<uint64_t>(interval) * 100U <= static_cast<uint64_t>(_previousInterval) * 140U);
                if (consistent) {
                    if (_consistent < 3) ++_consistent;
                } else {
                    _consistent = 1;
                    _valid = false;
                    _bpm = 0;
                }
                _previousInterval = interval;
                if (_consistent >= 2) {
                    const float estimate = 60000.0f / static_cast<float>(interval);
                    _bpm = _valid ? _bpm * 0.75f + estimate * 0.25f : estimate;
                    _valid = true;
                }
            } else {
                _consistent = 0;
                _previousInterval = 0;
                _bpm = 0;
                _valid = false;
            }
        }
        _haveCandidate = true;
        _lastCandidateAt = now;
    }

    int raw() const { return _raw; }
    float acSignal() const { return _filtered; }
    float amplitude() const { return _amplitude; }
    bool beatDetected() const { return _beat; }
    bool signalAvailable() const { return _valid && _amplitude >= _minimumAmplitude; }
    float bpm() const { return signalAvailable() ? _bpm : 0.0f; }

private:
    int sample() const {
        int value = analogRead(_pin);
        if (value < 0) value = 0;
        if (value > _adcMax) value = _adcMax;
        return static_cast<int>((static_cast<uint32_t>(value) * 1023U + _adcMax / 2U) / _adcMax);
    }
    void resetSignal(int value, uint32_t now) {
        _raw = value;
        _baseline = static_cast<float>(value);
        _filtered = _high = _low = _amplitude = _bpm = 0;
        _armed = true;
        _beat = _valid = _haveCandidate = false;
        _consistent = 0;
        _previousInterval = 0;
        _startedAt = _sampleAt = _lastCandidateAt = now;
    }
    uint8_t _pin;
    uint16_t _adcMax;
    float _minimumAmplitude;
    bool _begun;
    int _raw;
    float _baseline, _filtered, _high, _low, _amplitude, _bpm;
    bool _armed, _beat, _valid, _haveCandidate;
    uint8_t _consistent;
    uint32_t _startedAt, _sampleAt, _lastCandidateAt, _previousInterval;
};

#endif
