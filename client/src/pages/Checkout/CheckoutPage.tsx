import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import useGetCart from "@/hooks/useGetCart"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Package, Truck } from "lucide-react"
import { Input } from "@/components/ui/input"
import { usePlaceOrderMutation } from "@/redux/features/order/orderApi"

// Stripe imports
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js"
import { toast } from "sonner"
import { useClearCartMutation } from "@/redux/features/cart/cartApi"
import { useGetProfile } from "@/hooks/useGetProfile"
// removed unused IUser


interface DeliverInfo {
  fullName: string;
  phone: string;
  address: string;
}

export const CheckoutPage = () => {
  const [paymentMethod, setPaymentMethod] = React.useState<"stripe" | "cod">("stripe")
  const { user } = useGetProfile()
  const [deliveryInfo, setDeliveryInfo] = useState<DeliverInfo>({
    fullName: "",
    phone: "",
    address: "",

  })
  // console.log(deliveryInfo.address)
  useEffect(() => {
    setDeliveryInfo({fullName: user.fullName, address: user.address.delivery, phone: user.phone})

  }, [user])
  const { cart } = useGetCart()
  // const { toast } = useToast()
  const [clearCart] = useClearCartMutation()
  const [placeOrder, { isLoading }] = usePlaceOrderMutation()

  const stripe = useStripe()
  const elements = useElements()

  const total = cart?.products.reduce((acc: any, item: any) => acc + item.price * item.quantity, 0) || 0
  const shippingFee = 5.99
  const tax = total * 0.1
  const grandTotal = total + shippingFee + tax

  // console.log(deliveryInfo)
  const handlePlaceOrder = async (e: any) => {
    e.preventDefault()
    if (!cart || cart?.products.length === 0) {
      toast.success("Your cart is empty")
      return
    }

    if (!deliveryInfo) {
      return toast.error("Delivery info required")
    }

    const cartItems = cart?.products.map((item: any) => ({
      product: item.productId._id,
      quantity: item.quantity,
    }))
    console.log(paymentMethod)

    if (paymentMethod === "stripe") {
      if (!stripe || !elements) {
        toast.success("Stripe is not loaded yet")
        return
      }

      const cardElement = elements.getElement(CardElement)
      if (!cardElement) return

      const { error, token } = await stripe.createToken(cardElement)

      if (error) {
        toast.error("Payment error")
        return
      }

      if (!token) {
        toast.error("Failed to get payment token")
        return
      }

      try {
        await placeOrder({
          cartItems,
          totalAmount: grandTotal,
          paymentMethod,
          stripeToken: token.id,
          deliveryInfo
        }).unwrap()

        toast.success("Order placed successfully!")
        // dispatch(clearCart())
        clearCart(cart._id)
        window.location.href = ("/account/my-orders")
      } catch (err: any) {
        toast.error("Order failed")
      }
    } else {
      // COD payment
      try {
        await placeOrder({
          cartItems,
          totalAmount: grandTotal,
          paymentMethod,
          deliveryInfo
        }).unwrap()

        toast.success("Order placed successfully")
        clearCart(cart._id)
        window.location.href = ("/account/my-orders")
      } catch (err: any) {
        toast.error("Order failed")
      }
    }
  }

  return (
    <form onSubmit={handlePlaceOrder} className="max-w-6xl mx-auto p-6 ">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Order Summary */}
        <div className="space-y-6">
          <Card className="border-0 shadow-sm">
            <CardHeader className="bg-gray-50 rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                <span>Order Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {cart?.products?.map((item: any) => (
                  <div key={item._id} className="flex items-center p-4 hover:bg-gray-50/50">
                    <div className="relative">
                      <img
                        src={item.productId.image}
                        alt={item.productId.name}
                        className="w-16 h-16 object-cover rounded-lg border"
                      />
                      <Badge className="absolute -top-2 -right-2 bg-primary rounded-full w-6 h-6 flex items-center justify-center p-0">
                        {item.quantity}
                      </Badge>
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                    </div>
                    <div className="font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader className="bg-gray-50 rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Truck className="w-5 h-5" />
                <span>Delivery Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">First Name</Label>
                  <Input required className="mt-1 p-2 border rounded-md" value={deliveryInfo.fullName} onChange={(e) => setDeliveryInfo({ ...deliveryInfo, fullName: e.target.value })} />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Phone Number</Label>
                  <Input value={deliveryInfo.phone} required className="mt-1 p-2 border rounded-md" onChange={(e) => setDeliveryInfo({ ...deliveryInfo, phone: e.target.value })} />
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Address</Label>
                <Input value={deliveryInfo.address} required className="mt-1 p-2 border rounded-md" onChange={(e) => setDeliveryInfo({ ...deliveryInfo, address: e.target.value })} />
              </div>
              {/* <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">City</Label>
                  <Input required className="mt-1 p-2 border rounded-md" onChange={(e) => setDeliveryInfo({ ...deliveryInfo, city: e.target.value })} />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">ZIP Code</Label>
                  <Input required className="mt-1 p-2 border rounded-md" onChange={(e) => setDeliveryInfo({ ...deliveryInfo, zipCode: e.target.value })} />
                </div>
              </div> */}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Payment & Summary */}
        <div className="space-y-6">
          <Card className="border-0 shadow-sm">
            <CardHeader className="bg-gray-50 rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                <span>Payment Method</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <RadioGroup
                value={paymentMethod}
                onValueChange={(value: string) => {
                  if (value === "stripe" || value === "cod") {
                    setPaymentMethod(value)
                  }
                }}
                className="space-y-4"
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="stripe" id="stripe" className="h-5 w-5" />
                  <Label htmlFor="stripe" className="flex items-center gap-2 cursor-pointer">
                    <img
                      src="https://cdn.iconscout.com/icon/free/png-512/free-stripe-3521744-2945188.png?f=webp&w=256"
                      className="w-6 h-6"
                      alt="Stripe"
                    />
                    Credit/Debit Card (Stripe)
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="cod" id="cod" className="h-5 w-5" />
                  <Label htmlFor="cod" className="flex items-center gap-2 cursor-pointer">
                    <Truck className="w-5 h-5 text-gray-600" />
                    Cash on Delivery
                  </Label>
                </div>
              </RadioGroup>

              {paymentMethod === "stripe" && (
                <div className="mt-6 p-4 border rounded">
                  <CardElement options={{ hidePostalCode: true }} />
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader className="bg-gray-50 rounded-t-lg">
              <CardTitle>Order Total</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>${shippingFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 rounded-b-lg p-6">
              {paymentMethod === "stripe" ? (
                <Button
                  type="submit"
                  // onClick={handlePlaceOrder}
                  className="w-full py-6 bg-gradient-to-r from-primary to-blue-500 hover:from-primary hover:to-blue-600"
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Pay with Stripe"}
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="outline"
                  // onClick={handlePlaceOrder}
                  className="w-full py-6 border-primary text-primary hover:bg-primary/10"
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Place Order (COD)"}
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </form>
  )
}
