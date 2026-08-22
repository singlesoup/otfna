"use client";

import { useEffect, useState } from "react";
import { Flame, Trophy } from "lucide-react";
import { getStreak, StreakState } from "@/lib/storage";
import { useOrder } from "@/context/order-context";

export function StreakTree() {
  const { history, hydrated } = useOrder();
  const [streak, setStreak] = useState<StreakState>({ currentStreak: 0, longestStreak: 0, lastOrderDate: "" });

  useEffect(() => {
    if (hydrated) {
      setStreak(getStreak());
    }
  }, [hydrated]);

  if (!hydrated || history.length === 0) return null;
  if (streak.currentStreak === 0 && streak.longestStreak === 0) return null;

  return (
    <section className="mt-6 rounded-2xl bg-white p-5 shadow-card" data-testid="streak-tree-section">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[.14em] text-neutral-400">Streak</p>
          <p className="mt-1 text-2xl font-extrabold text-charcoal" data-testid="streak-current">
            <Flame className="mr-1 inline h-5 w-5 text-mango" />
            {streak.currentStreak} day streak
          </p>
        </div>
        <div className="text-right">
          <p className="text-[11px] font-bold uppercase tracking-[.14em] text-neutral-400">Best</p>
          <p className="mt-1 text-lg font-extrabold text-savings" data-testid="streak-longest">
            <Trophy className="mr-1 inline h-4 w-4" />
            Longest: {streak.longestStreak} days
          </p>
        </div>
      </div>
    </section>
  );
}
