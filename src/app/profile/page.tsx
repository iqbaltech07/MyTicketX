import React from 'react';
import { Avatar } from '@heroui/react';
import PageContainer from '~/components/layouts/PageContainer';
import MenuTabs from '~/components/ui/MenuTabs';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { getActiveTicketsByUserId, getPurchaseHistoryByUserId } from '~/libs/data';
import { authOptions } from '~/libs/AuthOption';

export const dynamic = 'force-dynamic';

const ProfileUserPage = async () => {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        redirect('/login');
    }

    const [activeTicketsData, purchaseHistoryData] = await Promise.all([
        getActiveTicketsByUserId(session.user.id),
        getPurchaseHistoryByUserId(session.user.id),
    ]);

    const formattedActiveTickets = activeTicketsData.map(purchasedTicket => {
        const order = purchasedTicket.orderItem;
        return {
            id: purchasedTicket.id,
            event: {
                name: order.ticket.event.name,
                date: order.ticket.event.date.toISOString(),
                location: order.ticket.event.location || 'N/A',
                imageUrl: order.ticket.event.thumb || '/images/golden-match.jpg',
            },
            ticketType: order.ticket.type,
            qrCode: order.ticket.qrCode || purchasedTicket.qrCodeId,
        };
    });

    const formattedPurchaseHistory = purchaseHistoryData.map(trx => {
        let statusString = 'Completed';
        if (trx.status === 'PENDING') statusString = 'Pending';
        if (trx.status === 'FAILED') statusString = 'Failed';
        if (trx.status === 'CANCELLED') statusString = 'Cancelled';

        return {
            id: trx.id,
            event: { name: trx.orderItems[0]?.ticket.event.name || 'Event' },
            purchaseDate: trx.createdAt.toISOString(),
            totalAmount: trx.totalAmount.toNumber(),
            status: statusString,
        };
    });

    return (
        <PageContainer withNavbar withFooter className="h-screen">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col sm:flex-row items-center gap-6 mb-10">
                    <Avatar
                        src={session.user.image ?? ''}
                        name={session.user.name ?? 'U'}
                        className="w-24 h-24 text-large"
                    />
                    <div>
                        <h1 className="text-3xl font-bold text-white">{session.user.name}</h1>
                        <p className="text-zinc-400">{session.user.email}</p>
                    </div>
                </div>

                <MenuTabs
                    activeTickets={formattedActiveTickets}
                    purchaseHistory={formattedPurchaseHistory}
                />
            </div>
        </PageContainer>
    );
};

export default ProfileUserPage;