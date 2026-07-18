"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { BadgeCheck, Leaf, Star } from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { QuantityStepper } from "@/components/quantity-stepper";
import { StickyCartBar } from "@/components/sticky-cart-bar";
import { getRestaurant } from "@/data/catalog";
import { useOrder } from "@/context/order-context";
import { useEffect } from "react";
import { track } from "@/lib/analytics";

export default function RestaurantPage() {
  const { id } = useParams<{ id: string }>();
  const restaurant = getRestaurant(id);
  const { cart, addItem, removeItem } = useOrder();

  useEffect(() => { if (restaurant) track("restaurant_viewed", { restaurant_id: restaurant.id, category: restaurant.category }); }, [restaurant]);

  if (!restaurant) return <main className="p-8" data-testid="restaurant-not-found"><h1 className="text-2xl font-extrabold">Restaurant not found</h1></main>;

  return (
    <main className="min-h-screen bg-white pb-32" data-testid="restaurant-page">
      <AppHeader backHref="/" title="Back to restaurants" compact />
      <section className="page-enter">
        <div className="relative aspect-[1.45/1] overflow-hidden bg-neutral-100" data-testid="restaurant-hero-image">
          <Image src={restaurant.image} alt={`${restaurant.name} menu`} fill sizes="480px" priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/05 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 text-white">
            <p className="mb-2 inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-bold backdrop-blur-md"><BadgeCheck size={13} className="text-mango" /> {restaurant.badge}</p>
            <h1 className="text-3xl font-extrabold" data-testid="restaurant-detail-name">{restaurant.name}</h1>
            <p className="mt-1 text-sm text-white/75">{restaurant.cuisines.join(" · ")}</p>
          </div>
        </div>
        <div className="mx-5 -mt-1 grid grid-cols-3 divide-x divide-neutral-100 rounded-b-2xl border border-t-0 border-neutral-100 bg-white py-4 text-center shadow-card">
          <div><p className="flex items-center justify-center gap-1 text-sm font-extrabold text-savings"><Star size={13} fill="currentColor" /> {restaurant.rating}</p><small className="text-[10px] text-neutral-400">Rating</small></div>
          <div><p className="text-sm font-extrabold" data-testid="restaurant-detail-eta">{restaurant.eta}</p><small className="text-[10px] text-neutral-400">Delivery</small></div>
          <div><p className="text-sm font-extrabold">₹350</p><small className="text-[10px] text-neutral-400">For two</small></div>
        </div>
      </section>

      <section className="px-5 pt-8" data-testid="restaurant-menu-section">
        <div className="mb-2"><p className="text-[11px] font-bold uppercase tracking-[.14em] text-neutral-400">Full menu</p><h2 className="mt-1 text-xl font-extrabold">Recommended</h2></div>
        <div>
          {restaurant.dishes.map((dish) => {
            const quantity = cart.find((line) => line.dishId === dish.id)?.quantity ?? 0;
            return <article key={dish.id} className="grid grid-cols-[1fr_7rem] gap-5 border-b border-neutral-100 py-6" data-testid={`dish-card-${dish.id}`}>
              <div className="min-w-0 py-1">
                <p className={`mb-2 inline-flex h-4 w-4 items-center justify-center border ${dish.veg ? "border-green-600" : "border-red-700"}`}><span className={`h-2 w-2 rounded-full ${dish.veg ? "bg-green-600" : "bg-red-700"}`} /></p>
                <h3 className="text-[16px] font-extrabold" data-testid={`dish-name-${dish.id}`}>{dish.name}</h3>
                <p className="mt-1 font-bold" data-testid={`dish-price-${dish.id}`}>₹{dish.price}</p>
                <p className="mt-1 flex items-center gap-1 text-xs font-bold text-savings"><Star size={11} fill="currentColor" /> {dish.rating}</p>
                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-neutral-500">{dish.description}</p>
              </div>
              <div className="relative self-start pb-4">
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-neutral-100"><Image src={dish.image} alt={dish.name} fill sizes="112px" className="object-cover" /></div>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2"><QuantityStepper quantity={quantity} onAdd={() => addItem(restaurant.id, dish.id)} onRemove={() => removeItem(restaurant.id, dish.id)} testId={`dish-${dish.id}`} /></div>
              </div>
            </article>;
          })}
        </div>
        <p className="mt-6 flex items-center justify-center gap-2 text-xs text-neutral-400"><Leaf size={14} /> Fictional restaurant. Demo ordering only.</p>
      </section>
      <StickyCartBar />
    </main>
  );
}
