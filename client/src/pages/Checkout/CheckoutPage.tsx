import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import useGetCart from "@/hooks/useGetCart"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Package, Truck } from "lucide-react"
import { Input } from "@/components/ui/input"

export const CheckoutPage = () => {
  const [paymentMethod, setPaymentMethod] = React.useState("stripe")
  const { cart } = useGetCart()
  console.log(cart)

  const total = cart?.reduce((acc:any, item:any) => acc + item.price * item.quantity, 0)
  const shippingFee = 5.99 // Example shipping fee
  const tax = total ? total * 0.1 : 0 // Example 10% tax

  const handleStripePayment = () => {
    console.log("Paying with Stripe...")
  }

  const handleCODPayment = () => {
    console.log("Placing COD order...")
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
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
                {cart?.map((item:any, index:number) => (
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
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">First Name</Label>
                    <Input className="mt-1 p-2 border rounded-md"/>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Last Name</Label>
                    <Input className="mt-1 p-2 border rounded-md"/>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Address</Label>
                  <Input className="mt-1 p-2 border rounded-md"/>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">City</Label>
                    <Input className="mt-1 p-2 border rounded-md"/>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">ZIP Code</Label>
                    <Input className="mt-1 p-2 border rounded-md"/>
                  </div>
                </div>
              </div>
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
                onValueChange={setPaymentMethod}
                className="space-y-4"
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="stripe" id="stripe" className="h-5 w-5" />
                  <Label htmlFor="stripe" className="flex items-center gap-2 cursor-pointer">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/stripe/stripe-original.svg" 
                         className="w-6 h-6" alt="Stripe" />
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
                  <span>${total?.toFixed(2)}</span>
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
                  <span>${((total || 0) + shippingFee + tax).toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 rounded-b-lg p-6">
              {paymentMethod === "stripe" ? (
                <Button 
                  onClick={handleStripePayment}
                  className="w-full py-6 bg-gradient-to-r from-primary to-blue-500 hover:from-primary hover:to-blue-600"
                >
                  Pay with Stripe
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  onClick={handleCODPayment}
                  className="w-full py-6 border-primary text-primary hover:bg-primary/10"
                >
                  Place Order (COD)
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}