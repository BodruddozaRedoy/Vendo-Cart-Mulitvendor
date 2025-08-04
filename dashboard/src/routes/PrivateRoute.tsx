import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loading from '@/components/Loading'
import { useGetProfile } from '@/hooks/useGetProfile'
import { RootState } from '@/redux/store' // Adjust if needed

export default function PrivateRoute() {
  const { fetchedUser: user, isLoading } = useGetProfile()
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Loading color="text-primary" />
      </div>
    )
  }

  if (!isAuthenticated && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
}
