import { prisma } from "~/libs/prisma";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    await prisma.otp.deleteMany({
      where: { userId: user.id },
    });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 menit

    await prisma.otp.create({
      data: {
        code: otp,
        expiry,
        userId: user.id,
      },
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Kode Verifikasi MyTicketX Anda",
      text: `Kode OTP Anda adalah ${otp}. Kode ini akan kedaluwarsa dalam 10 menit.`,
      html: `<p>Kode OTP Anda adalah <strong>${otp}</strong>. Kode ini akan kedaluwarsa dalam 10 menit.</p>`,
    });

    return NextResponse.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("SEND_OTP_ERROR:", error);
    return NextResponse.json({ message: "Failed to send OTP" }, { status: 500 });
  }
}