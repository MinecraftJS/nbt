import { BufWrapper, BufWrapperPlugins } from '@minecraft-js/bufwrapper';
import { tags } from '..';
import { getTagId } from '../utils/getTagId';
import { NBT_TAG, TagType } from './Tag';

export class NBT_List extends NBT_TAG<NBT_TAG<unknown>[]> {
  public static id = TagType.List;

  public write(
    buf: BufWrapper<BufWrapperPlugins>,
    payload?: NBT_TAG<unknown>[]
  ): BufWrapper<BufWrapperPlugins> {
    this.payload = payload ?? this.payload;

    const tag0Id = getTagId(this.payload[0]);
    if (!this.payload.every((v) => v.isNameless && getTagId(v) === tag0Id))
      throw new Error(
        'Inside a NBT_List, all elements must be the same type and be nameless'
      );

    buf.writeBytes([NBT_List.id]);

    if (!this.isNameless) {
      buf.writeShort(this.name.length);
      buf.writeBytes(Buffer.from(this.name));
    }

    buf.writeBytes([tag0Id]);
    buf.writeInt(this.payload.length);
    for (const tag of this.payload) tag.write(buf);

    return buf;
  }

  public read(buf: BufWrapper): NBT_TAG<unknown>[] {
    const id = buf.readBytes(1)[0];
    const length = buf.readInt();

    const TagConstructor = tags.find((t) => t.id === id);
    if (!TagConstructor) throw new Error(`Unknown tag id ${id}`);

    this.payload = [];

    for (let i = 0; i < length; i++) {
      const tag = new TagConstructor();
      tag.read(buf);

      this.payload.push(tag);
    }

    return this.payload;
  }
}
