// app/api/(auth)/login/route.ts
import { NextRequest, NextResponse } from "next/server";

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
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
