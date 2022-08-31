import { BufWrapper } from '@minecraft-js/bufwrapper';
import { deflateSync, gzipSync } from 'node:zlib';
import { NBT_Compound } from './datatypes/Compound';

export function writeNBT(
  compound: NBT_Compound,
  options?: NBTWriteOptions
): Buffer {
  options = options ?? {};

  const buf = new BufWrapper(null, { oneConcat: true });
  compound.write(buf);

  buf.finish();

  let buffer = buf.buffer;

  switch (options.compression) {
    case 'gzip':
      buffer = gzipSync(buffer);
      break;
    case 'zlib':
      buffer = deflateSync(buffer);
      break;
    case 'uncompressed':
    default:
      break;
  }

  return buffer;
}

export interface NBTWriteOptions {
  compression?: 'uncompressed' | 'zlib' | 'gzip';
}
