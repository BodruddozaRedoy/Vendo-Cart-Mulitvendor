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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.getCategoryById = exports.getAllCategories = exports.createCategory = void 0;
const category_model_1 = require("./category.model");
// import { Category } from '../models/category.model'
// Create Category
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = new category_model_1.Category(req.body);
        yield category.save();
        res.status(201).json({ success: true, data: category });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error });
    }
});
exports.createCategory = createCategory;
// Get All Categories
const getAllCategories = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield category_model_1.Category.find();
        res.status(200).json({ success: true, data: categories });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error });
    }
});
exports.getAllCategories = getAllCategories;
// Get Single Category by ID
const getCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield category_model_1.Category.findById(req.params.id);
        if (!category)
            return res.status(404).json({ success: false, message: 'Category not found' });
        res.status(200).json({ success: true, data: category });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error });
    }
});
exports.getCategoryById = getCategoryById;
// Update Category
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updated = yield category_model_1.Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated)
            return res.status(404).json({ success: false, message: 'Category not found' });
        res.status(200).json({ success: true, data: updated });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error });
    }
});
exports.updateCategory = updateCategory;
// Delete Category
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield category_model_1.Category.findByIdAndDelete(req.params.id);
        if (!deleted)
            return res.status(404).json({ success: false, message: 'Category not found' });
        res.status(200).json({ success: true, message: 'Category deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error });
    }
});
exports.deleteCategory = deleteCategory;
