"use client";

import { Goal, goalBySlug } from "@/data/goals";
import { useOrder } from "@/context/order-context";

export function GoalProgress() {
  const { goal, history, hydrated } = useOrder();
  if (!hydrated || !goal) return null;
  const g = goalBySlug(goal);
  if (!g) return null;
  const saved = history.reduce((sum, o) => sum + o.bill.total, 0);
  const pct = Math.min(100, Math.round((saved / g.targetAmount) * 100));
  const remaining = Math.max(0, g.targetAmount - saved);
  const spare = saved - g.targetAmount;
  const suggestion = spare > 0
    ? `You hit ${g.name} — ₹${spare.toLocaleString("en-IN")} spare. Treat yourself or lock in the next goal.`
    : remaining > 0
    ? `${g.emoji} ${g.name} is ${g.targetAmount - saved > 0 ? Math.round((g.targetAmount - saved) / 1000) + "k" : ""} away. At ~₹400 per fake delivery, you're roughly ${Math.round((g.targetAmount - saved) / 400)} orders from it.`
    : `You hit ${g.name}.`;
  return (
    <section className="rounded-[1.6rem] bg-white p-5 shadow-card" data-testid="goal-progress-section">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[.13em] text-neutral-400"><span aria-hidden="true">{g.emoji}</span> Your savings goal</p>
          <p className="mt-1 text-xl font-extrabold" data-testid="goal-name">{g.name}</p>
        </div>
        <span className="flex h-9 w-9 items-center justify-center rounded-full text-white font-bold" style={{ backgroundColor: g.color }} data-testid="goal-color-badge">{pct}%</span>
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-3">
        <span className="text-sm text-neutral-500">Saved towards it</span>
        <span className="text-lg font-extrabold text-savings" data-testid="goal-saved-amount">₹{saved.toLocaleString("en-IN")}</span>
      </div>
      <div className="mt-3 h-2.5 rounded-full bg-neutral-100 overflow-hidden">
        <div className="h-full rounded-full transition-all duration-500 ease-out" style={{ width: `${pct}%`, backgroundColor: g.color }} data-testid="goal-progress-bar" />
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-3">
        <span className="text-sm text-neutral-500">Target</span>
        <span className="text-lg font-extrabold text-neutral-700" data-testid="goal-target-amount">₹{g.targetAmount.toLocaleString("en-IN")}</span>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-neutral-600" data-testid="goal-suggestion">{suggestion}</p>
    </section>
  );
}
