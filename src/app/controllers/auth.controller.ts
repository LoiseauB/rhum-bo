import { Request, Response } from 'express';
import container from '../config/dependency-injection';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await container.resolve('authService').login(email, password);
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie('jwt');
  res.status(200).json({ message: 'Logout successful' });
};
