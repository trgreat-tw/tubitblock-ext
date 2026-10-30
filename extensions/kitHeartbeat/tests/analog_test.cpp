#include "TuKitHeartbeat.h"
#include "TuKitTemperature.h"
#include <assert.h>
#include <stdio.h>
#include <math.h>

static int adcValue = 512;
static int digitalValue = HIGH;
static uint32_t nowMs = 0;
void pinMode(uint8_t, uint8_t) {}
int analogRead(uint8_t) { return adcValue; }
int digitalRead(uint8_t) { return digitalValue; }
unsigned long millis() { return nowMs; }

static void temperatureTests() {
    TuKitTemperature temperature;
    assert(temperature.raw() == 0);
    assert(isnan(temperature.celsius()));
    temperature.begin(0, 2, false, 1023);
    adcValue = 512;
    assert(temperature.raw() == 512);
    assert(fabsf(temperature.celsius() - 25.0f) < 0.1f);
    adcValue = 256;
    assert(temperature.celsius(true) > 25.0f);
    assert(temperature.celsius(false) < 25.0f);
    adcValue = 0;
    assert(isnan(temperature.celsius()));
    adcValue = 1023;
    assert(isnan(temperature.celsius()));
    digitalValue = HIGH;
    assert(temperature.thresholdReached());
    temperature.begin(0, 2, true, 4095);
    assert(!temperature.thresholdReached());
    digitalValue = LOW;
    assert(temperature.thresholdReached());
    adcValue = 2048;
    assert(temperature.raw() == 512);
    assert(fabsf(temperature.celsius() - 25.0f) < 0.1f);
    temperature.configure(10000.0f, 0, 10000.0f, 25.0f);
    assert(isnan(temperature.celsius()));
    temperature.begin(0, -1, false, 1023);
    assert(!temperature.thresholdReached());
}

static void runWave(TuKitHeartbeat &heart, unsigned duration, unsigned period, int amplitude) {
    const uint32_t origin = nowMs;
    for (unsigned elapsed = 10; elapsed <= duration; elapsed += 10) {
        nowMs = origin + elapsed;
        const double phase = static_cast<double>(elapsed) * 6.283185307179586 / period;
        adcValue = static_cast<int>(512.0 + amplitude * sin(phase));
        heart.update();
    }
}

static void heartbeatTests() {
    for (unsigned period = 500; period <= 1000; period += 500) {
        nowMs = 0;
        adcValue = 512;
        TuKitHeartbeat heart;
        heart.begin(0, 1023);
        runWave(heart, 12000, period, 50);
        assert(heart.signalAvailable());
        assert(fabsf(heart.bpm() - 60000.0f / period) < 3.0f);
        assert(heart.amplitude() > 12.0f);
        const float bpm = heart.bpm();
        assert(heart.bpm() == bpm); // Accessors never sample or clear state.
        const uint32_t origin = nowMs;
        for (unsigned elapsed = 10; elapsed <= 5000; elapsed += 10) {
            nowMs = origin + elapsed;
            adcValue = 512;
            heart.update();
        }
        assert(heart.bpm() == 0 && !heart.signalAvailable());
    }
    nowMs = 0;
    adcValue = 512;
    TuKitHeartbeat quiet;
    quiet.begin(0, 1023);
    for (unsigned t = 10; t <= 10000; t += 10) {
        nowMs = t;
        adcValue = 512;
        quiet.update();
        assert(!quiet.beatDetected());
        assert(quiet.bpm() == 0 && !quiet.signalAvailable());
    }
    for (unsigned t = 10010; t <= 20000; t += 10) {
        nowMs = t;
        adcValue = (t / 10) % 2 == 0 ? 514 : 510;
        quiet.update();
        assert(!quiet.beatDetected());
        assert(quiet.bpm() == 0);
    }
    // Saturation must clear an established estimate.
    nowMs = 0;
    adcValue = 512;
    TuKitHeartbeat saturation;
    saturation.begin(0, 1023);
    runWave(saturation, 10000, 1000, 50);
    assert(saturation.signalAvailable());
    nowMs += 10;
    adcValue = 1023;
    saturation.update();
    assert(saturation.bpm() == 0 && !saturation.beatDetected());
    // Unsigned time arithmetic across millis rollover.
    nowMs = UINT32_MAX - 1500U;
    adcValue = 512;
    TuKitHeartbeat rollover;
    rollover.begin(0, 1023);
    runWave(rollover, 12000, 1000, 50);
    assert(rollover.signalAvailable());
    assert(fabsf(rollover.bpm() - 60.0f) < 3.0f);
    // A long gap in update clears old signal confidence.
    nowMs += 1000;
    rollover.update();
    assert(rollover.bpm() == 0);
    // Native 12-bit ADC normalizes to the same data scale.
    nowMs = 0;
    adcValue = 2048;
    TuKitHeartbeat twelve;
    twelve.begin(15, 4095);
    assert(twelve.raw() == 512);
}

int main() {
    temperatureTests();
    heartbeatTests();
    puts("PASS: NTC formulas/endpoints/calibration/ADC normalization/DO; pulse 60 and 120 BPM/DC/noise/dropout/saturation/rollover.");
    return 0;
}
