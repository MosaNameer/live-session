import { SocketData } from '~~/types/socket-data';
import { Session } from '../../../../types/session'
import { state } from '../../../shared/api'

export default defineEventHandler(async (event) => {
  const session_id = useCookie(event, 'session');
  // const user_id = useCookie(event, 'userId');
  // const name = useCookie(event, 'name');

  const { slide } = await useBody(event)

  if (!session_id || !slide) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Session not exists',
    })
  }

  let sessions = await useStorage().getItem('db:sessions') as Session[]
  const session = sessions.find((s: Session) => s.id === session_id)
  
  /******** SLIDES DATA  **********/
  // Which slide to store data for
  let storage = session?.slidesData.find((s) => s.slide === session.slide)?.storage
  if (!storage) {
    // throw createError({
    //   statusCode: 400,
    //   statusMessage: 'Bad Request',
    //   message: 'Slide not exists',
    // })
    return []
  }

  storage?.forEach(user => {
    const questions = user?.data
    questions?.forEach(question => {
      // Multiple
      if (question.type == "multiple") {
        // If every answer is correct
        question.result = question.answers.every((answer, index) => {
          return answer.correct == (Boolean(question.choice?.[index]))
        })
      }

      // One
      if (question.type == "one") {
        const rightAnswer = question.answers.find(answer => answer.correct)
        question.result = question.choice === rightAnswer.title
      }
    });
    
    user.points = questions?.filter(q => q.result).length || 0
  })


  return storage
})