"use client";

import Image from "next/image";
import Link from "next/link";
import { Button, Text } from "@radix-ui/themes";
import { MinusIcon, PlusIcon, Trash2Icon } from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/store";
import {
  cartCleared,
  itemRemoved,
  quantityChanged,
  selectCartCount,
  selectCartHydrated,
  selectCartItems,
  selectCartTotal,
} from "@/store/cart-slice";

export function CartContent() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const isHydrated = useAppSelector(selectCartHydrated);
  const count = useAppSelector(selectCartCount);
  const total = useAppSelector(selectCartTotal);

  // Prima dell'idratazione il carrello reale è ancora su localStorage: mostrare
  // "carrello vuoto" qui farebbe lampeggiare un messaggio sbagliato.
  if (!isHydrated) {
    return (
      <div className="flex flex-col gap-4">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className="h-28 animate-pulse rounded-xl border border-white/10 bg-[#0f1622]"
          />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-white/10 py-16 text-center">
        <Text size="3" color="gray">
          Il tuo carrello è vuoto.
        </Text>
        <div className="mt-4">
          <Link
            href="/products"
            className="text-sm font-medium text-amber-300 underline underline-offset-4 hover:text-amber-200"
          >
            Sfoglia i prodotti
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:items-start">
      <ul className="flex flex-col gap-4">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex gap-4 rounded-xl border border-white/10 bg-[#0f1622] p-4"
          >
            <Link
              href={`/products/${item.id}`}
              className="relative size-24 shrink-0 overflow-hidden rounded-lg bg-white"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-contain p-2"
                sizes="96px"
              />
            </Link>

            <div className="flex min-w-0 grow flex-col gap-2">
              <Link
                href={`/products/${item.id}`}
                className="line-clamp-2 text-sm font-semibold text-white hover:text-amber-300"
              >
                {item.title}
              </Link>
              <Text size="2" color="gray">
                €{item.price.toFixed(2)} × {item.quantity}
              </Text>

              <div className="mt-auto flex items-center gap-3">
                <div className="flex items-center gap-1 rounded-md border border-white/10">
                  <button
                    type="button"
                    onClick={() =>
                      dispatch(
                        quantityChanged({
                          id: item.id,
                          quantity: item.quantity - 1,
                        }),
                      )
                    }
                    disabled={item.quantity <= 1}
                    aria-label={`Riduci la quantità di ${item.title}`}
                    className="rounded-l-md p-1.5 text-gray-300 transition-colors hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <MinusIcon size={14} />
                  </button>
                  <span className="min-w-8 text-center text-sm font-medium text-white">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      dispatch(
                        quantityChanged({
                          id: item.id,
                          quantity: item.quantity + 1,
                        }),
                      )
                    }
                    aria-label={`Aumenta la quantità di ${item.title}`}
                    className="rounded-r-md p-1.5 text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <PlusIcon size={14} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => dispatch(itemRemoved(item.id))}
                  className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs text-gray-400 transition-colors hover:bg-white/5 hover:text-red-400 cursor-pointer"
                >
                  <Trash2Icon size={14} />
                  Rimuovi
                </button>
              </div>
            </div>

            <p className="shrink-0 self-start text-base font-bold text-white">
              €{(item.price * item.quantity).toFixed(2)}
            </p>
          </li>
        ))}
      </ul>

      <aside className="flex flex-col gap-4 rounded-xl border border-white/10 bg-[#0f1622] p-5 lg:sticky lg:top-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
          Riepilogo
        </h2>

        <div className="flex items-center justify-between">
          <Text size="2" color="gray">
            Articoli
          </Text>
          <Text size="2">{count}</Text>
        </div>

        <div className="flex items-center justify-between border-t border-white/10 pt-4">
          <Text size="3" weight="medium">
            Totale
          </Text>
          <p className="text-2xl font-bold text-amber-300">
            €{total.toFixed(2)}
          </p>
        </div>

        <Button
          size="3"
          onClick={() => dispatch(cartCleared())}
          variant="soft"
          color="red"
          style={{ cursor: "pointer" }}
        >
          Svuota carrello
        </Button>
      </aside>
    </div>
  );
}
