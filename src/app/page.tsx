import React from 'react';
import MainSlaider from './_components/MainSlaider/MainSlaider';
import CategorySlider from './_components/CategorySlider/CategorySlider';
import AllProducts from './_components/AllProducts/AllProducts';

export default function Home() {
  return (
    <>
      <MainSlaider />
      <CategorySlider />
      <AllProducts />
    </>
  );
}
