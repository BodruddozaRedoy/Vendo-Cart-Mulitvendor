import useAddToCart from '@/hooks/useAddToCart';
import type { IProduct } from '@/types';
import { FaStar } from "react-icons/fa";
import { Link } from 'react-router';

export default function ProductCardPrimary({ product }: { product: IProduct }) {
  const {result} = useAddToCart()
  // console.log(product.vendor)
  // console.log(result)

  return (
    <div className='bg-background shadow border flex flex-col items-center rounded-lg text-primary relative w-full max-w-xs sm:max-w-sm md:max-w-md'>
      <img
        className='w-full max-w-[240px] h-40 sm:h-48 mt-6 object-contain'
        src={product.image}
        alt={product.name}
      />
      <div className='p-4 sm:p-5 flex-1 space-y-2 w-full'>
        <p className='text-xs sm:text-sm font-semibold'>{product.brand}</p>
        <Link to={`/product/${product._id}`}><h1 className='font-semibold text-sm sm:text-base truncate'>{product.name}</h1></Link>
        <p className='flex gap-1 items-center text-sm font-light'>
          <FaStar className='text-yellow-500' /> ({product.rating})
        </p>
        <p className='font-bold text-lg sm:text-xl'>${product.price}</p>
        <p className='font-light text-xs sm:text-sm line-clamp-2'>{product.description}</p>
      </div>

      
      <button disabled={result.isLoading} data-add-to-cart data-id={product._id}  className='py-2 sm:py-3 w-full bg-primary text-background rounded-b-lg text-sm sm:text-base cursor-pointer disabled:bg-primary/80'>
        {result.isLoading ? "Adding..." : "Add to cart"}
      </button>
      {/* <button disabled={result.isLoading} onClick={() => addToCart({productId: product?._id})} className='py-2 sm:py-3 w-full bg-primary text-background rounded-b-lg text-sm sm:text-base cursor-pointer disabled:bg-primary/80'>
        {result.isLoading ? "Adding..." : "Add to cart"}
      </button> */}

      <div className='absolute top-0 right-0 bg-secondary py-1 px-2 sm:px-3 rounded-tr-lg rounded-bl-lg text-background text-xs sm:text-sm font-semibold'>
        -{product.discount}%
      </div>
    </div>
  );
}
