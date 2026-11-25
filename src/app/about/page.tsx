import Image from "next/image";
import Link from "next/link";
import {
  HeartHandshake,
  Leaf,
  Sparkles,
  Award,
  ArrowRight,
  UtensilsCrossed,
  MapPin,
  Clock,
  PhoneCall,
} from "lucide-react";
import { BAKERY_INFO, FOUNDERS, QUALITY_PILLARS } from "@/data/bakery";
import { buildAboutPageJsonLd, buildBreadcrumbJsonLd, createPageMetadata } from "@/lib/seo";
import { BrandSeal } from "@/components/ui/BrandSeal";
import { PureVegBadge } from "@/components/ui/PureVegBadge";
import { JsonLdScript } from "@/components/ui/JsonLdScript";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhotoLightboxGrid, type LightboxPhoto } from "@/components/ui/PhotoLightbox";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { GiftTrunk3DLoader } from "@/components/three/GiftTrunk3DLoader";

export const metadata = createPageMetadata({
  title: "About Manu & Manisha — 100% Pure Veg Bakery",
  description:
    "Meet Manu (Naveen Thakur) & Manisha Thakur of Mrida Bakess near Domino's, Bagla, Mandi-175021 — 100% Pure Veg organic cakes & cozy café.",
  path: "/about",
  keywords: [
    "Naveen Thakur baker Mandi",
    "Manu baker Bagla Dohandi",
    "Manisha Thakur cake artist",
    "Mrida Bakess story",
    "100% Pure Veg bakery Mandi HP",
  ],
  image: "/images/shop-evening-guests.jpg",
});

const JOURNEY_MILESTONES = [
  {
    year: "2021",
    title: "Small Oven, Pure Vegetarian Craft",
    detail:
      "Naveen (Manu) & Manisha started baking small-batch 100% Pure Veg wholewheat tea cakes and couverture chocolate truffles for families who refused synthetic toppings.",
  },
  {
    year: "2023",
    title: "Word-of-Mouth Cake Demand Across Mandi",
    detail:
      "Manisha's kids theme cakes, princess doll cakes, and botanical buttercream tiers sparked constant referrals—transforming Mrida Bakess into a beloved boutique bakehouse.",
  },
  {
    year: "2025",
    title: "Bagla, Dohandi Café & Full Counter",
    detail:
      "Opened our bright dine-in café near Domino's in Bagla, Dohandi with cozy table seating, chilled pastry showcase, and daily 8 AM – 8 PM counter service.",
  },
  {
    year: "Today",
    title: "2,400+ Pure Veg Celebrations Baked",
    detail:
      "Every morning begins fresh with cultured butter, organic jaggery, real fruits, and Belgian cocoa—personally checked by Manu & Manisha every day.",
  },
];

const SHOP_GALLERY: LightboxPhoto[] = [
  {
    src: "/images/shop-exterior.jpg",
    alt: "Mrida Bakess exterior storefront near Domino's Bagla Dohandi Mandi",
    caption: "Storefront Entrance · Bagla, Dohandi",
    subtitle: "Near Domino's, Mandi – 175021",
  },
  {
    src: "/images/shop-signboard.jpg",
    alt: "Illuminated Mrida Bakess signboard reading मृदा BAKES and 100% Pure Veg",
    caption: "100% Pure Veg Certified Signboard",
    subtitle: "मृदा BAKES · Fresh • Flavourful • Organic",
  },
  {
    src: "/images/shop-interior-seating.jpg",
    alt: "Clean bright cafe seating inside Mrida Bakess with leafy botanical wall decor",
    caption: "Relaxed Neighborhood Café Seating",
    subtitle: "Bright & cozy dine-in tables",
  },
  {
    src: "/images/shop-display-counter.jpg",
    alt: "Inside Mrida Bakess showing café tables and illuminated chilled cake counter",
    caption: "Fresh Pastry & Celebration Cake Counter",
    subtitle: "Open daily 8:00 AM – 8:00 PM",
  },
];

export default function AboutPage() {
  const aboutSchema = buildAboutPageJsonLd();
  const breadcrumb = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about/" },
  ]);

  return (
    <>
      <JsonLdScript data={aboutSchema} />
      <JsonLdScript data={breadcrumb} />

      {/* ==================== HERO STORY ==================== */}
      <section className="bg-parchment-glow border-b border-border py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-6 space-y-6">
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="inline-flex items-center gap-2.5 rounded-full bg-logo-tint px-4 py-1.5 ring-1 ring-border-strong">
                  <BrandSeal size="sm" className="h-8 w-8" />
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink">
                    Our Story · <span className="font-devanagari">मृदा Bakess</span>
                  </span>
                </div>
                <PureVegBadge label="100% Pure Veg" />
              </div>

              <h1 className="font-display text-3xl font-semibold leading-tight text-ink sm:text-5xl">
                Two Bakers, Honest Grains &amp; 100% Pure Veg Cakes Made Like Home
              </h1>

              <p className="text-base leading-relaxed text-ink-olive sm:text-lg">
                <strong>{BAKERY_INFO.brandName} (मृदा Bakess)</strong> was founded by{" "}
                <strong className="text-ink">Manu (Naveen Thakur)</strong> and{" "}
                <strong className="text-ink">Manisha Thakur</strong> with one heartfelt promise:
                families in Mandi deserve fresh, organic, 100% Pure Veg cakes crafted from real
                ingredients—without inflated hotel-patisserie prices.
              </p>

              <p className="text-sm leading-relaxed text-ink-muted sm:text-base">
                The Sanskrit word <em>Mrida (मृदा)</em> means fertile, pure earth. Every logo seal
                on our cake boxes and café entrance near Domino&apos;s in Bagla, Dohandi reminds us
                to stay honest—using unbleached wheat, farm dairy cream, Kashmiri saffron, organic
                jaggery, and real Belgian cocoa daily from 8:00 AM to 8:00 PM.
              </p>

              <div className="flex flex-wrap gap-3 pt-1 text-xs font-semibold text-ink-olive">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3.5 py-2">
                  <MapPin className="h-3.5 w-3.5 text-herb" />
                  Bagla, Dohandi, Mandi – 175021
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3.5 py-2">
                  <Clock className="h-3.5 w-3.5 text-herb" />
                  Open Daily: 8:00 AM – 8:00 PM
                </span>
                <a
                  href={BAKERY_INFO.contact.phoneHref}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-logo-tint px-3.5 py-2 text-ink hover:border-herb"
                >
                  <PhoneCall className="h-3.5 w-3.5 text-herb" />
                  Call {BAKERY_INFO.contact.phoneRaw}
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-border-strong bg-linen shadow-lg">
                <Image
                  src="/images/founders-bakery.jpg"
                  alt="Founders Manu (Naveen Thakur) and Manisha Thakur in their sunlit bakery kitchen"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FOUNDERS PROFILES ==================== */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeading
          eyebrow="The Artisans Behind Mrida Bakess"
          title="Meet Manu & Manisha Thakur"
          description="Hands-on bakers who personally taste, pipe, and wrap your celebration orders every single day."
        />

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {FOUNDERS.map((founder, idx) => (
            <article
              key={founder.name}
              className="flex flex-col justify-between rounded-[2rem] border border-border-strong bg-surface p-6 sm:p-9 shadow-xs"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">
                      {founder.role}
                    </p>
                    <h2 className="mt-1 font-display text-2xl font-semibold text-ink sm:text-3xl">
                      {founder.knownAs && founder.knownAs !== founder.name.split(" ")[0]
                        ? `${founder.knownAs} (${founder.name})`
                        : founder.name}
                    </h2>
                  </div>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-logo-tint text-herb ring-1 ring-border">
                    {idx === 0 ? (
                      <Award className="h-5 w-5" />
                    ) : (
                      <HeartHandshake className="h-5 w-5" />
                    )}
                  </div>
                </div>

                <p className="inline-block rounded-full bg-herb-soft/70 px-3.5 py-1 text-xs font-semibold text-herb">
                  Signature Craft: {founder.specialty}
                </p>

                <p className="text-base leading-relaxed text-ink-olive">{founder.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ==================== REAL SHOP TOUR GALLERY ==================== */}
      <section id="shop-tour" className="bg-surface border-y border-border py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Step Inside Our Mandi Bakehouse"
            title="A Warm 100% Pure Veg Café Near Domino's, Bagla"
            description="Drop in between 8:00 AM and 8:00 PM for fresh counter slices, birthday cake consultations, or relaxed evening snacks with friends & family."
            actionLabel="Get Store Directions"
            actionHref="/contact/"
          />

          <div className="mt-10">
            <PhotoLightboxGrid photos={SHOP_GALLERY} />
          </div>

          <ScrollReveal className="mt-8">
            <GiftTrunk3DLoader />
          </ScrollReveal>

          <ScrollReveal className="mt-8 overflow-hidden rounded-[2rem] border border-border-strong bg-linen">
            <div className="grid items-center lg:grid-cols-12">
              <div className="relative aspect-[16/9] w-full lg:col-span-7">
                <Image
                  src="/images/shop-evening-guests.jpg"
                  alt="Warm evening atmosphere with guests enjoying treats inside Mrida Bakess Bagla Mandi"
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6 sm:p-8 lg:col-span-5 space-y-3">
                <PureVegBadge label="100% Pure Veg Dine-In & Takeaway" />
                <h3 className="font-display text-2xl font-semibold text-ink">
                  Built For Warm Neighborhood Conversations
                </h3>
                <p className="text-sm leading-relaxed text-ink-olive">
                  From parents ordering baby shower and kids birthday cakes to students stopping by
                  for Belgian truffle pastries and cold beverages, our Bagla café welcomes you
                  everyday from 8 AM to 8 PM.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== INGREDIENT PHILOSOPHY & JOURNEY ==================== */}
      <section className="bg-linen/70 border-b border-border py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12">
            {/* Left Brand Emblem + Pillars */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-5 rounded-3xl border border-border-strong bg-logo-tint/90 p-6">
                <BrandSeal size="md" />
                <div>
                  <p className="font-display text-2xl font-semibold text-ink">
                    {BAKERY_INFO.tagline}
                  </p>
                  <p className="mt-1 text-sm text-ink-olive">
                    Our 100% Pure Veg promise stamped onto every cake box—zero preservatives, zero
                    compromise.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {QUALITY_PILLARS.map((pillar) => (
                  <div
                    key={pillar.title}
                    className="rounded-2xl border border-border bg-surface p-5"
                  >
                    <h3 className="font-display text-lg font-semibold text-ink">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-ink-muted">
                      {pillar.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Journey Timeline */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-herb">
                  <Leaf className="h-3.5 w-3.5" />
                  <span>Our Bakehouse Journey</span>
                </p>
                <h2 className="mt-1 font-display text-3xl font-semibold text-ink">
                  From Home Kitchen Batches to Mandi&apos;s Beloved Bakehouse
                </h2>
              </div>

              <ol className="space-y-4">
                {JOURNEY_MILESTONES.map((step) => (
                  <li
                    key={step.year}
                    className="flex gap-4 rounded-2xl border border-border bg-surface p-5"
                  >
                    <span className="flex h-10 w-16 shrink-0 items-center justify-center rounded-xl bg-logo-tint font-display text-sm font-semibold text-ink ring-1 ring-border">
                      {step.year}
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-ink">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                        {step.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== BOTTOM CTA ==================== */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 rounded-[2rem] border border-border-strong bg-surface p-8 text-center shadow-xs sm:flex-row sm:p-10 sm:text-left">
          <div className="max-w-xl space-y-2">
            <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-herb">
              <Sparkles className="h-3.5 w-3.5 text-saffron" />
              <span>Taste The Difference Yourself</span>
            </p>
            <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
              Explore Our 100% Pure Veg Menu or Book a Custom Cake
            </h2>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
            <Link
              href="/menu/"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-logo-tint transition hover:bg-herb hover:text-white"
            >
              <UtensilsCrossed className="h-4 w-4" />
              <span>View Full Menu</span>
            </Link>
            <Link
              href="/contact/"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border-strong bg-logo-tint px-6 py-3 text-sm font-semibold text-ink transition hover:bg-linen"
            >
              <span>Visit Us / Contact</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
