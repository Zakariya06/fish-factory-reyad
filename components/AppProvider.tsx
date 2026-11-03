"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { MotionConfig } from "framer-motion";
import type { Dish } from "@/lib/menu";

export type CartLine = { dish: Dish; qty: number };
export type ConciergeIntent = "book" | "order" | null;

type AppContextValue = {
  cart: CartLine[];
  count: number;
  subtotal: number;
  addItem: (dish: Dish) => void;
  updateQty: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  conciergeOpen: boolean;
  conciergeIntent: ConciergeIntent;
  conciergeKey: number;
  openConcierge: (intent?: Exclude<ConciergeIntent, null>) => void;
  closeConcierge: () => void;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [conciergeOpen, setConciergeOpen] = useState(false);
  const [conciergeIntent, setConciergeIntent] =
    useState<ConciergeIntent>(null);
  const [conciergeKey, setConciergeKey] = useState(0);

  const addItem = useCallback((dish: Dish) => {
    setCart((current) => {
      const existing = current.find((line) => line.dish.id === dish.id);
      if (existing) {
        return current.map((line) =>
          line.dish.id === dish.id ? { ...line, qty: line.qty + 1 } : line,
        );
      }
      return [...current, { dish, qty: 1 }];
    });
  }, []);

  const updateQty = useCallback((id: string, qty: number) => {
    setCart((current) =>
      qty <= 0
        ? current.filter((line) => line.dish.id !== id)
        : current.map((line) =>
            line.dish.id === id ? { ...line, qty } : line,
          ),
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setCart((current) => current.filter((line) => line.dish.id !== id));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const openCart = useCallback(() => {
    setCartOpen(true);
    setConciergeOpen(false);
  }, []);

  const closeCart = useCallback(() => setCartOpen(false), []);

  const openConcierge = useCallback(
    (intent?: Exclude<ConciergeIntent, null>) => {
      setConciergeOpen(true);
      setCartOpen(false);
      if (intent) {
        setConciergeIntent(intent);
        setConciergeKey((key) => key + 1);
      }
    },
    [],
  );

  const closeConcierge = useCallback(() => setConciergeOpen(false), []);

  const count = useMemo(
    () => cart.reduce((total, line) => total + line.qty, 0),
    [cart],
  );
  const subtotal = useMemo(
    () =>
      cart.reduce((total, line) => total + line.dish.price * line.qty, 0),
    [cart],
  );

  const value = useMemo<AppContextValue>(
    () => ({
      cart,
      count,
      subtotal,
      addItem,
      updateQty,
      removeItem,
      clearCart,
      cartOpen,
      openCart,
      closeCart,
      conciergeOpen,
      conciergeIntent,
      conciergeKey,
      openConcierge,
      closeConcierge,
    }),
    [
      cart,
      count,
      subtotal,
      addItem,
      updateQty,
      removeItem,
      clearCart,
      cartOpen,
      openCart,
      closeCart,
      conciergeOpen,
      conciergeIntent,
      conciergeKey,
      openConcierge,
      closeConcierge,
    ],
  );

  return (
    <AppContext.Provider value={value}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used inside AppProvider");
  }
  return context;
}
