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
exports.getAllProductsByVendor = exports.deleteProduct = exports.updateProduct = exports.getProduct = exports.getAllProducts = exports.addProduct = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const vendor_model_1 = require("../vendor/vendor.model");
const product_model_1 = require("./product.model");
// Add a new product (only vendor can add product)
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const vendorId = req.user._id; // assume vendor's user ID from auth middleware
        console.log(vendorId);
        const { name, image, category, description, brand, price, subcategory, discount, quantity, colors, images, features, warranty, shipping, tags, } = req.body;
        // Check if user is a vendor and owns a vendor record
        const vendor = yield vendor_model_1.Vendor.findOne({ owner: vendorId });
        if (!vendor) {
            return res.status(403).json({ message: 'Only registered vendors can add products' });
        }
        const newProduct = new product_model_1.Product({
            name,
            image,
            category,
            description,
            brand,
            price,
            subcategory,
            discount,
            quantity,
            colors,
            images,
            features,
            warranty,
            shipping,
            tags,
            vendor: vendor._id,
        });
        yield newProduct.save();
        // Add product reference to vendor's products array (optional)
        (_a = vendor.products) === null || _a === void 0 ? void 0 : _a.push(new mongoose_1.default.Types.ObjectId(newProduct._id));
        yield vendor.save();
        return res.status(201).json({ message: 'Product added successfully', data: newProduct });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error', error });
    }
});
exports.addProduct = addProduct;
// Get all products (public)
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_model_1.Product.find().populate('vendor', 'name');
        return res.status(200).json({ data: products });
    }
    catch (error) {
        return res.status(500).json({ message: 'Server Error', error });
    }
});
exports.getAllProducts = getAllProducts;
// Get single product by ID (public)
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid product ID' });
        }
        const product = yield product_model_1.Product.findById(id).populate('vendor', 'name');
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.status(200).json({ data: product });
    }
    catch (error) {
        return res.status(500).json({ message: 'Server Error', error });
    }
});
exports.getProduct = getProduct;
// Update product (vendor owner or admin)
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const userRole = req.user.role;
        const updates = req.body;
        // console.log(userId)
        // console.log(userRole)
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid product ID' });
        }
        const product = yield product_model_1.Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        // Check if user is admin or vendor owner
        if (userRole !== 'admin' && userRole !== 'vendor' && product.vendor.toString() !== userId) {
            return res.status(403).json({ message: 'You do not have permission to update this product' });
        }
        Object.assign(product, updates);
        yield product.save();
        return res.status(200).json({ message: 'Product updated successfully', data: product });
    }
    catch (error) {
        return res.status(500).json({ message: 'Server Error', error });
    }
});
exports.updateProduct = updateProduct;
// Delete product (vendor owner or admin)
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const userRole = req.user.role;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid product ID' });
        }
        const product = yield product_model_1.Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        if (userRole !== 'admin' && userRole !== "vendor" && product.vendor.toString() !== userId) {
            return res.status(403).json({ message: 'You do not have permission to delete this product' });
        }
        yield product.deleteOne();
        // Optional: remove product reference from vendor.products
        yield vendor_model_1.Vendor.findByIdAndUpdate(product.vendor, {
            $pull: { products: product._id }
        });
        return res.status(200).json({ message: 'Product deleted successfully' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Server Error', error });
    }
});
exports.deleteProduct = deleteProduct;
// Get all products by a specific vendor (only the vendor can access their products)
const getAllProductsByVendor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("heello")
    try {
        // console.log("heello inside")
        const vendorId = req.user._id;
        // console.log(vendorId)
        // Ensure the user is actually a vendor
        const vendor = yield vendor_model_1.Vendor.findOne({ owner: vendorId });
        // console.log(vendor, "vendor id")
        if (!vendor) {
            return res.status(403).json({ message: "Access denied. You are not a registered vendor." });
        }
        const products = yield product_model_1.Product.find({ vendor: vendor._id }).populate('vendor', 'name');
        return res.status(200).json({ data: products });
    }
    catch (error) {
        return res.status(500).json({ message: "Server Error", error });
    }
});
exports.getAllProductsByVendor = getAllProductsByVendor;
