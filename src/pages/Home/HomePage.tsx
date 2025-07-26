import Banner from './components/Banner'
import BestSellers from './components/BestSellers'
import FeaturedCategories from './components/FeaturedCategories'
import LatestDeals from './components/LatestDeals'
import MultiPoster from './components/MultiPoster'

export default function HomePage() {
  return (
    <div className='space-y-10'>
      <Banner/>
      <FeaturedCategories/>
      <BestSellers/>
      <LatestDeals/>
      <MultiPoster/>
    </div>
  )
}
