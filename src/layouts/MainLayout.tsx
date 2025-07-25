import Navbar from '../components/common/Navbar/Navbar'
import { Outlet } from 'react-router'
import Footer from '../components/common/Footer/Footer'

export default function MainLayout() {
  return (
    <div>
      <nav>
        <Navbar />
      </nav>
      <main className='container mx-auto my-10 space-y-10'>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}
