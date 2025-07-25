import { NextResponse } from "next/server";
import type { NextRequest, NextFetchEvent } from "next/server";
import { withAuth } from "./middleware/withAuth";

export function mainMiddleware(req: NextRequest, event: NextFetchEvent) {
  return NextResponse.next();
}

const publicPages = ["/", "/login", "/register", "/admin/login"];

export default withAuth(mainMiddleware, publicPages);

export const config = {
  matcher: [
    // Cocokkan semua path KECUALI:
    // - API routes, static files, favicon, dan gambar
    '/((?!api|_next/static|_next/image|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|favicon.ico).*)',
  ],
};
