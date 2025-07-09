import { getToken } from "next-auth/jwt";
import { 
  type NextRequest, 
  type NextFetchEvent, 
  type NextMiddleware, 
  NextResponse 
} from "next/server";

export function withAuth(middleware: NextMiddleware, publicPages: string[] = []) {
  return async (req: NextRequest, event: NextFetchEvent) => {
    const { pathname } = req.nextUrl;

    const isPublicPage = publicPages.some(page => pathname.startsWith(page));
    const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register');

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (token && isAuthPage) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    if (!token && !isPublicPage) {
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('callbackUrl', pathname); 

      return NextResponse.redirect(loginUrl);
    }
    
    return middleware(req, event);
  };
}