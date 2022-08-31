import { BufWrapper } from '@minecraft-js/bufwrapper';
import { NBT_TAG, TagType } from './Tag';

export class NBT_Double extends NBT_TAG<number> {
  public static id = TagType.Double;

  public write(buf: BufWrapper, payload?: number): BufWrapper {
    this.payload = payload ?? this.payload;
    buf.writeBytes([NBT_Double.id]);

    if (!this.isNameless) {
      buf.writeShort(this.name.length);
      buf.writeBytes(Buffer.from(this.name));
    }

    const buffer = Buffer.alloc(8);
    buffer.writeDoubleBE(this.payload);
    buf.writeBytes(buffer);

    return buf;
  }

  public read(buf: BufWrapper): number {
    this.payload = buf.readBytes(8).readDoubleBE();
    return this.payload;
  }
}
