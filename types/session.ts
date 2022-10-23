import { User } from './user'
export interface Session {
    id: string,
    slide: number | null,
    lesson: string,
    adminId: string,
    readOnly: boolean,
    users: User[],
}