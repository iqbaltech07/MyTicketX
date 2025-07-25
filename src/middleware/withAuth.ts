import {
  type NextRequest,
  type NextFetchEvent,
  type NextMiddleware,
  NextResponse,
} from "next/server";
import { useToken } from "~/hooks/useToken";

export function withAuth(
  middleware: NextMiddleware,
  publicPages: string[] = []
) {
  return async (req: NextRequest, event: NextFetchEvent) => {
    const { pathname } = req.nextUrl;
    const token = await useToken(req);

    const isAdminRoute = pathname.startsWith("/admin");
    const isAuthPage =
      pathname === "/login" ||
      pathname === "/register" ||
      pathname === "/admin/login";

    if (token) {
      // Jika user sudah login dan mengakses halaman login/register, redirect
      if (isAuthPage) {
        const redirectUrl = token.role === "ADMIN" ? "/admin/dashboard" : "/";
        return NextResponse.redirect(new URL(redirectUrl, req.url));
      }

      // Jika user bukan admin, tapi akses /admin
      if (isAdminRoute && token.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    // Jika belum login dan bukan public page, redirect ke login
    if (!token) {
      const isPublicPage = publicPages.includes(pathname);

      if (!isPublicPage) {
        let loginUrlPath = "/login";
        if (isAdminRoute) loginUrlPath = "/admin/login";

        const loginUrl = new URL(loginUrlPath, req.url);
        loginUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(loginUrl);
      }
    }

    return middleware(req, event);
  };
}
