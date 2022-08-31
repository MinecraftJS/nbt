import { BufWrapper, BufWrapperPlugins } from '@minecraft-js/bufwrapper';
import { NBT_TAG, TagType } from './Tag';

export class NBT_IntArray extends NBT_TAG<number[]> {
  public static id = TagType.IntArray;

  public write(
    buf: BufWrapper<BufWrapperPlugins>,
    payload?: number[]
  ): BufWrapper<BufWrapperPlugins> {
    this.payload = payload ?? this.payload;
    buf.writeBytes([NBT_IntArray.id]);

    if (!this.isNameless) {
      buf.writeShort(this.name.length);
      buf.writeBytes(Buffer.from(this.name));
    }

    buf.writeInt(this.payload.length);
    for (const int of this.payload) buf.writeInt(int);

    return buf;
  }

  public read(buf: BufWrapper): number[] {
    const length = buf.readInt();

    this.payload = [];
    for (let i = 0; i < length; i++) this.payload.push(buf.readInt());

    return this.payload;
  }
}
