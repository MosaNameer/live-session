import { SocketData } from '~~/types/socket-data';
import { Session } from '../../../../types/session'
import { state } from '../../../shared/api'

export default defineEventHandler(async (event) => {
  const session_id = useCookie(event, 'session');
  const user_id = useCookie(event, 'userId');
  const name = useCookie(event, 'name');

  const { data } = await useBody(event)

  if (!session_id || !data) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Session not exists',
    })
  }

  let sessions = await useStorage().getItem('db:sessions') as Session[]
  const session = sessions?.find((s: Session) => s.id === session_id)

  if (!session) {
    return []
  }
  /******** SLIDES DATA  **********/
  // Which slide to store data for
  let slide = session?.slidesData.find((s) => s.slide === session.slide)
  if (!slide) {
    // Initiate slide data
    session.slidesData.push({
      slide: session.slide,
      storage: []
    })
    // Re-find slide
    slide = session.slidesData.find((s) => s.slide === session.slide)
  }

  const storage = slide.storage.find((s) => s.userId === user_id)
  if (!storage) {
    // Initiate user data
    slide.storage.push({
      userId: user_id,
      data: data
    })
  } else {
    // Update user data
    storage.data = data
  }

  state.wss.clients.forEach((ws) => {
    if (ws.readyState === ws.OPEN && ws.user.id == session.adminId) {
      ws.send(SocketData({
        type: 'admin',
        data: `User ${name} has updated the questions`
      }))
    }
  })

  await useStorage().setItem('db:sessions', sessions)



  console.log('code has been updated')
  return data
})