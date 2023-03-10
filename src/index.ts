import { Elysia, t } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import { cors } from '@elysiajs/cors'

import { saveEncryptedText, getDecryptedText } from './utils/redis'

const app = new Elysia()
  .use(
    cors({
      methods: ['GET', 'POST']
    })
  )
  .use(swagger())
  .listen(3000)

app.get('/', () => 'Welcome to Femme, where your messages are saved for 10 minutes, one time only.')

app.post('/text', ({ body }) => saveEncryptedText(body.text), {
  schema: {
    body: t.Object({
      text: t.String()
    })
  }
})

app.get('/id/:id', (context) => getDecryptedText(context.params.id))

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
