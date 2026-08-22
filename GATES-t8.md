# Gates: T8 — Donation + About page

**Deliverable:** A `/about` page with: BMAC donation info + QR, GPay donation QR, mission/vision, team/design credits, FAQ teaser.

**Scope (locked):**
- New route: `src/app/about/page.tsx` — standalone about page
- Sections:
  1. **Hero**: "About OTFNA" title, mission statement
  2. **What it is**: Explanation of the concept (fake the ritual, keep the bill)
  3. **BMAC donation**: Bhartiya Muslim Vikas Abhiyan / BMAC info + QR code placeholder
  4. **GPay donation**: GPay QR code placeholder + UPI ID display
  5. **Team/design credits**: who made this
  6. **CTA**: "Start saving" button → links to `/`
- Styling: matches OTFNA brand (mango accent, charcoal, card-based)
- No bottom nav (standalone page, or minimal nav)

**Out of scope (locked):**
- Actual payment processing
- Dynamic QR generation (use static placeholder images / QR data URIs)
- Blog/content sections

**Checklist:**

- [ ] G1: `src/app/about/page.tsx` exists
  - CHECK: `test -f src/app/about/page.tsx && echo EXISTS`
  - EXPECT: EXISTS
  - EVIDENCE: pending

- [ ] G2: `/about` page renders (npm build passes, page returns 200)
  - CHECK: `curl -s -o /dev/null -w "%{http_code}" --max-time 5 http://localhost:3000/about`
  - EXPECT: 200
  - EVIDENCE: pending

- [ ] G3: About page has BMAC donation section (heading "BMAC" or "Donate via BMAC" + QR area)
  - CHECK: grep page.tsx for "BMAC" or "bma" or "donat"
  - EXPECT: BMAC section present in code
  - EVIDENCE: pending

- [ ] G4: About page has GPay donation section (UPI ID displayed + QR area)
  - CHECK: grep page.tsx for "GPay" or "gpay" or "upi" or "pay"
  - EXPECT: GPay section present in code
  - EVIDENCE: pending

- [ ] G5: About page has mission/vision text
  - CHECK: grep page.tsx for "mission" or "vision" or "about" or "what it is"
  - EXPECT: mission section present
  - EVIDENCE: pending

- [ ] G6: About page has a CTA button linking to `/`
  - CHECK: grep page.tsx for `href="/"` or `Link` to home
  - EXPECT: CTA present
  - EVIDENCE: pending

- [ ] G7: `npm run build` passes
  - CHECK: `npm run build 2>&1 | tail -3`
  - EXPECT: exit 0, no errors
  - EVIDENCE: pending
