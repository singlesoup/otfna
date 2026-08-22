export type Goal = {
  id: string;
  name: string;
  emoji: string;
  targetAmount: number;
  color: string;
  shortLabel: string;
};

export const goals: Goal[] = [
  { id: "ps5", name: "PlayStation 5", emoji: "\u{1F3AE}", targetAmount: 50000, color: "#7c3aed", shortLabel: "PS5" },
  { id: "iphone", name: "iPhone", emoji: "\u{1F4F1}", targetAmount: 100000, color: "#2563eb", shortLabel: "iPhone" },
  { id: "bike", name: "Bike", emoji: "\u{1F6B2}", targetAmount: 100000, color: "#d97706", shortLabel: "Bike" },
];

export const goalBySlug = (id: string) => goals.find((g) => g.id === id);
