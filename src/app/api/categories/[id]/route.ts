import { NextResponse } from "next/server";
import { prisma } from "~/libs/prisma";
import { CategorySchema } from "~/schemas/formSchemas";

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
    const validation = CategorySchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.format() },
        { status: 400 }
      );
    }

    const { name } = validation.data;

    const existingCategory = await prisma.category.findFirst({
      where: {
        name: { equals: name, mode: "insensitive" },
        NOT: { id },
      },
    });

    if (existingCategory) {
      return NextResponse.json(
        { message: "Nama kategori sudah ada." },
        { status: 409 }
      );
    }

    const updatedCategory = await prisma.category.update({
      where: { id },
      data: { name },
    });

    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.error("CATEGORY_PUT_ERROR:", error);
    return new NextResponse(
      JSON.stringify({ message: "Gagal memperbarui kategori" }),
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
    await prisma.category.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    if (error.code === "P2003") {
      return new NextResponse(
        JSON.stringify({
          message:
            "Kategori tidak dapat dihapus karena masih digunakan oleh event.",
        }),
        { status: 400 }
      );
    }
    return new NextResponse(
      JSON.stringify({ message: "Gagal menghapus kategori" }),
      { status: 500 }
    );
  }
}
