import { useGetAllCategoryQuery } from '@/redux/features/category/categoryApi'

export default function useGetAllCategories() {
  const {data:categories, isLoading} = useGetAllCategoryQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true
  })
  return {categories, isLoading}
}
