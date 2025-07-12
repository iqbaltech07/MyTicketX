import { getToken } from "next-auth/jwt";
import {
  type NextRequest,
  type NextFetchEvent,
  type NextMiddleware,
  NextResponse,
} from "next/server";

export function withAuth(
  middleware: NextMiddleware,
  publicPages: string[] = []
) {
  return async (req: NextRequest, event: NextFetchEvent) => {
    const { pathname } = req.nextUrl;
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    const isAdminRoute = pathname.startsWith("/admin");
    const isAuthPage =
      pathname.startsWith("/login") ||
      pathname.startsWith("/register") ||
      pathname.startsWith("/admin/login");

    if (token) {
      if (isAuthPage) {
        const redirectUrl = token.role === "ADMIN" ? "/admin/dashboard" : "/";
        return NextResponse.redirect(new URL(redirectUrl, req.url));
      }

      // jika user bukan admin maka redirect ke halaman utama user
      if (isAdminRoute && token.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    if (!token) {
      const isPublicPage = publicPages.some((page) =>
        pathname.startsWith(page)
      );

      if (!isPublicPage) {
        let loginUrlPath = "/login";

        if (isAdminRoute) {
          loginUrlPath = "/admin/login";
        }

        const loginUrl = new URL(loginUrlPath, req.url);
        loginUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(loginUrl);
      }
    }

    return middleware(req, event);
  };
}
