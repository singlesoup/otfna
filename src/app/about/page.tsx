"use client";

import Link from "next/link";
import { Check, ArrowRight, Heart, Users, Globe, Leaf } from "lucide-react";

const missionSections = [
  {
    icon: "🎭",
    title: "What OTFNA is",
    body: "OTFNA — Only The Food Never Arrives — is a demo food-ordering app that recreates the full ritual of apps like Swiggy and Zomato without any of the spend. Browse the menu. Choose your dishes. Fill your cart. Fake the delivery. And keep the ₹ you would have spent.",
  },
  {
    icon: "🧾",
    title: "Why it exists",
    body: "Every order on OTFNA is only a demo. No real money is charged. No food is prepared. No delivery is dispatched. But the savings are real — every ₹ you didn't spend is a ₹ you keep. Over time, those saved orders add up to something you can actually put toward a real goal.",
  },
  {
    icon: "🎯",
    title: "The idea",
    body: "The food-delivery ritual is the thing people reach for when they want comfort, celebration, or just a break. OTFNA gives you that ritual — the taps, the choices, the 'order placed' moment — without the bill. Then it shows you what the bill would have been, and what you saved instead.",
  },
];

const steps = [
  { n: "01", title: "Browse", body: "Pick from restaurants and dishes, just like a real ordering app." },
  { n: "02", title: "Cart", body: "Add what you want. See the bill build up." },
  { n: "03", title: "Fake deliver", body: "Place the order. Watch the fake tracking. 'Delivered' without a thing arriving." },
  { n: "04", title: "See savings", body: "The app shows you what you spent — and what you saved. That number is yours." },
];

const valueProps = [
  { icon: "🚫", title: "Zero real orders", body: "No real food is ever ordered, prepared, or delivered." },
  { icon: "💰", title: "Real savings", body: "Every ₹ saved is tracked. See your total grow over time." },
  { icon: "🎯", title: "Goal-based", body: "Pick a savings goal — PS5, iPhone, Bike — and watch your fake orders fund it." },
  { icon: "📱", title: "Mobile-first", body: "Built for the phone. The same taps, the same flow, no desktop needed." },
];

const donateCards = [
  {
    title: "Donate via BMAC",
    body: "Support Bhartiya Muslim Vikas Abhiyan (BMAC) — a community development initiative. Scan the QR or use the details below to contribute.",
    qrLabel: "BMAC Donation",
    qrHint: "Scan to donate via BMAC",
  },
  {
    title: "Donate via GPay",
    body: "Support directly via Google Pay. Scan the QR or send to the UPI ID below.",
    qrLabel: "GPay Donation",
    qrHint: "Scan to donate via GPay",
    upiId: "payme@example.com",
  },
];

const team = [
  { name: "Himanshu Nawalkar", role: "Builder", note: "Mobile engineering → APM → product builder. Building OTFNA as a living experiment in fake-ordering, real-savings." },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-canvas pb-28" data-testid="about-page">
      <div className="safe-top border-b border-black/[.06] bg-white/95 px-5 py-3 backdrop-blur-xl sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <Link href="/" className="grid h-10 w-10 place-items-center rounded-xl bg-mango font-[Manrope] text-[11px] font-extrabold tracking-tight text-charcoal" data-testid="about-logo">OTFNA</Link>
          <Link href="/" className="text-sm font-bold text-neutral-600" data-testid="about-close-link">Close</Link>
        </div>
      </div>

      <section className="page-enter px-5 pt-6">
        <div className="relative overflow-hidden rounded-[1.7rem] bg-charcoal p-6 text-white" data-testid="about-hero">
          <div className="absolute -right-12 -top-14 h-40 w-40 rounded-full bg-mango/20 blur-2xl" />
          <p className="relative text-xs font-bold uppercase tracking-[.14em] text-white/45" data-testid="about-hero-tag">About</p>
          <h1 className="relative mt-2 text-3xl font-extrabold tracking-tight" data-testid="about-hero-title">Only The Food Never Arrives</h1>
          <p className="relative mt-3 max-w-sm text-sm leading-relaxed text-white/75" data-testid="about-hero-sub">A demo food-ordering ritual that keeps the whole bill.</p>
        </div>
      </section>

      <section className="page-enter px-5 pt-6">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-[11px] font-bold uppercase tracking-[.14em] text-neutral-400" data-testid="about-mission-label">Mission</p>
          <Heart className="text-mango" size={16} />
        </div>
        <div className="space-y-4" data-testid="about-mission-sections">
          {missionSections.map((s) => (
            <div key={s.title} className="rounded-2xl bg-white p-5 shadow-card" data-testid={`about-mission-${s.title.replace(/\s/g, '-').toLowerCase()}`}>
              <p className="text-lg font-extrabold" data-testid={`about-mission-title-${s.title.replace(/\s/g, '-').toLowerCase()}`}>{s.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600" data-testid={`about-mission-body-${s.title.replace(/\s/g, '-').toLowerCase()}`}>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="page-enter px-5 pt-6">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-[11px] font-bold uppercase tracking-[.14em] text-neutral-400" data-testid="about-how-label">How it works</p>
          <Leaf className="text-savings" size={16} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2" data-testid="about-steps-grid">
          {steps.map((s) => (
            <div key={s.n} className="relative rounded-2xl bg-white p-5 shadow-card" data-testid={`about-step-${s.n}`}>
              <span className="pointer-events-none absolute -top-2 -left-2 grid h-7 w-7 place-items-center rounded-full bg-mango text-charcoal text-xs font-extrabold">{s.n}</span>
              <h3 className="mt-2 text-lg font-extrabold" data-testid={`about-step-title-${s.n}`}>{s.title}</h3>
              <p className="mt-1 text-sm text-neutral-500" data-testid={`about-step-body-${s.n}`}>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="page-enter px-5 pt-6">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-[11px] font-bold uppercase tracking-[.14em] text-neutral-400" data-testid="about-donate-label">Support the mission</p>
          <Globe className="text-neutral-400" size={16} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2" data-testid="about-donate-grid">
          {donateCards.map((c) => (
            <div key={c.title} className="rounded-2xl bg-white p-5 shadow-card" data-testid={`about-donate-${c.title.replace(/\s/g, '-').toLowerCase()}`}>
              <h3 className="text-lg font-extrabold" data-testid={`about-donate-title-${c.title.replace(/\s/g, '-').toLowerCase()}`}>{c.title}</h3>
              <p className="mt-1 text-sm text-neutral-500" data-testid={`about-donate-body-${c.title.replace(/\s/g, '-').toLowerCase()}`}>{c.body}</p>
              <div className="mt-4 flex flex-col items-center gap-3 rounded-xl bg-neutral-50 p-4" data-testid={`about-donate-qr-${c.title.replace(/\s/g, '-').toLowerCase()}`}>
                <div className="grid h-24 w-24 place-items-center rounded-lg bg-white border border-neutral-200 shadow-card" data-testid={`about-donate-qr-box-${c.title.replace(/\s/g, '-').toLowerCase()}`}>
                  <span className="text-[10px] font-bold text-neutral-400" data-testid={`about-donate-qr-label-${c.title.replace(/\s/g, '-').toLowerCase()}`}>{c.qrLabel}</span>
                </div>
                <p className="text-[11px] font-bold text-neutral-400" data-testid={`about-donate-qr-hint-${c.title.replace(/\s/g, '-').toLowerCase()}`}>{c.qrHint}</p>
                {c.upiId && <p className="text-sm font-extrabold text-savings" data-testid={`about-donate-upi-${c.title.replace(/\s/g, '-').toLowerCase()}`}>{c.upiId}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="page-enter px-5 pt-6 pb-2">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-[11px] font-bold uppercase tracking-[.14em] text-neutral-400" data-testid="about-team-label">Built by</p>
          <Users className="text-neutral-400" size={16} />
        </div>
        <div className="space-y-3" data-testid="about-team-list">
          {team.map((t) => (
            <div key={t.name} className="flex gap-4 rounded-xl bg-white p-4 shadow-card" data-testid={`about-team-${t.name.replace(/\s/g, '-').toLowerCase()}`}>
              <div className="grid h-10 w-10 place-items-center rounded-full bg-mango text-charcoal text-lg font-extrabold" data-testid={`about-team-avatar-${t.name.replace(/\s/g, '-').toLowerCase()}`}>
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="font-extrabold" data-testid={`about-team-name-${t.name.replace(/\s/g, '-').toLowerCase()}`}>{t.name}</p>
                <p className="text-xs text-savings font-bold" data-testid={`about-team-role-${t.name.replace(/\s/g, '-').toLowerCase()}`}>{t.role}</p>
                <p className="mt-1 text-xs text-neutral-500" data-testid={`about-team-note-${t.name.replace(/\s/g, '-').toLowerCase()}`}>{t.note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="page-enter px-5 py-8">
        <div className="rounded-2xl bg-charcoal p-6 text-center text-white" data-testid="about-cta">
          <p className="text-sm font-bold uppercase tracking-[.14em] text-white/45" data-testid="about-cta-tag">Start saving today</p>
          <p className="mt-1 text-xl font-extrabold" data-testid="about-cta-title">Fake the ritual. Keep the bill.</p>
          <Link href="/" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-mango px-6 py-3 text-sm font-bold text-charcoal" data-testid="about-cta-link">
            Start saving <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </main>
  );
}
