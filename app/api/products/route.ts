// app/api/products/route.ts
import { NextResponse } from "next/server";

const API_BASE_URL = "https://api.escuelajs.co/api/v1";

export async function GET() {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch products" },
        { status: response.status }
      );
    }

    const products = await response.json();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
