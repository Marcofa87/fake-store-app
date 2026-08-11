import Link from "next/link";
import { PackageX, StoreIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type NotFoundContentProps = {
  /** Schermo intero (route globali) oppure area contenuto del dashboard */
  fullScreen?: boolean;
};

export function NotFoundContent({ fullScreen = false }: NotFoundContentProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center px-4 text-center",
        fullScreen ? "min-h-screen" : "min-h-[70vh]"
      )}
    >
      <Link
        href="/products"
        className="mb-10 flex items-center gap-2 transition-opacity hover:opacity-80"
      >
        <StoreIcon size={22} className="text-amber-300" />
        <span className="text-lg font-semibold tracking-tight text-white">
          Fake Store
        </span>
      </Link>

      <div className="mb-6 flex size-20 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
        <PackageX size={36} className="text-amber-300" strokeWidth={1.5} />
      </div>

      <p className="text-7xl font-bold tracking-tighter text-white sm:text-8xl">
        404
      </p>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
        Pagina non trovata
      </h1>
      <p className="mt-3 max-w-md text-base text-gray-400">
        Il prodotto o la pagina che stai cercando non esiste, è stato rimosso
        oppure l&apos;indirizzo non è corretto.
      </p>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/products"
          className="inline-flex h-11 items-center justify-center rounded-md bg-blue-600 px-6 text-sm font-medium text-white transition-colors hover:bg-blue-500"
        >
          Torna al catalogo
        </Link>
        <Link
          href="/cart"
          className="inline-flex h-11 items-center justify-center rounded-md border border-white/15 bg-transparent px-6 text-sm font-medium text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
        >
          Vai al carrello
        </Link>
      </div>
    </div>
  );
}
