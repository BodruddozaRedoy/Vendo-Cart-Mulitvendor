import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db';

// Import routes
import userRoutes from './modules/user/user.routes';
import vendorRoutes from './modules/vendor/vendor.routes';
import productRoutes from './modules/products/product.routes';
import categoryRoutes from './modules/category/category.routes'
import wishlistRoutes from './modules/wishlist/wishlist.routes'
import cartRoutes from './modules/cart/cart.routes'
import orderRoutes from './modules/order/order.routes'
import { errorMiddleware } from './middleware/error.middleware';

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:6868", "http://localhost:8080", "https://vendo-cart-frontend.vercel.app"],
  credentials: true
}));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Database connection
connectDB();

// Routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/vendor', vendorRoutes);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/categories', categoryRoutes)
app.use('/api/v1/cart', cartRoutes)
app.use('/api/v1/wishlist', wishlistRoutes)
app.use('/api/v1/order', orderRoutes)

// Error handling middleware
app.use(errorMiddleware);

// Only start a server when not running on Vercel.
// Vercel Serverless Functions import the app and handle the request lifecycle.
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    );
  });
}

export default app;
