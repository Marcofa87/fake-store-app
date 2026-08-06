import {
  configureStore,
  createListenerMiddleware,
  isAnyOf,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";

import cartReducer, {
  cartCleared,
  itemAdded,
  itemRemoved,
  quantityChanged,
  type CartItem,
} from "@/store/cart-slice";

const STORAGE_KEY = "fs_cart";

const cartPersistenceMiddleware = createListenerMiddleware();

// `cartHydrated` è escluso di proposito: altrimenti riscriveremmo su storage
// esattamente quello che abbiamo appena letto.
cartPersistenceMiddleware.startListening({
  matcher: isAnyOf(itemAdded, itemRemoved, quantityChanged, cartCleared),
  effect: (_action, listenerApi) => {
    if (typeof window === "undefined") {
      return;
    }

    const { items } = (listenerApi.getState() as RootState).cart;

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage pieno o disabilitato: il carrello resta valido in memoria.
    }
  },
});

function isCartItem(value: unknown): value is CartItem {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const item = value as Record<string, unknown>;

  return (
    typeof item.id === "number" &&
    typeof item.title === "string" &&
    typeof item.price === "number" &&
    typeof item.image === "string" &&
    typeof item.quantity === "number" &&
    item.quantity > 0
  );
}

export function loadCartFromStorage(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return [];
    }

    const parsed: unknown = JSON.parse(raw);

    return Array.isArray(parsed) ? parsed.filter(isCartItem) : [];
  } catch {
    return [];
  }
}

// Factory e non singleton: in Next.js un modulo è condiviso tra le richieste,
// quindi uno store globale farebbe trapelare lo stato di un utente in un'altra
// richiesta. Ogni render server e il client ottengono un'istanza propria.
export const makeStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(cartPersistenceMiddleware.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
