import { NextResponse } from "next/server";
import { prisma } from "~/libs/prisma";
import { EventSchema } from "~/schemas/formSchemas";

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
    const event = await prisma.event.findUnique({
      where: { id },
      include: { category: true, tickets: true },
    });

    if (!event) {
      return new NextResponse(
        JSON.stringify({ message: "Event tidak ditemukan" }),
        { status: 404 }
      );
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error("EVENT_GET_DETAIL_ERROR:", error);
    return new NextResponse(
      JSON.stringify({ message: "Gagal mengambil detail event" }),
      { status: 500 }
    );
  }
}

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
    const validation = EventSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.format() },
        { status: 400 }
      );
    }

    const {
      name,
      description,
      thumb,
      date,
      location,
      organizer,
      categoryId,
      isDraf,
    } = validation.data;

    const updatedEvent = await prisma.event.update({
      where: { id },
      data: {
        name,
        description,
        thumb,
        date: new Date(date),
        isDraf, 
        location,
        organizer,
        categoryId,
      },
    });

    return NextResponse.json(updatedEvent);
  } catch (error) {
    console.error("EVENT_PUT_ERROR:", error);
    return new NextResponse(
      JSON.stringify({ message: "Gagal memperbarui event" }),
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
    await prisma.event.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("EVENT_DELETE_ERROR:", error);
    return new NextResponse(
      JSON.stringify({ message: "Gagal menghapus event" }),
      { status: 500 }
    );
  }
}
