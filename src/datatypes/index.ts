export * from './Byte';
export * from './ByteArray';
export * from './Double';
export * from './Float';
export * from './Int';
export * from './IntArray';
export * from './List';
export * from './Long';
export * from './LongArray';
export * from './Short';
export * from './String';

/**
 * Wondering why Compound is missing?
 * For some reasons if we include
 * Compound here it doesn't add it
 * to the exports and stop here.
 *
 * The workaround I chose is to
 * programmaticaly add the TAG_Compound
 * to the list. It's done in the
 * Compound.ts file.
 */
