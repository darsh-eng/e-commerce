'use client';
import Image from 'next/image';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { CategoryType } from '@/types/categorys.t';

export default function CategorySwiber({ data } : {data:CategoryType[]}) {
  return (
    <>
      <div className="container w-[80%] mx-auto my-6">
        <h1 className=" text-slate-500 my-2 text-2xl ">Shop Popular Categories</h1>
        <Swiper
        spaceBetween={0}
        slidesPerView={7}
        modules={[Autoplay]}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
      >
        {data.map((category: CategoryType) => (
          <SwiperSlide key={category._id} >
              <Image
                src={category.image}
                alt={category.name}
                className="w-full h-[150px] object-cover"
                width={150}
                height={150}
              />
              <h2 className="text-lg text-center mt-2">{category.name}</h2>
          </SwiperSlide>
        ))}
      </Swiper>
      </div>
    </>
  );
}
