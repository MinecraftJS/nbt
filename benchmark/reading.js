const { Suite } = require('benchmark');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const { parseNBT } = require('../dist');

function getFile(file) {
  return readFileSync(join(__dirname, 'data', file));
}

const uncompressed = getFile('uncompressed.nbt');

new Suite()
  .add('Reading | Uncompressed', () => {
    parseNBT(uncompressed);
  })
  .on('complete', (event) => {
    console.log(event.target.toString());
  })
  .run();

const gzip = getFile('gzip.nbt');

new Suite()
  .add('Reading | Gzip', () => {
    parseNBT(gzip);
  })
  .on('complete', (event) => {
    console.log(event.target.toString());
  })
  .run();

const zlib = getFile('zlib.nbt');

new Suite()
  .add('Reading | Zlib', () => {
    parseNBT(zlib);
  })
  .on('complete', (event) => {
    console.log(event.target.toString());
  })
  .run();
