import { Suspense } from "react";
import Link from "next/link";
import { Sparkles, CalendarHeart, Box } from "lucide-react";
import { BAKERY_INFO } from "@/data/bakery";
import { buildBreadcrumbJsonLd, buildMenuJsonLd, createPageMetadata } from "@/lib/seo";
import { JsonLdScript } from "@/components/ui/JsonLdScript";
import { PureVegBadge } from "@/components/ui/PureVegBadge";
import { BakeryStudio3DLoader } from "@/components/three/BakeryStudio3DLoader";
import { MenuCatalogClient } from "@/components/menu/MenuCatalogClient";

export const metadata = createPageMetadata({
  title: "100% Pure Veg Bakery Menu & Rates — Cakes, Pastries, Tea Loaves & Cookies",
  description: `Explore the full ${BAKERY_INFO.brandName} 100% Pure Veg menu and transparent INR rate card: eggless celebration cakes from ₹460, Belgian truffle pastries, saffron pistachio cakes, butter croissants & gift boxes in Bagla, Mandi.`,
  path: "/menu",
  keywords: [
    "Mrida Bakess menu",
    "100% Pure Veg cake rates Mandi",
    "eggless pastry prices",
    "Belgian truffle cake price",
    "rasmalai cake price",
    "bakery rate card",
  ],
  image: "/images/pastries-collection.jpg",
});

export default function MenuPage() {
  const menuSchema = buildMenuJsonLd();
  const breadcrumbSchema = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Menu & Rates", path: "/menu/" },
  ]);

  return (
    <>
      <JsonLdScript data={menuSchema} />
      <JsonLdScript data={breadcrumbSchema} />

      <section className="bg-parchment-glow border-b border-border py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl space-y-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="inline-flex items-center gap-2 rounded-full bg-logo-tint px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-herb ring-1 ring-border">
                  <Sparkles className="h-3.5 w-3.5 text-saffron" />
                  <span>Fresh Counter &amp; Pre-Order Menu</span>
                </div>
                <PureVegBadge label="100% Pure Veg" compact />
              </div>

              <h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
                100% Pure Veg Menu &amp; Transparent Rate Card
              </h1>
              <p className="text-base leading-relaxed text-ink-olive sm:text-lg">
                Handcrafted daily by Manu &amp; Manisha using pure dairy butter, 54% Belgian
                couverture, and stone-milled grains. Open 8 AM – 8 PM daily in Bagla, Mandi. Switch
                to Rate Card anytime for a clean printable view.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5 lg:justify-end">
              <a
                href="#studio-3d"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-logo-tint shadow-xs transition hover:bg-herb hover:text-white"
              >
                <Box className="h-4 w-4" />
                <span>Try 3D Cake Case</span>
              </a>
              <Link
                href="/custom-cakes/"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-border-strong bg-surface px-5 py-3 text-sm font-semibold text-ink shadow-xs transition hover:border-herb hover:bg-logo-tint"
              >
                <CalendarHeart className="h-4 w-4 text-terracotta" />
                <span>Custom Theme Cakes</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 3D INTERACTIVE CAKE CASE & ASSEMBLER ==================== */}
      <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8 lg:pt-14">
        <BakeryStudio3DLoader />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <Suspense
          fallback={
            <div className="rounded-3xl border border-border bg-surface p-12 text-center text-sm text-ink-muted">
              Loading fresh 100% Pure Veg bakery menu &amp; rates...
            </div>
          }
        >
          <MenuCatalogClient />
        </Suspense>
      </section>
    </>
  );
}
