import { User } from './user'
export interface Session {
    id: string,
    slide: number,
    lesson: string,
    adminId: string,
    readOnly: boolean,
    users: User[],
}