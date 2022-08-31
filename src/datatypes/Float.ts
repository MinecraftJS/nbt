import { BufWrapper, BufWrapperPlugins } from '@minecraft-js/bufwrapper';
import { NBT_TAG, TagType } from './Tag';

export class NBT_Float extends NBT_TAG<number> {
  public static id = TagType.Float;

  public write(
    buf: BufWrapper<BufWrapperPlugins>,
    payload?: number
  ): BufWrapper<BufWrapperPlugins> {
    this.payload = payload ?? this.payload;
    buf.writeBytes([NBT_Float.id]);

    if (!this.isNameless) {
      buf.writeShort(this.name.length);
      buf.writeBytes(Buffer.from(this.name));
    }

    buf.writeFloat(this.payload);

    return buf;
  }

  public read(buf: BufWrapper): number {
    this.payload = buf.readFloat();
    return this.payload;
  }
}
