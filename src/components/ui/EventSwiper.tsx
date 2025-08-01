"use client"

import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import CardEvent from '../common/CardEvent';
import { IEvents } from '~/types/types';
import Link from 'next/link';

type EventSwiperProps = {
    data: IEvents[]
}

const EventSwiper = ({ data }: EventSwiperProps) => {
    return (
        <Swiper slidesPerView={4}>
            {data?.map((data) => (
                <SwiperSlide key={data.id}>
                    <Link href={`/event/${data.slug}`}>
                        <CardEvent title={data.title} description={data.description} image={data.thumb} date={data.date} time={data.time} />
                    </Link>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default EventSwiper