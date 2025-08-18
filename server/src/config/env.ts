import dotenv from 'dotenv';

dotenv.config();

const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI || '',
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '30d',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
  DASHBOARD_URL: process.env.DASHBOARD_URL || 'http://localhost:8080',
  STRIPE_SECRET_KEY:process.env.STRIPE_SECRET_KEY
};

export default env;