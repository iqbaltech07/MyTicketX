"use client"

import { Button, Card, CardBody, CardFooter, CardHeader } from '@heroui/react'
import React from 'react'
import axiosInstance from '~/libs/axiosInstance';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

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
    const [selectedTickets, setSelectedTickets] = React.useState<Record<string, number>>({});
    const [isLoading, setIsLoading] = React.useState(false);
    const { data: session } = useSession();
    const router = useRouter();

    const handleQuantityChange = (ticketId: string, amount: number) => {
        const ticket = tickets.find(t => t.id === ticketId);
        if (!ticket) return;

        setSelectedTickets(prev => {
            const currentQuantity = prev[ticketId] || 0;
            const newQuantity = Math.max(0, Math.min(ticket.quantity, currentQuantity + amount));
            return {
                ...prev,
                [ticketId]: newQuantity,
            };
        });
    };

    const handleCheckout = async () => {
        if (!session) {
            alert("Anda harus login terlebih dahulu untuk membeli tiket.");
            router.push('/login');
            return;
        }

        setIsLoading(true);

        const orderItems = Object.entries(selectedTickets)
            .filter(([ticketId, quantity]) => quantity > 0)
            .map(([ticketId, quantity]) => {
                const ticket = tickets.find(t => t.id === ticketId);
                return {
                    ticketId: ticket!.id,
                    productName: ticket!.type,
                    price: ticket!.price,
                    quantity: quantity,
                };
            });

        if (orderItems.length === 0) {
            alert("Silakan pilih tiket terlebih dahulu.");
            setIsLoading(false);
            return;
        }

        try {
            const response = await axiosInstance.post('/generate-token', {
                orderItems: orderItems,
            });

            window.snap.pay(response.data.token)

        } catch (error: any) {
            console.error("Checkout error:", error);
            if (error.response?.status === 401) {
                alert("Sesi Anda berakhir. Silakan login kembali untuk melanjutkan.");
                router.push('/login');
            } else {
                alert("Terjadi kesalahan saat checkout. Silakan coba lagi.");
            }
        } finally {
            setIsLoading(false);
        }
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
                                    <p className="text-xs text-zinc-400 mt-1">Sisa tiket: {ticket.quantity}</p>
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
                        {!session ? (
                            <Button
                                className="w-full bg-[#5AE3A8] text-zinc-900 font-bold text-lg py-6"
                                onPress={handleCheckout}
                                disabled={isLoading}
                            >
                                Login untuk membeli tiket
                            </Button>
                        ) : (
                            <Button
                                className="w-full bg-[#5AE3A8] text-zinc-900 font-bold text-lg py-6"
                                onPress={handleCheckout}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Memproses...' : 'Beli Tiket'}
                            </Button>
                        )}
                    </CardFooter>
                )}
            </Card>
        </div>
    )
}

export default TicketContainer;