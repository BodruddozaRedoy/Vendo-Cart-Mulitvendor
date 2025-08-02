import { useGetUserQuery } from '@/redux/features/auth/authApi'
import Banner from './components/Banner'
import BestSellers from './components/BestSellers'
import Features from './components/Feature'
import FeaturedCategories from './components/FeaturedCategories'
import LatestDeals from './components/LatestDeals'
import MultiPoster from './components/MultiPoster'
import Subscription from './components/Subscription'
import TopSellingProducts from './components/TopSellingProducts'
import Trending from './components/Trending'
import { useEffect } from 'react'

export default function HomePage() {
  const {data, isLoading} = useGetUserQuery(undefined)
  console.log(data, isLoading)
  // useEffect(() => {

  // })
  return (
    <div className='space-y-10 lg:space-y-20'>
      <section className='container mx-auto'>
        <Banner />
      </section>
      {/* loading  */}
      <div>
        <div className="w-12 text-primary"><svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,23a9.63,9.63,0,0,1-8-9.5,9.51,9.51,0,0,1,6.79-9.1A1.66,1.66,0,0,0,12,2.81h0a1.67,1.67,0,0,0-1.94-1.64A11,11,0,0,0,12,23Z"><animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite"></animateTransform></path></svg></div>
      </div>
      <section className='container mx-auto'>
        <FeaturedCategories />
      </section>
      <section className='container mx-auto'>
        <BestSellers />
      </section>
      <section className='container mx-auto'>
        <LatestDeals />
      </section>
      <section className='container mx-auto'>
        <MultiPoster />
      </section>
      <section className='bg-[#f0f3f8]'>
        <Trending />
      </section>
      <section className='container mx-auto'>
        <TopSellingProducts />
      </section>
      <section>
        <Features />
      </section>
      <section>
        <Subscription />
      </section>
    </div>
  )
}
