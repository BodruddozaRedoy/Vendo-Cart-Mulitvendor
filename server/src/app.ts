import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db';
// import connectDB from './config/db';
// import errorMiddleware from './middleware/error.middleware';

// Import routes
import userRoutes from './modules/user/user.routes';
import vendorRoutes from './modules/vendor/vendor.routes';
import productRoutes from './modules/products/product.routes';
import { errorMiddleware } from './middleware/error.middleware';
import env from './config/env';
// Import other routes...

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: [env.FRONTEND_URL, env.DASHBOARD_URL!],
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

// Error handling middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

export default app;