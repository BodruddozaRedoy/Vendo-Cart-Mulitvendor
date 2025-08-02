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
exports.registerUser = void 0;
// import User from '../../models/user.model';
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const generateToken_1 = __importDefault(require("../../utils/generateToken"));
const user_model_1 = require("./user.model");
// import generateToken from '../../utils/generateToken';
// @desc    Register a new user
// @route   POST /api/v1/users/register
// @access  Public
exports.registerUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullName, email, password, role } = req.body;
    const userExists = yield user_model_1.User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }
    const user = yield user_model_1.User.create({
        fullName,
        email,
        password,
        role: role || 'user'
    });
    if (user) {
        (0, generateToken_1.default)(res, user._id);
        res.status(201).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            isVerified: user.isVerified
        });
    }
    else {
        res.status(400);
        throw new Error('Invalid user data');
    }
}));
// Other controller methods...
