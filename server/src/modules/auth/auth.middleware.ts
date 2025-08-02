import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
// import env from '../config/env';
// import User from '../models/user.model';
import asyncHandler from 'express-async-handler';
import env from '../../config/env';
import { User } from '../user/user.model';

interface JwtPayload {
  userId: string;
}

// Extend Express Request interface
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

// Protect routes
export const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  let token;
  console.log(req.cookies.token, "token")

  if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    res.status(401);
    throw new Error('No token found');
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

    // Get user from the token
    req.user = await User.findById(decoded.userId).select('-password');

    next();
  } catch (error) {
    res.status(401);
    throw new Error('Not authorized');
  }
});

// Admin middleware
export const admin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};

// Vendor middleware
export const vendor = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && (req.user.role === 'vendor' || req.user.role === 'admin')) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as a vendor');
  }
};