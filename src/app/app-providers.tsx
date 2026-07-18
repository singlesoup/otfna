"use client";

import { ReactNode, useEffect } from "react";
import { Toaster } from "sonner";
import { OrderProvider } from "@/context/order-context";
import { initAnalytics, track } from "@/lib/analytics";
import { getDeviceId, markVisit } from "@/lib/storage";
import { ServiceWorkerRegistration } from "@/components/service-worker-registration";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    initAnalytics();
    getDeviceId();
    track("app_opened");
    if (markVisit()) track("return_visit_detected");
  }, []);

  return (
    <OrderProvider>
      {children}
      <ServiceWorkerRegistration />
      <Toaster position="top-center" richColors />
    </OrderProvider>
  );
};
