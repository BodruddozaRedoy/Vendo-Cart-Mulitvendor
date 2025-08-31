import { Skeleton } from "@/components/ui/skeleton"

export default function ProductCardPrimarySkeleton() {
  return (
    <div className='bg-background shadow border flex flex-col items-center rounded-lg text-primary relative w-full max-w-xs sm:max-w-sm md:max-w-md'>
      <Skeleton className='w-full max-w-[240px] h-40 sm:h-48 mt-6' />
      <div className='p-4 sm:p-5 flex-1 space-y-2 w-full'>
        <Skeleton className='h-3 w-20' />
        <Skeleton className='h-4 w-40' />
        <div className='flex items-center gap-2'>
          <Skeleton className='h-4 w-24' />
        </div>
        <Skeleton className='h-5 w-24' />
        <Skeleton className='h-10 w-full' />
      </div>
      <Skeleton className='h-10 w-full rounded-b-lg' />
      <div className='absolute top-0 right-0'>
        <Skeleton className='h-6 w-14 rounded-tr-lg rounded-bl-lg' />
      </div>
    </div>
  )
}

