"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId, useMemo, useRef, useState } from "react";
import { useCatalog, useSite } from "@/lib/catalog";
import { buildIndex, searchProducts } from "@/lib/search";
import { formatPrice, t } from "@/lib/site";
import { SafeImage } from "./SafeImage";
import { SearchIcon } from "./icons";

export function SearchBox({ className = "" }: { className?: string }) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const router = useRouter();
  const listId = useId();
  const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { products, categories, sizes } = useCatalog();
  const site = useSite();
  const index = useMemo(() => buildIndex(products, categories, sizes), [products, categories, sizes]);
  const results = useMemo(
    () => (query.trim().length >= 2 ? searchProducts(index, query, 5) : []),
    [index, query],
  );
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
        {t(site, "txt_search_title")}
      </label>
      <input
        id={`${listId}-input`}
        name="q"
        type="search"
        placeholder={t(site, "txt_search_placeholder")}
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
            <p className="search-empty">{t(site, "txt_search_empty", { q: query })}</p>
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
                {t(site, "txt_search_all")}
              </Link>
            </>
          )}
        </div>
      )}
    </form>
  );
}
