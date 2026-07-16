# OTFNA — Only The Food Never Arrives

A mobile-first, India-only **fake food-ordering web app**. It recreates the full ordering ritual of apps like Swiggy/Zomato — browse → cart → checkout → live tracking → "delivered" — but no order is real, no money is charged, and no food arrives. Instead, you see **how much you saved**.

> **The bet:** if the *ritual* delivers most of the dopamine, a high-fidelity fake flow can satisfy the ordering urge safely — helping users break the habit gradually instead of quitting cold.

## Status

Planning locked · pre-build. This repo currently holds the **build spec** (the app itself is not scaffolded yet).

## The build spec

| File | What it holds |
|------|---------------|
| **[`final_plan.md`](./final_plan.md)** | Strategy — vision, hypotheses (H1–H3), target user, scope (v1/v2/v3), tech stack, analytics, mechanics, build phases, KPIs, how we prove H1, risks, launch. |
| **[`design.md`](./design.md)** | UI — brand system, the 8 core screens, components, delivery modes, share card, 10-restaurant catalog, home-food alternatives, copy/tone rules. |
| **[`SWIGGY-UI-REFERENCE.md`](./SWIGGY-UI-REFERENCE.md)** | Real-app UX **patterns** to echo (never copy) + OTFNA inversion notes. |

Start with `final_plan.md`, then `design.md`. `SWIGGY-UI-REFERENCE.md` is pattern reference only.

## Tech stack

Next.js · TypeScript · Tailwind CSS · custom components (shadcn/ui for primitives only) · Framer Motion · localStorage (no backend/accounts for MVP) · Vercel + GitHub CI/CD · PostHog + Vercel Web Analytics.

## v1 scope (core loop)

Browse fictional restaurants → add to cart → checkout (demo-disclosed, no real payment) → **VIP** (10–15 min shown / 1–2 min real) or **Standard** (45–60 / 2–3) fake tracking on an abstract A→B map → "Delivered" → savings receipt + home-food suggestion + share card.

Delight extras (spin-the-wheel, streaks, sound) are deferred to v2 until the core hypothesis validates.

## Building with an LLM (v0 / Cursor / Claude)

Point the tool at this repo (or paste the three spec files) and instruct:

> Build the OTFNA MVP per `final_plan.md` (scope/tech/mechanics) and `design.md` (brand/screens/catalog/copy). Use `SWIGGY-UI-REFERENCE.md` for UX **patterns** only — original colors/copy/assets, never a Swiggy clone. v1 scope only. **Build with npm** (not pnpm).

## Legal

Original brand, colors, copy, and assets. Fictional restaurants and menus. Not affiliated with Swiggy, Zomato, or any food-delivery company. Every order is a clearly-disclosed demo — no real payment is ever collected.
