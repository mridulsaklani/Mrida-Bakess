import Link from "next/link";
import { Camera, CalendarHeart, MessageCircle, PhoneCall } from "lucide-react";
import { BAKERY_INFO } from "@/data/bakery";
import { GALLERY_PHOTOS } from "@/data/gallery";
import { buildBreadcrumbJsonLd, buildGalleryJsonLd, createPageMetadata } from "@/lib/seo";
import { buildWhatsAppLink } from "@/lib/format";
import { JsonLdScript } from "@/components/ui/JsonLdScript";
import { PureVegBadge } from "@/components/ui/PureVegBadge";
import { GalleryClient } from "@/components/gallery/GalleryClient";

export const metadata = createPageMetadata({
  title: "Photo Gallery — Real Shop & 100% Pure Veg Cakes",
  description:
    "Explore Mrida Bakess photo gallery from Bagla, Mandi: real kids excavator & doll cakes, baby shower cakes, Belgian truffle & cozy café photos with full-view.",
  path: "/gallery",
  keywords: [
    "Mrida Bakess photo gallery",
    "Mandi bakery photos",
    "kids birthday cake photos",
    "Bagla Dohandi cake shop pictures",
  ],
  image: "/images/shop-exterior.jpg",
});

export default function GalleryPage() {
  const gallerySchema = buildGalleryJsonLd(
    GALLERY_PHOTOS.map((p) => ({ src: p.src, title: p.title, caption: p.caption }))
  );
  const breadcrumb = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Photo Gallery", path: "/gallery/" },
  ]);

  return (
    <>
      <JsonLdScript data={gallerySchema} />
      <JsonLdScript data={breadcrumb} />

      <section className="bg-parchment-glow border-b border-border py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl space-y-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="inline-flex items-center gap-2 rounded-full bg-logo-tint px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-herb ring-1 ring-border">
                  <Camera className="h-3.5 w-3.5 text-terracotta" />
                  <span>Real Cakes &amp; Mandi Café Gallery</span>
                </div>
                <PureVegBadge label="100% Pure Veg" compact />
              </div>

              <h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
                Our Bakehouse, Café Vibe &amp; Real Cake Creations
              </h1>
              <p className="text-base leading-relaxed text-ink-olive sm:text-lg">
                Browse real moments from <strong>{BAKERY_INFO.brandName}</strong> near
                Domino&apos;s, Bagla, Dohandi — tap any photo for{" "}
                <strong>Full Screen View + Zoom</strong> or ask Manu &amp; Manisha to bake a
                similar design!
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <a
                href={buildWhatsAppLink(
                  "Hi Manu & Manisha (Mrida Bakess)! I saw a cake design in your Gallery and would like to order one."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shine inline-flex items-center gap-2 rounded-full bg-herb px-5 py-3 text-sm font-semibold text-white transition hover:bg-herb-hover"
              >
                <MessageCircle className="h-4 w-4" />
                <span>WhatsApp {BAKERY_INFO.contact.whatsappRaw}</span>
              </a>

              <Link
                href="/custom-cakes/"
                className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface px-5 py-3 text-sm font-semibold text-ink transition hover:bg-logo-tint"
              >
                <CalendarHeart className="h-4 w-4 text-terracotta" />
                <span>Custom Cake Estimator</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <GalleryClient />

        <div className="mt-16 flex flex-col items-center justify-between gap-6 rounded-[2rem] bg-cocoa p-8 text-center text-logo-tint sm:flex-row sm:p-10 sm:text-left">
          <div className="max-w-xl space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-logo-tint/75">
              Open Daily 8:00 AM – 8:00 PM · Bagla, Dohandi, Mandi
            </p>
            <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
              Have a Custom Cake Reference Photo in Mind?
            </h2>
            <p className="text-sm text-logo-tint/85">
              Share your idea on WhatsApp ({BAKERY_INFO.contact.whatsappRaw}) or call{" "}
              {BAKERY_INFO.contact.phoneRaw} — Manisha will hand-craft it 100% Pure Veg.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a
              href={buildWhatsAppLink("Hi Mrida Bakess! Sending a custom cake design inquiry.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-herb px-6 py-3 text-sm font-semibold text-white transition hover:bg-herb-hover"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Share on WhatsApp</span>
            </a>
            <a
              href={BAKERY_INFO.contact.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-logo-tint px-6 py-3 text-sm font-semibold text-ink transition hover:bg-white"
            >
              <PhoneCall className="h-4 w-4 text-herb" />
              <span>Call {BAKERY_INFO.contact.phoneRaw}</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
