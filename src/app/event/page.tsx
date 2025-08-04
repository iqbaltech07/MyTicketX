import React, { Suspense } from 'react'
import Link from 'next/link'
import PageContainer from '~/components/layouts/PageContainer'
import CardEvent from '~/components/common/CardEvent'
import SectionContainer from '~/components/layouts/SectionContainer'
import LatestSection from '~/components/section/LatestSection'
import UpcomingSection from '~/components/section/UpcomingSection'
import { getPublicAllEvents } from '~/libs/data'
import { IEvents } from '~/types/types'
import { AllEventsGridSkeleton, SkeletonSwiper } from '~/components/ui/Skeletons'

export const dynamic = 'force-dynamic';

async function AllEventsGrid({ category }: { category?: string }) {
    const eventsData = await getPublicAllEvents(category);

    const formattedEvents: IEvents[] = eventsData.map((event: any) => ({
        id: event.id,
        title: event.name,
        slug: event.slug,
        description: event.description || '',
        thumb: event.thumb || '/images/golden-match.jpg',
        date: event.date.toISOString(),
        time: event.date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    }));

    if (formattedEvents.length === 0) {
        return <p className="text-zinc-400 text-center col-span-full">Tidak ada event yang ditemukan untuk kategori ini.</p>;
    }


    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {formattedEvents.map((event) => (
                <Link href={`/event/${event.slug}`} key={event.id}>
                    <CardEvent
                        title={event.title}
                        description={event.description}
                        image={event.thumb}
                        date={event.date}
                        time={event.time}
                    />
                </Link>
            ))}
        </div>
    );
}


const AllEventsPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ category?: string }>;
}) => {
    const { category } = await searchParams;

    return (
        <PageContainer withNavbar withFooter>
            <div className="container mx-auto px-4 py-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white">Temukan Event Favoritmu</h1>
                    <p className="mt-2 text-lg text-zinc-400">Dari konser hingga workshop, semuanya ada di sini.</p>
                </div>

                <SectionContainer className="mt-16">
                    <Suspense fallback={<SkeletonSwiper />}>
                        <LatestSection />
                    </Suspense>
                </SectionContainer>

                <SectionContainer className="mt-16">
                    <Suspense fallback={<SkeletonSwiper />}>
                        <UpcomingSection />
                    </Suspense>
                </SectionContainer>

                <SectionContainer className='mt-16'>
                    <h2 className='text-3xl font-bold mb-6'>Semua Event {category && `- Kategori ${category.charAt(0).toUpperCase() + category.slice(1)}`}</h2>
                    <Suspense fallback={<AllEventsGridSkeleton />}>
                        <AllEventsGrid category={category} />
                    </Suspense>
                </SectionContainer>
            </div>
        </PageContainer>
    )
}

export default AllEventsPage;