# OTFNA — final_plan.md

> **OTFNA — "Only The Food Never Arrives."**
> A mobile-first, India-only fake food-ordering web app that satisfies the psychological ordering loop (browse → cart → checkout → track → "delivered") without real spending, calories, or regret — then shows the user what they saved.
>
> **This file = STRATEGY & PLAN only.** All UI / brand / screen / catalog detail lives in `design.md`. Visual pattern reference lives in `SWIGGY-UI-REFERENCE.md`.
>
> Status: **Planning locked** (consolidated from llm-wiki codex/gemini/kilo/cohere plans + this repo's PRD/validation research). Ready to scaffold.
> Last updated: 2026-07-16

---

## 1. Vision & Problem

Instant food-delivery and quick-commerce apps are engineered to be so frictionless that many users order out of **habit, boredom, stress, or laziness** — not hunger. The result: financial strain, weight gain, and guilt. The addictive payoff isn't only the food; it's the **ritual** — scrolling menus, hunting discounts, adding to cart, placing the order, tracking the rider.

**Problem statement:** Constant use of food-ordering apps has trained users into compulsive ordering, causing financial and health harm.

**The bet:** If the *ritual* delivers most of the dopamine, a high-fidelity **fake** ordering flow can satisfy the urge safely — letting users interrupt the habit gradually instead of quitting cold.

## 2. Core Hypotheses (what we are validating)

- **H1 (CORE):** A fake ordering simulation can replicate enough of the satisfaction of ordering on a real Indian food-delivery app that it **reduces or delays a real order**.
- **H2:** Awareness-driven users will **open OTFNA instead of** a real app when they feel an ordering urge.
- **H3:** Users **return** during future ordering urges (repeat usage within 7 days).

> Honesty note: the core mechanic is already proven abroad — Korea's *FoodNeverArrives* (~300 daily users) and US *FakeEats* show fake simulation *does* scratch the urge. OTFNA's real test is narrower: **does an India-localized, free, immersive version resonate and retain?** So H1 is a *localization + resonance* test, not a from-scratch proof.

## 3. Target User

- **Who:** Young Indian professionals & Gen-Z, **ages 22–35**, Tier-1/2 cities (Bengaluru, Pune, etc.).
- **Behavior:** Frequent Swiggy/Zomato/Zepto/Blinkit orderers who order from boredom, cravings, bland home food, laziness, stress.
- **Pain:** Overspending, weight gain, guilt, reliance on convenience even when home food exists.
- **Device:** Smartphone-first.

## 4. Behavioral Goal & Tone

- **Goal:** *Gradual reduction*, not immediate quitting. Satisfy the urge in a safe dummy environment.
- **Tone:** Feels like a **real, polished, immersive Indian food-delivery app first**, with **light** playfulness — never a joke/satire page, never a preachy budgeting tool. (Lane decision, locked.)
- **Guardrail:** Copy must, wherever natural, make clear this is a **demo order — no real money, no real food** — so no user ever believes real food is coming. Disclosure before commitment; playful reward after completion.
- **Principle:** Make the user smile first; help them change behavior second.

## 5. The Core Loop (what v1 must nail)

```
Ordering urge → open OTFNA → browse fictional restaurants → add to cart
→ apply coupon → checkout (optional address + payment choice + DEMO disclosure)
→ "Place demo order" → fake delivery tracking (VIP or Standard)
→ "Delivered" → savings payoff (₹ saved + cumulative) → home-food suggestion
→ share card → (return another day)
```
Validating THIS loop is the entire point of v1. Everything else waits.

## 6. Scope

### v1 — Core loop (ship this to validate H1–H3)
- Home feed (default location "Home", functional local search, category chips, restaurant cards, offers, ratings, delivery estimates)
- Restaurant detail + menu with add-to-cart
- Cart (bill breakdown, coupon, delivery-mode selector)
- Checkout (optional non-stored address, payment-method selection, demo disclosure, "Place demo order")
- Fake delivery tracking (abstract A→B animated map, delivery states)
- Delivered / savings receipt (₹ saved this order + cumulative local total)
- Category-specific home-food suggestion
- One-tap feedback
- **Share card** (locked into v1 — social-proof engine)
- Local history / savings dashboard (localStorage)
- Analytics wired (PostHog + Vercel)

### v2 — Delight & retention (only after H1 validates)
- Daily streak, confetti celebrations
- Spin-the-wheel meal picker
- Fake rider-tip interaction, sound effects
- Animal-named delivery tiers experiment (Rabbit/Turtle)

### v3 — Growth / accounts
- Accounts + cross-device sync
- Money-saved / fake-orders **leaderboard**
- Public savings wall
- Ads/monetization (post-validation, with strict category blocking that never pushes real ordering)

### Out of scope (v1, by design)
Backend/database/accounts · real payments · geolocation/real maps · push notifications · admin panel/CMS (catalog hardcoded) · paid acquisition.

## 7. Tech Stack (locked)

- **Framework:** Next.js + TypeScript
- **Styling:** Tailwind CSS; custom mobile-first food-delivery-native components; **shadcn/ui only** for accessible primitives (sheets, dialogs, tabs, toasts)
- **Animation:** Framer Motion or CSS transitions (tracking map, micro-interactions)
- **Data:** hardcoded catalog + **localStorage** (history/savings/settings). No backend, no accounts for MVP.
- **Hosting/CI:** Vercel + GitHub auto-deploy. Feature branch → Vercel preview → merge to `main` → prod. **Build with npm** (pnpm frozen-install policy is a hard gate on Vercel CI).
- **PWA:** manifest + service worker for installability + offline shell.

## 8. Analytics (locked: PostHog free tier + Vercel Web Analytics)

- **Vercel Web Analytics:** visitors, page views, referrers, country/device/browser — "how many came and from where."
- **PostHog free tier:** custom events, funnels, retention — "did they complete the loop and come back." Chosen because Vercel custom events aren't free and PostHog's free tier lasts long enough to gather validation data.

**Event list (PostHog):**
`app_opened` · `restaurant_viewed` · `item_added_to_cart` · `cart_viewed` · `checkout_started` · `demo_order_placed` · `tracking_started` · `tracking_completed` · `savings_shown` · `home_food_suggestion_shown` · `helped_response_selected` · `share_card_created` · `share_card_shared` · `return_visit_detected`

**Privacy rules:** never send addresses, phone numbers, payment-like data, or free-text notes. Anonymous local device ID only.

## 9. Key Mechanics (rules the build must follow)

**Delivery modes (locked):**
| Mode | Displayed estimate | Actual simulated run |
|---|---|---|
| **VIP Delivery** | 10–15 min | 1–2 min |
| **Standard Delivery** | 45–60 min | 2–3 min |

Compress real time while preserving the emotional structure of waiting.

**Disclosure timing (locked):**
- *During checkout:* visible "demo order — no real payment, no restaurant receives this, no real delivery."
- *After delivery completes:* savings + playful congrats + home-food suggestion + share card. Never show the savings payoff before the fake delivery finishes.

**Savings (locked):** full simulated bill = estimated avoided spend. Shown post-delivery + accumulated in localStorage.

**Address (locked):** optional, for immersion only. Not required, not stored, not sent, never used for the map. "Place demo order" works with a blank field.

**Payment (locked):** realistic labels (UPI / Card / COD / Wallet), **no "Demo" prefix on the methods**, but page-level demo disclosure. Selection-only UI — never collect any credential.

**Tracking (locked):** reusable abstract A→B map (restaurant → "Home"), animated marker, delivery-state timeline. No real maps / geolocation / API keys / coordinates.

## 10. Implementation Phases (build order)

1. **Scaffold & design system** — Next.js+TS+Tailwind, PWA manifest/SW, Vercel+GitHub CI, PostHog+Vercel Analytics, color/type tokens, shell layout (sticky header + cart bar, safe-area).
2. **Catalog & search** — hardcoded 10 restaurants × 5–6 dishes; home feed; local search (restaurant/dish/cuisine); restaurant detail + add-to-cart.
3. **Cart & checkout** — cart state; bill breakdown + coupon + delivery-mode toggle; checkout sheet (optional address, payment selection, demo disclosure, CTA); persist order intent to localStorage.
4. **Tracking animation** — reusable A→B map component; delivery states with VIP/Standard timing; progress copy.
5. **Post-delivery & history** — savings receipt + cumulative totals; home-food suggestion logic; one-tap feedback + localStorage log; **share card generator**; history/savings dashboard.
6. **Polish & ship** — loading/empty/error states, accessibility pass, mobile-viewport QA (iOS+Android sizes), PWA install check, analytics-fire verification, deploy.

## 11. Success Metrics (KPIs) & How We Prove H1

### 11.1 Quantitative (in-product, via analytics)
- **Funnel completion:** app_opened → tracking_completed → savings_shown (loop-completion rate).
- **Retention:** return visits within 7 days (H3).
- **Engagement depth:** demo orders completed per device.
- **Distribution:** share cards created / shared.
- **Qualitative in-app:** one-tap "did this help you avoid ordering?" response mix.

### 11.2 The core behavioral test (H1 kill/continue bar)
Analytics show *whether people complete the loop*; they do **not** prove the loop actually **reduced a real order**. That requires a small moderated study **before or alongside beta**:

**Method — moderated session + 48h diary proxy (anti self-report bias):**
- **Recruit the genuinely addicted:** people who order daily / several times a week, ideally the delete-reinstall pattern. Channels: r/bengaluru, r/Frugal_Ind, r/Anticonsumption, r/India. Screen for ≥5 orders/week + has tried to quit. Aim 8–12 (over-recruit for no-shows). Light incentive only (≈₹100 UPI) to avoid rubber-stamp testers.
- **In-session, during a real craving window (~8 PM peak):** hand them OTFNA on their phone. **Observe silently** — do they smile at checkout? Do they immediately reach for a real app after? Then ask neutrally: *"Right now, do you feel like ordering for real, or less so?"* (1–5 scale + free-text reason).
- **48h diary (the bias-resistant check):** ask them to log every real-food-app open and whether they ordered, compared to their own pre-session baseline ("how many times last week?").
  - **KILL signal:** used OTFNA → then ordered *more/sooner* than baseline (unfinished-loop) → stop / redesign.
  - **CONTINUE signal:** ordered *less/later*, or urge faded → proceed to build out.

> Why the proxy matters: self-reported "it helped!" is worthless if they order 3× the next day. The diary is the honest tiebreaker. Label conclusions "qualitative, n≈10" until there's scale.

### 11.3 Decision table
| Outcome | Decision |
|---|---|
| H1 passes + savings/home-food supportive | Build out v1 → v2. |
| H1 fails (unfinished-loop) | Concept harmful-as-built. Pivot: strengthen the satiation cue (bigger "your food is here" ritual) or become a blocker-style tool. **Do not ship as-is.** |
| H1 mixed | Iterate MVP (stronger checkout reward / explicit "craving passed" confirmation), re-test with 5 more. |
| Tone feels preachy | Fix copy first — the non-preachy tone is the differentiator. |

## 12. Risks & Mitigations

- **Behavioral (core):** fake loop may not satisfy the real craving → high UX fidelity, compressed-but-emotional tracking, celebratory payoff; measure honestly via §11.2. This IS the hypothesis.
- **Legal:** food-app-similar UX could raise questions → original brand/colors/copy/assets, fictional restaurants, no copied logos/screens, clear demo disclosure, "not affiliated with any food-delivery company" note.
- **Retention measurement:** no accounts makes returns fuzzy → anonymous device ID + localStorage streak + share-card reminder.

### 12.1 Honesty notes (builder preference)
- External market/behavioral figures cited in research are estimates or small-sample studies (n≈105–570) — **directional, not proof**. Validation generates our *own* primary evidence.
- If testers tell us something that kills the concept, **kill it.** The point is to learn, not to confirm our bias.
- The core mechanic is proven abroad (FoodNeverArrives, FakeEats); our unproven part is India-localized resonance + retention — that's what §11.2 tests.

## 13. Launch (India-only, staged public beta)

- Publicly accessible; seed traffic from communities where the problem is already discussed.
- **Channels:** r/Frugal_Ind, r/Anticonsumption, r/bengaluru, r/pune.
- **Positioning:** relatable problem-solver — "I was overspending on late-night ordering, so I built a free tool that replicates the whole scroll-cart-order ritual but tracks your *savings* instead."
- **Key asset:** a screen recording of the full loop ending on the savings + recipe screen.
- Monetization only after traffic + validation.

---

### Companion files (build set)
- `design.md` — brand, screens, components, catalog, copy, UX detail.
- `SWIGGY-UI-REFERENCE.md` — real-app visual/flow patterns to echo (not copy).

*(Earlier research — `PRD-OTFNA.md`, `VALIDATION-PLAN-OTFNA.md`, `CHANGELOG-OTFNA.md` — is kept locally as an archive; its conclusions are already folded into this file. Not required to build.)*
