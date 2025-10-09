import React from 'react'
import SingleBrand from '../SingleBrand/SingleBrand';
import getBrands from '@/api/brands.api';
import { BrandType } from '@/types/brand.t';

export default async function AllBrands() {
    let data = await getBrands();
  return (
    <div className="container w-[80%] mx-auto my-12">
      <div className="flex flex-wrap">
        {data.map((currentBrand: BrandType) => (
          <SingleBrand key={currentBrand._id} brand={currentBrand}/>
        ))}
      </div>
    </div>
  )
}
