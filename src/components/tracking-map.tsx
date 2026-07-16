"use client";

import { Bike, Home, Store } from "lucide-react";
import { motion } from "framer-motion";

export const TrackingMap = ({ progress }: { progress: number }) => {
  const t = Math.min(1, Math.max(0, progress));
  const x = 56 + (356 - 56) * t;
  const y = (1 - t) * (1 - t) * 205 + 2 * (1 - t) * t * 48 + t * t * 146;
  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border border-black/[.05] bg-[#F4F1E8]" data-testid="abstract-tracking-map">
      <svg viewBox="0 0 420 260" className="block h-auto w-full" role="img" aria-label="Abstract route from restaurant to Home">
        <path d="M -10 72 C 95 34, 125 80, 210 45 S 345 34, 440 65" fill="none" stroke="#E7E1D4" strokeWidth="18" />
        <path d="M -15 225 C 94 164, 126 236, 230 208 S 352 185, 440 214" fill="none" stroke="#E7E1D4" strokeWidth="24" />
        <path d="M 35 -10 C 68 68, 12 120, 56 270" fill="none" stroke="#E7E1D4" strokeWidth="14" />
        <path d="M 365 -10 C 330 72, 395 132, 350 270" fill="none" stroke="#E7E1D4" strokeWidth="16" />
        <path d="M56 205 Q206 48 356 146" fill="none" stroke="#D4CEC1" strokeWidth="5" strokeDasharray="8 10" strokeLinecap="round" />
        <motion.path d="M56 205 Q206 48 356 146" fill="none" stroke="#FFC000" strokeWidth="6" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: t }} transition={{ duration: .7, ease: "easeOut" }} />
        <circle cx="56" cy="205" r="13" fill="#fff" stroke="#1A1A1A" strokeWidth="3" />
        <circle cx="356" cy="146" r="13" fill="#fff" stroke="#2E7D32" strokeWidth="3" />
        <motion.circle cx={x} cy={y} r="20" fill="#1A1A1A" animate={{ cx: x, cy: y }} transition={{ duration: .8, ease: "easeOut" }} />
      </svg>
      <div className="absolute bottom-[12%] left-[7%] flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-[10px] font-extrabold shadow-md" data-testid="tracking-origin-label"><Store size={14} className="text-amber-700" /> Restaurant</div>
      <div className="absolute right-[5%] top-[43%] flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-[10px] font-extrabold shadow-md" data-testid="tracking-destination-label"><Home size={14} className="text-savings" /> Home</div>
      <motion.div animate={{ left: `${12 + t * 69}%`, top: `${70 - Math.sin(t * Math.PI) * 42 - t * 18}%` }} transition={{ duration: .8, ease: "easeOut" }} className="absolute grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-charcoal text-mango shadow-lg" aria-hidden><Bike size={16} /></motion.div>
      <div className="absolute bottom-3 right-3 rounded-full bg-white/80 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-neutral-500 backdrop-blur">Abstract demo map</div>
    </div>
  );
};
