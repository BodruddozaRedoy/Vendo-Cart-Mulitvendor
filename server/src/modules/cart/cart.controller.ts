import { Request, Response } from "express";
import { Types } from "mongoose";
import Cart from "./cart.model";
import { Product } from "../products/product.model";

// Add or update product in cart
export const addToCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required." });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    const quantity = 1; // Default quantity
    const price = product.price; // Get price from DB

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create new cart
      cart = new Cart({
        userId,
        products: [{ productId, quantity, price }],
        total: quantity * price,
      });
    } else {
      // Check if product already in cart
      const existingProduct = cart.products.find((p) =>
        p.productId.toString() === productId
      );

      if (existingProduct) {
        // Increment quantity
        existingProduct.quantity += 1;
      } else {
        cart.products.push({ productId, quantity, price });
      }

      // Recalculate total
      cart.total = cart.products.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({
      error: "Failed to add to cart",
      details: err instanceof Error ? err.message : err,
    });
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

    const item = cart.products.find(
      (p) => p.productId.toString() === productId
    );
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

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.products = cart.products.filter(
      (p) => p.productId.toString() !== productId
    );
    cart.total = cart.products.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    await cart.save();

    res.status(200).json({ message: "Item deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to remove item from cart", details: err });
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
