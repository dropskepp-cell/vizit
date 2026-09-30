"use client";

import { createContext, useContext, useMemo, useSyncExternalStore } from "react";

type State = { cart: number[]; favorites: number[] };

type StoreValue = State & {
  ready: boolean;
  inCart: (id: number) => boolean;
  isFavorite: (id: number) => boolean;
  addToCart: (id: number) => void;
  removeFromCart: (id: number) => void;
  toggleFavorite: (id: number) => void;
  clearCart: () => void;
};

const read = (key: string): number[] => {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(value) ? value.filter((v) => typeof v === "number") : [];
  } catch {
    return [];
  }
};

const write = (key: string, value: number[]) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
};

// Корзина и избранное живут в localStorage, пока нет бэкенда
const listeners = new Set<() => void>();
const serverState: State = { cart: [], favorites: [] };
let state: State | null = null;

const getState = () =>
  // Каждая вещь в одном экземпляре, поэтому в корзине id не повторяются
  (state ??= { cart: Array.from(new Set(read("cart"))), favorites: read("favorites") });

const setState = (patch: Partial<State>) => {
  state = { ...getState(), ...patch };
  write("cart", state.cart);
  write("favorites", state.favorites);
  listeners.forEach((l) => l());
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  // Синхронизация между вкладками
  const onStorage = () => {
    state = null;
    listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
};

const noopSubscribe = () => () => {};

const actions = {
  addToCart: (id: number) => {
    const { cart } = getState();
    if (!cart.includes(id)) setState({ cart: [...cart, id] });
  },
  removeFromCart: (id: number) =>
    setState({ cart: getState().cart.filter((x) => x !== id) }),
  toggleFavorite: (id: number) => {
    const { favorites } = getState();
    setState({
      favorites: favorites.includes(id)
        ? favorites.filter((x) => x !== id)
        : [...favorites, id],
    });
  },
  clearCart: () => setState({ cart: [] }),
};

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const current = useSyncExternalStore(subscribe, getState, () => serverState);
  const ready = useSyncExternalStore(noopSubscribe, () => true, () => false);

  const value = useMemo<StoreValue>(
    () => ({
      ...current,
      ready,
      inCart: (id) => current.cart.includes(id),
      isFavorite: (id) => current.favorites.includes(id),
      ...actions,
    }),
    [current, ready],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}
