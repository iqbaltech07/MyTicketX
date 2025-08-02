import React from 'react'
import { Divider } from '@heroui/react'
import { FaCalendar, FaMapPin } from 'react-icons/fa'
import PageContainer from '~/components/layouts/PageContainer'
import SectionContainer from '~/components/layouts/SectionContainer'
import BannerEvent from '~/components/ui/BannerEvent'
import TicketContainer from '~/components/ui/TicketContainer'
import { getEventById } from '~/libs/data'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const eventData = await getEventById(slug);

    if (!eventData) {
        return {
            title: 'Event Not Found',
        }
    }

    return {
        title: `${eventData.name} - MyTicketX`,
        description: eventData.description,
    }
}

const DetailEventPage = async ({
    params,
}: {
    params: Promise<{ slug: string }>;
}) => {
    const { slug } = await params;
    const eventData = await getEventById(slug);

    if (!eventData) {
        notFound();
    }

    const formattedDate = new Date(eventData.date).toLocaleDateString("id-ID", {
        weekday: 'long',
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const formattedTickets = eventData.tickets.map(ticket => ({
        ...ticket,
        price: ticket.price.toNumber(),
    }));

    return (
        <PageContainer withNavbar withFooter>
            <SectionContainer className="mt-8 mb-20">
                <BannerEvent imageUrl={eventData.thumb || '/images/golden-match.jpg'} name={eventData.name} />

                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                        <h1 className="text-4xl font-bold text-white tracking-tight">{eventData.name}</h1>
                        <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-4 text-zinc-300">
                            <div className="flex items-center gap-2">
                                <FaCalendar className="text-[#5AE3A8]" />
                                <span>{formattedDate}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaMapPin className="text-[#5AE3A8]" />
                                <span>{eventData.location}</span>
                            </div>
                        </div>

                        <Divider className="my-6 bg-zinc-700" />

                        <div>
                            <h2 className="text-2xl font-semibold text-white mb-3">Deskripsi Event</h2>
                            <p className="text-zinc-400 leading-relaxed">
                                {eventData.description}
                            </p>
                        </div>
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold text-white">Diselenggarakan oleh:</h3>
                            <p className="text-zinc-300 mt-1">{eventData.organizer}</p>
                        </div>
                    </div>

                    <TicketContainer tickets={formattedTickets} />
                </div>
            </SectionContainer>
        </PageContainer>
    )
}

export default DetailEventPage;