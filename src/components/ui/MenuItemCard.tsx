"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus, Sparkles, Leaf } from "lucide-react";
import type { MenuItem } from "@/types/bakery";
import { formatInr } from "@/lib/format";
import { useOrderDrawer } from "@/context/OrderDrawerContext";
import { PureVegBadge } from "@/components/ui/PureVegBadge";

interface MenuItemCardProps {
  item: MenuItem;
  compact?: boolean;
}

export function MenuItemCard({ item, compact = false }: MenuItemCardProps) {
  const { addItem } = useOrderDrawer();
  const baseVariant = item.variants[0];
  const secondaryVariant = item.variants[1];

  const handleQuickAdd = () => {
    if (!baseVariant) return;
    addItem({
      itemId: item.id,
      slug: item.slug,
      name: item.name,
      image: item.image,
      variantLabel: baseVariant.label,
      unitPriceInr: baseVariant.priceInr,
      eggless: true,
    });
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-[0_18px_40px_-20px_rgba(34,36,25,0.18)]">
      <Link
        href={`/menu/${item.slug}/`}
        className="relative block aspect-[4/3] w-full overflow-hidden bg-linen"
      >
        <Image
          src={item.image}
          alt={item.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-[1.04]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cocoa/40 via-transparent to-transparent opacity-60" />

        {/* Top badges */}
        <div className="absolute left-3 right-3 top-3 flex flex-wrap items-center justify-between gap-1.5">
          <div className="flex flex-wrap gap-1.5">
            {item.isBestseller ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-logo-tint/95 px-2.5 py-1 text-[11px] font-semibold text-ink shadow-sm backdrop-blur-sm">
                <Sparkles className="h-3 w-3 text-saffron" />
                Bestseller
              </span>
            ) : null}
            {item.isChefSpecial && !item.isBestseller ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-terracotta-soft/95 px-2.5 py-1 text-[11px] font-semibold text-terracotta shadow-sm backdrop-blur-sm">
                Chef&apos;s Special
              </span>
            ) : null}
          </div>

          <PureVegBadge label="Pure Veg" compact className="backdrop-blur-sm shadow-sm" />
        </div>

        {/* Starting Rate Pill */}
        {baseVariant ? (
          <div className="absolute bottom-3 left-3 rounded-full bg-surface/95 px-3 py-1 text-xs font-semibold text-ink shadow-sm backdrop-blur-sm">
            From <span className="text-terracotta">{formatInr(baseVariant.priceInr)}</span>
            <span className="text-ink-muted"> · {baseVariant.weightOrCount}</span>
          </div>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
        <div className="space-y-2.5">
          {item.hindiSubtitle && !compact ? (
            <p className="font-devanagari text-xs font-medium tracking-wide text-ink-olive">
              {item.hindiSubtitle}
            </p>
          ) : null}

          <Link href={`/menu/${item.slug}/`} className="block">
            <h3 className="font-display text-lg font-semibold leading-snug text-ink transition group-hover:text-herb sm:text-xl">
              {item.name}
            </h3>
          </Link>

          <p className="line-clamp-2 text-sm leading-relaxed text-ink-muted">
            {item.shortDescription}
          </p>

          {/* Compact transparent rate table */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1 text-xs font-medium text-ink-olive">
            {baseVariant ? (
              <span>
                {baseVariant.weightOrCount}:{" "}
                <strong className="font-semibold text-ink">
                  {formatInr(baseVariant.priceInr)}
                </strong>
              </span>
            ) : null}
            {secondaryVariant ? (
              <>
                <span aria-hidden="true" className="text-border-strong">
                  •
                </span>
                <span>
                  {secondaryVariant.weightOrCount}:{" "}
                  <strong className="font-semibold text-ink">
                    {formatInr(secondaryVariant.priceInr)}
                  </strong>
                </span>
              </>
            ) : null}
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between gap-2 border-t border-border pt-4">
          <span className="inline-flex min-w-0 items-center gap-1.5 text-xs text-ink-muted">
            <Leaf className="h-3.5 w-3.5 shrink-0 text-herb" />
            <span className="truncate">{item.prepNotice}</span>
          </span>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <Link
              href={`/menu/${item.slug}/`}
              className="rounded-full px-3 py-1.5 text-xs font-semibold text-ink-olive transition hover:bg-linen hover:text-ink"
            >
              Details
            </Link>
            <button
              type="button"
              onClick={handleQuickAdd}
              className="btn-shine inline-flex items-center gap-1 rounded-full bg-herb px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-herb-hover active:scale-95 cursor-pointer"
              aria-label={`Add ${item.name} to order list`}
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
