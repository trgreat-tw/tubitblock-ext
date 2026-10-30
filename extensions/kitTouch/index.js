const extension = formatMessage => ({
    name: formatMessage({id: 'kitTouch.name', default: "Touch Sensor"}),
    description: formatMessage({id: 'kitTouch.description', default: "Blocks for Touch Sensor on Arduino / ESP32."}),
    extensionId: "kitTouch",
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
    helpLink: "https://sensorkit.joy-it.net/en/sensors/ky-036",
    library: "lib",
});
module.exports = extension;
