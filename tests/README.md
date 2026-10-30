# Source Regression Tests

Run with Node.js 18 or newer from the repository root:

```sh
node tests/sensor-kit-regression.cjs
```

The dependency-free suite checks the 12 sensor modules, 33 visible toolbox
blocks, four product locales, source-relative metadata, initialization placement
and matching IDs, all 66 initialization guards, the new buzzer notes, RGB order,
and the encoder multiplier's legacy default. Graph fixtures model the generator
contract; they do not simulate electronics or Bluetooth stability.

PS4 retains its separate tests under `extensions/PS4/tests`. Actual Arduino CLI
compilation and physical tests are separate from this source suite. Use the
board's existing installed Core rather than upgrading it to run these tests.
