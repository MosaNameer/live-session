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

  /******** PRODCASTING DATA  **********/
  // send to users
  state.wss.clients.forEach((ws) => {
    if (ws.readyState === ws.OPEN && ws.user.session === session_id && ws.user.id !== user_id) {
      ws.send(SocketData({
        type: 'tab-code',
        data: data
      }))
    }
  })
  console.log('code tab has been changed')
  return data
})