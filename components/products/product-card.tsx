import Image from "next/image";
import Link from "next/link";

import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer flex flex-col group p-6"
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
  );
}
