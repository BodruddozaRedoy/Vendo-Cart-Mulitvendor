"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = express_1.default.Router();
router.post('/register', user_controller_1.registerUser);
router.post('/login', user_controller_1.loginUser);
router.get('/me', auth_middleware_1.protect, user_controller_1.getMe);
router.put('/', auth_middleware_1.protect, user_controller_1.updateUser);
router.delete('/', auth_middleware_1.protect, user_controller_1.deleteUser);
// Admin routes
router.get('/', auth_middleware_1.protect, auth_middleware_1.admin, user_controller_1.getAllUsers);
router.put('/:id', auth_middleware_1.protect, auth_middleware_1.admin, user_controller_1.updateUserByAdmin);
router.delete('/:id', auth_middleware_1.protect, auth_middleware_1.admin, user_controller_1.deleteUserByAdmin);
exports.default = router;
