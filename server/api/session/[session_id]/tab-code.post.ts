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

  /******** PRODCASTING DATA  **********/
  // send to users
  state.wss.clients.forEach((ws) => {
    if (ws.readyState === ws.OPEN && ws.user.session === session_id) {
      if (ws.user.id !== user_id)
        ws.send(SocketData({
          type: 'tab-code',
          data: data
        }))
      else
        ws.send(SocketData({
          type: 'admin',
          data: {
            title: `User ${name} has changed code editor tab.`,
            timestamp: new Date().valueOf()
          }
        }))
    }
  })
  console.log('code tab has been changed')
  return data
})