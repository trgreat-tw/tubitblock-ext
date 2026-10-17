#include "TubitSoftSSD1306.h"

#include <stdlib.h>
#include <string.h>

namespace {
const uint8_t commandDisplayOff = 0xAE;
const uint8_t commandDisplayOn = 0xAF;
const uint8_t commandSetDisplayClockDiv = 0xD5;
const uint8_t commandSetMultiplex = 0xA8;
const uint8_t commandSetDisplayOffset = 0xD3;
const uint8_t commandSetStartLine = 0x40;
const uint8_t commandChargePump = 0x8D;
const uint8_t commandMemoryMode = 0x20;
const uint8_t commandSegRemap = 0xA0;
const uint8_t commandComScanDec = 0xC8;
const uint8_t commandSetComPins = 0xDA;
const uint8_t commandSetContrast = 0x81;
const uint8_t commandSetPrecharge = 0xD9;
const uint8_t commandSetVcomDetect = 0xDB;
const uint8_t commandDisplayAllOnResume = 0xA4;
const uint8_t commandNormalDisplay = 0xA6;
const uint8_t commandInvertDisplay = 0xA7;
const uint8_t commandColumnAddress = 0x21;
const uint8_t commandPageAddress = 0x22;
const uint8_t commandRightHorizontalScroll = 0x26;
const uint8_t commandLeftHorizontalScroll = 0x27;
const uint8_t commandVerticalRightScroll = 0x29;
const uint8_t commandVerticalLeftScroll = 0x2A;
const uint8_t commandDeactivateScroll = 0x2E;
const uint8_t commandActivateScroll = 0x2F;
const uint8_t commandSetVerticalScrollArea = 0xA3;
const uint8_t commandControl = 0x00;
const uint8_t dataControl = 0x40;
const uint8_t transferChunkSize = 16;
}

TubitSoftSSD1306::TubitSoftSSD1306(uint8_t width, uint8_t height,
    uint8_t sdaPin, uint8_t sclPin, int8_t resetPin) :
    Adafruit_GFX(width, height),
    _buffer(NULL),
    _sdaPin(sdaPin),
    _sclPin(sclPin),
    _resetPin(resetPin),
    _i2cAddress(0),
    _vccState(SSD1306_SWITCHCAPVCC),
    _contrast(0xCF) {
}

TubitSoftSSD1306::~TubitSoftSSD1306() {
    if (_buffer) free(_buffer);
}

void TubitSoftSSD1306::driveLow(uint8_t pin) {
    digitalWrite(pin, LOW);
    pinMode(pin, OUTPUT);
}

void TubitSoftSSD1306::releaseLine(uint8_t pin) {
    pinMode(pin, INPUT_PULLUP);
}

bool TubitSoftSSD1306::writeByte(uint8_t value) {
    for (uint8_t mask = 0x80; mask; mask >>= 1) {
        if (value & mask) {
            releaseLine(_sdaPin);
        } else {
            driveLow(_sdaPin);
        }
        delayMicroseconds(2);
        releaseLine(_sclPin);
        delayMicroseconds(3);
        driveLow(_sclPin);
    }

    releaseLine(_sdaPin);
    delayMicroseconds(2);
    releaseLine(_sclPin);
    delayMicroseconds(3);
    const bool acknowledged = digitalRead(_sdaPin) == LOW;
    driveLow(_sclPin);
    return acknowledged;
}

bool TubitSoftSSD1306::beginTransmission(uint8_t controlByte) {
    releaseLine(_sdaPin);
    releaseLine(_sclPin);
    delayMicroseconds(3);
    if (digitalRead(_sdaPin) == LOW || digitalRead(_sclPin) == LOW) {
        return false;
    }

    driveLow(_sdaPin);
    delayMicroseconds(3);
    driveLow(_sclPin);

    if (!writeByte(static_cast<uint8_t>(_i2cAddress << 1)) ||
        !writeByte(controlByte)) {
        endTransmission();
        return false;
    }
    return true;
}

void TubitSoftSSD1306::endTransmission() {
    driveLow(_sdaPin);
    delayMicroseconds(2);
    releaseLine(_sclPin);
    delayMicroseconds(3);
    releaseLine(_sdaPin);
    delayMicroseconds(3);
}

bool TubitSoftSSD1306::sendCommands(const uint8_t *commands, uint8_t count) {
    if (!beginTransmission(commandControl)) return false;
    bool ok = true;
    while (count--) {
        if (!writeByte(*commands++)) {
            ok = false;
            break;
        }
    }
    endTransmission();
    return ok;
}

bool TubitSoftSSD1306::sendData(const uint8_t *data, uint8_t count) {
    if (!beginTransmission(dataControl)) return false;
    bool ok = true;
    while (count--) {
        if (!writeByte(*data++)) {
            ok = false;
            break;
        }
    }
    endTransmission();
    return ok;
}

bool TubitSoftSSD1306::begin(uint8_t switchVcc, uint8_t i2cAddress,
    bool reset, bool periphBegin) {
    (void)periphBegin;
    const size_t bufferSize = static_cast<size_t>(WIDTH) *
        static_cast<size_t>((HEIGHT + 7) / 8);
    if (!_buffer) {
        _buffer = static_cast<uint8_t *>(malloc(bufferSize));
        if (!_buffer) return false;
    }
    memset(_buffer, 0, bufferSize);

    _vccState = switchVcc;
    _i2cAddress = i2cAddress ? i2cAddress : ((HEIGHT == 32) ? 0x3C : 0x3D);
    releaseLine(_sdaPin);
    releaseLine(_sclPin);

    if (reset && _resetPin >= 0) {
        pinMode(_resetPin, OUTPUT);
        digitalWrite(_resetPin, HIGH);
        delay(1);
        digitalWrite(_resetPin, LOW);
        delay(10);
        digitalWrite(_resetPin, HIGH);
    }

    const uint8_t comPins = (HEIGHT == 64) ? 0x12 : 0x02;
    if ((WIDTH == 128) && (HEIGHT == 32)) {
        _contrast = 0x8F;
    } else if ((WIDTH == 96) && (HEIGHT == 16)) {
        _contrast = (_vccState == SSD1306_EXTERNALVCC) ? 0x10 : 0xAF;
    } else {
        _contrast = (_vccState == SSD1306_EXTERNALVCC) ? 0x9F : 0xCF;
    }

    const uint8_t initCommands[] = {
        commandDisplayOff,
        commandSetDisplayClockDiv, 0x80,
        commandSetMultiplex, static_cast<uint8_t>(HEIGHT - 1),
        commandSetDisplayOffset, 0x00,
        commandSetStartLine,
        commandChargePump,
        static_cast<uint8_t>(_vccState == SSD1306_EXTERNALVCC ? 0x10 : 0x14),
        commandMemoryMode, 0x00,
        static_cast<uint8_t>(commandSegRemap | 0x01),
        commandComScanDec,
        commandSetComPins, comPins,
        commandSetContrast, _contrast,
        commandSetPrecharge,
        static_cast<uint8_t>(_vccState == SSD1306_EXTERNALVCC ? 0x22 : 0xF1),
        commandSetVcomDetect, 0x40,
        commandDisplayAllOnResume,
        commandNormalDisplay,
        commandDeactivateScroll,
        commandDisplayOn
    };
    return sendCommands(initCommands, sizeof(initCommands));
}

void TubitSoftSSD1306::display() {
    if (!_buffer) return;
    const uint8_t addressCommands[] = {
        commandPageAddress, 0x00,
        static_cast<uint8_t>((HEIGHT + 7) / 8 - 1),
        commandColumnAddress, 0x00,
        static_cast<uint8_t>(WIDTH - 1)
    };
    if (!sendCommands(addressCommands, sizeof(addressCommands))) return;

    size_t remaining = static_cast<size_t>(WIDTH) *
        static_cast<size_t>((HEIGHT + 7) / 8);
    const uint8_t *cursor = _buffer;
    while (remaining) {
        const uint8_t count = remaining > transferChunkSize ?
            transferChunkSize : static_cast<uint8_t>(remaining);
        if (!sendData(cursor, count)) return;
        cursor += count;
        remaining -= count;
    }
}

void TubitSoftSSD1306::clearDisplay() {
    if (!_buffer) return;
    memset(_buffer, 0, static_cast<size_t>(WIDTH) *
        static_cast<size_t>((HEIGHT + 7) / 8));
}

void TubitSoftSSD1306::drawPixel(int16_t x, int16_t y, uint16_t color) {
    if (!_buffer) return;
    if ((x < 0) || (x >= width()) || (y < 0) || (y >= height())) return;

    int16_t temp;
    switch (getRotation()) {
    case 1:
        temp = x;
        x = y;
        y = temp;
        x = WIDTH - x - 1;
        break;
    case 2:
        x = WIDTH - x - 1;
        y = HEIGHT - y - 1;
        break;
    case 3:
        temp = x;
        x = y;
        y = temp;
        y = HEIGHT - y - 1;
        break;
    default:
        break;
    }

    uint8_t &pixelByte = _buffer[x + (y / 8) * WIDTH];
    const uint8_t mask = static_cast<uint8_t>(1U << (y & 7));
    if (color == SSD1306_WHITE) {
        pixelByte |= mask;
    } else if (color == SSD1306_BLACK) {
        pixelByte &= static_cast<uint8_t>(~mask);
    } else if (color == SSD1306_INVERSE) {
        pixelByte ^= mask;
    }
}

bool TubitSoftSSD1306::getPixel(int16_t x, int16_t y) const {
    if (!_buffer || x < 0 || x >= WIDTH || y < 0 || y >= HEIGHT) return false;
    return (_buffer[x + (y / 8) * WIDTH] & (1U << (y & 7))) != 0;
}

uint8_t *TubitSoftSSD1306::getBuffer() {
    return _buffer;
}

void TubitSoftSSD1306::ssd1306_command(uint8_t command) {
    sendCommands(&command, 1);
}

void TubitSoftSSD1306::invertDisplay(bool invert) {
    const uint8_t command = invert ? commandInvertDisplay : commandNormalDisplay;
    sendCommands(&command, 1);
}

void TubitSoftSSD1306::dim(bool dimmed) {
    const uint8_t commands[] = {
        commandSetContrast,
        static_cast<uint8_t>(dimmed ? 0 : _contrast)
    };
    sendCommands(commands, sizeof(commands));
}

void TubitSoftSSD1306::startscrollright(uint8_t start, uint8_t stop) {
    const uint8_t commands[] = {
        commandRightHorizontalScroll, 0x00, start, 0x00, stop, 0x00, 0xFF,
        commandActivateScroll
    };
    sendCommands(commands, sizeof(commands));
}

void TubitSoftSSD1306::startscrollleft(uint8_t start, uint8_t stop) {
    const uint8_t commands[] = {
        commandLeftHorizontalScroll, 0x00, start, 0x00, stop, 0x00, 0xFF,
        commandActivateScroll
    };
    sendCommands(commands, sizeof(commands));
}

void TubitSoftSSD1306::startscrolldiagright(uint8_t start, uint8_t stop) {
    const uint8_t commands[] = {
        commandSetVerticalScrollArea, 0x00, static_cast<uint8_t>(HEIGHT),
        commandVerticalRightScroll, 0x00, start, 0x00, stop, 0x01,
        commandActivateScroll
    };
    sendCommands(commands, sizeof(commands));
}

void TubitSoftSSD1306::startscrolldiagleft(uint8_t start, uint8_t stop) {
    const uint8_t commands[] = {
        commandSetVerticalScrollArea, 0x00, static_cast<uint8_t>(HEIGHT),
        commandVerticalLeftScroll, 0x00, start, 0x00, stop, 0x01,
        commandActivateScroll
    };
    sendCommands(commands, sizeof(commands));
}

void TubitSoftSSD1306::stopscroll() {
    const uint8_t command = commandDeactivateScroll;
    sendCommands(&command, 1);
}
