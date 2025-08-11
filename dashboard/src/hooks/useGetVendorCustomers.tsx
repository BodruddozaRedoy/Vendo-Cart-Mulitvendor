import { useGetVendorCustomersQuery } from '@/redux/features/vendor/vendorApi'
import React from 'react'
import { useGetProfile } from './useGetProfile'

export default function useGetVendorCustomers() {
  const {fetchedUser, isLoading} = useGetProfile()
  const {data} = useGetVendorCustomersQuery(fetchedUser?._id, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true
  })
  console.log(data)
  return{customers:data}
}
