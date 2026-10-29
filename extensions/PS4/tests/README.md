# PS4 1.3.0 regression tests

Run with Node.js 20+, `jszip` and `playwright-core`. Set
`TUBITBLOCK_TEST_REPO` to the local TubitBlock Web checkout containing
`web/15.bundle.js`. Dependencies can be installed with `npm install` here,
or selected with `TUBITBLOCK_TEST_NODE_MODULES`.

Set `TUBITBLOCK_TEST_BROWSER` to an installed Chrome/Edge executable, or
install the matching Playwright Chromium browser in the normal Playwright
cache before running `npm test`. No personal path is embedded in the tests.

The test loads the actual bundled Blockly/Arduino generator and SB3 block
codec. It checks all five obsolete LIB values, XML/SB3 import and resave,
the unchanged controls, native/default and custom MAC generation, and
`setClearBondsOnStart(true)` occurring once before `begin`.
The custom-MAC test uses a synthetic locally administered unicast address.

`test-compile.ps1` compiles the complete block-generated program and the
PS4Connection example using the existing official Espressif Core 3.1.3.
Supply `-Cli` and `-ArduinoData`; optional `-BuildRoot` selects a scratch
directory. It does not install a Core or upload anything to a board.

Generated projects, screenshots, logs and build files stay under `results/`
or the specified build directory and must not be published with the source.
Hardware pairing/reconnection stability is a separate physical test.
