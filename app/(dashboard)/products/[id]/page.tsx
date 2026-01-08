import { notFound } from "next/navigation";
import Image from "next/image";

import { HeartIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { cn } from "@/lib/utils";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
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
  /*  const [liked, setLiked] = useState<boolean>(false); */
  const { id } = await params;
  const product = await getProductsId(id);

  return (
    <div className="relative max-w-md rounded-xl bg-gradient-to-r from-neutral-600 to-violet-300 pt-0 shadow-lg">
      <div className="flex h-60 items-center justify-center">
        <Image
          src={product.image}
          alt={product.title}
          width={300}
          height={300}
          className="w-75"
        />
      </div>
      <Button
        size="icon"
        /* onClick={() => setLiked(!liked)} */
        className="bg-primary/10 hover:bg-primary/20 absolute top-4 right-4 rounded-full"
      >
        <HeartIcon
          className={cn(
            /* liked ? "fill-destructive stroke-destructive" : "stroke-white" */
            "stroke-white"
          )}
        />
        <span className="sr-only">Like</span>
      </Button>
      <Card className="border-none">
        <CardHeader>
          <CardTitle>{product.title}</CardTitle>
          <CardDescription className="flex items-center gap-2">
            <Badge variant="outline" className="rounded-sm">
              {product.category}
            </Badge>
            <Badge variant="outline" className="rounded-sm">
              ⭐ {product.rating.rate} ({product.rating.count})
            </Badge>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>{product.description}</p>
        </CardContent>
        <CardFooter className="justify-between gap-3 max-sm:flex-col max-sm:items-stretch">
          <div className="flex flex-col">
            <span className="text-sm font-medium uppercase">Price</span>
            <span className="text-xl font-semibold">${product.price}</span>
          </div>
          <Button size="lg">Add to cart</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
