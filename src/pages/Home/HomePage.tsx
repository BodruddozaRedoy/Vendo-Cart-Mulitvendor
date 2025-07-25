import Banner from './components/Banner'
import FeaturedCategories from './components/FeaturedCategories'

export default function HomePage() {
  return (
    <div className='space-y-10'>
      <Banner/>
      <FeaturedCategories/>
    </div>
  )
}
