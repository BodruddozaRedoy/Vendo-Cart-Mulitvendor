export interface ICategories {
  name: string;
  image: string;
  subcategories: string[];
}


export interface ICartProduct {
  _id?:string
  productId: IProduct;
  quantity: number;
  price: number
}

export interface ICart {
  userId: string;
  vendorId:string;
  products: ICartProduct[];
  total: number;
  status: "active" | "ordered" | "abandoned";
  createdAt: string;
  updatedAt: string;
}

export interface IVendor {
  name: string;
  logo: string;
  rating?: number;
  reviewsCount?: number;
  isVerified?: boolean;
  address: string;
  contactMail: string;
  phone: string;
  description: string;
  joinedAt?: string;
  products?: string[];
  owner: string; // User ID
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProduct {
  _id: string;
  name: string;
  image: string;
  category: string;
  description: string;
  brand: string;
  price: number;
  subcategory: string;
  discount: number;
  inStock: boolean;
  rating: number;
  reviewsCount: number;
  colors: string[];
  images: string[];
  features: string[];
  warranty: string;
  shipping: string;
  tags?: string[];
  vendor?: IVendor[];
}

export interface IAddress {
  home: string;
  delivery: string;
}

export interface IUser {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  bio: string;
  address: IAddress;
  role: "admin" | "seller" | "user";
  picture: string;
  isVerified?: boolean;
  isActive?: boolean;
}

export interface IOrder {
  _id?: string
  userId: string;
  products: {
    productId: string;
    quantity: number;
  }[];
  paymentMethod: "cod" | "stripe";
  paymentStatus: "pending" | "paid";
  totalAmount: number;
  deliveryStatus: "Order placed" | "In progress" | "Shipped" | "Out for delivery" | "Delivered";
  createdAt: string
}
