"use client"

import { Card, CardBody, Tab, Tabs } from '@heroui/react'
import React from 'react'
import { FaHistory, FaTicketAlt } from 'react-icons/fa'
import HistoryItem from './HistoryItem'
import TicketCard from './TicketCard'

type MenuTabsProps = {
    activeTickets: {
        id: string;
        event: {
            name: string;
            date: string;
            location: string;
            imageUrl: string;
        };
        ticketType: string;
    }[];
    purchaseHistory: {
        id: string;
        event: { name: string };
        purchaseDate: string;
        totalAmount: number;
        status: string;
    }[];
}


const MenuTabs = ({ activeTickets, purchaseHistory }: MenuTabsProps) => {
    return (
        <Tabs aria-label="User Profile Tabs" classNames={{
            tabList: "bg-zinc-800",
            cursor: "bg-[#5AE3A8]",
            tabContent: "group-data-[selected=true]:text-zinc-900 font-bold"
        }}>
            <Tab key="my-tickets" title={
                <div className="flex items-center space-x-2">
                    <FaTicketAlt />
                    <span>Tiket Saya</span>
                </div>
            }>
                <Card className="bg-transparent shadow-none">
                    <CardBody>
                        <div className="space-y-6">
                            {activeTickets.length > 0 ? (
                                activeTickets.map((ticket) => (
                                    <TicketCard key={ticket.id} {...ticket} />
                                ))
                            ) : (
                                <p className="text-zinc-400 text-center py-8">Anda tidak memiliki tiket aktif saat ini.</p>
                            )}
                        </div>
                    </CardBody>
                </Card>
            </Tab>
            <Tab key="history" title={
                <div className="flex items-center space-x-2">
                    <FaHistory />
                    <span>Riwayat Pembelian</span>
                </div>
            }>
                <Card className="bg-transparent shadow-none">
                    <CardBody>
                        <div className="space-y-4">
                            {purchaseHistory.length > 0 ? (
                                purchaseHistory.map((trx) => (
                                    <HistoryItem key={trx.id} {...trx} />
                                ))
                            ) : (
                                <p className="text-zinc-400 text-center py-8">Belum ada riwayat pembelian.</p>
                            )}
                        </div>
                    </CardBody>
                </Card>
            </Tab>
        </Tabs>
    )
}

export default MenuTabs