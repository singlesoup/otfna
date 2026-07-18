import { CartLine, DemoOrder } from "@/lib/types";

const HISTORY_KEY = "otfna.history.v1";
const ACTIVE_ORDER_KEY = "otfna.active-order.v1";
const DEVICE_KEY = "otfna.device.v1";
const VISIT_KEY = "otfna.last-visit.v1";
const CART_KEY = "otfna.cart.v1";

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
  if (!canUseStorage()) return;
  if (order) localStorage.setItem(ACTIVE_ORDER_KEY, JSON.stringify(order));
  else localStorage.removeItem(ACTIVE_ORDER_KEY);
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
  if (!canUseStorage()) return;
  if (cart.length) localStorage.setItem(CART_KEY, JSON.stringify(cart));
  else localStorage.removeItem(CART_KEY);
};
