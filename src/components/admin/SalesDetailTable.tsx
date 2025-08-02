"use client";

import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";

type DetailTransaction = {
    date: Date;
    event: string;
    ticketsSold: number;
    totalSales: number;
};

type SalesDetailTableProps = {
    transactions: DetailTransaction[];
};

const columns = [
  { name: "TANGGAL", uid: "date" },
  { name: "EVENT", uid: "event" },
  { name: "TIKET TERJUAL", uid: "ticketsSold" },
  { name: "TOTAL PENJUALAN", uid: "totalSales" },
];

export default function SalesDetailTable({ transactions }: SalesDetailTableProps) {
  const renderCell = React.useCallback((transaction: DetailTransaction, columnKey: React.Key) => {
    switch (columnKey) {
      case "date":
        return transaction.date.toLocaleDateString("id-ID", {
            day: 'numeric', month: 'long', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
      case "event":
        return <p className="font-bold text-black">{transaction.event}</p>;
      case "ticketsSold":
        return `${transaction.ticketsSold} tiket`;
      case "totalSales":
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        }).format(transaction.totalSales);
      default:
        return null;
    }
  }, []);

  return (
    <Table aria-label="Tabel Detail Transaksi" className="bg-[#202027] border border-zinc-800 rounded-xl">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} className="bg-zinc-800 text-white">
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={transactions} emptyContent={"Tidak ada transaksi pada periode ini."}>
        {(item) => (
          <TableRow key={item.date.toISOString() + item.event}>
            {(columnKey) => <TableCell className="!text-black">{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}