import { state } from '../shared/api'

export default defineEventHandler(async (event) => {
  const { message } = await useBody(event)
  if (!message) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'message is required',
    })
  }
  const data = {
    type: 'code',
    data: message,
  }

  let messageSent = 0
  state.wss.clients.forEach((ws) => {
    // @ts-ignore
    console.log('send: to %o', ws.user.name)
    if (ws.readyState === ws.OPEN) {
      ws.send(JSON.stringify(data))
      messageSent++
    }
  })

  return `broadcasted to ${messageSent} clients`
})