import { SocketData } from '~~/types/socket-data';
import { Session } from '../../../../types/session'
import { state } from '../../../shared/api'

export default defineEventHandler(async (event) => {
  const session_id = getCookie(event, 'session');

  const { user_id } = await readBody(event)

  if (!session_id || !user_id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Session not exists',
    })
  }

  let sessions = await useStorage().getItem('db:sessions') as Session[]
  const session = sessions.find((s: Session) => s.id === session_id)
  let slide = session.slidesData?.find((s) => s.slide === session.slide)
  const storage = slide.storage?.find((s) => s.userId === user_id)
 
  return storage?.data
})