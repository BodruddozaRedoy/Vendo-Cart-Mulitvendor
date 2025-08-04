import FeaturedCategoryCard from '@/components/common/FeaturedCategoryCard';
import SectionTitle from '@/components/common/SectionTitle';
import { Skeleton } from '@/components/ui/skeleton';
import useGetAllCategories from '@/hooks/useGetAllCategories';
import type { ICategories } from '@/types';

// export const categories = [
//   {
//     name: "Smartphones",
//     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm5hHANz6aT-5NcugwT6goIfCECJFzLUW4pQ&s",
//     subcategories: ["Android Phones", "iPhones", "Gaming Phones", "Refurbished Phones"],
//   },
//   {
//     name: "Laptops",
//     image: "https://cdn.uc.assets.prezly.com/cc1e3f98-2fc8-4410-8dde-76f813c9691c/-/format/auto/Swift-Go-16-02.jpg",
//     subcategories: ["Gaming Laptops", "Business Laptops", "Ultrabooks", "MacBooks"],
//   },
//   {
//     name: "Tablets",
//     image: "https://images.samsung.com/is/image/samsung/p6pim/latin_en/sm-x620nzaduyo/gallery/latin-en-galaxy-tab-s10-fe-plus-sm-x626-547631-sm-x620nzaduyo-thumb-546363966?$UX_EXT2_PNG$",
//     subcategories: ["Android Tablets", "iPads", "Kids Tablets", "Drawing Tablets"],
//   },
//   {
//     name: "Wearables",
//     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR07y3qoO8kyJfS1UfDQRbQw1gr41Q1-mOy2Q&s",
//     subcategories: ["Smartwatches", "Fitness Bands", "Smart Glasses", "VR Headsets"],
//   },
//   {
//     name: "Audio Devices",
//     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDeyqODuvhx-6fp2mteiEJclWnh5kLURL0Tw&s",
//     subcategories: ["Wireless Earbuds", "Headphones", "Bluetooth Speakers", "Soundbars"],
//   },
//   {
//     name: "Computer Accessories",
//     image: "https://cdn.shopify.com/s/files/1/1603/9553/files/computer_accessories_for_vader_pro_wireless_mouse_480x480.webp?v=1726470102",
//     subcategories: ["Keyboards", "Mice", "Webcams", "Monitors"],
//   },
//   {
//     name: "Gaming Gear",
//     image: "https://blog.placeit.net/wp-content/uploads/2021/04/MSI-MEG-Aegis-Ti5-Gaming-PC.png",
//     subcategories: ["Gaming Consoles", "Game Controllers", "VR Sets", "Gaming Headsets"],
//   },
//   {
//     name: "Smart Home",
//     image: "https://images.indianexpress.com/2020/11/Diwali-sale.jpg",
//     subcategories: ["Smart Lights", "Smart Plugs", "Security Cameras", "Voice Assistants"],
//   },
// ];



export default function FeaturedCategories() {
  const { categories, isLoading } = useGetAllCategories()

  return (
    <div>
      <SectionTitle title={"Featured Categories"} description={"Choose your necessary products from this feature categories."} />
      <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 xl:gap-10 mt-5'>
        {isLoading && [0, 1, 2, 3, 4].map((_) => <Skeleton className='w-full' />)}
        {
          categories?.data?.map((category: ICategories, i: number) => (
            <FeaturedCategoryCard key={i} category={category} />
          ))
        }
      </div>
    </div>
  )
}
