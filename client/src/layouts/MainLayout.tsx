import Navbar from '../components/layout/Navbar/Navbar'
import { Outlet } from 'react-router'
import Footer from '../components/layout/Footer/Footer'
import { Toaster } from 'sonner'
import { useGetUserQuery } from '@/redux/features/auth/authApi'

export default function MainLayout() {
  const { data:user, isLoading } = useGetUserQuery(undefined)
  return (
    <div>
      {
        isLoading ? (
          <div className='w-full h-screen flex items-center justify-center'>
            <div className="w-12 text-primary"><svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,23a9.63,9.63,0,0,1-8-9.5,9.51,9.51,0,0,1,6.79-9.1A1.66,1.66,0,0,0,12,2.81h0a1.67,1.67,0,0,0-1.94-1.64A11,11,0,0,0,12,23Z"><animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite"></animateTransform></path></svg></div>
          </div>
        ) : (
          <main>
            <nav>
              <Navbar />
            </nav>
            <main className='my-10 lg:my-20 '>
              <Outlet />
            </main>
            <footer>
              <Footer />
            </footer>
          </main>
        )
      }
      <Toaster />
    </div>
  )
}
