import express from 'express';
import * as userHistoryController from '../controllers/userHistoryController.js';

const router = express.Router();

router.get('/', userHistoryController.getAllHistory);
router.get('/:id', userHistoryController.getHistoryByUserId);
router.post('/', userHistoryController.createHistory);

export default router;
