# Gates: T2 — Recipes feature

**Deliverable:** A `/recipes` page listing recipe cards, each clickable to `/recipe/[slug]`, plus an "Add a recipe" form. Plus a Recipes nav item on the bottom nav.

**Scope (locked):**
- `/recipes` page: recipe cards grid + "Add a recipe" button that scrolls to form
- `/recipe/[slug]` page: single recipe detail (title, image, rating, ingredients, instructions, steaming time, servings, category, difficulty)
- "Add a recipe" form on `/recipes` page: title, category, ingredients (comma-separated), instructions (textarea), difficulty (Easy/Medium/Hard), difficulty-dependent steaming time preset
- Recipes nav item on bottom nav (between History and Home, order: Home | Recipes | History | Search... actually we'll place it sensibly)
- Data: `src/data/recipes.ts` — array of recipe objects
- Persistence: localStorage `otfna.recipes.v1` — seed on first visit if empty, append added recipes

**Out of scope (locked):**
- Editing/deleting recipes (future)
- Image upload (use pexels/unsplash URLs in recipe data)
- Recipe search/filter beyond the existing search pattern
- Responsive breakpoint perfection (portfolio-level, not MVP)

**Checklist:**

- [ ] G1: `src/data/recipes.ts` exists with ≥3 seeded recipes, each with: id, slug, title, category, image (pexels/unsplash URL), rating, ingredients (string), instructions (string), steamingTimeMinutes, servings, difficulty
  - CHECK: `node -e "const r=require('./src/data/recipes.ts'); console.log('count='+r.default.length)"` — wait, TS. Use grep.
  - CHECK: `grep -c "slug:" src/data/recipes.ts` — expect ≥3
  - EXPECT: count ≥3
  - EVIDENCE: pending

- [ ] G2: `/recipes` page renders (npm build passes, page returns 200)
  - CHECK: `curl -s -o /dev/null -w "%{http_code}" --max-time 5 http://localhost:3000/recipes`
  - EXPECT: 200
  - EVIDENCE: pending

- [ ] G3: `/recipes` page shows recipe cards (data-testid `recipe-card-{slug}` for each seeded recipe)
  - CHECK: browser_navigate to /recipes, browser_vision, count recipe cards
  - EXPECT: ≥3 recipe cards visible
  - EVIDENCE: pending

- [ ] G4: Clicking a recipe card navigates to `/recipe/[slug]`
  - CHECK: browser_navigate to /recipe/<first-slug>, confirm page renders recipe detail
  - EXPECT: recipe detail page renders with title matching card
  - EVIDENCE: pending

- [ ] G5: Recipe detail page shows all recipe fields (title, image, rating, ingredients, instructions, steamingTime, servings, difficulty)
  - CHECK: browser_vision on /recipe/[slug], count visible fields
  - EXPECT: all fields present
  - EVIDENCE: pending

- [ ] G6: "Add a recipe" form exists on `/recipes` page, submit adds a recipe, new recipe appears in list
  - CHECK: browser_type into form fields, browser_click submit, browser_vision confirms new card appears
  - EXPECT: new recipe visible in list after submit
  - EVIDENCE: pending

- [ ] G7: Recipes nav item exists on bottom nav (data-testid `bottom-nav-recipes-link`)
  - CHECK: browser_navigate to /, browser_vision, find nav item
  - EXPECT: nav item present, href="/recipes"
  - EVIDENCE: pending

- [ ] G8: Clicking Recipes nav item navigates to /recipes
  - CHECK: browser_click on nav item, browser_vision confirms /recipes renders
  - EXPECT: /recipes page
  - EVIDENCE: pending

- [ ] G9: `npm run build` passes (no TS/next errors)
  - CHECK: `npm run build 2>&1 | tail -3`
  - EXPECT: exit 0, no errors
  - EVIDENCE: pending

- [ ] G10: Empty state handled — if localStorage empty (no recipes), page shows a friendly empty state
  - CHECK: browser_console: `localStorage.removeItem('otfna.recipes.v1'); location.reload()` then check page
  - EXPECT: empty state message visible
  - EVIDENCE: pending
