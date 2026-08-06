// app/api/(auth)/login/route.ts
import { NextRequest, NextResponse } from "next/server";

import {
  AUTH_TOKEN_COOKIE,
  AUTH_USERNAME_COOKIE,
  authCookieOptions,
} from "@/lib/auth";

const API_BASE_URL = "https://fakestoreapi.com";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Validazione
    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    // Chiamata all'API di FakeStore
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      // FakeStore risponde con testo semplice, non JSON, sugli errori di login
      const message = await response.text().catch(() => "");
      return NextResponse.json(
        { error: message.trim() || "Login failed" },
        { status: response.status }
      );
    }

    const data = await response.json();

    if (!data?.token) {
      return NextResponse.json(
        { error: "Risposta di login non valida" },
        { status: 502 }
      );
    }

    // Il token resta in un cookie httpOnly: non è leggibile da JavaScript e
    // viaggia da solo a ogni richiesta, così la sessione sopravvive al refresh.
    const res = NextResponse.json({ username }, { status: 200 });
    res.cookies.set(AUTH_TOKEN_COOKIE, data.token, authCookieOptions);
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
