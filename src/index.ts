import { Elysia, t } from 'elysia'
import { swagger } from '@elysiajs/swagger'

import { saveEncryptedText, getDecryptedText } from './utils/redis'

const app = new Elysia().use(swagger()).listen(3000)

app.get('/', () => 'Welcome to Femme, ephemeral text box')

app.post('/text', ({ body, set }) => saveEncryptedText(body.text), {
  schema: {
    body: t.Object({
      text: t.String()
    })
  }
})

app.get('/id/:id', (context) => getDecryptedText(context.params.id))

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
