import React, { useState } from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { MdDeleteOutline } from 'react-icons/md';
import { Button } from '@/components/ui/button';

// const initialCart = [
//   {
//     id: 1,
//     name: 'Wireless Headphones',
//     price: 120,
//     quantity: 1,
//     image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=600&q=60'
//   },
//   {
//     id: 2,
//     name: 'Smartwatch',
//     price: 199,
//     quantity: 2,
//     image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=60'
//   }
// ];

// const initialCart = JSON.parse(localStorage.getItem("cart"))

export default function CartPage() {
  const [cart, setCart] = useState(initialCart);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  // const cart = localStorage.getItem("cart")

  const updateQuantity = (id:any, delta:any) => {
    setCart(prev =>
      prev?.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id:any) => {
    setCart(prev => prev?.filter(item => item.id !== id));
  };

  const applyCoupon = () => {
    if (coupon.toLowerCase() === 'save10') {
      setDiscount(10); // 10% discount
    } else {
      setDiscount(0);
      alert('Invalid Coupon');
    }
  };

  const subtotal = cart?.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal - discountAmount;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 text-primary grid lg:grid-cols-[2fr_1fr] gap-10">
      {/* Cart Table */}
      <div>
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

        {cart?.length === 0 ? (
          <p className="text-primary/50 text-lg">Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-6 bg-primary/5 rounded-lg overflow-hidden text-sm font-semibold text-primary">
            {/* Header */}
              <div className="col-span-3 p-4">Product</div>
              <div className="p-4 text-center">Price</div>
              <div className="p-4 text-center">Quantity</div>
              <div className="p-4 text-center">Total</div>

            {/* Items */}
            {cart?.map(item => (
              <React.Fragment key={item.id}>
                <div className="col-span-3 p-4 flex items-center gap-4 border-t">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                  <div>
                    <h2 className="font-semibold text-base">{item.name}</h2>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 text-xs flex items-center gap-1 mt-1 hover:underline"
                    >
                      <MdDeleteOutline /> Remove
                    </button>
                  </div>
                </div>
                <div className="p-4 text-center border-t">${item.price.toFixed(2)}</div>
                <div className="p-4 flex items-center justify-center gap-2 border-t">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="p-1 border rounded-md disabled:opacity-50"
                    disabled={item.quantity <= 1}
                  >
                    <FiMinus />
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="p-1 border rounded-md"
                  >
                    <FiPlus />
                  </button>
                </div>
                <div className="p-4 text-center border-t font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {/* Cart Summary */}
      <div className="bg-background shadow-md rounded-xl p-6 h-fit">
        <h2 className="text-2xl font-semibold mb-4">Summary</h2>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Discount</span>
            <span className={discount > 0 ? 'text-green-600' : ''}>
              {discount > 0 ? `- $${discountAmount.toFixed(2)}` : '$0.00'}
            </span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t pt-3">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
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
            <Button onClick={applyCoupon}>Apply</Button>
          </div>
          {discount > 0 && (
            <p className="text-green-600 text-sm mt-2">Coupon applied: {discount}% off</p>
          )}
        </div>

        <Button className="w-full mt-6 py-3 text-lg">Checkout</Button>
      </div>
    </div>
  );
}
