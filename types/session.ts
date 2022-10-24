import { User } from './user'
export interface Session {
    id: string,
    slide: string | null,
    slidesData: {
        slide: string,
        storage: {
            userId: string,
            data: string,
        }[] 
    }[],
    prodcastedData: any,
    lesson: string,
    adminId: string,
    readOnly: boolean,
    prodcast: boolean,
    users: User[],
}