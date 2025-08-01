import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type CategoryCardProps = {
    name: string;
    imageUrl: string;
    href: string;
};

const CategoryCard = ({ name, imageUrl, href }: CategoryCardProps) => {
    return (
        <Link href={href}>
            <div className="relative rounded-xl overflow-hidden group h-48">
                <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300 ease-in-out"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <h3 className="text-2xl font-bold text-white">{name}</h3>
                </div>
            </div>
        </Link>
    );
};

export default CategoryCard;