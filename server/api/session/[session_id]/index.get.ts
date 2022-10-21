import { SESSION } from '../../../../types/session'
import { H3Event } from 'h3'

export default defineEventHandler(async (event) => {
  const session_id = await event.context.params.session_id;

  let sessions = await useStorage().getItem('db:sessions') as SESSION[]

  return sessions.find((s: SESSION) => s.id === session_id)
})