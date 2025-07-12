import { NextResponse } from "next/server";
import type { NextRequest, NextFetchEvent } from 'next/server';
import { withAuth } from "./middleware/withAuth";

export function mainMiddleware(req: NextRequest, event: NextFetchEvent) {
  const res = NextResponse.next();
  return res;
}

const publicPages = ['/login', '/register', "/admin/login"];

export default withAuth(mainMiddleware, publicPages);

export const config = {
  matcher: [
    /*
     * Cocokkan semua path permintaan, KECUALI yang berikut ini:
     * - api, _next/static, _next/image, favicon.ico
     * - file dengan ekstensi gambar (svg, png, jpg, jpeg, gif, webp)
     */
    '/((?!api|_next/static|_next/image|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|favicon.ico).*)',
  ],
};