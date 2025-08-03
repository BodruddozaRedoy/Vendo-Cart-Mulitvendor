import mongoose, { Document, Schema } from 'mongoose';
import { IProduct } from '../../types/product.types';

// interface IProductModel extends IProduct, Document {}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  subcategory: { type: String },
  discount: { type: Number, default: 0 },
  quantity: { type: Number, default: true },
  rating: { type: Number, default: 0 },
  reviewsCount: { type: Number, default: 0 },
  colors: [{ type: String }],
  images: [{ type: String }],
  features: [{ type: String }],
  warranty: { type: String },
  shipping: { type: String },
  tags: [{ type: String }],
  vendor: { type: Schema.Types.ObjectId, ref: 'Vendor', required: true }
}, {
  timestamps: true
});

export const Product = mongoose.model<IProduct>('Product', productSchema);