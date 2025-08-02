import { Request, Response } from 'express';
// import Vendor from '../../models/vendor.model';
// import User from '../../models/user.model';
import asyncHandler from 'express-async-handler';
import { Vendor } from './vendor.model';
import { User } from '../user/user.model';

// @desc    Register a new vendor
// @route   POST /api/v1/vendors
// @access  Private
export const registerVendor = asyncHandler(async (req: Request, res: Response) => {
  const { name, logo, address, contactMail } = req.body;
  const userId = req.user._id;

  // Check if user is already a vendor
  const existingVendor = await Vendor.findOne({ owner: userId });
  if (existingVendor) {
    res.status(400);
    throw new Error('User is already a vendor');
  }

  // Update user role to vendor
  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  user.role = 'vendor';
  await user.save();

  const vendor = await Vendor.create({
    name,
    logo,
    address,
    contactMail,
    owner: userId
  });

  res.status(201).json(vendor);
});

// Other vendor controller methods...