import { BufWrapper, BufWrapperPlugins } from '@minecraft-js/bufwrapper';
import { NBT_TAG, TagType } from './Tag';

export class NBT_Int extends NBT_TAG<number> {
  public static id = TagType.Int;

  public write(
    buf: BufWrapper<BufWrapperPlugins>,
    payload?: number
  ): BufWrapper<BufWrapperPlugins> {
    this.payload = payload ?? this.payload;
    buf.writeBytes([NBT_Int.id]);

    if (!this.isNameless) {
      buf.writeShort(this.name.length);
      buf.writeBytes(Buffer.from(this.name));
    }

    buf.writeInt(this.payload);

    return buf;
  }

  public read(buf: BufWrapper): number {
    this.payload = buf.readInt();
    return this.payload;
  }
}
