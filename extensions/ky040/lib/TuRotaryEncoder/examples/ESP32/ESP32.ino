#include <TuRotaryEncoder.h>

// Classic ESP32: + -> 3V3, GND -> GND, CLK -> 23, DT -> 15, SW -> 12.
// ESP32-C3/S3 and other boards need GPIOs available on that specific board.
TuRotaryEncoder encoder;
long lastPosition = 0;

void setup() {
    Serial.begin(115200);
    encoder.begin(23, 15, 12, 4);
    // If the observed direction is reversed, use encoder.setReversed(true).
    Serial.println("KY-040 ready");
}

void loop() {
    encoder.update();
    const long current = encoder.position();
    if (current != lastPosition) {
        lastPosition = current;
        Serial.print("Position: ");
        Serial.println(current);
    }
    if (encoder.justPressed()) Serial.println("Button pressed");
    if (encoder.justReleased()) Serial.println("Button released");
    // Keep loop fast; delay() and other blocking work can lose rotary steps.
}
