import React from 'react'
import EventSwiper from '../ui/EventSwiper'
import { getPublicLatestEvents } from '~/libs/data'
import { IEvents } from '~/types/types';

const LatestSection = async () => {
    const eventsData = await getPublicLatestEvents();

    const formattedEvents: IEvents[] = eventsData.map(event => ({
        id: event.id, 
        title: event.name,
        slug: event.slug,
        description: event.description || '',
        thumb: event.thumb || '/images/golden-match.jpg', 
        date: event.date.toISOString(),
        time: event.date.toLocaleTimeString('id-ID'),
    }));

    return (
        <div>
            <h2 className='text-[35px] font-bold'>Event Terbaru</h2>
            <div className='mt-5'>
                <EventSwiper data={formattedEvents} />
            </div>
        </div>
    )
}

export default LatestSection