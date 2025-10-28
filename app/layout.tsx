import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { StructuredData } from "@/components/StructuredData";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://santarosaspas.com"),
  title: "Santa Rosa Spas | Premium Hot Tubs & Spa Sales",
  description:
    "Discover premium hot tubs and spas in Santa Rosa, CA. Expert guidance, quality products from trusted brands, and dedicated customer service. Transform your backyard into a personal wellness retreat.",
  keywords:
    "hot tubs, spas, Santa Rosa, California, premium spas, hot tub sales, backyard spa, wellness",
  openGraph: {
    title: "Santa Rosa Spas | Premium Hot Tubs & Spa Sales",
    description:
      "Discover premium hot tubs and spas in Santa Rosa, CA. Expert guidance and quality products.",
    url: "https://santarosaspas.com",
    siteName: "Santa Rosa Spas",
    images: [
      {
        url: "https://images.pexels.com/photos/221457/pexels-photo-221457.jpeg",
        width: 1200,
        height: 630,
        alt: "Santa Rosa Spas - Premium Hot Tubs",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Santa Rosa Spas | Premium Hot Tubs & Spa Sales",
    description: "Discover premium hot tubs and spas in Santa Rosa, CA.",
    images: [
      "https://images.pexels.com/photos/221457/pexels-photo-221457.jpeg",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
      <body className={inter.className}>
        <Toaster richColors position="top-right" />
        {children}
      </body>
    </html>
  );
}
