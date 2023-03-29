import { Elysia, t } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import { cors } from '@elysiajs/cors'

import { saveEncryptedText, getDecryptedText } from './utils/redis'

const app = new Elysia()
  .use(
    cors({
      origin: ['*'],
      methods: ['GET', 'POST', 'OPTIONS']
    })
  )
  .use(swagger())
  .listen(3000)

const welcome = `Femme - Ephemeral Text Box

Welcome to Femme! We offer two endpoints:

- The root endpoint, which allows you to create a new text box.
Simply send a POST request to the root endpoint with your text in the body, like this:
  
  femme.ivansalazar.dev/set

  Example body:
  {"text": "Welcome!"}

- The second endpoint allows you to retrieve the contents of a text box by key.
Simply send a GET request to the endpoint with the key in the URL, like this:
  
  femme.ivansalazar.dev/txt/abcd-efgh

Please note that all data in Femme has a lifespan of 10 minutes and can only be retrieved once.
`

app.get('/welcome', () => welcome)

app.post(
  '/set',
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

app.get('/txt/:key', async (context) => {
  return await getDecryptedText(context.params.key) ?? ((context.set.status = 404), undefined)
})

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
