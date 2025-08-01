import React from 'react'
import EventSwiper from '../ui/EventSwiper'
import { getPublicUpcomingEvents } from '~/libs/data'
import { IEvents } from '~/types/types';

const UpcomingSection = async () => {
    const eventsData = await getPublicUpcomingEvents();

    const formattedEvents: IEvents[] = eventsData.map(event => ({
        id: event.id,
        title: event.name,
        slug: event.id,
        description: event.description || '',
        thumb: event.thumb || '/images/golden-match.jpg',
        date: event.date.toISOString(),
        time: event.date.toLocaleTimeString('id-ID'),
    }));

    return (
        <div>
            <h2 className='text-[35px] font-bold'>Upcoming Event</h2>
            <div className='mt-5'>
                <EventSwiper data={formattedEvents} />
            </div>
        </div>
    )
}

export default UpcomingSection