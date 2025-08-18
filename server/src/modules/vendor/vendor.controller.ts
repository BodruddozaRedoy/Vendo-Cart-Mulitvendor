import { Request, Response } from "express";
// import { Vendor } from '../models/vendor.model';
// import { User } from '../models/user.model'; // Assuming User model is available
import mongoose from "mongoose";
import { Vendor } from "./vendor.model";
import { Product } from "../products/product.model";
import { User } from "../user/user.model";
import { Order } from "../order/order.model";
import { IUser } from "../../types";

// Register a new vendor
export const registerVendor = async (req: Request, res: Response) => {
  try {
    const { name, logo, address, contactMail, owner, description, phone } =
      req.body;

    if (!name || !logo || !address || !contactMail || !owner) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided." });
    }

    const existingVendor = await Vendor.findOne({ owner });
    if (existingVendor) {
      return res
        .status(400)
        .json({ message: "Vendor already registered for this owner." });
    }

    // Update user role to 'vendor'
    const updatedUser = await User.findByIdAndUpdate(
      owner,
      { role: "vendor" },
      { new: true }
    );
    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "User not found to assign vendor role." });
    }

    const newVendor = await Vendor.create({
      name,
      logo,
      address,
      contactMail,
      owner,
      description,
      phone,
    });

    return res
      .status(201)
      .json({ message: "Vendor registered successfully", data: newVendor });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error", error });
  }
};

// Get all vendors
export const getVendors = async (req: Request, res: Response) => {
  try {
    const vendors = await Vendor.find()
      .populate("owner", "name email")
      .populate("products");
    return res.status(200).json({ data: vendors });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error });
  }
};

// Get single vendor by ID
export const getVendor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid vendor ID" });
    }

    const vendor = await Vendor.findById(id)
      .populate("owner", "name email")
      .populate("products");

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    return res.status(200).json({ data: vendor });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error });
  }
};

// Update vendor by ID
export const updateVendor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid vendor ID" });
    }

    const updatedVendor = await Vendor.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedVendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    return res
      .status(200)
      .json({ message: "Vendor updated successfully", data: updatedVendor });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error });
  }
};

// Delete vendor by ID
export const deleteVendor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid vendor ID" });
    }

    const deletedVendor = await Vendor.findByIdAndDelete(id);

    if (!deletedVendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    return res.status(200).json({ message: "Vendor deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error });
  }
};

// Approve vendor (set isVerified to true)
export const approveVendor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid vendor ID" });
    }

    const approvedVendor = await Vendor.findByIdAndUpdate(
      id,
      { isVerified: true },
      { new: true }
    );

    if (!approvedVendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    return res
      .status(200)
      .json({ message: "Vendor approved successfully", data: approvedVendor });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error });
  }
};

export const getVendorProducts = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid vendor ID" });
    }

    const products = await Product.find({ vendor: id });

    return res.status(200).json({ data: products });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error", error });
  }
};

export const getVendorCustomers = async (req: Request, res: Response) => {
  try {
    const { _id: userId } = req.user;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // 1. Find vendor by owner (userId)
    const vendor = await Vendor.findOne({ owner: userId }).select("_id");
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found for this user" });
    }

    // 2. Get vendor's product IDs
    const vendorProducts = await Product.find({ vendor: vendor._id }).select("_id");
    const productIds = vendorProducts.map(p => p._id);

    if (productIds.length === 0) {
      return res.status(200).json({ data: [], message: "This vendor has no products" });
    }

    // 3. Find orders that contain vendor products and group by userId
    const orders = await Order.aggregate([
      { $match: { "products.product": { $in: productIds } } },
      {
        $group: {
          _id: "$userId",
          ordersCount: { $sum: 1 },
          totalSpent: { $sum: "$totalAmount" },
          lastOrderDate: { $max: "$createdAt" }
        }
      }
    ]);

    if (orders.length === 0) {
      return res.status(200).json({ data: [], message: "This vendor has no orders" });
    }

    const userIds = orders.map(o => o._id);

    // 4. Fetch user details
    const users = await User.find({ _id: { $in: userIds } }).select("-password");

    // 5. Combine user info and orders summary
    const customers = users.map(user => {
      const orderInfo = orders.find(o => o._id.toString() === user._id.toString());
      return {
        _id: user._id,
        name: user.fullName,
        email: user.email,
        isActive: true, // or compute based on lastOrderDate or user.status
        createdAt: user.createdAt,
        lastOrder: orderInfo?.lastOrderDate,
        totalSpent: orderInfo ? `$${orderInfo.totalSpent.toFixed(2)}` : "$0.00",
        orders: orderInfo ? orderInfo.ordersCount : 0
      };
    });

    return res.status(200).json(customers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error });
  }
};

