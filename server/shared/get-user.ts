import { state } from './api'
import { User } from '../../types/user'

export const getUser = async (event) => {
    state.wss.clients.forEach((ws) => {
        if (ws.readyState === ws.OPEN && ws.user.id === event.context.cookies.userId) {
            return ws.user as User
        }
    })

    return null
}

export const getUserById = (id) => {
    state.wss.clients.forEach((ws) => {
        if (ws.readyState === ws.OPEN && ws.user.id === id) {
            return ws.user as User
        }
    })
}