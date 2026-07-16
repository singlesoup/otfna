import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { AppProviders } from "./app-providers";

export const metadata: Metadata = {
  title: { default: "OTFNA — Only The Food Never Arrives", template: "%s · OTFNA" },
  description: "Complete the food-ordering ritual without spending money. Fake delivered, real money saved.",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: "OTFNA", statusBarStyle: "default" },
};

export const viewport: Viewport = { themeColor: "#FFFFFF", width: "device-width", initialScale: 1, maximumScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN">
      <body>
        <div className="app-shell" data-testid="otfna-app-shell">
          <AppProviders>{children}</AppProviders>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
