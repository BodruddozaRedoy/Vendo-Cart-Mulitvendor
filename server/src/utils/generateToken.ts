import jwt, { type Secret } from 'jsonwebtoken';
import type { StringValue } from 'ms';
import { Response } from 'express';
import env from '../config/env';

const generateToken = (res: Response, userId: string) => {
  const secret: Secret = env.JWT_SECRET as unknown as Secret;
  const expiresIn: StringValue | number = (env.JWT_EXPIRE || '30d') as StringValue;
  const token = jwt.sign({ userId }, secret, { expiresIn });
  

  // Set JWT as HTTP-Only cookie
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
  });
};

export default generateToken;
