import { Router } from 'express';
import upload from '../config/multer';
import { createBottle } from '../controllers/bottle.controller';

const router = Router();

router.post('/bottles', upload.single('image'), createBottle);

export default router;
