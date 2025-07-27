import Navbar from '../components/layout/Navbar/Navbar'
import { Outlet } from 'react-router'
import Footer from '../components/layout/Footer/Footer'

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
    </div>
  )
}
