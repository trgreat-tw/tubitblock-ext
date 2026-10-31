# DHT Regression

Run from the repository root with Node.js 18 or newer:

```sh
node extensions/dht/tests/generator.cjs
```

Checks setup-time begin() per instance, GPIO12/33, DHT11/21/22, Celsius and
Fahrenheit, multiple IDs, existing graph initialization guards, repeated
registration and bundled library versions. These are generator tests, not
physical sensor or GPIO waveform tests. Failed DHT reads remain floating-point
NaN; converting an invalid value to a byte is not a valid sensor reading.
