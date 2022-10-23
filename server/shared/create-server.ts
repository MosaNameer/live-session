import type { IncomingMessage } from 'node:http';
import type { Socket, Server } from 'node:net';
import { AddressInfo, WebSocketServer, type WebSocket } from 'ws';

import { state } from './api'

import { joinUser } from './join-user'
import { User } from '../../types/user'

declare module 'ws' {
  interface WebSocket {
    user?: User
  }
}

export const createWsServer = (server: Server) => {
  const protocol = 'ws'
  const i = server.address() as AddressInfo
  const baseURL = (useRuntimeConfig().app.baseURL || '').replace(/\/$/, '')
  const url = `${protocol}://${i.family === 'IPv6' ? `[${i.address}]` : i.address}:${i.port}${baseURL}`
  
  state.wss = new WebSocketServer({ noServer: true });
  state.url = url

  server.on('upgrade', async (request: IncomingMessage, socket: Socket, head: Buffer) => {
    const [session, name, id] = request.headers['sec-websocket-protocol']?.split(', ') ?? ['', '']
    const user: User = { name: name, session: session, id: id }
    
    if (user.name == '' || user.session == '') {
      socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
      socket.destroy();
      return;
    }


    state.wss.handleUpgrade(request, socket, head, (ws) => {
      state.wss.emit('connection', ws, request, user);
    });
  });

  state.wss.on('connection', async function connection(ws: WebSocket, request: IncomingMessage, user: User) {
    ws.user = user

    ws.on('message', function message(data) {
      console.log(`received from ${user.name} `, data);
    });


    // Join User
    console.log(await joinUser(user, ws))
  });

  console.log(`Websocket Listening ${url}`)
}