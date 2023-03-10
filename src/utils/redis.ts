import Redis from 'ioredis'
import { getRandomWords } from './words'
import { compressText, decompressText } from './compress'

// Create a Redis client
const redis = new Redis({ host: process.env.REDIS_HOST || 'localhost' })

/**
 * Save a string of text to Redis, encrypted with a randomly generated key.
 * @param text The text to save.
 * @returns A Promise resolving to the key used to save the text.
 */
export async function saveEncryptedText(text: string): Promise<string> {
  const key = getRandomWords()
  text = compressText(text)

  const exists = await redis.exists(key)
  if (exists) {
    return saveEncryptedText(text)
  }

  // Save the text to Redis with the generated key and set it to expire in 10 minutes
  await redis.set(key, text, 'EX', 600)
  return key
}

/**
 * Retrieve a string of text from Redis using a given key, and delete the key from Redis.
 * @param key The key to use to retrieve the text.
 * @returns A Promise resolving to the decrypted text, or null if the key is not found.
 */
export async function getDecryptedText(key: string): Promise<string | null> {
  const data = await redis.get(key)

  // If data is found, delete the key and return the decrypted text
  if (data) {
    const uncompressed = decompressText(data)
    await redis.del(key)
    return uncompressed
  }
  return null
}
