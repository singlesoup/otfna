"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, Home, ThumbsDown, ThumbsUp, Wallet } from "lucide-react";
import { ShareCard } from "@/components/share-card";
import { useOrder } from "@/context/order-context";
import { track } from "@/lib/analytics";

const suggestions: Record<string, string> = {
  Biryani: "Check the fridge for leftovers — or a quick bowl of curd rice hits the same comfort note.",
  "North Indian": "Check the fridge for leftovers — dal chawal or curd rice brings the same comfort.",
  "South Indian": "A warm bowl of upma or curd rice can land the same comfort without the wait.",
  Pizza: "Craving savoury? Hot cheese-butter toast or a 2-minute bowl of Maggi does the job.",
  Burgers: "Craving savoury? Hot cheese-butter toast or a 2-minute bowl of Maggi does the job.",
  Cafe: "Bun maska, an omelette or a grilled sandwich can settle this one fast.",
  Chinese: "Your body wants savoury fuel — try 5-minute veg poha or warm oats.",
  Rolls: "An egg roll or paneer wrap at home gets you most of the way there.",
  Healthy: "Your body wants savoury fuel — try warm oats, eggs or a quick poha.",
  Desserts: "Sugar cravings often fade in 10 minutes. Have water first, or grab a fresh fruit.",
};

export default function DeliveredPage() {
  const router = useRouter();
  const { activeOrder, history, hydrated, recordFeedback } = useOrder();
  const [feedback, setFeedback] = useState<"yes" | "no" | undefined>(activeOrder?.feedback);
  const totalSaved = useMemo(() => history.reduce((sum, order) => sum + order.bill.total, 0), [history]);

  useEffect(() => {
    if (!hydrated) return;
    if (!activeOrder?.completedAt) { router.replace(activeOrder ? "/tracking" : "/"); return; }
    track("savings_shown", { order_total: activeOrder.bill.total, cumulative_total: totalSaved });
    track("home_food_suggestion_shown", { category: activeOrder.category });
  }, [activeOrder, hydrated, router, totalSaved]);

  if (!activeOrder?.completedAt) return <main className="min-h-screen bg-white" data-testid="delivered-loading-page" />;
  const respond = (value: "yes" | "no") => { setFeedback(value); recordFeedback(value); };

  return (
    <main className="min-h-screen bg-[#F8F7F2] pb-10" data-testid="delivered-page">
      <section className="relative overflow-hidden bg-charcoal px-6 pb-10 pt-12 text-white" data-testid="savings-receipt-hero">
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-mango/20 blur-3xl" />
        <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-savings text-white"><Check size={29} strokeWidth={3} /></span>
        <p className="relative mt-8 text-[11px] font-bold uppercase tracking-[.17em] text-mango">Demo delivered</p>
        <h1 className="relative mt-2 text-4xl font-extrabold leading-[1.04] tracking-tight" data-testid="delivered-heading">Fake delivered.<br />Real money saved.</h1>
        <p className="relative mt-4 max-w-xs text-sm leading-relaxed text-white/55">No food moved. No payment happened. Your wallet just exhaled.</p>
      </section>

      <div className="page-enter -mt-3 space-y-4 px-4">
        <section className="rounded-[1.6rem] bg-white p-6 shadow-lift" data-testid="savings-summary-card">
          <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[.12em] text-neutral-400">Saved this order</p><p className="mt-2 text-5xl font-extrabold tracking-[-.05em] text-savings" data-testid="order-savings-amount">₹{activeOrder.bill.total}</p></div><Wallet className="text-mango" size={30} /></div>
          <div className="mt-6 flex items-center justify-between border-t border-dashed border-neutral-200 pt-4"><span className="text-sm text-neutral-500">Cumulative local savings</span><strong className="text-lg text-savings" data-testid="cumulative-savings-amount">₹{totalSaved}</strong></div>
        </section>

        <section className="rounded-[1.6rem] border border-mango/25 bg-[#FFF8DE] p-5" data-testid="home-food-suggestion-card">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-mango text-charcoal"><Home size={19} /></span>
          <p className="mt-4 text-[11px] font-bold uppercase tracking-[.13em] text-amber-800">The easy exit ramp</p>
          <h2 className="mt-1 text-lg font-extrabold">Still actually hungry?</h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600" data-testid="home-food-suggestion-text">{suggestions[activeOrder.category] ?? suggestions.Cafe}</p>
        </section>

        <section className="rounded-[1.6rem] bg-white p-5 shadow-card" data-testid="feedback-section">
          <h2 className="text-base font-extrabold">Did this help you skip a real order?</h2>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button onClick={() => respond("yes")} type="button" className={`flex h-12 items-center justify-center gap-2 rounded-xl border text-sm font-bold transition-[background-color,border-color,transform] active:scale-[.97] ${feedback === "yes" ? "border-savings bg-green-50 text-savings" : "border-neutral-200"}`} data-testid="feedback-yes-button"><ThumbsUp size={17} /> Yes</button>
            <button onClick={() => respond("no")} type="button" className={`flex h-12 items-center justify-center gap-2 rounded-xl border text-sm font-bold transition-[background-color,border-color,transform] active:scale-[.97] ${feedback === "no" ? "border-charcoal bg-neutral-100" : "border-neutral-200"}`} data-testid="feedback-no-button"><ThumbsDown size={17} /> Not really</button>
          </div>
          {feedback && <p className="mt-3 text-center text-xs text-neutral-500" data-testid="feedback-confirmation">Thanks — that honest tap helps us learn.</p>}
        </section>
        <ShareCard amount={activeOrder.bill.total} />
        <div className="grid grid-cols-2 gap-3 pb-2">
          <Link href="/history" className="flex h-12 items-center justify-center rounded-xl border border-neutral-200 bg-white text-sm font-bold" data-testid="view-history-link">View history</Link>
          <Link href="/" className="flex h-12 items-center justify-center gap-2 rounded-xl bg-charcoal text-sm font-bold text-white" data-testid="order-again-link">Browse again <ArrowRight size={16} /></Link>
        </div>
      </div>
    </main>
  );
}
