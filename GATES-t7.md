# Gates: T7 — Limited-time offer timer

**Deliverable:** A countdown timer on the cart/checkout page showing a limited-time offer (e.g. "Offer expires in 12:34"). When the timer hits zero, the offer disappears and a "new offer available" message appears.

**Scope (locked):**
- Add a countdown timer to the cart page (`src/app/cart/page.tsx`) OR checkout page — decision: cart page (it's the first place the user sees the total)
- Timer display: "Limited-time offer: {offer description} — expires in HH:MM:SS" or "Offer expired"
- State: starts at a fixed duration (e.g. 15 minutes = 900 seconds) when the user first loads the cart page in a session. Stored in localStorage `otfna.offerTimer.v1` as `{ endTime: number (timestamp) }`
- Behavior:
  - On first cart load in a session: set `endTime = now + 900000` (15 min)
  - Countdown: every second, compute `remaining = endTime - now`
  - If remaining > 0: show "expires in {HH:MM:SS}"
  - If remaining <= 0: show "Offer expired — check back soon for a new one"
  - When expired, set a flag `expired: true` in localStorage so it doesn't keep counting negative
- Offer description: a dynamic string, e.g. "Free delivery on your next order" or "10% off above ₹299"
- Visual: mango accent when active, neutral when expired

**Out of scope (locked):**
- Real offers with different durations (fixed 15-min demo)
- Offer redemption flow (it's a demo timer)
- Multiple timers

**Checklist:**

- [ ] G1: Cart page shows countdown timer
  - CHECK: grep src/app/cart/page.tsx for "timer" or "Timer" or "countdown" or "expires" or "offer"
  - EXPECT: countdown timer UI in cart page
  - EVIDENCE: pending

- [ ] G2: Timer state persisted in localStorage (endTime stored)
  - CHECK: grep src/lib/storage.ts OR cart/page.tsx for "offerTimer" or "OFFER_TIMER" or "endTime"
  - EXPECT: timer state persistence
  - EVIDENCE: pending

- [ ] G3: Timer counts down (remaining time decreases over time)
  - CHECK: (manual) open /cart, note time, wait 5s, check timer decreased by ~5s
  - EXPECT: countdown works
  - EVIDENCE: pending

- [ ] G4: When timer reaches 0, shows "expired" state
  - CHECK: (manual) set endTime to past, reload /cart, confirm "expired" shown
  - EXPECT: expired state works
  - EVIDENCE: pending

- [ ] G5: `npm run build` passes
  - CHECK: `npm run build 2>&1 | tail -3`
  - EXPECT: exit 0, no errors
  - EVIDENCE: pending
