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
exports.vendor = exports.admin = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import env from '../config/env';
// import User from '../models/user.model';
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const env_1 = __importDefault(require("../../config/env"));
const user_model_1 = require("../user/user.model");
// Protect routes
exports.protect = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    // console.log(req.cookies.token, "token")
    if (req.cookies.token) {
        token = req.cookies.token;
    }
    if (!token) {
        res.status(401);
        throw new Error('No token found');
    }
    try {
        // Verify token
        const decoded = jsonwebtoken_1.default.verify(token, env_1.default.JWT_SECRET);
        // Get user from the token
        req.user = yield user_model_1.User.findById(decoded.userId).select('-password');
        next();
    }
    catch (error) {
        res.status(401);
        throw new Error('Not authorized');
    }
}));
// Admin middleware
const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    }
    else {
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
};
exports.admin = admin;
// Vendor middleware
const vendor = (req, res, next) => {
    if (req.user && (req.user.role === 'vendor' || req.user.role === 'admin')) {
        next();
    }
    else {
        res.status(401);
        throw new Error('Not authorized as a vendor');
    }
};
exports.vendor = vendor;
