import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  const secret = process.env.JWT_SECRET;
  if (!secret) return res.status(500).json({ message: 'Authentication is not configured' });

  try {
    const payload = jwt.verify(token, secret);
    if (typeof payload === 'string' || typeof payload.id !== 'string' || !['user', 'admin'].includes(payload.role as string)) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = { id: payload.id, role: payload.role as 'user' | 'admin' };
    return next();
  } catch {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};
