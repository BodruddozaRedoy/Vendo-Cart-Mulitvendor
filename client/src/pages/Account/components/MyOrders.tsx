import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useGetMyOrdersQuery } from '@/redux/features/order/orderApi';
import type { IOrder } from '@/types';



// Removed unused interface

export default function MyOrders() {
  const {data:orders} = useGetMyOrdersQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true
  })
  console.log(orders)
  return (
    <div className='text-primary space-y-6 container mx-auto p-4'>
      {orders?.length === 0 && <p>No order history found</p>}
      {orders?.map((order:IOrder, index:number) => (
        <div key={index} className='rounded-lg bg-background shadow-md p-5'>
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3'>
            <div className='flex flex-col sm:flex-row gap-4 sm:items-center'>
              <h1 className='font-semibold text-lg sm:text-xl'>Order ID: {order._id}</h1>
              <p className='font-light text-sm sm:text-base'>Date: {order.createdAt}</p>
              <div className='py-1 px-3 rounded-lg bg-secondary text-background text-xs sm:text-sm font-light whitespace-nowrap'>
                {order.deliveryStatus}
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <Button className="whitespace-nowrap self-start sm:self-auto">View Order</Button>
              <Button variant={"outline"}>Total: {(order.totalAmount)?.toFixed(2) + " +D/C"}</Button>
            </div>
          </div>

          <Separator className='my-5' />

          <div className='space-y-4'>
            
            {order.products.map((product:any, i:number) => (
              <div
                key={i}
                className='flex flex-col sm:flex-row sm:items-center justify-between gap-3'
              >
                <div className='flex items-center gap-3 flex-1 min-w-0'>
                  <img
                    className='w-20 h-20 object-cover rounded-lg flex-shrink-0'
                    src={product.product.image}
                    alt={product.product.name}
                  />
                  <h1 className='font-semibold text-lg truncate'>{product.product.name}</h1>
                </div>
                <p className='font-semibold text-base sm:text-lg whitespace-nowrap'>
                  Quantity: {product.quantity}
                </p>
                <p className='font-semibold text-xl sm:text-2xl whitespace-nowrap'>
                  ${product.product.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
