const extension = formatMessage => ({
    name: formatMessage({id: 'kitRGB.name', default: "RGB LED"}),
    description: formatMessage({id: 'kitRGB.description', default: "Blocks for RGB LED on Arduino / ESP32."}),
    extensionId: "kitRGB",
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
    helpLink: "https://sensorkit.joy-it.net/en/",
    library: "lib",
});
module.exports = extension;
