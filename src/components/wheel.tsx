// src/components/wheel.tsx
"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { Trophy, RotateCcw } from "lucide-react";

interface WheelSegment {
  id: string;
  label: string;
  icon: string; // emoji or lucide name
  weight: number; // relative probability
  color: string; // segment color
  prize: string; // what user wins
}

interface WheelProps {
  onWin?: (prize: string) => void;
  turnsRemaining?: number;
  onTurnsChange?: (turns: number) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const DEFAULT_SEGMENTS: WheelSegment[] = [
  { id: "free-delivery", label: "Free delivery", icon: "🚚", weight: 25, color: "#FFC000", prize: "Free delivery on next order" },
  { id: "fifty-off", label: "50% off", icon: "🎫", weight: 15, color: "#2E7D32", prize: "50% off next order" },
  { id: "rupee50", label: "₹50 coupon", icon: "💸", weight: 15, color: "#FFC000", prize: "₹50 off next order" },
  { id: "try-again", label: "Try again", icon: "🔄", weight: 30, color: "#1A1A1A", prize: "Better luck next time" },
  { id: "free-dessert", label: "Free dessert", icon: "🍰", weight: 10, color: "#2E7D32", prize: "Free dessert on next order" },
  { id: "double-points", label: "Double points", icon: "⭐", weight: 3, color: "#FFC000", prize: "Double savings points" },
  { id: "mystery", label: "Mystery box", icon: "🎁", weight: 2, color: "#8E24AA", prize: "Mystery reward" },
];

const WHEEL_KEY = "otfna.wheel.v1";

type WheelState = {
  turnsRemaining: number;
  lastSpinDate: string;
};

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

function loadState(): WheelState {
  if (typeof window === "undefined") return { turnsRemaining: 3, lastSpinDate: todayStr() };
  try {
    const raw = localStorage.getItem(WHEEL_KEY);
    if (!raw) return { turnsRemaining: 3, lastSpinDate: todayStr() };
    const parsed = JSON.parse(raw) as WheelState;
    if (parsed.lastSpinDate < todayStr()) return { turnsRemaining: 3, lastSpinDate: todayStr() };
    return parsed;
  } catch {
    return { turnsRemaining: 3, lastSpinDate: todayStr() };
  }
}

function saveState(state: WheelState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(WHEEL_KEY, JSON.stringify(state));
}

// Web Audio for tick sound
let audioCtx: AudioContext | null = null;
function playTick() {
  if (!audioCtx) audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = "sine";
  osc.frequency.value = 800;
  gain.gain.value = 0.05;
  osc.connect(gain).connect(audioCtx.destination);
  osc.start();
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
  osc.stop(audioCtx.currentTime + 0.06);
}

function playWin() {
  if (!audioCtx) audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  const now = audioCtx.currentTime;
  [523, 659, 784, 1047].forEach((freq, i) => {
    const osc = audioCtx!.createOscillator();
    const gain = audioCtx!.createGain();
    osc.type = "triangle";
    osc.frequency.value = freq;
    gain.gain.value = 0.08;
    osc.connect(gain).connect(audioCtx!.destination);
    osc.start(now + i * 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.3);
    osc.stop(now + i * 0.1 + 0.35);
  });
}

export function Wheel({ onWin, turnsRemaining: propTurns, onTurnsChange, isCollapsed, onToggleCollapse }: WheelProps) {
  const [state, setState] = useState<WheelState>({ turnsRemaining: 3, lastSpinDate: todayStr() });
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const segmentsRef = useRef(DEFAULT_SEGMENTS);

  useEffect(() => {
    setState(loadState());
  }, []);

  const turns = propTurns ?? state.turnsRemaining;

  const spin = useCallback(() => {
    if (spinning || turns <= 0) return;
    setSpinning(true);
    setResult(null);

    // Weighted random selection
    const totalWeight = segmentsRef.current.reduce((sum, s) => sum + s.weight, 0);
    let rand = Math.random() * totalWeight;
    let targetIndex = 0;
    for (let i = 0; i < segmentsRef.current.length; i++) {
      rand -= segmentsRef.current[i].weight;
      if (rand <= 0) { targetIndex = i; break; }
    }

    const segmentAngle = 360 / segmentsRef.current.length;
    const centerAngle = targetIndex * segmentAngle + segmentAngle / 2;
    const base = -centerAngle - 90;
    const targetRotation = ((((base % 360) + 360) % 360)) + 5 * 360 + Math.floor(Math.random() * 3) * 360;

    setRotation(targetRotation);

    // Play tick sounds during spin (simplified - 1 tick per segment pass)
    const tickCount = 5 * segmentsRef.current.length + Math.floor(Math.random() * 3) * segmentsRef.current.length;
    for (let i = 0; i < tickCount; i++) {
      setTimeout(playTick, (i / tickCount) * 2800);
    }

    setTimeout(() => {
      const newTurns = turns - 1;
      const newState: WheelState = { turnsRemaining: newTurns, lastSpinDate: todayStr() };
      setState(newState);
      saveState(newState);
      onTurnsChange?.(newTurns);

      const prize = segmentsRef.current[targetIndex].prize;
      setResult(prize);
      setSpinning(false);
      playWin();
      onWin?.(prize);
    }, 3000);
  }, [spinning, turns, onTurnsChange, onWin]);

  if (isCollapsed) {
    return (
      <button
        type="button"
        onClick={onToggleCollapse}
        className="flex w-full items-center justify-between rounded-2xl border border-mango/30 bg-mango/10 p-4 text-left"
        data-testid="wheel-collapsed-trigger"
      >
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-mango text-charcoal text-xl">🎡</span>
          <div>
            <p className="font-extrabold text-charcoal">Wheel of Fortune</p>
            <p className="text-xs text-neutral-500">{turns} spin{turns !== 1 ? "s" : ""} left today</p>
          </div>
        </div>
        <RotateCcw size={20} className="text-mango" />
      </button>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-5 shadow-card" data-testid="wheel-component">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[.14em] text-neutral-400">Wheel of Fortune</p>
          <p className="mt-1 text-xl font-extrabold" data-testid="wheel-turns-badge">
            <Trophy size={18} className="inline mr-1 text-mango" />
            {turns} spin{turns !== 1 ? "s" : ""} left today
          </p>
        </div>
        {onToggleCollapse && (
          <button type="button" onClick={onToggleCollapse} className="p-1 text-neutral-400 hover:text-neutral-700" data-testid="wheel-collapse-button">
            <RotateCcw size={18} />
          </button>
        )}
      </div>

      {/* Turns message */}
      <p className="mt-1 text-sm text-neutral-500" data-testid="wheel-turns-message">
        {turns > 0 ? `You have ${turns} spin${turns !== 1 ? "s" : ""} remaining today.` : "Come back tomorrow — turns refresh daily."}
      </p>

      {/* Wheel */}
      <div className="mx-auto mt-6 max-w-[22rem]">
        {/* Pointer */}
        <div className="mb-3 flex justify-center">
          <div className="z-10 h-7 w-2 rounded-full bg-savings shadow-[0_4px_8px_rgba(0,0,0,.25)]" data-testid="wheel-pointer" />
        </div>

        {/* Wheel canvas */}
        <div
          className="relative mx-auto h-64 w-64 overflow-hidden rounded-[1.7rem] bg-white shadow-card"
          style={{ transform: `rotate(${rotation}deg)`, transition: spinning ? "transform 3s cubic-bezier(0.15, 0.75, 0.4, 1)" : "none" }}
          data-testid="wheel-canvas"
        >
          {/* Conic gradient segments */}
          <div
            className="h-full w-full"
            style={{
              background: `conic-gradient(${segmentsRef.current
                .map((s, i) => {
                  const start = (360 / segmentsRef.current.length) * i;
                  const end = (360 / segmentsRef.current.length) * (i + 1);
                  return `${s.color} ${start}deg ${end}deg`;
                })
                .join(", ")})`,
            }}
          />

          {/* Segment dividers */}
          {segmentsRef.current.map((_, i) => {
            const angle = (360 / segmentsRef.current.length) * i;
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

        {/* Prize labels */}
        <div className="mt-6 flex flex-wrap justify-center gap-x-3 gap-y-1">
          {segmentsRef.current.map((s, i) => (
            <span
              key={s.id}
              className="inline-flex items-center gap-1 rounded-full bg-white/80 px-3 py-1 text-xs font-bold shadow-sm"
              data-testid={`wheel-prize-label-${i}`}
            >
              <span>{s.icon}</span>
              <span>{s.label}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Spin button / exhausted / spinning */}
      <div className="mt-6 flex flex-col items-center gap-3">
        {turns > 0 && !spinning ? (
          <button
            type="button"
            onClick={spin}
            className="flex h-14 w-48 items-center justify-center gap-2 rounded-[1.4rem] bg-mango px-6 text-sm font-extrabold text-charcoal shadow-[0_6px_0_0_#e6a800] transition-transform active:scale-[.97] hover:shadow-[0_8px_0_0_#d49b00] hover:scale-[.99]"
            data-testid="wheel-spin-button"
          >
            <RotateCcw size={18} />
            Spin the Wheel
          </button>
        ) : turns === 0 ? (
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
        <Confetti />
      )}
      {result && (
        <div className="mt-6 rounded-2xl bg-white px-6 py-5 shadow-card text-center" data-testid="wheel-result-card">
          <p className="text-xs font-bold uppercase tracking-[.14em] text-mango">You won</p>
          <p className="mt-1 text-2xl font-extrabold text-charcoal">{result}</p>
        </div>
      )}
    </div>
  );
}

// Simple confetti component
function Confetti() {
  const [confetti, setConfetti] = useState<number[]>([]);

  useEffect(() => {
    const pieces = Array.from({ length: 50 }, () => Math.random());
    setConfetti(pieces);
    const timer = setTimeout(() => setConfetti([]), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!confetti.length) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50" data-testid="wheel-confetti">
      {confetti.map((_, i) => (
        <div
          key={i}
          className="absolute top-0 h-3 w-3 rounded-sm animate-[confetti_1s_ease-out_forwards]"
          style={{
            left: `${Math.random() * 100}%`,
            backgroundColor: ["#FFC000", "#2E7D32", "#1A1A1A", "#8E24AA", "#FF6B6B"][i % 5],
            animationDelay: `${Math.random() * 0.3}s`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}
    </div>
  );
}