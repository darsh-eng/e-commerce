import { Button } from '@/components/ui/button'
import { BrandType } from '@/types/brand.t'
import Image from 'next/image'
import React from 'react'

export default function SpecificBrand({ data }: { data: BrandType }) {
  if (!data) {
    return (
      <div className="container sm:w-full lg:w-[80%] mx-auto my-40">
        <div className="bg-white mx-32 shadow-lg rounded-2xl p-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Brand not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="container sm:w-full lg:w-[80%] mx-auto my-40 ">
      <div className="bg-white mx-32 shadow-lg rounded-2xl p-6 flex flex-col md:flex-row items-center gap-8">
        
        <div className="w-full md:w-1/3 flex justify-center">
          <div className="w-full max-w-[300px] h-[300px] md:h-[350px] flex items-center justify-center">
            {data.image ? (
              <Image 
                src={data.image} 
                alt={data.name || 'Brand Image'} 
                className="w-full h-full object-contain rounded-md" 
                width={300} 
                height={350} 
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-md">
                <span className="text-gray-500">No Image Available</span>
              </div>
            )}
          </div>
        </div>

        <div className="w-full md:w-2/3 flex flex-col justify-center  space-y-4 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {data.name || 'Unnamed Brand'}
          </h1>
          <p className="text-gray-500 text-sm">
            Created at: {data.createdAt ? new Date(data.createdAt).toLocaleDateString() : 'Unknown'}
          </p>
          <p className="text-gray-500 text-sm">
            Updated at: {data.updatedAt ? new Date(data.updatedAt).toLocaleDateString() : 'Unknown'}
          </p>

          <Button className="w-full cursor-pointer md:w-1/2 h-11 text-gray-200 bg-gray-900 hover:bg-gray-700 transition-all rounded-xl mx-auto md:mx-0">
            <span className='font-bold'>Visit Brand Site</span>
            <i className="fab fa-brands fa-apple ml-2"></i>
          </Button>
        </div>
      </div>
    </div>
  )
}
