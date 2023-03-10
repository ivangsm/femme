import { Elysia, t } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import { cors } from '@elysiajs/cors'

import { saveEncryptedText, getDecryptedText } from './utils/redis'

const app = new Elysia()
  .use(
    cors({
      origin: ['localhost:3000', '0.0.0.0:3000', 'femme.ivansalazar.dev'],
      methods: ['GET', 'POST']
    })
  )
  .use(swagger())
  .listen(3000)

const welcome = `
  femme - Ephemeral text box
    
  Here's only 2 endpoints
      - '/'
          example:
            femme.ivansalazar.dev
          example body: 
            {"text": "welcome"}
      - '/{key}'
          example:
            femme.ivansalazar.dev/abcd-efgh

  caution: all the data has a TTL of 10 mins an can only be retrieved one time :)`

app.get('/welcome', () => welcome)

app.post(
  '/',
  async ({ body, set }) => {
    return await saveEncryptedText(body?.text ?? ((set.status = 400), undefined))
  },
  {
    schema: {
      body: t.Object({
        text: t.String()
      })
    }
  }
)

app.get('/:key', async (context) => {
  const decryptedText = await getDecryptedText(context.params.key)
  return decryptedText ?? ((context.set.status = 404), undefined)
})

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
