import * as fs from 'fs'

// Load a list of 4-letter words from a dictionary file
const words: string[] = fs
  .readFileSync('/usr/share/dict/words', 'utf-8')
  .split('\n')
  .filter((word) => word.trim().length === 4 && /^[a-zA-Z]+$/.test(word.trim()))

/**
 * Generate a string of random words joined by hyphens.
 * @param n The number of words to generate. Defaults to 2.
 * @returns A string of random words joined by hyphens.
 */
export function getRandomWords(n = 2): string {
  const randomWords = Array.from({ length: n }, () => getRandomWord().toLowerCase())
  return randomWords.join('-')
}

function getRandomWord(): string {
  const index = Math.floor(Math.random() * words.length)
  return words[index]
}

