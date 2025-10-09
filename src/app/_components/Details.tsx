// removed unused Button import
import { ProductType } from '@/types/products.t'
import Image from 'next/image'
import React from 'react'
import AddBtn from './AddBtn/AddBtn'
import WishlistButton from './WishlistButton'

export default function DetailsProduct({ data }: { data: ProductType }) {
  const renderStars = (rating: number) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<i key={i} className="fas fa-star text-amber-500"></i>)
      } else if (rating >= i - 0.5) {
        stars.push(<i key={i} className="fas fa-star-half-alt text-amber-500"></i>)
      } else {
        stars.push(<i key={i} className="far fa-star text-amber-400"></i>)
      }
    }
    return stars
  }

  return (
    <div className="container sm:w-full lg:w-[80%] mx-auto  my-40">
      <div className="bg-white mx-32 shadow-lg rounded-2xl p-6 flex flex-col md:flex-row items-center gap-8">
        
        <div className="w-full md:w-1/3 flex justify-center">
          <div className="w-full max-w-[300px] h-[300px] md:h-[350px] flex items-center justify-center">
            <Image 
              src={data.imageCover} 
              alt={data.title} 
              className="w-full h-full object-contain rounded-md" 
              width={300} 
              height={350} 
            />
          </div>
        </div>

        <div className="w-full md:w-2/3 flex flex-col justify-center space-y-4 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {data.title}
          </h1>
          <p className="text-gray-600 leading-relaxed">
            {data.description}
          </p>

          <div className="space-y-2">
            <span className="text-xl md:text-2xl font-bold text-green-600 block">
              {data.price} EGP
            </span>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <div className="flex">{renderStars(data.ratingsAverage)}</div>
              <span className="text-sm text-gray-500">
                {data.ratingsAverage.toFixed(1)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <AddBtn  id={data.id} />
            <WishlistButton productId={data.id} size={22} />
          </div>
        </div>
      </div>
    </div>
  )
}
