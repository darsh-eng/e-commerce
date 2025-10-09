'use client';

import { addToCart } from '@/CartActions/addToCart.action';
import { Button } from '@/components/ui/button';
import { CartContext } from '@/context/CartContext';
import React, { useContext } from 'react';
import { toast } from 'sonner';

export default function AddBtn({ id }: { id: string }) {
  const cartContext = useContext(CartContext);

  async function checkAddProduct(id: string) {
    try {
      let res = await addToCart(id);
      console.log(res);

      if (res.status === 'success') {
        toast.success('Product Added Successfully!', {
          position: 'top-center',
          duration: 2000,
        });
        if (cartContext && cartContext.setnumberOfCartItem && typeof cartContext.numberOfCartItem === 'number') {
          cartContext.setnumberOfCartItem(cartContext.numberOfCartItem + 1);
        }
      } else {
        toast.error("Can't add this product login first", {
          duration: 2000,
        });
      }
    } catch  {
      toast.error('Something went wrong! ' , {
        duration: 2000,
      });
    }
  }

  return (
    <Button
      onClick={() => checkAddProduct(id)}
      className="m-4 bg-gray-900 hover:bg-gray-800 text-gray-100 rounded-md  cursor-pointer"
    >
      Add To Cart
      <i className="fas fa-shopping-cart"></i>
    </Button>
  );
}
