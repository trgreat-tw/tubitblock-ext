/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerGenerators (Blockly) {
    Blockly.Arduino.eitghtTimesEightMatirxDisplay_init = function (block) {
        Blockly.Arduino.includes_.eitghtTimesEightMatirxDisplay_init = `#include <SPI.h>\n#include <Adafruit_GFX.h>\n#include <Max72xxPanel.h>`;
        if (Blockly.Device.getDeviceId() === 'arduinoNano') {
            const din = block.getFieldValue('DIN') || '12';
            const cs = block.getFieldValue('CS') || '10';
            const clk = block.getFieldValue('CLK') || '11';
            Blockly.Arduino.definitions_.eitghtTimesEightMatirxDisplay_init = `Max72xxPanel eitghtTimesEightMatrix = Max72xxPanel(${din}, ${cs}, ${clk}, 1, 1);`;
        } else {
            const cs = block.getFieldValue('CS') || '2';
            Blockly.Arduino.definitions_.eitghtTimesEightMatirxDisplay_init = `Max72xxPanel eitghtTimesEightMatrix = Max72xxPanel(${cs}, 1, 1);`;
        }

        return ``;
    };

    Blockly.Arduino.eitghtTimesEightMatirxDisplay_drawPattern = function (block) {
        // The matrix field stores pixels row by row, from top-left to bottom-right.
        const matrix = String(block.getFieldValue('MATRIX') || '').replace(/[^01]/g, '').padEnd(64, '0').slice(0, 64);
        const rows = [];
        for (let y = 0; y < 8; y++) {
            rows.push(`0b${matrix.slice(y * 8, (y + 1) * 8)}`);
        }

        // The block scope lets multiple patterns reuse the same local array name.
        return `{\n  const uint8_t matrixPattern[8] = {${rows.join(', ')}};\n` +
            `  eitghtTimesEightMatrix.fillScreen(LOW);\n` +
            `  for (uint8_t y = 0; y < 8; y++) {\n` +
            `    for (uint8_t x = 0; x < 8; x++) {\n` +
            `      if (matrixPattern[y] & (0x80 >> x)) {\n` +
            `        eitghtTimesEightMatrix.drawPixel(x, y, HIGH);\n` +
            `      }\n` +
            `    }\n` +
            `  }\n` +
            `  eitghtTimesEightMatrix.write();\n}\n`;
    };

    Blockly.Arduino.eitghtTimesEightMatirxDisplay_drawPixel = function (block) {
        const x = Blockly.Arduino.valueToCode(block, 'X', Blockly.Arduino.ORDER_ATOMIC);
        const y = Blockly.Arduino.valueToCode(block, 'Y', Blockly.Arduino.ORDER_ATOMIC);
        const colour = block.getFieldValue('COLOUR');

        return `eitghtTimesEightMatrix.drawPixel(${x}, ${y}, ${colour});\neitghtTimesEightMatrix.write();\n`;
    };

    Blockly.Arduino.eitghtTimesEightMatirxDisplay_drawLine = function (block) {
        const x0 = Blockly.Arduino.valueToCode(block, 'X0', Blockly.Arduino.ORDER_ATOMIC);
        const y0 = Blockly.Arduino.valueToCode(block, 'Y0', Blockly.Arduino.ORDER_ATOMIC);
        const x1 = Blockly.Arduino.valueToCode(block, 'X1', Blockly.Arduino.ORDER_ATOMIC);
        const y1 = Blockly.Arduino.valueToCode(block, 'Y1', Blockly.Arduino.ORDER_ATOMIC);
        const colour = block.getFieldValue('COLOUR');

        return `eitghtTimesEightMatrix.drawLine(${x0}, ${y0}, ${x1}, ${y1},${colour});\neitghtTimesEightMatrix.write();\n`;
    };

    Blockly.Arduino.eitghtTimesEightMatirxDisplay_showChar = function (block) {
        const text = Blockly.Arduino.valueToCode(block, 'TEXT', Blockly.Arduino.ORDER_ATOMIC).slice(1, -1);
        const colour = block.getFieldValue('COLOUR');

        return `eitghtTimesEightMatrix.drawChar(0, 0, '${text}', ${colour}, !${colour}, 1);\neitghtTimesEightMatrix.write();\n`;
    };

    Blockly.Arduino.eitghtTimesEightMatirxDisplay_showNumber = function (block) {
        const number = Blockly.Arduino.valueToCode(block, 'NUMBER', Blockly.Arduino.ORDER_ATOMIC);
        const colour = block.getFieldValue('COLOUR');

        return `eitghtTimesEightMatrix.drawChar(0, 0, ${number} + '0', ${colour}, !${colour}, 1);\neitghtTimesEightMatrix.write();\n`;
    };

    Blockly.Arduino.eitghtTimesEightMatirxDisplay_fill = function (block) {
        const colour = block.getFieldValue('COLOUR');

        return `eitghtTimesEightMatrix.fillScreen(${colour});\neitghtTimesEightMatrix.write();\n`;
    };

    Blockly.Arduino.eitghtTimesEightMatirxDisplay_refresh = function () {
        return `eitghtTimesEightMatrix.write();\n`;
    };

    Blockly.Arduino.eitghtTimesEightMatirxDisplay_setBrightness = function (block) {
        const brt = Blockly.Arduino.valueToCode(block, 'BRT', Blockly.Arduino.ORDER_ATOMIC);

        return `eitghtTimesEightMatrix.setIntensity(${brt});\n`;
    };

    Blockly.Arduino.eitghtTimesEightMatirxDisplay_brightnessNumber = function (block) {
        const num = block.getFieldValue('NUM');

        return [`${num}`, Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino.eitghtTimesEightMatirxDisplay_setRotation = function (block) {
        const rotation = block.getFieldValue('ROTATION');

        return `eitghtTimesEightMatrix.setRotation(${rotation});\n`;
    };

    return Blockly;
}

exports = registerGenerators;
