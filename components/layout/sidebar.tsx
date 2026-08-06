"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Gem,
  LaptopIcon,
  LayoutGrid,
  LogOut,
  Menu,
  Shirt,
  ShoppingBag,
  StoreIcon,
  X,
  type LucideIcon,
} from "lucide-react";

import { useAuth } from "@/components/auth/auth-provider";
import { CATEGORIES } from "@/lib/categories";
import { cn } from "@/lib/utils";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  electronics: LaptopIcon,
  jewelery: Gem,
  "mens-clothing": Shirt,
  "womens-clothing": ShoppingBag,
};

const NAV_ITEMS: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/products", label: "Tutti i prodotti", icon: LayoutGrid },
  ...CATEGORIES.map((category) => ({
    href: `/categories/${category.slug}`,
    label: category.label,
    icon: CATEGORY_ICONS[category.slug] ?? LayoutGrid,
  })),
];

export function Sidebar() {
  const pathname = usePathname();
  const { username, logout, isLoggingOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <div className="lg:hidden sticky top-0 z-30 flex items-center gap-3 border-b border-white/10 bg-[#0f1622]/95 px-4 py-3 backdrop-blur">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Apri il menu"
          className="rounded-md p-2 text-gray-300 hover:bg-white/10 hover:text-white cursor-pointer"
        >
          <Menu size={20} />
        </button>
        <span className="font-semibold tracking-tight text-white">
          FAKE STORE APP
        </span>
      </div>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          aria-hidden
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 shrink-0 flex-col border-r border-white/10 bg-[#0f1622] transition-transform duration-200",
          "lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between gap-2 border-b border-white/10 px-5 py-5">
          <Link href="/products" className="flex items-center gap-2">
            <StoreIcon size={20} className="text-amber-300" />
            <span className="font-semibold tracking-tight text-white">
              Fake Store
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Chiudi il menu"
            className="rounded-md p-1.5 text-gray-400 hover:bg-white/10 hover:text-white cursor-pointer lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
            Catalogo
          </p>
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;

              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                      isActive
                        ? "bg-white/10 font-medium text-white"
                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <Icon size={18} />
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-white/10 px-3 py-4">
          {username && (
            <p className="px-3 pb-2 text-sm text-gray-400">
              Ciao, <span className="text-white">{username}</span>
            </p>
          )}
          <button
            type="button"
            onClick={() => void logout()}
            disabled={isLoggingOut}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-400 transition-colors hover:bg-white/5 hover:text-white cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
          >
            <LogOut size={18} />
            {isLoggingOut ? "Uscita..." : "Esci"}
          </button>
        </div>
      </aside>
    </>
  );
}
