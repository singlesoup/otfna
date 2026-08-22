"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Trophy, RotateCcw } from "lucide-react";

const PRIZES = [
  "Free delivery",
  "50% off",
  "₹50 coupon",
  "Try again",
  "Free dessert",
  "Double points",
];

const WHEEL_KEY = "otfna.wheel.v1";

type WheelState = {
  turnsRemaining: number;
  lastSpinDate: string;
};

function getDefaultState(): WheelState {
  return { turnsRemaining: 3, lastSpinDate: todayStr() };
}

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

function loadState(): WheelState {
  if (typeof window === "undefined") return getDefaultState();
  try {
    const raw = localStorage.getItem(WHEEL_KEY);
    if (!raw) return getDefaultState();
    const parsed = JSON.parse(raw) as WheelState;
    const today = todayStr();
    if (parsed.lastSpinDate < today) {
      return { turnsRemaining: 3, lastSpinDate: today };
    }
    return parsed;
  } catch {
    return getDefaultState();
  }
}

function saveState(state: WheelState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(WHEEL_KEY, JSON.stringify(state));
}

function getPrizeForIndex(index: number): string {
  return PRIZES[index % PRIZES.length];
}

function getRotationForIndex(index: number): number {
  const segmentAngle = 360 / PRIZES.length;
  // Pointer is at top (0deg). To land on segment `index`, rotate wheel so that
  // segment's center aligns with top. Segments are laid clockwise starting at 0deg.
  const centerAngle = index * segmentAngle + segmentAngle / 2;
  // We need the pointer (top, -90deg in standard math) to point at centerAngle.
  // Rotation = -centerAngle - 90 (mod 360). Add full spins for drama.
  const base = -centerAngle - 90;
  return ((((base % 360) + 360) % 360)) + 5 * 360 + Math.floor(Math.random() * 3) * 360;
}

export default function WheelPage() {
  const router = useRouter();
  const [state, setState] = useState<WheelState>({ turnsRemaining: 3, lastSpinDate: todayStr() });
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);

  // Load persisted state on mount (client-side)
  useEffect(() => {
    setState(loadState());
  }, []);

  const spin = useCallback(() => {
    if (spinning || state.turnsRemaining <= 0) return;

    setSpinning(true);
    setResult(null);

    const targetIndex = Math.floor(Math.random() * PRIZES.length);
    const targetRotation = getRotationForIndex(targetIndex);
    const prize = getPrizeForIndex(targetIndex);

    // Apply spin animation via CSS transition on transform
    setRotation(targetRotation);

    setTimeout(() => {
      const newTurns = state.turnsRemaining - 1;
      const newState: WheelState = {
        turnsRemaining: newTurns,
        lastSpinDate: todayStr(),
      };
      setState(newState);
      saveState(newState);
      setResult(prize);
      setSpinning(false);
    }, 3000);
  }, [spinning, state.turnsRemaining]);

  const today = todayStr();

  return (
    <main className="min-h-screen bg-canvas px-5 py-8 text-charcoal" data-testid="wheel-page">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold tracking-tight" data-testid="wheel-title">
          Wheel of Fortune
        </h1>
        <span className="flex items-center gap-1 rounded-full bg-mango/15 px-3 py-1 text-xs font-bold uppercase tracking-[.12em] text-mango" data-testid="wheel-turns-badge">
          <Trophy size={12} />
          {state.turnsRemaining} spin{state.turnsRemaining !== 1 ? "s" : ""} left
        </span>
      </div>

      {/* Turns info */}
      <p className="mt-1 text-sm text-neutral-500" data-testid="wheel-turns-message">
        {state.turnsRemaining > 0
          ? `You have ${state.turnsRemaining} spin${state.turnsRemaining !== 1 ? "s" : ""} remaining today.`
          : `Come back tomorrow — turns refresh daily.`}
      </p>

      {/* Wheel */}
      <div className="mx-auto mt-8 max-w-[22rem]">
        {/* Pointer / indicator at top */}
        <div className="mb-3 flex justify-center">
          <div className="z-10 h-7 w-2 rounded-full bg-savings shadow-[0_4px_8px_rgba(0,0,0,.25)]" data-testid="wheel-pointer" />
        </div>

        {/* The wheel */}
        <div
          className="relative mx-auto h-64 w-64 overflow-hidden rounded-[1.7rem] bg-white shadow-card"
          style={{ transform: `rotate(${rotation}deg)`, transition: spinning ? "transform 3s cubic-bezier(0.15, 0.75, 0.4, 1)" : "none" }}
          data-testid="wheel-canvas"
        >
          {/* Conic-gradient segments */}
          <div
            className="h-full w-full"
            style={{
              background: `conic-gradient(
                #FFC000 0deg ${(360 / PRIZES.length)}deg,
                #2E7D32 ${(360 / PRIZES.length)}deg ${(360 / PRIZES.length) * 2}deg,
                #FFC000 ${(360 / PRIZES.length) * 2}deg ${(360 / PRIZES.length) * 3}deg,
                #1A1A1A ${(360 / PRIZES.length) * 3}deg ${(360 / PRIZES.length) * 4}deg,
                #FFC000 ${(360 / PRIZES.length) * 4}deg ${(360 / PRIZES.length) * 5}deg,
                #2E7D32 ${(360 / PRIZES.length) * 5}deg 360deg
              )`,
            }}
          />
          {/* Segment dividers */}
          {PRIZES.map((_, i) => {
            const angle = (360 / PRIZES.length) * i;
            return (
              <div
                key={i}
                className="absolute left-1/2 top-1/2 h-12 w-0.5 -translate-x-1/2 -translate-y-1/2 bg-white/40"
                style={{ transform: `translate(-50%, -50%) rotate(${angle}deg)` }}
              />
            );
          })}
          {/* Center hub */}
          <div className="absolute left-1/2 top-1/2 z-10 grid h-12 w-12 place-items-center rounded-full bg-charcoal shadow-[0_4px_12px_rgba(0,0,0,.3)]">
            <RotateCcw className="text-mango" size={20} />
          </div>
        </div>

        {/* Prize labels around the wheel (static, for readability) */}
        <div className="mt-8 flex flex-wrap justify-center gap-x-4 gap-y-1">
          {PRIZES.map((prize, i) => (
            <span
              key={i}
              className="rounded-full bg-white/80 px-3 py-1 text-xs font-bold shadow-sm"
              data-testid={`wheel-prize-label-${i}`}
            >
              {prize}
            </span>
          ))}
        </div>
      </div>

      {/* Spin button */}
      <div className="mt-8 flex flex-col items-center gap-3">
        {state.turnsRemaining > 0 && !spinning ? (
          <button
            type="button"
            onClick={spin}
            className="flex h-14 w-48 items-center justify-center gap-2 rounded-[1.4rem] bg-mango px-6 text-sm font-extrabold text-charcoal shadow-[0_6px_0_0_#e6a800] transition-transform active:scale-[.97] hover:shadow-[0_8px_0_0_#d49b00] hover:scale-[.99]"
            data-testid="wheel-spin-button"
          >
            <RotateCcw size={18} />
            Spin the Wheel
          </button>
        ) : state.turnsRemaining === 0 ? (
          <div className="flex flex-col items-center gap-1 rounded-2xl bg-neutral-100 px-6 py-5 text-center" data-testid="wheel-exhausted-message">
            <p className="text-lg font-extrabold text-neutral-600">Come back tomorrow</p>
            <p className="text-sm text-neutral-400">You've used all your spins for today.</p>
          </div>
        ) : (
          <div className="flex h-12 w-48 items-center justify-center rounded-2xl bg-neutral-100 text-sm text-neutral-400" data-testid="wheel-spinning-placeholder">
            Spinning…
          </div>
        )}
      </div>

      {/* Result display */}
      {result && (
        <div className="mt-8 rounded-2xl bg-white px-6 py-5 shadow-card text-center" data-testid="wheel-result-card">
          <p className="text-xs font-bold uppercase tracking-[.14em] text-mango">You won</p>
          <p className="mt-1 text-2xl font-extrabold text-charcoal">{result}</p>
        </div>
      )}

      {/* Reset / back link */}
      <div className="mt-10 flex justify-center">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="flex items-center gap-1 rounded-full border border-neutral-200 px-4 py-2 text-xs font-bold text-neutral-500 transition-colors hover:border-neutral-400 hover:text-neutral-700"
          data-testid="wheel-back-button"
        >
          ← Back to home
        </button>
      </div>
    </main>
  );
}
