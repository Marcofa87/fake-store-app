import { notFound } from "next/navigation";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: {
    id: number;
    name: string;
    image: string;
  };
};

async function getProductsId(id: string): Promise<Product> {
  const response = await fetch(`http://localhost:3000/api/products/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    if (response.status === 404 || response.status === 400) {
      notFound();
    }
    throw new Error("Failed to fetch product");
  }

  return response.json();
}

export default async function ProductsIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductsId(id);

  return <div>{product.title}</div>;
}
