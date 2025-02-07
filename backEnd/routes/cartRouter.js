import express from 'express';
import * as cartController from '../controllers/cartController.js';

const router = express.Router();

router.get('/', cartController.getCart);
router.post('/add', cartController.addToCart);
router.put('/update', cartController.updateCart);
router.delete('/remove', cartController.deleteCartItem);
router.delete('/remove-all', cartController.removeAllItems);

export default router;
