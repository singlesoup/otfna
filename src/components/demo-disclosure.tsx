import { ShieldCheck } from "lucide-react";

export const DemoDisclosure = ({ compact = false }: { compact?: boolean }) => (
  <aside className={`rounded-2xl border border-amber-200 bg-amber-50 ${compact ? "p-3" : "p-4"}`} data-testid="demo-disclosure">
    <div className="flex items-start gap-3">
      <ShieldCheck className="mt-0.5 shrink-0 text-amber-700" size={19} />
      <div>
        <p className="text-sm font-extrabold text-amber-950">This is a demo order</p>
        <p className="mt-1 text-xs leading-relaxed text-amber-900/75" data-testid="demo-disclosure-text">No real payment will be collected. No restaurant receives this order. No real food will arrive.</p>
      </div>
    </div>
  </aside>
);
