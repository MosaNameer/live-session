export interface SocketDataType {
    type: string,
    data: any,
    sender?: any,
}

export const SocketData = (args: SocketDataType) => JSON.stringify({
    type: args.type,
    data: args.data,
    sender: args.sender,
})