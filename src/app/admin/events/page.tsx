"use client";

import React, { useState } from "react";
import { Button } from "@heroui/react";
import { FaPlus } from "react-icons/fa";
import EventTable from "~/components/admin/EventTable";
import EventFormModal from "~/components/admin/EventFormModal";
import PageContainer from "~/components/layouts/PageContainer";

const AdminEventsPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <PageContainer>
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
                <EventTable />
            </div>

            <EventFormModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title="Tambah Event Baru"
            />
        </PageContainer>
    );
};

export default AdminEventsPage;