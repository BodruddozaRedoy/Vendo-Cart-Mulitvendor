import type { IProduct } from "@/types";
import { FaStar } from "react-icons/fa";

export default function ProductCardSecondary({ product }: { product: IProduct }) {
    return (
        <div className="flex gap-2 p-5 border text-primary rounded-lg h-full justify-center items-center">
            <img className="w-40 h-40 object-contain" src={product.image} alt="" />
            <div className='p-5 flex-1 space-y-2'>
                <p className='text-xs font-semibold'>{product.brand}</p>
                <h1 className='font-semibold truncate w-65'>{product.name}</h1>
                <p className='flex gap-1 items-center text-sm font-light'><FaStar className='text-yellow-500' />
                    ({product.rating})</p>
                <p className='font-bold text-xl'>${product.price}</p>
            </div>
        </div>
    )
}
