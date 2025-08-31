"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const vendor_controller_1 = require("./vendor.controller");
const auth_middleware_1 = require("../auth/auth.middleware");
const router = express_1.default.Router();
router.post('/', auth_middleware_1.protect, vendor_controller_1.registerVendor);
router.get('/', vendor_controller_1.getVendors);
router.get('/:id', vendor_controller_1.getVendor);
router.get('/products/:id', vendor_controller_1.getVendorProducts);
// Vendor routes
router.put('/:id', auth_middleware_1.protect, auth_middleware_1.vendor, vendor_controller_1.updateVendor);
router.delete('/:id', auth_middleware_1.protect, auth_middleware_1.vendor, vendor_controller_1.deleteVendor);
router.get('/store/customers', auth_middleware_1.protect, auth_middleware_1.vendor, vendor_controller_1.getVendorCustomers);
// Admin routes
router.put('/approve/:id', auth_middleware_1.protect, auth_middleware_1.admin, vendor_controller_1.approveVendor);
exports.default = router;
