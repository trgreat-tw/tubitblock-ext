const extension = formatMessage => ({
    name: formatMessage({id: 'kitLine.name', default: "Infrared Line Sensor"}),
    description: formatMessage({id: 'kitLine.description', default: "Blocks for Infrared Line Sensor on Arduino / ESP32."}),
    extensionId: "kitLine",
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
    tags: ["sensor"],
    helpLink: "https://sensorkit.joy-it.net/en/sensors/ky-033",
    library: "lib",
});
module.exports = extension;
