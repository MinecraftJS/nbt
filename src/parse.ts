import { BufWrapper } from '@minecraft-js/bufwrapper';
import { gunzipSync, inflateSync } from 'node:zlib';
import { NBT_Compound } from './datatypes/Compound';

export function parseNBT(buffer: Buffer): NBT_Compound {
  if (buffer[0] === 0x1f && buffer[1] === 0x8b)
    // NBT is Gzip'd
    buffer = gunzipSync(buffer);
  else if (buffer[0] === 0x78 && [0x01, 0x9c, 0xda].includes(buffer[1]))
    // NBT is Zlib'd
    buffer = inflateSync(buffer);

  const buf = new BufWrapper(buffer);
  const implicitCompound = new NBT_Compound(undefined);

  return implicitCompound.read(buf)[0];
}
