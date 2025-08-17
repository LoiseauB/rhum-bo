import { User } from '@/entities/user.entity';
import { NextFunction, Request, Response } from 'express';
import container from '../config/dependency-injection';

declare module 'express-serve-static-core' {
  interface Request {
    user?: User;
  }
}

export const authenticationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jwt = req.cookies.jwt;
    if (!jwt) return res.status(403).json({ message: 'Unauthorized' });

    const user = await container.resolve('authenticator').authenticate(jwt);
    if (!user) return res.status(403).json({ message: 'Unauthorized' });

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
