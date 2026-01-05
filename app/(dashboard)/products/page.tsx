import Image from "next/image";
import Link from "next/link";

type Product = {
  id: number;
  category: {
    id: number;
    name: string;
    image: string;
  };
  description: string;
  images: string[];
  price: number;
  title: string;
};

async function getProducts() {
  const response = await fetch("http://localhost:3000/api/products", {
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
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 text-center">
        Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {products.map((product: Product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer flex flex-col group"
          >
            <div className="relative w-full h-48 overflow-hidden bg-gray-100">
              <Image
                src={product.category.image}
                alt={product.title}
                fill
                className="object-cover hover:scale-110 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="p-4 sm:p-5 flex flex-col grow">
              <h2 className="text-lg font-semibold mb-2 text-gray-900 line-clamp-2">
                {product.title}
              </h2>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2 grow">
                {product.description}
              </p>
              <div className="mt-auto pt-3 border-t border-gray-100">
                <p className="text-xl font-bold text-blue-600">
                  €{product.price.toFixed(2)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
