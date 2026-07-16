"use client";

import Link from "next/link";
import { ChevronDown, Clock3, MapPin } from "lucide-react";

type AppHeaderProps = { compact?: boolean; title?: string; backHref?: string };

export const AppHeader = ({ compact = false, title, backHref }: AppHeaderProps) => (
  <header className="sticky top-0 z-40 border-b border-black/[.06] bg-white/95 px-5 py-3 backdrop-blur-xl" data-testid="app-header">
    <div className="flex items-center justify-between gap-4">
      <div className="min-w-0">
        {backHref ? (
          <Link href={backHref} className="inline-flex items-center gap-2 text-sm font-bold" data-testid="header-back-link">
            <span aria-hidden>←</span><span className="truncate">{title}</span>
          </Link>
        ) : (
          <div data-testid="home-location-label">
            <p className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-[.16em] text-neutral-400"><MapPin size={12} /> Delivering to</p>
            <button className="mt-0.5 flex items-center gap-1 text-base font-extrabold" data-testid="location-home-button" type="button">Home <ChevronDown size={15} /></button>
          </div>
        )}
      </div>
      <Link href="/" className="flex items-center gap-2" data-testid="header-brand-link" aria-label="OTFNA home">
        {!compact && <span className="hidden text-[10px] font-semibold uppercase tracking-[.18em] text-neutral-400 sm:block">Only The Food<br />Never Arrives</span>}
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-mango font-[Manrope] text-[11px] font-extrabold tracking-tight text-charcoal">OTFNA</span>
      </Link>
    </div>
    {!backHref && <p className="mt-2 flex items-center gap-1 text-[11px] font-medium text-neutral-400" data-testid="demo-header-note"><Clock3 size={11} /> Browse like it&apos;s real. Every order here is only a demo.</p>}
  </header>
);
