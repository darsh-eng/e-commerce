"use client";

import { getLoggedInUser } from "@/CartActions/getCart.action";
import { createContext, useEffect, useState, ReactNode } from "react";

type Product = {
  count: number;
  id?: string;
  title?: string;
  price?: number;
  image?: string;
  [key: string]: unknown;
};

type CartResponse = {
  status: string;
  data: {
    products: Product[];
  };
};

interface CartContextType {
  numberOfCartItem: number;
  setnumberOfCartItem: React.Dispatch<React.SetStateAction<number>>;
}

export const CartContext = createContext<CartContextType | null>(null);

interface CartContextProviderProps {
  children: ReactNode;
}

export default function CartContextProvider({ children }: CartContextProviderProps) {
  const [numberOfCartItem, setnumberOfCartItem] = useState<number>(0);

  async function GetUserCart() {
    try {
      const res: CartResponse = await getLoggedInUser();

      if (res.status === "success") {
        const sum = res.data.products.reduce((acc, product) => acc + product.count, 0);
        setnumberOfCartItem(sum);
      }
    } catch {
      console.log("not login");
    }
  }

  useEffect(() => {
    GetUserCart();
  }, []);

  return (
    <CartContext.Provider value={{ numberOfCartItem, setnumberOfCartItem }}>
      {children}
    </CartContext.Provider>
  );
}
