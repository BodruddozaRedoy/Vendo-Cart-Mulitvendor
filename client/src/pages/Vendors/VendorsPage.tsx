import { Button } from '@/components/ui/button'
import Features from '../Home/components/Feature'
import VendorContainer from './components/VendorContainer'
import VendorFilter from './components/VendorFilter'

export default function VendorsPage() {
  return (
    <div className='text-primary container mx-auto px-4 sm:px-6 lg:px-8'>
      {/* Header Section */}
      <div className='mb-8 lg:mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4'>
        <div className='max-w-2xl'>
          <h1 className='text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold mb-2 lg:mb-3'>
            Vendor Listing
          </h1>
          <p className='text-sm sm:text-base text-muted-foreground'>
            We have 780 vendors now
          </p>
        </div>
        
        <div className='flex flex-wrap gap-2 sm:gap-3 items-center w-full sm:w-auto'>
          <Button variant="ghost" size="sm" className='text-sm hidden sm:inline-flex'>
            Support Ticket
          </Button>
          <Button variant="ghost" size="sm" className='text-sm hidden sm:inline-flex'>
            Become an Affiliate
          </Button>
          <Button size="sm" className='text-sm w-full sm:w-auto'>
            Open a Shop
          </Button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-4 gap-5 xl:gap-8'>
        {/* Sidebar - full width on mobile, 1 col on desktop */}
        <aside className='lg:col-span-1 space-y-5'>
          <VendorFilter/>
        </aside>

        {/* Main Content - full width on mobile, 3 cols on desktop */}
        <main className='lg:col-span-3 space-y-5'>
          <VendorContainer/>
        </main>

        {/* Features Section - always full width */}
        <div className='col-span-full mt-8 lg:mt-12'>
          <Features/>
        </div>
      </div>
    </div>
  )
}