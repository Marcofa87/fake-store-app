import { notFound } from "next/navigation";
import Image from "next/image";

import { HeartIcon, StarIcon } from "lucide-react";

import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { getProductById } from "@/lib/products";
import { cn } from "@/lib/utils";

export default async function ProductsIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-3/5 bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <div className="flex flex-col space-y-6">
            <div>
              <Badge variant="outline" className="mb-3">
                {product.category}
              </Badge>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>
              {product.rating && (
                <div className="flex items-center gap-2 text-gray-700">
                  <StarIcon className="size-5 fill-amber-400 stroke-amber-400" />
                  <span className="font-semibold">
                    {product.rating.rate.toFixed(1)}
                  </span>
                  <span className="text-sm text-gray-500">
                    ({product.rating.count} recensioni)
                  </span>
                </div>
              )}
            </div>
            <div className="grow">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Descrizione
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <p className="text-4xl sm:text-5xl font-bold text-blue-600">
                €{product.price.toFixed(2)}
              </p>
            </div>

            <div>
              <AddToCartButton product={product} />
            </div>
          </div>

          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
            <Image
              src={product.image}
              alt={product.title}
              fill
              unoptimized
              className="object-contain p-8"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <Button
              size="icon"
              className="bg-white/80 hover:bg-white absolute top-4 right-4 rounded-full shadow-md"
            >
              <HeartIcon className={cn("stroke-gray-700")} />
              <span className="sr-only">Like</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
