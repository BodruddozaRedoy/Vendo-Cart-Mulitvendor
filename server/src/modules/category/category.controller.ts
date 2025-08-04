import { Request, Response } from 'express'
import { Category } from './category.model'
// import { Category } from '../models/category.model'

// Create Category
export const createCategory = async (req: Request, res: Response) => {
  try {
    const category = new Category(req.body)
    await category.save()
    res.status(201).json({ success: true, data: category })
  } catch (error) {
    res.status(400).json({ success: false, message: error })
  }
}

// Get All Categories
export const getAllCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await Category.find()
    res.status(200).json({ success: true, data: categories })
  } catch (error) {
    res.status(500).json({ success: false, message: error })
  }
}

// Get Single Category by ID
export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const category = await Category.findById(req.params.id)
    if (!category) return res.status(404).json({ success: false, message: 'Category not found' })

    res.status(200).json({ success: true, data: category })
  } catch (error) {
    res.status(500).json({ success: false, message: error })
  }
}

// Update Category
export const updateCategory = async (req: Request, res: Response) => {
  try {
    const updated = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updated) return res.status(404).json({ success: false, message: 'Category not found' })

    res.status(200).json({ success: true, data: updated })
  } catch (error) {
    res.status(500).json({ success: false, message: error })
  }
}

// Delete Category
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ success: false, message: 'Category not found' })

    res.status(200).json({ success: true, message: 'Category deleted successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: error })
  }
}
