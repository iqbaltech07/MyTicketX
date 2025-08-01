"use client";

import React, { useCallback } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Button,
  Link,
} from "@heroui/react";
import { FaEdit, FaTrashAlt, FaQrcode } from "react-icons/fa";
import axiosInstance from "~/libs/axiosInstance";

type Ticket = {
  id: string;
  type: string;
  price: number;
  quantity: number;
  qrCode?: string | null;
};

type TicketTableProps = {
  tickets: Ticket[];
  onEdit: (ticket: Ticket) => void;
  onDeleteSuccess: () => void;
};

const columns = [
  { name: "TIPE TIKET", uid: "type" },
  { name: "HARGA", uid: "price" },
  { name: "KUOTA", uid: "quantity" },
  { name: "QR CODE", uid: "qrCode" },
  { name: "ACTIONS", uid: "actions" },
];

export default function TicketTable({ tickets, onEdit, onDeleteSuccess }: TicketTableProps) {
  const handleDelete = useCallback(
    async (ticketId: string) => {
      if (confirm("Apakah Anda yakin ingin menghapus tipe tiket ini?")) {
        try {
          await axiosInstance.delete(`/tickets/${ticketId}`);
          onDeleteSuccess();
        } catch (error: any) {
          alert(
            error.response?.data?.message ||
            "Gagal menghapus tiket. Silakan coba lagi."
          );
        }
      }
    },
    [onDeleteSuccess]
  );

  const renderCell = React.useCallback(
    (ticket: Ticket, columnKey: React.Key) => {
      const cellValue = ticket[columnKey as keyof Ticket];

      switch (columnKey) {
        case "price":
          return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }).format(cellValue as number);
        case "qrCode":
          return cellValue ? (
            <Link href={cellValue as string} target="_blank" size="sm" className="text-blue-500 hover:underline">
              Lihat QR
            </Link>
          ) : (
            <span className="text-zinc-500 italic">Kosong</span>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Edit tiket" classNames={{ content: "!text-black" }}>
                <Button isIconOnly size="sm" variant="light" onPress={() => onEdit(ticket)}>
                  <FaEdit className="text-lg text-zinc-400" />
                </Button>
              </Tooltip>
              <Tooltip color="danger" content="Hapus tiket">
                <Button isIconOnly size="sm" variant="light" color="danger" onPress={() => handleDelete(ticket.id)}>
                  <FaTrashAlt className="text-lg" />
                </Button>
              </Tooltip>
            </div>
          );
        default:
          return <span className="text-black">{cellValue}</span>;
      }
    },
    [onEdit, onDeleteSuccess]
  );

  return (
    <Table aria-label="Tabel Tiket Event" className="bg-[#202027] border border-zinc-800 rounded-xl">
      <TableHeader columns={columns}>
        {(column) => (<TableColumn key={column.uid} className="bg-zinc-800 text-white">{column.name}</TableColumn>)}
      </TableHeader>
      <TableBody items={tickets} emptyContent={"Belum ada tipe tiket untuk event ini."}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell className="!text-black">{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}