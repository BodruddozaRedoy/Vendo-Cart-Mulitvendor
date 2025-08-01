import express from 'express';
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct
} from './product.controller';
import { admin, protect, vendor } from '../auth/auth.middleware';
// import { protect, admin, vendor } from '../../middleware/auth.middleware';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProduct);

// Vendor and Admin routes
router.post('/', protect, vendor, createProduct);
router.put('/:id', protect, vendor, updateProduct);
router.delete('/:id', protect, vendor, deleteProduct);

// Admin only routes
router.put('/admin/:id', protect, admin, updateProduct);
router.delete('/admin/:id', protect, admin, deleteProduct);

export default router;