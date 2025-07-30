"use client"

import { Button, Input } from '@heroui/react'
import React from 'react'
import { FaSearch } from 'react-icons/fa'

const SearchSection = () => {
    return (
        <div className="relative z-10 text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                Explore and Discover the Best Events
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-zinc-300">
                From music concerts to tech seminars, everything is on MyTicketX.
            </p>
            <div className="mt-8 max-w-xl mx-auto flex items-center gap-2">
                <Input
                    type="text"
                    placeholder="Cari nama event..."
                    radius='sm'
                    className="w-full"
                    classNames={{
                        inputWrapper: "h-14",
                        input: "text-lg"
                    }}
                />
                <Button isIconOnly className="bg-[#5AE3A8] h-14 w-14 min-w-14">
                    <FaSearch className="text-zinc-900 w-6 h-6" />
                </Button>
            </div>
        </div>
    )
}

export default SearchSection