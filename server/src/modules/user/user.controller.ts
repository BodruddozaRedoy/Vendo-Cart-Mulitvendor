import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { AppError } from "../../middleware/error.middleware";
import {
  IUser,
  ILoginUser,
  IUpdateUser,
  UserRoles,
} from "../../types/user.types";
import generateToken from "../../utils/generateToken";
import { User } from "./user.model";
import { Vendor } from "../vendor/vendor.model";
import bcrypt from "bcrypt";
import env from "../../config/env";

// @desc    Register a new user
// @route   POST /api/v1/users/register
// @access  Public
export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { fullName, email, password, role }: IUser = req.body;
    console.log(req.body);
    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new AppError("User already exists", 400);
    }

    const hashedPass = await bcrypt.hash(password, 10);

    // Prevent self-assignment of admin role
    const userRole = role === "admin" ? "user" : role || "user";

    const user = await User.create({
      fullName,
      email,
      password: hashedPass,
      role: userRole,
    });

    if (user) {
      generateToken(res, user._id as string);

      res.status(201).json({
        message: "User created",
        data: user
      });
    } else {
      throw new AppError("Invalid user data", 400);
    }
  }
);

// @desc    Authenticate user & get token
// @route   POST /api/v1/users/login
// @access  Public
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password }: ILoginUser = req.body;
  console.log(req.body)

  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isPassMatched = await bcrypt.compare(password, user.password);
  
  if (!isPassMatched) {
    throw new AppError("Password doesn't match", 401);
  }

  generateToken(res, user._id as string);

  user.password = null!

  res.json({
    message: "User logged in",
    data: user
  });
});

// @desc    Logout user / clear cookie
// @route   POST /api/v1/users/logout
// @access  Private
export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  // Clear the token cookie
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict", // Optional: enhances CSRF protection
    secure: process.env.NODE_ENV === "production", // Optional: only send over HTTPS in production
  });

  res.status(200).json({ message: "Successfully logged out." });
});

// @desc    Get user profile
// @route   GET /api/v1/users/me
// @access  Private
export const getMe = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.user?._id).select("-password");

  if (!user) {
    throw new AppError("User not found", 404);
  }

  // If user is a vendor, include vendor info
  let vendorInfo = null;
  if (user.role === "vendor") {
    vendorInfo = await Vendor.findOne({ owner: user._id });
  }

  res.status(200).json({
    message: "User fetched",
    data: {
    ...user.toObject(),
    vendorInfo,
  }
  });
});

// @desc    Update user profile
// @route   PUT /api/v1/users/
// @access  Private
export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const { fullName, email, phone, bio, address, picture }: IUpdateUser =
    req.body;

  const user = await User.findById(req.user?._id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  // Prevent email change to existing email
  if (email && email !== user.email) {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      throw new AppError("Email already in use", 400);
    }
  }

  user.fullName = fullName || user.fullName;
  user.email = email || user.email;
  user.phone = phone || user.phone;
  user.bio = bio || user.bio;
  user.address = address || user.address;
  user.picture = picture || user.picture;

  const updatedUser = await user.save();

  res.status(200).json({
    _id: updatedUser._id,
    fullName: updatedUser.fullName,
    email: updatedUser.email,
    role: updatedUser.role,
    isVerified: updatedUser.isVerified,
  });
});

// @desc    Delete user account
// @route   DELETE /api/v1/users/
// @access  Private
export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);

  console.log(req.params)

  if (!user) {
    throw new AppError("User not found", 404);
  }

  // If user is a vendor, delete their vendor profile first
  if (user.role === "vendor") {
    await Vendor.findOneAndDelete({ owner: user._id });
  }

  // Delete the user account
  await user.deleteOne();

  // Clear the auth token cookie
  // res.clearCookie("token", {
  //   httpOnly: true,
  //   sameSite: "strict",
  //   secure: process.env.NODE_ENV === "production",
  // });

  res.status(200).json({ message: "User deleted successfully" });
});

// ADMIN CONTROLLERS

// @desc    Get all users
// @route   GET /api/v1/users/
// @access  Private/Admin
export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.find().select("-password"); // Exclude password field

  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
});

// @desc    Get user by ID
// @route   GET /api/v1/users/:id
// @access  Private/Admin
export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id).select("-password");

  if (!user) {
    throw new AppError("User not found", 404);
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Update user by admin
// @route   PUT /api/v1/users/:id
// @access  Private/Admin
export const updateUserByAdmin = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    // Prevent changing admin's own role
    if (req.params.id === req.user?._id.toString() && req.body.role) {
      throw new AppError("Cannot change your own role", 400);
    }

    user.fullName = req.body.fullName || user.fullName;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;
    user.isVerified =
      req.body.isVerified !== undefined ? req.body.isVerified : user.isVerified;
    user.isActive =
      req.body.isActive !== undefined ? req.body.isActive : user.isActive;

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      fullName: updatedUser.fullName,
      email: updatedUser.email,
      role: updatedUser.role,
      isVerified: updatedUser.isVerified,
      isActive: updatedUser.isActive,
    });
  }
);

// @desc    Delete user by admin
// @route   DELETE /api/v1/users/:id
// @access  Private/Admin
export const deleteUserByAdmin = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    // Prevent admin from deleting themselves
    if (req.params.id === req.user?._id.toString()) {
      throw new AppError("Cannot delete yourself", 400);
    }

    // If user is a vendor, delete vendor profile first
    if (user.role === "vendor") {
      await Vendor.findOneAndDelete({ owner: user._id });
    }

    await user.deleteOne();

    res.status(200).json({ message: "User removed" });
  }
);

// @desc    Toggle user active status
// @route   PUT /api/v1/users/:id/active
// @access  Private/Admin
export const toggleUserActiveStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    // Prevent deactivating yourself
    if (req.params.id === req.user?._id.toString()) {
      throw new AppError("Cannot deactivate yourself", 400);
    }

    user.isActive = !user.isActive;
    await user.save();

    res.status(200).json({
      message: `User ${
        user.isActive ? "activated" : "deactivated"
      } successfully`,
      isActive: user.isActive,
    });
  }
);
