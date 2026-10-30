#ifndef KIT_TEST_ARDUINO_H
#define KIT_TEST_ARDUINO_H
#include <stdint.h>
#define HIGH 1
#define LOW 0
#define INPUT 0
void pinMode(uint8_t pin, uint8_t mode);
int analogRead(uint8_t pin);
int digitalRead(uint8_t pin);
unsigned long millis();
#endif
