import { Request, Response } from "express";
import Stripe from "stripe";
import { Order } from "./order.model";
import env from "../../config/env";
import { Vendor } from "../vendor/vendor.model";

const stripe = new Stripe(env.STRIPE_SECRET_KEY!);

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { cartItems, totalAmount, paymentMethod, stripeToken, deliveryInfo } = req.body;
    const userId = req.user._id;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    if (!["cod", "stripe"].includes(paymentMethod)) {
      return res.status(400).json({ message: "Invalid payment method" });
    }

    let paymentStatus: "pending" | "paid" = "pending";

    if (paymentMethod === "stripe") {
      if (!stripeToken) {
        return res.status(400).json({ message: "Stripe token is required" });
      }

      const charge = await stripe.charges.create({
        amount: Math.round(totalAmount * 100), // Convert to cents
        currency: "usd",
        source: stripeToken,
        description: `Order payment by user ${userId}`,
      });

      if (charge.status !== "succeeded") {
        return res.status(402).json({ message: "Payment failed" });
      }

      paymentStatus = "paid";
    }

    const order = new Order({
      userId,
      products: cartItems.map((item: any) => ({
        product: item.product,
        quantity: item.quantity,
      })),
      paymentMethod,
      paymentStatus,
      totalAmount,
      deliveryInfo
    });

    await order.save();

    return res.status(201).json({ message: "Order placed successfully", order });
  } catch (error: any) {
  console.error("Stripe payment error:", error);
  return res.status(500).json({ message: error.message || "Something went wrong" });
}

};

export const getOrdersByUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;

    const orders = await Order.find({ userId })
      .populate("products.product", "name image price") // optional
      .sort({ createdAt: -1 }); // latest first

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const trackOrderStatus = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;

    if (!orderId) {
      return res.status(400).json({ message: "Order ID is required" });
    }

    const order = await Order.findById(orderId).select("deliveryStatus");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ deliveryStatus: order.deliveryStatus });
  } catch (error) {
    console.error("Error tracking order:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getOrdersByVendor = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;

    // 1. Find the vendor associated with this user
    const vendor = await Vendor.findOne({ owner: userId });
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    // 2. Get all orders with products + customer populated
    const orders = await Order.find()
      .populate({
        path: "products.product",
        populate: { path: "vendor", select: "name owner" }, // get vendor details inside product
      })
      .populate({
        path: "userId",
        select: "fullName email phone address picture isActive isVerified", // optional: customer details
      })
      .sort({ createdAt: -1 });

    // 3. Filter orders that include products belonging to this vendor
    const vendorOrders = orders.filter(order =>
      order.products.some(
        (item: any) =>
          item.product?.vendor?._id?.toString() === vendor._id!.toString()
      )
    );

    res.status(200).json(vendorOrders);
  } catch (error) {
    console.error("Error getting vendor orders:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const { deliveryStatus } = req.body;

    if (!orderId || !deliveryStatus) {
      return res.status(400).json({ message: "Order ID and new delivery status are required" });
    }

    const validStatuses = ["Order placed", "In progress", "Shipped", "Out for delivery", "Delivered", "Cancelled"];
    if (!validStatuses.includes(deliveryStatus)) {
      return res.status(400).json({ message: "Invalid delivery status" });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.deliveryStatus = deliveryStatus;
    await order.save();

    return res.status(200).json({ message: "Delivery status updated successfully", order });
  } catch (error: any) {
    console.error("Error updating order status:", error);
    return res.status(500).json({ message: error.message || "Something went wrong" });
  }
};

