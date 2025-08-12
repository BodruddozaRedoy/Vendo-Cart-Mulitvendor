// routes/cart.routes.ts
import express from 'express';
import {
  addToCart,
  getCart,
  getCartSummary,
  updateCartItem,
  deleteCartItem,
  clearCart,
  clearCartForNewVendor,
} from '../cart/cart.controller';
import { protect } from '../auth/auth.middleware';

const router = express.Router();

router.use(protect); // all routes protected

router.post('/', addToCart);
router.get('/', getCart);
router.get('/summary', getCartSummary);
router.put('/', updateCartItem);
router.delete('/remove/:productId', deleteCartItem);
router.delete('/clear', clearCart);
router.delete('/clear-for-new-vendor', clearCartForNewVendor);

export default router;
