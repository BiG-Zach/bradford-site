import type { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from 'jsonwebtoken';

interface ConsentPayload {
  consentText: string;
  method: string;
  consentTimestamp: string;
  ip: string;
  landingUrl?: string;
  utm?: Record<string, string>;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { token } = req.query as { token: string };
  
  // Validate required environment variable
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    return res.status(500).json({ error: 'Server configuration error' });
  }
  
  // Validate token parameter
  if (!token || typeof token !== 'string') {
    return res.status(400).json({ error: 'Token parameter is required' });
  }
  
  try {
    const data = jwt.verify(token, JWT_SECRET) as ConsentPayload;
    return res.status(200).json({ ok: true, ...data });
  } catch (error) {
    // Provide more specific error information
    const errorMessage = error instanceof jwt.JsonWebTokenError
      ? 'Invalid token format'
      : error instanceof jwt.TokenExpiredError
      ? 'Token has expired'
      : 'Invalid or expired token';
    
    return res.status(400).json({ error: errorMessage });
  }
}
