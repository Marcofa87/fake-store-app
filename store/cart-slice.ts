import {
  createSelector,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import type { Product } from "@/lib/types";
import type { RootState } from "@/store";

export type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  hydrated: boolean;
};

const initialState: CartState = {
  items: [],
  hydrated: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cart(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
      state.hydrated = true;
    },
    itemAdded(
      state,
      action: PayloadAction<{ product: Product; quantity?: number }>,
    ) {
      const { product, quantity = 1 } = action.payload;
      const existing = state.items.find((item) => item.id === product.id);

      if (existing) {
        existing.quantity += quantity;
        return;
      }

      state.items.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity,
      });
    },
    quantityChanged(
      state,
      action: PayloadAction<{ id: number; quantity: number }>,
    ) {
      const item = state.items.find((entry) => entry.id === action.payload.id);

      if (item) {
        item.quantity = Math.max(1, action.payload.quantity);
      }
    },
    itemRemoved(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    cartCleared(state) {
      state.items = [];
    },
  },
});

export const { cart, itemAdded, quantityChanged, itemRemoved, cartCleared } =
  cartSlice.actions;

export default cartSlice.reducer;

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartHydrated = (state: RootState) => state.cart.hydrated;

export const selectCartCount = createSelector([selectCartItems], (items) =>
  items.reduce((sum, item) => sum + item.quantity, 0),
);

export const selectCartTotal = createSelector([selectCartItems], (items) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0),
);

// Restituisce un primitivo, quindi non serve memoizzarlo: `useSelector` può
// confrontarlo con === senza innescare re-render inutili.
export const selectCartQuantityById = (id: number) => (state: RootState) =>
  state.cart.items.find((item) => item.id === id)?.quantity ?? 0;
