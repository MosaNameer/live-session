import { Session } from '../../../../types/session'
import { H3Event } from 'h3'

export default defineEventHandler(async (event) => {
  const session_id = await event.context.params.session_id;

  let sessions = await useStorage().getItem('db:sessions') as Session[]

  if (!sessions){
    return false
  }

  return sessions.find((s: Session) => s.id === session_id)
})