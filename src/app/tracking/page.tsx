"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Circle, Clock3 } from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { DemoDisclosure } from "@/components/demo-disclosure";
import { TrackingMap } from "@/components/tracking-map";
import { useOrder } from "@/context/order-context";
import { track } from "@/lib/analytics";

const states = ["Order placed", "Restaurant confirmed", "Food being prepared", "Delivery partner assigned", "Picked up", "On the way to Home", "Arriving soon", "Delivered"];

export default function TrackingPage() {
  const router = useRouter();
  const { activeOrder, hydrated, completeOrder } = useOrder();
  const [now, setNow] = useState(() => Date.now());
  const started = useRef(false);

  const elapsed = activeOrder ? Math.max(0, (now - new Date(activeOrder.placedAt).getTime()) / 1000) : 0;
  const progress = activeOrder ? Math.min(1, elapsed / activeOrder.durationSeconds) : 0;
  const activeIndex = Math.min(states.length - 1, Math.floor(progress * states.length));
  const remaining = activeOrder ? Math.max(0, Math.ceil(activeOrder.durationSeconds - elapsed)) : 0;
  const remainingLabel = useMemo(() => remaining > 59 ? `${Math.ceil(remaining / 60)} min` : `${remaining} sec`, [remaining]);

  useEffect(() => {
    if (!hydrated) return;
    if (!activeOrder) { router.replace("/"); return; }
    if (!started.current) { track("tracking_started", { mode: activeOrder.mode, duration_seconds: activeOrder.durationSeconds }); started.current = true; }
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [activeOrder, hydrated, router]);

  useEffect(() => {
    if (!activeOrder || progress < 1) return;
    completeOrder();
    track("tracking_completed", { mode: activeOrder.mode });
    const timer = window.setTimeout(() => router.replace("/delivered"), 700);
    return () => window.clearTimeout(timer);
  }, [progress, activeOrder, completeOrder, router]);

  if (!activeOrder) return <main className="min-h-screen bg-white" data-testid="tracking-loading-page" />;

  return (
    <main className="min-h-screen bg-white pb-10" data-testid="tracking-page">
      <AppHeader title="Live tracking" compact />
      <div className="page-enter px-5 py-5">
        <DemoDisclosure compact />
        <section className="mt-5" data-testid="tracking-status-section">
          <div className="flex items-end justify-between gap-4">
            <div><p className="text-[11px] font-bold uppercase tracking-[.14em] text-neutral-400">{activeOrder.mode === "vip" ? "VIP Delivery" : "Standard Delivery"}</p><h1 className="mt-1 text-2xl font-extrabold" data-testid="tracking-current-status">{states[activeIndex]}</h1></div>
            <div className="rounded-xl bg-amber-50 px-3 py-2 text-right"><p className="flex items-center gap-1 text-[10px] font-bold uppercase text-amber-800"><Clock3 size={11} /> Simulated</p><strong className="text-sm" data-testid="tracking-time-remaining">{remainingLabel}</strong></div>
          </div>
          <div className="mt-5"><TrackingMap progress={progress} /></div>
        </section>

        <section className="mt-8 rounded-2xl border border-black/[.06] p-5" data-testid="tracking-timeline">
          <h2 className="text-base font-extrabold">Order journey</h2>
          <div className="mt-5 space-y-0">
            {states.map((state, index) => {
              const done = index < activeIndex || progress >= 1;
              const current = index === activeIndex && progress < 1;
              return <div key={state} className="relative flex gap-3 pb-5 last:pb-0" data-testid={`tracking-state-${index}`}>
                {index < states.length - 1 && <span className={`absolute left-[9px] top-5 h-full w-px ${done ? "bg-savings" : "bg-neutral-200"}`} />}
                <span className={`relative z-10 grid h-5 w-5 shrink-0 place-items-center rounded-full ${done ? "bg-savings text-white" : current ? "animate-pulse-soft bg-mango text-charcoal" : "bg-white text-neutral-300"}`}>{done ? <Check size={12} /> : <Circle size={10} fill="currentColor" />}</span>
                <p className={`text-sm ${done || current ? "font-bold text-charcoal" : "text-neutral-400"}`}>{state}</p>
              </div>;
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
