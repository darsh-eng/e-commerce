import getspecificSubcategory from '@/api/subcateg.api';
import SpecificCategory from '@/app/_components/SpecificCategory/SpecificCategory';
import React from 'react';
import { notFound } from 'next/navigation';

export default async function CategoryDetails({ params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    if (!id) {
      notFound();
    }

    const data = await getspecificSubcategory({ id });

    if (!data) {
      notFound();
    }

    return <SpecificCategory data={data} />;
  } catch (error) {
    console.error('Error fetching category:', error);
    notFound();
  }
}
