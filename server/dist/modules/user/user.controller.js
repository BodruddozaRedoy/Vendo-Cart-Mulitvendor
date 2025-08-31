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
exports.toggleUserActiveStatus = exports.deleteUserByAdmin = exports.updateUserByAdmin = exports.getUserById = exports.getAllUsers = exports.deleteUser = exports.updateUser = exports.getMe = exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const error_middleware_1 = require("../../middleware/error.middleware");
const generateToken_1 = __importDefault(require("../../utils/generateToken"));
const user_model_1 = require("./user.model");
const vendor_model_1 = require("../vendor/vendor.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
// @desc    Register a new user
// @route   POST /api/v1/users/register
// @access  Public
exports.registerUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullName, email, password, role } = req.body;
    // console.log(req.body);
    // Check if user exists
    const userExists = yield user_model_1.User.findOne({ email });
    if (userExists) {
        throw new error_middleware_1.AppError("User already exists", 400);
    }
    const hashedPass = yield bcrypt_1.default.hash(password, 10);
    // Prevent self-assignment of admin role
    const userRole = role === "admin" ? "user" : role || "user";
    const user = yield user_model_1.User.create({
        fullName,
        email,
        password: hashedPass,
        role: userRole,
    });
    if (user) {
        (0, generateToken_1.default)(res, user._id.toString());
        res.status(201).json({
            message: "User created",
            data: user
        });
    }
    else {
        throw new error_middleware_1.AppError("Invalid user data", 400);
    }
}));
// @desc    Authenticate user & get token
// @route   POST /api/v1/users/login
// @access  Public
exports.loginUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // console.log(req.body)
    const user = yield user_model_1.User.findOne({ email });
    if (!user) {
        throw new error_middleware_1.AppError("Invalid email or password", 401);
    }
    const isPassMatched = yield bcrypt_1.default.compare(password, user.password);
    if (!isPassMatched) {
        throw new error_middleware_1.AppError("Password doesn't match", 401);
    }
    (0, generateToken_1.default)(res, user._id.toString());
    user.password = null;
    res.json({
        message: "User logged in",
        data: user
    });
}));
// @desc    Logout user / clear cookie
// @route   POST /api/v1/users/logout
// @access  Private
exports.logoutUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Clear the token cookie
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "strict", // Optional: enhances CSRF protection
        secure: process.env.NODE_ENV === "production", // Optional: only send over HTTPS in production
    });
    res.status(200).json({ message: "Successfully logged out." });
}));
// @desc    Get user profile
// @route   GET /api/v1/users/me
// @access  Private
exports.getMe = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield user_model_1.User.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id).select("-password");
    if (!user) {
        throw new error_middleware_1.AppError("User not found", 404);
    }
    // If user is a vendor, include vendor info
    let vendorInfo = null;
    if (user.role === "vendor") {
        vendorInfo = yield vendor_model_1.Vendor.findOne({ owner: user._id });
    }
    res.status(200).json({
        message: "User fetched",
        data: Object.assign(Object.assign({}, user.toObject()), { vendorInfo })
    });
}));
// @desc    Update user profile
// @route   PUT /api/v1/users/
// @access  Private
exports.updateUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { fullName, email, phone, bio, address, picture } = req.body;
    const user = yield user_model_1.User.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
    if (!user) {
        throw new error_middleware_1.AppError("User not found", 404);
    }
    // Prevent email change to existing email
    if (email && email !== user.email) {
        const emailExists = yield user_model_1.User.findOne({ email });
        if (emailExists) {
            throw new error_middleware_1.AppError("Email already in use", 400);
        }
    }
    user.fullName = fullName || user.fullName;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.bio = bio || user.bio;
    user.address = address || user.address;
    user.picture = picture || user.picture;
    const updatedUser = yield user.save();
    res.status(200).json({
        _id: updatedUser._id,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        role: updatedUser.role,
        isVerified: updatedUser.isVerified,
    });
}));
// @desc    Delete user account
// @route   DELETE /api/v1/users/
// @access  Private
exports.deleteUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(req.params.id);
    // console.log(req.params)
    if (!user) {
        throw new error_middleware_1.AppError("User not found", 404);
    }
    // If user is a vendor, delete their vendor profile first
    if (user.role === "vendor") {
        yield vendor_model_1.Vendor.findOneAndDelete({ owner: user._id });
    }
    // Delete the user account
    yield user.deleteOne();
    // Clear the auth token cookie
    // res.clearCookie("token", {
    //   httpOnly: true,
    //   sameSite: "strict",
    //   secure: process.env.NODE_ENV === "production",
    // });
    res.status(200).json({ message: "User deleted successfully" });
}));
// ADMIN CONTROLLERS
// @desc    Get all users
// @route   GET /api/v1/users/
// @access  Private/Admin
exports.getAllUsers = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.User.find().select("-password"); // Exclude password field
    res.status(200).json({
        success: true,
        count: users.length,
        data: users,
    });
}));
// @desc    Get user by ID
// @route   GET /api/v1/users/:id
// @access  Private/Admin
exports.getUserById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(req.params.id).select("-password");
    if (!user) {
        throw new error_middleware_1.AppError("User not found", 404);
    }
    res.status(200).json({
        success: true,
        data: user,
    });
}));
// @desc    Update user by admin
// @route   PUT /api/v1/users/:id
// @access  Private/Admin
exports.updateUserByAdmin = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield user_model_1.User.findById(req.params.id);
    if (!user) {
        throw new error_middleware_1.AppError("User not found", 404);
    }
    // Prevent changing admin's own role
    if (req.params.id === ((_a = req.user) === null || _a === void 0 ? void 0 : _a._id.toString()) && req.body.role) {
        throw new error_middleware_1.AppError("Cannot change your own role", 400);
    }
    user.fullName = req.body.fullName || user.fullName;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;
    user.isVerified =
        req.body.isVerified !== undefined ? req.body.isVerified : user.isVerified;
    user.isActive =
        req.body.isActive !== undefined ? req.body.isActive : user.isActive;
    const updatedUser = yield user.save();
    res.status(200).json({
        _id: updatedUser._id,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        role: updatedUser.role,
        isVerified: updatedUser.isVerified,
        isActive: updatedUser.isActive,
    });
}));
// @desc    Delete user by admin
// @route   DELETE /api/v1/users/:id
// @access  Private/Admin
exports.deleteUserByAdmin = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield user_model_1.User.findById(req.params.id);
    if (!user) {
        throw new error_middleware_1.AppError("User not found", 404);
    }
    // Prevent admin from deleting themselves
    if (req.params.id === ((_a = req.user) === null || _a === void 0 ? void 0 : _a._id.toString())) {
        throw new error_middleware_1.AppError("Cannot delete yourself", 400);
    }
    // If user is a vendor, delete vendor profile first
    if (user.role === "vendor") {
        yield vendor_model_1.Vendor.findOneAndDelete({ owner: user._id });
    }
    yield user.deleteOne();
    res.status(200).json({ message: "User removed" });
}));
// @desc    Toggle user active status
// @route   PUT /api/v1/users/:id/active
// @access  Private/Admin
exports.toggleUserActiveStatus = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield user_model_1.User.findById(req.params.id);
    if (!user) {
        throw new error_middleware_1.AppError("User not found", 404);
    }
    // Prevent deactivating yourself
    if (req.params.id === ((_a = req.user) === null || _a === void 0 ? void 0 : _a._id.toString())) {
        throw new error_middleware_1.AppError("Cannot deactivate yourself", 400);
    }
    user.isActive = !user.isActive;
    yield user.save();
    res.status(200).json({
        message: `User ${user.isActive ? "activated" : "deactivated"} successfully`,
        isActive: user.isActive,
    });
}));
