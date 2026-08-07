import productsData from "@/data/products.json";
import type { Product } from "@/lib/types";

const products = productsData as Product[];

export function getProducts(): Product[] {
  return products;
}

export function getProductById(id: string | number): Product | undefined {
  const numericId = typeof id === "string" ? Number(id) : id;

  if (!Number.isFinite(numericId)) {
    return undefined;
  }

  return products.find((product) => product.id === numericId);
}

export function getProductsByCategory(apiName: string): Product[] {
  return products.filter((product) => product.category === apiName);
}
