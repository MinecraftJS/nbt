import { BufWrapper } from '@minecraft-js/bufwrapper';
import { NBT_TAG, TagType } from './Tag';

export class NBT_ByteArray extends NBT_TAG<number[]> {
  public static id = TagType.ByteArray;

  public write(buf: BufWrapper, payload?: number[]): BufWrapper {
    this.payload = payload ?? this.payload;
    buf.writeBytes([NBT_ByteArray.id]);

    if (!this.isNameless) {
      buf.writeShort(this.name.length);
      buf.writeBytes(Buffer.from(this.name));
    }

    buf.writeInt(this.payload.length);
    buf.writeBytes(this.payload);

    return buf;
  }

  public read(buf: BufWrapper): number[] {
    const length = buf.readInt();

    const bytes = buf.readBytes(length);
    this.payload = [...bytes];

    return this.payload;
  }
}
