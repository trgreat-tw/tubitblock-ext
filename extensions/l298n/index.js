const l298n = formatMessage => ({
    name: formatMessage({
        id: 'l298n.name',
        default: 'Motor Control'
    }),
    extensionId: 'l298n',
    version: '2.0.1',
    supportDevice: ['arduinoUno', 'arduinoNano', 'arduinoLeonardo',
        'arduinoMega2560', 'arduinoEsp8266'],
    author: 'Liang',
    iconURL: `assets/motorControl.png`,
    description: formatMessage({
        id: 'l298n.description',
        default: 'Universal two-pin DC motor control using MA and MB.'
    }),
    featured: true,
    blocks: 'blocks.js',
    generator: 'generator.js',
    toolbox: 'toolbox.js',
    translations: 'translations.js',
    library: 'lib',
    official: true,
    tags: ['actuator'],
    helpLink: 'https://wiki.openblock.cc'
});

module.exports = l298n;
