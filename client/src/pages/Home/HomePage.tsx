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
  const { data, isLoading } = useGetUserQuery(undefined)
  console.log(data, isLoading)
  // useEffect(() => {

  // })
  return (
    <div className='space-y-10 lg:space-y-20'>
      <section className='container mx-auto'>
        <Banner />
      </section>
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
