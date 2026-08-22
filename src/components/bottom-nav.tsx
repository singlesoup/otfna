"use client";

import Link from "next/link";
import { Clock3, ChefHat, Home, Search, RotateCcw } from "lucide-react";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "Home", icon: Home },
  { href: "/wheel", label: "Wheel", icon: RotateCcw },
  { href: "/recipes", label: "Recipes", icon: ChefHat },
  { href: "/history", label: "History", icon: Clock3 },
  { href: "/#search", label: "Search", icon: Search },
];

export const BottomNav = () => {
  const pathname = usePathname();
  return (
    <nav className="safe-bottom fixed bottom-0 z-40 flex w-full max-w-[30rem] justify-around border-t border-black/[.06] bg-white/95 px-3 pt-2 backdrop-blur-xl" aria-label="Primary navigation" data-testid="bottom-navigation">
      {items.map(({ href, label, icon: Icon }) => {
        const active = href === "/history"
          ? pathname.startsWith("/history")
          : href === "/recipes"
            ? pathname === "/recipes" || pathname.startsWith("/recipe/")
            : href === "/"
              ? pathname === "/"
              : false;
        return <Link key={label} href={href} className={`flex min-w-20 flex-col items-center gap-1 rounded-xl py-1.5 text-[11px] font-bold transition-colors ${active ? "text-charcoal" : "text-neutral-400 hover:text-neutral-700"}`} data-testid={`bottom-nav-${label.toLowerCase()}-link`}><Icon size={19} fill={active ? "#FFC000" : "none"} /><span>{label}</span></Link>;
      })}
    </nav>
  );
};
