"use client";

import Link from "next/link";
import { Check, ChevronRight, Clock3, Sparkles, TicketPercent } from "lucide-react";
import { toast } from "sonner";
import { AppHeader } from "@/components/app-header";
import { BillBreakdown } from "@/components/bill-breakdown";
import { QuantityStepper } from "@/components/quantity-stepper";
import { useOrder } from "@/context/order-context";
import { getRestaurant } from "@/data/catalog";
import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";
import { getOfferTimer, saveOfferTimer } from "@/lib/storage";

const OFFER_DURATION_MS = 15 * 60 * 1000; // 15 minutes

export default function CartPage() {
  const { cart, bill, couponApplied, mode, setMode, addItem, removeItem, applyCoupon } = useOrder();
  const restaurant = getRestaurant(cart[0]?.restaurantId);
  const [offerTimer, setOfferTimer] = useState({ endTime: 0, expired: false });
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    track("cart_viewed", { item_count: cart.reduce((sum, line) => sum + line.quantity, 0) });
  }, []);

  useEffect(() => {
    const timer = getOfferTimer();
    if (timer.endTime === 0 || timer.expired) {
      // Start a new timer
      const newEndTime = Date.now() + OFFER_DURATION_MS;
      const newState = { endTime: newEndTime, expired: false };
      saveOfferTimer(newState);
      setOfferTimer(newState);
    } else {
      setOfferTimer(timer);
    }
  }, []);

  useEffect(() => {
      if (offerTimer.endTime === 0) return;
      const interval = setInterval(() => {
        setNow(Date.now());
        const remaining = offerTimer.endTime - Date.now();
        if (remaining <= 0) {
          const expiredState = { endTime: offerTimer.endTime, expired: true };
          saveOfferTimer(expiredState);
          setOfferTimer(expiredState);
        }
      }, 1000);
      return () => clearInterval(interval);
    }, [offerTimer.endTime]);

  if (!cart.length || !restaurant) return <main className="min-h-screen bg-white" data-testid="empty-cart-page"><AppHeader backHref="/" title="Your cart" compact /><div className="grid min-h-[70vh] place-items-center p-8 text-center"><div><span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-amber-50 text-mango"><Sparkles size={26} /></span><h1 className="mt-5 text-2xl font-extrabold">Your cart is taking it easy.</h1><p className="mt-2 text-sm text-neutral-500">Add something you nearly wanted.</p><Link href="/" className="mt-6 inline-flex rounded-xl bg-charcoal px-5 py-3 text-sm font-bold text-white" data-testid="empty-cart-browse-link">Browse restaurants</Link></div></div></main>;

  const remaining = offerTimer.endTime > 0 ? Math.max(0, offerTimer.endTime - now) : 0;
  const hours = Math.floor(remaining / 3600000);
  const minutes = Math.floor((remaining % 3600000) / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);
  const formatted = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return (
    <main className="min-h-screen bg-canvas pb-28" data-testid="cart-page">
      <AppHeader backHref={`/restaurant/${restaurant.id}`} title="Your cart" compact />
      <div className="page-enter space-y-4 px-4 py-5">
        <section className="rounded-2xl bg-white p-5 shadow-card" data-testid="cart-items-section">
          <p className="text-[11px] font-bold uppercase tracking-[.14em] text-neutral-400">From</p><h1 className="mt-1 text-xl font-extrabold" data-testid="cart-restaurant-name">{restaurant.name}</h1>
          <div className="mt-5 space-y-4">
            {cart.map((line) => {
              const item = restaurant.dishes.find((dish) => dish.id === line.dishId)!;
              return <div key={line.dishId} className="flex items-center justify-between gap-3" data-testid={`cart-line-${line.dishId}`}><div className="min-w-0"><p className="truncate text-sm font-bold">{item.name}</p><p className="mt-0.5 text-xs text-neutral-500">₹{item.price * line.quantity}</p></div><QuantityStepper quantity={line.quantity} onAdd={() => addItem(line.restaurantId, line.dishId)} onRemove={() => removeItem(line.restaurantId, line.dishId)} testId={`cart-${line.dishId}`} /></div>;
            })}
          </div>
        </section>

        <section className="rounded-2xl bg-white p-5 shadow-card" data-testid="coupon-section">
          <button type="button" onClick={() => { applyCoupon(); toast.success("NOTREAL applied — simulated discount added."); }} disabled={couponApplied} className="flex w-full items-center justify-between text-left disabled:cursor-default" data-testid="apply-coupon-button">
            <span className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-50 text-amber-700"><TicketPercent size={19} /></span><span><strong className="block text-sm">{couponApplied ? "NOTREAL applied" : "Apply NOTREAL"}</strong><small className="text-neutral-400">Save up to ₹100 on this demo bill</small></span></span>
            {couponApplied ? <Check className="text-savings" size={20} /> : <ChevronRight size={18} className="text-neutral-400" />}
          </button>
        </section>

        <section className="rounded-2xl bg-white p-5 shadow-card" data-testid="delivery-mode-section">
          <h2 className="text-base font-extrabold">Choose delivery mode</h2><p className="mt-1 text-xs text-neutral-400">Displayed wait, compressed for this simulation.</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {(["vip", "standard"] as const).map((item) => <button key={item} onClick={() => setMode(item)} type="button" className={`rounded-2xl border p-4 text-left transition-[border-color,background-color,transform] active:scale-[.98] ${mode === item ? "border-mango bg-amber-50" : "border-neutral-200 bg-white"}`} data-testid={`delivery-mode-${item}-button`}><Clock3 size={18} className={mode === item ? "text-amber-700" : "text-neutral-400"} /><strong className="mt-3 block text-sm">{item === "vip" ? "VIP Delivery" : "Standard"}</strong><small className="mt-1 block text-neutral-500">{item === "vip" ? "10–15 min" : "45–60 min"}</small><small className="mt-1 block text-[10px] text-neutral-400">Runs {item === "vip" ? "1–2" : "2–3"} min</small></button>)}
          </div>
        </section>
        <BillBreakdown bill={bill} />

                <section className="rounded-2xl bg-white p-5 shadow-card" data-testid="offer-timer-section">
                  {offerTimer.expired ? (
                    <p className="text-sm text-neutral-500" data-testid="offer-timer-expired">Offer expired — check back soon for a new one</p>
                  ) : (
                    <p className="text-sm font-bold text-amber-800" data-testid="offer-timer-active">Limited-time offer: Free delivery on your next order — expires in {formatted}</p>
                  )}
                </section>
              </div>
      <div className="safe-bottom fixed bottom-0 z-30 w-full max-w-[30rem] border-t border-neutral-100 bg-white px-4 pt-3 shadow-[0_-12px_30px_-25px_rgba(0,0,0,.4)]">
        <Link href="/checkout" className="flex h-14 items-center justify-between rounded-2xl bg-charcoal px-5 font-extrabold text-white transition-transform active:scale-[.98]" data-testid="proceed-checkout-link"><span><small className="mr-2 font-medium text-white/50">₹{bill.total}</small> Proceed</span><ChevronRight size={19} /></Link>
      </div>
    </main>
  );
}
