import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { Autoplay } from 'swiper/modules';
import { banners } from '~/data/data';
import Image from 'next/image';

const BannerSwiper = () => {
    return (
        <Swiper className="!h-[450px] rounded-xl" autoplay={{
            delay: 4500,
            disableOnInteraction: false,
        }} modules={[Autoplay]}>
            {banners.map((data) => (
                <SwiperSlide key={data.id}>
                    <Image src={data.image} alt={data.alt} width={1920} height={1080} />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default BannerSwiper