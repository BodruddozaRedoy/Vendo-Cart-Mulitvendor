import { Types } from "mongoose";

export interface IProduct {
  _id?: string;
  name: string;
  image: string;
  category: string;
  description: string;
  brand: string;
  price: number;
  subcategory?: string;
  discount?: number;
  quantity?: number;
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
  _id?: string;
  name: string;
  image: string;
  category: string;
  description: string;
  brand: string;
  price: number;
  subcategory?: string;
  discount?: number;
  quantity?: number;
  colors?: string[];
  images?: string[];
  features?: string[];
  warranty?: string;
  shipping?: string;
  tags?: string[];
}

export interface IUpdateProduct {
  _id?: string
  name?: string;
  image?: string;
  category?: string;
  description?: string;
  brand?: string;
  price?: number;
  subcategory?: string;
  discount?: number;
  quantity?: boolean;
  colors?: string[];
  images?: string[];
  features?: string[];
  warranty?: string;
  shipping?: string;
  tags?: string[];
}