"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Star, Plus, Clock, Users, ChefHat, Wrench } from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { BottomNav } from "@/components/bottom-nav";
import { getRecipes, saveRecipes } from "@/lib/storage";
import { Recipe } from "@/lib/types";

const DIFFICULTY_STEAMING_PRESETS: Record<string, number> = {
  Easy: 20,
  Medium: 45,
  Hard: 90,
};

export default function RecipesPage() {
  const router = useRouter();
  const [recipes, setRecipes] = useState<Recipe[]>(() => getRecipes());
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({
    title: "",
    category: "North Indian",
    ingredients: "",
    instructions: "",
    difficulty: "Easy" as "Easy" | "Medium" | "Hard",
  });

  const steamingPreset = DIFFICULTY_STEAMING_PRESETS[form.difficulty];

  const addRecipe = () => {
    if (!form.title.trim() || !form.ingredients.trim() || !form.instructions.trim()) return;
    const newRecipe: Recipe = {
      id: crypto.randomUUID(),
      slug: form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
      title: form.title.trim(),
      category: form.category,
      image: "https://images.pexels.com/photos/9743517/pexels-photo-9743517.jpeg?auto=compress&cs=tinysrgb&w=900",
      rating: 4.0,
      ingredients: form.ingredients.trim(),
      instructions: form.instructions.trim(),
      steamingTimeMinutes: steamingPreset,
      servings: 2,
      difficulty: form.difficulty,
    };
    const updated = [...recipes, newRecipe];
    setRecipes(updated);
    saveRecipes(updated);
    setForm({ title: "", category: "North Indian", ingredients: "", instructions: "", difficulty: "Easy" });
    setShowAdd(false);
    router.refresh();
  };

  const difficultyIcon = {
    Easy: ChefHat,
    Medium: Wrench,
    Hard: ChefHat,
  } as const;

  return (
    <main className="min-h-screen bg-white pb-32" data-testid="recipes-page">
      <AppHeader backHref="/" title="Back to home" compact />

      <section className="px-5 pt-6" data-testid="recipes-header">
        <h1 className="text-3xl font-extrabold" data-testid="recipes-title">Recipes</h1>
        <p className="mt-1 text-sm text-neutral-500">Home-cooked staples from Indian kitchens.</p>
        <button
          type="button"
          onClick={() => setShowAdd(true)}
          className="mt-5 flex items-center gap-2 rounded-full bg-mango px-5 py-2.5 text-sm font-extrabold text-charcoal shadow-sm"
          data-testid="add-recipe-button"
        >
          <Plus size={16} /> Add a recipe
        </button>
      </section>

      {!showAdd && (
        <section className="px-5 pt-4" data-testid="recipe-cards-section">
          {recipes.length === 0 ? (
            <div className="mt-8 rounded-2xl bg-neutral-50 px-6 py-16 text-center" data-testid="recipes-empty-state">
              <p className="text-2xl font-extrabold">No recipes yet</p>
              <p className="mt-2 text-sm text-neutral-500">Be the first to share a home-cooked favourite.</p>
            </div>
          ) : (
            <div className="space-y-5">
              {recipes.map((recipe) => (
                <article key={recipe.id} className="grid grid-cols-[1fr_8rem] gap-5 border-b border-neutral-100 pb-5" data-testid={`recipe-card-${recipe.slug}`}>
                  <div className="min-w-0 py-1">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-neutral-300 bg-white text-[10px] font-bold uppercase text-neutral-600" data-testid={`recipe-category-${recipe.slug}`}>
                        {recipe.category}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-bold text-neutral-600" data-testid={`recipe-rating-${recipe.slug}`}>
                        <Star size={11} fill="currentColor" className="text-amber-400" /> {recipe.rating}
                      </span>
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${recipe.difficulty === "Easy" ? "bg-green-100 text-green-800" : recipe.difficulty === "Medium" ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800"}`} data-testid={`recipe-difficulty-${recipe.slug}`}>
                        {difficultyIcon[recipe.difficulty] === ChefHat ? <ChefHat size={11} /> : <Wrench size={11} />} {recipe.difficulty}
                      </span>
                    </div>
                    <h3 className="text-xl font-extrabold" data-testid={`recipe-title-${recipe.slug}`}>{recipe.title}</h3>
                    <p className="mt-1 flex items-center gap-1 text-xs font-bold text-neutral-500">
                      <Clock size={12} /> {recipe.steamingTimeMinutes} min
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-500 line-clamp-2">{recipe.instructions.slice(0, 120)}…</p>
                  </div>
                  <div className="relative self-start">
                    <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-neutral-100" data-testid={`recipe-image-${recipe.slug}`}>
                      <Image src={recipe.image} alt={recipe.title} fill sizes="80px" className="object-cover" />
                    </div>
                    <button
                      type="button"
                      onClick={() => router.push(`/recipe/${recipe.slug}`)}
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex h-8 w-16 items-center justify-center rounded-full bg-charcoal text-[11px] font-extrabold text-white shadow-sm"
                      data-testid={`recipe-view-${recipe.slug}`}
                    >
                      View Recipe
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      )}

      {showAdd && (
        <section className="px-5 pt-4" data-testid="add-recipe-form-section">
          <h2 className="text-xl font-extrabold" data-testid="add-recipe-form-title">Add a recipe</h2>
          <p className="mt-1 text-sm text-neutral-500">Share a home-cooked staple with the community.</p>

          <div className="mt-5 space-y-4 rounded-xl border border-neutral-200 bg-neutral-50 p-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-[.12em] text-neutral-500">Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Dal Chawal"
                  className="h-12 w-full rounded-xl border border-neutral-200 bg-white px-3 text-sm font-semibold outline-none focus:border-mango focus:ring-4 focus:ring-mango/10"
                  data-testid="add-recipe-title-input"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-[.12em] text-neutral-500">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="h-12 w-full rounded-xl border border-neutral-200 bg-white px-3 text-sm font-semibold outline-none focus:border-mango focus:ring-4 focus:ring-mango/10"
                  data-testid="add-recipe-category-select"
                >
                  <option value="North Indian">North Indian</option>
                  <option value="South Indian">South Indian</option>
                  <option value="Biryani">Biryani</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Desserts">Desserts</option>
                  <option value="Healthy">Healthy</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-[.12em] text-neutral-500">Ingredients (comma-separated)</label>
              <textarea
                value={form.ingredients}
                onChange={(e) => setForm({ ...form, ingredients: e.target.value })}
                placeholder="1 cup toor dal, 2 cups rice, turmeric, cumin, ghee..."
                rows={2}
                className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm font-semibold outline-none focus:border-mango focus:ring-4 focus:ring-mango/10 resize-none"
                data-testid="add-recipe-ingredients-input"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-[.12em] text-neutral-500">Instructions</label>
              <textarea
                value={form.instructions}
                onChange={(e) => setForm({ ...form, instructions: e.target.value })}
                placeholder="Step by step cooking method..."
                rows={3}
                className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm font-semibold outline-none focus:border-mango focus:ring-4 focus:ring-mango/10 resize-none"
                data-testid="add-recipe-instructions-input"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-[.12em] text-neutral-500">Difficulty</label>
                <div className="flex gap-2">
                  {(["Easy", "Medium", "Hard"] as const).map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setForm({ ...form, difficulty: d })}
                      className={`flex-1 rounded-xl border px-3 py-2 text-xs font-extrabold transition-all ${form.difficulty === d ? "border-mango bg-mango text-charcoal" : "border-neutral-200 bg-white text-neutral-600"}`}
                      data-testid={`add-recipe-difficulty-${d.toLowerCase()}`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
                <p className="mt-1 text-[10px] text-neutral-400">Steam time preset: {steamingPreset} min</p>
              </div>
              <div className="flex items-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAdd(false)}
                  className="flex h-12 w-full items-center justify-center rounded-xl border border-neutral-200 bg-white px-4 text-sm font-extrabold text-neutral-600"
                  data-testid="add-recipe-cancel-button"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={addRecipe}
                  className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-mango px-4 text-sm font-extrabold text-charcoal shadow-sm"
                  data-testid="add-recipe-submit-button"
                >
                  <Plus size={14} /> Add Recipe
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      <BottomNav />
    </main>
  );
}
