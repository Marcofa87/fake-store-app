"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CheckIcon, ShoppingCartIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/types";
import { useAppDispatch, useAppSelector } from "@/store";
import { itemAdded, selectCartQuantityById } from "@/store/cart-slice";

export function AddToCartButton({
  product,
  compact = false,
}: {
  product: Product;
  /** Variante ridotta per le card della griglia prodotti. */
  compact?: boolean;
}) {
  const dispatch = useAppDispatch();
  const quantityInCart = useAppSelector(selectCartQuantityById(product.id));
  const [justAdded, setJustAdded] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleAdd = () => {
    dispatch(itemAdded({ product }));
    setJustAdded(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => setJustAdded(false), 2000);
  };

  if (compact) {
    return (
      <Button
        type="button"
        size="sm"
        onClick={handleAdd}
        aria-label={`Aggiungi ${product.title} al carrello`}
        className="relative z-20 w-full cursor-pointer bg-amber-300 font-semibold text-[#0f1622] hover:bg-amber-200"
      >
        {justAdded ? (
          <>
            <CheckIcon /> Aggiunto
          </>
        ) : (
          <>
            <ShoppingCartIcon /> Aggiungi
          </>
        )}
        {quantityInCart > 0 && (
          <span className="absolute right-2 rounded-full bg-[#0f1622] px-1.5 py-0.5 text-[11px] font-bold text-amber-300">
            {quantityInCart}
          </span>
        )}
      </Button>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <Button
        size="lg"
        onClick={handleAdd}
        className="w-full sm:w-auto px-8 py-6 text-lg text-blue-700 cursor-pointer hover:text-blue-800 font-bold bg-amber-300 hover:bg-amber-200"
      >
        {justAdded ? (
          <>
            <CheckIcon /> Aggiunto al carrello
          </>
        ) : (
          <>
            <ShoppingCartIcon /> Add to cart
          </>
        )}
      </Button>

      {quantityInCart > 0 && (
        <p className="text-sm text-gray-600">
          Nel carrello: <span className="font-semibold">{quantityInCart}</span>{" "}
          <Link
            href="/cart"
            className="ml-1 font-medium text-blue-600 underline underline-offset-4 hover:text-blue-800"
          >
            Vai al carrello
          </Link>
        </p>
      )}
    </div>
  );
}
