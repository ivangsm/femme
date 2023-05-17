import { Elysia, t } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import { cors } from '@elysiajs/cors'

import { saveText, getText } from './utils/redis'

const app = new Elysia()

const welcome = `Femme - Ephemeral Text Box

Welcome to Femme! We offer two endpoints:

- The root endpoint, which allows you to create a new text box.
Simply send a POST request to the root endpoint with your text in the body, like this:
  
  femme.ivansalazar.dev

  Example body:
  {"text": "Welcome!"}

- The second endpoint allows you to retrieve the contents of a text box by key.
Simply send a GET request to the endpoint with the key in the URL, like this:
  
  femme.ivansalazar.dev/abcd-efgh

Please note that all data in Femme has a lifespan of 10 minutes and can only be retrieved once.
`

app.get('/', () => welcome)

app.post(
  '/add',
  async ({ body, set }) => {
    if (body?.text.length > 10000) {
      set.status = 400
      return "You can only upload a text box with a maximum of 10000 characters"
    }
    return await saveText(body?.text ?? ((set.status = 400), undefined))
  }, {
  body: t.Object({
    text: t.String()
  })
})

app.get('/get/:key', async (context) => {
  return await getText(context.params.key) ?? ((context.set.status = 404), "key not found")
})

app.use(
  cors({
    origin: ['*'],
    methods: ['GET', 'POST', 'OPTIONS']
  })
)
  .use(swagger())
  .listen(3000)

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
