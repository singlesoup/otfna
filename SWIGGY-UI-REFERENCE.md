# Swiggy Food Delivery App – UI/UX Breakdown (from Video)

> Purpose: This document describes every UI element, screen, and interaction shown in the reference video so any LLM can reason about, replicate, or generate UI similar to the Swiggy mobile app.
> Source: produced by external agents from the user's screen-recording; complements the OCR flow-teardown in PRD-OTFNA.md §3. This file = the VISUAL reference (colors, layout, styling); OCR = the copy/flow reference.

## 1. App Overview
- **App**: Swiggy (food delivery + quick commerce)
- **Platform**: Mobile (iOS/Android)
- **Primary color palette**: Deep magenta/pink background, orange & yellow gradients for offers, white for cards/text, green for success/savings states
- **Typography**: Rounded, friendly sans-serif; bold for prices, playful script for "Welcome, foodie!"
- **Overall vibe**: Vibrant, promo-heavy, dense information, fast-paced

## 2. Global Layout Elements (present across screens)
- **Top navigation strip**: Circular icons + labels — `Food` (selected, pink pill), `Instamart`, `Dineout`, `Giftables`, `Scenes`
- **Search bar**: Rounded, full-width, left magnifying-glass icon, right microphone icon, rotating placeholder text ("Search for Biryani", "Cake", "Sweets", "Pizza"…), plus a `VEG` toggle switch on the right
- **Greeting**: "Welcome, foodie!" in stylized script
- **Persistent cart footer**: Appears once items added, shows total + CTA

## 3. Screen-by-Screen Breakdown

### Screen 1 — Home / Promo Splash
- **Purpose**: Greet user + push a limited-time offer
- **Body**: Large rounded promo card, yellow→orange gradient
  - Headline: "Hurry! Your ₹40 FREE CASH will expire soon!"
  - Subtext: "Over & above all discounts on your order"
  - Center: gold-bordered circular badge "FREE ₹40 CASH!"
  - Decorative floating rupee coins & currency notes (animated)
  - Top-right `X` close button
  - Bottom CTA button: "Shop & Save ₹40 instantly"
- **Interaction**: Tap CTA → offer flow; tap `X` → dismiss to home

### Screen 2 — Home (Content Discovery)
- **Featured Offers grid** (2×2 layout of cards):
  - "99 store — Meals At ₹99" (burger image)
  - "Flat ₹200 OFF & More" (pizza image)
  - "Get 70% OFF + Cashback" (rice bowl image)
- **Restaurant Spotlight card**: Domino's Pizza — "Get items at ₹59*" — "ORDER NOW" button
- **Filter chips row**: `MIN Rs. 100 OFF`, `FAST DELIVERY`
- **Horizontal restaurant carousel** (each card = image, offer ribbon, name, cuisine, rating, ETA):
  - KFC — 50% OFF + 10% EXTRA (AD badge)
  - McDonald's — 50% OFF UPTO ₹80
  - ITC Aashirvaad — 70% OFF UPTO ₹130 (AD badge)
- **"99 Store" section**: Header + "View All >"
  - Item cards: image, name, strike-through price + discounted price, rating, restaurant
  - Examples: Chicken Snacker Burg ₹163.90 → ₹79 (Bunly Burgers); Crispy Chicken Burg ₹149 → ₹79; Samosa Party Bucket ₹199 → ₹99
- **"What's on your mind?" carousel**: Circular category tiles — Monsoon Specials, Cakes, Biryani, Burgers, Pizzas
- **"More on Swiggy" row**: MEALS AT 99 FREE DELIVERY · OFFER ZONE · BOLT FOOD IN 10MINS · EAT RIGHT
- **Filter/Sort bar** (sticky when scrolling restaurant list): `Filter` icon, `Sort by` dropdown, chip `99 Store`, chip `Bolt`
- **Vertical restaurant list**: Each card shows hero image, heart (favourite) icon, name, rating, ETA, cuisine tags, price-for-two, offer ribbon, optional AD/Swiggy Seal badge

### Screen 3 — Category Page (e.g., Biryani)
- **Category chip row** (top, horizontal): Selected chip shows a green checkmark ("Biryani ✓"), others: Specials, Cakes, Burgers, Pizzas
- **Seasonal "Monsoon" mini-banner**
- **Sponsored/AD horizontal cards**: Thalairaj Biryani (Items @ ₹109, 4.3★, 15–20 min); ZAZA Mughal Biryani (4.5★, 20–30 min)
- **Filter bar**: `Filter`, `Sort by`, removable chips (`99 Store ✕`, `one Extra off`)
- **Result count heading**: "195 restaurants to explore"
- **Restaurant cards** (vertical):
  - Biryani Buckets — ₹125 off above ₹249 — 40–45 mins — FREE DELIVERY — 2.8★ (58 ratings) — HSR Layout, 0.9 km — Biryani, North Indian — ₹250 for two
  - Mega Biryani — ₹75 off above ₹349 — 50–60 mins — FREE DELIVERY — 3.0★ — Koramangala, 5.0 km — ₹400 for two
- **Item pop-up (bottom sheet)**: "Hyderabadi Chicken Dum Biryani" — Bestseller badge — image — strike ₹219 → ₹179 — `ADD` button that toggles to `- 1 +` stepper — `X` close
- **"Looking for 'Biryani' (16)" section** (collapsible): 2-column grid of item cards
- **"People usually pair this with" carousel**: Chicken 65, Lemon Chicken, Pepper Chicken (image, rating, ₹149 ₹239)
- **Bottom toast/banner**: Green — "₹40 Free Cash unlocked · Applicable over and above coupons"

### Screen 4 — Restaurant / Cart / Checkout
- **Restaurant header**: Swiggy Seal badge, "Al Bawarchi Biryani", ETA, location, 3.9★ (3.3K+ ratings)
- **Offer strip**: "Save x2 · Extra ₹40 off · APPLICABLE OVER & ABOVE COUPONS · 1/5"
- **Free delivery strip**: "Free delivery on orders above ₹99" (with `one` membership icon)
- **Menu search bar**: "Search for dishes"
- **Preference chips**: Veg toggle (green), Non-veg toggle (red), EatRight, Ratings 4+
- **Menu items**: image, name, rating, ETA, price; `ADD` → `- 1 +`
  - Example: Hyderabadi Chicken Dum Biryani ₹299 → ₹179
- **Congrats modal**: "Instant ₹40 off" — `YAY!` primary button
- **Order options**:
  - `Cooking requests` button
  - `Cutlery Needed` toggle/checkbox
- **Savings Corner**:
  - `Apply Coupon >`
  - "₹40 extra off above coupons" ✅ Applied
  - "Free delivery savings of ₹40" ✅ Applied
- **Delivery Type tabs**: `Delivery Type` | `Tip` | `Instructions`
  - `Bolt` ⚡ — Lightning fast — 10–15 mins
  - `Eco Saver` 🌿 — Lesser CO₂ by order grouping — 25–35 mins
- **Bill summary (expandable)**:
  - Item Total: ₹219
  - Delivery Fee | 1.2 kms: ₹40 → FREE (one)
  - Extra discount for you: −₹40
  - Delivery Tip: `Add tip`
  - GST & Other Charges: ₹39.03
  - **To Pay: ₹298 → ₹218** ("₹80 saved on the total!")
- **Cancellation Policy** text block
- **Sticky footer CTA**: Proceed to Pay

## 4. Global Interaction Patterns
- **Taps**: category chips, filter chips, ADD buttons, close (X), CTA buttons, tabs
- **Steppers**: `- 1 +` for item quantity with instant visual feedback
- **Scrolling**: Vertical for feeds; horizontal for carousels (categories, offers, pair-with)
- **Bottom sheets / modals**: Item detail, congrats popup
- **Toasts**: Green success banner for cash/coupon unlocks
- **Sticky elements**: Filter/sort bar, checkout footer
- **Toggles**: VEG filter, cutlery needed
- **Collapsible sections**: "Looking for X (n)", bill summary

## 5. Badge / State Vocabulary
| Badge | Meaning |
|-------|---------|
| `AD` | Sponsored listing |
| `Bestseller` | Popular item |
| `Swiggy Seal` | Quality-verified restaurant |
| `one` | Swiggy One membership benefit |
| `Save x2` | Stackable discount |
| ✅ Applied | Coupon/offer active |
| ❤️ | Favourite restaurant |
| ⚡ Bolt | 10-min delivery tier |
| 🌿 Eco Saver | Grouped delivery, lower CO₂ |

## 6. Navigation Flow (high level)
```
Home (Promo Splash)
  │ dismiss / scroll ▼
Home (Discovery: offers, carousels, "What's on your mind?")
  │ tap category / search ▼
Category / Search Results (e.g., Biryani)
  │ tap restaurant or ADD ▼
Restaurant Menu (item list + ADD to cart)
  │ proceed ▼
Cart / Checkout (bill, delivery type, coupons)
  │ Proceed to Pay ▼
Payment (not shown in video)
```

## 7. Design Signals for an LLM to Reproduce
- Bright magenta primary, orange/yellow accents for promos, green for success
- Rounded cards (large radius ~16px feel), soft shadows
- Heavy use of price strike-throughs to signal savings
- Prominent, high-contrast CTA buttons (`ADD`, `ORDER NOW`, `Shop & Save`)
- Iconography: outline icons with occasional color fill for active states
- Content-first design: food photography dominates each card
- Consistent chip-based filtering pattern across screens

---

## 8. OTFNA inversion map (how we mimic-then-subvert each Swiggy lever)
> This is the bridge from "clone Swiggy" to "OTFNA the satirical habit-breaker." Same UI patterns, inverted intent.

| Swiggy lever | OTFNA treatment |
|---|---|
| Promo splash: "Hurry! Your ₹40 FREE cash will expire soon!" | "Hurry! Your ₹0 spent. Expires never. 😎" |
| Featured offers grid (₹99 meals, 70% OFF) | Same visual density, every price → "₹0 (you didn't order)" |
| Strike-through pricing (₹299 → ₹179) | Strike-through the WHOLE price → ₹0; "you saved ₹299" |
| "₹40 Free Cash unlocked" toast on add-to-cart | "₹40 fake cash unlocked. Spend it on nothing." |
| Savings Corner / "₹80 saved on the total!" | The saving IS the product — headline the number as the win |
| Delivery Type: Bolt ⚡ / Eco Saver 🌿 | "Bolt (never arrives) / Eco Saver (also never arrives)" |
| Bill summary (GST, delivery fee, tip) | Show the bill, then zero it: "To Pay: ₹0. Craving: handled." |
| Order tracking (map + courier) — MANDATORY satiation screen | Animated courier that gets lost / naps / "food never arrives" — the loop-closer |
| Cancellation policy: "non-refundable once placed" | "Non-orderable. Fully refundable. It was never real." |
| "What's on your mind?" category carousel | Keep as-is — pure browsing dopamine, the core ritual |
| EatRight healthy tab (anti-churn in real app) | Inverted: exit-ramp suggestion to cook at home (dal chawal) |
