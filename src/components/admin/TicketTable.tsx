"use client";

import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Button } from "@heroui/react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const tickets = [
  { id: "tkt_001", type: "VIP", price: 450000, quantity: 100, sold: 80 },
  { id: "tkt_002", type: "Regular", price: 150000, quantity: 900, sold: 420 },
];

const columns = [
  { name: "TIPE TIKET", uid: "type" },
  { name: "HARGA", uid: "price" },
  { name: "KUOTA", uid: "quantity" },
  { name: "TERJUAL", uid: "sold" },
  { name: "ACTIONS", uid: "actions" },
];

export default function TicketTable() {
  const renderCell = React.useCallback((ticket: typeof tickets[0], columnKey: React.Key) => {
    const cellValue = ticket[columnKey as keyof typeof ticket];

    switch (columnKey) {
        case "price":
            return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(cellValue as number);
        case "actions":
            return (
                <div className="relative flex items-center gap-2">
                    <Tooltip content="Edit tiket"><Button isIconOnly size="sm" variant="light"><FaEdit className="text-lg text-zinc-400" /></Button></Tooltip>
                    <Tooltip color="danger" content="Hapus tiket"><Button isIconOnly size="sm" variant="light" color="danger"><FaTrashAlt className="text-lg" /></Button></Tooltip>
                </div>
            );
        default:
            return cellValue;
    }
  }, []);

  return (
    <Table aria-label="Tabel Tiket Event" className="bg-[#202027] border border-zinc-800 rounded-xl">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.uid} className="bg-zinc-800 text-white">{column.name}</TableColumn>}
      </TableHeader>
      <TableBody items={tickets}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell className="text-black">{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}