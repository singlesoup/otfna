"use client";
import { Wheel } from "@/components/wheel";
import { AppHeader } from "@/components/app-header";
import { BottomNav } from "@/components/bottom-nav";

export default function WheelPage() {
  return (
    <main className="min-h-screen bg-canvas px-5 py-8 text-charcoal" data-testid="wheel-page">
      <AppHeader backHref="/" title="Wheel of Fortune" compact />
      <Wheel />
      <BottomNav />
    </main>
  );
}