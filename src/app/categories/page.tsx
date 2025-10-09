import { CategoryType } from '@/types/categorys.t';
import React from 'react';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import Link from 'next/link';
import getAllSubcategories from '@/api/subcategory.api';

export default async function Categories() {
  const data = await getAllSubcategories();

  return (
    <div className="container w-[90%] md:w-[80%] mx-auto my-12">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {data.map((currentCategory: CategoryType) => (
          <Link
            key={currentCategory._id}
            href={`/brands/${currentCategory._id}`}
            className="group"
          >
            <Card className="flex items-center justify-center h-32 
              border border-gray-200 
              hover:border-yellow-400 
              hover:shadow-lg 
              transition-all duration-300 
              cursor-pointer 
              rounded-xl 
              bg-white
              group-hover:scale-105"
            >
              <CardContent className="text-center">
                <h2 className="text-gray-800 font-semibold text-lg group-hover:text-yellow-600 transition-colors">
                  {currentCategory.name}
                </h2>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
