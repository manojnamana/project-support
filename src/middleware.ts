import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_COOKIE = "auth_token";
const REFRESH_COOKIE = "refresh_token";

/**
 * Network-boundary auth gate.
 * Allow dashboard when access OR refresh token is present so the client
 * can silently refresh an expired 60-minute access token.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const access = request.cookies.get(AUTH_COOKIE)?.value;
  const refresh = request.cookies.get(REFRESH_COOKIE)?.value;
  const isAuthenticated = Boolean(access || refresh);

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
