'use client';

import SectionTitle from '@/components/common/SectionTitle';
import  { useRef, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Grid, Navigation, Pagination } from 'swiper/modules';
import { products } from './BestSellers';
import ProductCardSecondary from '@/components/common/ProductCardSecondary';
import type { IProduct } from '@/types';

import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function TopSellingProducts() {
  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);
  const [swiperReady, setSwiperReady] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-5">
      {/* Left side: Carousel */}
      <div className="col-span-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <SectionTitle
            title="Top Selling Products"
            description="Special top selling products in this month"
          />
          <div className="flex gap-2 items-center">
            <div
              ref={prevRef}
              className="rounded-lg p-2 border border-primary text-primary cursor-pointer select-none active:scale-95"
            >
              <IoIosArrowBack />
            </div>
            <div
              ref={nextRef}
              className="rounded-lg p-2 border border-primary text-primary cursor-pointer select-none active:scale-95"
            >
              <IoIosArrowForward />
            </div>
          </div>
        </div>

        {/* Swiper content */}
        <div className="mt-5">
          <Swiper
            className="!h-[700px]"
            modules={[Navigation, Pagination, Autoplay, Grid]}
            slidesPerView={2}
            spaceBetween={20}
            grid={{
              rows: 3,
              fill: 'row',
            }}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            onBeforeInit={(swiper) => {
              // Attach custom buttons before init
              if (typeof swiper.params.navigation !== 'boolean') {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }
            }}
            onSwiper={() => {
              setSwiperReady(true);
            }}
          >
            {products.map((product: IProduct, index: number) => (
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
        className="col-span-2 rounded-lg p-10 flex flex-col items-center justify-start text-white"
        style={{
          backgroundImage: "url('https://i.ibb.co/xtfXhjNZ/download-4.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '600px',
        }}
      >
        g
      </div>
    </div>
  );
}
