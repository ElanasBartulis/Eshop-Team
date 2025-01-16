import express from 'express';
import * as ratingController from '../controllers/ratingController.js';

const router = express.Router();

router.post('/create', ratingController.addRating);
router.get('/:productId', ratingController.getProductRatingByProductId);

export default router;
