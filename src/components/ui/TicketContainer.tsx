import { Button, Card, CardBody, CardFooter, CardHeader } from '@heroui/react'
import React from 'react'

type TicketContainerProps = {
    eventDetail: {
        tickets: {
            id: number;
            type: string;
            price: number;
            quantity: number;
        }[];
    };
}

const TicketContainer = ({ eventDetail }: TicketContainerProps) => {
    return (
        <div className="md:col-span-1">
            <Card className="bg-[#202027] border border-zinc-800 shadow-xl sticky top-24">
                <CardHeader>
                    <h2 className="text-xl font-bold text-white p-4">Pilih Tiket Anda</h2>
                </CardHeader>
                <CardBody className="p-4 space-y-4">
                    {eventDetail.tickets.map((ticket) => (
                        <div key={ticket.id} className="p-4 rounded-lg border border-zinc-700 bg-zinc-800/50">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="font-semibold text-white">{ticket.type}</h3>
                                    <p className="text-lg font-bold text-[#5AE3A8]">
                                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(ticket.price)}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button size="sm" variant='flat' isIconOnly className='text-3xl text-white'>-</Button>
                                    <span className="w-8 text-center font-bold">0</span>
                                    <Button size="sm" variant='flat' isIconOnly className='text-3xl text-white'>+</Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </CardBody>
                <CardFooter className="p-4">
                    <Button className="w-full bg-[#5AE3A8] text-zinc-900 font-bold text-lg py-6">
                        Beli Tiket
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default TicketContainer