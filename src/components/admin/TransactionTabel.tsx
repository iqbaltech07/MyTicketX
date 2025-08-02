"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  User,
} from "@heroui/react";

type OrderItem = {
    priceAtPurchase: number;
    ticket: {
        price: number; 
        event: {
            name: string;
        }
    }
}

type Transaction = {
  id: string;
  createdAt: Date;
  totalAmount: number; 
  status: 'COMPLETED' | 'PENDING' | 'FAILED' | 'CANCELLED';
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  orderItems: OrderItem[];
};

type TransactionTableProps = {
  transactions: Transaction[];
};

const columns = [
  { name: "ID TRANSAKSI", uid: "id" },
  { name: "PENGGUNA", uid: "user" },
  { name: "EVENT", uid: "event" },
  { name: "TOTAL PEMBAYARAN", uid: "total" },
  { name: "STATUS", uid: "status" },
  { name: "TANGGAL TRANSAKSI", uid: "date" },
];

const statusColorMap: Record<Transaction['status'], "success" | "warning" | "danger" | "default"> = {
  COMPLETED: "success",
  PENDING: "warning",
  FAILED: "danger",
  CANCELLED: "default",
};

export default function TransactionTable({ transactions }: TransactionTableProps) {
  const renderCell = React.useCallback((transaction: Transaction, columnKey: React.Key) => {
    switch (columnKey) {
      case "id":
        return <p className="font-bold text-black">{transaction.id}</p>;
      case "user":
        return (
          <User
            avatarProps={{ radius: "lg", src: transaction.user.image || '' }}
            description={transaction.user.email}
            name={transaction.user.name}
          >
            {transaction.user.email}
          </User>
        );
      case "event":
        return <p className="font-bold text-black">{transaction.orderItems[0]?.ticket.event.name || 'N/A'}</p>;
      case "total":
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        }).format(transaction.totalAmount);
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[transaction.status]} size="sm" variant="flat">
            {transaction.status.toLowerCase()}
          </Chip>
        );
      case "date":
         return transaction.createdAt.toLocaleDateString("id-ID", {
            day: 'numeric', month: 'long', year: 'numeric'
        });
      default:
        return null;
    }
  }, []);

  return (
    <Table aria-label="Tabel Transaksi" className="bg-[#202027] border border-zinc-800 rounded-xl">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} className="bg-zinc-800 text-white">
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={transactions} emptyContent={"Belum ada transaksi."}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell className="!text-black">{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}