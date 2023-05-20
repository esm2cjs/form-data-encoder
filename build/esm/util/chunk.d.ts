export declare const MAX_CHUNK_SIZE = 65536;
/**
 * Chunks given `value` into evenly sized pieces (Same as `MAX_CHUNK_SIZE` bytes per each).
 * Returns `Generator<Uint8Array>` allowing to iterate over these chunks.
 *
 * If value is less then `MAX_CHUNK_SIZE`, it will be returned as-is.
 *
 * If the last chunk is less than `MAX_CHUNK_SIZE`, then returned value will be the size that chunk.
 *
 * @param value A value to chunk into evenly sized pieces
 *
 * @api private
 */
export declare function chunk(value: Uint8Array): Generator<Uint8Array, void>;
