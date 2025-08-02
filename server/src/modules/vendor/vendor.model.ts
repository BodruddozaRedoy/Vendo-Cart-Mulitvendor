import mongoose, { Document, Schema } from 'mongoose';
import { IVendor } from '../../types';
// import { IVendor, IProduct } from '../../types/vendor.types';

interface IVendorModel extends IVendor, Document {}

const vendorSchema = new Schema<IVendorModel>({
  name: { type: String, required: true },
  logo: { type: String, required: true },
  rating: { type: Number, default: 0 },
  reviewsCount: { type: Number, default: 0 },
  isVerified: { type: Boolean, default: false },
  address: { type: String, required: true },
  contactMail: { type: String, required: true },
  joinedAt: { type: Date, default: Date.now },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

export const Vendor = mongoose.model<IVendorModel>('Vendor', vendorSchema);