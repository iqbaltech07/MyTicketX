import { NextResponse } from "next/server";
import { prisma } from "~/libs/prisma";
import { CategorySchema } from "~/schemas/formSchemas";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = CategorySchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ message: validation.error.format() }, { status: 400 });
    }

    const { name } = validation.data;

    const existingCategory = await prisma.category.findFirst({
        where: { name: { equals: name, mode: 'insensitive' } }
    });

    if (existingCategory) {
        return NextResponse.json({ message: "Nama kategori sudah ada." }, { status: 409 });
    }

    const newCategory = await prisma.category.create({
      data: { name },
    });

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error("CATEGORY_POST_ERROR:", error);
    return new NextResponse(JSON.stringify({ message: "Terjadi kesalahan internal pada server" }), { status: 500 });
  }
}

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { events: true },
        },
      },
      orderBy: {
        name: 'asc'
      }
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.error("CATEGORY_GET_ERROR:", error);
    return new NextResponse(JSON.stringify({ message: "Gagal mengambil data kategori" }), { status: 500 });
  }
}