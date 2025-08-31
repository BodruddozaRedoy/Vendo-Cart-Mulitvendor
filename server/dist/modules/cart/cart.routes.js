"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/cart.routes.ts
const express_1 = __importDefault(require("express"));
const cart_controller_1 = require("../cart/cart.controller");
const auth_middleware_1 = require("../auth/auth.middleware");
const router = express_1.default.Router();
router.use(auth_middleware_1.protect); // all routes protected
router.post('/', cart_controller_1.addToCart);
router.get('/', cart_controller_1.getCart);
router.get('/summary', cart_controller_1.getCartSummary);
router.put('/', cart_controller_1.updateCartItem);
router.delete('/remove/:productId', cart_controller_1.deleteCartItem);
router.delete('/clear/:id', cart_controller_1.clearCart);
router.delete('/clear-for-new-vendor', cart_controller_1.clearCartForNewVendor);
exports.default = router;
