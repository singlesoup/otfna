"use client";

import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getRestaurant } from "@/data/catalog";
import { track } from "@/lib/analytics";
import { Bill, CartLine, DeliveryMode, DemoOrder, PaymentMethod } from "@/lib/types";
import { getActiveOrder, getCart, getHistory, saveActiveOrder, saveCart, saveHistory } from "@/lib/storage";

type OrderContextValue = {
  cart: CartLine[];
  mode: DeliveryMode;
  couponApplied: boolean;
  activeOrder: DemoOrder | null;
  history: DemoOrder[];
  hydrated: boolean;
  setMode: (mode: DeliveryMode) => void;
  addItem: (restaurantId: string, dishId: string) => void;
  removeItem: (restaurantId: string, dishId: string) => void;
  clearCart: () => void;
  applyCoupon: () => void;
  bill: Bill;
  placeOrder: (payment: PaymentMethod) => DemoOrder | null;
  completeOrder: () => DemoOrder | null;
  recordFeedback: (value: "yes" | "no") => void;
};

const OrderContext = createContext<OrderContextValue | null>(null);

const calculateBill = (cart: CartLine[], couponApplied: boolean): Bill => {
  const itemTotal = cart.reduce((sum, line) => {
    const dish = getRestaurant(line.restaurantId)?.dishes.find((item) => item.id === line.dishId);
    return sum + (dish?.price ?? 0) * line.quantity;
  }, 0);
  const deliveryFee = itemTotal ? 39 : 0;
  const taxes = Math.round(itemTotal * 0.05);
  const discount = couponApplied ? Math.min(100, Math.round(itemTotal * 0.2)) : 0;
  return { itemTotal, deliveryFee, taxes, discount, total: Math.max(0, itemTotal + deliveryFee + taxes - discount) };
};

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [mode, setMode] = useState<DeliveryMode>("vip");
  const [couponApplied, setCouponApplied] = useState(false);
  const [activeOrder, setActiveOrder] = useState<DemoOrder | null>(null);
  const [history, setHistory] = useState<DemoOrder[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setCart(getCart());
    setActiveOrder(getActiveOrder());
    setHistory(getHistory());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveCart(cart);
  }, [cart, hydrated]);

  const addItem = useCallback((restaurantId: string, dishId: string) => {
    setCart((current) => {
      const sameRestaurant = current.filter((line) => line.restaurantId === restaurantId);
      const existing = sameRestaurant.find((line) => line.dishId === dishId);
      if (existing) return sameRestaurant.map((line) => line.dishId === dishId ? { ...line, quantity: line.quantity + 1 } : line);
      return [...sameRestaurant, { restaurantId, dishId, quantity: 1 }];
    });
    track("item_added_to_cart", { restaurant_id: restaurantId, dish_id: dishId });
  }, []);

  const removeItem = useCallback((restaurantId: string, dishId: string) => {
    setCart((current) => current.flatMap((line) => {
      if (line.restaurantId !== restaurantId || line.dishId !== dishId) return [line];
      return line.quantity > 1 ? [{ ...line, quantity: line.quantity - 1 }] : [];
    }));
  }, []);

  const bill = useMemo(() => calculateBill(cart, couponApplied), [cart, couponApplied]);
  const clearCart = () => { setCart([]); setCouponApplied(false); };
  const applyCoupon = () => setCouponApplied(true);

  const placeOrder = (payment: PaymentMethod) => {
    const restaurant = getRestaurant(cart[0]?.restaurantId);
    if (!restaurant || !cart.length) return null;
    const order: DemoOrder = {
      id: crypto.randomUUID(), restaurantId: restaurant.id, restaurantName: restaurant.name,
      category: restaurant.category, lines: cart, bill, mode, payment,
      placedAt: new Date().toISOString(), durationSeconds: mode === "vip" ? 90 : 150,
    };
    setActiveOrder(order);
    saveActiveOrder(order);
    setCart([]);
    setCouponApplied(false);
    track("demo_order_placed", { mode, total: bill.total, item_count: cart.reduce((sum, line) => sum + line.quantity, 0) });
    return order;
  };

  const completeOrder = () => {
    if (!activeOrder) return null;
    if (activeOrder.completedAt) return activeOrder; // idempotent: already completed
    const completed = { ...activeOrder, completedAt: new Date().toISOString() };
    const next = history.some((order) => order.id === completed.id) ? history : [completed, ...history];
    setActiveOrder(completed);
    setHistory(next);
    saveActiveOrder(completed);
    saveHistory(next);
    return completed;
  };

  const recordFeedback = (value: "yes" | "no") => {
    if (!activeOrder) return;
    const updated = { ...activeOrder, feedback: value };
    const next = history.map((order) => order.id === updated.id ? updated : order);
    setActiveOrder(updated);
    setHistory(next);
    saveActiveOrder(updated);
    saveHistory(next);
    track("helped_response_selected", { response: value });
  };

  return <OrderContext.Provider value={{ cart, mode, couponApplied, activeOrder, history, hydrated, setMode, addItem, removeItem, clearCart, applyCoupon, bill, placeOrder, completeOrder, recordFeedback }}>{children}</OrderContext.Provider>;
};

export const useOrder = () => {
  const value = useContext(OrderContext);
  if (!value) throw new Error("useOrder must be used inside OrderProvider");
  return value;
};
