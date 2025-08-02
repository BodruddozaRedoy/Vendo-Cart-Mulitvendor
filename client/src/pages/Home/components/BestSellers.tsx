import ProductCardPrimary from '@/components/common/ProductCardPrimary';
import SectionTitle from '@/components/common/SectionTitle'
import type { IProduct, IVendor } from '@/types';
import { useState } from 'react';


export const vendors: IVendor[] = [
  {
    _id: "vendor01",
    name: "Apple",
    logo: "https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png",
    rating: 4.9,
    reviewsCount: 12500,
    isVerified: true,
    address: "Cupertino, California, USA",
    contactMail: "support@apple.com",
    joinedAt: "1976-04-01",
  },
  {
    _id: "vendor02",
    name: "Samsung",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg",
    rating: 4.7,
    reviewsCount: 9800,
    isVerified: true,
    address: "Seoul, South Korea",
    contactMail: "contact@samsung.com",
    joinedAt: "1938-03-01",
  },
  {
    _id: "vendor03",
    name: "Sony",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Sony_logo.png",
    rating: 4.6,
    reviewsCount: 7500,
    isVerified: true,
    address: "Tokyo, Japan",
    contactMail: "info@sony.com",
    joinedAt: "1946-05-07",
  },
  {
    _id: "vendor04",
    name: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
    rating: 4.8,
    reviewsCount: 11000,
    isVerified: true,
    address: "Redmond, Washington, USA",
    contactMail: "support@microsoft.com",
    joinedAt: "1975-04-04",
  },
  {
    _id: "vendor05",
    name: "Nike",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
    rating: 4.7,
    reviewsCount: 8500,
    isVerified: true,
    address: "Beaverton, Oregon, USA",
    contactMail: "customerservice@nike.com",
    joinedAt: "1964-01-25",
  },
  {
    _id: "vendor06",
    name: "Adidas",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg",
    rating: 4.6,
    reviewsCount: 7200,
    isVerified: true,
    address: "Herzogenaurach, Germany",
    contactMail: "contact@adidas.com",
    joinedAt: "1949-08-18",
  },
  {
    _id: "vendor07",
    name: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    rating: 4.5,
    reviewsCount: 25000,
    isVerified: true,
    address: "Seattle, Washington, USA",
    contactMail: "customer-service@amazon.com",
    joinedAt: "1994-07-05",
  },
  {
    _id: "vendor08",
    name: "LG Electronics",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/LG_symbol.svg",
    rating: 4.4,
    reviewsCount: 6800,
    isVerified: true,
    address: "Seoul, South Korea",
    contactMail: "support@lg.com",
    joinedAt: "1958-10-01",
  },
  {
    _id: "vendor09",
    name: "HP",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg",
    rating: 4.3,
    reviewsCount: 5900,
    isVerified: true,
    address: "Palo Alto, California, USA",
    contactMail: "customerservice@hp.com",
    joinedAt: "1939-01-01",
  },
  {
    _id: "vendor10",
    name: "Dell",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/18/Dell_logo_2016.svg",
    rating: 4.4,
    reviewsCount: 6300,
    isVerified: true,
    address: "Round Rock, Texas, USA",
    contactMail: "support@dell.com",
    joinedAt: "1984-02-01",
  }
];

// Sample products
export const products: IProduct[] = [
  {
    _id: "prod001",
    name: "Samsung Galaxy S24 Ultra",
    image: "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg",
    category: "Smartphones",
    subcategory: "Android Phones",
    brand: "Samsung",
    price: 1199.99,
    discount: 10,
    inStock: true,
    rating: 4.8,
    reviewsCount: 325,
    colors: ["Phantom Black", "Titanium Gray", "Violet"],
    images: [
      "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg",
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796",
    ],
    description:
      "A premium flagship smartphone with 200MP camera, Snapdragon chipset, and QHD+ 120Hz display.",
    features: [
      "200MP Quad Camera",
      "Snapdragon 8 Gen 3",
      "6.8\" QHD+ AMOLED 120Hz",
      "5000 mAh battery, 45W fast charge",
    ],
    warranty: "1 Year Official Warranty",
    shipping: "Free delivery in 3–5 business days",
    vendor: vendors[0],
  },
  {
    _id: "prod001",
    name: "Samsung Galaxy S24 Ultra",
    image: "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg",
    category: "Smartphones",
    subcategory: "Android Phones",
    brand: "Samsung",
    price: 1199.99,
    discount: 10,
    inStock: true,
    rating: 4.8,
    reviewsCount: 325,
    colors: ["Phantom Black", "Titanium Gray", "Violet"],
    images: [
      "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg",
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796",
    ],
    description:
      "A premium flagship smartphone with 200MP camera, Snapdragon chipset, and QHD+ 120Hz display.",
    features: [
      "200MP Quad Camera",
      "Snapdragon 8 Gen 3",
      "6.8\" QHD+ AMOLED 120Hz",
      "5000 mAh battery, 45W fast charge",
    ],
    warranty: "1 Year Official Warranty",
    shipping: "Free delivery in 3–5 business days",
    vendor: vendors[0],
  },
  {
    _id: "prod002",
    name: "MacBook Pro 16\" M4",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    category: "Laptops",
    subcategory: "MacBooks",
    brand: "Apple",
    price: 2499.0,
    discount: 5,
    inStock: true,
    rating: 4.9,
    reviewsCount: 475,
    colors: ["Space Gray", "Silver"],
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
      "https://images.pexels.com/photos/18105/pexels-photo.jpg",
    ],
    description:
      "Apple M4 chip with 16‑inch Retina display, high performance for creative work and coding.",
    features: [
      "M4 Pro/Max chip",
      "16‑inch Liquid Retina XDR",
      "32 GB RAM, 1 TB SSD",
      "Up to 21 hours battery",
    ],
    warranty: "1 Year Apple Warranty",
    shipping: "Free delivery in 5–7 business days",
    vendor: vendors[1],
  },
  {
    _id: "prod003",
    name: "Sony WH-1000XM5 Headphones",
    image: "https://images.pexels.com/photos/3394652/pexels-photo-3394652.jpeg",
    category: "Audio Devices",
    subcategory: "Headphones",
    brand: "Sony",
    price: 349.99,
    discount: 15,
    inStock: true,
    rating: 4.7,
    reviewsCount: 289,
    colors: ["Black", "Silver"],
    images: [
      "https://images.pexels.com/photos/3394652/pexels-photo-3394652.jpeg",
      "https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg",
    ],
    description:
      "Industry‑leading noise cancellation with exceptionally rich sound and long battery life.",
    features: [
      "Active Noise Canceling",
      "30‑hour battery life",
      "Touch controls",
      "Lightweight design",
    ],
    warranty: "1 Year Manufacturer Warranty",
    shipping: "Free delivery in 2–4 business days",
    vendor: vendors[0],
  },
  {
    _id: "prod004",
    name: "iPad Pro 12.9\" (2025)",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
    category: "Tablets",
    subcategory: "iPads",
    brand: "Apple",
    price: 999.99,
    discount: 8,
    inStock: true,
    rating: 4.85,
    reviewsCount: 220,
    colors: ["Space Gray", "Silver"],
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
      "https://images.pexels.com/photos/5082573/pexels-photo-5082573.jpeg",
    ],
    description:
      "The 2025 iPad Pro delivers blazing performance with M4 chip and Liquid Retina XDR display.",
    features: [
      "M4 chip",
      "Liquid Retina XDR",
      "ProMotion 120Hz",
      "Thunderbolt port",
    ],
    warranty: "1 Year Official Warranty",
    shipping: "Free delivery in 3–5 business days",
    vendor: vendors[1],
  },
  {
    _id: "prod005",
    name: "Fitbit Charge 6",
    image: "https://images.pexels.com/photos/897817/pexels-photo-897817.jpeg",
    category: "Wearables",
    subcategory: "Fitness Bands",
    brand: "Fitbit",
    price: 149.95,
    discount: 5,
    inStock: true,
    rating: 4.4,
    reviewsCount: 132,
    colors: ["Black", "Mint", "Lilac"],
    images: [
      "https://images.pexels.com/photos/897817/pexels-photo-897817.jpeg",
      "https://images.pexels.com/photos/919436/pexels-photo-919436.jpeg",
    ],
    description:
      "All‑day health tracking, built‑in GPS, stress management tools and long battery life.",
    features: ["Built‑in GPS", "Heart Rate, SpO₂", "7‑day battery", "Swim‑proof design"],
    warranty: "1 Year Manufacturer Warranty",
    shipping: "Free delivery in 2–3 business days",
    vendor: vendors[0],
  },
  {
    _id: "prod006",
    name: "Google Pixel Watch 3",
    image: "https://images.unsplash.com/photo-1617113211033-e063da3c61aa",
    category: "Wearables",
    subcategory: "Smartwatches",
    brand: "Google",
    price: 349.0,
    discount: 10,
    inStock: true,
    rating: 4.5,
    reviewsCount: 200,
    colors: ["Charcoal", "Hazel", "Porcelain"],
    images: [
      "https://images.unsplash.com/photo-1617113211033-e063da3c61aa",
      "https://images.pexels.com/photos/6691210/pexels-photo-6691210.jpeg",
    ],
    description: "Smart health and fitness companion with smooth Wear OS and accurate tracking.",
    features: ["Heart‑Rate Monitor", "Sleep Tracking", "Wear OS 4", "24‑hour battery"],
    warranty: "1 Year Warranty",
    shipping: "Free delivery in 3 business days",
    vendor: vendors[1],
  },
  {
    _id: "prod007",
    name: "DJI Mini 4 Drone",
    image: "https://images.pexels.com/photos/14619653/pexels-photo-14619653.jpeg",
    category: "Drones & Cameras",
    subcategory: "Drones",
    brand: "DJI",
    price: 799.0,
    discount: 12,
    inStock: true,
    rating: 4.6,
    reviewsCount: 180,
    colors: ["White"],
    images: [
      "https://images.pexels.com/photos/14619653/pexels-photo-14619653.jpeg",
      "https://images.unsplash.com/photo-1504198266280-5ecf7d7a1dbb",
    ],
    description:
      "Light, foldable drone with 4K video, extended battery and advanced obstacle avoidance.",
    features: ["4K video", "31‑minute flight time", "Tri‑axis gimbal", "Advanced sensors"],
    warranty: "1 Year DJI Warranty",
    shipping: "Free delivery in 5 business days",
    vendor: vendors[0],
  },
  {
    _id: "prod008",
    name: "Logitech MX Master 3S Mouse",
    image: "https://images.pexels.com/photos/209151/pexels-photo-209151.jpeg",
    category: "Computer Accessories",
    subcategory: "Mice",
    brand: "Logitech",
    price: 99.99,
    discount: 7,
    inStock: true,
    rating: 4.8,
    reviewsCount: 415,
    colors: ["Graphite", "Midnight"],
    images: [
      "https://images.pexels.com/photos/209151/pexels-photo-209151.jpeg",
      "https://images.unsplash.com/photo-1583921522333-3443b8e87b86",
    ],
    description:
      "Ergonomic wireless mouse optimized for productivity with silent clicks and hyper‑fast scroll.",
    features: ["Flow cross‑computer control", "Silent clicks", "Ultra‑fast scroll wheel"],
    warranty: "2 Year Manufacturer Warranty",
    shipping: "Free delivery in 2–4 days",
    vendor: vendors[1],
  },
  {
    _id: "prod009",
    name: "Anker Soundcore Liberty 4 Earbuds",
    image: "https://images.pexels.com/photos/3394681/pexels-photo-3394681.jpeg",
    category: "Audio Devices",
    subcategory: "Wireless Earbuds",
    brand: "Anker",
    price: 129.99,
    discount: 20,
    inStock: true,
    rating: 4.3,
    reviewsCount: 260,
    colors: ["Black", "White"],
    images: [
      "https://images.pexels.com/photos/3394681/pexels-photo-3394681.jpeg",
      "https://images.unsplash.com/photo-1597764694610-ea5fbfce1b11",
    ],
    description:
      "Affordable top‑rated earbuds with active noise cancellation and rich, balanced sound.",
    features: ["ANC", "24‑hour total playback", "Wireless charging case"],
    warranty: "1 Year Warranty",
    shipping: "Free delivery in 3 business days",
    vendor: vendors[0],
  },
  {
    _id: "prod010",
    name: "Kindle Paperwhite (2025)",
    image: "https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg",
    category: "Tablets",
    subcategory: "E‑Readers",
    brand: "Amazon",
    price: 139.99,
    discount: 5,
    inStock: true,
    rating: 4.7,
    reviewsCount: 540,
    colors: ["Black", "Twilight Blue"],
    images: [
      "https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg",
      "https://images.unsplash.com/photo-1529655683826-aba9b3e77383",
    ],
    description:
      "Latest Kindle with waterproof design, adjustable warm light, and weeks‑long battery life.",
    features: ["Waterproof", "Warm front light", "300 ppi display"],
    warranty: "1 Year Amazon Warranty",
    shipping: "Free delivery in 3 business days",
    vendor: vendors[1],
  },
];

export default function BestSellers() {
    const [filter, setFilter] = useState("All")
  return (
    <div>
      {/* header  */}
        <div className='flex flex-col lg:flex-row justify-between items-center lg:items-end'>
            <SectionTitle title='Best Sellers' description='Special products in this month'/>
            <div className='flex gap-5 items-center text-primary mt-5 lg:mt-0'>
                <p onClick={() => setFilter("All")} className='font-bold cursor-pointer'>All</p>
                <p onClick={() => setFilter("Best Seller")} className='font-light cursor-pointer'>Best Seller</p>
                <p onClick={() => setFilter("Top Brands")} className='font-light cursor-pointer'>Top Brands</p>
                <p onClick={() => setFilter("Most Viewed")} className='font-light cursor-pointer'>Most Viewed</p>
            </div>
        </div>
        <hr className='my-5'/>
        {/* product list  */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5'>
            {
                products?.slice(0, 5).map((product:IProduct, i:number) => (
                    <ProductCardPrimary product={product} key={i}/>
                ))
            }
        </div>
    </div>
  )
}
