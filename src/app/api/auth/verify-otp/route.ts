import { prisma } from "~/libs/prisma";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const otpRecord = await prisma.otp.findFirst({
      where: {
        userId: user.id,
        code: otp,
        expiry: { gte: new Date() },
      },
    });

    if (!otpRecord) {
      return NextResponse.json({ message: "Invalid or expired OTP" }, { status: 400 });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: new Date() },
    });

    await prisma.otp.delete({ where: { id: otpRecord.id } });

    (await cookies()).delete('emailForVerification');

    return NextResponse.json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("VERIFY_OTP_ERROR:", error);
    return NextResponse.json({ message: "Failed to verify OTP" }, { status: 500 });
  }
}