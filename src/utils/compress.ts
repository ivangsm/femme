import { deflateSync, inflateSync } from 'zlib'

/**
 * Compresses a string of text using zlib deflate compression.
 * @param text The text to compress.
 * @returns The compressed text as a string.
 */
export function compressText(text: string): string {
  return deflateSync(Buffer.from(text)).toString('binary')
}

/**
 * Decompresses a string of text that has been compressed using zlib deflate compression.
 * @param compressedText The compressed text to decompress.
 * @returns The decompressed text as a string.
 */
export function decompressText(compressedText: string | null): string {
  return compressedText ? inflateSync(Buffer.from(compressedText, 'binary')).toString() : ''
}
