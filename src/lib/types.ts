export type DeliveryMode = "vip" | "standard";
export type PaymentMethod = "UPI" | "Card" | "COD" | "Wallet";
export type HungerLevel = 0 | 1 | 2 | 3 | 4 | 5;

export type Dish = {
  id: string;
  name: string;
  price: number;
  rating: number;
  veg: boolean;
  image: string;
  description: string;
};

export type Restaurant = {
  id: string;
  name: string;
  category: string;
  cuisines: string[];
  rating: number;
  eta: string;
  offer: string;
  image: string;
  badge: string;
  dishes: Dish[];
};

export type Recipe = {
  id: string;
  slug: string;
  title: string;
  category: string;
  image: string;
  rating: number;
  ingredients: string;
  instructions: string;
  steamingTimeMinutes: number;
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard";
};

export type CartLine = { restaurantId: string; dishId: string; quantity: number; };

export type Bill = {
  itemTotal: number;
  deliveryFee: number;
  taxes: number;
  discount: number;
  total: number;
};

export type DemoOrder = {
  id: string;
  restaurantId: string;
  restaurantName: string;
  category: string;
  lines: CartLine[];
  bill: Bill;
  mode: DeliveryMode;
  payment: PaymentMethod;
  placedAt: string;
  durationSeconds: number;
  completedAt?: string;
    feedback?: "yes" | "no";
    hunger?: number;
    wheelPrize?: string;
  };
