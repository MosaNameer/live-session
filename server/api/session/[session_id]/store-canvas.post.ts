import { SocketData } from '~~/types/socket-data';
import { Session } from '../../../../types/session'
import { state } from '../../../shared/api'

export default defineEventHandler(async (event) => {
  const session_id = getCookie(event, 'session');
  const user_id = getCookie(event, 'userId');
  const name = getCookie(event, 'name');

  const { data } = await readBody(event)

  if (!session_id || !data) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Session not exists',
    })
  }

  let sessions = await useStorage().getItem('db:sessions') as Session[]
  const session = sessions.find((s: Session) => s.id === session_id)

  /******** PRODCASTING DATA  **********/
  const isProdcasting = session.prodcast

  if (isProdcasting) {
    session.prodcastedData = data

    // send to users
    state.wss.clients.forEach((ws) => {
      if (ws.readyState === ws.OPEN && ws.user.session === session_id && ws.user.id !== user_id) {
        ws.send(SocketData({
          type: 'canvas',
          data: data
        }))
      }
    })
  }

  /******** SLIDES DATA  **********/
  // Which slide to store data for
  let slide = session.slidesData.find((s) => s.slide === session.slide)
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
        data: {
          title: `User ${name} has updated the canvas.`,
          timestamp: new Date().valueOf()
        }
      }))
    }
  })

  await useStorage().setItem('db:sessions', sessions)



  console.log('canvas has been updated')
  return data
})