import React from 'react'
import SectionContainer from '../layouts/SectionContainer'
import { Button } from '@heroui/react'
import Link from 'next/link'

const categories = [
    { name: 'Musik', href: '/events/music' },
    { name: 'Olahraga', href: '/events/sports' },
    { name: 'Seminar', href: '/events/seminar' },
    { name: 'Seni & Teater', href: '/events/art' },
    { name: 'Workshop', href: '/events/workshop' },
    { name: 'Festival', href: '/events/festival' },
]

const CategorySection = () => {
    return (
        <SectionContainer>
            <h2 className='text-3xl font-bold mb-6 text-center'>Explore by Category</h2>
            <div className="flex flex-wrap justify-center gap-3">
                {categories.map(category => (
                    <Link href={category.href} key={category.name}>
                        <Button 
                            variant='bordered' 
                            className="border-zinc-700 text-white hover:bg-zinc-800 hover:border-[#5AE3A8] transition-colors"
                        >
                            {category.name}
                        </Button>
                    </Link>
                ))}
            </div>
        </SectionContainer>
    )
}

export default CategorySection