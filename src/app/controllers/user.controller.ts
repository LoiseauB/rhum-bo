import { Request, Response } from 'express';
import container from '../config/dependency-injection';

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password, pseudo } = req.body;
    const user = await container
      .resolve('userService')
      .createUser({ email, password, pseudo, avatar: req.file?.buffer });
    res.status(201).json({ message: 'User created successfully', data: { id: user } });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.user!.props;
    const user = await container.resolve('userService').getUserById(id);
    res.status(200).json({ message: 'User retrieved successfully', data: user });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.user!.props;
    const { email, password, pseudo } = req.body;
    await container.resolve('userService').updateUser(id, { email, password, pseudo, avatar: req.file?.buffer });
    if (email || password) {
      res.clearCookie('jwt');
    }
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.user!.props;
    await container.resolve('userService').deleteUser(id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// export const getAllUsers = async (req: Request, res: Response) => {
//   try {
//     const users = await container.resolve('userService').getAllUsers();
//     res.status(200).json({ message: 'Users retrieved successfully', data: users });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };
