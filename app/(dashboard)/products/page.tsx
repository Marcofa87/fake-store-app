import { ProductsBrowser } from "@/components/products/products-browser";
import type { Product } from "@/lib/types";

async function getProducts(): Promise<Product[]> {
  const response = await fetch("https://fakestoreapi.com/products", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <header className="mb-10 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          FAKE STORE APP
        </h1>
        <p className="mt-2 text-lg text-gray-400">Products</p>
      </header>
      <ProductsBrowser products={products} />
    </div>
  );
}
