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
export function getRandomWords(n = 2): string {
  const randomWords = Array.from({ length: n }, () => {
    const index = Math.floor(Math.random() * words.length);
    const word = words[index].trim().replace(/[^a-zA-Z]/g, '').toLowerCase();
    return word;
  });

  return randomWords.join('-');
}
