"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Banknote, CreditCard, MapPin, Smartphone, WalletCards } from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { BillBreakdown } from "@/components/bill-breakdown";
import { DemoDisclosure } from "@/components/demo-disclosure";
import { useOrder } from "@/context/order-context";
import { PaymentMethod, HungerLevel } from "@/lib/types";
import { track } from "@/lib/analytics";

const methods: { name: PaymentMethod; icon: typeof Smartphone }[] = [{ name: "UPI", icon: Smartphone }, { name: "Card", icon: CreditCard }, { name: "COD", icon: Banknote }, { name: "Wallet", icon: WalletCards }];

const HUNGER_LABELS: Record<HungerLevel, string> = {
  0: "Not hungry at all",
  1: "A little peckish",
  2: "Mildly hungry",
  3: "Moderately hungry",
  4: "Very hungry",
  5: "Starving",
};

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, bill, placeOrder, hunger, setHunger } = useOrder();
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState<PaymentMethod>("UPI");
  useEffect(() => { track("checkout_started", { total: bill.total }); }, []);

  const submit = () => { const order = placeOrder(payment); if (order) router.push("/order-placed"); };
  if (!cart.length) return <main className="min-h-screen bg-white" data-testid="checkout-empty-page"><AppHeader backHref="/" title="Checkout" compact /><div className="p-8 text-center"><h1 className="text-2xl font-extrabold">There&apos;s no demo order to place.</h1></div></main>;

  return (
    <main className="min-h-screen bg-canvas pb-28" data-testid="checkout-page">
      <AppHeader backHref="/cart" title="Checkout" compact />
      <div className="page-enter space-y-4 px-4 py-5">
        <section className="rounded-2xl bg-white p-5 shadow-card" data-testid="optional-address-section">
          <div className="flex items-center gap-2"><MapPin size={19} className="text-amber-700" /><h1 className="text-base font-extrabold">Delivery address <span className="font-medium text-neutral-400">(optional)</span></h1></div>
          <textarea value={address} onChange={(event) => setAddress(event.target.value)} rows={3} placeholder="Add an address for demo realism" className="mt-4 w-full resize-none rounded-xl border border-neutral-200 bg-neutral-50 p-3 text-sm outline-none transition-[border-color,box-shadow] focus:border-mango focus:ring-4 focus:ring-mango/10" data-testid="optional-address-input" />
          <p className="mt-2 text-[11px] leading-relaxed text-neutral-400" data-testid="address-privacy-note">Optional, for demo realism. We never store, send, or use this. It disappears when you leave this screen.</p>
        </section>

        <section className="rounded-2xl bg-white p-5 shadow-card" data-testid="payment-selection-section">
          <h2 className="text-base font-extrabold">Select payment method</h2><p className="mt-1 text-xs text-neutral-400">Selection only — no credentials will be requested.</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {methods.map(({ name, icon: Icon }) => <button type="button" key={name} onClick={() => setPayment(name)} className={`flex items-center gap-3 rounded-xl border p-3 text-sm font-bold transition-[border-color,background-color,transform] active:scale-[.98] ${payment === name ? "border-mango bg-amber-50" : "border-neutral-200"}`} data-testid={`payment-method-${name.toLowerCase()}-button`}><Icon size={18} className={payment === name ? "text-amber-700" : "text-neutral-400"} /> {name}<span className={`ml-auto h-3 w-3 rounded-full border ${payment === name ? "border-[3px] border-mango bg-white" : "border-neutral-300"}`} /></button>)}
          </div>
        </section>
        <DemoDisclosure />
        <BillBreakdown bill={bill} />

        <section className="rounded-2xl bg-white p-5 shadow-card" data-testid="hunger-picker-section">
          <h2 className="text-base font-extrabold">How hungry are you?</h2>
          <div className="mt-4 flex gap-2">
            {Array.from({ length: 6 }, (_, i) => i).map((n) => (
              <button key={n} type="button" onClick={() => setHunger(n)} className={`flex h-12 w-12 items-center justify-center rounded-full text-lg font-extrabold transition-[border-color,background-color] ${hunger === n ? "border-4 border-mango bg-amber-50 text-amber-800" : "border-neutral-200 bg-white text-neutral-500"}`} data-testid={`hunger-option-${n}`}>{n}</button>
            ))}
          </div>
          <p className="mt-3 text-xs text-neutral-500">
            {hunger === 0 && "Not hungry at all"} {hunger === 1 && "A little peckish"} {hunger === 2 && "Mildly hungry"} {hunger === 3 && "Moderately hungry"} {hunger === 4 && "Very hungry"} {hunger === 5 && "Starving"}
          </p>
        </section>
      </div>
      <div className="safe-bottom fixed bottom-0 z-30 w-full max-w-[30rem] border-t border-neutral-100 bg-white px-4 pt-3">
        <button onClick={submit} type="button" className="h-14 w-full rounded-2xl bg-charcoal text-sm font-extrabold text-white transition-[transform,background-color] hover:bg-black active:scale-[.98]" data-testid="place-demo-order-button">Place demo order · ₹{bill.total}</button>
      </div>
    </main>
  );
}
