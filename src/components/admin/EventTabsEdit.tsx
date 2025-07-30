"use client"

import React, { useState } from 'react'
import { Button, Card, CardBody, Tab, Tabs, Input, Textarea, Select, SelectItem, DateInput } from "@heroui/react";
import { FaPlus } from "react-icons/fa";
import TicketTable from "~/components/admin/TicketTable";
import { parseAbsoluteToLocal } from "@internationalized/date";
import TicketFormModal from './TicketFormModal';

type EventTabsEditProps = {
    eventData: {
        name: string;
        description: string;
        date: string;
        categoryId: string;
        location: string;
    };
    categories: { label: string; value: string }[];
}

const EventTabsEdit = ({ eventData, categories }: EventTabsEditProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <Tabs aria-label="Event Management Tabs" classNames={{
                tabList: "bg-zinc-800",
                cursor: "bg-[#5AE3A8]",
                tabContent: "group-data-[selected=true]:text-zinc-900 font-bold"
            }}>
                <Tab key="details" title="Detail Event">
                    <Card className="bg-[#202027] border border-zinc-800 mt-4">
                        <CardBody className="p-6 space-y-4">
                            <Input label="Nama Event" defaultValue={eventData.name} variant="bordered" />
                            <Textarea label="Deskripsi" defaultValue={eventData.description} variant="bordered" />
                            <div className="grid grid-cols-2 gap-4">
                                <DateInput label="Tanggal Event" defaultValue={parseAbsoluteToLocal("2021-11-07T07:45:00Z")} variant="bordered" />
                                <Select label="Kategori" defaultSelectedKeys={[eventData.categoryId]} variant="bordered" classNames={{ value: "!text-white" }}>
                                    {categories.map((cat) => (
                                        <SelectItem key={cat.value} textValue={cat.value} className="text-black">
                                            {cat.label}
                                        </SelectItem>
                                    ))}
                                </Select>
                            </div>
                            <Input label="Lokasi" defaultValue={eventData.location} variant="bordered" />
                            <div className="flex justify-end">
                                <Button className="bg-[#5AE3A8] text-zinc-900 font-bold">Simpan Perubahan</Button>
                            </div>
                        </CardBody>
                    </Card>
                </Tab>
                <Tab key="tickets" title="Manajemen Tiket">
                    <Card className="bg-transparent mt-4">
                        <CardBody>
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold">Daftar Tiket</h2>
                                <Button onPress={() => setIsModalOpen(true)} className="bg-[#5AE3A8] text-zinc-900">
                                    <FaPlus />
                                    Tambah Tipe Tiket
                                </Button>
                            </div>
                            <TicketTable />
                        </CardBody>
                    </Card>
                </Tab>
            </Tabs>
            <TicketFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Tambah Tipe Tiket Baru"
            />
        </>
    )
}

export default EventTabsEdit