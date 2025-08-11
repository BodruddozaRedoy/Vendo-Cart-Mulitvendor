import { Request, Response } from "express";
import mongoose, { Types } from "mongoose";
import Cart from "./cart.model";
import { Product } from "../products/product.model";

// Add or update product in cart
export const addToCart = async (req:Request, res:Response) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    const product = await Product.findById(productId).populate('vendor');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    console.log(product)

    let cart = await Cart.findOne({ userId, status: 'active' }).populate('products.productId');
    console.log(cart)
    if (!cart) {
      // New cart
      cart = await Cart.create({
        userId,
        products: [{ productId, quantity, price: product.price }],
        total: product.price * quantity,
        vendorId: product.vendor, // if storing
      });
      return res.json(cart);
    }

    // ✅ Check vendor consistency
    const existingVendorId = cart.vendorId || cart.products[0].productId.vendorId;
    if (existingVendorId.toString() !== product.vendorId.toString()) {
      return res.status(400).json({ message: 'You can only buy from one vendor at a time' });
    }

    // If same vendor → add/update product
    const existingProduct = cart.products.find(
      p => p.productId.toString() === productId
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ productId, quantity, price: product.price });
    }

    cart.total = cart.products.reduce((sum, p) => sum + p.price * p.quantity, 0);
    await cart.save();

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Get current user's cart
export const getCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId }).populate("products.productId");

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cart", details: err });
  }
};

// Update cart item quantity or product
export const updateCartItem = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });
// console.log(cart.products[0].productId.toString())
    const item = cart.products.find(
      (p) => p.productId.toString() === productId
    );
    console.log(item)
    if (!item)
      return res.status(404).json({ message: "Product not found in cart" });

    item.quantity = quantity;

    cart.total = cart.products.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    await cart.save();

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: "Failed to update cart", details: err });
  }
};

// Delete specific product from cart
export const deleteCartItem = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    const cart = await Cart.findOneAndUpdate(
      { userId },
      {
        $pull: {
          products: { productId: new mongoose.Types.ObjectId(productId) },
        },
      },
      { new: true }
    );

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // Recalculate total after item removal
    const updatedTotal = cart.products.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    cart.total = updatedTotal;
    await cart.save();

    res.status(200).json({ message: "Item deleted", cart });
  } catch (err) {
    res.status(500).json({
      error: "Failed to remove item from cart",
      details: err instanceof Error ? err.message : err,
    });
  }
};

// Optional: Clear entire cart
export const clearCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.products = [];
    cart.total = 0;
    await cart.save();

    res.status(200).json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ error: "Failed to clear cart", details: err });
  }
};
