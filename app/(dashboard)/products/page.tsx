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
      <h1 className="text-3xl font-bold mb-8 text-gray-900 text-center">
        Products
      </h1>
      <ProductsBrowser products={products} />
    </div>
  );
}
