const { parseNBT, writeNBT } = require('../dist');
const { readFileSync } = require('node:fs');
const { Suite } = require('benchmark');
const { join } = require('node:path');

const source = readFileSync(join(__dirname, 'data', 'uncompressed.nbt'));
const parsed = parseNBT(source);

new Suite()
  .add('Reading | Uncompressed', () => {
    writeNBT(parsed);
  })
  .on('complete', (event) => {
    console.log(event.target.toString());
  })
  .run();

new Suite()
  .add('Reading | Gzip', () => {
    writeNBT(parsed, { compression: 'gzip' });
  })
  .on('complete', (event) => {
    console.log(event.target.toString());
  })
  .run();

new Suite()
  .add('Reading | Zlib', () => {
    writeNBT(parsed, { compression: 'zlib' });
  })
  .on('complete', (event) => {
    console.log(event.target.toString());
  })
  .run();
