import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Index from "./pages/Index"
import Products from "./pages/Products"
import Orders from "./pages/Orders"
import Analytics from "./pages/Analytics"
import Customers from "./pages/Customers"
import Store from "./pages/Store"
import Notifications from "./pages/Notifications"
import Settings from "./pages/Settings"
import NotFound from "./pages/NotFound"
import AddProduct from "./pages/AddProduct"
import { Provider } from "react-redux"
import { store } from "./redux/store"
import Login from "./pages/Login"
import { useGetProfile } from "./hooks/useGetProfile"
import Loading from "./components/Loading"
import UpdateProduct from "./pages/UpdateProduct"

const queryClient = new QueryClient()

const App = () => {
  const { isLoading } = useGetProfile()

  if (isLoading) return <div className="w-screen h-screen flex items-center justify-center"><Loading /></div>

  return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/add-product" element={<AddProduct />} />
              <Route path="/product/update-product/:id" element={<UpdateProduct/>}/>
              <Route path="/orders" element={<Orders />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/store" element={<Store />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
  )
}

export default App
