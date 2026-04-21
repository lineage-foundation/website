import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SITE_ORIGIN } from "@/lib/constants";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  robots: {
    index: true,
    follow: true,
  },
  title: {
    default: "Lineage Foundation",
    template: "%s | Lineage",
  },
  description: "Lineage Foundation website",
  icons: {
    icon: [
      {
        url: "/images/lineage-favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/images/lineage-favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/images/lineage-favicon-48x48.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        url: "/images/lineage-favicon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/images/lineage-favicon-180x180.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        <SiteHeader />
        <main className="siteMain">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
