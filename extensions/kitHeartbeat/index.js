const extension = formatMessage => ({
    name: formatMessage({id: 'kitHeartbeat.name', default: "Finger Pulse Sensor"}),
    description: formatMessage({id: 'kitHeartbeat.description', default: "Blocks for Finger Pulse Sensor on Arduino / ESP32."}),
    extensionId: "kitHeartbeat",
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
    helpLink: "https://sensorkit.joy-it.net/en/sensors/ky-039",
});
module.exports = extension;
