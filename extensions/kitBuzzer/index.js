const extension = formatMessage => ({
    name: formatMessage({id: 'kitBuzzer.name', default: "Active / Passive Buzzer"}),
    description: formatMessage({id: 'kitBuzzer.description', default: "Blocks for Active / Passive Buzzer on Arduino / ESP32."}),
    extensionId: "kitBuzzer",
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
