import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Sparkles } from "lucide-react";
import { MENU_CATEGORIES, MENU_ITEMS, getMenuItemBySlug } from "@/data/menu";
import { buildBreadcrumbJsonLd, buildProductJsonLd, createPageMetadata } from "@/lib/seo";
import { formatInr } from "@/lib/format";
import { JsonLdScript } from "@/components/ui/JsonLdScript";
import { ItemDetailClient } from "@/components/menu/ItemDetailClient";
import { MenuItemCard } from "@/components/ui/MenuItemCard";

export function generateStaticParams() {
  return MENU_ITEMS.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getMenuItemBySlug(slug);

  if (!item) {
    return createPageMetadata({
      title: "Menu Item Not Found",
      description: "Browse fresh 100% Pure Veg organic cakes and pastries at Mrida Bakess.",
      path: "/menu",
    });
  }

  const basePrice = item.variants[0]?.priceInr ?? 0;
  const conciseDesc =
    item.shortDescription.length > 110
      ? `${item.shortDescription.slice(0, 108).replace(/\s+\S*$/, "")}.`
      : item.shortDescription;

  return createPageMetadata({
    title: `${item.name} (${formatInr(basePrice)})`,
    description: `${conciseDesc} 100% Pure Veg at Mrida Bakess, Mandi.`,
    path: `/menu/${item.slug}`,
    keywords: [item.name, ...item.tags, ...item.ingredients],
    image: item.image,
  });
}

export default async function MenuItemDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getMenuItemBySlug(slug);

  if (!item) {
    notFound();
  }

  const category = MENU_CATEGORIES.find((c) => c.id === item.category);
  const relatedItems = MENU_ITEMS.filter(
    (other) => other.id !== item.id && other.category === item.category
  ).slice(0, 3);

  const productJsonLd = buildProductJsonLd(item);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Menu & Rates", path: "/menu/" },
    { name: item.name, path: `/menu/${item.slug}/` },
  ]);

  return (
    <>
      <JsonLdScript data={productJsonLd} />
      <JsonLdScript data={breadcrumbJsonLd} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-xs font-medium text-ink-muted">
          <Link href="/" className="hover:text-ink">
            Home
          </Link>
          <span>/</span>
          <Link href="/menu/" className="hover:text-ink">
            Menu &amp; Rates
          </Link>
          {category ? (
            <>
              <span>/</span>
              <Link href={`/menu/?category=${category.id}`} className="hover:text-ink">
                {category.name}
              </Link>
            </>
          ) : null}
          <span>/</span>
          <span className="text-ink">{item.name}</span>
        </nav>

        {/* Main Detail Split */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-border-strong bg-linen shadow-md">
              <Image
                src={item.image}
                alt={item.imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-full bg-logo-tint px-3.5 py-1 text-xs font-semibold text-ink ring-1 ring-border"
                >
                  <Sparkles className="h-3 w-3 text-herb" />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div>
              {item.hindiSubtitle ? (
                <p className="font-devanagari text-sm font-medium text-ink-olive">
                  {item.hindiSubtitle}
                </p>
              ) : null}
              <h1 className="mt-1 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
                {item.name}
              </h1>
              <p className="mt-3 text-base leading-relaxed text-ink-olive">
                {item.fullDescription}
              </p>
            </div>

            <ItemDetailClient item={item} />
          </div>
        </div>

        {/* Related Bakes */}
        {relatedItems.length > 0 ? (
          <section className="mt-16 border-t border-border pt-12">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                More From {category?.name ?? "Our Counter"}
              </h2>
              <Link
                href="/menu/"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-herb hover:underline"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Menu</span>
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedItems.map((rel) => (
                <MenuItemCard key={rel.id} item={rel} compact />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </>
  );
}
