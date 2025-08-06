import { useAddToCartMutation } from "@/redux/features/cart/cartApi";
import React, { useEffect } from "react";
import { toast } from "sonner";

export default function useAddToCart() {
  const [addToCart, result] = useAddToCartMutation();

  useEffect(() => {
    if (result.isSuccess) {
      toast.success("Product added to cart");
    }
  }, [result.isSuccess]);

  return { addToCart, result };
}
