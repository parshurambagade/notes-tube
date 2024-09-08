import express from 'express';
import { register, login, logout, checkAuthStatus } from '../controllers/auth.controllers.js';

const router = express.Router();

router.post('/register', register);
router.get('/status', checkAuthStatus);
router.post('/login', login);
router.post('/logout', logout);

export default router;
