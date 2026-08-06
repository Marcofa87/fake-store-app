import { notFound } from "next/navigation";
import Image from "next/image";

import { HeartIcon, StarIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import type { Product } from "@/lib/types";

async function getProductsId(id: string): Promise<Product> {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
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
  /*  const [liked, setLiked] = useState<boolean>(false); */
  const { id } = await params;
  const product = await getProductsId(id);

  return (
    <div className="min-h-3/5 bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Colonna sinistra: Testo e button */}
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
              <Button
                size="lg"
                className="w-full sm:w-auto px-8 py-6 text-lg text-blue-700 cursor-pointer hover:text-blue-800 font-bold bg-amber-300"
              >
                Add to cart
              </Button>
            </div>
          </div>

          {/* Colonna destra: Solo immagine */}
          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain p-8"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <Button
              size="icon"
              /* onClick={() => setLiked(!liked)} */
              className="bg-white/80 hover:bg-white absolute top-4 right-4 rounded-full shadow-md"
            >
              <HeartIcon
                className={cn(
                  /* liked ? "fill-destructive stroke-destructive" : "stroke-gray-700" */
                  "stroke-gray-700"
                )}
              />
              <span className="sr-only">Like</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
