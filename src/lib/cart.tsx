"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getProduct, type Product } from "@/data/products";

export type CartItem = {
  id: string;
  slug: string;
  size: string;
  quantity: number;
  personalization?: string;
};

type CartContextValue = {
  items: CartItem[];
  lines: (CartItem & { product: Product })[];
  count: number;
  total: number;
  ready: boolean;
  add: (item: Omit<CartItem, "id">) => void;
  update: (id: string, quantity: number) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const STORAGE_KEY = "orimini-sepet";
const CartContext = createContext<CartContextValue | null>(null);

function readStorage(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as CartItem[]) : [];
    return Array.isArray(parsed) ? parsed.filter((i) => getProduct(i.slug)) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Sepet yalnızca tarayıcıda tutulur; sunucu render'ında boş başlar.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(readStorage());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Gizli sekme vb. durumlarda sepet sadece bu oturumda kalır.
    }
  }, [items, ready]);

  const add = useCallback((item: Omit<CartItem, "id">) => {
    setItems((prev) => {
      const key = `${item.slug}|${item.size}|${item.personalization?.trim() ?? ""}`;
      const existing = prev.find((i) => i.id === key);
      if (existing) {
        return prev.map((i) => (i.id === key ? { ...i, quantity: i.quantity + item.quantity } : i));
      }
      return [...prev, { ...item, id: key }];
    });
  }, []);

  const update = useCallback((id: string, quantity: number) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, Math.min(20, quantity)) } : i)),
    );
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(() => {
    const lines = items.flatMap((i) => {
      const product = getProduct(i.slug);
      return product ? [{ ...i, product }] : [];
    });
    return {
      items,
      lines,
      count: lines.reduce((s, l) => s + l.quantity, 0),
      total: lines.reduce((s, l) => s + l.quantity * l.product.price, 0),
      ready,
      add,
      update,
      remove,
      clear,
    };
  }, [items, ready, add, update, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
