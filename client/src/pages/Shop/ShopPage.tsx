import Features from '../Home/components/Feature'
import ProductCategories from './components/ProductCategories'
import ProductFilter from './components/ProductFilter'
import ShopBanner from './components/ShopBanner'
import ShopContainer from './components/ShopContainer'

export default function ShopPage() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-4 gap-5 lg:gap-10 container mx-auto px-4 sm:px-6'>
      {/* sidebar - moves to top on mobile */}
      <aside className='md:col-span-1 space-y-5'>
        <ProductCategories/>
        <ProductFilter/>
      </aside>

      {/* main content - full width on mobile, 3 cols on desktop */}
      <main className='md:col-span-3 space-y-5 p-2'>
        <ShopBanner/>
        <ShopContainer/>
      </main>

      {/* features - always full width */}
      <div className='col-span-full mt-5 lg:mt-10'>
        <Features/>
      </div>
    </div>
  )
}