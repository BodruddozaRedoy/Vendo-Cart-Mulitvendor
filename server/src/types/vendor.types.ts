import { Types } from "mongoose";
import { IProduct } from "./product.types";

export interface IVendor {
  name: string;
  logo: string;
  rating?: number;
  reviewsCount?: number;
  isVerified?: boolean;
  address: string;
  contactMail: string;
  joinedAt?: Date;
  products?: Types.ObjectId[];
  owner: Types.ObjectId; // User ID
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICreateVendor {
  name: string;
  logo: string;
  address: string;
  contactMail: string;
}

export interface IUpdateVendor {
  name?: string;
  logo?: string;
  address?: string;
  contactMail?: string;
}