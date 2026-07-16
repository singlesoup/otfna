"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, Sparkles, X } from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { BottomNav } from "@/components/bottom-nav";
import { RestaurantCard } from "@/components/restaurant-card";
import { StickyCartBar } from "@/components/sticky-cart-bar";
import { categories, searchRestaurants } from "@/data/catalog";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const results = useMemo(() => searchRestaurants(query, category), [query, category]);

  return (
    <main className="min-h-screen bg-white pb-40" data-testid="home-page">
      <AppHeader />
      <section className="page-enter px-5 pt-5">
        <div className="relative overflow-hidden rounded-[1.6rem] bg-[#FFF7D8] p-5" data-testid="home-hero-banner">
          <div className="absolute -right-7 -top-10 h-28 w-28 rounded-full bg-mango/60 blur-2xl" />
          <p className="relative flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-[.15em] text-amber-800"><Sparkles size={13} /> Craving mode</p>
          <h1 className="relative mt-2 max-w-xs text-3xl font-extrabold leading-[1.08] tracking-tight">What are you almost ordering?</h1>
          <p className="relative mt-3 max-w-sm text-sm leading-relaxed text-neutral-600">Browse the whole ritual. Keep the entire bill.</p>
        </div>

        <div id="search" className="relative mt-5 scroll-mt-24">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={19} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search biryani, pizza, momos…" className="h-14 w-full rounded-2xl border border-neutral-200 bg-neutral-50 pl-12 pr-12 text-sm font-semibold outline-none transition-[border-color,box-shadow] focus:border-mango focus:ring-4 focus:ring-mango/10" aria-label="Search restaurants and dishes" data-testid="home-search-input" />
          {query && <button type="button" onClick={() => setQuery("")} className="absolute right-4 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full bg-neutral-200 text-neutral-600" aria-label="Clear search" data-testid="home-search-clear-button"><X size={14} /></button>}
        </div>

        <div className="scrollbar-none -mx-5 mt-4 flex gap-2 overflow-x-auto px-5 pb-2" data-testid="category-chip-list">
          {categories.map((item) => <button key={item} onClick={() => setCategory(item)} type="button" className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition-[background-color,border-color,transform] active:scale-95 ${category === item ? "border border-mango bg-mango text-charcoal" : "border border-neutral-200 bg-white text-neutral-600"}`} data-testid={`category-chip-${item.toLowerCase().replace(/\s/g, "-")}`}>{item}</button>)}
        </div>
      </section>

      <section className="px-5 pt-7" data-testid="restaurant-results-section">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div><p className="text-[11px] font-bold uppercase tracking-[.14em] text-neutral-400">Near Home</p><h2 className="mt-1 text-xl font-extrabold">{query || category !== "All" ? `${results.length} matches` : "Restaurants to explore"}</h2></div>
          <button type="button" className="flex items-center gap-1 rounded-full border border-neutral-200 px-3 py-2 text-xs font-bold text-neutral-600" data-testid="sort-filter-button"><SlidersHorizontal size={14} /> Sort</button>
        </div>
        <div className="space-y-5">
          {results.map((restaurant, index) => <RestaurantCard key={restaurant.id} restaurant={restaurant} index={index} />)}
          {!results.length && <div className="rounded-2xl bg-neutral-50 px-6 py-12 text-center" data-testid="empty-search-results"><p className="font-extrabold">Nothing on this menu.</p><p className="mt-2 text-sm text-neutral-500">Try another dish or reset the category.</p></div>}
        </div>
      </section>
      <StickyCartBar />
      <BottomNav />
    </main>
  );
}
