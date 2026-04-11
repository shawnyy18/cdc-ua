// Deprecated endpoint. Left as a no-op to avoid accidental duplicate Socket.IO servers.
// Please use pages/api/socket.ts for the Socket.IO server.
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  // Return 410 Gone to signal the endpoint is deprecated.
  res.status(410).json({ success: false, error: 'Deprecated: use /pages/api/socket instead' });
}
