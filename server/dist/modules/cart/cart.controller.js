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
exports.clearCartForNewVendor = exports.clearCart = exports.deleteCartItem = exports.updateCartItem = exports.getCartSummary = exports.getCart = exports.addToCart = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const cart_model_1 = __importDefault(require("./cart.model"));
const product_model_1 = require("../products/product.model");
// Add or update product in cart
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId, quantity, vendorId } = req.body;
        const userId = req.user.id;
        // console.log("user", userId)
        // Validate quantity
        if (!quantity || quantity <= 0) {
            return res.status(400).json({ message: "Quantity must be greater than 0" });
        }
        if (!vendorId) {
            return res.status(400).json({ message: "Vendor id must be required" });
        }
        // Check product exists
        const product = yield product_model_1.Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        // Check stock
        if (product.quantity !== undefined && product.quantity < quantity) {
            return res.status(400).json({
                message: `Only ${product.quantity} items available in stock. Requested: ${quantity}`,
            });
        }
        // Find existing cart for user
        let cart = yield cart_model_1.default.findOne({ userId, status: "active" });
        if (!cart) {
            // Create a new cart if none exists
            cart = yield cart_model_1.default.create({
                userId,
                vendorId,
                products: [{ productId, quantity, price: product.price }],
                total: product.price * quantity,
            });
            return res.json(cart);
        }
        // Check if product already exists in cart
        const existingProduct = cart.products.find((p) => p.productId.toString() === productId);
        if (existingProduct) {
            existingProduct.quantity += quantity;
        }
        else {
            cart.products.push({ productId, quantity, price: product.price });
        }
        // Update total
        cart.total = cart.products.reduce((sum, p) => sum + p.price * p.quantity, 0);
        yield cart.save();
        res.json(cart);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.addToCart = addToCart;
// Get current user's cart
const getCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const cart = yield cart_model_1.default.findOne({ userId }).populate("products.productId");
        if (!cart)
            return res.status(404).json({ message: "Cart not found" });
        console.log(cart);
        res.status(200).json(cart);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch cart", details: err });
    }
});
exports.getCart = getCart;
// Get cart summary with vendor information
const getCartSummary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const cart = yield cart_model_1.default.findOne({ userId })
            .populate("products.productId")
            .populate("vendorId", "name email");
        if (!cart)
            return res.status(404).json({ message: "Cart not found" });
        const summary = {
            cartId: cart._id,
            totalItems: cart.products.reduce((sum, item) => sum + item.quantity, 0),
            totalPrice: cart.total,
            vendor: cart.vendorId ? {
                id: cart.vendorId,
                name: cart.vendorId.name,
                email: cart.vendorId.email
            } : null,
            products: cart.products.map(item => ({
                productId: item.productId,
                name: item.productId.name,
                quantity: item.quantity,
                price: item.price,
                subtotal: item.price * item.quantity
            })),
            status: cart.status
        };
        res.status(200).json(summary);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch cart summary", details: err });
    }
});
exports.getCartSummary = getCartSummary;
// Update cart item quantity or product
const updateCartItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const { productId, quantity } = req.body;
        const cart = yield cart_model_1.default.findOne({ userId });
        if (!cart)
            return res.status(404).json({ message: "Cart not found" });
        // console.log(cart.products[0].productId.toString())
        const item = cart.products.find((p) => p.productId.toString() === productId);
        console.log(item);
        if (!item)
            return res.status(404).json({ message: "Product not found in cart" });
        item.quantity = quantity;
        cart.total = cart.products.reduce((sum, item) => sum + item.price * item.quantity, 0);
        yield cart.save();
        res.status(200).json(cart);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to update cart", details: err });
    }
});
exports.updateCartItem = updateCartItem;
// Delete specific product from cart
const deleteCartItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const { productId } = req.params;
        const cart = yield cart_model_1.default.findOneAndUpdate({ userId }, {
            $pull: {
                products: { productId: new mongoose_1.default.Types.ObjectId(productId) },
            },
        }, { new: true });
        if (!cart)
            return res.status(404).json({ message: "Cart not found" });
        // Recalculate total after item removal
        const updatedTotal = cart.products.reduce((sum, item) => sum + item.price * item.quantity, 0);
        cart.total = updatedTotal;
        yield cart.save();
        res.status(200).json({ message: "Item deleted", cart });
    }
    catch (err) {
        res.status(500).json({
            error: "Failed to remove item from cart",
            details: err instanceof Error ? err.message : err,
        });
    }
});
exports.deleteCartItem = deleteCartItem;
// Optional: Clear entire cart
const clearCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(req.user)
        // const userId = req.user_.id;
        const cartId = req.params.id;
        console.log(cartId);
        if (!cartId) {
            return res.status(404).json({ message: "Cart id not found" });
        }
        const cart = yield cart_model_1.default.findOneAndDelete({ _id: cartId });
        if (!cart)
            return res.status(404).json({ message: "Cart not found" });
        // cart.products = [];
        // cart.total = 0;
        // cart.vendorId = undefined; // Reset vendorId when clearing cart
        // await cart.save();
        res.status(200).json({ message: "Cart cleared" });
    }
    catch (err) {
        res.status(500).json({ error: "Failed to clear cart", details: err });
    }
});
exports.clearCart = clearCart;
// Clear cart and allow switching to different vendor
const clearCartForNewVendor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const cart = yield cart_model_1.default.findOne({ userId });
        if (!cart)
            return res.status(404).json({ message: "Cart not found" });
        cart.products = [];
        cart.total = 0;
        cart.vendorId = undefined; // Reset vendorId to allow new vendor
        yield cart.save();
        res.status(200).json({
            message: "Cart cleared. You can now add products from a different vendor."
        });
    }
    catch (err) {
        res.status(500).json({ error: "Failed to clear cart", details: err });
    }
});
exports.clearCartForNewVendor = clearCartForNewVendor;
