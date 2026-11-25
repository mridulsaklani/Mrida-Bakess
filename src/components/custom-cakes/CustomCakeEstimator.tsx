"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { CalendarHeart, Check, Copy, MessageCircle, Sparkles, ZoomIn, X } from "lucide-react";
import {
  CUSTOM_CAKE_SHOWCASES,
  ESTIMATOR_DESIGNS,
  ESTIMATOR_FLAVORS,
} from "@/data/custom-cakes";
import { buildWhatsAppLink, formatInr } from "@/lib/format";
import type { CustomCakeShowcase } from "@/types/bakery";
import { PureVegBadge } from "@/components/ui/PureVegBadge";
import { CustomCakePreview3DLoader } from "@/components/three/CustomCakePreview3DLoader";

type OccasionTab = "All" | CustomCakeShowcase["occasion"];

const OCCASION_TABS: OccasionTab[] = [
  "All",
  "Baby Shower & Kids",
  "Birthday",
  "Wedding & Engagement",
  "Anniversary",
  "Festive",
];

const WEIGHT_OPTIONS = [
  { kg: 0.5, label: "500 g (Serves 5–6)", tierMultiplier: 0.56 },
  { kg: 1, label: "1 kg Single Tier (Serves 10–12)", tierMultiplier: 1 },
  { kg: 1.5, label: "1.5 kg Tall / Doll Tier (Serves 15–18)", tierMultiplier: 1.48 },
  { kg: 2, label: "2 kg Two-Tier (Serves 22–24)", tierMultiplier: 2.08 },
  { kg: 3, label: "3 kg Two-Tier (Serves 32–36)", tierMultiplier: 3.05 },
  { kg: 4, label: "4 kg Grand Tier (Serves 45+)", tierMultiplier: 4.15 },
];

export function CustomCakeEstimator() {
  const [occasionFilter, setOccasionFilter] = useState<OccasionTab>("All");

  // Estimator state
  const [occasion, setOccasion] = useState("Birthday Celebration");
  const [flavorId, setFlavorId] = useState(ESTIMATOR_FLAVORS[0].id);
  const [weightIdx, setWeightIdx] = useState(1);
  const [designId, setDesignId] = useState(ESTIMATOR_DESIGNS[1].id);
  const [lowSugar, setLowSugar] = useState(false);
  const [eventDate, setEventDate] = useState("");
  const [themeNotes, setThemeNotes] = useState("");
  const [copied, setCopied] = useState(false);
  const [zoomCake, setZoomCake] = useState<CustomCakeShowcase | null>(null);

  useEffect(() => {
    if (!zoomCake) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomCake(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoomCake]);

  const visibleShowcases = useMemo(() => {
    if (occasionFilter === "All") return CUSTOM_CAKE_SHOWCASES;
    return CUSTOM_CAKE_SHOWCASES.filter((c) => c.occasion === occasionFilter);
  }, [occasionFilter]);

  const selectedFlavor =
    ESTIMATOR_FLAVORS.find((f) => f.id === flavorId) ?? ESTIMATOR_FLAVORS[0];
  const selectedWeight = WEIGHT_OPTIONS[weightIdx] ?? WEIGHT_OPTIONS[1];
  const selectedDesign =
    ESTIMATOR_DESIGNS.find((d) => d.id === designId) ?? ESTIMATOR_DESIGNS[0];

  const estimatedTotal =
    Math.round(
      (selectedFlavor.ratePerKg * selectedWeight.tierMultiplier + selectedDesign.extraFeeInr) /
        10
    ) * 10;

  const briefText = [
    "Hello Manu & Manisha (Mrida Bakess, Mandi)!",
    "I'd like to book / get a final quote for a 100% Pure Veg Custom Celebration Cake:",
    `• Occasion: ${occasion}`,
    `• Weight & Tiers: ${selectedWeight.label}`,
    `• Sponge & Filling: ${selectedFlavor.label}`,
    `• Design Finish: ${selectedDesign.label}`,
    `• Dietary: 100% Pure Veg & Eggless`,
    `• Sweetness: ${lowSugar ? "Lightly Sweetened (Low Sugar)" : "Signature Balanced"}`,
    eventDate ? `• Target Date: ${eventDate}` : "",
    themeNotes.trim() ? `• Theme / Colors / Cake Message: ${themeNotes.trim()}` : "",
    `• Estimator Range: ~${formatInr(estimatedTotal)} – ${formatInr(estimatedTotal + 250)}`,
  ]
    .filter(Boolean)
    .join("\n");

  const handleCopyBrief = async () => {
    try {
      await navigator.clipboard.writeText(briefText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // Ignore safely
    }
  };

  return (
    <div className="space-y-16">
      {/* ==================== GALLERY WITH OCCASION FILTERS ==================== */}
      <section id="gallery" className="space-y-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-herb">
              Manisha&apos;s Real Cake Studio
            </p>
            <h2 className="mt-1 font-display text-3xl font-semibold text-ink">
              Signature Custom Creations
            </h2>
          </div>

          <div
            className="flex flex-nowrap gap-2 overflow-x-auto no-scrollbar pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0"
            role="tablist"
            aria-label="Filter cake gallery"
          >
            {OCCASION_TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={occasionFilter === tab}
                onClick={() => setOccasionFilter(tab)}
                className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition cursor-pointer ${
                  occasionFilter === tab
                    ? "bg-ink text-logo-tint shadow-xs"
                    : "border border-border-strong bg-surface text-ink-olive hover:bg-logo-tint"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleShowcases.map((cake) => (
            <article
              key={cake.id}
              className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-lg"
            >
              <button
                type="button"
                onClick={() => setZoomCake(cake)}
                className="relative block aspect-[4/5] w-full overflow-hidden bg-linen text-left cursor-pointer"
                aria-label={`Zoom ${cake.title}`}
              >
                <Image
                  src={cake.image}
                  alt={cake.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={`object-cover ${cake.imagePosition ?? "object-center"} transition duration-500 group-hover:scale-[1.03]`}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cocoa/35 via-transparent to-transparent" />
                <span className="absolute left-3 top-3 rounded-full bg-logo-tint/95 px-3 py-1 text-[11px] font-semibold text-ink backdrop-blur-sm">
                  {cake.occasion}
                </span>
                <PureVegBadge
                  label="Pure Veg"
                  compact
                  className="absolute right-3 top-3 backdrop-blur-sm"
                />
                <span className="absolute bottom-3 left-3 rounded-full bg-surface/95 px-3 py-1 text-xs font-semibold text-ink shadow-xs backdrop-blur-sm">
                  From <span className="text-terracotta">{formatInr(cake.startingPriceInr)}</span>
                </span>
                <span className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-ink/75 text-logo-tint opacity-0 transition group-hover:opacity-100 backdrop-blur-sm">
                  <ZoomIn className="h-4 w-4" />
                </span>
              </button>

              <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                <div className="space-y-2">
                  <h3 className="font-display text-xl font-semibold text-ink">{cake.title}</h3>
                  <p className="text-xs font-semibold text-herb">
                    {cake.flavor} · {cake.weightLabel}
                  </p>
                  <p className="text-sm leading-relaxed text-ink-muted">{cake.description}</p>
                </div>

                <div className="mt-4 border-t border-border pt-3 text-xs font-medium text-ink-olive">
                  100% Pure Veg &amp; Freshly Piped to Order
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ==================== INTERACTIVE QUOTE ESTIMATOR ==================== */}
      <section
        id="estimator"
        className="rounded-[2.25rem] border border-border-strong bg-surface p-5 shadow-sm sm:p-10"
      >
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-herb">
                <Sparkles className="h-3.5 w-3.5 text-saffron" />
                <span>Interactive 100% Pure Veg Cake Planner</span>
              </div>
              <h2 className="mt-1 font-display text-3xl font-semibold text-ink">
                Estimate Your Custom Cake
              </h2>
              <p className="mt-2 text-sm text-ink-muted">
                Select your occasion, flavor, and tier weight to see an honest price estimate and
                send your exact brief straight to Manu &amp; Manisha.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="cc-occasion"
                  className="block text-xs font-semibold uppercase tracking-wider text-ink-olive"
                >
                  Occasion
                </label>
                <select
                  id="cc-occasion"
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border-strong bg-canvas px-3.5 py-2.5 text-sm font-medium text-ink"
                >
                  <option>Birthday Celebration</option>
                  <option>Kids Theme / Doll Cake</option>
                  <option>Baby Shower / Gender Reveal</option>
                  <option>Engagement / Wedding</option>
                  <option>Anniversary / Family Celebration</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="cc-date"
                  className="block text-xs font-semibold uppercase tracking-wider text-ink-olive"
                >
                  Celebration Date
                </label>
                <input
                  id="cc-date"
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border-strong bg-canvas px-3.5 py-2.5 text-sm font-medium text-ink"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="cc-flavor"
                className="block text-xs font-semibold uppercase tracking-wider text-ink-olive"
              >
                100% Pure Veg Sponge &amp; Filling Pairing
              </label>
              <select
                id="cc-flavor"
                value={flavorId}
                onChange={(e) => setFlavorId(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-border-strong bg-canvas px-3.5 py-2.5 text-sm font-medium text-ink"
              >
                {ESTIMATOR_FLAVORS.map((flavor) => (
                  <option key={flavor.id} value={flavor.id}>
                    {flavor.label} (from {formatInr(flavor.ratePerKg)}/kg)
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="cc-weight"
                  className="block text-xs font-semibold uppercase tracking-wider text-ink-olive"
                >
                  Weight &amp; Tier Structure
                </label>
                <select
                  id="cc-weight"
                  value={weightIdx}
                  onChange={(e) => setWeightIdx(Number(e.target.value))}
                  className="mt-1.5 w-full rounded-xl border border-border-strong bg-canvas px-3.5 py-2.5 text-sm font-medium text-ink"
                >
                  {WEIGHT_OPTIONS.map((w, idx) => (
                    <option key={w.label} value={idx}>
                      {w.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="cc-design"
                  className="block text-xs font-semibold uppercase tracking-wider text-ink-olive"
                >
                  Finishing Style
                </label>
                <select
                  id="cc-design"
                  value={designId}
                  onChange={(e) => setDesignId(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border-strong bg-canvas px-3.5 py-2.5 text-sm font-medium text-ink"
                >
                  {ESTIMATOR_DESIGNS.map((design) => (
                    <option key={design.id} value={design.id}>
                      {design.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-canvas/70 p-3.5">
              <PureVegBadge label="100% Pure Veg & Eggless" />
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setLowSugar(false)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition cursor-pointer ${
                    !lowSugar
                      ? "bg-herb text-white"
                      : "border border-border-strong bg-surface text-ink-olive"
                  }`}
                >
                  Balanced Sugar
                </button>
                <button
                  type="button"
                  onClick={() => setLowSugar(true)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition cursor-pointer ${
                    lowSugar
                      ? "bg-ink text-logo-tint"
                      : "border border-border-strong bg-surface text-ink-olive"
                  }`}
                >
                  Lightly Sweetened
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="cc-notes"
                className="block text-xs font-semibold uppercase tracking-wider text-ink-olive"
              >
                Color Palette, Theme Toy/Doll or Cake Message
              </label>
              <textarea
                id="cc-notes"
                rows={3}
                value={themeNotes}
                onChange={(e) => setThemeNotes(e.target.value)}
                placeholder="e.g. JCB Excavator cake for Aarav, Princess pink rosette doll cake for Luvika, or sage florals..."
                className="mt-1.5 w-full rounded-2xl border border-border-strong bg-canvas px-4 py-3 text-sm text-ink placeholder:text-ink-muted/70"
              />
            </div>
          </div>

          {/* Right Live 3D Visualizer + Estimate Summary */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28 space-y-5">
              <CustomCakePreview3DLoader
                flavorId={flavorId}
                weightKg={selectedWeight.kg}
                designId={designId}
              />

              <div className="rounded-3xl border border-border-strong bg-logo-tint/75 p-6 sm:p-8 space-y-5">
              <div className="flex items-center justify-between gap-2 text-herb">
                <div className="flex items-center gap-2">
                  <CalendarHeart className="h-5 w-5" />
                  <span className="text-xs font-semibold uppercase tracking-[0.18em]">
                    Estimated Cake Quote
                  </span>
                </div>
                <PureVegBadge label="Pure Veg" compact />
              </div>

              <div>
                <p className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                  {formatInr(estimatedTotal)}{" "}
                  <span className="text-lg font-normal text-ink-olive sm:text-xl">
                    – {formatInr(estimatedTotal + 250)}
                  </span>
                </p>
                <p className="mt-1.5 text-xs text-ink-muted">
                  Includes fresh 100% Pure Veg sponge, filling, theme garnish, and reinforced bakery
                  box.
                </p>
              </div>

              <div className="space-y-2 rounded-2xl bg-surface/90 p-4 text-xs text-ink-olive ring-1 ring-border">
                <p>
                  <strong className="text-ink">Occasion:</strong> {occasion}
                </p>
                <p>
                  <strong className="text-ink">Weight:</strong> {selectedWeight.label}
                </p>
                <p>
                  <strong className="text-ink">Flavor:</strong> {selectedFlavor.label}
                </p>
                <p>
                  <strong className="text-ink">Finish:</strong> {selectedDesign.label}
                </p>
                <p>
                  <strong className="text-ink">Kitchen Standard:</strong> 100% Pure Veg &amp;
                  Eggless · {lowSugar ? "Lightly Sweetened" : "Balanced Regular"}
                </p>
              </div>

              <div className="space-y-2.5 pt-1">
                <a
                  href={buildWhatsAppLink(briefText)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-herb px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-herb-hover"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Send Cake Brief on WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyBrief}
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-border-strong bg-surface px-6 py-3 text-xs font-semibold text-ink transition hover:bg-linen cursor-pointer"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-herb" />
                  ) : (
                    <Copy className="h-4 w-4 text-ink-olive" />
                  )}
                  <span>{copied ? "Copied Cake Brief!" : "Copy Quote Brief"}</span>
                </button>
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {zoomCake ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={zoomCake.title}
          className="fixed inset-0 z-50 flex items-center justify-center bg-cocoa/90 p-4 backdrop-blur-sm"
          onClick={() => setZoomCake(null)}
        >
          <div
            className="animate-fade-up relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/15 bg-ink shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[4/5] max-h-[75vh] w-full bg-cocoa">
              <Image
                src={zoomCake.image}
                alt={zoomCake.title}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-white/10 bg-ink px-5 py-3.5 text-logo-tint">
              <div>
                <p className="font-display text-lg font-semibold text-white">{zoomCake.title}</p>
                <p className="text-xs text-logo-tint/80">
                  {zoomCake.flavor} · From {formatInr(zoomCake.startingPriceInr)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setZoomCake(null)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-herb text-white hover:bg-herb-hover cursor-pointer"
                aria-label="Close cake zoom"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
