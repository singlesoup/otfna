# Gates: T4 — Streak tree

**Deliverable:** A streak visualization on the `/history` page showing daily streaks — consecutive days with at least one completed demo order. Render as a simple streak tree/banner.

**Scope (locked):**
- Add a streak component to the `/history` page (below the savings summary, above or alongside the order list)
- State: `localStorage.otfna.streak.v1` — `{ currentStreak: number, longestStreak: number, lastOrderDate: string }`
- Logic:
  - When an order is completed, update streak: if `lastOrderDate` == today → no change; if yesterday → increment `currentStreak`; else → reset to 1
  - `longestStreak` is the max `currentStreak` ever achieved
  - `lastOrderDate` = the date of the most recent completed order
- Display: show current streak count + longest streak + a simple visual (e.g. flame icon + number badges)
- Only shows when there are orders in history (hydrated && history.length > 0)

**Out of scope (locked):**
- Streak freeze / recovery mechanics
- Push notifications for streak
- Streak on other pages (just history)

**Checklist:**

- [ ] G1: Streak state + logic exists in code (localStorage helper + update function)
  - CHECK: grep src/lib/storage.ts OR a new file for "streak" or "STREAK_KEY" or "currentStreak"
  - EXPECT: streak state logic present
  - EVIDENCE: pending

- [ ] G2: `/history` page shows streak component when orders exist
  - CHECK: grep history/page.tsx for "Streak" or "streak" or "StreakTree"
  - EXPECT: streak component imported + rendered
  - EVIDENCE: pending

- [ ] G3: `npm run build` passes
  - CHECK: `npm run build 2>&1 | tail -3`
  - EXPECT: exit 0, no errors
  - EVIDENCE: pending
