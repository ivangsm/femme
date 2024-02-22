import { Elysia } from 'elysia'
import { swagger } from '@elysiajs/swagger'

import { welcome, handleAddRequest, handleGetRequest } from './handlers/handlers'
import { addDTO } from './models/models'

const app = new Elysia()
  .use(swagger())
  .get('/', () => welcome)
  .get('/get/:key', handleGetRequest)
  .post('/add', handleAddRequest, { body: addDTO })
  .listen(3300)

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
