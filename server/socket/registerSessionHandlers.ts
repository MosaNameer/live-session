export default (io, socket) => {

    const sessionJoin = (sessionId) => {
        const userName = socket.handshake.auth.token;
        socket.join(`session:${sessionId}`);
    }

    socket.on("session:join", sessionJoin);
}