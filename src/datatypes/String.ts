import { BufWrapper } from '@minecraft-js/bufwrapper';
import { NBT_TAG, TagType } from './Tag';

export class NBT_String extends NBT_TAG<string> {
  public static id = TagType.String;

  public write(buf: BufWrapper, payload?: string): BufWrapper {
    this.payload = payload ?? this.payload;
    buf.writeBytes([NBT_String.id]);

    if (!this.isNameless) {
      buf.writeShort(this.name.length);
      buf.writeBytes(Buffer.from(this.name));
    }

    buf.writeShort(this.name.length);
    buf.writeBytes(Buffer.from(this.name));

    return buf;
  }

  public read(buf: BufWrapper): string {
    const length = buf.readShort();
    this.payload = buf.readBytes(length).toString();
    return this.payload;
  }
}
