"use client";

import Link from "next/link";
import { ArrowRight, CalendarDays, PiggyBank, ReceiptText } from "lucide-react";
import { GoalProgress } from "@/components/goal-progress";
import { AppHeader } from "@/components/app-header";
import { BottomNav } from "@/components/bottom-nav";
import { useOrder } from "@/context/order-context";

export default function HistoryPage() {
  const { history, hydrated } = useOrder();
  const total = history.reduce((sum, order) => sum + order.bill.total, 0);
  return (
    <main className="min-h-screen bg-canvas pb-28" data-testid="history-page">
      <AppHeader backHref="/" title="Savings history" compact />
      <div className="page-enter px-4 py-5">
        <section className="relative overflow-hidden rounded-[1.7rem] bg-charcoal p-6 text-white" data-testid="history-summary-card">
          <div className="absolute -right-12 -top-14 h-40 w-40 rounded-full bg-mango/20 blur-2xl" />
          <PiggyBank className="relative text-mango" size={28} />
          <p className="relative mt-8 text-xs font-bold uppercase tracking-[.14em] text-white/45">Total money not spent</p>
          <p className="relative mt-2 text-5xl font-extrabold tracking-[-.05em] text-mango" data-testid="history-total-saved">₹{total}</p>
          <div className="relative mt-6 flex gap-8 border-t border-white/10 pt-4"><div><strong className="text-xl" data-testid="history-order-count">{history.length}</strong><p className="text-xs text-white/45">Demo orders</p></div><div><strong className="text-xl">₹{history.length ? Math.round(total / history.length) : 0}</strong><p className="text-xs text-white/45">Average saved</p></div></div>
        </section>

        <GoalProgress />

        <section className="mt-8" data-testid="history-list-section">
          <div className="mb-4 flex items-center justify-between"><div><p className="text-[11px] font-bold uppercase tracking-[.14em] text-neutral-400">On this device</p><h1 className="mt-1 text-xl font-extrabold">Your demo orders</h1></div><ReceiptText className="text-neutral-300" size={24} /></div>
          {hydrated && !history.length ? <div className="rounded-2xl bg-white px-6 py-12 text-center shadow-card" data-testid="empty-history-state"><CalendarDays className="mx-auto text-neutral-300" size={32} /><h2 className="mt-4 text-lg font-extrabold">No savings yet</h2><p className="mt-2 text-sm text-neutral-500">Complete your first demo order to start the total.</p><Link href="/" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-charcoal px-5 py-3 text-sm font-bold text-white" data-testid="history-browse-link">Browse food <ArrowRight size={15} /></Link></div> : <div className="space-y-3">
            {history.map((order) => <article key={order.id} className="rounded-2xl bg-white p-5 shadow-card" data-testid={`history-order-${order.id}`}><div className="flex items-start justify-between gap-4"><div><h2 className="font-extrabold">{order.restaurantName}</h2><p className="mt-1 text-xs text-neutral-400">{new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short" }).format(new Date(order.completedAt ?? order.placedAt))}</p></div><strong className="text-lg text-savings" data-testid={`history-order-savings-${order.id}`}>₹{order.bill.total}</strong></div><div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-3 text-xs"><span className="rounded-full bg-amber-50 px-2.5 py-1 font-bold text-amber-800">{order.mode === "vip" ? "VIP" : "Standard"}</span><span className="font-semibold text-neutral-400">Fake delivered</span></div></article>)}
          </div>}
        </section>
      </div>
      <BottomNav />
    </main>
  );
}
