import { SocketData } from '~~/types/socket-data';
import { Session } from '../../../../types/session'
import { state } from '../../../shared/api'

export default defineEventHandler(async (event) => {
  const session_id = useCookie(event, 'session');
  const { slide } = await useBody(event)

  if (!session_id || !slide) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Session already exists',
    })
  }

  let sessions = await useStorage().getItem('db:sessions') as Session[]
  const session = sessions.find((s: Session) => s.id === session_id)
  session.slide = slide
  session.prodcastedData = session?.slidesData?.find(s => s.slide === slide)?.storage?.find(u => u.userId === session?.adminId)?.data ?? null
  await useStorage().setItem('db:sessions', sessions)


  state.wss.clients.forEach((ws) => {
    console.log('send: to %o', ws.user.name)
    if (ws.readyState === ws.OPEN && ws.user.session === session_id) {
      ws.send(SocketData({
        type: 'slide',
        data: {
          slide: slide,
          // session: session,
          prodcastedData: session?.prodcastedData
        }
      }))
    }
  })

  state.wss.clients.forEach((ws) => {
    if (ws.readyState === ws.OPEN && ws.user.id == session.adminId) {
      ws.send(SocketData({
        type: 'admin',
        data: {
          title: `User ${name} has changed slide.`,
          timestamp: new Date().valueOf()
        }
      }))
    }
  })
  
  console.log('set for all clients')
  return {
    slide: slide,
    prodcastedData: session?.prodcastedData
  }
})