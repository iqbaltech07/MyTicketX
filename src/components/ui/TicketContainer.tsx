"use client"

import { Button, Card, CardBody, CardFooter, CardHeader } from '@heroui/react'
import React, { useState } from 'react'

type Ticket = {
  id: string;
  type: string;
  price: number;
  quantity: number;
};

type TicketContainerProps = {
    tickets: Ticket[];
}

const TicketContainer = ({ tickets }: TicketContainerProps) => {
    const [selectedTickets, setSelectedTickets] = useState<Record<string, number>>({});

    const handleQuantityChange = (ticketId: string, amount: number) => {
        setSelectedTickets(prev => {
            const currentQuantity = prev[ticketId] || 0;
            const newQuantity = Math.max(0, currentQuantity + amount);
            return {
                ...prev,
                [ticketId]: newQuantity,
            };
        });
    };

    const totalAmount = tickets.reduce((acc, ticket) => {
        const quantity = selectedTickets[ticket.id] || 0;
        return acc + (quantity * Number(ticket.price));
    }, 0);

    return (
        <div className="md:col-span-1">
            <Card className="bg-[#202027] border border-zinc-800 shadow-xl sticky top-24">
                <CardHeader>
                    <h2 className="text-xl font-bold text-white p-4">Pilih Tiket Anda</h2>
                </CardHeader>
                <CardBody className="p-4 space-y-4">
                    {tickets.length > 0 ? tickets.map((ticket) => (
                        <div key={ticket.id} className="p-4 rounded-lg border border-zinc-700 bg-zinc-800/50">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="font-semibold text-white">{ticket.type}</h3>
                                    <p className="text-lg font-bold text-[#5AE3A8]">
                                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(Number(ticket.price))}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button size="sm" variant='flat' isIconOnly className='text-3xl text-white' onPress={() => handleQuantityChange(ticket.id, -1)}>-</Button>
                                    <span className="w-8 text-center font-bold">{selectedTickets[ticket.id] || 0}</span>
                                    <Button size="sm" variant='flat' isIconOnly className='text-3xl text-white' onPress={() => handleQuantityChange(ticket.id, 1)}>+</Button>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <p className="text-zinc-400 text-center">Tiket untuk event ini belum tersedia.</p>
                    )}
                </CardBody>
                {totalAmount > 0 && (
                    <CardFooter className="p-4 flex-col items-start">
                         <div className="w-full flex justify-between items-center mb-2">
                            <span className="text-zinc-300">Total Harga:</span>
                            <span className="text-2xl font-bold text-white">
                                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(totalAmount)}
                            </span>
                        </div>
                        <Button className="w-full bg-[#5AE3A8] text-zinc-900 font-bold text-lg py-6">
                            Beli Tiket
                        </Button>
                    </CardFooter>
                )}
            </Card>
        </div>
    )
}

export default TicketContainer;