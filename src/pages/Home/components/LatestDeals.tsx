import CountdownTimer from '@/components/common/Countdown'
import SectionTitle from '@/components/common/SectionTitle'
import SpecialProductCard from '@/components/common/SpecialProductCard'
import type { IProduct } from '@/types'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { products } from './BestSellers'
import ProductCardPrimary from '@/components/common/ProductCardPrimary'

const specialProduct:IProduct = {
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
    // vendor: vendors[0],
  }

export default function LatestDeals() {
    return (
        <div>
            {/* header  */}
            <div className='flex justify-between items-center'>
                <SectionTitle title='Latest Deals' description='Special products in this month' />
                <div className='flex items-center gap-4'>
                    <div>
                        <p className='font-semibold text-sm text-primary'>Hurry up!</p>
                        <p className='text-xs text-muted-foreground'>Offers end in</p>
                    </div>
                    <CountdownTimer targetDate={new Date("2025-07-30T18:00:00")} />
                    <Link to={"/"} className='text-primary flex items-center gap-2'>View all <ArrowRight /> </Link>
                </div>
            </div>
            <hr className='my-5'/>
            {/* content  */}
            <div className='grid grid-cols-1 lg:grid-cols-5 gap-5'>
            <div className='col-span-2 row-span-2'>
                <SpecialProductCard product={specialProduct}/>
            </div>
            {
                products.slice(0, 11).map((product, i) => (
                    <div className='col-span-1'><ProductCardPrimary product={product} key={i}/></div>
                ))
            }
            </div>
        </div>
    )
}
