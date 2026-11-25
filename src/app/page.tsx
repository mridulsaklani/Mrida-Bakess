import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Leaf,
  Award,
  HeartHandshake,
  IndianRupee,
  Star,
  CalendarHeart,
  UtensilsCrossed,
  MessageCircle,
  MapPin,
  Clock,
  PhoneCall,
  ExternalLink,
  Box,
  Utensils,
} from "lucide-react";
import { BAKERY_INFO, QUALITY_PILLARS } from "@/data/bakery";
import { MENU_CATEGORIES, getFeaturedMenuItems } from "@/data/menu";
import { TESTIMONIALS } from "@/data/testimonials-faq";
import { createPageMetadata } from "@/lib/seo";
import { buildWhatsAppLink } from "@/lib/format";
import { BrandSeal } from "@/components/ui/BrandSeal";
import { PureVegBadge } from "@/components/ui/PureVegBadge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MenuItemCard } from "@/components/ui/MenuItemCard";
import { LiveBakeryStatus } from "@/components/ui/LiveBakeryStatus";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { HeroCounter3DLoader } from "@/components/three/HeroCounter3DLoader";

export const metadata = createPageMetadata({
  title: "Mrida Bakess (मृदा) — 100% Pure Veg Cakes | Mandi, HP",
  description:
    "100% Pure Veg organic cakes, pastries & custom birthday cakes in Bagla, Dohandi, Mandi-175021 by Manu & Manisha Thakur. Open 8 AM–8 PM. Call 7947111674.",
  path: "/",
  absoluteTitle: true,
  keywords: [
    "100% Pure Veg bakery Mandi",
    "Mrida Bakess Bagla Dohandi",
    "eggless birthday cakes Mandi",
    "organic tea cakes",
    "kids theme cakes Mandi",
  ],
});

const PILLAR_ICONS = [Leaf, Sparkles, Award, IndianRupee];

export default function HomePage() {
  const featuredItems = getFeaturedMenuItems();
  const displayCategories = MENU_CATEGORIES.slice(0, 4);

  return (
    <>
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative overflow-hidden bg-parchment-glow border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-10">
            {/* Left Story & CTA Column */}
            <div className="lg:col-span-6 space-y-6 animate-fade-up">
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="inline-flex items-center gap-2.5 rounded-full border border-border-strong bg-logo-tint/90 px-3 py-1.5 shadow-sm">
                  <BrandSeal size="sm" className="h-8 w-8 sm:h-9 sm:w-9" />
                  <p className="pr-1 text-[10px] font-bold uppercase tracking-[0.16em] text-ink sm:text-[11px] sm:tracking-[0.2em]">
                    <span className="font-devanagari">मृदा Bakess</span> ·{" "}
                    <span className="text-herb">Fresh • Flavourful • Organic</span>
                  </p>
                </div>

                <PureVegBadge label="100% Pure Veg" />
              </div>

              <h1 className="font-display text-[2.15rem] font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.35rem]">
                Handcrafted{" "}
                <span className="italic text-herb">100% Pure Veg</span> Cakes, Baked with Soul &amp;
                Honest Prices.
              </h1>

              <p className="max-w-xl text-base leading-relaxed text-ink-olive sm:text-lg">
                Welcome to <strong>{BAKERY_INFO.brandName}</strong> in Bagla, Mandi — founded by{" "}
                <strong className="text-ink">Manu (Naveen Thakur)</strong> and{" "}
                <strong className="text-ink">Manisha Thakur</strong>. Famous for feather-light
                eggless sponges, pure Belgian chocolate, and bespoke celebration cakes priced for
                every family&apos;s joy.
              </p>

              {/* Quick Location + Live Open Status */}
              <div className="flex flex-wrap items-center gap-2.5 text-xs font-medium text-ink-olive sm:text-sm">
                <LiveBakeryStatus />
                <span className="inline-flex items-center gap-1.5 px-1">
                  <MapPin className="h-4 w-4 text-herb shrink-0" />
                  <span>Near Domino&apos;s, Bagla, Dohandi, Mandi</span>
                </span>
              </div>

              <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap sm:items-center">
                <Link
                  href="/menu/"
                  className="btn-shine group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-logo-tint shadow-md transition hover:bg-herb hover:text-white active:scale-[0.98] sm:w-auto"
                >
                  <UtensilsCrossed className="h-4 w-4" />
                  <span>Explore Menu &amp; 3D Studio</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>

                <Link
                  href="/custom-cakes/"
                  className="btn-shine inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-border-strong bg-surface px-6 py-3.5 text-sm font-semibold text-ink transition hover:border-herb hover:bg-logo-tint active:scale-[0.98] sm:w-auto"
                >
                  <CalendarHeart className="h-4 w-4 text-terracotta" />
                  <span>Design a Custom Cake</span>
                </Link>
              </div>

              {/* Quick Trust Strip */}
              <div className="grid grid-cols-2 gap-3 pt-3 sm:grid-cols-4">
                {BAKERY_INFO.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-border bg-surface/90 px-3.5 py-3 backdrop-blur-sm transition hover:border-herb/40"
                  >
                    <p className="font-display text-lg font-semibold text-ink sm:text-2xl">
                      {stat.value}
                    </p>
                    <p className="mt-0.5 text-[11px] font-medium leading-tight text-ink-muted">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Editorial Photography */}
            <div className="lg:col-span-6">
              <div className="relative mx-auto max-w-2xl pb-0 sm:pb-6">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-border-strong bg-linen shadow-[0_28px_60px_-24px_rgba(34,36,25,0.28)] sm:rounded-[2rem]">
                  <Image
                    src="/images/hero-spread.jpg"
                    alt="Sunlit Mrida Bakess table featuring 100% Pure Veg vanilla bean berry cake, butter croissants, chocolate truffle slice, and pistachio tea cake"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cocoa/45 via-transparent to-transparent" />
                </div>

                {/* Floating Daily Rate & Craft Card */}
                <div className="mt-4 rounded-3xl border border-border-strong bg-surface/95 p-4 shadow-lg backdrop-blur-md sm:absolute sm:bottom-0 sm:left-5 sm:right-5 sm:mt-0 sm:p-5">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <BrandSeal size="md" className="hidden h-14 w-14 sm:block" />
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-herb">
                          100% Pure Veg · Fresh Daily 8 AM – 8 PM
                        </p>
                        <p className="font-display text-base font-semibold text-ink sm:text-lg">
                          Cakes from ₹460 · Pastries from ₹85
                        </p>
                        <p className="text-xs text-ink-muted">
                          Pure dairy cream, 54% Belgian cocoa &amp; zero preservatives
                        </p>
                      </div>
                    </div>

                    <Link
                      href="/menu/"
                      className="inline-flex items-center gap-1.5 rounded-full bg-logo-tint px-4 py-2 text-xs font-semibold text-ink ring-1 ring-border-strong transition hover:bg-herb hover:text-white"
                    >
                      <span>See Rate Card</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== BROWSE BY CATEGORY ==================== */}
      <section className="mx-auto max-w-7xl px-4 pt-16 pb-14 sm:px-6 sm:pt-20 lg:px-8 lg:pt-24">
        <SectionHeading
          eyebrow="Fresh From Our Ovens"
          title="Explore Our 100% Pure Veg Counter"
          description="From showstopping theme & tiered celebration cakes to warm morning croissants and wholesome organic tea loaves—every batch is crafted 100% Pure Veg from scratch."
          actionLabel="View Full Menu & Rates"
          actionHref="/menu/"
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {displayCategories.map((category) => (
            <Link
              key={category.id}
              href={`/menu/?category=${category.id}`}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-herb/50 hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-linen">
                <Image
                  src={category.heroImage}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cocoa/55 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 rounded-full bg-logo-tint/95 px-3 py-1 text-[11px] font-semibold text-ink backdrop-blur-sm">
                  Explore Category →
                </span>
              </div>

              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink group-hover:text-herb">
                    {category.name}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">
                    {category.tagline}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ==================== BESTSELLERS & POPULAR TREATS ==================== */}
      <section className="bg-linen/70 border-y border-border py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Most Loved in Mandi"
            title="Signature Cakes & Counter Favourites"
            description="Transparent rates, 100% Pure Veg perfection, and generous portions—tap any treat to view weights & ingredients or add directly to your order tray."
            actionLabel="All 21 Bakery Items"
            actionHref="/menu/"
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredItems.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== INTERACTIVE 3D PATISSERIE COUNTER ==================== */}
      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8 lg:pt-20">
        <div className="overflow-hidden rounded-[2.25rem] border border-border-strong bg-surface shadow-sm">
          <div className="grid items-center lg:grid-cols-12">
            <div className="relative bg-parchment-glow lg:col-span-6 border-b border-border lg:border-b-0 lg:border-r">
              <div className="pointer-events-none absolute left-4 top-4 z-10 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-ink/85 px-3 py-1 text-[11px] font-semibold text-logo-tint backdrop-blur-md">
                  <Box className="h-3.5 w-3.5 text-saffron" />
                  <span>Interactive 3D Counter Platter</span>
                </span>
              </div>
              <HeroCounter3DLoader />
              <p className="pointer-events-none absolute bottom-3 left-0 right-0 text-center text-[11px] font-medium text-ink-muted">
                Move cursor to tilt light · Hover or click treats to bounce · Drag 360°
              </p>
            </div>

            <div className="p-6 sm:p-10 lg:col-span-6 lg:p-12 space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-logo-tint px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-herb ring-1 ring-border">
                  <Sparkles className="h-3.5 w-3.5 text-saffron" />
                  <span>3D Patisserie Experience</span>
                </span>
                <PureVegBadge label="100% Pure Veg" compact />
              </div>

              <h2 className="font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
                Cut With Knife, Assemble &amp; Spin Every Pure Veg Layer in 3D
              </h2>

              <p className="text-sm leading-relaxed text-ink-olive sm:text-base">
                Want to peek inside our cakes before ordering? Open our{" "}
                <strong>3D Bakery Display Case &amp; Knife Cut Studio</strong> on the Menu &amp;
                Rates page—lift the crystal cloche, <strong>slice a cake wedge with the baker&apos;s knife</strong>,
                explode every sponge &amp; ganache layer, blow out the celebration candle, and rotate 360°.
              </p>

              <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
                <div className="rounded-2xl border border-border bg-canvas p-3">
                  <p className="font-display font-semibold text-ink">Belgian Truffle</p>
                  <p className="mt-0.5 text-ink-muted">54% Cocoa</p>
                </div>
                <div className="rounded-2xl border border-border bg-canvas p-3">
                  <p className="font-display font-semibold text-ink">Butter Croissant</p>
                  <p className="mt-0.5 text-ink-muted">72-hr Ferment</p>
                </div>
                <div className="rounded-2xl border border-border bg-canvas p-3">
                  <p className="font-display font-semibold text-ink">Berry Tartlet</p>
                  <p className="mt-0.5 text-ink-muted">Fresh Curd</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-1">
                <Link
                  href="/menu/#studio-3d"
                  className="btn-shine inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-logo-tint transition hover:bg-herb hover:text-white active:scale-[0.98]"
                >
                  <Utensils className="h-4 w-4" />
                  <span>Try 3D Knife Cut &amp; Cake Case</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/custom-cakes/#estimator"
                  className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-logo-tint px-5 py-3.5 text-sm font-semibold text-ink transition hover:bg-linen"
                >
                  <span>3D Tier Builder</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== REAL BAKEHOUSE & LIVE CAKE GALLERY (NEW) ==================== */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeading
          eyebrow="Bagla, Dohandi · Mandi (HP)"
          title="Inside Our Real Bakehouse & Cake Studio"
          description="Step inside our cozy café near Domino's in Bagla, Dohandi — warm pendant lighting, friendly neighborhood seating, our 100% Pure Veg signboard, and real theme cakes crafted for local Mandi celebrations."
          actionLabel="Visit & Get Directions"
          actionHref="/contact/"
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-12">
          {/* Storefront Feature Portrait Card */}
          <div className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-border-strong bg-surface shadow-sm lg:col-span-5">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-linen lg:aspect-auto lg:flex-1 lg:min-h-[430px]">
              <Image
                src="/images/shop-exterior.jpg"
                alt="Mrida Bakess real storefront in Bagla, Dohandi, Mandi showing मृदा BAKES 100% Pure Veg sign and welcoming glass entrance"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cocoa/80 via-cocoa/15 to-transparent" />

              <div className="absolute left-4 top-4">
                <PureVegBadge label="100% Pure Veg Bakehouse" />
              </div>

              <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/20 bg-cocoa/85 p-4 text-logo-tint backdrop-blur-md">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-logo-tint/75">
                  Visit Us Any Day · 8 AM – 8 PM
                </p>
                <p className="mt-1 font-display text-lg font-semibold text-white">
                  {BAKERY_INFO.brandName} · Bagla, Dohandi
                </p>
                <p className="mt-0.5 text-xs text-logo-tint/85">
                  {BAKERY_INFO.contact.addressLine1}, {BAKERY_INFO.contact.addressLine2}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <a
                    href={BAKERY_INFO.contact.phoneHref}
                    className="inline-flex items-center gap-1.5 rounded-full bg-herb px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-herb-hover"
                  >
                    <PhoneCall className="h-3.5 w-3.5" />
                    <span>{BAKERY_INFO.contact.phoneRaw}</span>
                  </a>
                  <a
                    href={BAKERY_INFO.contact.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-white/25"
                  >
                    <span>Google Maps</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Bento Photo Collage: Evening Cafe + Signboard + Real Custom Cakes */}
          <div className="grid gap-5 lg:col-span-7">
            {/* Evening guests wide photo */}
            <div className="group relative aspect-[16/9] overflow-hidden rounded-[2rem] border border-border-strong bg-linen shadow-sm">
              <Image
                src="/images/shop-evening-guests.jpg"
                alt="Evening ambiance inside Mrida Bakess with families seated at café tables and glowing dessert counter"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cocoa/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-2 text-white">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-logo-tint">
                    Dine-In &amp; Evening Counter
                  </p>
                  <p className="font-display text-lg font-semibold sm:text-xl">
                    Warm Café Seating &amp; Fresh Chilled Pastry Showcase
                  </p>
                </div>
                <Link
                  href="/about/#shop-tour"
                  className="rounded-full bg-logo-tint/95 px-3.5 py-1.5 text-xs font-semibold text-ink transition hover:bg-white"
                >
                  Tour Our Shop →
                </Link>
              </div>
            </div>

            {/* Bottom 3-photo strip: Signboard + Real Kids Theme Cakes */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div className="group relative aspect-[4/3] overflow-hidden rounded-3xl border border-border bg-linen sm:aspect-[4/5]">
                <Image
                  src="/images/shop-signboard.jpg"
                  alt="Mrida Bakess illuminated signboard showing मृदा BAKES logo and 100% Pure Veg badge"
                  fill
                  sizes="(max-width: 640px) 100vw, 20vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cocoa/70 via-transparent to-transparent" />
                <p className="absolute bottom-3 left-3 right-3 text-xs font-semibold text-white">
                  मृदा BAKES · 100% Pure Veg Emblem
                </p>
              </div>

              <Link
                href="/custom-cakes/#gallery"
                className="group relative aspect-[4/3] overflow-hidden rounded-3xl border border-border bg-linen sm:aspect-[4/5]"
              >
                <Image
                  src="/images/cake-excavator-custom.jpg"
                  alt="Real custom excavator construction theme kids birthday cake baked at Mrida Bakess"
                  fill
                  sizes="(max-width: 640px) 100vw, 20vw"
                  className="object-cover object-[50%_75%] transition duration-500 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cocoa/75 via-transparent to-transparent" />
                <p className="absolute bottom-3 left-3 right-3 text-xs font-semibold text-white">
                  Custom Excavator Kids Cake →
                </p>
              </Link>

              <Link
                href="/custom-cakes/#gallery"
                className="group relative aspect-[4/3] overflow-hidden rounded-3xl border border-border bg-linen sm:aspect-[4/5]"
              >
                <Image
                  src="/images/cake-doll-rosette.jpg"
                  alt="Real pink rosette princess doll birthday cake crafted by Manisha Thakur at Mrida Bakess"
                  fill
                  sizes="(max-width: 640px) 100vw, 20vw"
                  className="object-cover object-[50%_38%] transition duration-500 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cocoa/75 via-transparent to-transparent" />
                <p className="absolute bottom-3 left-3 right-3 text-xs font-semibold text-white">
                  Princess Rosette Doll Cake →
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== WHY MRIDA BAKESS (QUALITY + PURE VEG + AFFORDABILITY) ==================== */}
      <section className="bg-surface border-y border-border py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="The Mrida Bakess Standard"
            title="Why Mandi Families Choose Manu & Manisha"
            description="Great baking doesn't hide behind compound glaze or artificial flavours. Our promise combines 100% Pure Veg purity, organic ingredients, and fair neighborhood prices."
            align="center"
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {QUALITY_PILLARS.map((pillar, idx) => {
              const Icon = PILLAR_ICONS[idx % PILLAR_ICONS.length];
              return (
                <div
                  key={pillar.title}
                  className="flex flex-col rounded-3xl border border-border bg-canvas/55 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-herb/40 hover:bg-logo-tint/45"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-logo-tint text-herb ring-1 ring-border-strong">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-ink">{pillar.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== CUSTOM CELEBRATION CAKES SPOTLIGHT ==================== */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="overflow-hidden rounded-[2.25rem] border border-border-strong bg-logo-tint/70 shadow-sm">
          <div className="grid items-center lg:grid-cols-12">
            <div className="relative aspect-[4/5] w-full sm:aspect-[4/3] lg:col-span-5 lg:aspect-auto lg:h-full lg:min-h-[380px]">
              <Image
                src="/images/cake-baby-shower-reveal.jpg"
                alt="Handcrafted 100% Pure Veg Pink & Blue Baby Shower Gender Reveal Cake by Mrida Bakess"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-[50%_58%]"
              />
            </div>

            <div className="p-6 sm:p-10 lg:col-span-7 lg:p-14 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 rounded-full bg-surface px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-terracotta ring-1 ring-border">
                  <CalendarHeart className="h-3.5 w-3.5" />
                  <span>High-Demand Bespoke Cakes</span>
                </div>
                <PureVegBadge label="100% Pure Veg" compact />
              </div>

              <h2 className="font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
                Custom Birthday, Doll, Baby Shower &amp; Wedding Cakes Crafted Around Your Story
              </h2>

              <p className="text-base leading-relaxed text-ink-olive">
                Manisha Thakur&apos;s bespoke cakes are among our most requested creations—whether
                you want a kid&apos;s excavator cake, a princess rosette doll cake, a pastel baby
                shower reveal cake, or an ivory botanical wedding tier—all{" "}
                <strong>100% Pure Veg &amp; freshly baked</strong>.
              </p>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-surface/90 p-3.5 ring-1 ring-border">
                  <p className="text-xs font-medium text-ink-muted">1-Tier Designer</p>
                  <p className="mt-1 font-display text-lg font-semibold text-ink">From ₹550</p>
                </div>
                <div className="rounded-2xl bg-surface/90 p-3.5 ring-1 ring-border">
                  <p className="text-xs font-medium text-ink-muted">Kids Theme / Doll</p>
                  <p className="mt-1 font-display text-lg font-semibold text-ink">From ₹950</p>
                </div>
                <div className="rounded-2xl bg-surface/90 p-3.5 ring-1 ring-border">
                  <p className="text-xs font-medium text-ink-muted">2-Tier Botanical</p>
                  <p className="mt-1 font-display text-lg font-semibold text-ink">From ₹2,350</p>
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap">
                <Link
                  href="/custom-cakes/"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-herb px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-herb-hover"
                >
                  <span>Estimate Custom Cake Price</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/custom-cakes/#gallery"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border-strong bg-surface px-6 py-3.5 text-sm font-semibold text-ink transition hover:bg-linen"
                >
                  <span>Browse Real Cake Gallery</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== MEET THE FOUNDERS TEASER ==================== */}
      <section className="bg-surface border-y border-border py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-border-strong bg-linen shadow-md">
                <Image
                  src="/images/founders-bakery.jpg"
                  alt="Manu (Naveen Thakur) and Manisha Thakur smiling together behind the Mrida Bakess counter with fresh cake and pastries"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-herb">
                <HeartHandshake className="h-4 w-4 text-terracotta" />
                <span>Meet The Heart Behind The Oven</span>
              </div>

              <h2 className="font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
                Manu (Naveen Thakur) &amp; Manisha Thakur
              </h2>

              <p className="text-base leading-relaxed text-ink-olive">
                What started with two passionate home bakers crafting 100% Pure Veg treats with
                organic flours and Belgian cocoa is now Bagla &amp; Mandi&apos;s favourite
                neighborhood cake studio. When you visit near Domino&apos;s in Dohandi or call{" "}
                <a
                  href={BAKERY_INFO.contact.phoneHref}
                  className="font-semibold text-herb underline decoration-herb/40"
                >
                  {BAKERY_INFO.contact.phoneRaw}
                </a>
                , you speak directly with the bakers who frost your cake.
              </p>

              <blockquote className="rounded-2xl border-l-4 border-herb bg-logo-tint/60 p-4 text-sm italic leading-relaxed text-ink-olive">
                &ldquo;We named our bakery <strong>Mrida (मृदा)</strong>—meaning pure earth—because
                every celebration deserves 100% Pure Veg honesty, real ingredients, and warm
                affordability.&rdquo;
              </blockquote>

              <div className="pt-2">
                <Link
                  href="/about/"
                  className="group inline-flex items-center gap-2 rounded-full border border-border-strong bg-canvas px-6 py-3 text-sm font-semibold text-ink transition hover:border-herb hover:bg-logo-tint"
                >
                  <span>Read Their Bakehouse Story</span>
                  <ArrowRight className="h-4 w-4 text-herb transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== DAILY FRESH OVEN SCHEDULE STRIP (BONUS) ==================== */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="rounded-[2rem] border border-border-strong bg-surface p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col justify-between gap-4 border-b border-border pb-5 sm:flex-row sm:items-end">
              <div>
                <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-herb">
                  <Clock className="h-3.5 w-3.5 text-saffron" />
                  <span>Fresh Out of The Deck Oven · Daily Schedule</span>
                </p>
                <h2 className="mt-1 font-display text-2xl font-semibold text-ink sm:text-3xl">
                  When Every 100% Pure Veg Batch Hits Our Counter
                </h2>
              </div>
              <LiveBakeryStatus />
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  time: "8:00 – 8:30 AM",
                  title: "Morning Oven Batch",
                  detail: "Warm butter croissants, pain au chocolat & wholewheat pistachio tea loaves.",
                },
                {
                  time: "11:00 AM",
                  title: "Chilled Pastry Counter",
                  detail: "Belgian truffle slices, passionfruit berry tarts & pistachio mille-feuilles.",
                },
                {
                  time: "4:00 PM",
                  title: "Evening Chai & Muffin Hour",
                  detail: "Fresh organic jaggery muffins, walnut brownies & dark chocolate chunk cookies.",
                },
                {
                  time: "8 AM – 8 PM",
                  title: "Same-Day Cake Frosting",
                  detail: "Need an urgent birthday cake in Mandi? Ready in 3–4 hrs on call: 7947111674.",
                },
              ].map((slot) => (
                <div
                  key={slot.time}
                  className="rounded-2xl border border-border bg-canvas/70 p-4 transition hover:border-herb/40 hover:bg-logo-tint/40"
                >
                  <p className="inline-block rounded-full bg-logo-tint px-2.5 py-0.5 text-[11px] font-semibold text-herb">
                    {slot.time}
                  </p>
                  <h3 className="mt-2 font-display text-base font-semibold text-ink">{slot.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-ink-muted">{slot.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ==================== GUEST TESTIMONIALS ==================== */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Neighborhood Love Across Mandi"
            title="Kind Words From Our Guests"
            description="Nothing makes us happier than returning families from Bagla, Dohandi, Nerchowk, and Mandi for birthdays, anniversaries, and evening café treats."
            align="center"
          />
        </ScrollReveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((review, idx) => (
            <ScrollReveal key={review.id} delayMs={idx * 90}>
              <article
                className="flex h-full flex-col justify-between rounded-3xl border border-border bg-surface p-6 transition hover:border-border-strong hover:shadow-md sm:p-7"
              >
                <div>
                  <div className="flex items-center gap-1 text-saffron" aria-label="5 out of 5 stars">
                    {Array.from({ length: review.rating }).map((_, starIdx) => (
                      <Star key={starIdx} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-ink-olive">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                </div>

                <div className="mt-6 border-t border-border pt-4">
                  <p className="font-display text-base font-semibold text-ink">
                    {review.customerName}
                  </p>
                  <p className="text-xs text-ink-muted">
                    {review.occasion} · {review.cityArea}
                  </p>
                  <p className="mt-1.5 inline-block rounded-full bg-logo-tint px-2.5 py-0.5 text-[11px] font-medium text-herb">
                    {review.orderedItem}
                  </p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ==================== PRE-FOOTER ORDER CTA ==================== */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-[2.25rem] bg-cocoa px-5 py-12 text-center text-logo-tint sm:px-12 sm:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-logo-tint/75">
            100% Pure Veg · Open Daily 8:00 AM – 8:00 PM
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl font-display text-3xl font-semibold text-white sm:text-4xl">
            Reserve Your Fresh Cake Batch Before Weekend Slots Fill Up
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-logo-tint/85 sm:text-base">
            Call Manu &amp; Manisha at <strong>{BAKERY_INFO.contact.phoneRaw}</strong>, message on
            WhatsApp, or drop by near Domino&apos;s, Bagla, Dohandi, Mandi.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-3.5">
            <a
              href={buildWhatsAppLink(
                "Hello Mrida Bakess (Bagla, Mandi)! I'd love to book a 100% Pure Veg fresh cake / check today's counter menu."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-herb px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-herb-hover sm:w-auto"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Order on WhatsApp</span>
            </a>
            <a
              href={BAKERY_INFO.contact.phoneHref}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/20 sm:w-auto"
            >
              <PhoneCall className="h-4 w-4" />
              <span>Call {BAKERY_INFO.contact.phoneRaw}</span>
            </a>
            <Link
              href="/contact/"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-logo-tint px-6 py-3.5 text-sm font-semibold text-ink transition hover:bg-white sm:w-auto"
            >
              <span>Directions &amp; Contact</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
