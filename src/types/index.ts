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
    joinedAt: string
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
    vendor: IVendor
}