const extension = formatMessage => ({
    name: formatMessage({id: 'kitTemperature.name', default: "Temperature Sensor"}),
    description: formatMessage({id: 'kitTemperature.description', default: "Blocks for Temperature Sensor on Arduino / ESP32."}),
    extensionId: "kitTemperature",
    version: "1.2.0",
    supportDevice: ["arduinoUno","arduinoNano","arduinoLeonardo","arduinoMega2560","arduinoEsp32","tubitv2_esp32","tubitv2_arduinoEsp32"],
    author: "TubitBlock Community",
    iconURL: "assets/module.svg",
    featured: true,
    disabled: false,
    blocks: "blocks.js",
    generator: "generator.js",
    toolbox: "toolbox.js",
    translations: "translations.js",
    library: "lib",
    tags: ["sensor"],
    helpLink: "https://sensorkit.joy-it.net/en/sensors/ky-013",
});
module.exports = extension;
