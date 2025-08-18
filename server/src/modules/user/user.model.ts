import mongoose, { Document, Schema, Types } from 'mongoose';
import { IAddress, IUser } from '../../types';
// import { IUser, IAddress } from '../../types/user.types';

interface IUserModel extends IUser, Document {
  _id: Types.ObjectId,
  name: string
}

const addressSchema = new Schema<IAddress>({
  home: { type: String },
  delivery: { type: String }
});

const userSchema = new Schema<IUserModel>({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  bio: { type: String },
  address: addressSchema,
  role: { type: String, enum: ['admin', 'vendor', 'user'], default: 'user' },
  picture: { type: String },
  isVerified: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

export const User = mongoose.model<IUserModel>('User', userSchema);