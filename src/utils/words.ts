import * as fs from 'fs'

// Load a list of 4-letter words from a dictionary file
const words: string[] = fs
  .readFileSync('/usr/share/dict/words', 'utf-8')
  .split('\n')
  .filter((word) => word.trim().length === 4)

/**
 * Generate a string of random words joined by hyphens.
 * @param n The number of words to generate. Defaults to 2.
 * @returns A string of random words joined by hyphens.
 */
export function getRandomWords(n: number = 2): string {
  // Generate an array of n random indices into the words array
  const randomIndices: number[] = Array.from({ length: n }, () => Math.floor(Math.random() * words.length))

  // Map the random indices to words from the words array, and remove any non-letter characters
  const randomWords: string[] = randomIndices.map((index) =>
    words[index].trim().replace(/[^a-zA-Z]/g, '').toLowerCase()
  )

  // Join the random words with hyphens and return the result
  return randomWords.join('-')
}
