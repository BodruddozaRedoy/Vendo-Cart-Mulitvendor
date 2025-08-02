"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import {
//   registerVendor,
//   getVendors,
//   getVendor,
//   updateVendor,
//   deleteVendor,
//   approveVendor,
//   getVendorProducts
// } from './vendor.controller';
const auth_middleware_1 = require("../../middleware/auth.middleware");
const vendor_controller_1 = require("./vendor.controller");
const router = express_1.default.Router();
router.post('/', auth_middleware_1.protect, vendor_controller_1.registerVendor);
router.get('/', getVendors);
router.get('/:id', getVendor);
router.get('/:id/products', getVendorProducts);
// Vendor routes
router.put('/', auth_middleware_1.protect, auth_middleware_1.vendor, updateVendor);
router.delete('/', auth_middleware_1.protect, auth_middleware_1.vendor, deleteVendor);
// Admin routes
router.put('/:id/approve', auth_middleware_1.protect, auth_middleware_1.admin, approveVendor);
exports.default = router;
