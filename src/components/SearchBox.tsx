"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId, useMemo, useRef, useState } from "react";
import { formatPrice } from "@/data/products";
import { searchProducts } from "@/lib/search";
import { SafeImage } from "./SafeImage";
import { SearchIcon } from "./icons";

export function SearchBox({ className = "" }: { className?: string }) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const router = useRouter();
  const listId = useId();
  const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const results = useMemo(() => (query.trim().length >= 2 ? searchProducts(query, 5) : []), [query]);
  const showList = focused && query.trim().length >= 2;

  return (
    <form
      role="search"
      className={`search-box ${className}`}
      action="/arama"
      onSubmit={(e) => {
        e.preventDefault();
        const q = query.trim();
        if (!q) return;
        setFocused(false);
        router.push(`/arama?q=${encodeURIComponent(q)}`);
      }}
    >
      <label htmlFor={`${listId}-input`} className="sr-only">
        Ürün ara
      </label>
      <input
        id={`${listId}-input`}
        name="q"
        type="search"
        placeholder="Ürün ara… (ör. salopet, elbise)"
        autoComplete="off"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => {
          if (blurTimer.current) clearTimeout(blurTimer.current);
          setFocused(true);
        }}
        onBlur={() => {
          blurTimer.current = setTimeout(() => setFocused(false), 150);
        }}
        aria-controls={listId}
        aria-expanded={showList}
        role="combobox"
        aria-autocomplete="list"
      />
      <button type="submit" className="search-submit" aria-label="Ara">
        <SearchIcon size={20} />
      </button>
      {showList && (
        <div id={listId} className="search-results" role="listbox">
          {results.length === 0 ? (
            <p className="search-empty">&quot;{query}&quot; için ürün bulunamadı.</p>
          ) : (
            <>
              {results.map((p) => (
                <Link
                  key={p.slug}
                  href={`/urun/${p.slug}`}
                  role="option"
                  aria-selected={false}
                  className="search-result"
                  onClick={() => {
                    setFocused(false);
                    setQuery("");
                  }}
                >
                  <span className="search-thumb">
                    <SafeImage src={p.images[0].src} alt="" fill sizes="48px" />
                  </span>
                  <span>
                    <strong>{p.name}</strong>
                    <small>{formatPrice(p.price)}</small>
                  </span>
                </Link>
              ))}
              <Link
                href={`/arama?q=${encodeURIComponent(query.trim())}`}
                className="search-all"
                onClick={() => setFocused(false)}
              >
                Tüm sonuçları gör
              </Link>
            </>
          )}
        </div>
      )}
    </form>
  );
}
