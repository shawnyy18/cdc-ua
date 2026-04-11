import { Server } from 'socket.io';
import { setIO } from '@/lib/socketServer';
import type { NextApiRequest } from 'next';
import type { NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false,
  },
};

let io: Server | null = null;

const SocketHandler = (req: NextApiRequest, res: any) => {
  // Basic CORS handling for polling transport preflights and XHR requests.
  const origin = req.headers.origin;
  // If an origin header is present, echo it back and allow credentials.
  // Otherwise, allow any origin but do not allow credentials.
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin as string);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'false');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    // Return early for preflight checks
    res.statusCode = 204;
    res.end();
    return;
  }
  if (!res.socket.server.io && !io) {
    console.log('Socket is initializing');
    io = new Server(res.socket.server, {
      path: '/api/socket',
      addTrailingSlash: false,
      transports: ['websocket', 'polling'],
      pingTimeout: 60000,
      pingInterval: 25000,
      cors: {
        origin: '*',
      },
    });
    res.socket.server.io = io;
  // Also expose on a global accessor for server-side emits
  setIO(io);

    io.on('connection', (socket) => {
      const userId = socket.handshake.query.userId as string;
      const transport = socket.conn.transport.name;
      console.log('Socket connected:', socket.id, 'transport:', transport, 'userId:', userId);
      
      if (userId) {
        socket.join(userId);
        console.log(`User ${userId} joined their room`);
      }

      socket.on('disconnect', (reason) => {
        console.log('Socket disconnected:', socket.id, 'reason:', reason);
      });

      socket.on('error', (err) => {
        console.warn('Socket error on', socket.id, err);
      });
      
      // Relay post updates coming from clients to other connected clients.
      // Clients emit 'post_updated' after they successfully mutate a post (like/comment).
      socket.on('post_updated', (payload: any) => {
        try {
          // Broadcast to everyone. Optionally we could scope to rooms like `post:{id}`
          // but for simplicity emit globally so all clients can reconcile local state.
          io?.emit('post_updated', payload);
          console.log('Relayed post_updated', payload && payload.postId ? `post:${payload.postId}` : '', 'from', socket.id);
        } catch (e) {
          console.warn('Failed to relay post_updated', e);
        }
      });
    });
  }
  res.end();
};

export default SocketHandler;
