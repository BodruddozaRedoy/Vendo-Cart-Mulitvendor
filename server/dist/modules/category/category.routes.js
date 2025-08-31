"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("../category/category.controller");
const auth_middleware_1 = require("../auth/auth.middleware");
const router = express_1.default.Router();
router.post('/', auth_middleware_1.protect, auth_middleware_1.admin, category_controller_1.createCategory);
router.get('/', category_controller_1.getAllCategories);
router.get('/:id', auth_middleware_1.protect, auth_middleware_1.admin, category_controller_1.getCategoryById);
router.put('/:id', auth_middleware_1.protect, auth_middleware_1.admin, category_controller_1.updateCategory);
router.delete('/:id', auth_middleware_1.protect, auth_middleware_1.admin, category_controller_1.deleteCategory);
exports.default = router;
