import React from 'react'
import { Divider } from '@heroui/react'
import { FaCalendar, FaMapPin } from 'react-icons/fa'
import PageContainer from '~/components/layouts/PageContainer'
import SectionContainer from '~/components/layouts/SectionContainer'
import BannerEvent from '~/components/ui/BannerEvent'
import TicketContainer from '~/components/ui/TicketContainer'

const eventDetail = {
    slug: 'golden-match-football-1',
    name: 'Golden Match Football',
    date: '2028-03-01T10:00:00.000Z',
    location: 'Stadion Gelora Bung Karno, Jakarta',
    description: 'Rasakan keseruan pertandingan sepak bola terakbar tahun ini! Saksikan tim-tim terbaik bertanding untuk memperebutkan gelar juara. Jangan lewatkan momen bersejarah ini dan dukung tim favoritmu secara langsung di stadion. Acara ini akan dimeriahkan juga oleh penampilan dari musisi ternama sebelum pertandingan dimulai. Pastikan Anda menjadi bagian dari euforia Golden Match Football!',
    imageUrl: '/images/golden-match.jpg', 
    organizer: {
        name: 'SportMax Events',
    },
    tickets: [
        { id: 1, type: 'VIP', price: 450000, quantity: 150 },
        { id: 2, type: 'Regular', price: 250000, quantity: 400 },
        { id: 3, type: 'Basic', price: 100000, quantity: 500 },
    ]
}

const DetailEventPage = async ({
    params,
}: {
    params: Promise<{ slug: string }>
}) => {
    // Nanti, Anda akan fetch data event dari database menggunakan slug
    // const { slug } = await params
    // const eventData = await getEventBySlug(slug)

    const formattedDate = new Date(eventDetail.date).toLocaleDateString("id-ID", {
        weekday: 'long',
        day: "numeric",
        month: "long",
        year: "numeric",
    })

    return (
        <PageContainer withNavbar withFooter>
            <SectionContainer className="mt-8 mb-20">
                <BannerEvent imageUrl={eventDetail.imageUrl} name={eventDetail.name} />
                {/* Konten Utama */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Kolom Kiri: Deskripsi & Info */}
                    <div className="md:col-span-2">
                        <h1 className="text-4xl font-bold text-white tracking-tight">{eventDetail.name}</h1>
                        <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-4 text-zinc-300">
                            <div className="flex items-center gap-2">
                                <FaCalendar className="text-[#5AE3A8]" />
                                <span>{formattedDate}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaMapPin className="text-[#5AE3A8]" />
                                <span>{eventDetail.location}</span>
                            </div>
                        </div>

                        <Divider className="my-6 bg-zinc-700" />

                        <div>
                            <h2 className="text-2xl font-semibold text-white mb-3">Deskripsi Event</h2>
                            <p className="text-zinc-400 leading-relaxed">
                                {eventDetail.description}
                            </p>
                        </div>
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold text-white">Diselenggarakan oleh:</h3>
                            <p className="text-zinc-300 mt-1">{eventDetail.organizer.name}</p>
                        </div>
                    </div>

                    {/* Kolom Kanan: Pembelian Tiket */}
                    <TicketContainer eventDetail={eventDetail} />
                </div>
            </SectionContainer>
        </PageContainer>
    )
}

export default DetailEventPage