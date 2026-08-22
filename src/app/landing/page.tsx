import Link from "next/link";
import { Check } from "lucide-react";

const valueProps = [
  {
    icon: "🎭",
    title: "Fake the ritual",
    body: "Browse the menu, choose your dishes, and run the whole ordering flow — the same taps, the same decisions, none of the spend.",
  },
  {
    icon: "🧾",
    title: "Keep the full bill",
    body: "The entire ₹ bill stays in your pocket. Whatever you would have spent on delivery, you keep — every single time.",
  },
  {
    icon: "📉",
    title: "Real savings",
    body: "No discounts, no coupets, no hidden math. What you don't spend is what you save. Real money, kept real.",
  },
  {
    icon: "🚫",
    title: "Zero real orders",
    body: "Every order here is only a demo. No real money, no real delivery. The food never arrives — but the savings do.",
  },
];

const steps = [
  {
    number: "01",
    title: "Browse",
    body: "Scroll the menu like you normally would. Pick what catches your eye, same as any hungry night.",
  },
  {
    number: "02",
    title: "Add to cart",
    body: "Fill your cart with the dishes you would have ordered. The full bill adds up — just like the real thing.",
  },
  {
    number: "03",
    title: "Fake deliver & save",
    body: "Hit the fake delivery button. Watch the savings appear instead of a rider. That ₹ amount? Yours to keep.",
  },
];

export default function LandingPage() {
  return (
    <main className="mx-auto max-w-[28rem] px-5 text-charcoal" data-testid="landing-page">
      {/* ===== Nav (minimal) ===== */}
      <nav className="flex items-center justify-between pt-6" data-testid="landing-nav">
        <Link href="/" className="grid h-10 w-10 place-items-center rounded-xl bg-mango font-[Manrope] text-[11px] font-extrabold tracking-tight text-charcoal">
          OTFNA
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-1 rounded-full border border-mango/30 bg-mango/10 px-4 py-2 text-xs font-bold text-amber-800 transition-[background-color] hover:bg-mango hover:text-charcoal"
          data-testid="landing-nav-cta"
        >
          Try the app
        </Link>
      </nav>

      {/* ===== Hero ===== */}
      <section className="mt-10" data-testid="landing-hero">
        <div className="relative overflow-hidden rounded-[1.6rem] bg-canvas p-6 shadow-card">
          <div className="absolute -right-10 -top-12 h-36 w-36 rounded-full bg-mango/40 blur-3xl" />
          <div className="relative">
            <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[.15em] text-mango">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-mango text-charcoal text-[10px]">✦</span>
              Only The Food. Never Arrives.
            </p>
            <h1 className="mt-5 text-2xl font-extrabold leading-[1.12] tracking-tight">
              Fake the food-delivery ritual.{" "}
              <span className="text-mango">Keep the whole bill.</span>
            </h1>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-neutral-600">
              Browse the menu, fill your cart, fake the delivery — and keep the ₹ you would have spent. Every order here is only a demo. No real money. No real delivery. Real savings.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/"
                className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-mango px-5 text-sm font-extrabold text-charcoal shadow-[0_6px_0_0_mango] transition-transform active:scale-[.98]"
                data-testid="hero-cta-primary"
              >
                Start saving
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="#how-it-works"
                className="flex h-11 items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-5 text-sm font-bold text-neutral-700 transition-[border-color,background-color] hover:border-neutral-400 hover:bg-neutral-50"
                data-testid="hero-cta-secondary"
              >
                See how it works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Social proof / ethos strip ===== */}
      <section className="mt-8 rounded-[1.2rem] border border-mango/20 bg-[#FFF8DE] p-5" data-testid="landing-ethos">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 grid h-9 w-9 place-items-center shrink-0 rounded-full bg-mango text-charcoal text-lg">✓</span>
          <div>
            <p className="text-sm font-bold text-neutral-800">Every order here is only a demo.</p>
            <p className="mt-1 text-sm text-neutral-600">No real money, no real delivery, real savings. The food never arrives — but the money you would have spent? That stays with you.</p>
          </div>
        </div>
      </section>

      {/* ===== Value props ===== */}
      <section className="mt-10" data-testid="landing-value-props">
        <h2 className="text-center text-lg font-extrabold tracking-tight">Why fake the delivery?</h2>
        <p className="mt-2 text-center text-sm text-neutral-500">Same craving. Same ritual. None of the bill.</p>
        <div className="mt-6 grid gap-4">
          {valueProps.map((vp, index) => (
            <div
              key={vp.title}
              className="group relative overflow-hidden rounded-[1.4rem] bg-white p-5 shadow-card transition-[box-shadow] hover:shadow-lift"
              style={{ animationDelay: `${index * 80}ms` }}
              data-testid={`value-prop-card-${index}`}
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-mango/15 text-2xl">{vp.icon}</span>
              <h3 className="mt-3 text-base font-extrabold">{vp.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">{vp.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== How it works ===== */}
      <section id="how-it-works" className="mt-12" data-testid="landing-how-it-works">
        <h2 className="text-center text-lg font-extrabold tracking-tight">How it works</h2>
        <p className="mt-2 text-center text-sm text-neutral-500">Three taps. One fake delivery. ₹ saved.</p>
        <div className="mt-6 space-y-5">
          {steps.map((step, index) => (
            <div key={step.number} className="flex gap-4" data-testid={`how-step-${index}`}>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-mango text-charcoal font-extrabold text-sm tracking-wide">
                {step.number}
              </span>
              <div>
                <h3 className="text-base font-extrabold">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-neutral-600">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Final CTA ===== */}
      <section className="mt-12 mb-10" data-testid="landing-final-cta">
        <div className="rounded-[1.6rem] bg-charcoal px-6 py-8 text-white shadow-card">
          <h2 className="text-xl font-extrabold tracking-tight text-white">Your next ₹ delivery is free.</h2>
          <p className="mt-2 text-sm leading-relaxed text-white/70">
            Keep the whole bill. Fake the ritual. Real savings, every time — with zero real orders.
          </p>
          <div className="mt-6">
            <Link
              href="/"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-mango px-5 text-sm font-extrabold text-charcoal shadow-[0_6px_0_0_#e6a800] transition-transform active:scale-[.98]"
              data-testid="final-cta-button"
            >
              Start saving now
              <span aria-hidden>→</span>
            </Link>
          </div>
          <p className="mt-4 text-center text-[11px] text-white/50">
            No signup required. No real money. Just the ritual — and the savings.
          </p>
        </div>
      </section>
    </main>
  );
}
