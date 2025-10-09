import getProducts from '@/api/products.api';
import React from 'react'
import SingleProduct from '../SingleProduct';
import { ProductType } from '@/types/products.t';

export default async function AllProducts() {
    let data = await getProducts();
  return (
    <div className="container w-[80%] mx-auto my-12">
      <div className="flex flex-wrap">
        {data.map((currentProduct: ProductType) => (
          <SingleProduct key={currentProduct.id} product={currentProduct}/>
        ))}
      </div>
    </div>
  )
}
