import Image from "next/image";
import Link from "next/link";
import { StarIcon } from "lucide-react";

import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0f1622] transition duration-200 hover:-translate-y-1 hover:border-white/20 hover:shadow-xl hover:shadow-black/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
    >
      <div className="relative aspect-4/3 w-full overflow-hidden bg-white">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
        />
        <span className="absolute left-3 top-3 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-medium capitalize text-white backdrop-blur">
          {product.category}
        </span>
      </div>

      <div className="flex grow flex-col gap-2 p-4">
        <h2 className="line-clamp-2 text-sm font-semibold text-white transition-colors group-hover:text-amber-300">
          {product.title}
        </h2>
        <p className="line-clamp-2 text-xs leading-relaxed text-gray-400">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/10 pt-3">
          <p className="text-lg font-bold text-white">
            €{product.price.toFixed(2)}
          </p>
          {product.rating && (
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <StarIcon size={14} className="fill-amber-300 stroke-amber-300" />
              <span className="font-medium text-gray-200">
                {product.rating.rate.toFixed(1)}
              </span>
              <span>({product.rating.count})</span>
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
