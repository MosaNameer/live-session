import { state } from './api'
import { User } from '../../types/user'
import { Session } from '../../types/session'
import { type WebSocket } from 'ws';
import { SocketData } from '../../types/socket-data';

export const joinUser = async (user: User, ws: WebSocket) => {
    let sessions = await useStorage().getItem('db:sessions') as Session[]
    const session = sessions?.find((s) => s.id === user?.session)
    const userExistsInSession = session?.users?.find((u) => u.id === user?.id)

    // Session is not found
    if (!session) {
        ws.send(SocketData({ type: 'statue', data: "Session is not found.", sender: "System" }))
        ws.close()

        state.wss.clients.forEach((_ws) => {
            if (_ws.user.id == session.adminId)
            ws.send(SocketData({
                type: 'admin',
                data: {
                    title: `Failed ${user.name} to join to session ${user.session}.`,
                    timestamp: new Date().valueOf()
                }
            }))
        })
        
        return `Failed ${user.name} to join to session ${user.session}`
    }

    // User is already in session
    if (!userExistsInSession) {
        session.users.push(user)
        await useStorage().setItem('db:sessions', sessions)
        ws.send(SocketData({ type: 'statue', data: "Joined.", sender: "System" }))

        state.wss.clients.forEach((_ws) => {
            if (_ws.user.id == session.adminId)
            ws.send(SocketData({
                type: 'admin',
                data: {
                    title: `Joined ${user.name} to ${session.id}.`,
                    timestamp: new Date().valueOf()
                }
            }))
        })

        return `Joined ${user.name} to ${session.id}`
    }


    state.wss.clients.forEach((_ws) => {
        if (_ws.user.id == session.adminId)
        ws.send(SocketData({
            type: 'admin',
            data: {
                title: `Reconnected ${user.name} to ${session.id}.`,
                timestamp: new Date().valueOf()
            }
        }))
    })


    return `Reconnected ${user.name} to ${session.id}`
}