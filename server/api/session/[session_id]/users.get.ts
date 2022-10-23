import { Session } from '~~/types/session';
import { SocketData } from '~~/types/socket-data';
import { User } from '../../../../types/user'
import { state } from '../../../shared/api'

export default defineEventHandler(async (event) => {
  const session_id = useCookie(event, 'session');

  let sessions = await useStorage().getItem('db:sessions') as Session[]
  const session: Session = sessions.find((s: Session) => s.id === session_id)
  const sessionUsers = session.users
  const socketUsers: User[] = []

  state.wss.clients.forEach((ws) => {
    if (ws.readyState === ws.OPEN && ws.user.session === session_id) socketUsers.push(ws.user)
  })

  const users = sessionUsers.map((user) => {
    const socketUser = socketUsers.find((u) => u.id === user.id)
    return {
      ...user,
      online: !!socketUser
    }
  })


  return users as User[]
})