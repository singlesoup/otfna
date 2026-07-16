# OTFNA — design.md

> **OTFNA — "Only The Food Never Arrives."**
> This file = **UI / BRAND / SCREENS / CATALOG / COPY only.** Strategy, hypotheses, analytics, scope, phases → `final_plan.md`. Real-app visual patterns to echo (not copy) → `SWIGGY-UI-REFERENCE.md`.
>
> Design lane (locked): **looks and feels like a real, polished Indian food-delivery app**, with *light* playfulness. Reference model: Korean *FoodNeverArrives*. Never a joke/satire page; never so real that users think real food is coming.
> Last updated: 2026-07-16

---

## 1. Brand System

- **Name / wordmark:** OTFNA — tagline "Only The Food Never Arrives." (Logo TBD; MVP uses wordmark in a clean sans.)
- **Primary surface:** **White** (`#FFFFFF`) — app background, feeds, menus, cards, checkout, tracking base, receipt.
- **Secondary surfaces:** very light grey / off-white (`#F5F5F5`-ish) for cards, dividers, skeletons.
- **Primary accent — Mango Yellow** (`~#FFC000`): logo, active category chip, offer badges, CTA accents, selected delivery mode, celebration elements. Accent, **not** dominant background.
- **Success / savings accent:** Green (`~#2E7D32`) — savings numbers, "Delivered", coupon-applied ticks.
- **Text:** charcoal / near-black (`~#1A1A1A`).
- **Demo-disclosure color:** soft amber/yellow (not harsh red) — visible but non-alarming.
- **Typography (MVP):** clean modern sans — **Inter**, Geist, or system UI stack. Prioritize mobile readability; bold for prices. Custom vibe font deferred to later brand work.
- **Vibe:** light, spacious, familiar, food-delivery-native, content-first (food imagery dominates cards).

## 2. Design Principles

1. Feel like a real Indian food-delivery app at the **UX-pattern level** — familiar because it's the same product category.
2. Be **visually original** at brand/color/copy/asset level — never copy Swiggy/Zomato logos, exact layouts, icons, spacing, or assets. (See `SWIGGY-UI-REFERENCE.md` for *patterns* to echo, not pixels to clone.)
3. **Mobile-first** always; desktop is a centered mobile column.
4. Light playfulness in **copy and reward moments**, not in core-flow chrome.
5. Demo disclosure present wherever a real user might assume real money/food.

## 3. Global Layout Elements

- **Sticky header:** location label defaults to **"Home"** (small dropdown affordance, non-functional in MVP; no geolocation). Brand wordmark. Optional utility icon.
- **Search bar:** rounded, full-width, magnifier icon, rotating placeholder ("Search 'Biryani'", "'Pizza'", "'Momos'"…), veg toggle optional. **Functional** locally.
- **Category chips row:** horizontal scroll; active chip = mango-yellow pill.
- **Sticky cart bar:** appears once items added — item count + total + "View Cart" CTA.
- **Bottom nav (optional MVP):** Home · Search · History.

## 4. Screens (v1 — core loop)

### 4.1 Home Feed
- Location "Home" header + functional search + category chips (Biryani, Pizza, Rolls, Chinese, North Indian, South Indian, Burgers, Desserts, Cafe, Healthy).
- Offer cards (mango-yellow badges), restaurant cards (hero food image, name, cuisine tags, rating, delivery estimate, offer ribbon, favourite heart).
- Basic sort/filter chips.

### 4.2 Restaurant Detail
- Restaurant header (name, rating, ETA, cuisine, fictional "quality" badge — original, not "Swiggy Seal").
- Menu-item cards: thumbnail image, name, price, `ADD` button → `– 1 +` stepper.
- Sticky cart bar.

### 4.3 Cart
- Item list + quantity steppers.
- **Bill breakdown:** item total, delivery fee, coupon discount, taxes, **To Pay**.
- Coupon input (applies fake discount, green "Applied" tick).
- **Delivery-mode selector:** VIP vs Standard (see §6).

### 4.4 Checkout
- **Optional address field** + privacy line: *"Optional, for demo realism. We never store, send, or use this."* Blank allowed.
- **Payment methods:** UPI / Card / COD / Wallet — selection-only, **no credential fields**, no "Demo" prefix on labels.
- **Demo disclosure block** (amber): *"This is a demo order. No real payment will be collected. No restaurant will receive this. No real food will arrive."*
- CTA: **"Place demo order."**

### 4.5 Order Placed
- Brief confirmation → transitions into tracking.

### 4.6 Fake Delivery Tracking
- **Reusable abstract A→B map:** Point A = restaurant, Point B = "Home"; animated rider marker along a curved route on a light abstract map background. **No real maps / geolocation / coordinates / API keys.**
- **Delivery-state timeline** (progress-synced): Order placed → Restaurant confirmed → Food being prepared → Delivery partner assigned → Picked up → On the way to Home → Arriving soon → Delivered.
- Timing per selected mode (§6). Light playful copy allowed here (still demo-clear).

### 4.7 Delivered / Savings Receipt
- Headline: **"Fake delivered. Real money saved."**
- **₹ saved this order** (= full simulated bill) + **cumulative local savings**.
- **Category-specific home-food suggestion** (§8).
- **One-tap feedback:** "Did this help you skip a real order?" 👍 / 👎.
- **Share card** (§7).

### 4.8 History / Savings Dashboard
- localStorage-backed: total ₹ saved, number of fake orders, order list with dates. (Streak counter deferred to v2.)

## 5. Component Inventory

Custom (Tailwind): RestaurantCard · DishCard · CategoryChip · SearchBar · StickyCartBar · BillBreakdown · CouponInput · DeliveryModeSelector · TrackingMap (reusable) · TrackingTimeline · SavingsReceipt · ShareCard · FeedbackTap · HistoryList.
shadcn/ui primitives only: Sheet (cart/checkout), Dialog (disclosure/congrats), Tabs, Toast.
Animation: Framer Motion / CSS for map marker, sheet transitions, add-to-cart micro-interactions.

## 6. Delivery Modes (locked)

| Mode | Displayed estimate | Actual simulated run | Positioning |
|---|---|---|---|
| **VIP Delivery** | 10–15 min | 1–2 min | fast tier |
| **Standard Delivery** | 45–60 min | 2–3 min | regular tier |

Realistic labels during the flow; animal-named tiers (Rabbit/Turtle) deferred to v2.

## 7. Share Card (v1)

- Client-side generated (canvas/HTML → download/share).
- Contains: OTFNA branding, **₹ saved**, playful line. **No** address, payment, or sensitive data.
- Example copy: "Skipped a ₹486 order today." · "Fake delivered. Real money saved." · "Craving handled. Wallet protected." · "I almost ordered. OTFNA intercepted."

## 8. Catalog (10 fictional restaurants × 5–6 dishes; ~50–60 dishes)

Realistic Indian food, plausible pricing, no dish repeated across restaurants. AI-generated dish images added later (never scraped). Names below are working set:

1. **Biryani Express** — Mutton Biryani, Chicken Dum Biryani, Veg Biryani, Salan, Boondi Raita
2. **The Pizza Project** — Margherita, Veg Loaded Pizza, Garlic Bread, Cheese Burst, Peri-Peri Fries
3. **Kebab Junction** — Seekh Kebab Roll, Chicken Shawarma, Rumali Wrap, Tangdi Kebab, Mutton Rumali Roll
4. **Wok & Momos** — Burnt Garlic Noodles, Veg Spring Roll, Paneer Momos, Chilli Chicken, Hakka Noodles
5. **Dadi Ki Rasoi** — Dal Chawal, Rajma Chawal, Chole Chawal, Paneer Rice, Veg Pulao
6. **Anna's Tiffin House** — Ghee Roast Dosa, Idli Sambar, Medu Vada, Filter Coffee, Upma
7. **Burger & Co.** — Crispy Potato Burger, Chicken Snacker Burger, Cheese Loaded Fries, Peri Wings, Veg Wrap
8. **The Sweet Tooth** — Walnut Brownie, Gulab Jamun, Chocolate Mousse, Ice Cream Sundae, Cheesecake Slice
9. **The Chai Tapri** — Cheese Kulcha Omelette, Bun Maska, Masala Chai, Maggi, Bread-Cheese Sandwich
10. **The Green Bowl** — Grilled Chicken Salad, Quinoa Avocado Bowl, Grilled Chicken Breast, Egg Bowl, Oats Bowl

Each dish: name, price (realistic ₹), rating, veg/non-veg flag, image (later).

## 9. Category → Home-Food Alternatives (post-delivery payoff)

Practical, non-preachy nudges shown after fake delivery, matched to what they "ordered":
- **Biryani / North Indian / South Indian comfort:** *"Check the fridge for leftovers — or a quick bowl of Curd Rice hits the same comfort note."*
- **Pizza / Burgers / Cafe:** *"Craving savory? Hot Cheese-Butter Toast or a 2-minute bowl of Maggi does the job."*
- **Chinese / Momos / Healthy bowls:** *"Your body wants savory fuel — try 5-minute Veg Poha or warm Oats."*
- **Desserts:** *"Sugar cravings fade in ~10 min. Have a glass of water first, or grab a fresh fruit."*

Home-cooking staples pool (from research): dal chawal, rajma chawal, paneer rice, chole chawal, Maggi, veg pulao, upma, oats, grilled chicken breast, eggs, omelette, bread-cheese sandwich, pasta, one-pot recipes.

## 10. Copy & Tone Rules

- **Core flow:** realistic, familiar food-app wording (ADD, View Cart, Apply Coupon, Proceed).
- **Demo disclosure:** clear and present at checkout + wherever real money/food could be assumed. Amber, not alarming.
- **Reward moments (post-delivery):** light, witty, encouraging — make the user feel *clever*, not guilty. E.g. "You almost spent ₹486. Tiny financial glow-up." · "Your wallet just exhaled." · "Craving successfully distracted."
- **Never:** shame, lecture, or trick the user into thinking food is real.

## 11. Visual Pattern Reference

For layout density, card structure, chip patterns, checkout bill anatomy, and tracking-state vocabulary, echo the *patterns* documented in `SWIGGY-UI-REFERENCE.md` — but with OTFNA's own colors, copy, fictional data, and original assets. Do not reproduce any real app's exact layout, icons, or branding.

---

### Companion files (build set)
- `final_plan.md` — strategy, hypotheses, scope, tech, analytics, phases, metrics.
- `SWIGGY-UI-REFERENCE.md` — real-app visual/flow patterns + inversion notes.

*(Earlier research — `PRD-OTFNA.md`, `VALIDATION-PLAN-OTFNA.md`, `CHANGELOG-OTFNA.md` — is kept locally as an archive. Not required to build.)*
