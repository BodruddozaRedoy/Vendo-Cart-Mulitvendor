import { useGetAllVendorQuery } from '@/redux/features/vendor/vendorApi'
import React from 'react'

export default function useGetAllVendor() {
    const {data, isLoading} = useGetAllVendorQuery(undefined, {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true
    })
    const vendors = data?.data
    return {vendors, isLoading}
}
