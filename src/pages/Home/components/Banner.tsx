import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";



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
        image: "image",
    },
    {
        subtitle: "subtitle3",
        title: "title3",
        description: "description",
        productLink: "product link",
        image: "image",
    },
];

// main banner 
const MainBanner = () => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    return (
        <div className="relative">
            <div className="flex gap-4 mt-4 absolute bottom-10 left-10 z-10">
                <Button
                    ref={prevRef}
                    className="bg-secondary px-3 py-1 rounded hover:bg-secondary"
                >
                    <IoIosArrowBack />
                </Button>
                <Button
                    ref={nextRef}
                    className="bg-primary px-3 py-1 rounded "
                >
                    <IoIosArrowForward/>
                </Button>
            </div>
            <Swiper
                modules={[Navigation, Pagination]} // Include Pagination if you want it
                slidesPerView={1}
                navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                }}
                onBeforeInit={(swiper) => {
                    // Ensure navigation is correctly typed and assigned
                    if (swiper.params.navigation) {
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
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
                        <div className="w-full h-[500px] bg-[#d4f7ff] text-primary rounded-lg p-10 relative">
                            <div className=" space-y-5">
                                <p>{banner.subtitle}</p>
                                <p className="font-bold text-4xl w-1/2 leading-14">{banner.title}</p>
                                <p className="text-sm w-1/3">{banner.description}</p>
                                <Button className="bg-secondary">Shop Now</Button>
                            </div>
                            <img
                                src={banner.image}
                                alt={banner.title}
                                className="object-contain absolute top-0 right-0"
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
        <div></div>
    )
}

export default function Banner() {


    return (
        <div className="grid grid-cols-1 lg:grid-cols-4">
            {/* Main banner */}
            <div className="col-span-3">
                <MainBanner />
            </div>
            {/* Side banner  */}
            <div className="col-span-1">
                <SideBanner/>
            </div>
        </div>
    );
}