# V1 Build — Scope & Next Steps

Branched from `main` (commit 36f9512). `v1-build` is the working branch for new features; we commit/push here, preview, then merge to `main` → auto-deploy.

This doc captures the **delta between what's already built (main) and what the Product Design doc asks for in V1**. It's the source of truth for what to build first. Keep it updated as we cut scope or add items.

## What EXISTS on main (don't re-build)
- 8-screen fake-order loop: browse → cart → checkout → tracking → delivered.
- Bottom-nav (Home / Search / History), single-select fixed.
- Cart persistence (localStorage).
- Per-dish images (17 local, rest remote).
- PostHog (EU) wired — 15 product events (app_opened, item_added_to_cart,
  cart_viewed, checkout_started, demo_order_placed, tracking_started,
  tracking_completed, savings_shown, help_response_selected,
  share_card_created, share_card_shared, return_visit_detected, etc.).
- Savings shown as total ₹ on the delivered page + share card (native share +
  download).
- Share card: "I skipped a ₹X order with OTFNA."
- Local storage hygiene: .env* / .vercel ignored.

## V1 scope — from Product Design doc (the backlog)

The doc defines 3 personas and lists `Solutions:` per persona. V1 = all the
Solutions items + the explicit TODOs at the end of the doc.

### A. Recipes / Meal Suggester tab (Tired Convenience Seeker)
- Bottom-nav item: a **Recipes/Meal Suggester tab**.
- Quick, tasty, filling meals to cook — with pictures (the doc says pics help
  activate users to cook).
- Don't hide recipes behind the order flow; make it a first-class tab.
- Matches the doc line: "The Meal suggester or Recipes gets a tab in bottom
  nav, to avoid the user to only see recipes only when order is placed."
- Browse on the internet to find recepies for the following easy to cook Indian dishes:
  	- dal chawal
	- Rajma chawal
	- paneer rice
	- chole chawal
	- veg pulao
	- upma
	- oats
	- chicken breast grilled
	- eggs
	- ommlette
	- bread cheese sandwich
	- Pasta
	- one-pot recipes like Soya Pulao or Soya Biryani
    - Kadi chawal

### B. Goal-based savings visualization (Budget-Conscious Habit-Breaker)
- V1: "20% money saved for a PS5, iPhone or Bike." Show savings against a
  concrete goal, not just a raw ₹ total.
- Make the savings page/show the goal progress alongside the ₹-saved number.
- V2 (defer): custom goals + target amount.

### C. Wheel of Fortune (Bored Impulse-Orderer)
- "Wheel of Fortunes for extra discounts" + "Limited Turns which are
  replenished daily."
- Scope V1 to: a wheel that spins, awards a discount/coupon, and has a daily
  turn budget (localStorage-stored). Keep it light — it's a dopamine hook, not
  a real economy.

### D. Streak-based Tree watering (Bored Impulse-Orderer + Habit-Breaker)
- "Streak based Tree watering feature, the more the streaks the bigger the
  plant gets." + guardrail: "Keep daily Streak count."
- A visual plant/tree that grows with daily streaks. Front-end prop/growth
  levels; the streak is the habit-anchor.
- Likely lives on the delivered/history or a new "streak" surface.

### E. Hunger Meter (0–5) (cross-persona, doc assumption)
- "Hunger Meter (0 to 5) and only order when you are too hungry."
- Simple 0–5 selector, probably early in the ordering flow. The doc frames it
  as a friction point ("only order when you are too hungry").

### F. Limited-time offers with Timer (Impulse-Orderer)
- "Limited Time offers with Timer for Urgency."
- A time-boxed offer/countdown on the ordering or cart surface.

### G. Landing page (explicit TODO)
- A standalone landing page explaining: what OTFNA is, who it's for, why it
  was built, problems it solves, benefits, features.
- Then funnel into the app.
- Inspiration: foodnevercomes.com + its blog.
- Placement: a root page (e.g. `/landing` or the app's entry point) before the
  app proper. Decide entrypoint tie-in.

### H. Donation section
- "Buy me a coffee or Donation button on google pay QR code."

### I. About section
- "About me and why I built this."
- Check if we want to About section as a Bottom Sheet like in following link:
  - https://www.xn--lz2bv9nd1bm2a9lo9a.com/

---

## What to PRIORITIZE for V1 (my read — adjust with you)

Order by impact on the core habit-breaking promise + visibility:

1. **Goal-based savings visualization** — the emotional payoff of the whole app
   (money saved toward a real thing). High impact, low complexity.
2. **Wheel of Fortune** — the dopamine hook the doc calls out for the biggest
   persona segment (~40% Impulse-Orderer). Fun + sticky.
3. **Recipes tab** — the "what to cook instead" answer for the Convenience
   Seeker. Directly serves the habit-breaking promise.
4. **Streak tree** — habit anchor + retention. Worth doing if we want a
   "come back tomorrow" mechanic.
5. **Landing page** — needed for outsiders to understand OTFNA before the app.
   Also the shareable face of the product.
6. **Hunger Meter** — quick friction insert; lower effort, but real behavioral
   signal.
7. **Limited-time offer timer** — nice-to-have urgency; can fold into wheel or
   cart.
8. **Donation + About** — table stakes / trust building; low complexity,
   ship together near the end.

---

## The two repos — brutal, honest analysis

Both are **AI-agent SKILL.md files** (installed into a coding agent's skills
dir, e.g. `~/.claude/skills/`), NOT project dependencies, NOT something OTFNA
`package.json` should pull. They govern *how the coding agent behaves*, not
what the app runs at runtime. So the question isn't "install as a dep," it's
"invoke this skill when building V1 features" or "don't bother."

### `Leonxlnx/unlazy` — anti-laziness skill for AI agents

What it actually is: a SKILL.md + zero-dependency Node scripts. Before real
work, the agent writes acceptance gates to GATES.md; a `gate-check.mjs` runs
CHECK commands and flips boxes only when EXPECT matches (claims = unchecked, a
checkbox alone is a claim, evidence is proof); for big builds it fans out leaves
as fresh subagents with fresh context; on Claude Code it can install a Stop hook
that mechanically blocks ending the turn while gates are unmet. Target failure
mode: premature "done" reports, absent evidence, confidently wrong numbers in
final summaries.

Honest verdict for OTFNA: **not needed as a hard install.** Your existing flow
(build on feature branch → verify locally + user previews at localhost →
merge to main → auto-deploy) already gives you a real acceptance gate, and the
user is the actual acceptance check. Adding unlazy's gates would layer process
overhead on top of a flow that already produces verified, previewed work. The
hard Stop hook is Claude Code only; the rest is markdown you paste as a system
prompt. For OTFNA's scope (a defined V1 feature set, not an open-ended research
project), the ROI of enforced gates is low.

One plausible use: if, during V1, the agent starts shipping stubs/half-done
screens without testing them, unlazy's gates + checks could catch it before you
see it. But that's reactive, not a starting dependency. Skip it for now; revisit
only if delivery quality slips.

### `Leonxlnx/taste-skill` — anti-slop frontend design skill for AI agents

What it actually is: a family of SKILL.md files (install via `npx skills add`
or copy/paste). The default skill (`design-taste-frontend`, now v2 experimental)
reads the brief, infers the design language, tunes three dials (DESIGN_VARIANCE /
MOTION_INTENSITY / VISUAL_DENSITY), has a hard em-dash ban, canonical GSAP
motion skeletons, a redesign-audit protocol, and a strict pre-flight check.
Also image-generation skills (web comps, mobile flows, brand kits) to produce
reference frames, then hand to the coding agent. Framework-agnostic
(React/Vue/Svelte). Multiple variants: gpt-taste (stricter for GPT/Codex),
soft-skill (calm/expensive), minimalist-skill (Notion/Linear), brutalist-skill
(hard mechanical), output-skill (full output, no stubs).

Honest verdict for OTFNA: **selectively useful, not a required dependency.**
The V1 features that are most UI-heavy — landing page, recipes tab, wheel of
fortune, streak tree, goal-based savings visualization — are exactly where
"AI-built generic Tailwind" tends to look boilerplate-y, and where taste-skill's
rules (asymmetric layouts, motion, spacing, anti-repetition) could lift them
toward something that actually looks *designed*, which the doc implicitly wants
("pictures of meals help activate users to cook," growth visualizations, a plant
that grows with streaks).

Caveats:
- It's a *general* skill, not OTFNA-specific. You still implement product logic
  yourself; taste-skill only guides aesthetic choices.
- It's v2 (experimental), iterating toward v2.0.0 stable. Pinning to it either
  means chasing updates or locking to v1. For a fast MVP cadence, that's a
  moving target.
- Your pipeline is already multi-AI (v0 scaffold → GPT-5.6 polish → agent
  deploy). taste-skill could slot into the polish/design phase, but you could
  also fold the specific taste rules you care about directly into the V1 build
  prompts — cheaper than installing a skill whose dials you'd tune anyway.
- Mild tension with "vibe-code fast MVP": taste-skill leans toward premium/
  anti-slop polish, which can slow the MVP if applied everywhere. Apply it
  *selectively* to the new UI surfaces, not the whole app.

Recommendation: **don't install it as a hard dependency.** But **do consider
invoking `design-taste-frontend` (or folding its key rules in) when building the
V1 landing page, recipes tab, wheel of fortune, streak tree, and goal
visualization.** Those are the surfaces where design taste matters and AI defaults
to slop. Treat it as optional design guidance, not a build requirement.

---

## Hard no's / scope guardrails (from doc + your preferences)

- Free-tier-first: no paid infra/ads unless explicitly approved.
- No backend/accounts for V1 — localStorage + Vercel, same as now. Any "streak"
  or "wheel turns" state is local.
- No feature creep beyond the doc's V1 list above.
- V2 items (custom goals, anything beyond doc's explicit V1 list) stay deferred.
