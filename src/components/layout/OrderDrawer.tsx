"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  Plus,
  Minus,
  Trash2,
  MessageCircle,
  Check,
  Copy,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";
import { useOrderDrawer } from "@/context/OrderDrawerContext";
import { BAKERY_INFO } from "@/data/bakery";
import { buildWhatsAppLink, formatInr, formatOrderSummaryText } from "@/lib/format";

export function OrderDrawer() {
  const {
    items,
    isOpen,
    toastMessage,
    totalEstimate,
    closeDrawer,
    updateQuantity,
    removeItem,
    clearOrder,
    dismissToast,
  } = useOrderDrawer();

  const [pickupNote, setPickupNote] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, closeDrawer]);

  const summaryText = formatOrderSummaryText(items, pickupNote.trim() || undefined);
  const whatsappUrl = buildWhatsAppLink(summaryText);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback ignored gracefully
    }
  };

  return (
    <>
      {/* Live toast banner on Add */}
      {toastMessage ? (
        <div
          role="status"
          aria-live="polite"
          className="animate-fade-up fixed bottom-20 left-4 right-4 z-50 flex items-center gap-3 rounded-2xl border border-herb/30 bg-ink px-4 py-3 text-sm text-logo-tint shadow-xl sm:bottom-5 sm:left-auto sm:right-5 sm:max-w-sm"
        >
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-herb text-white">
            <Check className="h-3.5 w-3.5" />
          </span>
          <p className="flex-1 leading-snug">{toastMessage}</p>
          <button
            type="button"
            onClick={dismissToast}
            className="text-xs font-semibold text-logo-tint/70 hover:text-white cursor-pointer"
          >
            OK
          </button>
        </div>
      ) : null}

      {/* Backdrop + Slide-over Drawer */}
      {isOpen ? (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-ink/40 backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
          aria-label="Your Mrida Bakess Order Tray"
        >
          <div className="fixed inset-0" onClick={closeDrawer} />

          <div className="animate-slide-in-right relative z-10 flex h-[100dvh] w-full max-w-md flex-col border-l border-border bg-canvas shadow-2xl">
            <div className="flex items-center justify-between border-b border-border bg-logo-tint/60 px-5 py-4 sm:px-6">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="h-5 w-5 text-herb shrink-0" />
                <div>
                  <h2 className="font-display text-lg font-semibold text-ink">
                    Your 100% Pure Veg Order Tray
                  </h2>
                  <p className="text-xs text-ink-muted">
                    WhatsApp {BAKERY_INFO.contact.whatsappRaw} or call {BAKERY_INFO.contact.phoneRaw}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={closeDrawer}
                className="rounded-full p-2 text-ink-olive transition hover:bg-linen hover:text-ink cursor-pointer"
                aria-label="Close order tray"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center py-12">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-logo-tint text-herb">
                    <ShoppingBag className="h-7 w-7" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-ink">
                    Your tasting tray is empty
                  </h3>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-muted">
                    Browse our 100% Pure Veg cakes, pastries, and organic tea loaves to build an
                    instant rate estimate and pre-order list.
                  </p>
                  <Link
                    href="/menu/"
                    onClick={closeDrawer}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-herb px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-herb-hover"
                  >
                    <span>Explore Menu &amp; Rates</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={`${item.itemId}-${item.variantLabel}-${item.eggless}-${item.cakeNote ?? ""}`}
                      className="flex gap-3.5 rounded-2xl border border-border bg-surface p-3.5"
                    >
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-linen">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>

                      <div className="flex flex-1 min-w-0 flex-col justify-between">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <Link
                              href={`/menu/${item.slug}/`}
                              onClick={closeDrawer}
                              className="block truncate font-display text-sm font-semibold leading-snug text-ink hover:text-herb"
                            >
                              {item.name}
                            </Link>
                            <p className="mt-0.5 text-xs text-ink-muted">
                              {item.variantLabel} · 100% Pure Veg
                            </p>
                            {item.cakeNote ? (
                              <p className="mt-1 rounded bg-logo-tint px-2 py-0.5 text-[11px] text-ink-olive">
                                Note: &ldquo;{item.cakeNote}&rdquo;
                              </p>
                            ) : null}
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              removeItem(item.itemId, item.variantLabel, item.eggless, item.cakeNote)
                            }
                            className="shrink-0 p-1 text-ink-muted transition hover:text-terracotta cursor-pointer"
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="mt-2.5 flex items-center justify-between">
                          <div className="inline-flex items-center rounded-full border border-border bg-canvas">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  item.itemId,
                                  item.variantLabel,
                                  item.eggless,
                                  -1,
                                  item.cakeNote
                                )
                              }
                              className="px-2.5 py-1.5 text-ink-olive hover:text-ink cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="px-2 text-xs font-semibold text-ink">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  item.itemId,
                                  item.variantLabel,
                                  item.eggless,
                                  1,
                                  item.cakeNote
                                )
                              }
                              className="px-2.5 py-1.5 text-ink-olive hover:text-ink cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>

                          <span className="text-sm font-semibold text-ink">
                            {formatInr(item.unitPriceInr * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="pt-2">
                    <label
                      htmlFor="tray-pickup-note"
                      className="block text-xs font-semibold uppercase tracking-wider text-ink-olive"
                    >
                      Pickup Date / Message on Cake (Optional)
                    </label>
                    <input
                      id="tray-pickup-note"
                      type="text"
                      value={pickupNote}
                      onChange={(e) => setPickupNote(e.target.value)}
                      placeholder="e.g. Saturday 5 PM, Write 'Happy Birthday Aarav'"
                      className="mt-1.5 w-full rounded-xl border border-border-strong bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted/70"
                    />
                  </div>
                </div>
              )}
            </div>

            {items.length > 0 ? (
              <div className="border-t border-border bg-surface px-5 py-4 space-y-3 sm:px-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-ink-muted">Estimated Bakery Total</span>
                  <span className="font-display text-2xl font-semibold text-ink">
                    {formatInr(totalEstimate)}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-herb px-4 py-3 text-sm font-semibold text-white transition hover:bg-herb-hover"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Send on WhatsApp</span>
                  </a>
                  <Link
                    href="/contact/?from=tray"
                    onClick={closeDrawer}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-border-strong bg-logo-tint px-4 py-3 text-sm font-semibold text-ink transition hover:bg-linen"
                  >
                    <span>Book via Form</span>
                  </Link>
                </div>

                <div className="flex items-center justify-between pt-1 text-xs">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 font-medium text-ink-olive hover:text-ink cursor-pointer"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-herb" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copied ? "Copied order list!" : "Copy order summary"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={clearOrder}
                    className="font-medium text-ink-muted hover:text-terracotta cursor-pointer"
                  >
                    Clear tray
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
