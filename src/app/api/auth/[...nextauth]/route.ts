import NextAuth from "next-auth";
import { authOptions } from "~/libs/AuthOption";


const handler = NextAuth(authOptions);
export const GET = handler;
export const POST = handler;
