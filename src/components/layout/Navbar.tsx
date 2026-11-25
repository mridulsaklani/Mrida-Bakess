"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingBag, PhoneCall, Clock, MapPin } from "lucide-react";
import { BrandSeal } from "@/components/ui/BrandSeal";
import { PureVegBadge } from "@/components/ui/PureVegBadge";
import { BAKERY_INFO } from "@/data/bakery";
import { useOrderDrawer } from "@/context/OrderDrawerContext";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/menu/", label: "Menu & Rates" },
  { href: "/custom-cakes/", label: "Custom Cakes" },
  { href: "/gallery/", label: "Gallery" },
  { href: "/about/", label: "About Us" },
  { href: "/contact/", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, openDrawer } = useOrderDrawer();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" || pathname === "";
    return pathname?.startsWith(href.replace(/\/$/, ""));
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-canvas/92 backdrop-blur-md">
      {/* Subtle Pure Veg & Hours announcement bar */}
      <div className="bg-logo-tint border-b border-border/80 px-3 py-1.5 text-center text-[11px] font-medium text-ink-olive sm:px-4 sm:text-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-x-2.5 sm:gap-x-3">
          <span className="inline-flex items-center gap-1.5 font-semibold text-herb">
            <span
              aria-hidden="true"
              className="flex h-3 w-3 shrink-0 items-center justify-center rounded-[2px] border border-herb bg-white"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-herb" />
            </span>
            100% Pure Veg
          </span>
          <span className="text-border-strong" aria-hidden="true">
            •
          </span>
          <span className="truncate">
            <span className="font-devanagari font-semibold text-ink">मृदा Bakess</span> ·{" "}
            <span className="hidden sm:inline">Fresh • Flavourful • Organic</span>
            <span className="sm:hidden">Open 8 AM – 8 PM</span>
          </span>
          <span className="hidden md:inline text-border-strong" aria-hidden="true">
            |
          </span>
          <span className="hidden md:inline-flex items-center gap-1 text-ink">
            <Clock className="h-3 w-3 text-herb" />
            Open Daily 8:00 AM – 8:00 PM
          </span>
          <span className="hidden lg:inline text-border-strong" aria-hidden="true">
            |
          </span>
          <a
            href={BAKERY_INFO.contact.phoneHref}
            className="hidden lg:inline-flex items-center gap-1 font-semibold text-ink hover:text-herb transition"
          >
            <PhoneCall className="h-3 w-3 text-herb" />
            {BAKERY_INFO.contact.phoneRaw}
          </a>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-2.5 sm:gap-4 sm:px-6 sm:py-3 lg:px-8">
        {/* Brand Logo Lockup: crisp logo + veg icon only on <sm mobile; full lockup on sm+ */}
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-2 focus-visible:rounded-xl sm:gap-3"
          onClick={() => setMobileOpen(false)}
          aria-label="Mrida Bakess Home (100% Pure Veg)"
        >
          <BrandSeal
            size="sm"
            className="h-11 w-11 sm:h-12 sm:w-12 transition-transform duration-300 group-hover:scale-105"
          />

          {/* Mobile: compact green Pure Veg icon mark beside the logo (zero text clash/truncation) */}
          <PureVegBadge
            iconOnly
            label="100% Pure Veg"
            displayClass="inline-flex sm:hidden"
            className="shrink-0"
          />

          {/* Tablet / Desktop: full brand lockup */}
          <div className="hidden min-w-0 flex-col sm:flex">
            <div className="flex items-center gap-2">
              <span className="font-display text-[1.35rem] font-semibold leading-none tracking-tight text-ink">
                {BAKERY_INFO.brandName}
              </span>
              <PureVegBadge
                label="Pure Veg"
                compact
                displayClass="inline-flex"
                className="py-0.5 text-[10px]"
              />
            </div>
            <span className="mt-1 text-[11px] font-medium uppercase tracking-[0.16em] text-ink-olive">
              <span className="font-devanagari">मृदा Bakess</span> · Mandi, HP
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3 py-2 text-sm font-medium transition-all duration-200 xl:px-3.5 ${
                  active
                    ? "bg-logo-tint text-ink font-semibold ring-1 ring-border-strong shadow-xs"
                    : "text-ink-olive hover:bg-linen hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <a
            href={BAKERY_INFO.contact.phoneHref}
            className="hidden items-center gap-1.5 rounded-full border border-border-strong bg-surface px-3.5 py-2 text-xs font-semibold text-ink transition hover:border-herb hover:bg-logo-tint xl:inline-flex"
          >
            <PhoneCall className="h-3.5 w-3.5 text-herb" />
            <span>{BAKERY_INFO.contact.phoneDisplay}</span>
          </a>

          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              openDrawer();
            }}
            className="relative inline-flex h-10 items-center gap-1.5 rounded-full bg-ink px-3.5 text-xs font-semibold text-logo-tint shadow-xs transition hover:bg-herb hover:text-white active:scale-95 cursor-pointer sm:px-4 sm:gap-2 sm:text-sm"
            aria-label={`Open order list (${totalItems} items)`}
          >
            <ShoppingBag className="h-4 w-4 shrink-0" />
            <span className="hidden sm:inline">Order Tray</span>
            <span className="sm:hidden">Tray</span>
            {totalItems > 0 ? (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-terracotta px-1.5 text-[11px] font-bold text-white">
                {totalItems}
              </span>
            ) : null}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-strong bg-surface text-ink transition hover:bg-logo-tint lg:hidden cursor-pointer"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen ? (
        <nav
          aria-label="Mobile navigation"
          className="animate-fade-up border-t border-border bg-canvas px-4 pb-5 pt-3 shadow-lg lg:hidden"
        >
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-border bg-logo-tint/70 px-3.5 py-2.5 text-xs text-ink-olive">
            <span className="inline-flex items-center gap-1.5 font-medium text-ink">
              <MapPin className="h-3.5 w-3.5 text-herb" />
              Mrida Bakess · Bagla, Mandi
            </span>
            <span className="inline-flex items-center gap-1 font-semibold text-herb">
              <Clock className="h-3.5 w-3.5" />
              8 AM – 8 PM Daily
            </span>
          </div>

          <div className="flex flex-col gap-1.5">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-2xl px-4 py-3 text-base font-medium transition ${
                    active
                      ? "bg-logo-tint text-ink font-semibold ring-1 ring-border-strong"
                      : "text-ink-olive hover:bg-linen"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
          <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
            <a
              href={BAKERY_INFO.contact.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-herb px-4 py-3 text-sm font-semibold text-white transition hover:bg-herb-hover"
            >
              <PhoneCall className="h-4 w-4" />
              <span>Call Bakehouse: {BAKERY_INFO.contact.phoneDisplay}</span>
            </a>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
