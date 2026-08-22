"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { Star, Clock, Users, ChefHat, Wrench } from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { BottomNav } from "@/components/bottom-nav";
import { getRecipes } from "@/lib/storage";
import { Recipe } from "@/lib/types";

export default function RecipeDetailPage() {
  const router = useRouter();
  const { slug } = useParams<{ slug: string }>();
  const recipes = getRecipes();
  const recipe = recipes.find((r) => r.slug === slug);

  if (!recipe) {
    return (
      <main className="min-h-screen bg-white pb-32" data-testid="recipe-not-found">
        <AppHeader backHref="/recipes" title="Back to recipes" compact />
        <section className="px-5 pt-8">
          <div className="mt-16 rounded-2xl bg-neutral-50 px-6 py-16 text-center">
            <p className="text-2xl font-extrabold">Recipe not found</p>
            <p className="mt-2 text-sm text-neutral-500">This recipe may have been removed.</p>
            <button
              type="button"
              onClick={() => router.push("/recipes")}
              className="mt-6 flex items-center justify-center gap-2 rounded-full bg-mango px-5 py-2.5 text-sm font-extrabold text-charcoal"
              data-testid="recipe-back-to-list"
            >
              Back to Recipes
            </button>
          </div>
        </section>
        <BottomNav />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white pb-32" data-testid="recipe-detail-page">
      <AppHeader backHref="/recipes" title="Back to recipes" compact />

      <section className="relative aspect-[1.45/1] overflow-hidden bg-neutral-100 px-5 pt-3" data-testid="recipe-detail-hero">
        <Image src={recipe.image} alt={recipe.title} fill sizes="480px" priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/05 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          <p className="mb-2 inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-bold backdrop-blur-md text-white" data-testid={`recipe-detail-category-${recipe.slug}`}>
            {recipe.category}
          </p>
          <h1 className="text-3xl font-extrabold" data-testid={`recipe-detail-title-${recipe.slug}`}>{recipe.title}</h1>
        </div>
      </section>

      <div className="border-t border-neutral-100 bg-white">
        <div className="mx-5 grid grid-cols-3 divide-x divide-neutral-100 rounded-b-2xl border border-t-0 border-neutral-100 bg-white py-4 text-center shadow-card">
          <div>
            <p className="flex items-center justify-center gap-1 text-sm font-extrabold text-amber-600" data-testid={`recipe-detail-rating-${recipe.slug}`}>
              <Star size={13} fill="currentColor" /> {recipe.rating}
            </p>
            <small className="text-[10px] text-neutral-400">Rating</small>
          </div>
          <div>
            <p className="text-sm font-extrabold" data-testid={`recipe-detail-steaming-${recipe.slug}`}>{recipe.steamingTimeMinutes} min</p>
            <small className="text-[10px] text-neutral-400">Steaming time</small>
          </div>
          <div>
            <p className="text-sm font-extrabold" data-testid={`recipe-detail-servings-${recipe.slug}`}>{recipe.servings} servings</p>
            <small className="text-[10px] text-neutral-400">Servings</small>
          </div>
        </div>
      </div>

      <section className="px-5 pt-6" data-testid="recipe-detail-content">
        <div className="mb-4 flex items-center gap-2">
          <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-bold ${recipe.difficulty === "Easy" ? "bg-green-100 text-green-800" : recipe.difficulty === "Medium" ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800"}`} data-testid={`recipe-detail-difficulty-${recipe.slug}`}>
            {recipe.difficulty === "Easy" ? <ChefHat size={12} /> : <Wrench size={12} />} {recipe.difficulty}
          </span>
          <span className="text-[11px] font-bold uppercase tracking-[.14em] text-neutral-400" data-testid={`recipe-detail-category-label-${recipe.slug}`}>{recipe.category}</span>
        </div>

        <div className="mb-5">
          <h2 className="mb-3 flex items-center gap-2 text-lg font-extrabold">
            <Star size={16} className="text-amber-400" /> Ingredients
          </h2>
          <p className="rounded-xl bg-neutral-50 p-4 text-sm leading-relaxed text-neutral-700 whitespace-pre-wrap" data-testid={`recipe-detail-ingredients-${recipe.slug}`}>
            {recipe.ingredients}
          </p>
        </div>

        <div>
          <h2 className="mb-3 flex items-center gap-2 text-lg font-extrabold">
            <Clock size={16} className="text-mango" /> Instructions
          </h2>
          <p className="rounded-xl bg-neutral-50 p-4 text-sm leading-relaxed text-neutral-700 whitespace-pre-wrap" data-testid={`recipe-detail-instructions-${recipe.slug}`}>
            {recipe.instructions}
          </p>
        </div>

        <div className="mt-6 flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={() => router.push("/recipes")}
            className="flex items-center gap-2 rounded-full bg-mango px-5 py-2.5 text-sm font-extrabold text-charcoal"
            data-testid={`recipe-detail-back-${recipe.slug}`}
          >
            <Users size={14} /> Back to Recipes
          </button>
        </div>
      </section>

      <BottomNav />
    </main>
  );
}
