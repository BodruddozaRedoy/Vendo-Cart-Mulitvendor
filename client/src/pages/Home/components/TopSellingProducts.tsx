import SectionTitle from '@/components/common/SectionTitle';
import { useRef, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Grid, Navigation, Pagination } from 'swiper/modules';
import ProductCardSecondary from '@/components/common/ProductCardSecondary';
import type { IProduct } from '@/types';

import 'swiper/swiper-bundle.css'; // For all Swiper styles
import useGetAllProducts from '@/hooks/useGetAllProducts';

// Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/grid';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/autoplay';

export default function TopSellingProducts() {
  const {products} = useGetAllProducts()
  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);
  const [swiperReady, setSwiperReady] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-5">
      {/* Left side: Carousel */}
      <div className="col-span-4">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <SectionTitle
            title="Top Selling Products"
            description="Special top selling products in this month"
          />
          <div className="flex gap-2 items-center mt-5 lg:mt-0">
            <div
              ref={prevRef}
              className="rounded-lg p-2 border border-primary text-primary cursor-pointer select-none active:scale-95 hover:bg-primary hover:text-white transition-colors"
            >
              <IoIosArrowBack />
            </div>
            <div
              ref={nextRef}
              className="rounded-lg p-2 border border-primary text-primary cursor-pointer select-none active:scale-95 hover:bg-primary hover:text-white transition-colors"
            >
              <IoIosArrowForward />
            </div>
          </div>
        </div>

        {/* Swiper content */}
        <div className="mt-5">
          <Swiper
            className="!h-[600px] sm:!h-[700px] lg:!h-full"
            modules={[Navigation, Pagination, Autoplay, Grid]}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
            }}
            spaceBetween={20}
            grid={{
              rows: 3,
              fill: 'row',
            }}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              if (typeof swiper.params.navigation !== 'boolean') {
                swiper.params.navigation!.prevEl = prevRef.current;
                swiper.params.navigation!.nextEl = nextRef.current;
              }
            }}
            onSwiper={() => {
              setSwiperReady(true);
            }}
          >
            {products?.data?.map((product: IProduct, index: number) => (
              <SwiperSlide key={index} className="!h-auto">
                <div className="h-full">
                  <ProductCardSecondary product={product} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Right side */}
      <div
        className="col-span-2 rounded-lg p-5 sm:p-10 flex flex-col items-center justify-start text-white space-y-4"
        style={{
          backgroundImage: "url('https://i.ibb.co/xtfXhjNZ/download-4.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '500px',
        }}
      >
        <div className='rounded-lg py-1 px-2 bg-blue-500'>No.9</div>
        <h1 className='text-2xl lg:text-4xl text-primary font-semibold text-center'>Sensitive Touch without fingerprint</h1>
        <p className='font-light text-primary text-center text-lg'>Smooth handle an accurate click</p>

      </div>
    </div>
  );
}