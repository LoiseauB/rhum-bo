import { Router } from 'express';
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from '../controllers/user.controller';
import { authenticationMiddleware } from '../middlewares/authenticator.middleware';

const router = Router();

router.post('/users', createUser);
router.get('/users/me', authenticationMiddleware, getUser);
router.get('/users', authenticationMiddleware, getAllUsers);
router.put('/users/me', authenticationMiddleware, updateUser);
router.delete('/users/me', authenticationMiddleware, deleteUser);

export default router;
