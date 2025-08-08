import express from "express";
import { protect, vendor } from "../auth/auth.middleware";
import { createOrder, getOrdersByUser, getOrdersByVendor, trackOrderStatus, updateOrderStatus } from "./order.controller";

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/", protect, getOrdersByUser);
router.get("/track/:orderId", trackOrderStatus);
router.get("/vendor-orders", protect, vendor, getOrdersByVendor)
router.patch("/status/:orderId", protect, vendor, updateOrderStatus)

export default router;