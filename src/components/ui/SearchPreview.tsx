import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type EventPreview = {
    id: string;
    name: string;
    slug: string;
    thumb: string | null;
};

type SearchPreviewProps = {
    results: EventPreview[];
    isLoading: boolean;
};

const SearchPreview = ({ results, isLoading }: SearchPreviewProps) => {
    return (
        <div className="absolute top-full mt-2 w-full bg-[#202027] border border-zinc-800 rounded-lg shadow-lg z-50">
            <ul className="divide-y divide-zinc-700">
                {isLoading ? (
                    <li className="p-4 text-center text-zinc-400">Mencari...</li>
                ) : results.length > 0 ? (
                    results.map((event) => (
                        <li key={event.id}>
                            <Link href={`/event/${event.slug}`} className="flex items-center gap-4 p-3 hover:bg-zinc-800 transition-colors">
                                <Image
                                    src={event.thumb || '/images/golden-match.jpg'}
                                    alt={event.name}
                                    width={64}
                                    height={40}
                                    className="rounded object-cover w-16 h-10"
                                />
                                <span className="text-white font-semibold truncate">{event.name}</span>
                            </Link>
                        </li>
                    ))
                ) : (
                    <li className="p-4 text-center text-zinc-400">Event tidak ditemukan.</li>
                )}
            </ul>
        </div>
    );
};

export default SearchPreview;