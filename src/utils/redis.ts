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
  const iv = crypto.randomBytes(16) // generate a random initialization vector
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
  let encrypted = cipher.update(text, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  await redis.set(key, `${iv.toString('hex')}:${encrypted}`, 'EX', 600) // expire in 10 minutes
  return key
}

export async function getDecryptedText(key: string): Promise<string | null> {
  const data = await redis.get(key)
  if (data) {
    const [ivHex, encrypted] = data.split(':')
    const iv = Buffer.from(ivHex, 'hex')
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)
    let decrypted = decipher.update(encrypted, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    await redis.del(key)
    return decrypted
  }
  return null
}
