# PS4 1.3.0

PS4 initialization now uses `PS4ControllerReconnect 1.1.1-r4` exclusively.
The initialization block keeps its existing MAC input and removes the
experimental LIB selector. Existing block opcodes and controls are retained.
Projects containing PS4C, PS4R, PS4RL, PS4RB or DS4 LIB values import into the
same fixed implementation and omit the obsolete field when saved again.

## Pairing behavior

The generator calls `PS4R.setClearBondsOnStart(true)` before `PS4R.begin()`.
On ESP32 initialization, **all stored Classic Bluetooth bonds are removed**;
the library waits for removal completion before accepting connections.
Turning the controller off and reconnecting during the same uninterrupted
boot does not repeat the cleanup. SSP stays enabled. There is no whole-NVS
or Flash erase. Preserve the HOST MAC already used by existing projects;
the all-zero block input means the ESP32's factory Bluetooth address.

The user reported that this cleanup setting is needed for their controller.
That report is not a comprehensive hardware compatibility or stability claim.

## Integration and validation

- Official Espressif Arduino Core stays at 3.1.3.
- Only `lib/PS4ControllerReconnect` is shipped as this extension's runtime
  library. The old PS4Controller and DS4 test libraries are removed here.
- The supplied runtime source and licenses are retained. Portable test
  sources and an editable SB3 example are included; installers, prompts,
  local paths, build output and logs are excluded.
- 31 checks use the real Blockly/Arduino generator and SB3 block codec.
- The complete generated controls program and PS4Connection example compile
  and link on Core 3.1.3 with only PS4ControllerReconnect backend symbols.

Physical pairing, power-cycle reconnects and long-running Bluetooth stability
still require the actual board/controller. The earlier local-only status in
README-PS4R.txt describes creation of the supplied installation package;
repository release and deployment status are tracked by the release notes.

The SB3 example includes its stage backdrop asset so it can be opened in the
complete Web editor, not only decoded by the block codec. The resource package
advances to 2.20.5 for this example fix; the PS4 runtime stays at 1.3.0.
