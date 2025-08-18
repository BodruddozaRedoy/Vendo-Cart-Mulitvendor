import mongoose, { Schema, Document, Types } from "mongoose";

export interface IOrder extends Document {
  userId: Types.ObjectId;
  products: {
    productId: Types.ObjectId;
    quantity: number;
  }[];
  paymentMethod: "cod" | "stripe";
  paymentStatus: "pending" | "paid";
  totalAmount: number;
  deliveryStatus: "Order placed" | "In progress" | "Shipped" | "Out for delivery" | "Delivered" | "Cancelled";
  deliveryInfo: object
}

const orderSchema = new Schema<IOrder>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true },
      },
    ],
    paymentMethod: { type: String, enum: ["cod", "stripe"], required: true },
    paymentStatus: { type: String, enum: ["pending", "paid"], default: "pending" },
    totalAmount: { type: Number, required: true },
    deliveryStatus: {
      type: String,
      enum: ["Order placed", "In progress", "Shipped", "Out for delivery", "Delivered"],
      default: "Order placed",
      required: true,
    },
    deliveryInfo: {type: Object}
  },
  { timestamps: true }
);

export const Order = mongoose.model<IOrder>("Order", orderSchema);
