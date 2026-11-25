"use client";

import { PhoneCall, MessageCircle, ShoppingBag } from "lucide-react";
import { BAKERY_INFO } from "@/data/bakery";
import { buildWhatsAppLink } from "@/lib/format";
import { useOrderDrawer } from "@/context/OrderDrawerContext";

export function MobileQuickBar() {
  const { isOpen, totalItems, openDrawer } = useOrderDrawer();

  if (isOpen) return null;

  return (
    <div
      className="no-print fixed inset-x-0 bottom-0 z-30 border-t border-border-strong bg-surface/95 px-3 py-2 backdrop-blur-md shadow-[0_-10px_30px_-14px_rgba(34,36,25,0.2)] md:hidden"
      role="region"
      aria-label="Quick bakery actions"
    >
      <div className="mx-auto grid max-w-md grid-cols-3 gap-2">
        <a
          href={BAKERY_INFO.contact.phoneHref}
          className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full border border-border-strong bg-canvas px-2 text-xs font-semibold text-ink transition active:scale-95"
        >
          <PhoneCall className="h-3.5 w-3.5 text-herb" />
          <span>Call Now</span>
        </a>

        <a
          href={buildWhatsAppLink(
            "Hello Manu & Manisha (Mrida Bakess, Mandi)! I'd like to inquire about a 100% Pure Veg cake order."
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full bg-herb px-2 text-xs font-semibold text-white transition active:scale-95"
        >
          <MessageCircle className="h-3.5 w-3.5" />
          <span>WhatsApp</span>
        </a>

        <button
          type="button"
          onClick={openDrawer}
          className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full bg-ink px-2 text-xs font-semibold text-logo-tint transition active:scale-95 cursor-pointer"
          aria-label={`Open Order Tray (${totalItems} items)`}
        >
          <ShoppingBag className="h-3.5 w-3.5" />
          <span>Tray ({totalItems})</span>
        </button>
      </div>
    </div>
  );
}
