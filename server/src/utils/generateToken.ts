import jwt from 'jsonwebtoken';
import { Response } from 'express';
import env from '../config/env';

const generateToken = (res: Response, userId: string) => {
  const token = jwt.sign({ userId:userId }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRE
  });
  

  // Set JWT as HTTP-Only cookie
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
  });
};

export default generateToken;