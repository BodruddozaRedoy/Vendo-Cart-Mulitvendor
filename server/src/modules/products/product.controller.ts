import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Vendor } from '../vendor/vendor.model';
import { Product } from './product.model';


// Add a new product (only vendor can add product)
export const addProduct = async (req: Request, res: Response) => {
  try {
    const vendorId = req.user._id; // assume vendor's user ID from auth middleware
    console.log(vendorId)
    const {
      name,
      image,
      category,
      description,
      brand,
      price,
      subcategory,
      discount,
      quantity,
      colors,
      images,
      features,
      warranty,
      shipping,
      tags,
    } = req.body;

    // Check if user is a vendor and owns a vendor record
    const vendor = await Vendor.findOne({ owner: vendorId });
    if (!vendor) {
      return res.status(403).json({ message: 'Only registered vendors can add products' });
    }

    const newProduct = new Product({
      name,
      image,
      category,
      description,
      brand,
      price,
      subcategory,
      discount,
      quantity,
      colors,
      images,
      features,
      warranty,
      shipping,
      tags,
      vendor: vendor._id,
    });

    await newProduct.save();

    // Add product reference to vendor's products array (optional)
    vendor.products?.push(new mongoose.Types.ObjectId(newProduct._id));
    await vendor.save();

    return res.status(201).json({ message: 'Product added successfully', data: newProduct });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error', error });
  }
};

// Get all products (public)
export const getAllProducts = async (req: Request, res: Response) => {

  try {
    const products = await Product.find().populate('vendor', 'name');
    return res.status(200).json({ data: products });
  } catch (error) {
    return res.status(500).json({ message: 'Server Error', error });
  }
};

// Get single product by ID (public)
export const getProduct = async (req: Request, res: Response) => {

  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    const product = await Product.findById(id).populate('vendor', 'name');

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json({ data: product });
  } catch (error) {
    return res.status(500).json({ message: 'Server Error', error });
  }
};

// Update product (vendor owner or admin)
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const userRole = req.user.role;
    const updates = req.body;
    // console.log(userId)
    // console.log(userRole)

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if user is admin or vendor owner
    if (userRole !== 'admin' && userRole !== 'vendor' && product.vendor.toString() !== userId) {
      return res.status(403).json({ message: 'You do not have permission to update this product' });
    }

    Object.assign(product, updates);
    await product.save();

    return res.status(200).json({ message: 'Product updated successfully', data: product });
  } catch (error) {
    return res.status(500).json({ message: 'Server Error', error });
  }
};

// Delete product (vendor owner or admin)
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const userRole = req.user.role;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (userRole !== 'admin' && userRole !== "vendor" && product.vendor.toString() !== userId) {
      return res.status(403).json({ message: 'You do not have permission to delete this product' });
    }

    await product.deleteOne();

    // Optional: remove product reference from vendor.products
    await Vendor.findByIdAndUpdate(product.vendor, {
      $pull: { products: product._id }
    });

    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server Error', error });
  }
};

// Get all products by a specific vendor (only the vendor can access their products)
export const getAllProductsByVendor = async (req: Request, res: Response) => {
  // console.log("heello")
  try {
  // console.log("heello inside")

    const vendorId = req.user._id;
    console.log(vendorId)

    // Ensure the user is actually a vendor
    const vendor = await Vendor.findOne({ owner: vendorId });
    console.log(vendor, "vendor id")
    if (!vendor) {
      return res.status(403).json({ message: "Access denied. You are not a registered vendor." });
    }

    const products = await Product.find({ vendor: vendor._id }).populate('vendor', 'name');

    return res.status(200).json({ data: products });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error });
  }
};

