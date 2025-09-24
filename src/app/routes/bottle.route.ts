import { Router } from 'express';
import upload from '../config/multer';
import { createBottle, searchBottle } from '../controllers/bottle.controller';

const router = Router();

router.post('/bottles', upload.single('image'), createBottle);
router.post('/bottles/search', upload.single('image'), searchBottle);

export default router;
