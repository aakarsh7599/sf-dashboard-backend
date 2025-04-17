import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
  user?: { userId: string; email: string };
}

export function authenticateToken(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): void {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
      res.status(401).json({ error: 'Token not provided: Error from backend' });
      return;
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
        userId: string;
        email: string;
      };
      req.user = decoded;
      next();
    } catch (err) {
      res.status(403).json({ error: 'Invalid or expired token' });
    }
  }