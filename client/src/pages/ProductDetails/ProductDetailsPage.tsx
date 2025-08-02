import { useState } from "react";
import { FaHeart, FaTrash } from "react-icons/fa";

interface IProduct {
  _id: string;
  name: string;
  image: string;
  images: string[];
  category: string;
  description: string;
  brand: string;
  price: number;
  discount: number;
  rating: number;
  reviewsCount: number;
  features: string[];
  warranty: string;
  shipping: string;
  tags: string[];
}

const sampleProduct: IProduct = {
  _id: "1",
  name:
    "Samsung Galaxy S22 Ultra, 8K Camera & Video, Brightest Display Screen, S Pen Pro",
  image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9",
  images: [
    "https://images.unsplash.com/photo-1611515085573-324d2521c5d4",
    "https://images.unsplash.com/photo-1580910051073-3af8fa1b4d2e",
    "https://images.unsplash.com/photo-1598327105666-5b89351aff97",
    "https://images.unsplash.com/photo-1512499617640-c2f9990589a0",
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
  ],
  category: "Smartphones",
  description: "8k super steady video, night photography, adaptive contrast, etc.",
  brand: "Samsung",
  price: 2856.3,
  discount: 17,
  rating: 4.8,
  reviewsCount: 65,
  features: [
    "8k super steady video",
    "Nightography plus portrait mode",
    "50mp photo resolution plus bright display",
    "Adaptive color contrast",
    "Premium design & craftsmanship",
    "Long lasting battery plus fast charging",
  ],
  warranty: "1 Year Brand Warranty",
  shipping: "Free Delivery",
  tags: ["Smartphone", "Blue", "Android", "5G"],
};

export default function ProductDetails() {
  const [mainImage, setMainImage] = useState(sampleProduct.image);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="container mx-auto p-6 text-primary">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Images */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Thumbnails */}
          <div
            className="flex sm:flex-col overflow-x-auto sm:overflow-x-visible gap-2 sm:gap-2
              scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {sampleProduct.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Thumbnail ${i + 1}`}
                onClick={() => setMainImage(img)}
                className={`w-16 h-16 rounded-lg object-cover cursor-pointer hover:border-primary border-2 ${
                  mainImage === img ? "border-primary" : "border-transparent"
                }`}
                style={{ scrollSnapAlign: "start" }}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1">
            <img
              src={mainImage}
              alt="Main product"
              className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-contain rounded-xl"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-4">
          <h1 className="text-xl sm:text-2xl font-bold">{sampleProduct.name}</h1>
          <p className="text-yellow-500 font-medium text-sm sm:text-base">
            ★ {sampleProduct.rating} ({sampleProduct.reviewsCount} reviews)
          </p>

          <div className="text-xl sm:text-2xl font-semibold text-primary">
            ${sampleProduct.price.toFixed(2)}
            <span className="text-gray-400 line-through ml-3 text-sm sm:text-base">
              ${(sampleProduct.price / (1 - sampleProduct.discount / 100)).toFixed(2)}
            </span>
            <span className="ml-2 text-xs sm:text-sm text-red-500">
              -{sampleProduct.discount}%
            </span>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 list-disc pl-5 gap-1 text-sm sm:text-base">
            {sampleProduct.features.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>

          {/* Quantity and Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                -
              </button>
              <span className="min-w-[24px] text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                +
              </button>
            </div>

            <div className="flex gap-3 flex-wrap">
              <button className="bg-primary text-white px-4 py-2 rounded whitespace-nowrap">
                Add to Cart
              </button>
              <button className="bg-secondary text-white px-4 py-2 rounded whitespace-nowrap">
                Buy Now
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-sm mt-2 text-gray-600">
            <button className="flex items-center gap-2 hover:text-primary transition">
              <FaHeart /> Add to Wishlist
            </button>
            <button className="flex items-center gap-2 hover:text-primary transition">
              <FaTrash /> Compare
            </button>
          </div>

          <div className="mt-4 text-sm space-y-1">
            <p>
              <strong>Category:</strong> {sampleProduct.category}
            </p>
            <p>
              <strong>Tags:</strong> {sampleProduct.tags.join(", ")}
            </p>
            <p>
              <strong>Shipping:</strong> {sampleProduct.shipping}
            </p>
          </div>
        </div>

        {/* Separator */}
        <div className="col-span-1 lg:col-span-2 border-t pt-8 mt-10 space-y-4">
          <h2 className="text-lg sm:text-xl font-semibold">Product Description</h2>
          <p>{sampleProduct.description}</p>

          <h2 className="text-lg sm:text-xl font-semibold">Warranty</h2>
          <p>{sampleProduct.warranty}</p>

          <h2 className="text-lg sm:text-xl font-semibold">Vendor Info</h2>
          <p>
            <strong>Brand:</strong> {sampleProduct.brand}
          </p>
        </div>
      </div>
    </div>
  );
}
