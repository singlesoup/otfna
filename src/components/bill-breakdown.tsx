import { Bill } from "@/lib/types";

export const BillBreakdown = ({ bill }: { bill: Bill }) => (
  <section className="rounded-2xl border border-black/[.06] bg-white p-5 shadow-card" data-testid="bill-breakdown">
    <h2 className="text-base font-extrabold">Bill details</h2>
    <dl className="mt-4 space-y-3 text-sm">
      <div className="flex justify-between"><dt className="text-neutral-500">Item total</dt><dd data-testid="bill-item-total">₹{bill.itemTotal}</dd></div>
      <div className="flex justify-between"><dt className="text-neutral-500">Delivery fee</dt><dd data-testid="bill-delivery-fee">₹{bill.deliveryFee}</dd></div>
      <div className="flex justify-between"><dt className="text-neutral-500">Taxes &amp; platform fee</dt><dd data-testid="bill-taxes">₹{bill.taxes}</dd></div>
      {bill.discount > 0 && <div className="flex justify-between font-semibold text-savings"><dt>Coupon discount</dt><dd data-testid="bill-discount">−₹{bill.discount}</dd></div>}
      <div className="flex justify-between border-t border-dashed border-neutral-200 pt-4 text-base font-extrabold"><dt>To Pay</dt><dd data-testid="bill-total">₹{bill.total}</dd></div>
    </dl>
    <p className="mt-3 text-[11px] leading-relaxed text-neutral-400" data-testid="bill-demo-note">Simulated total only. No money is charged anywhere in OTFNA.</p>
  </section>
);
