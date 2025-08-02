"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Button, Skeleton } from "@heroui/react";
import { FaPlus } from "react-icons/fa";
import EventTable from "~/components/admin/EventTable";
import EventFormModal from "~/components/admin/EventFormModal";
import axiosInstance from "~/libs/axiosInstance";

type Category = {
    id: string;
    name: string;
};

type Event = {
    id: string;
    name: string;
    thumb: string;
    organizer: string | null; 
    category: Category;
    date: string;
    isDraf: boolean;
    _count: { tickets: number };
};


const AdminEventsPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchEvents = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/events');
            setEvents(response.data);
        } catch (error) {
            console.error("Failed to fetch events:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    console.log(events);
    
    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleSuccess = () => {
        fetchEvents();
        handleCloseModal();
    };

    return (
        <div className="pb-10">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">
                        Manajemen Event
                    </h1>
                    <p className="mt-1 text-zinc-400">
                        Tambah, edit, atau hapus event yang Anda selenggarakan.
                    </p>
                </div>
                <Button
                    className="bg-[#5AE3A8] text-zinc-900 font-bold"
                    onPress={handleOpenModal}
                >
                    <FaPlus />
                    Tambah Event
                </Button>
            </div>

            <div className="mt-8">
                {loading ? (
                    <div className="space-y-3">
                        <Skeleton className="h-12 w-full rounded-lg bg-zinc-800" />
                        <Skeleton className="h-12 w-full rounded-lg bg-zinc-800" />
                        <Skeleton className="h-12 w-full rounded-lg bg-zinc-800" />
                    </div>
                ) : (
                    <EventTable events={events} onDeleteSuccess={fetchEvents} />
                )}
            </div>

            <EventFormModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title="Tambah Event Baru"
                onSuccess={handleSuccess}
            />
        </div>
    );
};

export default AdminEventsPage;