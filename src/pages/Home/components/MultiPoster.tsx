import { Button } from "@/components/ui/button";

export default function MultiPoster() {
    return (
        <div className="grid grid-cols-[35%_65%] grid-rows-2 gap-5 w-full">
            {/* grid 1 */}
            {/* poster 1  */}
            <div className="bg-[#dfe7fd] row-span-2 relative p-5 lg:p-10 lg:py-20 rounded-lg space-y-3">
                <p className="text-red-500 font-light">Flat 20% OFF</p>
                <h3 className="text-primary font-semibold text-2xl ">Microsoft</h3>
                <h1 className="font-bold text-5xl text-primary w-1/2">Xbox Series S</h1>
                <p className="font-light text-primary">From $450</p>
                <Button>Shop Now</Button>
                <img className="absolute bottom-0 right-0 w-80 object-contain h-80" src="https://i.ibb.co/9HjWjG9R/download.png" alt="" />
            </div>
            {/* grid 2  */}
            <div className="grid grid-cols-[60%_40%] gap-5 ">
                {/* poster 2  */}
                <div className="bg-[#d1ecfd] relative py-5 flex flex-col justify-center items-start rounded-lg space-y-3 pl-[250px]">
                    <img src="https://i.ibb.co/rKWZNj58/download-1.png" className="w-40 h-40 object-contain absolute top-10 left-5" alt="" />
                    <h1 className="text-primary font-semibold text-2xl">Xbox Core Wireless Controller</h1>
                    <p className="text-blue-400">Aqua Shift Special Edition</p>
                    <Button>Shop Now</Button>
                </div>
                {/* poster 3  */}
                <div className="bg-[#fff3ea] p-5 rounded-lg relative flex flex-col justify-center items-start gap-3">
                    <img src="https://i.ibb.co/5gR5B5nK/download-2.png" className="absolute bottom-0 right-0 w-50 h-50 object-contain" alt="" />
                    <h1 className="text-primary font-semibold text-2xl w-2/3">Metaverse</h1>
                    <p className="text-primary">The Future of Creativity</p>
                    <Button>Shop Now</Button>
                </div>
            </div>
            <div className="grid grid-cols-[40%_60%] gap-5">
                {/* poster 4  */}
                <div className="bg-[#e8fcff] p-5 rounded-lg relative flex flex-col items-center justify-center">
                    <h1 className="text-primary font-semibold text-2xl w-2/3 text-center">Electronic</h1>
                    <p className="text-primary text-center">Hot devices, Latest trending</p>
                    <img src="https://i.ibb.co/5gR5B5nK/download-2.png" className="w-30 h-30 object-contain" alt="" />
                </div>
                {/* poster 5 */}
                <div className="bg-[#ddd3fa] relative py-5 flex flex-col justify-center items-start rounded-lg space-y-3 pl-5">
                    <img src="https://i.ibb.co/rKWZNj58/download-1.png" className="w-40 h-40 object-contain absolute top-10 right-5" alt="" />
                    <h1 className="text-primary font-semibold text-2xl w-2/3">Super Discount for Your First Purchase</h1>
                    <p className="text-blue-400">Use discount code in checkout page</p>
                    <Button>Shop Now</Button>
                </div>
            </div>
        </div>
    )
}
