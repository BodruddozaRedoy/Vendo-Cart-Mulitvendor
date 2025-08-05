import { Separator } from '@/components/ui/separator';
import type { IVendor } from '@/types';
import { RiStarSFill } from "react-icons/ri";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";

export default function VendorCard({ vendor }: { vendor: IVendor }) {
    // Format the joined date to show only the year
    const joinedYear = new Date(vendor.joinedAt!).getFullYear();
    
    return (
        <div className='relative text-primary bg-background shadow-md rounded-lg p-4 sm:p-5 transition-all hover:shadow-lg'>
            {/* Vendor Name Badge */}
            <div className='absolute top-0 right-0 py-1 px-2 bg-primary text-background text-xs sm:text-sm rounded-tr-lg rounded-bl-lg'>
                {vendor.name}
            </div>
            
            {/* Main Content */}
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 sm:mt-5 gap-4'>
                {/* Left Section - Logo & Rating */}
                <div className='flex items-center gap-3 sm:flex-col sm:items-center sm:gap-2 w-full sm:w-auto'>
                    <img 
                        className='w-10 h-10 lg:w-15 lg:h-15 object-cover rounded-full ' 
                        src={vendor.logo} 
                        alt={`${vendor.name} logo`} 
                    />
                    <div className='flex items-center gap-1 text-muted-foreground text-sm'>
                        <RiStarSFill className='text-yellow-500 text-xl sm:text-2xl' />
                        <span>({vendor.rating})</span>
                        {/* <span className='sm:hidden'> • {vendor.reviewsCount} reviews</span> */}
                    </div>
                </div>
                
                {/* Right Section - Products & Join Date */}
                <div className='flex flex-col items-end gap-2 sm:gap-3 w-full sm:w-auto'>
                    <div className='py-1 px-2 bg-muted rounded text-xs sm:text-sm w-full sm:w-auto text-center'>
                        {vendor.products!.length} Products
                    </div>
                    <p className='text-xs text-muted-foreground'>
                        Member since {joinedYear}
                    </p>
                </div>
            </div>
            
            <Separator className='my-3 sm:my-4' />
            
            {/* Contact Info */}
            <div className='space-y-2 sm:space-y-3'>
                <div className='flex items-center gap-2 text-xs sm:text-sm'>
                    <FaLocationDot className='flex-shrink-0' />
                    <span className='truncate'>{vendor.address}</span>
                </div>
                <div className='flex items-center gap-2 text-xs sm:text-sm'>
                    <IoMdMail className='flex-shrink-0' />
                    <span className='truncate'>{vendor.contactMail}</span>
                </div>
            </div>
            
            {/* Verification Badge (Mobile) */}
            {/* {vendor.isVerified && (
                <div className='sm:hidden absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full'>
                    Verified
                </div>
            )} */}
        </div>
    );
}