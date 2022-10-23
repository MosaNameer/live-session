import { User } from './user'
export interface Session {
    id: string,
    slide: string,
    lesson: string,
    adminId: string,
    readOnly: boolean,
    users: User[],
}