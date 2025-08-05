import type { IProduct } from "@/types";
import React, { useState } from "react";

export default function useAddToCart() {
  const [cart, setCart] = useState<IProduct[]>([]);
  const addToCart = (product: IProduct) => {
      setCart([...cart, product]);
      localStorage.setItem("cart", JSON.stringify(cart));
  };
  return { addToCart };
}
