import Navbar from '../components/layout/Navbar/Navbar'
import { Outlet } from 'react-router'
import Footer from '../components/layout/Footer/Footer'
import { Toaster } from 'sonner'

export default function MainLayout() {
  return (
    <div>
      <nav>
        <Navbar />
      </nav>
      <main className='my-10 lg:my-20 '>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
      <Toaster/>
    </div>
  )
}
