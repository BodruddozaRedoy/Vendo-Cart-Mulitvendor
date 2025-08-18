import mongoose, { Schema, Document } from 'mongoose'

export interface IWishlist extends Document {
  userId: mongoose.Types.ObjectId
  product: mongoose.Types.ObjectId
  status: string // e.g., "saved", "interested", "buy-later", etc.
}

const wishlistSchema = new Schema<IWishlist>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    status: {
      type: String,
      default: 'saved', // optional default
    },
  },
  {
    timestamps: true,
  }
)

export const Wishlist = mongoose.model<IWishlist>('Wishlist', wishlistSchema)
