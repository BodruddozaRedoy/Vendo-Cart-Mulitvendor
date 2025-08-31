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
exports.getVendorCustomers = exports.getVendorProducts = exports.approveVendor = exports.deleteVendor = exports.updateVendor = exports.getVendor = exports.getVendors = exports.registerVendor = void 0;
// import { Vendor } from '../models/vendor.model';
// import { User } from '../models/user.model'; // Assuming User model is available
const mongoose_1 = __importDefault(require("mongoose"));
const vendor_model_1 = require("./vendor.model");
const product_model_1 = require("../products/product.model");
const user_model_1 = require("../user/user.model");
const order_model_1 = require("../order/order.model");
// Register a new vendor
const registerVendor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, logo, address, contactMail, owner, description, phone } = req.body;
        if (!name || !logo || !address || !contactMail || !owner) {
            return res
                .status(400)
                .json({ message: "All required fields must be provided." });
        }
        const existingVendor = yield vendor_model_1.Vendor.findOne({ owner });
        if (existingVendor) {
            return res
                .status(400)
                .json({ message: "Vendor already registered for this owner." });
        }
        // Update user role to 'vendor'
        const updatedUser = yield user_model_1.User.findByIdAndUpdate(owner, { role: "vendor" }, { new: true });
        if (!updatedUser) {
            return res
                .status(404)
                .json({ message: "User not found to assign vendor role." });
        }
        const newVendor = yield vendor_model_1.Vendor.create({
            name,
            logo,
            address,
            contactMail,
            owner,
            description,
            phone,
        });
        return res
            .status(201)
            .json({ message: "Vendor registered successfully", data: newVendor });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error", error });
    }
});
exports.registerVendor = registerVendor;
// Get all vendors
const getVendors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vendors = yield vendor_model_1.Vendor.find()
            .populate("owner", "name email")
            .populate("products");
        return res.status(200).json({ data: vendors });
    }
    catch (error) {
        return res.status(500).json({ message: "Server Error", error });
    }
});
exports.getVendors = getVendors;
// Get single vendor by ID
const getVendor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid vendor ID" });
        }
        const vendor = yield vendor_model_1.Vendor.findById(id)
            .populate("owner", "name email")
            .populate("products");
        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }
        return res.status(200).json({ data: vendor });
    }
    catch (error) {
        return res.status(500).json({ message: "Server Error", error });
    }
});
exports.getVendor = getVendor;
// Update vendor by ID
const updateVendor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updates = req.body;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid vendor ID" });
        }
        const updatedVendor = yield vendor_model_1.Vendor.findByIdAndUpdate(id, updates, {
            new: true,
        });
        if (!updatedVendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }
        return res
            .status(200)
            .json({ message: "Vendor updated successfully", data: updatedVendor });
    }
    catch (error) {
        return res.status(500).json({ message: "Server Error", error });
    }
});
exports.updateVendor = updateVendor;
// Delete vendor by ID
const deleteVendor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid vendor ID" });
        }
        const deletedVendor = yield vendor_model_1.Vendor.findByIdAndDelete(id);
        if (!deletedVendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }
        return res.status(200).json({ message: "Vendor deleted successfully" });
    }
    catch (error) {
        return res.status(500).json({ message: "Server Error", error });
    }
});
exports.deleteVendor = deleteVendor;
// Approve vendor (set isVerified to true)
const approveVendor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid vendor ID" });
        }
        const approvedVendor = yield vendor_model_1.Vendor.findByIdAndUpdate(id, { isVerified: true }, { new: true });
        if (!approvedVendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }
        return res
            .status(200)
            .json({ message: "Vendor approved successfully", data: approvedVendor });
    }
    catch (error) {
        return res.status(500).json({ message: "Server Error", error });
    }
});
exports.approveVendor = approveVendor;
const getVendorProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid vendor ID" });
        }
        const products = yield product_model_1.Product.find({ vendor: id });
        return res.status(200).json({ data: products });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error", error });
    }
});
exports.getVendorProducts = getVendorProducts;
const getVendorCustomers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id: userId } = req.user;
        if (!mongoose_1.default.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }
        // 1. Find vendor by owner (userId)
        const vendor = yield vendor_model_1.Vendor.findOne({ owner: userId }).select("_id");
        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found for this user" });
        }
        // 2. Get vendor's product IDs
        const vendorProducts = yield product_model_1.Product.find({ vendor: vendor._id }).select("_id");
        const productIds = vendorProducts.map(p => p._id);
        if (productIds.length === 0) {
            return res.status(200).json({ data: [], message: "This vendor has no products" });
        }
        // 3. Find orders that contain vendor products and group by userId
        const orders = yield order_model_1.Order.aggregate([
            { $match: { "products.product": { $in: productIds } } },
            {
                $group: {
                    _id: "$userId",
                    ordersCount: { $sum: 1 },
                    totalSpent: { $sum: "$totalAmount" },
                    lastOrderDate: { $max: "$createdAt" }
                }
            }
        ]);
        if (orders.length === 0) {
            return res.status(200).json({ data: [], message: "This vendor has no orders" });
        }
        const userIds = orders.map(o => o._id);
        // 4. Fetch user details
        const users = yield user_model_1.User.find({ _id: { $in: userIds } }).select("-password");
        // 5. Combine user info and orders summary
        const customers = users.map(user => {
            const orderInfo = orders.find(o => o._id.toString() === user._id.toString());
            return {
                _id: user._id,
                name: user.fullName,
                email: user.email,
                isActive: true, // or compute based on lastOrderDate or user.status
                createdAt: user.createdAt,
                lastOrder: orderInfo === null || orderInfo === void 0 ? void 0 : orderInfo.lastOrderDate,
                totalSpent: orderInfo ? `$${orderInfo.totalSpent.toFixed(2)}` : "$0.00",
                orders: orderInfo ? orderInfo.ordersCount : 0
            };
        });
        return res.status(200).json(customers);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", error });
    }
});
exports.getVendorCustomers = getVendorCustomers;
