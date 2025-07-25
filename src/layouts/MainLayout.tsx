import React from 'react'
import Navbar from '../components/common/Navbar/Navbar'
import { Outlet } from 'react-router'
import Footer from '../components/common/Footer/Footer'

export default function MainLayout() {
  return (
    <div>
      <nav>
        <Navbar />
      </nav>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}
