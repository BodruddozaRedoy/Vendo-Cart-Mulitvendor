import mongoose, { Document, Schema } from 'mongoose';
import { IVendor } from '../../types';

interface IVendorModel extends IVendor, Document {}

const vendorSchema = new Schema<IVendorModel>({
  name: { type: String, required: true },
  logo: { type: String, required: true },
  rating: { type: Number, default: 0 },
  reviewsCount: { type: Number, default: 0 },
  isVerified: { type: Boolean, default: false },
  address: { type: String, required: true },
  contactMail: { type: String, required: true },
  phone: {type: String, required: true},
  description: {type: String, required: true},
  joinedAt: { type: Date, default: Date.now },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual populate for products
vendorSchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'vendor',
});

export const Vendor = mongoose.model<IVendorModel>('Vendor', vendorSchema);
