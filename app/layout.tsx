import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nzele.art"),
  title: "Nzele | Luxury Fine Art & Collectibles",
  description: "Curated online gallery showcasing extraordinary works from emerging and established artists. Join the exclusive preview waitlist.",
  openGraph: {
    title: "Nzele | Luxury Fine Art & Collectibles",
    description: "Curated online gallery showcasing extraordinary works from emerging and established artists. Join the exclusive preview waitlist.",
    url: "https://nzele.art",
    siteName: "Nzele Fine Art",
    images: [
      {
        url: "/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Nzele Luxury Art Gallery Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nzele | Luxury Fine Art & Collectibles",
    description: "Curated online gallery showcasing extraordinary works from emerging and established artists. Join the exclusive preview waitlist.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorantGaramond.variable} ${inter.variable} scroll-smooth`}>
      <body className="bg-luxury-ivory text-luxury-obsidian antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
