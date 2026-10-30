#ifndef TEST_ARDUINO_H
#define TEST_ARDUINO_H
#include <stdint.h>
#define HIGH 1
#define LOW 0
#define INPUT_PULLUP 2
void pinMode(uint8_t pin, uint8_t mode);
int digitalRead(uint8_t pin);
unsigned long millis();
#endif
