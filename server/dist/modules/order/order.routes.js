"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../auth/auth.middleware");
const order_controller_1 = require("./order.controller");
const router = express_1.default.Router();
router.post("/", auth_middleware_1.protect, order_controller_1.createOrder);
router.get("/", auth_middleware_1.protect, order_controller_1.getOrdersByUser);
router.get("/track/:orderId", order_controller_1.trackOrderStatus);
router.get("/vendor-orders", auth_middleware_1.protect, auth_middleware_1.vendor, order_controller_1.getOrdersByVendor);
router.patch("/status/:orderId", auth_middleware_1.protect, auth_middleware_1.vendor, order_controller_1.updateOrderStatus);
exports.default = router;
