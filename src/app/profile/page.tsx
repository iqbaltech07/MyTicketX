"use client"

import React from 'react'
import { Avatar } from '@heroui/react'
import PageContainer from '~/components/layouts/PageContainer'
import { useSession } from 'next-auth/react'
import MenuTabs from '~/components/ui/MenuTabs'

const activeTickets = [
    {
        id: 'tkt_001',
        event: {
            name: 'Golden Match Football',
            date: '2028-03-01T10:00:00.000Z',
            location: 'Stadion Gelora Bung Karno, Jakarta',
            imageUrl: '/images/golden-match.jpg',
        },
        ticketType: 'VIP',
    },
    {
        id: 'tkt_002',
        event: {
            name: 'Music Fest 2028',
            date: '2028-04-15T19:00:00.000Z',
            location: 'JIEXPO Kemayoran, Jakarta',
            imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1974&auto=format&fit=crop',
        },
        ticketType: 'Early Bird',
    },
];

const purchaseHistory = [
    {
        id: 'trx_abc',
        event: { name: 'Tech Conference 2027' },
        purchaseDate: '2027-12-10T10:00:00.000Z',
        totalAmount: 300000,
        status: 'Completed',
    },
    {
        id: 'trx_def',
        event: { name: 'Charity Run 2027' },
        purchaseDate: '2027-11-05T14:30:00.000Z',
        totalAmount: 150000,
        status: 'Completed',
    }
];


const ProfileUser = () => {
    const { data: session } = useSession();

    return (
        <PageContainer withNavbar withFooter>
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col sm:flex-row items-center gap-6 mb-10">
                    <Avatar
                        src={session?.user?.image ?? ''}
                        name={session?.user?.name ?? 'U'}
                        className="w-24 h-24 text-large"
                    />
                    <div>
                        <h1 className="text-3xl font-bold text-white">{session?.user?.name}</h1>
                        <p className="text-zinc-400">{session?.user?.email}</p>
                    </div>
                </div>

                <MenuTabs activeTickets={activeTickets} purchaseHistory={purchaseHistory} />
            </div>
        </PageContainer>
    )
}


export default ProfileUser;