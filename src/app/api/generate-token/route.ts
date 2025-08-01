import Midtrans from "midtrans-client";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "~/libs/prisma";
import { getServerSession } from "next-auth"; 
import { authOptions } from "~/libs/AuthOption"; 

const snap = new Midtrans.Snap({
  isProduction: false, 
  serverKey: process.env.MIDTRANS_SECRET || "",
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT || "",
});

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { orderItems } = await request.json();

  if (!orderItems || !Array.isArray(orderItems) || orderItems.length === 0) {
    return NextResponse.json({ message: "Order items are required" }, { status: 400 });
  }

  const newTransaction = await prisma.transaction.create({
    data: {
      userId: session.user.id,
      totalAmount: 0, 
      status: 'PENDING',
      orderItems: {
        create: orderItems.map((item: any) => ({
          ticketId: item.ticketId,
          quantity: item.quantity,
          priceAtPurchase: item.price, 
        })),
      },
    },
    include: {
        orderItems: true, 
    }
  });

  const grossAmount = orderItems.reduce((acc: number, item: any) => {
    return acc + item.price * item.quantity;
  }, 0);

  await prisma.transaction.update({
    where: { id: newTransaction.id },
    data: { totalAmount: grossAmount }
  });

  const parameter = {
    transaction_details: {
      order_id: newTransaction.id, 
      gross_amount: grossAmount,
    },
    item_details: orderItems.map((item: any) => ({
      id: item.ticketId,
      name: item.productName,
      price: item.price,
      quantity: item.quantity,
    })),
    customer_details: {
        first_name: session.user.name,
        email: session.user.email,
    }
  };

  try {
    const token = await snap.createTransactionToken(parameter);

    return NextResponse.json({
        token,
    });

  } catch (error: any) {
    console.error("Midtrans Error:", error.message);
    await prisma.transaction.update({
        where: { id: newTransaction.id },
        data: { status: 'FAILED' }
    });
    return NextResponse.json({ message: "Failed to create transaction" }, { status: 500 });
  }
}