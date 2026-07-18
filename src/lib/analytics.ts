import posthog from "posthog-js";

export type AnalyticsEvent =
  | "app_opened" | "restaurant_viewed" | "item_added_to_cart" | "cart_viewed"
  | "checkout_started" | "demo_order_placed" | "tracking_started" | "tracking_completed"
  | "savings_shown" | "home_food_suggestion_shown" | "helped_response_selected"
  | "share_card_created" | "share_card_shared" | "return_visit_detected";

let ready = false;

export const initAnalytics = () => {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;
  if (!key || !host || ready) return;
  posthog.init(key, {
    api_host: host,
    autocapture: false,
    capture_pageview: false,
    disable_session_recording: true,
    persistence: "localStorage",
  });
  ready = true;
};

export const track = (event: AnalyticsEvent, properties: Record<string, string | number | boolean> = {}) => {
  if (!ready) return;
  posthog.capture(event, properties);
};
