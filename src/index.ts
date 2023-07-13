import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'

import { welcome, handleAddRequest, handleGetRequest } from './handlers/handlers'
import { addDTO } from './models/models'

const app = new Elysia()
  .get('/', () => welcome)
  .get('/get/:key', handleGetRequest)
  .post('/add', handleAddRequest, { body: addDTO })
  .use(
    cors({
      origin: ['*'],
      methods: ['GET', 'POST', 'OPTIONS']
    })
  )
  .listen(3300)

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
