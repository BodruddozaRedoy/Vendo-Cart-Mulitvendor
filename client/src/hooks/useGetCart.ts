import { useGetCartQuery } from '@/redux/features/cart/cartApi'

export default function useGetCart() {
    const {data, isLoading} = useGetCartQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true
  })
  const cart = data?.products
  console.log(cart)
  return {cart, isLoading}
}
