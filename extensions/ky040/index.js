const extension = formatMessage => ({
    name: formatMessage({id: 'ky040.name', default: "Rotary Encoder"}),
    description: formatMessage({id: 'ky040.description', default: "Blocks for Rotary Encoder on Arduino / ESP32."}),
    extensionId: "ky040",
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
    helpLink: "https://github.com/trgreat-tw/tubitblock-ext",
});
module.exports = extension;
