import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { withAuth } from "./middleware/withAuth";

export function mainMiddleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/verify')) {
    const emailCookie = req.cookies.get('emailForVerification');
    if (!emailCookie) {
      return NextResponse.redirect(new URL('/register', req.url));
    }
  }

  return NextResponse.next();
}

const publicPages = ["/", "/login", "/register", "/verify", "/admin/login", "/payment/finish"];

export default withAuth(mainMiddleware, publicPages);

export const config = {
  matcher: [
    // - API routes, static files, favicon, dan gambar
    "/((?!api|_next/static|_next/image|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|favicon.ico).*)",
  ],
};