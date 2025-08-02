import React from 'react';
import { IoMdHeartDislike } from "react-icons/io";
import { Button } from '@/components/ui/button';

const sampleWishlist = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 120,
    image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=600&q=60'
  },
  {
    id: 2,
    name: 'Smartwatch',
    price: 199,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=60'
  },
  {
    id: 3,
    name: 'Sunglasses',
    price: 89,
    image: 'https://images.unsplash.com/photo-1526178612653-3c8a5cf1c4f0?auto=format&fit=crop&w=600&q=60'
  },
  {
    id: 4,
    name: 'Leather Backpack',
    price: 249,
    image: 'https://images.unsplash.com/photo-1600185365483-26d7b6d44b57?auto=format&fit=crop&w=600&q=60'
  }
];

export default function WishlistPage() {
  return (
    <div className="text-primary px-4 py-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Your Wishlist</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sampleWishlist.map(product => (
          <div
            key={product.id}
            className="bg-background shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition"
          >
            <img src={product.image} alt={product.name} className="h-48 w-full object-cover" />
            <div className="p-4 space-y-2">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-primary/60 text-sm">${product.price.toFixed(2)}</p>
              <div className="flex justify-between items-center mt-3">
                <Button className="text-sm px-4 py-2">Add to Cart</Button>
                <button className="text-red-500 hover:text-red-700 transition text-xl" title="Remove from wishlist">
                  <IoMdHeartDislike />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
