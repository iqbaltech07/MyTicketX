import { Card, CardBody, CardFooter, CardHeader } from '@heroui/react'
import React from 'react'
import Image from 'next/image'

type CardEventType = {
    title: string;
    description: string;
    image: string;
    date: string;
    time: string;
}

const CardEvent = ({ title, description, image, date, time }: CardEventType) => {
    const formattedDate = new Date(date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
    })
    return (
        <div className="w-[320px]">
            <Card className="w-full shadow-md rounded-xl overflow-hidden">
                <CardHeader className="relative h-36 w-full">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover"
                    />
                </CardHeader>

                <CardBody className="p-3 space-y-1">
                    <h2 className="text-base font-semibold text-gray-900">{title}</h2>
                    <p className="text-gray-600 text-xs">
                        {description}
                    </p>
                </CardBody>

                <CardFooter className="p-3 border-t text-xs text-gray-500 flex justify-between">
                    <span>{formattedDate}</span>
                    <span>{time?.slice(0, 5)} WIB</span>
                </CardFooter>
            </Card>
        </div>
    )
}

export default CardEvent
