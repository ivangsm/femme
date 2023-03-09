import Redis from 'ioredis'
import crypto from 'crypto'
import { getRandomWords } from './words'

const redis = new Redis()

export async function saveEncryptedText(text: string): Promise<string> {
  const key = getRandomWords()
  const exists = await redis.exists(key)
  if (exists) {
    return saveEncryptedText(text)
  }
  await redis.set(key, text, 'EX', 600) // expire in 10 minutes
  return key
}

export async function getDecryptedText(key: string): Promise<string | null> {
  const data = await redis.get(key)
  if (data) {
    await redis.del(key)
    return data
  }
  return null
}
