import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
// import Product from '../../models/product.model';
import { AppError } from '../../middleware/error.middleware';
import { IProduct, ICreateProduct, IUpdateProduct } from '../../types/product.types';
import { Product } from './product.model';

// @desc    Create a product
// @route   POST /api/v1/products
// @access  Private (vendor/admin)
export const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const { name, image, category, description, brand, price }: ICreateProduct = req.body;

  // Check if vendor exists
  if (!req.user) {
    throw new AppError('Vendor not authenticated', 401);
  }

  // Basic validation
  if (!name || !image || !category || !description || !brand || !price) {
    throw new AppError('Please include all required fields', 400);
  }

  const product = await Product.create({
    name,
    image,
    category,
    description,
    brand,
    price,
    vendor: req.user._id,
    ...req.body // Include other optional fields
  });

  res.status(201).json({
    success: true,
    data: product
  });
});

// @desc    Get all products
// @route   GET /api/v1/products
// @access  Public
export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  // Filtering
  const queryObj = { ...req.query };
  const excludedFields = ['page', 'sort', 'limit', 'fields'];
  excludedFields.forEach(el => delete queryObj[el]);

  // Advanced filtering
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

  let query = Product.find(JSON.parse(queryStr)).populate('vendor', 'name logo');

  // Sorting
  if (req.query.sort) {
    const sortBy = (req.query.sort as string).split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Field limiting
  if (req.query.fields) {
    const fields = (req.query.fields as string).split(',').join(' ');
    query = query.select(fields);
  } else {
    query = query.select('-__v');
  }

  // Pagination
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 25;
  const skip = (page - 1) * limit;

  query = query.skip(skip).limit(limit);

  const products = await query;

  res.status(200).json({
    success: true,
    count: products.length,
    data: products
  });
});

// @desc    Get single product
// @route   GET /api/v1/products/:id
// @access  Public
export const getProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id).populate('vendor', 'name logo rating');

  if (!product) {
    throw new AppError('Product not found', 404);
  }

  res.status(200).json({
    success: true,
    data: product
  });
});

// @desc    Update product
// @route   PUT /api/v1/products/:id
// @access  Private (vendor/admin)
export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const { name, price, description }: IUpdateProduct = req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new AppError('Product not found', 404);
  }

  // Check ownership (vendor can only update their own products)
  if (product.vendor.toString() !== req.user?._id.toString() && req.user?.role !== 'admin') {
    throw new AppError('Not authorized to update this product', 401);
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    data: updatedProduct
  });
});

// @desc    Delete product
// @route   DELETE /api/v1/products/:id
// @access  Private (vendor/admin)
export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new AppError('Product not found', 404);
  }

  // Check ownership (vendor can only delete their own products)
  if (product.vendor.toString() !== req.user?._id.toString() && req.user?.role !== 'admin') {
    throw new AppError('Not authorized to delete this product', 401);
  }

  await product.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get products by vendor
// @route   GET /api/v1/products/vendor/:vendorId
// @access  Public
export const getProductsByVendor = asyncHandler(async (req: Request, res: Response) => {
  const products = await Product.find({ vendor: req.params.vendorId });

  res.status(200).json({
    success: true,
    count: products.length,
    data: products
  });
});