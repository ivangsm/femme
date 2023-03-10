import { expect, test } from 'bun:test'
import { compressText, decompressText } from '../utils/compress'

test('compressText and decompressText should return the original text', () => {
  const originalText = 'hello world'
  const compressedText = compressText(originalText)
  const decompressedText = decompressText(compressedText)
  expect(decompressedText).toEqual(originalText)
})

test('compressText should return a string', () => {
  const originalText = 'hello world'
  const compressedText = compressText(originalText)
  expect(typeof compressedText).toBe('string')
})

test('decompressText should handle null input', () => {
  const compressedText = null
  const decompressedText = decompressText(compressedText)
  expect(decompressedText).toEqual('')
})

test('decompressText should handle invalid input', () => {
  const compressedText = 'invalid compressed text'
  expect(() => {
    decompressText(compressedText)
  }).toThrow()
})
