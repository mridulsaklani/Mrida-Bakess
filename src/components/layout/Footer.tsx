import Link from "next/link";
import { MapPin, Phone, Clock, Heart, MessageCircle, ExternalLink } from "lucide-react";
import { BAKERY_INFO } from "@/data/bakery";
import { BrandSeal } from "@/components/ui/BrandSeal";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { buildWhatsAppLink } from "@/lib/format";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-cocoa text-[#f4fade]/90">
      <div className="mx-auto max-w-7xl px-4 pt-14 pb-24 sm:px-6 md:pb-14 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3.5">
              <BrandSeal size="md" className="ring-2 ring-logo-tint/30" />
              <div>
                <p className="font-display text-2xl font-semibold text-logo-tint">
                  {BAKERY_INFO.brandName}
                </p>
                <p className="text-xs tracking-[0.16em] uppercase text-logo-tint/75">
                  <span className="font-devanagari">{BAKERY_INFO.logoTextLabel}</span> ·{" "}
                  {BAKERY_INFO.tagline}
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-logo-tint/80 max-w-sm">
              {BAKERY_INFO.aboutShort}
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-herb/85 px-3 py-1.5 text-xs font-semibold text-white">
                <span
                  aria-hidden="true"
                  className="flex h-3 w-3 items-center justify-center rounded-[2px] border border-white bg-white"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-herb" />
                </span>
                100% Pure Veg Kitchen
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-logo-tint">
                <Heart className="h-3.5 w-3.5 text-terracotta-soft" />
                <span>{BAKERY_INFO.foundersLine}</span>
              </span>
            </div>
          </div>

          {/* Explore Links */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-logo-tint/65">
              Bakery Pages
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/menu/" className="hover:text-white transition">
                  Full Menu &amp; Rates
                </Link>
              </li>
              <li>
                <Link href="/custom-cakes/" className="hover:text-white transition">
                  Custom Theme Cakes
                </Link>
              </li>
              <li>
                <Link href="/gallery/" className="hover:text-white transition">
                  Photo Gallery
                </Link>
              </li>
              <li>
                <Link href="/about/" className="hover:text-white transition">
                  About Our Bakehouse
                </Link>
              </li>
              <li>
                <Link href="/contact/" className="hover:text-white transition">
                  Visit &amp; Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Menu Categories */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-logo-tint/65">
              100% Pure Veg Bakes
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/menu/?category=cakes" className="hover:text-white transition">
                  Pure Veg Celebration Cakes
                </Link>
              </li>
              <li>
                <Link href="/menu/?category=pastries" className="hover:text-white transition">
                  Belgian Truffle &amp; Pistachio Pastries
                </Link>
              </li>
              <li>
                <Link href="/menu/?category=tea-cakes" className="hover:text-white transition">
                  Organic Wholewheat &amp; Jaggery Loaves
                </Link>
              </li>
              <li>
                <Link href="/menu/?category=cookies-breads" className="hover:text-white transition">
                  Butter Croissants &amp; Walnut Brownies
                </Link>
              </li>
              <li>
                <Link href="/menu/?category=hampers" className="hover:text-white transition">
                  Festive &amp; Gift Hampers
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="sm:col-span-2 lg:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-logo-tint/65">
              Visit &amp; Order Desk
            </h3>
            <ul className="space-y-3 text-sm text-logo-tint/85">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-logo-tint/70" />
                <div>
                  <p className="font-semibold text-logo-tint">{BAKERY_INFO.brandName}</p>
                  <p>{BAKERY_INFO.contact.addressLine1}</p>
                  <p>{BAKERY_INFO.contact.addressLine2}</p>
                  <a
                    href={BAKERY_INFO.contact.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-logo-tint underline decoration-logo-tint/40 hover:text-white"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-logo-tint/70" />
                <div className="space-y-0.5">
                  <a
                    href={BAKERY_INFO.contact.phoneHref}
                    className="block font-semibold text-logo-tint hover:text-white transition"
                  >
                    Call: {BAKERY_INFO.contact.phoneRaw}
                  </a>
                  <a
                    href={buildWhatsAppLink("Hi Mrida Bakess! I'd like to inquire about a cake.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-xs text-logo-tint/85 hover:text-white transition"
                  >
                    WhatsApp: {BAKERY_INFO.contact.whatsappRaw}
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <InstagramIcon className="h-4 w-4 shrink-0 text-logo-tint/70" />
                <a
                  href={BAKERY_INFO.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  {BAKERY_INFO.contact.instagramHandle}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-logo-tint/70" />
                <div className="space-y-0.5 text-xs">
                  {BAKERY_INFO.contact.hours.map((row) => (
                    <p key={row.days}>
                      <span className="font-medium text-logo-tint">{row.days}:</span> {row.time}
                    </p>
                  ))}
                </div>
              </li>
            </ul>

            <a
              href={buildWhatsAppLink(
                "Hello Manu & Manisha (Mrida Bakess, Mandi)! I'd like to inquire about a 100% Pure Veg cake / bakery order."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 rounded-full bg-herb px-4 py-2 text-xs font-semibold text-white transition hover:bg-herb-hover"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp Order Desk</span>
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-logo-tint/65 sm:flex-row">
          <p>
            © {year} {BAKERY_INFO.brandName} ({BAKERY_INFO.logoTextLabel}). All rights reserved.
          </p>
          <p className="text-center sm:text-right">
            100% Pure Veg Bakehouse · Bagla, Dohandi, Mandi-175021 (HP) · 8 AM – 8 PM Daily
          </p>
        </div>
      </div>
    </footer>
  );
}
