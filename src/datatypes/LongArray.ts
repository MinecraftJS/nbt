import { BufWrapper } from '@minecraft-js/bufwrapper';
import { NBT_TAG, TagType } from './Tag';

export class NBT_LongArray extends NBT_TAG<number[]> {
  public static id = TagType.LongArray;

  public write(buf: BufWrapper, payload?: number[]): BufWrapper {
    this.payload = payload ?? this.payload;
    buf.writeBytes([NBT_LongArray.id]);

    if (!this.isNameless) {
      buf.writeShort(this.name.length);
      buf.writeBytes(Buffer.from(this.name));
    }

    buf.writeInt(this.payload.length);
    for (const int of this.payload) buf.writeLong(int);

    return buf;
  }

  public read(buf: BufWrapper): number[] {
    const length = buf.readInt();

    this.payload = [];
    for (let i = 0; i < length; i++) this.payload.push(buf.readLong());

    return this.payload;
  }
}
