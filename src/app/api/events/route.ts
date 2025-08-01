import { NextResponse } from "next/server";
import { prisma } from "~/libs/prisma";
import { EventSchema } from "~/schemas/formSchemas";

export async function POST(request: Request) {
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

    const newEvent = await prisma.event.create({
      data: {
        name,
        slug: name.toLowerCase().replace(/[\s/]+/g, "-"),
        description,
        thumb,
        date: new Date(date),
        isDraf,
        location,
        organizer,
        categoryId,
      },
    });

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error("EVENT_POST_ERROR:", error);
    return new NextResponse(
      JSON.stringify({ message: "Terjadi kesalahan internal pada server" }),
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      include: {
        category: true,
        _count: {
          select: { tickets: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(events);
  } catch (error) {
    console.error("EVENT_GET_ERROR:", error);
    return new NextResponse(
      JSON.stringify({ message: "Gagal mengambil data event" }),
      { status: 500 }
    );
  }
}
