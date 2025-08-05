import mongoose, { Schema, Document } from 'mongoose'

export interface ICartProduct {
  productId: mongoose.Types.ObjectId
  quantity: number
  price: number // optional: to track price at time of adding
}

export interface ICart extends Document {
  userId: mongoose.Types.ObjectId
  products: ICartProduct[]
  total: number
  status: 'active' | 'ordered' | 'abandoned'
  createdAt: Date
  updatedAt: Date
}

const CartSchema: Schema = new Schema<ICart>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },

    products: [
      {
        productId: {
          type: mongoose.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],

    total: {
      type: Number,
      required: true,
      default: 0,
    },

    status: {
      type: String,
      enum: ['active', 'ordered', 'abandoned'],
      default: 'active',
    },
  },
  { timestamps: true }
)

const Cart = mongoose.model<ICart>('Cart', CartSchema)
export default Cart
