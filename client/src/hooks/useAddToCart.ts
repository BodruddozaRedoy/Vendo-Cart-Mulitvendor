import { useAddToCartMutation } from "@/redux/features/cart/cartApi";
import React, { useEffect } from "react";
import { toast } from "sonner";
import { useGetProfile } from "./useGetProfile";

export default function useAddToCart() {
  const [addToCartMutation, result] = useAddToCartMutation();
  const { data } = useGetProfile();

  const addToCart = (payload: any) => {
    const role = data?.data?.role;

    if (role === "vendor") {
      toast.error("Vendors cannot add products to the cart");
      return;
    }else if(role === "admin"){
      toast.error("Admins cannot add products to the cart");
      return;
    }

    addToCartMutation(payload);
  };

  useEffect(() => {
    if (result.isSuccess) {
      toast.success("Product added to cart");
    }
  }, [result.isSuccess]);

  return { addToCart, result };
}
