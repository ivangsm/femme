import { deflateSync, inflateSync } from 'zlib'

/**
 * Compresses a string of text using zlib deflate compression.
 * @param text The text to compress.
 * @returns The compressed text as a string.
 */
export function compressText(text: string): string {
  const compressed = deflateSync(Buffer.from(text))
  return compressed.toString('binary')
}

/**
 * Decompresses a string of text that has been compressed using zlib deflate compression.
 * @param compressedText The compressed text to decompress.
 * @returns The decompressed text as a string.
 */
export function decompressText(compressedText: string | null): string {
  if (compressedText === null) {
    return ''
  }
  const buffer = Buffer.from(compressedText, 'binary')
  return inflateSync(buffer).toString()
}
