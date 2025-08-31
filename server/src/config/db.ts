import mongoose from 'mongoose';
import env from './env';

let connectingPromise: Promise<typeof mongoose> | null = null;

const connectDB = async () => {
  // Skip when no URI configured (avoid crashing serverless at import time)
  if (!env.MONGO_URI) {
    console.warn('MONGO_URI not set — skipping DB connection');
    return;
  }

  // Reuse existing connection if already connected or connecting
  if (mongoose.connection.readyState === 1) return; // connected
  if (connectingPromise) return connectingPromise;

  try {
    connectingPromise = mongoose.connect(env.MONGO_URI, { dbName: 'vendorCartDB' });
    const conn = await connectingPromise;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Mongo connection error: ${(error as Error).message}`);
  } finally {
    connectingPromise = null;
  }
};

export default connectDB;
