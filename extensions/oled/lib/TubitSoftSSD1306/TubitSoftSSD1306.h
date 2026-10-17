#ifndef TUBIT_SOFT_SSD1306_H
#define TUBIT_SOFT_SSD1306_H

#include <Adafruit_GFX.h>
#include <Arduino.h>

#ifndef SSD1306_BLACK
#define SSD1306_BLACK 0
#endif
#ifndef SSD1306_WHITE
#define SSD1306_WHITE 1
#endif
#ifndef SSD1306_INVERSE
#define SSD1306_INVERSE 2
#endif
#ifndef SSD1306_EXTERNALVCC
#define SSD1306_EXTERNALVCC 0x01
#endif
#ifndef SSD1306_SWITCHCAPVCC
#define SSD1306_SWITCHCAPVCC 0x02
#endif

class TubitSoftSSD1306 : public Adafruit_GFX {
public:
    TubitSoftSSD1306(uint8_t width, uint8_t height, uint8_t sdaPin,
        uint8_t sclPin, int8_t resetPin = -1);
    ~TubitSoftSSD1306();

    bool begin(uint8_t switchVcc = SSD1306_SWITCHCAPVCC,
        uint8_t i2cAddress = 0, bool reset = true,
        bool periphBegin = true);
    void display();
    void clearDisplay();
    void drawPixel(int16_t x, int16_t y, uint16_t color) override;
    void invertDisplay(bool invert) override;
    void dim(bool dimmed);
    void startscrollright(uint8_t start, uint8_t stop);
    void startscrollleft(uint8_t start, uint8_t stop);
    void startscrolldiagright(uint8_t start, uint8_t stop);
    void startscrolldiagleft(uint8_t start, uint8_t stop);
    void stopscroll();
    void ssd1306_command(uint8_t command);
    bool getPixel(int16_t x, int16_t y) const;
    uint8_t *getBuffer();

private:
    void driveLow(uint8_t pin);
    void releaseLine(uint8_t pin);
    bool beginTransmission(uint8_t controlByte);
    void endTransmission();
    bool writeByte(uint8_t value);
    bool sendCommands(const uint8_t *commands, uint8_t count);
    bool sendData(const uint8_t *data, uint8_t count);

    uint8_t *_buffer;
    uint8_t _sdaPin;
    uint8_t _sclPin;
    int8_t _resetPin;
    uint8_t _i2cAddress;
    uint8_t _vccState;
    uint8_t _contrast;
};

#endif
