import type { Metadata } from "next";
import { Be_Vietnam_Pro, Fraunces } from "next/font/google";
import { LenisProvider } from "@/components/LenisProvider";
import { shop } from "@/lib/data";
import "./globals.css";

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["400", "500", "600"],
  variable: "--font-be-vietnam",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext", "vietnamese"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${shop.name} — Trà sữa matcha`,
  description: `${shop.tagline} ${shop.demoNote}`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="vi"
      className={`${beVietnam.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-cream font-sans text-ink">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
