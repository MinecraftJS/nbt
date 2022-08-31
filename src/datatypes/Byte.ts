import { BufWrapper, BufWrapperPlugins } from '@minecraft-js/bufwrapper';
import { NBT_TAG, TagType } from './Tag';

export class NBT_Byte extends NBT_TAG<number> {
  public static id = TagType.Byte;

  public write(
    buf: BufWrapper<BufWrapperPlugins>,
    payload?: number
  ): BufWrapper<BufWrapperPlugins> {
    this.payload = payload ?? this.payload;
    buf.writeBytes([NBT_Byte.id]);

    if (!this.isNameless) {
      buf.writeShort(this.name.length);
      buf.writeBytes(Buffer.from(this.name));
    }

    buf.writeBytes([this.payload]);

    return buf;
  }

  public read(buf: BufWrapper): number {
    this.payload = buf.readBytes(1).readInt8();
    return this.payload;
  }
}
