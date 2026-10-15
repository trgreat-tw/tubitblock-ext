/*
 * EasyBNO055_ESP.cpp
 *
 *  Created on: Nov 14, 2023
 *      Author: hephaestus
 */

#include <EasyBNO055_ESP.h>

static EasyBNO055_ESP *ref = nullptr;
static TaskHandle_t complexHandlerTaskUS = nullptr;
static Adafruit_BNO055 bno = Adafruit_BNO055(55, 0x28, &Wire);
static volatile uint8_t samplesRead = 0;
static volatile bool initializationFinished = false;
static volatile bool sensorDetected = false;
static volatile bool sensorReady = false;
static double staticOffset = 0;

void EasyBNO055Thread(void *param) {
    (void)param;

    sensorDetected = bno.begin();
    initializationFinished = true;

    if (!sensorDetected) {
        Serial.println("EasyBNO055: sensor not found; continuing without BNO055");
        complexHandlerTaskUS = nullptr;
        vTaskDelete(nullptr);
        return;
    }

    double revolutions = 0;
    double lastOrientation = 0;

    while (true) {
        if (ref != nullptr) {
            if (sensorReady && ref->sync != nullptr) {
                ref->sync();
            }

            sensors_event_t orientationData;
            bno.getEvent(&orientationData, Adafruit_BNO055::VECTOR_EULER);
            ref->orientationX = orientationData.orientation.y;
            ref->orientationY = orientationData.orientation.z;

            double orientation = orientationData.orientation.x;
            double difference = orientation - lastOrientation;
            if (abs(difference) > 180) {
                if (orientation > 180) {
                    revolutions -= 1;
                } else {
                    revolutions += 1;
                }
            }

            lastOrientation = orientation;
            ref->orientationZ = (revolutions * 360) + orientation + staticOffset;

            if (samplesRead < 11) {
                samplesRead++;
            }
            if (samplesRead == 10) {
                staticOffset = -ref->orientationZ;
                sensorReady = true;
            }
        }

        // 50 Hz is sufficient for orientation data and leaves I2C time for
        // the TU:bit V2 servo driver and other devices on the same bus.
        vTaskDelay(pdMS_TO_TICKS(20));
    }
}

EasyBNO055_ESP::EasyBNO055_ESP() {
    sync = nullptr;
}

void EasyBNO055_ESP::start(void (*mysync)(void)) {
    sync = mysync;
    ref = this;

    if (complexHandlerTaskUS != nullptr) {
        return;
    }

    samplesRead = 0;
    initializationFinished = false;
    sensorDetected = false;
    sensorReady = false;
    staticOffset = 0;
    orientationX = 0;
    orientationY = 0;
    orientationZ = 0;

    BaseType_t taskCreated = xTaskCreatePinnedToCore(
        EasyBNO055Thread,
        "EasyBNO055",
        8192,
        nullptr,
        2,
        &complexHandlerTaskUS,
        0
    );

    if (taskCreated != pdPASS) {
        complexHandlerTaskUS = nullptr;
        initializationFinished = true;
        Serial.println("EasyBNO055: unable to create sensor task");
        return;
    }

    uint32_t waitStarted = millis();
    while (!initializationFinished && millis() - waitStarted < 3500) {
        vTaskDelay(pdMS_TO_TICKS(10));
    }

    if (!initializationFinished) {
        Serial.println("EasyBNO055: initialization timed out; program will continue");
        return;
    }

    if (!sensorDetected) {
        return;
    }

    waitStarted = millis();
    while (!sensorReady && millis() - waitStarted < 500) {
        vTaskDelay(pdMS_TO_TICKS(10));
    }
}

bool EasyBNO055_ESP::isReady() const {
    return sensorReady;
}
