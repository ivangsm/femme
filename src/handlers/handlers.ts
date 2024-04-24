import { Context } from 'elysia'

import { saveText, getText } from '../utils/redis'

export const welcome = `Femme - Ephemeral Text Box

Welcome to Femme! We offer two endpoints:

- The root endpoint, which allows you to create a new text box.
Simply send a POST request to the root endpoint with your text in the body, like this:
  
  femme.ivansalazar.dev/add

  Example body:
  {"text": "Welcome!"}

- The second endpoint allows you to retrieve the contents of a text box by key.
Simply send a GET request to the endpoint with the key in the URL, like this:
  
  femme.ivansalazar.dev/get/abcd-efgh

Please note that all data in Femme has a lifespan of 10 minutes and can only be retrieved once.
`

export const handleAddRequest = async (ctx: Context) => {
  const { body, set } = ctx
  const parsedBody = typeof body === 'string' ? JSON.parse(body) : body
  const { text } = parsedBody

  if (text.length > 10000) {
    set.status = 400
    return 'You can only upload a text box with a maximum of 10000 characters'
  }

  try {
    const response = await saveText(text)
    return response
  } catch (e) {
    set.status = 500
    return e
  }
}

export const handleGetRequest = async (ctx: Context) => {
  const { params, set } = ctx

  try {
    const key = (params as { key: string }).key
    const text = await getText(key)
    if (!text) {
      set.status = 404
      return 'key not found'
    }
    return text
  } catch (e) {
    set.status = 500
    return e
  }
}
