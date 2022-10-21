import { SESSION } from '../../types/session'
import { H3Event } from 'h3'

export default defineEventHandler(async (event) => {
  const { message } = await useBody(event)
  if (!message) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'message is required',
    })
  }

  const getSessions = async () => {
    return await useStorage().getItem('db:sessions') as SESSION[]
  }

  let sessions = await getSessions()

  if (! await useStorage().hasItem('db:sessions') || sessions.length === 0) {
    await useStorage().setItem('db:sessions', [])
    sessions = await getSessions()
  }
  
  if (sessions.find((s: SESSION) => s.id === message)) {
    throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: 'Session already exists',
    })
  }

  const userId = useCookie(event, 'userId')

  const newSession: SESSION = {
    id: message,
    slide: "1",
    lesson: 'coding',
    adminId: userId,
    readOnly: true
  }

  sessions.push(newSession)



  await useStorage().setItem('db:sessions', sessions)

  return newSession
})