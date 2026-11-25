import type { Metadata, Viewport } from "next";
import "./globals.css";
import { BAKERY_INFO, SITE_URL } from "@/data/bakery";
import { buildBakeryJsonLd } from "@/lib/seo";
import { OrderDrawerProvider } from "@/context/OrderDrawerContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { OrderDrawer } from "@/components/layout/OrderDrawer";
import { MobileQuickBar } from "@/components/layout/MobileQuickBar";
import { JsonLdScript } from "@/components/ui/JsonLdScript";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";

export const viewport: Viewport = {
  themeColor: "#F4FADE",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BAKERY_INFO.brandName} (मृदा Bakess) — 100% Pure Veg Organic Cakes | Mandi, HP`,
    template: `%s | ${BAKERY_INFO.brandName}`,
  },
  description: BAKERY_INFO.heroSubtitle,
  applicationName: BAKERY_INFO.brandName,
  authors: [{ name: BAKERY_INFO.foundersLine }],
  creator: BAKERY_INFO.brandName,
  publisher: BAKERY_INFO.brandName,
  keywords: [
    "Mrida Bakess",
    "मृदा Bakess",
    "Mrida Bakes Mandi",
    "100% Pure Veg bakery Bagla Dohandi",
    "organic eggless cakes Mandi Himachal Pradesh",
    "Manu Naveen Thakur baker",
    "Manisha Thakur cake artist",
    "custom birthday cakes Mandi 175021",
  ],
  icons: {
    icon: "/images/mrida-logo.jpg",
    apple: "/images/mrida-logo.jpg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: BAKERY_INFO.brandName,
    title: `${BAKERY_INFO.brandName} — 100% Pure Veg Fresh, Flavourful & Organic Bakery`,
    description: BAKERY_INFO.heroSubtitle,
    images: [
      {
        url: "/images/hero-spread.jpg",
        width: 1200,
        height: 896,
        alt: "Mrida Bakess 100% Pure Veg handcrafted organic cakes, pastries, and croissants",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BAKERY_INFO.brandName} — 100% Pure Veg Handcrafted Cakes & Pastries`,
    description: BAKERY_INFO.heroSubtitle,
    images: ["/images/hero-spread.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const bakerySchema = buildBakeryJsonLd();

  return (
    <html lang="en-IN" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-canvas text-ink">
        <ScrollProgressBar />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-herb focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to main content
        </a>

        <JsonLdScript data={bakerySchema} />

        <OrderDrawerProvider>
          <Navbar />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <MobileQuickBar />
          <OrderDrawer />
        </OrderDrawerProvider>
      </body>
    </html>
  );
}
