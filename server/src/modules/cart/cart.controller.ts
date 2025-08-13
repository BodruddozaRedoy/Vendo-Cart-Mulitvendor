import { Request, Response } from "express";
import mongoose, { Types } from "mongoose";
import Cart from "./cart.model";
import { Product } from "../products/product.model";

// Add or update product in cart
export const addToCart = async (req: Request, res: Response) => {
  try {
    const { productId, quantity, vendorId } = req.body;
    const userId = req.user.id;
    // console.log("user", userId)
    // Validate quantity
    if (!quantity || quantity <= 0) {
      return res.status(400).json({ message: "Quantity must be greater than 0" });
    }

    if(!vendorId){
      return res.status(400).json({ message: "Vendor id must be required" });
    }

    // Check product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check stock
    if (product.quantity !== undefined && product.quantity < quantity) {
      return res.status(400).json({
        message: `Only ${product.quantity} items available in stock. Requested: ${quantity}`,
      });
    }

    // Find existing cart for user
    let cart = await Cart.findOne({ userId, status: "active" });

    if (!cart) {
      // Create a new cart if none exists
      cart = await Cart.create({
        userId,
        vendorId,
        products: [{ productId, quantity, price: product.price }],
        total: product.price * quantity,
      });
      return res.json(cart);
    }

    // Check if product already exists in cart
    const existingProduct = cart.products.find(
      (p) => p.productId.toString() === productId
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ productId, quantity, price: product.price });
    }

    // Update total
    cart.total = cart.products.reduce(
      (sum, p) => sum + p.price * p.quantity,
      0
    );

    await cart.save();
    res.json(cart);

  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};


// Get current user's cart
export const getCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId }).populate("products.productId");

    if (!cart) return res.status(404).json({ message: "Cart not found" });
    console.log(cart)
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cart", details: err });
  }
};

// Get cart summary with vendor information
export const getCartSummary = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId })
      .populate("products.productId")
      .populate("vendorId", "name email");

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const summary = {
      cartId: cart._id,
      totalItems: cart.products.reduce((sum, item) => sum + item.quantity, 0),
      totalPrice: cart.total,
      vendor: cart.vendorId ? {
        id: cart.vendorId,
        name: (cart.vendorId as any).name,
        email: (cart.vendorId as any).email
      } : null,
      products: cart.products.map(item => ({
        productId: item.productId,
        name: (item.productId as any).name,
        quantity: item.quantity,
        price: item.price,
        subtotal: item.price * item.quantity
      })),
      status: cart.status
    };

    res.status(200).json(summary);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cart summary", details: err });
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
    // console.log(req.user)
    // const userId = req.user_.id;
    const cartId = req.params.id
    console.log(cartId)
    if(!cartId){
      return res.status(404).json({ message: "Cart id not found" });
    }
    const cart = await Cart.findOneAndDelete({ _id:cartId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // cart.products = [];
    // cart.total = 0;
    // cart.vendorId = undefined; // Reset vendorId when clearing cart
    // await cart.save();

    
    res.status(200).json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ error: "Failed to clear cart", details: err });
  }
};

// Clear cart and allow switching to different vendor
export const clearCartForNewVendor = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.products = [];
    cart.total = 0;
    cart.vendorId = undefined; // Reset vendorId to allow new vendor
    await cart.save();

    res.status(200).json({ 
      message: "Cart cleared. You can now add products from a different vendor." 
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to clear cart", details: err });
  }
};
