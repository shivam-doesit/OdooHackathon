import { Router } from 'express';
import { getCurrentUser, login, register } from '../controllers/auth.controller';
import { authenticateJWT } from '../middleware/auth.middleware';

const router = Router();
router.post('/register', register);
router.post('/login', login);
router.get('/me', authenticateJWT, getCurrentUser);

export default router;