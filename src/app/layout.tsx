import type { Metadata } from "next";
import { JetBrains_Mono, Onest } from "next/font/google";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { t } from "@/i18n/t";
import { asset } from "@/lib/site";
import "./globals.css";

const sans = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: t("meta.title"),
  description: t("meta.description"),
  icons: {
    icon: asset("/favicon.png"),
    apple: asset("/apple-touch-icon.png"),
  },
  openGraph: {
    title: t("meta.title"),
    description: t("meta.description"),
    images: [asset("/og.png")],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} antialiased`}>
      <body className="min-h-full bg-bg font-sans text-text">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
