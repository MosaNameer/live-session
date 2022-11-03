export default (io, socket) => {
    const userJoin = (payload) => {
        console.log('userJoin', payload);
        // socket.join(payload);
    }

    // const readOrder = (orderId, callback) => {
    //     // ...
    // }

    socket.on("user:join", userJoin);

    console.log(socket.client.id)
    // socket.on("order:read", readOrder);
}