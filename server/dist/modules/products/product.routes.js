"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = express_1.default.Router();
router.get('/', product_controller_1.getProducts);
router.get('/:id', product_controller_1.getProduct);
// Vendor and Admin routes
router.post('/', auth_middleware_1.protect, auth_middleware_1.vendor, product_controller_1.createProduct);
router.put('/:id', auth_middleware_1.protect, auth_middleware_1.vendor, product_controller_1.updateProduct);
router.delete('/:id', auth_middleware_1.protect, auth_middleware_1.vendor, product_controller_1.deleteProduct);
// Admin only routes
router.put('/admin/:id', auth_middleware_1.protect, auth_middleware_1.admin, product_controller_1.updateProduct);
router.delete('/admin/:id', auth_middleware_1.protect, auth_middleware_1.admin, product_controller_1.deleteProduct);
exports.default = router;
