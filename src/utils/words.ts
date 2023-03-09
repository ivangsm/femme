import * as fs from 'fs'

const words: string[] = fs
  .readFileSync('/usr/share/dict/words', 'utf-8')
  .split('\n')
  .filter((word) => word.trim().length === 4)

export function getRandomWords(n: number = 2): string {
  const randomIndices: number[] = Array.from({ length: n }, () => Math.floor(Math.random() * words.length))
  const randomWords: string[] = randomIndices.map((index) =>
    words[index].trim().replace(/[^a-zA-Z]/g, '').toLowerCase()
  )
  return randomWords.join('-')
}
