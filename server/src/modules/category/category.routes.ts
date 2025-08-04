import express from 'express'
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} from '../category/category.controller'
import { admin, protect } from '../auth/auth.middleware'

const router = express.Router()

router.post('/', protect, admin, createCategory)
router.get('/', protect, admin, getAllCategories)
router.get('/:id', protect, admin, getCategoryById)
router.put('/:id', protect, admin, updateCategory)
router.delete('/:id', protect, admin, deleteCategory)

export default router
