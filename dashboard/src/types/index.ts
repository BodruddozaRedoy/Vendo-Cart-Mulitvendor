export interface ICategories {
    name: string,
    image: string,
    subcategories: string[]
}

export interface IVendor {
    _id: string,
    name: string,
    logo: string,
    rating: number,
    reviewsCount: number,
    isVerified: boolean,
    address: string,
    contactMail: string,
    joinedAt: string,
    products:IProduct[]
}

export interface IProduct {
    _id: string,
    name: string,
    image: string,
    category: string,
    description: string,
    brand: string,
    price: number,
    subcategory: string,
    discount: number,
    inStock: boolean,
    rating: number,
    reviewsCount: number,
    colors: string[],
    images: string[],
    features: string[],
    warranty: string,
    shipping: string,
    tags?: string[],
    vendor?: IVendor[]
}

export interface IAddress {
    home: string,
    delivery: string
}



export interface IUser {
    fullName:string,
    email: string,
    password: string,
    phone: string,
    bio: string,
    address: IAddress,
    role: "admin" | "seller" | "user",
    picture: string,
    isVerified?: boolean
    isActive?: boolean
}