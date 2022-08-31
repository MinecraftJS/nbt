import { BufWrapper, BufWrapperPlugins } from '@minecraft-js/bufwrapper';
import { NBT_TAG, TagType } from './Tag';

export class NBT_Short extends NBT_TAG<number> {
  public static id = TagType.Short;

  public write(
    buf: BufWrapper<BufWrapperPlugins>,
    payload?: number
  ): BufWrapper<BufWrapperPlugins> {
    this.payload = payload ?? this.payload;
    buf.writeBytes([NBT_Short.id]);

    if (!this.isNameless) {
      buf.writeShort(this.name.length);
      buf.writeBytes(Buffer.from(this.name));
    }

    buf.writeShort(this.payload);

    return buf;
  }

  public read(buf: BufWrapper): number {
    this.payload = buf.readShort();
    return this.payload;
  }
}
