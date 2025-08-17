import { Router } from 'express';
import upload from '../config/multer';
import { createUser, deleteUser, getUser, updateUser } from '../controllers/user.controller';
import { authenticationMiddleware } from '../middlewares/authenticator.middleware';

const router = Router();

router.post('/users', upload.single('avatar'), createUser);
router.get('/users/me', authenticationMiddleware, getUser);
router.put('/users/me', upload.single('avatar'), authenticationMiddleware, updateUser);
router.delete('/users/me', authenticationMiddleware, deleteUser);

export default router;
