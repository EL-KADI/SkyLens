import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { WeatherProvider } from "@/contexts/weather-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SkyLens",
  description:
    "Dynamic weather forecasts for cities worldwide with adaptive backgrounds and detailed analytics",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body suppressHydrationWarning className={inter.className}>
        <WeatherProvider>
          <Navigation />
          <main className="min-h-screen">{children}</main>
        </WeatherProvider>
      </body>
    </html>
  );
}
