
export const vendorTags = [
    "Electronics",
    "Fashion",
    "Home & Garden",
    "Beauty & Care",
    "Sports & Outdoors",
    "Toys & Games",
    "Books & Media",
    "Health & Wellness",
    "Automotive",
    "Pet Supplies"
];

export default function VendorFilter() {
  return (
    <div className="">
      <h1 className='font-semibold text-primary text-xl'>Vendor by tags</h1>
      <div className='relative my-4'>
        <div className='absolute top-1/2 left-0 transform -translate-y-1/2 w-20 h-1.5 bg-secondary rounded-lg'></div>
        <hr className='w-full border-t border-gray-200'/>
      </div>
      <div className="flex gap-2 flex-wrap">
        {
            vendorTags?.map((tag, i) => (
                <div key={i} className="border border-primary rounded-lg text-primary py-1 px-3 text-nowrap text-sm cursor-pointer hover:bg-primary/10 ">{tag}</div>
            ))
        }
      </div>
    </div>
  )
}