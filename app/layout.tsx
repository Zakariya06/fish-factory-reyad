import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { AppProvider } from "@/components/AppProvider";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fish Factory — Luxury Seafood Restaurant in Riyadh",
  description:
    "Riyadh's finest catch, charcoal-fired and served daily in Al Olaya. Rated 4.7/5 by 10,000+ guests. Explore the menu or book your table with our AI concierge.",
  keywords: [
    "seafood Riyadh",
    "Fish Factory Riyadh",
    "luxury restaurant Riyadh",
    "Al Olaya restaurant",
    "fresh seafood Saudi Arabia",
    "fine dining Riyadh",
  ],
  openGraph: {
    title: "Fish Factory — The finest catch in Riyadh",
    description:
      "Daily Red Sea catch, charcoal-fired and plated with precision in Al Olaya. Rated 4.7/5 by 10,000+ guests.",
    type: "website",
    locale: "en_SA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fish Factory — The finest catch in Riyadh",
    description:
      "Daily Red Sea catch, charcoal-fired and plated with precision in Al Olaya.",
  },
};

export const viewport: Viewport = {
  themeColor: "#FBF9F4",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only z-[100] rounded-full bg-ink px-5 py-3 text-sm text-cream focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
