import { NBT_TAG } from '../datatypes/Tag';

export function getTagId(tag: NBT_TAG<unknown>): number {
  return Object.getPrototypeOf(tag).constructor.id;
}
