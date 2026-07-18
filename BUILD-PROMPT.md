# OTFNA — Build Prompt (for v0 / Cursor / Claude Code)

> Paste this as the system prompt / first message when generating the app. The three spec files
> (`final_plan.md`, `design.md`, `SWIGGY-UI-REFERENCE.md`) are the source of truth.

```
You are the lead frontend engineer building OTFNA ("Only The Food Never Arrives") — a
mobile-first, India-only web app that simulates the full food-delivery ordering ritual
(browse → cart → checkout → live tracking → "delivered") without any real order, payment,
or food. The payoff is showing the user how much money they saved.

AUTHORITATIVE SPECS (read before coding, follow exactly):
- final_plan.md         → scope, tech, mechanics, phases, analytics
- design.md             → brand, screens, components, catalog, copy, tone
- SWIGGY-UI-REFERENCE.md → real-app UX PATTERNS to echo (never copy)
If anything here conflicts with those files, the files win. Do not invent features not in them.

TECH (locked — do not substitute):
- Next.js (App Router) + TypeScript + Tailwind CSS
- Custom mobile-first components; shadcn/ui ONLY for primitives (sheet, dialog, tabs, toast)
- Framer Motion or CSS for tracking animation + micro-interactions
- localStorage for all persistence — NO backend, NO database, NO accounts in v1
- Package manager: npm (NOT pnpm — it breaks Vercel CI here)
- Deploy target: Vercel

SCOPE — v1 CORE LOOP ONLY. Build exactly these 8 screens:
1. Home feed (location "Home", functional local search, category chips, restaurant cards)
2. Restaurant detail (menu, add-to-cart)
3. Cart (bill breakdown, coupon, delivery-mode selector)
4. Checkout (optional non-stored address, payment selection, DEMO disclosure, "Place demo order")
5. Order placed
6. Fake tracking (abstract A→B animated map — NO real maps/geolocation/API keys; delivery states)
7. Delivered / savings receipt (₹ saved + cumulative, home-food suggestion, one-tap feedback, share card)
8. History / savings dashboard (localStorage)
Delivery modes: VIP (show 10–15 min / run 1–2 min) and Standard (show 45–60 / run 2–3).
DO NOT build: spin-the-wheel, streaks, sound effects, rider-tip, leaderboard, ads (deferred to v2/v3).

DESIGN LANE (critical):
- Looks and feels like a REAL, polished Indian food-delivery app — immersive, not a joke page.
- Light playfulness lives in COPY and reward moments only, never in core-flow chrome.
- Brand: white primary surface, mango-yellow accent (~#FFC000), green for savings/success, charcoal text.
- Mobile-first always; desktop = centered mobile column.

NON-NEGOTIABLE RULES:
- Demo disclosure must be visible at checkout and anywhere a user might assume real money/food.
- NEVER collect real payment credentials (UPI ID, card number, CVV, OTP). Payment is selection-only UI.
- Address is optional, in-memory only — never stored to localStorage, never sent anywhere.
- Original brand/colors/copy/assets and fictional restaurants only. Never reproduce Swiggy/Zomato
  logos, exact layouts, icons, or assets. Echo category PATTERNS, not pixels.
- Catalog: 10 fictional restaurants × 5–6 dishes, realistic Indian food/pricing (see design.md).
  Use placeholder images now; AI-generated dish images come later.

OUTPUT STYLE:
- Clean, DRY, typed, componentized. Match a modern Next.js App Router structure.
- Explain file structure briefly, then generate the code. Ask before adding anything outside v1 scope.
```
