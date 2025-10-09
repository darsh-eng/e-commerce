import getspecificBrand from '@/api/brand.api';
import SpecificBrand from '@/app/_components/SpecificBrand/SpecificBrand';
import React from 'react';
import { notFound } from 'next/navigation';

export default async function BrandDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const { id } = await params;

    if (!id) {
      notFound();
    }

    const data = await getspecificBrand({ id });

    if (!data) {
      notFound();
    }

    return <SpecificBrand data={data} />;
  } catch (error) {
    console.error('Error fetching brand:', error);
    notFound();
  }
}
