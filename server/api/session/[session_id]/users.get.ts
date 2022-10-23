import { Session } from '~~/types/session';
import { SocketData } from '~~/types/socket-data';
import { User } from '../../../../types/user'
import { state } from '../../../shared/api'

export default defineEventHandler(async (event) => {
  const session_id = useCookie(event, 'session');

  let sessions = await useStorage().getItem('db:sessions') as Session[]
  const session: Session = sessions.find((s: Session) => s.id === session_id)

  return session.users as User[]
})