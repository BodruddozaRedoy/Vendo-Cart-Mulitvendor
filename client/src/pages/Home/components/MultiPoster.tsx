import { Button } from "@/components/ui/button";

export default function MultiPoster() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[35%_65%] lg:grid-rows-2 gap-5 w-full">
      {/* Grid 1 - Poster 1 */}
      <div className="bg-[#dfe7fd] relative p-5 sm:p-8 lg:p-10 lg:py-20 rounded-lg space-y-3 row-span-2">
        <p className="text-red-500 font-light">Flat 20% OFF</p>
        <h3 className="text-primary font-semibold text-2xl">Microsoft</h3>
        <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl text-primary w-3/4 sm:w-2/3 lg:w-1/2">
          Xbox Series S
        </h1>
        <p className="font-light text-primary">From $450</p>
        <Button>Shop Now</Button>
        <img
          className="absolute bottom-0 right-0 w-40 sm:w-60 lg:w-80 h-auto object-contain"
          src="https://i.ibb.co/9HjWjG9R/download.png"
          alt=""
        />
      </div>

      {/* Grid 2 - Posters 2 & 3 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Poster 2 */}
        <div className="bg-[#d1ecfd] relative py-5 px-5 sm:pl-[180px] lg:pl-[250px] flex flex-col justify-center items-start rounded-lg space-y-3">
          <img
            src="https://i.ibb.co/rKWZNj58/download-1.png"
            className="w-28 sm:w-32 h-auto object-contain absolute top-5 sm:top-10 left-5"
            alt=""
          />
          <h1 className="text-primary font-semibold text-xl sm:text-2xl">
            Xbox Core Wireless Controller
          </h1>
          <p className="text-blue-400">Aqua Shift Special Edition</p>
          <Button>Shop Now</Button>
        </div>

        {/* Poster 3 */}
        <div className="bg-[#fff3ea] p-5 rounded-lg relative flex flex-col justify-center items-start gap-3">
          <img
            src="https://i.ibb.co/5gR5B5nK/download-2.png"
            className="absolute bottom-0 right-0 w-24 sm:w-40 h-auto object-contain"
            alt=""
          />
          <h1 className="text-primary font-semibold text-xl sm:text-2xl w-2/3">
            Metaverse
          </h1>
          <p className="text-primary">The Future of Creativity</p>
          <Button>Shop Now</Button>
        </div>
      </div>

      {/* Grid 3 - Posters 4 & 5 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Poster 4 */}
        <div className="bg-[#e8fcff] p-5 rounded-lg relative flex flex-col items-center justify-center text-center space-y-3">
          <h1 className="text-primary font-semibold text-xl sm:text-2xl w-2/3">
            Electronic
          </h1>
          <p className="text-primary">Hot devices, Latest trending</p>
          <img
            src="https://i.ibb.co/5gR5B5nK/download-2.png"
            className="w-20 sm:w-28 h-auto object-contain"
            alt=""
          />
        </div>

        {/* Poster 5 */}
        <div className="bg-[#ddd3fa] relative py-5 px-5 flex flex-col justify-center items-start rounded-lg space-y-3">
          <img
            src="https://i.ibb.co/rKWZNj58/download-1.png"
            className="w-28 sm:w-40 h-auto object-contain absolute top-5 sm:top-10 right-5"
            alt=""
          />
          <h1 className="text-primary font-semibold text-xl sm:text-2xl w-2/3">
            Super Discount for Your First Purchase
          </h1>
          <p className="text-blue-400">Use discount code in checkout page</p>
          <Button>Shop Now</Button>
        </div>
      </div>
    </div>
  );
}
