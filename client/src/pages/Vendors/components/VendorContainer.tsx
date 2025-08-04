import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import React, { useState } from 'react'
import { FaBarsProgress } from 'react-icons/fa6'
import { IoGrid } from 'react-icons/io5'
import { VscSettings } from 'react-icons/vsc'
import VendorCard from './VendorCard'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { useGetAllVendorQuery } from '@/redux/features/vendor/vendorApi'
import type { IVendor } from '@/types'

export default function VendorContainer() {
    const [productLayout, setProductLayout] = useState("grid")
    const {data:vendors} = useGetAllVendorQuery(undefined, {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true
    })
    console.log(vendors)
    return (
        <div className='space-y-5 text-primary'>
            {/* header  */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <Button className="bg-primary/10 text-primary gap-2 hover:text-white hidden lg:flex">
                    <VscSettings /> All Filters
                </Button>
                <div className="flex items-center justify-center lg:justify-end gap-4 h-8 w-full">
                    <p className="text-sm whitespace-nowrap hidden lg:flex">Showing 1-16 of 17 results</p>
                    <Separator orientation="vertical" className="hidden lg:flex" />
                    <div className="flex items-center  gap-4 h-8">
                        <Select>
                            <SelectTrigger size="sm" className="w-[115px] text-xs h-[40px] text-primary font-semibold">
                                <SelectValue placeholder="Sort By" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem className="text-xs text-primary font-semibold" value="Price Low">Price Low</SelectItem>
                                <SelectItem className="text-xs text-primary font-semibold" value="Price High">Price High</SelectItem>
                                <SelectItem className="text-xs text-primary font-semibold" value="Latest">Latest</SelectItem>
                                <SelectItem className="text-xs text-primary font-semibold" value="Oldest">Oldest</SelectItem>
                            </SelectContent>
                        </Select>

                        <Separator orientation="vertical" className="" />

                        <Select>
                            <SelectTrigger size="sm" className="w-[115px] text-xs h-[40px] text-primary font-semibold">
                                <SelectValue placeholder="Show" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem className="text-xs text-primary font-semibold" value="16">16 Items</SelectItem>
                                <SelectItem className="text-xs text-primary font-semibold" value="32">32 Items</SelectItem>
                                <SelectItem className="text-xs text-primary font-semibold" value="64">64 Items</SelectItem>
                            </SelectContent>
                        </Select>
                        <Separator orientation="vertical" className="" />
                        <div className="flex gap-1 text-xl">
                            <div onClick={() => setProductLayout("grid")} className={`cursor-pointer select-none bg-primary/10 p-2 text-primary rounded ${productLayout === "grid" && 'text-secondary'}`}>
                                <IoGrid className="" />
                            </div>
                            <div onClick={() => setProductLayout("bars")} className={`cursor-pointer select-none bg-primary/10 p-2 text-primary rounded ${productLayout === "bars" && 'text-secondary'}`}>
                                <FaBarsProgress />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Separator className="w-full" />
            <div className='grid grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    vendors?.data?.map((vendor:IVendor, index:number) => (
                        <VendorCard vendor={vendor} key={index} />
                    ))
                }
            </div>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#" isActive>
                            2
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}
