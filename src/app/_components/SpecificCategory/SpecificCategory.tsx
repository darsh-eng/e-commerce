import { CategoryType } from '@/types/categorys.t'
import React from 'react'

export default function SpecificCategory({ data }: { data: CategoryType }) {
  if (!data) {
    return (
      <div className="container sm:w-full lg:w-[80%] mx-auto my-40">
        <div className="bg-white mx-32 shadow-lg rounded-2xl p-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Category not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="container sm:w-full lg:w-[80%] mx-auto my-40 ">
      <div className="bg-white mx-32 shadow-lg rounded-2xl p-6 flex flex-col md:flex-row items-center gap-8">

        <div className="w-full md:w-2/3 flex flex-col justify-center  space-y-4 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {data.name || 'Unnamed Category'}
          </h1>
          <p className="text-gray-500 text-sm">
            Created at: {data.createdAt ? new Date(data.createdAt).toLocaleDateString() : 'Unknown'}
          </p>
          <p className="text-gray-500 text-sm">
            Updated at: {data.updatedAt ? new Date(data.updatedAt).toLocaleDateString() : 'Unknown'}
          </p>
        </div>
      </div>
    </div>
  )
}
