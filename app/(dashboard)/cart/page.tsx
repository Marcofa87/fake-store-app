import type { Metadata } from "next";

import { CartContent } from "@/components/cart/cart-content";

export const metadata: Metadata = {
  title: "Carrello | Fake Store APP",
};

export default function CartPage() {
  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <header className="mb-10 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          IL TUO CARRELLO
        </h1>
        <p className="mt-2 text-lg text-gray-400">Cart</p>
      </header>
      <div className="mx-auto w-full max-w-7xl">
        <CartContent />
      </div>
    </div>
  );
}
