"use client";

import React, { useCallback, useMemo } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Button } from "@heroui/react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Link from "next/link";
import axiosInstance from "~/libs/axiosInstance";
import Image from "next/image";

type Category = {
    id: string;
    name: string;
};

type Event = {
    id: string;
    name: string;
    thumb: string | null;
    organizer: string | null;
    category: Category;
    date: string;
    isDraf: boolean;
    _count: { tickets: number };
};

type EventTableProps = {
    events: Event[];
    onDeleteSuccess: () => void;
};

const columns = [
    { name: "GAMBAR", uid: "thumb" },
    { name: "NAMA EVENT", uid: "name" },
    { name: "PENYELENGGARA", uid: "organizer" },
    { name: "KATEGORI", uid: "category" },
    { name: "TANGGAL", uid: "date" },
    { name: "WAKTU", uid: "time" },
    { name: "DRAF", uid: "draf" },
    { name: "ACTIONS", uid: "actions" },
];

export default function EventTable({ events, onDeleteSuccess }: EventTableProps) {

    const handleDelete = useCallback(
        async (eventId: string) => {
            if (confirm("Apakah Anda yakin ingin menghapus event ini?")) {
                try {
                    await axiosInstance.delete(`/events/${eventId}`);
                    onDeleteSuccess();
                } catch (error) {
                    console.error("Gagal menghapus event:", error);
                    alert("Gagal menghapus event. Silakan coba lagi.");
                }
            }
        },
        [onDeleteSuccess]
    );

    const renderCell = React.useCallback((event: Event, columnKey: React.Key) => {
        switch (columnKey) {
            case "thumb":
                return <Image src={event.thumb || '/images/golden-match.jpg'} alt={event.name} width={100} height={60} className="rounded-md object-cover" />;
            case "name":
                return <p className="font-bold text-black">{event.name}</p>;
            case "organizer":
                return <p className="text-zinc-900">{event.organizer || '-'}</p>;
            case "category":
                return <p className="text-zinc-900">{event.category?.name || 'N/A'}</p>;
            case "date":
                return new Date(event.date).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' });
            case "time":
                const date = new Date(event.date);

                const hours = date.getHours().toString().padStart(2, '0');
                const minutes = date.getMinutes().toString().padStart(2, '0');

                return `${hours}:${minutes}`;
            case "draf": return <p className={`${event.isDraf ? "text-yellow-600" : "text-green-600"} font-bold`}>{event.isDraf ? 'Ya' : 'Tidak'}</p>;
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip content="Edit event dan kelola tiket" classNames={{ content: "!text-black" }}>
                            <Link href={`/admin/events/${event.id}`}>
                                <Button isIconOnly size="sm" variant="light">
                                    <FaEdit className="text-lg text-zinc-400" />
                                </Button>
                            </Link>
                        </Tooltip>
                        <Tooltip color="danger" content="Hapus event">
                            <Button isIconOnly size="sm" variant="light" color="danger" onPress={() => handleDelete(event.id)}>
                                <FaTrashAlt className="text-lg" />
                            </Button>
                        </Tooltip>
                    </div>
                );
            default:
                return null;
        }
    }, [onDeleteSuccess]);

    const memoizedEvents = useMemo(() => events, [events]);

    return (
        <Table aria-label="Tabel Event" className="bg-[#202027] border border-zinc-800 rounded-xl">
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn key={column.uid} className="bg-zinc-800 text-white">
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody items={memoizedEvents} emptyContent={"Belum ada event yang dibuat."}>
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => <TableCell className="!text-black">{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}