"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("../config/env"));
const generateToken = (res, userId) => {
    const secret = env_1.default.JWT_SECRET;
    const expiresIn = (env_1.default.JWT_EXPIRE || '30d');
    const token = jsonwebtoken_1.default.sign({ userId }, secret, { expiresIn });
    // Set JWT as HTTP-Only cookie
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    });
};
exports.default = generateToken;
