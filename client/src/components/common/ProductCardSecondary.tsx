import type { IProduct } from "@/types";
import { FaStar } from "react-icons/fa";
import { Button } from "../ui/button";

export default function ProductCardSecondary({ product, button }: { product: IProduct, button?: boolean }) {
    return (
        <div className="flex flex-col sm:flex-row gap-2 p-3 sm:p-5 border text-primary rounded-lg h-full justify-center items-center relative">
            <img
                className="w-32 h-32 sm:w-40 sm:h-40 object-contain"
                src={product.image}
                alt={product.name}
            />
            <div className='p-3 sm:p-5 flex-1 space-y-1 sm:space-y-2 w-full'>
                <p className='text-xs font-semibold'>{product.brand}</p>
                <h1 className='font-semibold line-clamp-2 sm:truncate'>{product.name}</h1>
                <p className='flex gap-1 items-center text-sm font-light'>
                    <FaStar className='text-yellow-500' />
                    ({product.rating})
                </p>
                <p className='font-bold text-lg sm:text-xl'>${product.price}</p>
                <div className="flex flex-col gap-1">
                {
                    product.features.map((fe, i) => (
                        <li style={{listStyle: "inside"}} className="text-xs font-light list-inside" key={i}>{fe}</li>
                    ))
                }
            </div>
            {
                button && <Button variant={"outline"}>Add to cart</Button>
            }
            </div>
            <div className='absolute top-0 right-0 bg-secondary py-1 px-2 sm:px-3 rounded-tr-lg rounded-bl-lg text-background text-xs sm:text-sm font-semibold'>
                -{product.discount}%
            </div>
            
        </div>
    )
}