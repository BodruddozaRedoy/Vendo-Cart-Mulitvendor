import ProductCardPrimary from '@/components/common/ProductCardPrimary';
import SectionTitle from '@/components/common/SectionTitle'
import useGetAllProducts from '@/hooks/useGetAllProducts';
import type { IProduct, IVendor } from '@/types';
import { useState } from 'react';


export default function BestSellers() {
    const [filter, setFilter] = useState("All")
    const {products, isLoading} = useGetAllProducts()
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
                products?.data?.slice(0, 5).map((product:IProduct, i:number) => (
                    <ProductCardPrimary product={product} key={i}/>
                ))
            }
        </div>
    </div>
  )
}
