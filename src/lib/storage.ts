import { CartLine, DemoOrder } from "@/lib/types";

const HISTORY_KEY = "otfna.history.v1";
const ACTIVE_ORDER_KEY = "otfna.active-order.v1";
const DEVICE_KEY = "otfna.device.v1";
const VISIT_KEY = "otfna.last-visit.v1";
const CART_KEY = "otfna.cart.v1";
const GOAL_KEY = "otfna.goal.v1";
const RECIPES_KEY = "otfna.recipes.v1";
const STREAK_KEY = "otfna.streak.v1";
const OFFER_TIMER_KEY = "otfna.offertimer.v1";

const canUseStorage = () => typeof window !== "undefined";

export const getHistory = (): DemoOrder[] => {
  if (!canUseStorage()) return [];
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) ?? "[]") as DemoOrder[]; } catch { return []; }
};

export const saveHistory = (orders: DemoOrder[]) => {
  if (canUseStorage()) localStorage.setItem(HISTORY_KEY, JSON.stringify(orders));
};

export const getActiveOrder = (): DemoOrder | null => {
  if (!canUseStorage()) return null;
  try { return JSON.parse(localStorage.getItem(ACTIVE_ORDER_KEY) ?? "null") as DemoOrder | null; } catch { return null; }
};

export const saveActiveOrder = (order: DemoOrder | null) => {
  if (canUseStorage()) {
    if (order) localStorage.setItem(ACTIVE_ORDER_KEY, JSON.stringify(order));
    else localStorage.removeItem(ACTIVE_ORDER_KEY);
  }
};

export const getDeviceId = () => {
  if (!canUseStorage()) return "server";
  const existing = localStorage.getItem(DEVICE_KEY);
  if (existing) return existing;
  const generated = crypto.randomUUID();
  localStorage.setItem(DEVICE_KEY, generated);
  return generated;
};

export const markVisit = () => {
  if (!canUseStorage()) return false;
  const previous = localStorage.getItem(VISIT_KEY);
  localStorage.setItem(VISIT_KEY, new Date().toISOString());
  return Boolean(previous);
};

export const getCart = (): CartLine[] => {
  if (!canUseStorage()) return [];
  try { return JSON.parse(localStorage.getItem(CART_KEY) ?? "[]") as CartLine[]; } catch { return []; }
};

export const saveCart = (cart: CartLine[]) => {
  if (canUseStorage()) {
    if (cart.length) localStorage.setItem(CART_KEY, JSON.stringify(cart));
    else localStorage.removeItem(CART_KEY);
  }
};

export const getGoal = (): string | null => {
  if (!canUseStorage()) return null;
  const existing = localStorage.getItem(GOAL_KEY);
  if (!existing) return null;
  try { return JSON.parse(existing) as string | null; } catch { return null; }
};

export const saveGoal = (goal: string | null) => {
  if (canUseStorage()) {
    if (goal) localStorage.setItem(GOAL_KEY, JSON.stringify(goal));
    else localStorage.removeItem(GOAL_KEY);
  }
};

const SEED_RECIPES: import("@/lib/types").Recipe[] = [
  {
    id: "dal-chawal",
    slug: "dal-chawal",
    title: "Dal Chawal",
    category: "North Indian",
    image: "https://images.pexels.com/photos/2672025/pexels-photo-2672025.jpeg?auto=compress&cs=tinysrgb&w=900",
    rating: 4.7,
    ingredients: "1 cup toor dal, 2 cups basmati rice, 1 tsp turmeric, 1 tsp cumin seeds, 2 cloves garlic, 1 inch ginger, 2 tomatoes, 1 green chilli, salt, ghee, cilantro",
    instructions: "Wash dal and rice separately. Pressure cook dal with turmeric, ginger, garlic and salt for 3 whistles. In a pan, temper cumin seeds in ghee, add chopped tomatoes and green chilli. Add cooked dal, simmer 5 minutes. Cook rice separately. Serve hot dal over rice, garnish with cilantro.",
    steamingTimeMinutes: 30,
    servings: 3,
    difficulty: "Easy",
  },
  {
    id: "paneer-tikka",
    slug: "paneer-tikka",
    title: "Paneer Tikka",
    category: "North Indian",
    image: "https://images.pexels.com/photos/3665461/pexels-photo-3665461.jpeg?auto=compress&cs=tinysrgb&w=900",
    rating: 4.5,
    ingredients: "250g paneer cubes, 1 cup thick curd, 2 tbsp besan, 1 tbsp ginger-garlic paste, 1 tsp Kashmiri red chilli powder, 1/2 tsp garam masala, 1 tsp cumin powder, 1 tsp mustard oil, bell peppers, onion, lemon",
    instructions: "Marinate paneer, bell peppers and onion in whisked curd mixed with besan, ginger-garlic paste, red chilli powder, garam masala, cumin powder, salt and mustard oil. Refrigerate 1 hour. Skewer paneer and veggies, grill on charcoal or oven at 220°C for 15 minutes. Squeeze lemon before serving.",
    steamingTimeMinutes: 60,
    servings: 2,
    difficulty: "Medium",
  },
  {
    id: "veg-biryani",
    slug: "veg-biryani",
    title: "Veg Biryani",
    category: "Biryani",
    image: "https://images.pexels.com/photos/7072360/pexels-photo-7072360.jpeg?auto=compress&cs=tinysrgb&w=900",
    rating: 4.6,
    ingredients: "2 cups basmati rice, 1 cup mixed vegetables (carrots, beans, peas, cauliflower), 1 onion, 2 tomatoes, 1/4 cup mint-coriander paste, 2 tbsp biryani masala, 1 tsp turmeric, 4 cloves, 2 bay leaves, 1 inch cinnamon, ghee, fried onions, saffron milk, curd",
    instructions: "Soak rice 30 minutes. Sauté whole spices in ghee, add sliced onion until golden. Add chopped tomatoes, mint-coriander paste and biryani masala. Add vegetables and curd, cook 5 minutes. Layer half rice, vegetable masala, fried onions, saffron milk, repeat. Dum seal with dough, cook on low heat 20 minutes. Rest 5 minutes, fluff and serve.",
    steamingTimeMinutes: 75,
    servings: 4,
    difficulty: "Hard",
  },
];

export const getRecipes = (): import("@/lib/types").Recipe[] => {
  if (!canUseStorage()) return SEED_RECIPES;
  try {
    const stored = localStorage.getItem(RECIPES_KEY);
    if (stored) return JSON.parse(stored) as import("@/lib/types").Recipe[];
  } catch {
    // ignore corrupted storage
  }
  saveRecipes(SEED_RECIPES);
  return SEED_RECIPES;
};

export const saveRecipes = (recipes: import("@/lib/types").Recipe[]) => {
  if (canUseStorage()) localStorage.setItem(RECIPES_KEY, JSON.stringify(recipes));
};

export type StreakState = {
  currentStreak: number;
  longestStreak: number;
  lastOrderDate: string;
};

export const getStreak = (): StreakState => {
  if (!canUseStorage()) return { currentStreak: 0, longestStreak: 0, lastOrderDate: "" };
  try {
    const stored = localStorage.getItem(STREAK_KEY);
    if (stored) return JSON.parse(stored) as StreakState;
  } catch {
    // ignore corrupted storage
  }
  return { currentStreak: 0, longestStreak: 0, lastOrderDate: "" };
};

export const saveStreak = (state: StreakState) => {
  if (canUseStorage()) localStorage.setItem(STREAK_KEY, JSON.stringify(state));
};

export type OfferTimerState = {
  endTime: number;
  expired: boolean;
};

export const getOfferTimer = (): OfferTimerState => {
  if (!canUseStorage()) return { endTime: 0, expired: false };
  try {
    const stored = localStorage.getItem(OFFER_TIMER_KEY);
    if (stored) return JSON.parse(stored) as OfferTimerState;
  } catch {
    // ignore corrupted storage
  }
  return { endTime: 0, expired: false };
};

export const saveOfferTimer = (state: OfferTimerState) => {
  if (canUseStorage()) localStorage.setItem(OFFER_TIMER_KEY, JSON.stringify(state));
};
