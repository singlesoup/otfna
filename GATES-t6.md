# Gates: T6 — Hunger Meter (0–5)

**Deliverable:** A hunger meter (0 = not hungry, 5 = starving) added to the order/checkout flow. The user picks their hunger level before placing the order. Shown on the post-order summary.

**Scope (locked):**
- Add hunger meter to the order flow:
  - When? On the cart page OR checkout page — decision: add to checkout page (before "Place order" button) so it's part of the final confirmation
  - UI: 6 options (0, 1, 2, 3, 4, 5) presented as a row of circles/badges, clickable to select. Label: "How hungry are you?" with anchor text: 0 = "Not hungry at all", 5 = "Starving"
  - State: stored in the active order context (order-context.tsx) as `hunger` field (0–5)
  - Order context: add `hunger` to the order object when placed
- Show hunger level on the post-order delivered page (e.g. "You were a 4 — pretty hungry")
- Default: 3 (moderately hungry) if not set
- Persistence: part of the order object (already persisted via active-order + history)

**Out of scope (locked):**
- Hunger meter on the restaurant page (just checkout)
- Hunger-based recommendations
- Emoji per level (keep it simple with numbers)

**Checklist:**

- [ ] G1: Order context has `hunger` state + setter
  - CHECK: grep src/context/order-context.tsx for "hunger" or "Hunger"
  - EXPECT: hunger state + setter in context
  - EVIDENCE: pending

- [ ] G2: Checkout page shows hunger meter (6 clickable options)
  - CHECK: grep src/app/checkout/page.tsx for "hunger" or "Hunger" or "hungry"
  - EXPECT: hunger meter UI in checkout page
  - EVIDENCE: pending

- [ ] G3: Placing order saves hunger level (order object has hunger field)
  - CHECK: grep src/lib/types.ts OR order-context.tsx for "hunger" in the order type
  - EXPECT: hunger in order type + saved on place
  - EVIDENCE: pending

- [ ] G4: Delivered page shows hunger level in the summary
  - CHECK: grep src/app/delivered/page.tsx for "hunger" or "hungry" or "Hunger"
  - EXPECT: hunger displayed on delivered page
  - EVIDENCE: pending

- [ ] G5: `npm run build` passes
  - CHECK: `npm run build 2>&1 | tail -3`
  - EXPECT: exit 0, no errors
  - EVIDENCE: pending
