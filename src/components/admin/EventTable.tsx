// src/components/admin/EventTable.tsx
"use client";

import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Button } from "@heroui/react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Link from "next/link"; // Import Link

// DUMMY DATA
const events = [
    {
        id: 1,
        name: "Golden Match Football",
        category: "Olahraga",
        date: "2028-03-01",
        ticketsSold: 500,
        totalTickets: 1000,
    },
    // ... data lainnya
];

const columns = [
    { name: "NAMA EVENT", uid: "name" },
    { name: "KATEGORI", uid: "category" },
    { name: "TANGGAL", uid: "date" },
    { name: "TIKET TERJUAL", uid: "tickets" },
    { name: "ACTIONS", uid: "actions" },
];

export default function EventTable() {

    const renderCell = React.useCallback((event: typeof events[0], columnKey: React.Key) => {
        const cellValue = event[columnKey as keyof typeof event];

        switch (columnKey) {
            case "name":
                return <p className="font-bold">{cellValue}</p>;
            case "date":
                return new Date(cellValue as string).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' });
            case "tickets":
                return `${event.ticketsSold} / ${event.totalTickets}`;
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip content="Edit event dan kelola tiket">
                            <Link href={`/admin/events/${event.id}`}>
                                <Button isIconOnly size="sm" variant="light">
                                    <FaEdit className="text-lg text-zinc-400" />
                                </Button>
                            </Link>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete event">
                            <Button isIconOnly size="sm" variant="light" color="danger">
                                <FaTrashAlt className="text-lg" />
                            </Button>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <Table aria-label="Tabel Event" className="bg-[#202027] border border-zinc-800 rounded-xl">
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn key={column.uid} className="bg-zinc-800 text-white">
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody items={events}>
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => <TableCell className="text-black">{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}