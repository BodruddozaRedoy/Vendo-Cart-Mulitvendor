import { useAddToCartMutation } from "@/redux/features/cart/cartApi";
import { useEffect } from "react";
import { toast } from "sonner";
import { useGetProfile } from "./useGetProfile";
import useGetCart from "./useGetCart";

export default function useAddToCart() {
  const [addToCartMutation, result] = useAddToCartMutation();
  const { user } = useGetProfile();
  const { cart } = useGetCart();
  // console.log(cart[0].productId.vendor)
  console.log(cart);

  const addToCart = (payload: any) => {
    const role = user?.role;
    console.log(payload);

    if (!user) {
      return toast.error("Please login first");
    }

    if (cart) {
      if (cart?.vendorId !== payload?.vendorId) {
        return toast.error(
          "Please clear your cart then add other vendor product"
        );
      }
    }

    if (role === "vendor") {
      toast.error("Vendors cannot add products to the cart");
      return;
    } else if (role === "admin") {
      toast.error("Admins cannot add products to the cart");
      return;
    }
    // if(cart.length){
    //   console.log(payload, "test")
    //   if(cart[0].productId.vendor === payload.vendor){
    //   return toast.error("Please clear the previous cart")
    // }
    // }
    addToCartMutation(payload);
  };

  useEffect(() => {
    if (result.isSuccess) {
      toast.success("Product added to cart");
    }
  }, [result.isSuccess]);

  return { addToCart, result };
}
