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
exports.registerVendor = void 0;
// import Vendor from '../../models/vendor.model';
// import User from '../../models/user.model';
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const vendor_model_1 = require("./vendor.model");
// @desc    Register a new vendor
// @route   POST /api/v1/vendors
// @access  Private
exports.registerVendor = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, logo, address, contactMail } = req.body;
    const userId = req.user._id;
    // Check if user is already a vendor
    const existingVendor = yield vendor_model_1.Vendor.findOne({ owner: userId });
    if (existingVendor) {
        res.status(400);
        throw new Error('User is already a vendor');
    }
    // Update user role to vendor
    const user = yield User.findById(userId);
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }
    user.role = 'vendor';
    yield user.save();
    const vendor = yield vendor_model_1.Vendor.create({
        name,
        logo,
        address,
        contactMail,
        owner: userId
    });
    res.status(201).json(vendor);
}));
// Other vendor controller methods...
