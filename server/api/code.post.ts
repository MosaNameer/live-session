import { isArray } from '@vue/shared'
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
  const sessionId = useCookie(event, 'session')
  const userId = useCookie(event, 'userId')
  const data = {
    type: 'code',
    data: message,
  }

  state.wss.clients.forEach((ws) => {
    // @ts-ignore
    console.log('send: to %o', ws.user.name)
    if (ws.readyState === ws.OPEN && ws.user.session === sessionId && ws.user.id !== userId) {
      ws.send(JSON.stringify(data))
      messageSent++
    }
  })

  // let sessions = await useStorage().getItem('db:sessions')
  // if (isArray(sessions)){
  //   const session = sessions.find((s: SESSION) => s.id === sessionId)
  //   session.data = data
  //   await useStorage().setItem('db:sessions', sessions)
  //   return `broadcasted to ${messageSent} clients`
  // }

    return data
})