import { Router } from 'express';
import * as categoryController from '../controllers/category.controller';
import { requireAuth } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', requireAuth, categoryController.list);

export default router;
