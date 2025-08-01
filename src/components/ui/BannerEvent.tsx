import Image from 'next/image'
import React from 'react'

type BannerEventProps = {
    imageUrl: string;
    name: string;
}

const BannerEvent = ({ imageUrl, name }: BannerEventProps) => {
    return (
        <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-lg">
            <Image
                src={imageUrl}
                alt={name}
                fill
                className="object-cover"
                priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
    )
}

export default BannerEvent