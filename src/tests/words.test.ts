import { expect, test } from 'bun:test'
import { getRandomWords } from '../utils/words'

test('getRandomWords returns the specified number of words', () => {
  const randomWords = getRandomWords(5)
  const wordCount = randomWords.split('-').length
  expect(wordCount).toBe(5) // Assert that the number of words in the returned string is 5
})
