"use client";

import { Minus, Plus } from "lucide-react";
import { motion } from "framer-motion";

type QuantityStepperProps = {
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
  testId: string;
};

export const QuantityStepper = ({ quantity, onAdd, onRemove, testId }: QuantityStepperProps) => {
  if (!quantity) {
    return <motion.button whileTap={{ scale: .9 }} onClick={onAdd} type="button" className="min-w-20 rounded-xl border border-savings/30 bg-white px-4 py-2 text-xs font-extrabold text-savings shadow-md" data-testid={`${testId}-add-button`}>ADD</motion.button>;
  }

  return (
    <motion.div layout className="flex min-w-24 items-center justify-between rounded-xl border border-savings/25 bg-white p-1 text-savings shadow-md" data-testid={`${testId}-stepper`}>
      <button onClick={onRemove} type="button" className="grid h-7 w-7 place-items-center rounded-lg transition-colors hover:bg-green-50" aria-label="Decrease quantity" data-testid={`${testId}-decrease-button`}><Minus size={14} /></button>
      <motion.span key={quantity} initial={{ scale: .7 }} animate={{ scale: 1 }} className="text-sm font-extrabold" data-testid={`${testId}-quantity`}>{quantity}</motion.span>
      <button onClick={onAdd} type="button" className="grid h-7 w-7 place-items-center rounded-lg transition-colors hover:bg-green-50" aria-label="Increase quantity" data-testid={`${testId}-increase-button`}><Plus size={14} /></button>
    </motion.div>
  );
};
