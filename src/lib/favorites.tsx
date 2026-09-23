"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getProduct } from "@/data/products";

type FavoritesContextValue = {
  slugs: string[];
  ready: boolean;
  isFavorite: (slug: string) => boolean;
  toggle: (slug: string) => void;
};

const STORAGE_KEY = "orimini-favoriler";
const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [slugs, setSlugs] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? (JSON.parse(raw) as string[]) : [];
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSlugs(Array.isArray(parsed) ? parsed.filter((s) => getProduct(s)) : []);
    } catch {
      setSlugs([]);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
    } catch {
      // Tarayıcı depolamaya izin vermiyorsa favoriler bu oturumda kalır.
    }
  }, [slugs, ready]);

  const toggle = useCallback((slug: string) => {
    setSlugs((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
  }, []);

  const value = useMemo(
    () => ({ slugs, ready, isFavorite: (slug: string) => slugs.includes(slug), toggle }),
    [slugs, ready, toggle],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used inside FavoritesProvider");
  return ctx;
}
