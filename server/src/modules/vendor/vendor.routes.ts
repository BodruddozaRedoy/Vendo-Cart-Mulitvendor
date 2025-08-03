import express from 'express';
import { approveVendor, deleteVendor, getVendor, getVendorProducts, getVendors, registerVendor, updateVendor } from './vendor.controller';
import { admin, protect, vendor } from '../auth/auth.middleware';

const router = express.Router();

router.post('/', protect, registerVendor);
router.get('/', getVendors);
router.get('/:id', getVendor);
router.get('/products/:id', getVendorProducts);

// Vendor routes
router.put('/:id', protect, vendor, updateVendor);
router.delete('/:id', protect, vendor, deleteVendor);

// Admin routes
router.put('/approve/:id', protect, admin, approveVendor);

export default router;