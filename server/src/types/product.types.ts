import { Types } from "mongoose";

export interface IProduct {
  name: string;
  image: string;
  category: string;
  description: string;
  brand: string;
  price: number;
  subcategory?: string;
  discount?: number;
  inStock?: boolean;
  rating?: number;
  reviewsCount?: number;
  colors?: string[];
  images?: string[];
  features?: string[];
  warranty?: string;
  shipping?: string;
  tags?: string[];
  vendor: Types.ObjectId; // Vendor ID
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICreateProduct {
  name: string;
  image: string;
  category: string;
  description: string;
  brand: string;
  price: number;
  subcategory?: string;
  discount?: number;
  inStock?: boolean;
  colors?: string[];
  images?: string[];
  features?: string[];
  warranty?: string;
  shipping?: string;
  tags?: string[];
}

export interface IUpdateProduct {
  name?: string;
  image?: string;
  category?: string;
  description?: string;
  brand?: string;
  price?: number;
  subcategory?: string;
  discount?: number;
  inStock?: boolean;
  colors?: string[];
  images?: string[];
  features?: string[];
  warranty?: string;
  shipping?: string;
  tags?: string[];
}