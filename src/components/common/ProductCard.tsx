import type { IProduct } from '@/types'
import { FaStar } from "react-icons/fa";


export default function ProductCard({ product }: { product: IProduct }) {
    return (
        <div className='bg-background shadow-md flex flex-col items-center rounded-lg text-primary relative'>
            <img className='w-60 mt-10 h-40 object-contain' src={product.image} alt="" />
            <div className='p-5 flex-1 space-y-2'>
                <p className='text-xs font-semibold'>{product.brand}</p>
                <h1 className='font-semibold truncate w-65'>{product.name}</h1>
                <p className='flex gap-1 items-center text-sm font-light'><FaStar className='text-yellow-500'/>
                    ({product.rating})</p>
                <p className='font-bold text-xl'>${product.price}</p>
                <p className='font-light text-sm'>{product.description}</p>
            </div>
            <button className='py-3 w-full bg-primary text-background rounded-b-lg cursor-pointer'>Add to cart</button>
            <div className='absolute top-0 right-0 bg-secondary py-1 px-3 rounded-tr-lg rounded-bl-lg text-background text-sm font-semibold'>
                -{product.discount}%
            </div>
        </div>
    )
}
