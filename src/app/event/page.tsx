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

async function AllEventsGrid() {
    const eventsData = await getPublicAllEvents();

    const formattedEvents: IEvents[] = eventsData.map(event => ({
        id: event.id,
        title: event.name,
        slug: event.id,
        description: event.description || '',
        thumb: event.thumb || '/images/golden-match.jpg',
        date: event.date.toISOString(),
        time: event.date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    }));

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


const AllEventsPage = () => {
    return (
        <PageContainer withNavbar withFooter>
            <div className="container mx-auto px-4 py-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white">Find Your Favorite Event</h1>
                    <p className="mt-2 text-lg text-zinc-400">From concerts to workshops, it’s all here.</p>
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
                    <h2 className='text-3xl font-bold mb-6'>All Events</h2>
                    <Suspense fallback={<AllEventsGridSkeleton />}>
                        <AllEventsGrid />
                    </Suspense>
                </SectionContainer>
            </div>
        </PageContainer>
    )
}

export default AllEventsPage;