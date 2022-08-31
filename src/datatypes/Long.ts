import { BufWrapper, BufWrapperPlugins } from '@minecraft-js/bufwrapper';
import { getTagId } from '../utils/getTagId';
import { NBT_TAG, TagType } from './Tag';

export class NBT_Long extends NBT_TAG<bigint> {
  public static id = TagType.Long;

  public write(
    buf: BufWrapper<BufWrapperPlugins>,
    payload?: bigint
  ): BufWrapper<BufWrapperPlugins> {
    this.payload = payload ?? this.payload;
    buf.writeBytes([NBT_Long.id]);

    if (!this.isNameless) {
      buf.writeShort(this.name.length);
      buf.writeBytes(Buffer.from(this.name));
    }

    const buffer = Buffer.alloc(16);
    buffer.writeBigInt64BE(this.payload);
    buf.writeBytes(buffer);

    return buf;
  }

  public read(buf: BufWrapper): bigint {
    this.payload = buf.readBytes(8).readBigInt64BE();
    return this.payload;
  }

  public toJSON() {
    return {
      name: this.name,
      payload: this.payload.toString(),
      type: getTagId(this),
    };
  }
}
