import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { AUTH_TOKEN_COOKIE } from "@/lib/auth";

const LOGIN_PATH = "/login";
const HOME_PATH = "/products";

export function proxy(request: NextRequest) {
  const isAuthenticated = Boolean(
    request.cookies.get(AUTH_TOKEN_COOKIE)?.value
  );
  const { pathname } = request.nextUrl;

  if (pathname === LOGIN_PATH) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL(HOME_PATH, request.url));
    }

    return NextResponse.next();
  }

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
