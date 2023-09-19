import Redis from 'ioredis'
import { getRandomWords } from './words'

// Create a Redis client
const redis = new Redis({ host: process.env.REDIS_HOST || '127.0.0.1' })

/**
 * Save a string of text to Redis, encrypted with a randomly generated key.
 * @param text The text to save.
 * @returns A Promise resolving to the key used to save the text.
 */
export async function saveText(text: string): Promise<string> {
  let key;
  
  do {
    key = getRandomWords();
  } while (await redis.exists(key));

  await redis.set(key, text, 'EX', 600);
  return key;
}

/**
 * Retrieve a string of text from Redis using a given key, and delete the key from Redis.
 * @param key The key to use to retrieve the text.
 * @returns A Promise resolving to the decrypted text, or null if the key is not found.
 */
export async function getText(key: string): Promise<string | null> {
  const data = await redis.get(key)

  if (data) {
    await Promise.all([redis.del(key)])
    return data
  }

  return null
}
