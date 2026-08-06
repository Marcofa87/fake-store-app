// app/api/(auth)/logout/route.ts
import { NextResponse } from "next/server";

import { AUTH_TOKEN_COOKIE, AUTH_USERNAME_COOKIE } from "@/lib/auth";

export async function POST() {
  const res = NextResponse.json({ ok: true }, { status: 200 });

  res.cookies.delete(AUTH_TOKEN_COOKIE);
  res.cookies.delete(AUTH_USERNAME_COOKIE);

  return res;
}
