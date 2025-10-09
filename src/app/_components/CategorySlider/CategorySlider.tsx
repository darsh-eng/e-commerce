import getAllCategories from '@/api/allcategories';
import React from 'react'
import CategorySwiber from '../CategorySwiber/CategorySwiber';

export default async function AllCategories() {
  const data = await getAllCategories();
  return (
      
      <CategorySwiber data={data}/>
    
  )
}
