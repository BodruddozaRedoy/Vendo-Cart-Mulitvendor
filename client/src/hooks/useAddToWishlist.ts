import { useAddToWishlistMutation } from '@/redux/features/wishlist/wishlistApi'
import { useEffect } from 'react'
import { toast } from 'sonner'

export default function useAddToWishlist() {
    const [addWishlist, wishlistLoading] = useAddToWishlistMutation()
    const addToWishlist = async (id:string) => {
        addWishlist({product:id})
    }
    useEffect(() => {
        if(wishlistLoading.isSuccess){
            toast.success("Added to wishlist")
        }else if(wishlistLoading.status === "rejected"){
            toast.error("Already added")
        }
        // console.log(wishlistLoading.isError)
    },[wishlistLoading])
    
    console.log(wishlistLoading)
  return {addToWishlist, wishlistLoading}
}
