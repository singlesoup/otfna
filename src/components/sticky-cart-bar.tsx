"use client";

import Link from "next/link";
import { ChevronRight, ShoppingBag } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useOrder } from "@/context/order-context";

export const StickyCartBar = () => {
  const { cart, bill } = useOrder();
  const count = cart.reduce((sum, line) => sum + line.quantity, 0);
  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div initial={{ y: 90, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 90, opacity: 0 }} className="safe-bottom fixed bottom-[4.15rem] z-30 w-full max-w-[30rem] px-4" data-testid="sticky-cart-container">
          <Link href="/cart" className="flex items-center justify-between rounded-2xl bg-charcoal px-4 py-3.5 text-white shadow-2xl transition-transform active:scale-[.98]" data-testid="view-cart-link">
            <span className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-mango text-charcoal"><ShoppingBag size={19} /></span><span><strong className="block text-sm">{count} {count === 1 ? "item" : "items"}</strong><small className="text-white/60">₹{bill.total} estimated</small></span></span>
            <span className="flex items-center gap-1 text-sm font-extrabold">View cart <ChevronRight size={17} /></span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
