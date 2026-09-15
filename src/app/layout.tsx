import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Great_Vibes } from "next/font/google";
import "./globals.css";

const greatVibes = Great_Vibes({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  variable: "--font-great-vibes",
  display: "swap",
  preload: true,
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Muhammet & Betül — Nişan Davetiyesi",
  description: "Muhammet & Betül nişan davetiyesi",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="overflow-x-clip">
      <head>
        <link
          rel="preload"
          as="image"
          href="/davetiye-poster.jpg"
          fetchPriority="high"
        />
        <link rel="preload" as="video" href="/davetiye.mp4" type="video/mp4" />
        <link rel="preload" as="image" href="/hero-bg.jpg" />
      </head>
      <body
        className={`${greatVibes.variable} ${cormorant.variable} ${cormorant.className} font-body max-w-[100vw] overflow-x-clip antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
