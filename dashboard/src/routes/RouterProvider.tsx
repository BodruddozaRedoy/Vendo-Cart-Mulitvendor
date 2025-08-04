import { Routes, Route, useLocation, Navigate } from "react-router-dom"
import { useGetProfile } from "@/hooks/useGetProfile"
import PrivateRoute from "./PrivateRoute"
import Login from "@/pages/Login"
import NotFound from "@/pages/NotFound"
import VendorDashboard from "@/pages/vendor/VendorDashboard"
import AdminDashboard from "@/pages/admin/AdminDashboard"
import Products from "@/pages/vendor/Products"
import AddProduct from "@/pages/vendor/AddProduct"
import UpdateProduct from "@/pages/UpdateProduct"
import Orders from "@/pages/vendor/Orders"
import Analytics from "@/pages/vendor/Analytics"
import Customers from "@/pages/vendor/Customers"
import Store from "@/pages/Store"
import Notifications from "@/pages/Notifications"
import Settings from "@/pages/Settings"
import Loading from "@/components/Loading"
import ManageProducts from "@/pages/admin/ManageProducts"
import ManageOrders from "@/pages/admin/ManageOrders"
import AdminAnalytics from "@/pages/admin/AdminAnalytics"
import Users from "@/pages/admin/Users"
import Category from "@/pages/admin/Category"

export default function RouterProvider() {
  const location = useLocation()
  const { fetchedUser: user, isLoading } = useGetProfile()

  if (isLoading) {
    return <div className="w-screen h-screen flex justify-center items-center"><Loading color={"text-primary"} /></div>
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route element={<PrivateRoute />}>
        {user?.role === "vendor" && (
          <Route path="/" element={<Navigate to="/vendor" replace />} />
        )}
        {user?.role === "admin" && (
          <Route path="/" element={<Navigate to="/admin" replace />} />
        )}

        {/* Vendor */}
        <Route path="/vendor" element={<VendorDashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/add-product" element={<AddProduct />} />
        <Route path="/product/update-product/:id" element={<UpdateProduct />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/store" element={<Store />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<Settings />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/manage-products" element={<ManageProducts/>}/>
        <Route path="/manage-products/categories" element={<Category/>}/>
        <Route path="/manage-orders" element={<ManageOrders/>}/>
        <Route path="/admin-analytics" element={<AdminAnalytics/>}/>
        <Route path="/users" element={<Users/>}/>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
