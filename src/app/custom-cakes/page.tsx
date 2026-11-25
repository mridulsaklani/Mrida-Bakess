import { CalendarHeart, CheckCircle2 } from "lucide-react";
import { CUSTOM_CAKE_TIER_RATES } from "@/data/custom-cakes";
import { buildBreadcrumbJsonLd, buildCustomCakesJsonLd, createPageMetadata } from "@/lib/seo";
import { formatInr } from "@/lib/format";
import { JsonLdScript } from "@/components/ui/JsonLdScript";
import { PureVegBadge } from "@/components/ui/PureVegBadge";
import { CustomCakeEstimator } from "@/components/custom-cakes/CustomCakeEstimator";

export const metadata = createPageMetadata({
  title: "Custom Birthday, Doll & Wedding Cakes",
  description:
    "Order 100% Pure Veg custom birthday, kids excavator, princess doll, baby shower & tiered wedding cakes in Bagla, Mandi from ₹550. Live 3D builder & quote.",
  path: "/custom-cakes",
  keywords: [
    "100% Pure Veg custom birthday cakes Mandi",
    "kids excavator cake",
    "princess doll cake Bagla Mandi",
    "baby shower gender reveal cake",
    "Manisha Thakur cakes",
  ],
  image: "/images/cake-doll-rosette.jpg",
});

export default function CustomCakesPage() {
  const customCatalogSchema = buildCustomCakesJsonLd();
  const breadcrumb = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Custom Cakes", path: "/custom-cakes/" },
  ]);

  return (
    <>
      <JsonLdScript data={customCatalogSchema} />
      <JsonLdScript data={breadcrumb} />

      <section className="bg-parchment-glow border-b border-border py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 rounded-full bg-logo-tint px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-terracotta ring-1 ring-border">
                <CalendarHeart className="h-3.5 w-3.5" />
                <span>Bespoke Celebrations by Manisha &amp; Manu</span>
              </div>
              <PureVegBadge label="100% Pure Veg & Eggless" compact />
            </div>

            <h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
              Custom Celebration Cakes, Hand-Piped to Your Moment
            </h1>
            <p className="text-base leading-relaxed text-ink-olive sm:text-lg">
              Known across Mandi for crisp buttercream detailing, joyful kids theme &amp; princess
              doll cakes, pure Belgian ganache, and 100% Pure Veg sponges that taste unforgettable.
            </p>
          </div>

          {/* Transparent Tier Rate Strip */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CUSTOM_CAKE_TIER_RATES.map((tier) => (
              <div
                key={tier.tierName}
                className="flex flex-col justify-between rounded-3xl border border-border-strong bg-surface p-5"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-herb">
                    {tier.weightRange} · {tier.serves}
                  </p>
                  <h2 className="mt-1 font-display text-xl font-semibold text-ink">
                    {tier.tierName}
                  </h2>
                  <p className="mt-2 font-display text-2xl font-semibold text-terracotta">
                    From {formatInr(tier.startingPriceInr)}
                  </p>
                </div>
                <p className="mt-3 flex items-start gap-1.5 border-t border-border pt-3 text-xs leading-relaxed text-ink-muted">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-herb" />
                  <span>{tier.includes}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <CustomCakeEstimator />
      </section>
    </>
  );
}
