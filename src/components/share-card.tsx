"use client";

import { Download, Share2 } from "lucide-react";
import { toast } from "sonner";
import { track } from "@/lib/analytics";

const createCard = async (amount: number) => {
  const canvas = document.createElement("canvas");
  canvas.width = 1080; canvas.height = 1350;
  const context = canvas.getContext("2d");
  if (!context) return null;
  context.fillStyle = "#FFC000"; context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#1A1A1A"; context.fillRect(72, 72, 936, 1206);
  context.fillStyle = "#FFC000"; context.font = "800 58px sans-serif"; context.fillText("OTFNA", 130, 190);
  context.fillStyle = "#FFFFFF"; context.font = "700 74px sans-serif"; context.fillText("Fake delivered.", 130, 440); context.fillText("Real money saved.", 130, 535);
  context.fillStyle = "#FFC000"; context.font = "800 176px sans-serif"; context.fillText(`₹${amount}`, 130, 800);
  context.fillStyle = "#B8B8B8"; context.font = "500 38px sans-serif"; context.fillText("Skipped today. Wallet protected.", 130, 910);
  context.fillStyle = "#FFFFFF"; context.font = "600 32px sans-serif"; context.fillText("Only The Food Never Arrives", 130, 1160);
  return new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
};

export const ShareCard = ({ amount }: { amount: number }) => {
  const share = async () => {
    const blob = await createCard(amount);
    if (!blob) return;
    track("share_card_created", { amount });
    const file = new File([blob], `otfna-saved-${amount}.png`, { type: "image/png" });
    if (navigator.canShare?.({ files: [file] })) {
      await navigator.share({ title: "Fake delivered. Real money saved.", text: `I skipped a ₹${amount} order with OTFNA.`, files: [file] });
      track("share_card_shared", { method: "native" });
      return;
    }
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a"); link.href = url; link.download = file.name; link.click();
    URL.revokeObjectURL(url); track("share_card_shared", { method: "download" });
    toast.success("Share card downloaded.");
  };

  return (
    <section className="overflow-hidden rounded-[1.6rem] bg-charcoal p-5 text-white" data-testid="share-card-section">
      <div className="rounded-2xl border border-white/10 bg-white/[.06] p-5">
        <p className="text-xs font-extrabold uppercase tracking-[.16em] text-mango">OTFNA</p>
        <p className="mt-8 text-2xl font-extrabold leading-tight">Skipped a ₹{amount} order today.</p>
        <p className="mt-3 text-sm text-white/55">Craving handled. Wallet protected.</p>
      </div>
      <button onClick={() => void share()} type="button" className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-mango text-sm font-extrabold text-charcoal transition-transform active:scale-[.98]" data-testid="share-savings-card-button"><Share2 size={17} /> Share savings card <Download size={15} /></button>
    </section>
  );
};
