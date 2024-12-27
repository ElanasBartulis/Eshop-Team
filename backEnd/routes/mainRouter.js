import express from 'express';
import adminRouter from './adminRouter.js';
import productRouter from './ProductRouter.js';
import userRouter from './userRouter.js';
const router = express.Router();

router.use('/admin', adminRouter);
router.use('/users', userRouter);
router.use('/product', productRouter);

export default router;
