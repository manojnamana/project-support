import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const AUTH_COOKIE = "auth_token";

/**
 * Network-boundary auth gate.
 * Only authenticated staff (valid auth cookie) can reach /dashboard.
 * Unauthenticated users are sent to /login.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(AUTH_COOKIE)?.value;
  const isAuthenticated = Boolean(token);

  if (pathname.startsWith("/dashboard") && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname.startsWith("/login") && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
