import Link from "next/link";
import { ArrowLeft, UtensilsCrossed } from "lucide-react";
import { BrandSeal } from "@/components/ui/BrandSeal";

export default function NotFound() {
  return (
    <section className="bg-parchment-glow px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-xl flex-col items-center text-center">
        <BrandSeal size="md" className="mb-6" />
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-terracotta">
          404 · Fresh Out of the Oven
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-ink sm:text-5xl">
          This shelf looks empty!
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-muted">
          The page you are looking for might have been moved, or maybe that treat already sold
          out for the morning. Let&apos;s bring you back to our warm display counter.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-herb px-6 py-3 text-sm font-semibold text-white transition hover:bg-herb-hover"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
          <Link
            href="/menu/"
            className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface px-6 py-3 text-sm font-semibold text-ink transition hover:bg-logo-tint"
          >
            <UtensilsCrossed className="h-4 w-4 text-herb" />
            <span>Browse Full Menu</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
