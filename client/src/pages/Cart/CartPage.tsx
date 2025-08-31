import React, { useEffect, useState } from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { MdDeleteOutline } from 'react-icons/md';
import { Button } from '@/components/ui/button';
import useGetCart from '@/hooks/useGetCart';
import { type ICart } from '@/types';
import { useClearCartMutation, useDeleteCartMutation, useUpdateCartMutation } from '@/redux/features/cart/cartApi';
import Loading from '@/components/common/Loading';
import { Link } from 'react-router';
import { toast } from 'sonner';


export default function CartPage() {
  const [cart, setCart] = useState<ICart>();
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const { cart:initialCart, isLoading:cartLoading } = useGetCart()

  const [updateCart, updateResult] = useUpdateCartMutation()
  const [deleteCartItem, deleteResult] = useDeleteCartMutation()
  const [clearCart, clearCartResult] = useClearCartMutation()



  useEffect(() => {
    setCart(initialCart)
  }, [initialCart, cart, coupon, discount])



  const updateQuantity = async (id: any, delta: any) => {
    // console.log(id)
    await updateCart({ productId: id, quantity: delta })
  };

  const removeItem = async (id: any) => {
    // console.log(id)
    // if(initialCart.length === 1){
    //   clearCart(dbCart?._id)
    // }
    await deleteCartItem(id)
  };

  const handleClearCart = async () => {
    await clearCart(initialCart._id)
    .then(res => {
      if(res.data.message) {
        toast.success("Cart cleared")
        window.location.href = "/shop"
      }
    })

  }

  const applyCoupon = () => {
    if (coupon.toLowerCase() === 'save10') {
      setDiscount(10); // 10% discount
    } else {
      setDiscount(0);
      alert('Invalid Coupon');
    }
  };

  const subtotal = cart?.products?.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = (subtotal! * discount) / 100;
  const total = subtotal! - discountAmount;

  
  // console.log(deleteResult)
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 text-primary grid lg:grid-cols-[2fr_1fr] gap-10">
      {/* Cart Table */}
      <div>
        <div className='flex items-center justify-between'>
          <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
          <Button onClick={() => handleClearCart()} disabled={!cart}>{clearCartResult.isLoading ? "Clearing..." : "Clear Cart"}</Button>
        </div>

        {cart?.products?.length === 0 ? (
          <p className="text-primary/50 text-lg">Your cart is empty.</p>
        ) : (<>
          {deleteResult.isLoading || updateResult.isLoading || cartLoading ? <div className='h-auto w-full flex items-center justify-center mt-5'><Loading /></div> : (
            <>
              <div className="grid grid-cols-6 bg-primary/5 rounded-lg overflow-hidden text-sm font-semibold text-primary">
                {/* Header */}
                <div className="col-span-3 p-4">Product</div>
                <div className="p-4 text-center">Price</div>
                <div className="p-4 text-center">Quantity</div>
                <div className="p-4 text-center">Total</div>

                {/* Items */}
                {cart?.products?.map(item => (
                  <React.Fragment key={item._id} >
                    <div className="col-span-3 p-4 flex items-center gap-4 border-t">
                      <img src={item.productId.image} alt={item.productId.name} className="w-16 h-16 object-cover rounded-md" />
                      <div>
                        <h2 className="font-semibold text-base">{item.productId.name}</h2>
                        <button
                          onClick={() => removeItem(item.productId._id)}
                          className="text-red-500 text-xs flex items-center gap-1 mt-1 hover:underline"
                        >
                          <MdDeleteOutline /> {'Remove'}
                        </button>
                      </div>
                    </div>
                    <div className="p-4 text-center border-t">${item.price?.toFixed(2)}</div>
                    <div className="p-4 flex items-start justify-center gap-2 border-t">
                      <button
                        onClick={() => updateQuantity(item.productId._id, item.quantity - 1)}
                        className="p-1 border rounded-md disabled:opacity-50 cursor-pointer"
                        disabled={item.quantity <= 1 && updateResult.isLoading}
                      >
                        <FiMinus />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId._id, item.quantity + 1)}
                        className="p-1 border rounded-md disabled:opacity-50 cursor-pointer"
                        disabled={updateResult.isLoading}
                      >
                        <FiPlus />
                      </button>
                    </div>
                    <div className="p-4 text-center border-t font-medium">
                      ${(item.price * item.quantity)?.toFixed(2)}
                    </div>

                  </React.Fragment>
                ))}
              </div>
            </>
          )}
        </>)}
      </div>

      {/* Cart Summary */}
      <div className="bg-background shadow-md rounded-xl p-6 h-fit">
        <h2 className="text-2xl font-semibold mb-4">Summary</h2>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal?.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Discount</span>
            <span className={discount > 0 ? 'text-green-600' : ''}>
              {discount > 0 ? `- $${discountAmount?.toFixed(2)}` : '$0.00'}
            </span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t pt-3">
            <span>Total</span>
            <span>${total?.toFixed(2)}</span>
          </div>
        </div>

        {/* Coupon Input */}
        <div className="mt-6">
          <label className="block font-medium mb-1">Have a coupon?</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={coupon}
              onChange={e => setCoupon(e.target.value)}
              placeholder="Enter coupon code"
              className="flex-1 border px-4 py-2 rounded-md shadow-sm"
            />
            <Button disabled={!cart?.products?.length} onClick={applyCoupon}>Apply</Button>
          </div>
          {discount > 0 && (
            <p className="text-green-600 text-sm mt-2">Coupon applied: {discount}% off</p>
          )}
        </div>

        <Link to={"/checkout"}><Button disabled={!cart?.products?.length} className="w-full mt-6 py-3 text-lg">Checkout</Button></Link>
      </div>
    </div>
  );
}
