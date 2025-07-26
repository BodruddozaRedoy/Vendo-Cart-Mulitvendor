import Banner from './components/Banner'
import BestSellers from './components/BestSellers'
import FeaturedCategories from './components/FeaturedCategories'
import LatestDeals from './components/LatestDeals'
import MultiPoster from './components/MultiPoster'
import Trending from './components/Trending'

export default function HomePage() {
  return (
    <div className='space-y-10'>
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
    </div>
  )
}
