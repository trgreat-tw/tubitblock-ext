#include <Arduino.h>
#include <esp_arduino_version.h>
#include <PS4ControllerReconnect.h>
auto& pad = PS4R;
const char* backend = "PS4ControllerReconnect 1.1.1-r4";

// Empty string uses the ESP32's factory Bluetooth MAC. For a custom address,
// use the HOST address already stored in the controller, not the controller MAC.
const char* requestedMac = "";
volatile uint32_t packetCount = 0, connectedCallbacks = 0, disconnectedCallbacks = 0;
bool initialized = false, previousConnected = false;
uint32_t lastStatus = 0, lastPackets = 0, reconnects = 0, disconnectedAt = 0;

// Keep Bluetooth callbacks short; print only from loop().
void inputReceived() { ++packetCount; }
void connectedEvent() { ++connectedCallbacks; }
void disconnectedEvent() { ++disconnectedCallbacks; }

void setup() {
    Serial.begin(115200);
    delay(200);
    Serial.printf("META backend=%s core=%s chip=%s requested_mac=%s\n", backend,
                  ESP_ARDUINO_VERSION_STR, ESP.getChipModel(), *requestedMac ? requestedMac : "factory");
    pad.attach(inputReceived);
    pad.attachOnConnect(connectedEvent);
    pad.attachOnDisconnect(disconnectedEvent);
    pad.setClearBondsOnStart(true);
    initialized = *requestedMac ? pad.begin(requestedMac) : pad.begin();
    Serial.printf("INIT %s actual_bt_mac=%s\n", initialized ? "OK" : "FAILED", pad.getAddress().c_str());
    Serial.println("Keep ESP32 powered. Connect once, turn the controller off, then press PS to reconnect.");
}

void loop() {
    const uint32_t now = millis();
    const bool connected = initialized && pad.isConnected();
    if (connected != previousConnected) {
        if (connected) {
            ++reconnects;
            Serial.printf("EVENT CONNECTED ms=%lu attempt=%lu wait_ms=%lu\n", (unsigned long)now,
                          (unsigned long)reconnects, (unsigned long)(now-disconnectedAt));
        } else {
            disconnectedAt = now;
            Serial.printf("EVENT DISCONNECTED ms=%lu\n", (unsigned long)now);
        }
        previousConnected = connected;
    }
    if (now-lastStatus >= 1000) {
        lastStatus = now;
        const uint32_t count = packetCount;
        Serial.printf("STATUS ms=%lu init=%u connected=%u packets=%lu new_packets=%lu on=%lu off=%lu",
                      (unsigned long)now, initialized, connected, (unsigned long)count,
                      (unsigned long)(count-lastPackets), (unsigned long)connectedCallbacks,
                      (unsigned long)disconnectedCallbacks);
        if (connected) Serial.printf(" LX=%d LY=%d RX=%d RY=%d Cross=%u",
            pad.LStickX(),pad.LStickY(),pad.RStickX(),pad.RStickY(),pad.Cross());
        Serial.println();
        lastPackets = count;
    }
    delay(1);
}
