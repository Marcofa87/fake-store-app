"use client";

import { useEffect, useState } from "react";
import { Provider } from "react-redux";

import { loadCartFromStorage, makeStore } from "@/store";
import { cart } from "@/store/cart-slice";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  // Initializer lazy: lo store nasce al primo render e non viene mai ricreato,
  // così i figli trovano subito il Provider popolato.
  const [store] = useState(makeStore);

  useEffect(() => {
    store.dispatch(cart(loadCartFromStorage()));
  }, [store]);

  return <Provider store={store}>{children}</Provider>;
}
