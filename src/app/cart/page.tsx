'use client';
import ClearCart from '@/CartActions/clearAllCart.action';
import { getLoggedInUser } from '@/CartActions/getCart.action';
import { removeItemFromCart } from '@/CartActions/removeItems.action';
import { updateCartQuantity } from '@/CartActions/updateCartQuantity.action';
import { Button } from '@/components/ui/button';
import { CartContext } from '@/context/CartContext';
import { CartProduct } from '@/types/cart.type';
import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';

export default function Cart() {
  const cartContext = useContext(CartContext);
  const numberOfCartItem = cartContext?.numberOfCartItem ?? 0;
  const setnumberOfCartItem = cartContext?.setnumberOfCartItem ?? (() => {});
  const [products, setproducts] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [removeDisabled, setremoveDisabled] = useState(false);
  const [total, settotal] = useState(0)
  const [updateDisabled, setupdateDisabled] = useState(false);
  const [loadingUpdate, setloadingUpdate] = useState(false);
  const [currentId, setcurrentId] = useState('');
  async function getuserCart() {
    try {
      let res = await getLoggedInUser();
      if (res.status === 'success') {
        settotal(res.data.totalCartPrice)
        setproducts(res.data.products);
        setisLoading(false);
      }
    } catch (error) {
      console.error(error);
      setisLoading(false);
    }
  }
  async function removeItem(id: string) {
    setremoveDisabled(true);
    setupdateDisabled(true)
    let res = await removeItemFromCart(id);
    if (res.status === 'success') {
      setproducts(res.data.products);
      toast.success('Item removed from cart successfully', { duration: 4000 });
      setremoveDisabled(false);
      setupdateDisabled(false)
      getuserCart()
      let sum = 0;
      res.data.products.forEach((product:CartProduct)=>{
        sum += product.count
      })
      setnumberOfCartItem(sum)
    } else {
      toast.error("Can't remove this product now !", { duration: 4000 });
      setremoveDisabled(false);
      setupdateDisabled(false)
    }
  }
  async function updateProduct(id: string, count: string , sign:string) {
    setcurrentId(id);
    setremoveDisabled(true)
    setloadingUpdate(true);
    setupdateDisabled(true);
    let res = await updateCartQuantity(id, Number(count));
    if (res.status === 'success') {
      setproducts(res.data.products);
      toast.success('Quantity is updated successfully 👍', { duration: 4000 });
      setloadingUpdate(false);
      setremoveDisabled(false)
      setupdateDisabled(false);
      getuserCart()
      if(sign === "+"){
        setnumberOfCartItem(numberOfCartItem + 1)
      }else if(sign === "-"){
        setnumberOfCartItem(numberOfCartItem - 1)
      }
    } else {
      toast.error("Can't update the Quantity now !👎", { duration: 4000 });
      setloadingUpdate(false);
      setupdateDisabled(false);
      setremoveDisabled(false)
    }
  }
  async function clear(){
    let res = await ClearCart()
    if(res.message === "success"){
      toast.success("The items is deleted successfuly!" , {duration:2000})
      getuserCart()
    }

  }
  useEffect(() => {
    getuserCart();
  }, []);

  if (isLoading) {
    return <div className="loader"></div>;
  }

  return (
    <>
      {products.length > 0 ? (
        <div className="container mx-auto my-24 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end">
            <Button onClick={()=>clear()} className='cursor-pointer my-4 bg-red-500 hover:bg-red-700 rounded-xl p-6 transition-all text-white'>Clear All Items </Button>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <h1 className='text-center text-3xl font-bold text-emerald-600 my-6'>Total Cart Price : {total}</h1>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    Image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product: CartProduct) => (
                  <tr
                    key={product._id}
                    className="bg-white border-b  border-gray-200 hover:bg-gray-50 "
                  >
                    <td className="p-4">
                      <div className="w-16 md:w-32 h-16 md:h-32 relative">
                        <Image
                          src={product.product.imageCover}
                          alt={product.product.title}
                          fill
                          sizes="(max-width: 768px) 64px, 128px"
                          className="object-cover rounded"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 ">
                      {product.product.title}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <button
                          disabled={updateDisabled}
                          onClick={() => updateProduct(product.product.id, `${product.count - 1}` , "-")}
                          className=" cursor-pointer disabled:cursor-none inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 1h16"
                            />
                          </svg>
                        </button>
                        <div>
                          {product.product.id === currentId ? (
                            loadingUpdate ? (
                              <i className="fas fa-spinner fa-spin"></i>
                            ) : (
                              <span>{product.count}</span>
                            )
                          ) : (
                            <span>{product.count}</span>
                          )}
                        </div>
                        <button
                          disabled={updateDisabled}
                          onClick={() => updateProduct(product.product.id, `${product.count + 1}` , "+")}
                          className=" cursor-pointer disabled:cursor-none inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 "
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-emerald-600">{`$${product.price * product.count}`} EGP</td>
                    <td className="px-6 py-4">
                      <button
                        disabled={removeDisabled}
                        onClick={() => removeItem(product.product.id)}
                        className="text-red-500 disabled:text-slate-900 cursor-pointer font-semibold"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <h1 className="absolute left-[40%] top-1/2 text-3xl font-bold text-red-500">
          No Products added to cart!
        </h1>
      )}
    </>
  );
}
