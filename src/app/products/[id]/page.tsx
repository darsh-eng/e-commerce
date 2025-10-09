import getspecificProduct from '@/api/product.api';
import Details from '@/app/_components/Details';
import React from 'react';

export default async function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getspecificProduct({ id });

  return (
    <Details data={data} />
  );
}
