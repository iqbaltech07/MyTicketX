"use client"

import React from 'react'
import EventSwiper from '../ui/EventSwiper'
import { events } from '~/data/data'

const LatestSection = () => {
    return (
        <div>
            <h2 className='text-[35px] font-bold'>Latest Event</h2>
            <div className='mt-5'>
               <EventSwiper data={events}/>
            </div>
        </div>
    )
}

export default LatestSection