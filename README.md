# nbt

![GitHub Workflow Status](https://img.shields.io/github/workflow/status/MinecraftJS/nbt/Build?style=for-the-badge)
![GitHub](https://img.shields.io/github/license/MinecraftJS/nbt?style=for-the-badge)
![npm (scoped)](https://img.shields.io/npm/v/@minecraft-js/nbt?style=for-the-badge)

Read and write NBT files. Also supports Zlib and Gzip

# Documentation

## Installation

Install the package:

```bash
$ npm install @minecraft-js/nbt
```

And then import it in your JavaScript/TypeScript file

```ts
const { parseNBT, writeNBT } = require('@minecraft-js/nbt'); // CommonJS

import { parseNBT, writeNBT } from '@minecraft-js/nbt'; // ES6
```

## Parsing

No need to specify the compression if the file is compressed. The writer will figure it out by itself.

Note: _Here I got the data by reading a file but you can get it whatever you want as long as you provide a valid buffer with valid NBT data inside._

```js
import { readFileSync } from 'node:fs';

const buffer = readFileSync('myFile.nbt');
const parsed = parseNBT(buffer);
```

## Writing

To write an NBT file you must pass a `NBT_Compound` instance to the write function.

```js
import { writeFileSync } from 'node:fs';

const buffer = writeNBT(compound);
writeFileSync('myFile.nbt', buffer);
```

# Benchmark

Data used: [bigtest.nbt](https://wiki.vg/NBT#bigtest.nbt)

Computer specs: Ryzen 5 3600 - 16GB at 2100MHz

```
--- Reading benchmarks ---
Reading | Uncompressed x 587,802 ops/sec ±0.47% (96 runs sampled)
Reading | Gzip x 15,892 ops/sec ±0.36% (90 runs sampled)
Reading | Zlib x 83,879 ops/sec ±2.72% (84 runs sampled)

--- Writing benchmarks ---
Reading | Uncompressed x 305,369 ops/sec ±0.57% (96 runs sampled)
Reading | Gzip x 62,383 ops/sec ±1.14% (92 runs sampled)
Reading | Zlib x 63,816 ops/sec ±0.67% (89 runs sampled)
```
