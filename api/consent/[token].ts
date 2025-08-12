import type { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from 'jsonwebtoken';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { token } = req.query as { token: string };
  const JWT_SECRET = process.env.JWT_SECRET!;
  try {
    const data = jwt.verify(token, JWT_SECRET);
    return res.status(200).json({ ok: true, ...data });
  } catch {
    return res.status(400).json({ error: 'Invalid or expired token' });
  }
}
