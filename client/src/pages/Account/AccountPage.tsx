import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import OrderTracking from "./components/OrderTracking"
import MyOrders from "./components/MyOrders"
import Settings from "./components/Settings"
import { Link, useLocation } from "react-router"
import { useEffect } from "react"
import Notification from "./components/Notification"
import { useGetProfile } from "@/hooks/useGetProfile"

export default function AccountPage() {
  const location = useLocation()
  const {user} = useGetProfile()
  // console.log(user)
  // console.log(location.pathname)
  useEffect(()=> {
    
  },[location])
  return (
    <div className='text-primary container mx-auto'>
      <h1 className='text-xl lg:text-4xl'>Hello, {user?.fullName}</h1>
      <p>From your account dashboard. you can easily check & view your recent orders,
        manage your shipping and billing addresses and edit your password and account details.</p>

      <div className="mt-10">
        <Tabs value={location.pathname}  className="w-full mb-5">
          <TabsList>
            <TabsTrigger value={`/account/profile`}><Link to={"/account/profile"}>Notification</Link></TabsTrigger>
            <TabsTrigger value="/account/order-tracking"><Link to={"/account/order-tracking"}>Order Tracking</Link></TabsTrigger>
            <TabsTrigger value="/account/my-orders"><Link to={"/account/my-orders"}>My Orders</Link></TabsTrigger>
            <TabsTrigger value="/account/settings"><Link to={"/account/settings"}>Settings</Link></TabsTrigger>
          </TabsList>
          <Separator className="my-5 w-full" />
          <TabsContent value="/account/profile"><Notification /></TabsContent>
          <TabsContent value="/account/order-tracking"><OrderTracking /></TabsContent>
          <TabsContent value="/account/my-orders"><MyOrders /></TabsContent>
          <TabsContent value="/account/settings"><Settings /></TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
