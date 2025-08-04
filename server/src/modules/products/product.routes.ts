import express from 'express';
import { admin, protect, vendor } from '../auth/auth.middleware';
import { addProduct, deleteProduct, getAllProductsByVendor, getProduct, getAllProducts, updateProduct } from './product.controller';

const router = express.Router();

// router.get('/', getProducts);
router.get('/:id', getProduct);
router.get("/vendor/products", protect, vendor, getAllProductsByVendor)
router.get("/", getAllProducts)

// Vendor and Admin routes
router.post('/', protect, vendor, addProduct);
router.put('/:id', protect, vendor, updateProduct);
router.delete('/:id', protect, vendor, deleteProduct);

// Admin only routes
router.put('/admin/:id', protect, admin, updateProduct);
router.delete('/admin/:id', protect, admin, deleteProduct);

export default router;