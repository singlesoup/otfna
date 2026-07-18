"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Check, LoaderCircle } from "lucide-react";
import { DemoDisclosure } from "@/components/demo-disclosure";
import { useOrder } from "@/context/order-context";

export default function OrderPlacedPage() {
  const router = useRouter();
  const { activeOrder, hydrated } = useOrder();
  useEffect(() => {
    if (!hydrated) return;
    if (!activeOrder) { router.replace("/"); return; }
    const timer = window.setTimeout(() => router.replace("/tracking"), 2200);
    return () => window.clearTimeout(timer);
  }, [activeOrder, hydrated, router]);

  return (
    <main className="grid min-h-screen place-items-center bg-white px-6" data-testid="order-placed-page">
      <div className="w-full max-w-sm text-center">
        <div className="relative mx-auto grid h-24 w-24 place-items-center rounded-[2rem] bg-green-50 text-savings"><span className="absolute inset-0 animate-ping rounded-[2rem] border border-green-200" /><Check size={40} strokeWidth={3} /></div>
        <p className="mt-8 text-[11px] font-bold uppercase tracking-[.16em] text-neutral-400">Demo confirmed</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight" data-testid="order-placed-heading">Order placed</h1>
        <p className="mt-3 text-sm leading-relaxed text-neutral-500">{activeOrder?.restaurantName ?? "Your restaurant"} is now pretending very professionally.</p>
        <div className="mx-auto mt-6 flex w-fit items-center gap-2 text-xs font-bold text-neutral-500"><LoaderCircle className="animate-spin" size={15} /> Opening live tracking</div>
        <div className="mt-9 text-left"><DemoDisclosure compact /></div>
      </div>
    </main>
  );
}
