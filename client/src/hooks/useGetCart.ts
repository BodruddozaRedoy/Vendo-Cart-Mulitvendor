import { useGetCartQuery } from '@/redux/features/cart/cartApi'

export default function useGetCart() {
    const {data, isLoading} = useGetCartQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true
  })
  // console.log(cart)
  return {cart:data, cartProducts:data?.products, isLoading}
}