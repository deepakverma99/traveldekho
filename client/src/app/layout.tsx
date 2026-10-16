import React, { Suspense } from "react";
import type { Metadata } from "next";
import { Montserrat, Plus_Jakarta_Sans, Caveat, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { Header, Footer } from "@/components";
import { StyledComponentsRegistry } from "@/lib";
import { StoreProvider } from "@/redux/StoreProvider";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

const beVietnamPro = Be_Vietnam_Pro({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-vietnam",

});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://traveldekho.live",
  ),
  title: {
    template: "%s | TravelDekho",
    default:
      "TravelDekho | Book Authentic, Scout-Verified Trips & Affordable Holiday Packages Across India",
  },
  description:
    "Discover the best budget holiday packages, weekend getaways, and customized tours in India. TravelDekho offers Scout-Verified itineraries, authentic Himalayan treks, local guides, and affordable luxury travel packages.",
  keywords: [
    "TravelDekho",
    "Best budget holiday packages in India",
    "Authentic Himalayan treks with local guides",
    "Scout verified travel itineraries India",
    "Customized weekend getaways from Delhi",
    "Customized weekend getaways from Mumbai",
    "Affordable luxury travel packages India",
    "book trips online India",
    "best travel platform India",
    "top travel agency",
    "budget trips India",
    "family holiday packages",
    "solo travel India",
    "romantic honeymoons",
    "spiritual tours",
    "group tours",
    "b2b travel platform",
    "compare tour operators",
  ],
  openGraph: {
    title: "TravelDekho | Authentic, Scout-Verified Trips Across India",
    description: "Discover the best budget holiday packages and Scout-Verified itineraries in India.",
    url: "https://traveldekho.live",
    siteName: "TravelDekho",
    images: [
      {
        url: "/TravelDekho-logo.png",
        width: 1200,
        height: 630,
        alt: "TravelDekho Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TravelDekho | Scout-Verified Trips Across India",
    description: "Discover the best budget holiday packages and authentic itineraries in India.",
    images: ["/TravelDekho-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/sm-logo-cropped.png" }],
    shortcut: "/sm-logo-cropped.png",
    apple: "/sm-logo-cropped.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${plusJakartaSans.variable} ${caveat.variable} ${beVietnamPro.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <StoreProvider>
          <StyledComponentsRegistry>
            <Suspense fallback={<div className="h-[72px] sm:h-[80px]" />}>
              <Header />
            </Suspense>
            {children}
            <Suspense fallback={null}>
              <Footer />
            </Suspense>
          </StyledComponentsRegistry>
        </StoreProvider>
      </body>
    </html>
  );
}
