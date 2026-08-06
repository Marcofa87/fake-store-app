import { notFound } from "next/navigation";

import { ProductsBrowser } from "@/components/products/products-browser";
import { CATEGORIES, getCategoryBySlug } from "@/lib/categories";
import type { Product } from "@/lib/types";

async function getProductsByCategory(apiName: string): Promise<Product[]> {
  const response = await fetch(
    `https://fakestoreapi.com/products/category/${encodeURIComponent(apiName)}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ slug: category.slug }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = await getProductsByCategory(category.apiName);

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <header className="mb-10 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          FAKE STORE APP
        </h1>
        <p className="mt-2 text-lg text-gray-400">{category.label}</p>
      </header>
      <ProductsBrowser products={products} showCategoryFilter={false} />
    </div>
  );
}
