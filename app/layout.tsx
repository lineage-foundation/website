import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SITE_ORIGIN } from "@/lib/constants";

import "./globals.css";

/* Body/UI — subset weights to limit bytes; display font for headlines only. */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["500", "600", "700"],
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
  openGraph: {
    type: "website",
    siteName: "Lineage Foundation",
    locale: "en_US",
    images: [
      {
        url: "/images/open-graph-lineage-1200x630.png",
        width: 1200,
        height: 630,
        alt: "Lineage Foundation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
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
  themeColor: "#080a0f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable}`}
    >
      <body className={inter.className}>
        <SiteHeader />
        <main className="siteMain">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
