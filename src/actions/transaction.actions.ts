"use server";

import Midtrans from "midtrans-client";
import { prisma } from "~/libs/prisma";
import { revalidatePath } from "next/cache";

const core = new Midtrans.CoreApi({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SECRET || "",
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT || "",
});

export async function verifyTransactionStatus(orderId: string) {
  try {
    const statusResponse = await core.transaction.status(orderId);
    const transactionStatus = statusResponse.transaction_status;
    const fraudStatus = statusResponse.fraud_status;

    const transaction = await prisma.transaction.findUnique({
      where: { id: orderId },
      include: { orderItems: true },
    });

    if (!transaction) {
      throw new Error("Transaksi tidak ditemukan.");
    }

    if (transactionStatus == 'capture' || transactionStatus == 'settlement') {
        if (fraudStatus == 'accept') {
            await prisma.transaction.update({
                where: { id: orderId },
                data: { status: 'COMPLETED' },
            });

            for (const item of transaction.orderItems) {
                await prisma.ticket.update({
                    where: { id: item.ticketId },
                    data: { quantity: { decrement: item.quantity } },
                });
            }
            
            return { status: 'success', message: 'Pembayaran berhasil!' };
        }
    } else if (transactionStatus == 'pending') {
        await prisma.transaction.update({
            where: { id: orderId },
            data: { status: 'PENDING' },
        });
        return { status: 'pending', message: 'Pembayaran Anda sedang diproses.' };
    } else {
        await prisma.transaction.update({
            where: { id: orderId },
            data: { status: 'FAILED' },
        });
        return { status: 'failed', message: 'Pembayaran gagal atau dibatalkan.' };
    }

  } catch (error) {
    console.error("Verification Error:", error);
    return { status: 'error', message: 'Terjadi kesalahan saat memverifikasi pembayaran.' };
  }

  revalidatePath('/profile');
  return { status: 'no_change', message: 'Status tidak berubah.' };
}