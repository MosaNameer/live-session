import { Session } from '../../types/session'
import { User } from '../../types/user'
import { H3Event } from 'h3'

export default defineEventHandler(async (event) => {
  const { id, adminId, lesson } = await useBody(event)
  if (!id || !adminId || !lesson) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'requireds',
    })
  }

  // get sessions
  const getSessions = async () => {
    return await useStorage().getItem('db:sessions') as Session[]
  }
  let sessions = await getSessions()

  // initiate sessions database if not exists
  if (! await useStorage().hasItem('db:sessions') || sessions.length === 0) {
    await useStorage().setItem('db:sessions', [])
    sessions = await getSessions()
  }
  
  // if session already exists
  if (sessions.find((s: Session) => s.id === id)) {
    throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: 'Session already exists',
    })
  }

  const newSession: Session = {
    id: id,
    slide: null,
    lesson: lesson,
    adminId: adminId,
    readOnly: true,
    prodcast: false,
    users: [] as User[],
    slidesData: [],
    prodcastedData: null,
  }

  // add new session to sessions
  sessions.push(newSession)

  // save sessions
  await useStorage().setItem('db:sessions', sessions)

  return newSession
})