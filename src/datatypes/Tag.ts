import { BufWrapper } from '@minecraft-js/bufwrapper';
import { getTagId } from '../utils/getTagId';

export class NBT_TAG<T> {
  public static id: TagType;

  public name?: string;
  public payload: T;

  public constructor(name?: string) {
    this.name = name;
  }

  public write(buf: BufWrapper, payload?: T): BufWrapper {
    throw new Error(
      `${
        Object.getPrototypeOf(this).constructor.name
      }#write is not implemented!`
    );
  }

  public read(buf: BufWrapper): T {
    throw new Error(
      `${Object.getPrototypeOf(this).constructor.name}#read is not implemented!`
    );
  }

  public get isNameless(): boolean {
    return typeof this.name !== 'string';
  }

  public toJSON() {
    return {
      name: this.name,
      type: getTagId(this),
      payload: this.payload,
    };
  }
}

export enum TagType {
  Byte = 1,
  Short = 2,
  Int = 3,
  Long = 4,
  Float = 5,
  Double = 6,
  ByteArray = 7,
  String = 8,
  List = 9,
  Compound = 10,
  IntArray = 11,
  LongArray = 12,
}
