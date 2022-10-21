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

  let messageSent = 0
  state.wss.clients.forEach((ws) => {
    // @ts-ignore
    console.log('send: to %o', ws.user.name)

    const sessionId = useCookie(event, 'session')
    if (ws.readyState === ws.OPEN && ws.user.session === sessionId) {
      ws.send(JSON.stringify({
        type: 'code',
        data: message,
      }))
      messageSent++
    }
  })

  return `broadcasted to ${messageSent} clients`
})