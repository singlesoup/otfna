# OTFNA Growth & Feedback Plan

> Living document. Append new logs/experiments/learnings under the relevant
> section. Keep it honest: record what we tried, what happened (real numbers
> from PostHog when available), and what we'll do next. No vanity metrics.
>
> Current state: app is LIVE at https://otfna.vercel.app (Vercel, main branch,
> auto-deploy on push). PostHog (EU) wired — 15 product events tracked.

## TL;DR (update as we learn)
- Stage: pre-user / need first 25–50 real users + feedback loop.
- Core hook: "Complete the food-ordering ritual, save money, nothing arrives."
- Secret weapon: the **share card** (social, screenshot-friendly) + the
  **savings number** (₹ saved per fake order). Both are built-in virality.

## What OTFNA already has (leverage these)
- Fake-order loop: browse → cart → checkout → live tracking → "delivered".
- Per-dish + per-restaurant imagery (17 local, rest remote).
- **Share card** feature (`share_card_created` / `share_card_shared` events).
- **Savings shown** metric (`savings_shown` event) — the emotional payoff.
- Cart persists (localStorage). Bottom-nav single-select (fixed).
- PostHog events: app_opened, restaurant_viewed, item_added_to_cart,
  cart_viewed, checkout_started, demo_order_placed, tracking_started,
  tracking_completed, savings_shown, home_food_suggestion_shown,
  helped_response_selected, share_card_created, share_card_shared,
  return_visit_detected.

## Acquisition channels (to test, in priority order — TBD)
1. **Personal network / WhatsApp** — send the link + share card to friends;
   ask for a screenshot of their first "delivery". Lowest friction.
2. **Social (Twitter/X, LinkedIn, Instagram)** — post the share card + the
   "₹X saved, 0 calories, no delivery" angle. Meme-able.
3. **College / Bengaluru local communities** — food-app fatigue is real.
4. **Product hunt / Reddit (r/india, r/bangalore, r/SideProject)** — launch.
5. **TBD** — fill in after first cohort.

## Feedback loop (how we collect REAL feedback)
- PostHog funnels: cart → checkout → demo_order_placed → tracking_completed.
  Drop-off points = what to fix next.
- In-app: `helped_response_selected` event — there's a "did this help?" moment.
- Manual: short poll / DM follow-up to first users. Ask: "What made you
  smile? What felt pointless?"
- Share card shares = strongest signal of delight.

## Experiments log
| # | Date | Channel / Hypothesis | What we did | Result (real numbers) | Next action |
|---|------|----------------------|-------------|-----------------------|-------------|
| - | 2026-07-19 | Baseline | Deployed + PostHog on | Live; events flowing | Get first 25 users |

## Open questions
- Who is the FIRST ideal user? (Broke student? Dieting person? Someone avoiding
  impulse food orders? NRI missing Indian food?)
- What's the ONE emotion we want per session? (smug savings? relieved restraint?)
- Paid vs free acquisition — user prefers free-tier-first, so lead with organic.

## Notes
- Free-tier-first: no paid ads/infra unless explicitly approved.
- PostHog EU project; key in Vercel env (NEXT_PUBLIC_POSTHOG_KEY/HOST).
- Keep this file repo-local; the strategy chat iterates on it.
