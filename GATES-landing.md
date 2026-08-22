# Gates: T5 — Landing page

**Deliverable:** A dedicated landing page at `/landing` (or `/`) that sells OTFNA before the app. Full page with hero, value props, how-it-works, FAQ teaser, CTA.

**Scope (locked):**
- New route: `src/app/landing/page.tsx` — full standalone landing page
- Content sections:
  1. **Hero**: Big headline, subhead, primary CTA ("Start saving" → goes to `/`), secondary CTA ("See how it works")
  2. **Value props**: 3-4 cards (Fake the ritual, Keep the full bill, Real savings, Zero real orders)
  3. **How it works**: 3-step flow (Browse → Add to cart → Fake deliver → See savings)
  4. **Social proof / ethos**: "Every order here is only a demo. No real money, no real delivery, real savings." — the core pitch
  5. **CTA section**: Final push to start
- Styling: matches OTFNA brand (mango accent, clean, card-based)
- Nav: landing page can have its own simpler nav, or reuse the app shell with a landing feel. Decision: standalone page, minimal nav (just logo + "Try the app" CTA)

**Out of scope (locked):**
- Actual auth/signup flow
- Animations beyond CSS transitions already in the design system
- Blog/content sections

**Checklist:**

- [ ] G1: `src/app/landing/page.tsx` exists
  - CHECK: `test -f src/app/landing/page.tsx && echo EXISTS`
  - EXPECT: EXISTS
  - EVIDENCE: pending

- [ ] G2: `/landing` page renders (npm build passes, page returns 200)
  - CHECK: `curl -s -o /dev/null -w "%{http_code}" --max-time 5 http://localhost:3000/landing`
  - EXPECT: 200
  - EVIDENCE: pending

- [ ] G3: Landing page has a hero section with headline
  - CHECK: browser_navigate to /landing, browser_vision, find hero text
  - EXPECT: headline visible (e.g. "Fake the food-delivery ritual. Keep the whole bill.")
  - EVIDENCE: pending

- [ ] G4: Landing page has ≥3 value prop cards
  - CHECK: browser_vision, count cards
  - EXPECT: ≥3
  - EVIDENCE: pending

- [ ] G5: Landing page has a "How it works" section with ≥3 steps
  - CHECK: browser_vision, count steps
  - EXPECT: ≥3
  - EVIDENCE: pending

- [ ] G6: Landing page has a CTA that links to the app (`/` or some app entry)
  - CHECK: browser_vision, find CTA link/button, confirm href points to app
  - EXPECT: CTA links to app
  - EVIDENCE: pending

- [ ] G7: Landing page design matches OTFNA brand (mango accent color present, clean typography)
  - CHECK: browser_vision, confirm mango/amber accent visible
  - EXPECT: brand-consistent
  - EVIDENCE: pending

- [ ] G8: `npm run build` passes
  - CHECK: `npm run build 2>&1 | tail -3`
  - EXPECT: exit 0
  - EVIDENCE: pending
