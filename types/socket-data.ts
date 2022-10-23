export interface SocketDataType {
    type: string,
    data: any,
    sender?: any,
}

export class SocketDataType {
    constructor(type: string, data: any, sender: any) {
        this.type = type
        this.data = JSON.stringify(data)
        this.sender = sender ?? null
    }
}

export const SocketData = (args: SocketDataType) => new SocketDataType(args.type, args.data, args.sender)