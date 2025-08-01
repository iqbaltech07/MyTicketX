import { z } from "zod";

export const RegisterSchema = z
  .object({
    fullname: z.string().min(3, {
      message: "Full name must be at least 3 characters long.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters long.",
    }),
    confirmPassword: z.string().min(6, {
      message: "Password must be at least 6 characters long.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

export const EventSchema = z.object({
  name: z.string().min(3, { message: "Nama event minimal 3 karakter." }),
  description: z
    .string()
    .min(10, { message: "Deskripsi minimal 10 karakter." }),
  thumb: z
    .string()
    .url({ message: "URL gambar tidak valid." })
    .min(1, { message: "Gambar banner wajib diisi." }),
  date: z.string(),
  organizer: z
    .string()
    .min(3, { message: "Nama penyelenggara minimal 3 karakter." }),
  location: z.string().min(3, { message: "Lokasi minimal 3 karakter." }),
  categoryId: z.string({ required_error: "Kategori wajib diisi." }),
  isDraf: z.boolean(),
});

export const CategorySchema = z.object({
  name: z.string().min(3, { message: "Nama kategori minimal 3 karakter." }),
});

export const TicketSchema = z.object({
  type: z.string().min(3, { message: "Tipe tiket minimal 3 karakter." }),
  price: z.coerce.number().positive({ message: "Harga harus lebih dari 0." }),
  quantity: z.coerce
    .number()
    .int()
    .positive({ message: "Kuantitas harus lebih dari 0." }),
  qrCode: z
    .string()
    .url({ message: "URL QR Code tidak valid." })
    .optional()
    .or(z.literal("")),
  eventId: z.string(),
});
