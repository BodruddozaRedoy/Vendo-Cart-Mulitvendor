import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import 'swiper/swiper-bundle.css'; // For all Swiper styles

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { IoIosArrowBack, IoIosArrowForward, IoMdArrowDropright } from "react-icons/io";



const mainBanner = [
    {
        subtitle: "New Arrival",
        title: "Stylish Summer Collection 2025",
        description: "Upgrade your wardrobe with our latest summer wear. Breezy styles, bold colors, and unbeatable comfort — made for everyday confidence.",
        productLink: "product link",
        image: "https://i.ibb.co/Qvs9TZYS/ideapad-5-2-in-1-14ahp9-008-500x500-removebg-preview.png",
    },
    {
        subtitle: "Just Dropped",
        title: "Smart & Sleek Laptops",
        description: "Powerful performance meets minimal design. Discover the latest range of laptops built for work, creativity, and play — all in one.",
        productLink: "product link",
        image: "https://i.ibb.co/Fkxd72xj/giant-277731-removebg-preview.png",
    },
    {
        subtitle: "subtitle3",
        title: "title3",
        description: "description",
        productLink: "product link",
        image: "https://www.pngall.com/wp-content/uploads/9/Electronics-Gadget-PNG-Photos.png",
    },
];

// main banner 
const MainBanner = () => {
    const prevRef = useRef<HTMLDivElement | null>(null);
    const nextRef = useRef<HTMLDivElement | null>(null);
    const bannerBgColors = ["#d4f7ff", "#e0f2ee", "#fff4f6"];

    return (
        <div className="relative">
            <div className="flex gap-4 mt-4 absolute bottom-5 right-5 lg:bottom-10 lg:left-10 z-10">
                <div
                    ref={prevRef}
                    className="bg-secondary px-3 py-2 flex items-center justify-center rounded hover:bg-secondary  text-background"
                >
                    <IoIosArrowBack />
                </div>
                <div
                    ref={nextRef}
                    className="bg-primary px-3 py-2 flex items-center justify-center rounded text-background "
                >
                    <IoIosArrowForward />
                </div>
            </div>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]} // Include Pagination if you want it
                slidesPerView={1}
                navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                }}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false
                }}
                onBeforeInit={(swiper) => {
                    // Ensure navigation is correctly typed and assigned
                    if (typeof swiper.params.navigation !== 'boolean') {
                        swiper.params.navigation!.prevEl = prevRef.current;
                        swiper.params.navigation!.nextEl = nextRef.current;
                    }
                }}
                onInit={(swiper) => {
                    // Initialize navigation after swiper is ready
                    swiper.navigation.init();
                    swiper.navigation.update();
                }}
            >
                {mainBanner?.map((banner, i) => (
                    <SwiperSlide key={i}>
                        <div
                            className="w-full h-[200px] lg:h-[500px] text-primary flex flex-col justify-center rounded-lg p-5 lg:p-10 relative"
                            style={{ backgroundColor: bannerBgColors[i % bannerBgColors.length] }}
                        >
                            <div className="space-y-2 lg:space-y-5">
                                <p>{banner.subtitle}</p>
                                <p className="font-bold lg:text-4xl w-1/2 lg:leading-14">{banner.title}</p>
                                <p className="text-sm w-2/3 truncate">{banner.description}</p>
                                <Button className="bg-secondary">Shop Now <IoMdArrowDropright />
                                </Button>
                            </div>
                            <img
                                src={banner.image}
                                alt={banner.title}
                                className="object-contain absolute top-10 lg:top-0 right-5 w-30 lg:w-[500px] border"
                            />
                        </div>
                    </SwiperSlide>
                ))}

            </Swiper>

        </div>
    )
}

const SideBanner = () => {
    return (
        <div className="mt-5 lg:mt-0 lg:ml-5 flex lg:flex-col gap-5 items-center justify-end h-full">
            {/* 1st banner  */}
            <div className="lg:w-full bg-[#fff4f6] lg:h-1/2 flex flex-col justify-center text-primary rounded-lg p-5 relative overflow-hidden">
                <div className=" space-y-3 flex flex-col items-center lg:items-start">
                    <p className="font-light">Top 10% Discount</p>
                    <p className="font-bold text-center lg:text-start lg:text-xl lg:w-1/2">Apple watch series 7</p>
                    <p className="font-semibold text-sm lg:w-2/3 text-center lg:text-start">Apple watch series 7 with features</p>
                    <Button className="bg-secondary">Shop Now <IoMdArrowDropright />
                    </Button>
                </div>
                <img
                    src={"https://i.ibb.co/Fkxd72xj/giant-277731-removebg-preview.png"}
                    alt={"banner.title"}
                    className="object-contain absolute -bottom-10 -right-10 w-30 lg:w-[200px] hidden lg:block"
                />
            </div>
            {/* 2nd banner  */}
            <div className="lg:w-full bg-[#e0f2ee] lg:h-1/2 flex flex-col justify-center text-primary rounded-lg p-5 relative overflow-hidden">
                <div className=" space-y-3 flex flex-col items-center lg:items-start">
                    <p className="font-light">Top 10% Discount</p>
                    <p className="font-bold text-center lg:text-start lg:text-xl lg:w-1/2">Apple watch series 7</p>
                    <p className="font-semibold text-sm lg:w-2/3 text-center lg:text-start">Apple watch series 7 with features</p>
                    <Button className="bg-secondary">Shop Now <IoMdArrowDropright />
                    </Button>
                </div>
                <img
                    src={"https://i.ibb.co/Fkxd72xj/giant-277731-removebg-preview.png"}
                    alt={"banner.title"}
                    className="object-contain absolute -bottom-10 -right-10 w-30 lg:w-[200px] hidden lg:block"
                />
            </div>
        </div>
    )
}

export default function Banner() {


    return (
        <div className="grid grid-cols-1 lg:grid-cols-6">
            {/* Main banner */}
            <div className="col-span-4">
                <MainBanner />
            </div>
            {/* Side banner  */}
            <div className="col-span-2">
                <SideBanner />
            </div>
        </div>
    );
}