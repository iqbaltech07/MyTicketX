import React from 'react'
import SectionContainer from '../layouts/SectionContainer'
import { Button } from '@heroui/react'
import Link from 'next/link'
import { getPublicCategories } from '~/libs/data'

const CategorySection = async () => {
    const categories = await getPublicCategories();

    return (
        <SectionContainer>
            <h2 className='text-3xl font-bold mb-6 text-center'>Explore by Category</h2>
            <div className="flex flex-wrap justify-center gap-3">
                {categories.map(category => (
                    <Link href={`/event?category=${category.name.toLowerCase()}`} key={category.id}>
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