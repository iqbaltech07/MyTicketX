import { NextResponse } from "next/server";
import { prisma } from "~/libs/prisma";
import { TicketSchema } from "~/schemas/formSchemas";

export async function PUT(
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
    const validation = TicketSchema.omit({ eventId: true }).safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.format() },
        { status: 400 }
      );
    }

    const { type, price, quantity, qrCode } = validation.data;

    const updatedTicket = await prisma.ticket.update({
      where: { id },
      data: {
        type,
        price,
        quantity,
        qrCode: qrCode || null,
      },
    });

    return NextResponse.json(updatedTicket);
  } catch (error) {
    console.error("TICKET_PUT_ERROR:", error);
    return new NextResponse(
      JSON.stringify({ message: "Gagal memperbarui tiket" }),
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  const { id } = await params;
  try {
    await prisma.ticket.delete({
      where: { id },
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("TICKET_DELETE_ERROR:", error);
    return new NextResponse(
      JSON.stringify({ message: "Gagal menghapus tiket" }),
      { status: 500 }
    );
  }
}
