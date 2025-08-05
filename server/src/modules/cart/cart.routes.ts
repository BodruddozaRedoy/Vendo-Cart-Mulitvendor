// routes/cart.routes.ts
import express from 'express';
import {
  addToCart,
  getCart,
  updateCartItem,
  deleteCartItem,
  clearCart,
} from '../cart/cart.controller';
import { protect } from '../auth/auth.middleware';

const router = express.Router();

router.use(protect); // all routes protected

router.post('/', addToCart);
router.get('/', getCart);
router.put('/', updateCartItem);
router.delete('/remove/:productId', deleteCartItem);
router.delete('/clear', clearCart);

export default router;
