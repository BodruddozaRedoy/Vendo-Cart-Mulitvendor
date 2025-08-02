export interface IAddress {
  home: string;
  delivery: string;
}

export interface IUser {
  fullName: string;
  email: string;
  password: string;
  phone?: string;
  bio?: string;
  address?: IAddress;
  role: 'admin' | 'vendor' | 'user';
  picture?: string;
  isVerified?: boolean;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserRoles = 'admin' | 'vendor' | 'user';

export interface ILoginUser {
  email: string;
  password: string;
}

export interface IUpdateUser {
  fullName?: string;
  email?: string;
  phone?: string;
  bio?: string;
  address?: IAddress;
  picture?: string;
}