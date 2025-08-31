"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderStatus = exports.getOrdersByVendor = exports.trackOrderStatus = exports.getOrdersByUser = exports.createOrder = void 0;
const stripe_1 = __importDefault(require("stripe"));
const order_model_1 = require("./order.model");
const env_1 = __importDefault(require("../../config/env"));
const vendor_model_1 = require("../vendor/vendor.model");
const stripe = new stripe_1.default(env_1.default.STRIPE_SECRET_KEY);
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cartItems, totalAmount, paymentMethod, stripeToken, deliveryInfo } = req.body;
        const userId = req.user._id;
        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }
        if (!["cod", "stripe"].includes(paymentMethod)) {
            return res.status(400).json({ message: "Invalid payment method" });
        }
        let paymentStatus = "pending";
        if (paymentMethod === "stripe") {
            if (!stripeToken) {
                return res.status(400).json({ message: "Stripe token is required" });
            }
            const charge = yield stripe.charges.create({
                amount: Math.round(totalAmount * 100), // Convert to cents
                currency: "usd",
                source: stripeToken,
                description: `Order payment by user ${userId}`,
            });
            if (charge.status !== "succeeded") {
                return res.status(402).json({ message: "Payment failed" });
            }
            paymentStatus = "paid";
        }
        const order = new order_model_1.Order({
            userId,
            products: cartItems.map((item) => ({
                product: item.product,
                quantity: item.quantity,
            })),
            paymentMethod,
            paymentStatus,
            totalAmount,
            deliveryInfo
        });
        yield order.save();
        return res.status(201).json({ message: "Order placed successfully", order });
    }
    catch (error) {
        console.error("Stripe payment error:", error);
        return res.status(500).json({ message: error.message || "Something went wrong" });
    }
});
exports.createOrder = createOrder;
const getOrdersByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        const orders = yield order_model_1.Order.find({ userId })
            .populate("products.product", "name image price") // optional
            .sort({ createdAt: -1 }); // latest first
        res.status(200).json(orders);
    }
    catch (error) {
        console.error("Error fetching user orders:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.getOrdersByUser = getOrdersByUser;
const trackOrderStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId } = req.params;
        if (!orderId) {
            return res.status(400).json({ message: "Order ID is required" });
        }
        const order = yield order_model_1.Order.findById(orderId).select("deliveryStatus");
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({ deliveryStatus: order.deliveryStatus });
    }
    catch (error) {
        console.error("Error tracking order:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.trackOrderStatus = trackOrderStatus;
const getOrdersByVendor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        // 1. Find the vendor associated with this user
        const vendor = yield vendor_model_1.Vendor.findOne({ owner: userId });
        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }
        // 2. Get all orders with products + customer populated
        const orders = yield order_model_1.Order.find()
            .populate({
            path: "products.product",
            populate: { path: "vendor", select: "name owner" }, // get vendor details inside product
        })
            .populate({
            path: "userId",
            select: "fullName email phone address picture isActive isVerified", // optional: customer details
        })
            .sort({ createdAt: -1 });
        // 3. Filter orders that include products belonging to this vendor
        const vendorOrders = orders.filter(order => order.products.some((item) => { var _a, _b, _c; return ((_c = (_b = (_a = item.product) === null || _a === void 0 ? void 0 : _a.vendor) === null || _b === void 0 ? void 0 : _b._id) === null || _c === void 0 ? void 0 : _c.toString()) === vendor._id.toString(); }));
        res.status(200).json(vendorOrders);
    }
    catch (error) {
        console.error("Error getting vendor orders:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.getOrdersByVendor = getOrdersByVendor;
const updateOrderStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.body)
    try {
        const { orderId } = req.params;
        const { deliveryStatus } = req.body;
        if (!orderId || !deliveryStatus) {
            return res.status(400).json({ message: "Order ID and new delivery status are required" });
        }
        const validStatuses = ["Order placed", "In progress", "Shipped", "Out for delivery", "Delivered", "Cancelled"];
        if (!validStatuses.includes(deliveryStatus)) {
            return res.status(400).json({ message: "Invalid delivery status" });
        }
        const order = yield order_model_1.Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        order.deliveryStatus = deliveryStatus;
        yield order.save();
        return res.status(200).json({ message: "Delivery status updated successfully", order });
    }
    catch (error) {
        console.error("Error updating order status:", error);
        return res.status(500).json({ message: error.message || "Something went wrong" });
    }
});
exports.updateOrderStatus = updateOrderStatus;
