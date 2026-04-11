import { Server } from 'socket.io';

let io: Server | null = null;

export function setIO(server: Server | null) {
  io = server;
}

export function getIO() {
  return io;
}
