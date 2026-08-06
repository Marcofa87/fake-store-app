"use client";

import { useMemo, useState } from "react";
import { Button, Slider, Text, TextField } from "@radix-ui/themes";
import { SearchIcon } from "lucide-react";

import { ProductCard } from "@/components/products/product-card";
import type { Product } from "@/lib/types";

const ALL_CATEGORIES = "all";

function priceBounds(products: Product[]): [number, number] {
  if (products.length === 0) {
    return [0, 0];
  }

  const prices = products.map((product) => product.price);
  return [Math.floor(Math.min(...prices)), Math.ceil(Math.max(...prices))];
}

export function ProductsBrowser({
  products,
  showCategoryFilter = true,
}: {
  products: Product[];
  showCategoryFilter?: boolean;
}) {
  const [minPrice, maxPrice] = useMemo(() => priceBounds(products), [products]);

  const categories = useMemo(
    () =>
      Array.from(new Set(products.map((product) => product.category))).sort(),
    [products],
  );

  const [category, setCategory] = useState<string>(ALL_CATEGORIES);
  const [range, setRange] = useState<[number, number]>([minPrice, maxPrice]);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        category === ALL_CATEGORIES || product.category === category;
      const matchesPrice =
        product.price >= range[0] && product.price <= range[1];
      const matchesQuery =
        normalizedQuery === "" ||
        product.title.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesPrice && matchesQuery;
    });
  }, [products, category, range, query]);

  const isFiltered =
    category !== ALL_CATEGORIES ||
    query.trim() !== "" ||
    range[0] !== minPrice ||
    range[1] !== maxPrice;

  const resetFilters = () => {
    setCategory(ALL_CATEGORIES);
    setRange([minPrice, maxPrice]);
    setQuery("");
  };

  return (
    <div className="mx-auto w-full max-w-7xl">
      <div className="mb-8 flex flex-col gap-6 rounded-xl border border-white/10 bg-[#0f1622] p-4 sm:p-6">
        <TextField.Root
          size="3"
          placeholder="Cerca nella descrizione..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        >
          <TextField.Slot>
            <SearchIcon size={16} />
          </TextField.Slot>
        </TextField.Root>

        {showCategoryFilter && (
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant={category === ALL_CATEGORIES ? "solid" : "soft"}
              onClick={() => setCategory(ALL_CATEGORIES)}
              style={{ cursor: "pointer", textTransform: "capitalize" }}
            >
              Tutte
            </Button>
            {categories.map((item) => (
              <Button
                key={item}
                variant={category === item ? "solid" : "soft"}
                onClick={() => setCategory(item)}
                style={{ cursor: "pointer", textTransform: "capitalize" }}
              >
                {item}
              </Button>
            ))}
          </div>
        )}

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <Text size="2" weight="medium">
              Prezzo
            </Text>
            <Text size="2" color="gray">
              €{range[0].toFixed(2)} — €{range[1].toFixed(2)}
            </Text>
          </div>
          <Slider
            value={range}
            onValueChange={(value) => setRange([value[0], value[1]])}
            min={minPrice}
            max={maxPrice}
            step={1}
          />
        </div>

        <div className="flex items-center justify-between gap-4">
          <Text size="2" color="gray">
            {filtered.length} di {products.length} prodotti
          </Text>
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={resetFilters}
              style={{ cursor: "pointer" }}
            >
              Azzera filtri
            </Button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-white/10 py-16 text-center">
          <Text size="3" color="gray">
            Nessun prodotto trovato con questi filtri.
          </Text>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
