import React from "react";
import TransactionTable from "~/components/admin/TransactionTabel";
import { getAllTransactions } from "~/libs/data";

export const dynamic = 'force-dynamic';

const AdminTransactionsPage = async () => {
  const transactions = await getAllTransactions();

  const formattedTransactions = transactions.map(trx => ({
    ...trx,
    totalAmount: trx.totalAmount.toNumber(),
    orderItems: trx.orderItems.map(item => ({
      ...item,
      priceAtPurchase: item.priceAtPurchase.toNumber(),
      ticket: {
        ...item.ticket,
        price: item.ticket.price.toNumber(),
      }
    })),
  }));

  return (
    <div className="h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Manajemen Transaksi
          </h1>
          <p className="mt-1 text-zinc-400">
            Lihat semua riwayat transaksi yang dilakukan oleh pengguna.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <TransactionTable transactions={formattedTransactions} />
      </div>
    </div>
  );
};

export default AdminTransactionsPage;