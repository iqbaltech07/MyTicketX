import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "~/libs/prisma";
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullname, email, password } = body;

    if (!fullname || !email || !password) {
      return new NextResponse(JSON.stringify({ message: "Data tidak lengkap" }), { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return new NextResponse(JSON.stringify({ message: "Email sudah terdaftar" }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await prisma.user.create({
      data: {
        name: fullname,
        email: email,
        password: hashedPassword,
      },
    });

    await fetch(`${process.env.BASE_URL}/api/auth/send-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: newUser.email }),
    });

     (await cookies()).set('emailForVerification', email, {
      path: '/',
      maxAge: 60 * 10, 
    });

    const { password: _, ...userWithoutPassword } = newUser;
    return NextResponse.json(userWithoutPassword, { status: 201 });

  } catch (error) {
    console.error("REGISTRATION_ERROR:", error);
    return new NextResponse(JSON.stringify({ message: "Terjadi kesalahan internal pada server" }), { status: 500 });
  }
}