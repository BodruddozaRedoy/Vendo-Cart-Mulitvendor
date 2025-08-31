import { Skeleton } from "@/components/ui/skeleton"

export default function ProductCardSecondarySkeleton() {
  return (
    <div className="flex flex-col sm:flex-row gap-2 p-3 sm:p-5 border text-primary rounded-lg h-full justify-center items-center relative w-full">
      <Skeleton className="w-32 h-32 sm:w-40 sm:h-40" />
      <div className='p-3 sm:p-5 flex-1 space-y-2 w-full'>
        <Skeleton className='h-3 w-20' />
        <Skeleton className='h-4 w-40' />
        <Skeleton className='h-4 w-24' />
        <Skeleton className='h-5 w-24' />
        <div className="space-y-1">
          <Skeleton className='h-3 w-5/6' />
          <Skeleton className='h-3 w-2/3' />
          <Skeleton className='h-3 w-1/2' />
        </div>
        <Skeleton className='h-9 w-32' />
      </div>
      <div className='absolute top-0 right-0'>
        <Skeleton className='h-6 w-14 rounded-tr-lg rounded-bl-lg' />
      </div>
    </div>
  )
}

