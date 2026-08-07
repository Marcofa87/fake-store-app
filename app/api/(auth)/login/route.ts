// app/api/(auth)/login/route.ts
import { NextRequest, NextResponse } from "next/server";

import {
  AUTH_TOKEN_COOKIE,
  AUTH_USERNAME_COOKIE,
  authCookieOptions,
} from "@/lib/auth";

const DEMO_USERNAME = "admin";
const DEMO_PASSWORD = "1234";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    if (username !== DEMO_USERNAME || password !== DEMO_PASSWORD) {
      return NextResponse.json(
        { error: "Credenziali non valide" },
        { status: 401 }
      );
    }

    const res = NextResponse.json({ username }, { status: 200 });
    res.cookies.set(AUTH_TOKEN_COOKIE, `demo.${username}`, authCookieOptions);
    res.cookies.set(AUTH_USERNAME_COOKIE, username, authCookieOptions);

    return res;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
