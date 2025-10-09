'use client';
import React from 'react';
import sliderImage1 from '../../../../public/images/grocery-banner-2.jpeg';
import sliderImage5 from '../../../../public/images/grocery-banner.png';
import sliderImage2 from '../../../../public/images/slider-2.jpeg';
import sliderImage3 from '../../../../public/images/slider-image-3.jpeg';
import sliderImage4 from '../../../../public/images/slider-image-2.jpeg';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

export default function MainSlaider() {
  return (
    <div className="w-[80%] mx-auto container  my-4 flex">
      <div className="w-3/4">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          modules={[Autoplay]}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
        >
          <SwiperSlide>
            <Image
              src={sliderImage1}
              alt="sliderImage1"
              className="w-full h-[400px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={sliderImage2}
              alt="sliderImage2"
              className="w-full h-[400px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={sliderImage5}
              alt="sliderImage5"
              className="w-full h-[400px] object-cover"
            />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="w-1/4 ">
        <Image src={sliderImage4} alt="sliderImage4" className="w-full h-[200px] object-cover" />
        <Image src={sliderImage3} alt="sliderImage3" className="w-full h-[200px] object-cover" />
      </div>
    </div>
  );
}
