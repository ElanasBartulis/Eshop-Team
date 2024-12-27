import express from 'express';
import * as userController from '../controllers/userController.js';
const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/log-out', userController.logout);
export default router;
