import { createServer } from "http";
import { Server } from "socket.io";
import type { NitroApp } from 'nitropack'
import registerUserHandlers from '../socket/registerUserHandlers'
import registerSessionHandlers from '../socket/registerSessionHandlers'

export default defineNitroPlugin(async (nitroApp: NitroApp) => {
  if (process.dev) {
    const httpServer = createServer();
    const io = new Server(httpServer, {
      cors: {
        origin: "*"
      }
    });

    const onConnection = (socket) => {
      registerSessionHandlers(io, socket);
      registerUserHandlers(io, socket);
    }

    io.on("connection", onConnection);



    httpServer.listen(8787);

    console.log('Socket.io listening on port 8787');

    return
  }

  // wait for nitro custom node preset hook
  // nitroApp.hooks.hook('server:listen:ready', createWsServer)
})