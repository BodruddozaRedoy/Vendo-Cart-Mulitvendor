import CountdownTimer from '@/components/common/Countdown';
import SectionTitle from '@/components/common/SectionTitle';
import SpecialProductCard from '@/components/common/SpecialProductCard';
import ProductCardPrimary from '@/components/common/ProductCardPrimary';
import type { IProduct } from '@/types';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { products } from './BestSellers';

const specialProduct: IProduct = {
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
};

export default function LatestDeals() {
  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row justify-between lg:items-start items-center gap-4'>
        <SectionTitle title='Latest Deals' description='Special products in this month' />
        <div className='flex flex-col lg:flex-row items-center gap-4'>
          <div>
            <p className='font-semibold text-sm text-primary'>Hurry up!</p>
            <p className='text-xs text-muted-foreground'>Offers end in</p>
          </div>
          <CountdownTimer targetDate={new Date("2025-07-30T18:00:00")} />
          <Link to={"/"} className='text-primary flex items-center gap-2 text-sm sm:text-base'>
            View all <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <hr />

      {/* Grid Content */}
      <div className='grid grid-cols-2 lg:grid-cols-5 gap-5'>
  <div className='col-span-2 lg:col-span-2 lg:row-span-2'>
    <SpecialProductCard product={specialProduct} />
  </div>

  {products.slice(0, 11).map((product, i) => (
    <div className='col-span-1' key={i}>
      <ProductCardPrimary product={product} />
    </div>
  ))}
</div>

    </div>
  );
}
