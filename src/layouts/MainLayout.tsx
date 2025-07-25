import Navbar from '../components/layout/Navbar/Navbar'
import { Outlet } from 'react-router'
import Footer from '../components/layout/Footer/Footer'

export default function MainLayout() {
  return (
    <div>
      <nav>
        <Navbar />
      </nav>
      <main className='container mx-auto my-10 '>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}
