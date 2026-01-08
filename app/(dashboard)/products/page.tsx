import Image from "next/image";
import Link from "next/link";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

async function getProducts() {
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-4/6 mx-auto">
        {products.map((product: Product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer flex flex-col group"
          >
            <div className="relative w-full h-32 overflow-hidden bg-gray-100 flex items-center justify-center">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain hover:scale-110 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="p-3 sm:p-4 flex flex-col grow">
              <h2 className="text-base font-semibold mb-1.5 text-gray-900 line-clamp-2">
                {product.title}
              </h2>
              <p className="text-xs text-gray-600 mb-3 line-clamp-2 grow">
                {product.description}
              </p>
              <div className="mt-auto pt-2 border-t border-gray-100">
                <p className="text-lg font-bold text-blue-600">
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
