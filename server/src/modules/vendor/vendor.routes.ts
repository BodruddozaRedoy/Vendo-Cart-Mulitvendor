import express from 'express';
// import {
//   registerVendor,
//   getVendors,
//   getVendor,
//   updateVendor,
//   deleteVendor,
//   approveVendor,
//   getVendorProducts
// } from './vendor.controller';
// import { protect, admin, vendor } from '../../middleware/auth.middleware';
import { registerVendor } from './vendor.controller';
import { protect, vendor } from '../auth/auth.middleware';

const router = express.Router();

// router.post('/', protect, registerVendor);
// router.get('/', getVendors);
// router.get('/:id', getVendor);
// router.get('/:id/products', getVendorProducts);

// // Vendor routes
// router.put('/', protect, vendor, updateVendor);
// router.delete('/', protect, vendor, deleteVendor);

// // Admin routes
// router.put('/:id/approve', protect, admin, approveVendor);

export default router;