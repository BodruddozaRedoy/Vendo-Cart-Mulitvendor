import { DashboardLayout } from '@/components/DashboardLayout'
import { useGetProfile } from '@/hooks/useGetProfile'
import React from 'react'
import VendorDashboard from './vendor/VendorDashboard'
import AdminDashboard from './admin/AdminDashboard'

export default function Dashboard() {
    const { fetchedUser: user, isLoading } = useGetProfile()
  return (
    <>
        {
            user?.role === "vendor" ? <VendorDashboard/> : <AdminDashboard/>
        }
    </>
  )
}
