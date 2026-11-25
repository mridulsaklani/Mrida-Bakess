import type { Metadata } from "next";
import { BAKERY_INFO, SITE_URL } from "@/data/bakery";
import { FAQ_ITEMS } from "@/data/testimonials-faq";
import { MENU_ITEMS } from "@/data/menu";
import { CUSTOM_CAKE_TIER_RATES } from "@/data/custom-cakes";
import type { MenuItem } from "@/types/bakery";

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  absoluteTitle?: boolean;
}

export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
  image = "/images/hero-spread.jpg",
  absoluteTitle = false,
}: PageMetaInput): Metadata {
  const normalizedPath = path === "/" ? "/" : `${path.replace(/\/$/, "")}/`;
  const canonicalUrl = `${SITE_URL}${normalizedPath}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords: [
      "Mrida Bakess",
      "मृदा Bakess",
      "Mrida Bakes Mandi",
      "100% Pure Veg bakery Mandi",
      "Bagla Dohandi bakery",
      "eggless organic cakes Himachal Pradesh",
      "Manu Naveen Thakur baker",
      "Manisha Thakur cake artist",
      "custom birthday cakes Mandi 175021",
      ...keywords,
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: absoluteTitle ? title : `${title} | ${BAKERY_INFO.brandName}`,
      description,
      url: canonicalUrl,
      siteName: BAKERY_INFO.brandName,
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 896,
          alt: `${title} — ${BAKERY_INFO.brandName}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: absoluteTitle ? title : `${title} | ${BAKERY_INFO.brandName}`,
      description,
      images: [image],
    },
  };
}

export function buildBakeryJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Bakery",
    "@id": `${SITE_URL}/#bakery`,
    name: BAKERY_INFO.brandName,
    alternateName: BAKERY_INFO.alternateBrandSpellings,
    description: BAKERY_INFO.heroSubtitle,
    url: SITE_URL,
    image: [
      `${SITE_URL}/images/shop-exterior.jpg`,
      `${SITE_URL}/images/hero-spread.jpg`,
      `${SITE_URL}/images/shop-signboard.jpg`,
    ],
    logo: `${SITE_URL}/images/mrida-logo.jpg`,
    telephone: `+91-${BAKERY_INFO.contact.phoneRaw}`,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: `+91-${BAKERY_INFO.contact.phoneRaw}`,
        contactType: "customer service",
        availableLanguage: ["English", "Hindi"],
      },
      {
        "@type": "ContactPoint",
        telephone: `+91-${BAKERY_INFO.contact.whatsappRaw}`,
        contactType: "reservations",
        contactOption: "WhatsApp",
        availableLanguage: ["English", "Hindi"],
      },
    ],
    email: BAKERY_INFO.contact.email,
    sameAs: [BAKERY_INFO.contact.instagramUrl],
    hasMap: BAKERY_INFO.contact.mapsUrl,
    priceRange: "₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, UPI",
    servesCuisine: ["100% Pure Veg Cakes", "Eggless Pastries", "Organic Bakery", "Custom Theme Cakes"],
    areaServed: [
      { "@type": "Place", name: "Bagla, Mandi, Himachal Pradesh" },
      { "@type": "Place", name: "Dohandi, Mandi, Himachal Pradesh" },
      { "@type": "Place", name: "Nerchowk, Mandi, Himachal Pradesh" },
      { "@type": "City", name: "Mandi, Himachal Pradesh" },
    ],
    founders: [
      {
        "@type": "Person",
        name: "Naveen Thakur",
        alternateName: "Manu",
        jobTitle: "Co-Founder & Head Baker",
      },
      {
        "@type": "Person",
        name: "Manisha Thakur",
        jobTitle: "Co-Founder & Custom Cake Artist",
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: BAKERY_INFO.contact.addressLine1,
      addressLocality: BAKERY_INFO.contact.city,
      addressRegion: BAKERY_INFO.contact.state,
      postalCode: BAKERY_INFO.contact.pincode,
      addressCountry: "IN",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "08:00",
        closes: "20:00",
      },
    ],
    hasMenu: `${SITE_URL}/menu/`,
  };
}

export function buildMenuJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: `${BAKERY_INFO.brandName} 100% Pure Veg Menu & Rate Card`,
    url: `${SITE_URL}/menu/`,
    inLanguage: "en-IN",
    hasMenuSection: [
      {
        "@type": "MenuSection",
        name: "100% Pure Veg Cakes, Pastries & Organic Bakery Items",
        hasMenuItem: MENU_ITEMS.map((item) => ({
          "@type": "MenuItem",
          name: item.name,
          description: item.shortDescription,
          image: `${SITE_URL}${item.image}`,
          offers: {
            "@type": "Offer",
            priceCurrency: "INR",
            price: item.variants[0]?.priceInr ?? 0,
            availability: "https://schema.org/InStock",
          },
          suitableForDiet: "https://schema.org/VegetarianDiet",
        })),
      },
    ],
  };
}

export function buildCustomCakesJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: `${BAKERY_INFO.brandName} Custom 100% Pure Veg Celebration Cakes`,
    url: `${SITE_URL}/custom-cakes/`,
    provider: { "@id": `${SITE_URL}/#bakery` },
    itemListElement: CUSTOM_CAKE_TIER_RATES.map((tier) => ({
      "@type": "Offer",
      name: `${tier.tierName} (${tier.weightRange})`,
      description: tier.includes,
      priceCurrency: "INR",
      price: tier.startingPriceInr,
      availability: "https://schema.org/InStock",
    })),
  };
}

export function buildAboutPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `About ${BAKERY_INFO.brandName} — Manu & Manisha Thakur`,
    url: `${SITE_URL}/about/`,
    mainEntity: { "@id": `${SITE_URL}/#bakery` },
  };
}

export function buildGalleryJsonLd(
  photos: { src: string; title: string; caption: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: `${BAKERY_INFO.brandName} Photo Gallery — Real Shop & 100% Pure Veg Cakes`,
    url: `${SITE_URL}/gallery/`,
    about: { "@id": `${SITE_URL}/#bakery` },
    associatedMedia: photos.map((p) => ({
      "@type": "ImageObject",
      contentUrl: `${SITE_URL}${p.src}`,
      name: p.title,
      caption: p.caption,
    })),
  };
}

export function buildProductJsonLd(item: MenuItem) {
  const prices = item.variants.map((v) => v.priceInr);
  const lowPrice = Math.min(...prices);
  const highPrice = Math.max(...prices);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: item.name,
    description: item.fullDescription,
    image: `${SITE_URL}${item.image}`,
    brand: {
      "@type": "Brand",
      name: BAKERY_INFO.brandName,
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      lowPrice,
      highPrice,
      offerCount: item.variants.length,
      availability: "https://schema.org/InStock",
      seller: { "@id": `${SITE_URL}/#bakery` },
    },
  };
}

export function buildFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildBreadcrumbJsonLd(crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path === "/" ? "/" : `${crumb.path.replace(/\/$/, "")}/`}`,
    })),
  };
}
