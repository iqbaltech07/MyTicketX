import { NextResponse } from "next/server";
import { prisma } from "~/libs/prisma";
import { TicketSchema } from "~/schemas/formSchemas";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  const { id } = await params;
  try {
    const tickets = await prisma.ticket.findMany({
      where: { eventId: id },
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json(tickets);
  } catch (error) {
    console.error("TICKET_GET_ERROR:", error);
    return new NextResponse(
      JSON.stringify({ message: "Gagal mengambil data tiket" }),
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  const { id } = await params;
  try {
    const body = await request.json();
    const validation = TicketSchema.safeParse({ ...body, eventId: id });

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.format() },
        { status: 400 }
      );
    }

    const { type, price, quantity, qrCode } = validation.data;

    const newTicket = await prisma.ticket.create({
      data: {
        type,
        price,
        quantity,
        qrCode: qrCode || null,
        eventId: id,
      },
    });

    return NextResponse.json(newTicket, { status: 201 });
  } catch (error) {
    console.error("TICKET_POST_ERROR:", error);
    return new NextResponse(
      JSON.stringify({ message: "Gagal membuat tiket baru" }),
      { status: 500 }
    );
  }
}
