import type { IProduct } from '@/types'
import CountdownTimer from './Countdown'
import { FaStar } from 'react-icons/fa'
import { Progress } from "@/components/ui/progress"

export default function SpecialProductCard({ product }: { product: IProduct }) {
  return (
    <div className='bg-background shadow-md flex flex-col items-center rounded-lg text-primary relative gap-5 overflow-hidden h-full p-5'>
      <div className='bg-red-500 py-1 px-5 w-full text-center font-semibold text-background -rotate-45 absolute top-10 -left-61'>Hurry up!</div>
      <img className='w-80 object-contain h-80 ' src={product.image} alt="" />
      <h4 className='font-bold text-2xl'>Special Offer</h4>
      <p className='text-muted-foreground'>Remains until the end of the offer</p>
      <CountdownTimer targetDate={new Date("2025-07-30T18:00:00")} />
      <hr className='my-3 w-full' />
      <div className='flex-1 space-y-2'>
        <p className='text-xs font-semibold'>{product.brand}</p>
        <h1 className='font-semibold text-2xl'>{product.name}</h1>
        <p className='flex gap-1 items-center text-sm font-light'><FaStar className='text-yellow-500' />
          ({product.rating})</p>
        <p className='font-bold text-xl'>${product.price}</p>
        <p className='font-light text-sm'>{product.description}</p>
      </div>
      <Progress value={20} className=''/>
      <div className='flex justify-between items-center w-full'>
        <p className='font-light text-xs'>Available: <span className='font-semibold text-xs'>80</span></p>
        <p className='font-light text-xs'>Sold: <span className='font-semibold text-xs'>20</span></p>
      </div>
      <hr className='my-3 w-full'/>
      <div className='flex flex-col items-start w-full px-5'>
        {
        product.features.slice(0, 3).map((list, i) => (
          <p key={i} className='list-item text-muted-foreground text-sm'>{list}</p>
        ))
      }
      </div>

    </div>
  )
}
