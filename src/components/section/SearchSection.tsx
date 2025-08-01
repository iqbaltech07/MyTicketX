"use client";

import { Button, Input } from '@heroui/react';
import React, { useState, useTransition, useCallback } from 'react';
import { FaSearch } from 'react-icons/fa';
import { searchEventsByName } from '~/actions/event.actions';
import SearchPreview from '../ui/SearchPreview';
import { debounce } from '~/libs/debounce';

type EventPreview = {
    id: string;
    name: string;
    slug: string;
    thumb: string | null;
};

const SearchSection = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<EventPreview[]>([]);
    const [isPending, startTransition] = useTransition();
    const [showPreview, setShowPreview] = useState(false);

    const handleSearch = (searchQuery: string) => {
        if (searchQuery.length < 2) {
            setResults([]);
            setShowPreview(false);
            return;
        }

        startTransition(async () => {
            const searchResult = await searchEventsByName(searchQuery);
            setResults(searchResult);
            setShowPreview(true);
        });
    };

    const debouncedSearch = useCallback(debounce(handleSearch, 300), []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        debouncedSearch(newQuery);
    };

    return (
        <div className="relative z-10 text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                Explore and Discover the Best Events
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-zinc-300">
                From music concerts to tech seminars, everything is on MyTicketX.
            </p>
            <div className="mt-8 max-w-xl mx-auto relative">
                <div className="flex items-center gap-2">
                    <Input
                        type="text"
                        placeholder="Cari nama event..."
                        radius='sm'
                        className="w-full"
                        value={query}
                        onChange={handleChange}
                        onBlur={() => setTimeout(() => setShowPreview(false), 200)}
                        onFocus={() => query.length >= 2 && setShowPreview(true)}
                        classNames={{
                            inputWrapper: "h-14",
                            input: "text-lg"
                        }}
                    />
                    <Button isIconOnly className="bg-[#5AE3A8] h-14 w-14 min-w-14">
                        <FaSearch className="text-zinc-900 w-6 h-6" />
                    </Button>
                </div>
                {showPreview && (
                    <SearchPreview results={results} isLoading={isPending} />
                )}
            </div>
        </div>
    );
}

export default SearchSection;