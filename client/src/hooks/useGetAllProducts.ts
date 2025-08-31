import { useGetAllProductsQuery } from '@/redux/features/products/productApi'

export default function useGetAllProducts() {
  const { data: products, isLoading, isFetching, isError, error, refetch } = useGetAllProductsQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true
  })
  return { products, isLoading, isFetching, isError, error, refetch }
}
