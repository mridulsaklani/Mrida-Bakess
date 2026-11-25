"use client";

import { useState } from "react";
import { Plus, MessageCircle, Leaf, Check, Clock, Sparkles } from "lucide-react";
import type { MenuItem } from "@/types/bakery";
import { buildWhatsAppLink, formatInr } from "@/lib/format";
import { useOrderDrawer } from "@/context/OrderDrawerContext";
import { PureVegBadge } from "@/components/ui/PureVegBadge";

export function ItemDetailClient({ item }: { item: MenuItem }) {
  const { addItem, openDrawer } = useOrderDrawer();
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [cakeNote, setCakeNote] = useState("");

  const activeVariant = item.variants[selectedVariantIdx] ?? item.variants[0];
  const subtotal = (activeVariant?.priceInr ?? 0) * quantity;

  const handleAddToTray = () => {
    if (!activeVariant) return;
    addItem(
      {
        itemId: item.id,
        slug: item.slug,
        name: item.name,
        image: item.image,
        variantLabel: activeVariant.label,
        unitPriceInr: activeVariant.priceInr,
        eggless: true,
        cakeNote: cakeNote.trim() || undefined,
      },
      quantity
    );
    openDrawer();
  };

  const directWhatsAppText = [
    `Hello Manu & Manisha (Mrida Bakess, Mandi)! I'd like to order:`,
    `• ${item.name} (100% Pure Veg)`,
    `• Size / Pack: ${activeVariant?.label ?? ""}`,
    `• Quantity: ${quantity} (${formatInr(subtotal)})`,
    cakeNote.trim() ? `• Cake Message / Note: ${cakeNote.trim()}` : "",
    `Please confirm availability & pickup timing!`,
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <div className="space-y-6">
      {/* Variant Selector */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-olive">
          1. Select Weight / Portion
        </p>
        <div className="mt-2.5 grid gap-2.5 sm:grid-cols-2">
          {item.variants.map((variant, idx) => {
            const active = idx === selectedVariantIdx;
            return (
              <button
                key={variant.label}
                type="button"
                onClick={() => setSelectedVariantIdx(idx)}
                className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-left transition cursor-pointer ${
                  active
                    ? "border-herb bg-logo-tint ring-1 ring-herb"
                    : "border-border-strong bg-surface hover:bg-linen"
                }`}
              >
                <div>
                  <p className="text-sm font-semibold text-ink">{variant.weightOrCount}</p>
                  <p className="text-xs text-ink-muted">{variant.label}</p>
                </div>
                <span className="font-display text-lg font-semibold text-terracotta">
                  {formatInr(variant.priceInr)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Pure Veg Kitchen Assurance */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-olive">
          2. 100% Pure Veg Kitchen Standard
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-2.5">
          <PureVegBadge label="100% Pure Veg & Strictly Eggless" />
          <span className="inline-flex items-center gap-1.5 rounded-full bg-herb-soft/60 px-3 py-1 text-xs font-semibold text-herb">
            <Check className="h-3.5 w-3.5" />
            Freshly baked to order
          </span>
        </div>
      </div>

      {/* Optional Cake Message + Qty */}
      <div className="grid gap-4 sm:grid-cols-12">
        <div className="sm:col-span-8">
          <label
            htmlFor="item-cake-note"
            className="block text-xs font-semibold uppercase tracking-[0.16em] text-ink-olive"
          >
            Custom Message or Note (Optional)
          </label>
          <input
            id="item-cake-note"
            type="text"
            value={cakeNote}
            onChange={(e) => setCakeNote(e.target.value)}
            placeholder="e.g. Happy Anniversary Maa & Papa, less sugar"
            className="mt-1.5 w-full rounded-xl border border-border-strong bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted/70"
          />
        </div>

        <div className="sm:col-span-4">
          <label
            htmlFor="item-qty"
            className="block text-xs font-semibold uppercase tracking-[0.16em] text-ink-olive"
          >
            Quantity
          </label>
          <select
            id="item-qty"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="mt-1.5 w-full rounded-xl border border-border-strong bg-surface px-3.5 py-2.5 text-sm font-semibold text-ink cursor-pointer"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Price Summary & Action Buttons */}
      <div className="rounded-3xl border border-border-strong bg-logo-tint/65 p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-xs font-medium text-ink-olive">Estimated Item Price</p>
            <p className="font-display text-3xl font-semibold text-ink">{formatInr(subtotal)}</p>
          </div>
          <div className="text-left sm:text-right text-xs text-ink-muted">
            <p className="inline-flex items-center gap-1 font-medium text-herb">
              <Clock className="h-3.5 w-3.5 shrink-0" />
              {item.prepNotice}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2.5 sm:flex-row">
          <button
            type="button"
            onClick={handleAddToTray}
            className="flex-1 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-logo-tint transition hover:bg-herb hover:text-white cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Add to Order Tray</span>
          </button>

          <a
            href={buildWhatsAppLink(directWhatsAppText)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border-strong bg-surface px-6 py-3.5 text-sm font-semibold text-ink transition hover:border-herb hover:bg-white"
          >
            <MessageCircle className="h-4 w-4 text-herb" />
            <span>Quick Order on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Ingredients & Serving */}
      <div className="space-y-4 border-t border-border pt-5">
        <div>
          <h2 className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-ink-olive">
            <Leaf className="h-3.5 w-3.5 text-herb" />
            <span>100% Pure Veg Kitchen Ingredients</span>
          </h2>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {item.ingredients.map((ing) => (
              <span
                key={ing}
                className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-ink-olive"
              >
                {ing}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-linen/80 p-4 text-xs leading-relaxed text-ink-olive">
          <span className="inline-flex items-center gap-1 font-semibold text-ink">
            <Sparkles className="h-3.5 w-3.5 text-saffron" />
            Baker&apos;s Serving Note:
          </span>{" "}
          {item.servingNote}
        </div>
      </div>
    </div>
  );
}
