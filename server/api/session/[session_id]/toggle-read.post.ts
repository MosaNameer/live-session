import { SocketData } from '~~/types/socket-data';
import { Session } from '../../../../types/session'
import { state } from '../../../shared/api'

export default defineEventHandler(async (event) => {
  const session_id = useCookie(event, 'session');
  const name = useCookie(event, 'name');

  
  if (!session_id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Session already exists',
    })
  }

  let sessions = await useStorage().getItem('db:sessions') as Session[]
  const session = sessions.find((s: Session) => s.id === session_id)
  session.readOnly = !session.readOnly
  await useStorage().setItem('db:sessions', sessions)


  state.wss.clients.forEach((ws) => {
    console.log('send: to %o', ws.user.name)
    if (ws.readyState === ws.OPEN && ws.user.session === session_id) {
      ws.send(SocketData({
        type: 'read-only',
        data: session.readOnly
      }))

      if (ws.user.id == session.adminId)
        ws.send(SocketData({
          type: 'admin',
          data: {
            title: `User ${name} has updated the prodcast.`,
            timestamp: new Date().valueOf()
          }
        }))
    }
  })
  
  console.log('toggle read-only for all clients', session.readOnly)
  return session.readOnly
})