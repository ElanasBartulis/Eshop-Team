import express from 'express';
import adminRouter from './adminRouter.js';
import userRouter from './userRouter.js';
const router = express.Router();

router.use('/admin', adminRouter);
router.use('/users', userRouter);

export default router;
