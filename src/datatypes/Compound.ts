import { BufWrapper } from '@minecraft-js/bufwrapper';
import { tags } from '..';
import { NBT_TAG, TagType } from './Tag';

export class NBT_Compound extends NBT_TAG<NBT_TAG<any>[]> {
  public static id = TagType.Compound;

  public write(buf: BufWrapper, payload?: NBT_TAG<any>[]): BufWrapper {
    this.payload = payload ?? this.payload;
    buf.writeBytes([NBT_Compound.id]);

    if (!this.isNameless) {
      buf.writeShort(this.name.length);
      buf.writeBytes(Buffer.from(this.name));
    }

    for (const tag of this.payload) tag.write(buf);

    return buf;
  }

  public read(buf: BufWrapper): any {
    this.payload = [];

    while (true) {
      const id = buf.readBytes(1)[0];
      if (id === 0x00 || !id) break;

      const TagConstructor = tags.find((t) => t.id === id);
      if (!TagConstructor) throw new Error(`Unknown tag id ${id}`);

      const tag = new TagConstructor(this.readTagName(buf));
      tag.read(buf);
      this.payload.push(tag);
    }

    return this.payload;
  }

  private readTagName(buf: BufWrapper): string {
    const length = buf.readShort();
    return buf.readBytes(length).toString();
  }
}

// See src/datatypes/index.ts to know why
tags.push(NBT_Compound);
tags.sort((a, b) => (a.id > b.id ? 1 : -1));
