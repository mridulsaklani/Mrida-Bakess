import { Suspense } from "react";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Clock,
  MessageCircle,
  Info,
  ExternalLink,
} from "lucide-react";
import { BAKERY_INFO } from "@/data/bakery";
import { buildBreadcrumbJsonLd, buildFaqJsonLd, createPageMetadata } from "@/lib/seo";
import { buildWhatsAppLink } from "@/lib/format";
import { JsonLdScript } from "@/components/ui/JsonLdScript";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { PureVegBadge } from "@/components/ui/PureVegBadge";
import { LiveBakeryStatus } from "@/components/ui/LiveBakeryStatus";
import { ContactFormClient } from "@/components/contact/ContactFormClient";
import { FaqAccordion } from "@/components/contact/FaqAccordion";

export const metadata = createPageMetadata({
  title: "Visit & Contact — Bagla, Mandi (8 AM–8 PM)",
  description:
    "Visit Mrida Bakess near Domino's, Bagla, Dohandi, Mandi-175021 (HP) daily 8 AM–8 PM. Call 7947111674 or WhatsApp for 100% Pure Veg cakes & custom orders.",
  path: "/contact",
  keywords: [
    "Mrida Bakess address Bagla Dohandi Mandi",
    "bakery near Domino's Mandi 175021",
    "7947111674 Mrida Bakess",
    "100% Pure Veg cake order Mandi",
    "8 AM to 8 PM bakery Himachal",
  ],
  image: "/images/shop-exterior.jpg",
});

export default function ContactPage() {
  const faqSchema = buildFaqJsonLd();
  const breadcrumb = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact/" },
  ]);

  return (
    <>
      <JsonLdScript data={faqSchema} />
      <JsonLdScript data={breadcrumb} />

      <section className="bg-parchment-glow border-b border-border py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-herb">
                Order Desk &amp; Mandi Bakehouse Visit
              </p>
              <PureVegBadge label="100% Pure Veg" compact />
              <LiveBakeryStatus />
            </div>
            <h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
              Visit Us in Bagla or Book Your Fresh Cake
            </h1>
            <p className="text-base leading-relaxed text-ink-olive sm:text-lg">
              Drop in near Domino&apos;s, Bagla, Dohandi (Mandi – 175021) any day between{" "}
              <strong className="text-ink">8:00 AM – 8:00 PM</strong>, call{" "}
              <a href={BAKERY_INFO.contact.phoneHref} className="font-semibold text-herb underline">
                {BAKERY_INFO.contact.phoneRaw}
              </a>
              , or message Manu &amp; Manisha on WhatsApp.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Left Store Details + Real Storefront Photo Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="overflow-hidden rounded-[2rem] border border-border-strong bg-surface shadow-xs">
              {/* Real Storefront Banner */}
              <div className="grid grid-cols-2 gap-1 bg-linen">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="/images/shop-signboard.jpg"
                    alt="Mrida Bakess 100% Pure Veg signboard"
                    fill
                    sizes="(max-width: 1024px) 50vw, 21vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="/images/shop-display-counter.jpg"
                    alt="Mrida Bakess cafe seating and dessert counter"
                    fill
                    sizes="(max-width: 1024px) 50vw, 21vw"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h2 className="font-display text-2xl font-semibold text-ink">
                      {BAKERY_INFO.brandName}
                    </h2>
                    <p className="mt-1 text-xs font-medium text-herb">
                      Run personally by {BAKERY_INFO.foundersLine}
                    </p>
                  </div>
                  <PureVegBadge label="100% Pure Veg" compact />
                </div>

                <ul className="space-y-4 text-sm text-ink-olive">
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-herb" />
                    <div>
                      <p className="font-semibold text-ink">Bakehouse Address</p>
                      <p>{BAKERY_INFO.brandName}</p>
                      <p>{BAKERY_INFO.contact.addressLine1}</p>
                      <p>{BAKERY_INFO.contact.addressLine2}</p>
                      <a
                        href={BAKERY_INFO.contact.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-herb hover:underline"
                      >
                        <span>Open Directions in Google Maps</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-5 w-5 shrink-0 text-herb" />
                    <div>
                      <p className="font-semibold text-ink">Call &amp; Order Line</p>
                      <a
                        href={BAKERY_INFO.contact.phoneHref}
                        className="text-base font-semibold text-herb hover:underline"
                      >
                        {BAKERY_INFO.contact.phoneDisplay} ({BAKERY_INFO.contact.phoneRaw})
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <InstagramIcon className="mt-0.5 h-5 w-5 shrink-0 text-herb" />
                    <div>
                      <p className="font-semibold text-ink">Instagram</p>
                      <a
                        href={BAKERY_INFO.contact.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-herb font-medium hover:underline"
                      >
                        {BAKERY_INFO.contact.instagramHandle}
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-5 w-5 shrink-0 text-herb" />
                    <div>
                      <p className="font-semibold text-ink">Bakery Timings</p>
                      {BAKERY_INFO.contact.hours.map((h) => (
                        <p key={h.days}>
                          <span className="font-medium text-ink">{h.days}:</span> {h.time}
                        </p>
                      ))}
                    </div>
                  </li>
                </ul>

                <div className="grid gap-2.5 sm:grid-cols-2">
                  <a
                    href={buildWhatsAppLink(
                      "Hi Manu & Manisha (Mrida Bakess, Mandi)! I'd like to inquire about a 100% Pure Veg cake / bakery order."
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-full bg-herb px-5 py-3 text-sm font-semibold text-white transition hover:bg-herb-hover"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href={BAKERY_INFO.contact.phoneHref}
                    className="flex items-center justify-center gap-2 rounded-full border border-border-strong bg-logo-tint px-5 py-3 text-sm font-semibold text-ink transition hover:bg-linen"
                  >
                    <Phone className="h-4 w-4 text-herb" />
                    <span>Call Bakehouse</span>
                  </a>
                </div>

                <div className="flex items-start gap-2.5 rounded-2xl bg-logo-tint/75 p-3.5 text-xs leading-relaxed text-ink-olive ring-1 ring-border">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-herb" />
                  <span>{BAKERY_INFO.contact.notice}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-[2rem] border border-border-strong bg-surface p-6 sm:p-9 shadow-xs">
              <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                Send a 100% Pure Veg Order Inquiry
              </h2>
              <p className="mt-1.5 mb-6 text-sm text-ink-muted">
                Share your celebration details, preferred flavor, weight, or paste items directly
                from your Order Tray.
              </p>

              <Suspense
                fallback={
                  <div className="py-10 text-center text-sm text-ink-muted">
                    Loading inquiry form...
                  </div>
                }
              >
                <ContactFormClient />
              </Suspense>
            </div>
          </div>
        </div>

        {/* ==================== FREQUENTLY ASKED QUESTIONS ==================== */}
        <section id="faq" className="mt-16 border-t border-border pt-14">
          <div className="mb-8 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-herb">
              Helpful Answers
            </p>
            <h2 className="mt-1 font-display text-3xl font-semibold text-ink">
              Ordering, 100% Pure Veg Guarantee &amp; Timings FAQs
            </h2>
          </div>

          <FaqAccordion />
        </section>
      </section>
    </>
  );
}
