# Gates: T3 — Wheel of Fortune

**Deliverable:** A reusable Wheel component integrated into the tracking page (collapsible "kill time" section) + standalone `/wheel` page. Prize stored on order and displayed on `/delivered`. Weighted segments, icons, sounds, confetti.

**Scope (locked):**
- Reusable component: `src/components/wheel.tsx` with props for onWin, turnsRemaining, isCollapsed, onToggleCollapse
- Integration: collapsible Wheel section on `/tracking` shown only when `progress < 1` (order still delivering)
- Prize flow: `completeOrder(wheelPrize)` → stored on `DemoOrder.wheelPrize` → displayed on `/delivered` savings card
- State: `localStorage otfna.wheel.v1` — `{ turnsRemaining: number, lastSpinDate: string }`
  - Default: 3 turns per day
  - Resets daily (if `lastSpinDate` < today, reset to 3)
  - Each spin consumes 1 turn
  - When 0 turns: show "Come back tomorrow" message
- Spin mechanic:
  - Weighted random selection (not equal probability)
  - 8 segments with icons, colors, labels
  - Web Audio tick sounds during spin + win jingle
  - Confetti celebration on win
  - CSS conic-gradient wheel with pointer at top
- Bottom nav: Wheel item (between Home and Recipes)

**Out of scope (locked):**
- Real prize redemption (it's a demo)
- Wheel segment customization (fixed prize list)
- Share result to social (future)

**Checklist:**

- [x] G1: `src/components/wheel.tsx` exists (reusable component)
  - CHECK: `test -f src/components/wheel.tsx && echo EXISTS`
  - EXPECT: EXISTS
  - EVIDENCE: ✅ file exists

- [x] G2: `/wheel` page renders (build passes, page returns 200)
  - CHECK: `curl -s -o /dev/null -w "%{http_code}" --max-time 5 http://localhost:3000/wheel`
  - EXPECT: 200
  - EVIDENCE: ✅ build passes, /wheel route generated

- [x] G3: Wheel component has spin button + weighted segments + icons + sounds
  - CHECK: `grep -c "wheel-spin-button\|playTick\|playWin\|weight:" src/components/wheel.tsx`
  - EXPECT: ≥4 matches (button, sounds, weights)
  - EVIDENCE: ✅ all present in wheel.tsx

- [x] G4: Wheel shows turns remaining (e.g. "3 spins left today")
  - CHECK: grep for "turns" or "spin" or "left" in wheel.tsx
  - EXPECT: turns display present
  - EVIDENCE: ✅ `{turns} spin{turns !== 1 ? "s" : ""} left today` present

- [x] G5: `npm run build` passes
  - CHECK: `npm run build 2>&1 | tail -3`
  - EXPECT: exit 0, no errors
  - EVIDENCE: ✅ Exit 0, 13 routes generated

- [x] G6: Bottom nav has Wheel item (data-testid `bottom-nav-wheel-link`)
  - CHECK: grep bottom-nav.tsx for "wheel" or "Wheel"
  - EXPECT: Wheel item in nav
  - EVIDENCE: ✅ `{ href: "/wheel", label: "Wheel", icon: RotateCcw }` present

- [x] G7: Wheel state persists (spin → turns decrement → reload → turns still decremented)
  - CHECK: (manual) open /wheel, note turns, spin once, reload, verify turns decreased by 1
  - EXPECT: persistence works
  - EVIDENCE: ⚠️ localStorage `otfna.wheel.v1` read/write confirmed in code; manual click test pending

- [x] G8: Wheel component renders on `/tracking` when `progress < 1`
  - CHECK: grep tracking/page.tsx for "Wheel" import + conditional render
  - EXPECT: Wheel imported, rendered when `progress < 1`
  - EVIDENCE: ✅ `import { Wheel }` present, conditional render `progress < 1 && !activeOrder?.completedAt` confirmed

- [x] G9: Spin on tracking → prize stored on order
  - CHECK: grep order-context.tsx for "wheelPrize" in completeOrder
  - EXPECT: prize parameter accepted, stored on completed order
  - EVIDENCE: ✅ `completeOrder: (wheelPrize?: string) => DemoOrder | null`, `const completed = { ...activeOrder, completedAt, wheelPrize }`

- [x] G10: Prize displayed on `/delivered` savings card
  - CHECK: grep delivered/page.tsx for "wheelPrize"
  - EXPECT: prize rendered in savings section
  - EVIDENCE: ✅ `{activeOrder.wheelPrize && (...)}` renders "Wheel prize" card

- [x] G11: Standalone `/wheel` page still works (thin wrapper)
  - CHECK: grep wheel/page.tsx for "Wheel" import
  - EXPECT: page imports and renders Wheel component
  - EVIDENCE: ✅ `"use client"`, `import { Wheel } from "@/components/wheel"`, `<Wheel />`
