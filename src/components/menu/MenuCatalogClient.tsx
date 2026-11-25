"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, LayoutGrid, FileSpreadsheet, Printer, Plus } from "lucide-react";
import { MENU_CATEGORIES, MENU_ITEMS } from "@/data/menu";
import type { MenuCategoryId, MenuItem } from "@/types/bakery";
import { formatInr } from "@/lib/format";
import { MenuItemCard } from "@/components/ui/MenuItemCard";
import { PureVegBadge } from "@/components/ui/PureVegBadge";
import { useOrderDrawer } from "@/context/OrderDrawerContext";

type DietaryFilter = "all" | "bestseller" | "chef-special" | "organic";
type SortOrder = "featured" | "price-asc" | "price-desc";
type ViewMode = "cards" | "rate-sheet";

function parseCategoryParam(param: string | null): MenuCategoryId | "all" {
  if (
    param === "cakes" ||
    param === "pastries" ||
    param === "tea-cakes" ||
    param === "cookies-breads" ||
    param === "hampers"
  ) {
    return param;
  }
  return "all";
}

export function MenuCatalogClient() {
  const searchParams = useSearchParams();
  const { addItem } = useOrderDrawer();

  const rawCategoryParam = searchParams.get("category");
  const [categoryOverride, setCategoryOverride] = useState<{
    param: string | null;
    value: MenuCategoryId | "all";
  } | null>(null);
  const [dietaryFilter, setDietaryFilter] = useState<DietaryFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("featured");
  const [viewMode, setViewMode] = useState<ViewMode>("cards");

  const selectedCategory =
    categoryOverride && categoryOverride.param === rawCategoryParam
      ? categoryOverride.value
      : parseCategoryParam(rawCategoryParam);
  const setSelectedCategory = (next: MenuCategoryId | "all") =>
    setCategoryOverride({ param: rawCategoryParam, value: next });

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const list = MENU_ITEMS.filter((item) => {
      if (selectedCategory !== "all" && item.category !== selectedCategory) return false;
      if (dietaryFilter === "bestseller" && !item.isBestseller) return false;
      if (dietaryFilter === "chef-special" && !item.isChefSpecial) return false;
      if (dietaryFilter === "organic" && !item.isOrganicHighlight) return false;

      if (q) {
        const haystack = [
          item.name,
          item.hindiSubtitle ?? "",
          item.shortDescription,
          ...item.ingredients,
          ...item.tags,
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });

    if (sortOrder === "price-asc") {
      return [...list].sort(
        (a, b) => (a.variants[0]?.priceInr ?? 0) - (b.variants[0]?.priceInr ?? 0)
      );
    }
    if (sortOrder === "price-desc") {
      return [...list].sort(
        (a, b) => (b.variants[0]?.priceInr ?? 0) - (a.variants[0]?.priceInr ?? 0)
      );
    }
    return list;
  }, [selectedCategory, dietaryFilter, searchQuery, sortOrder]);

  const groupedByCategory = useMemo(() => {
    return MENU_CATEGORIES.map((category) => ({
      category,
      items: filteredItems.filter((item) => item.category === category.id),
    })).filter((group) => group.items.length > 0);
  }, [filteredItems]);

  const handleQuickAddVariant = (item: MenuItem, variantIdx: number) => {
    const variant = item.variants[variantIdx];
    if (!variant) return;
    addItem({
      itemId: item.id,
      slug: item.slug,
      name: item.name,
      image: item.image,
      variantLabel: variant.label,
      unitPriceInr: variant.priceInr,
      eggless: true,
    });
  };

  return (
    <div className="space-y-8">
      {/* Controls Panel */}
      <div className="no-print rounded-3xl border border-border-strong bg-surface p-4 sm:p-6 shadow-sm space-y-5">
        {/* Category Tabs — single horizontal scrollable strip on mobile, wrapped grid on sm+ */}
        <div
          className="flex flex-nowrap gap-2 overflow-x-auto no-scrollbar pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0"
          role="tablist"
          aria-label="Menu Categories"
        >
          <button
            type="button"
            role="tab"
            aria-selected={selectedCategory === "all"}
            onClick={() => setSelectedCategory("all")}
            className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition cursor-pointer sm:text-sm ${
              selectedCategory === "all"
                ? "bg-ink text-logo-tint shadow-sm"
                : "bg-linen text-ink-olive hover:bg-logo-tint hover:text-ink"
            }`}
          >
            All Categories ({MENU_ITEMS.length})
          </button>

          {MENU_CATEGORIES.map((cat) => {
            const count = MENU_ITEMS.filter((i) => i.category === cat.id).length;
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedCategory(cat.id)}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition cursor-pointer sm:text-sm ${
                  active
                    ? "bg-ink text-logo-tint shadow-sm"
                    : "bg-linen text-ink-olive hover:bg-logo-tint hover:text-ink"
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Search + Filter Chips + View Mode */}
        <div className="flex flex-col gap-4 border-t border-border pt-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <div className="relative w-full sm:min-w-[230px] sm:max-w-sm sm:flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search truffle, pistachio, croissant, jaggery..."
                aria-label="Search bakery menu items"
                className="w-full rounded-full border border-border-strong bg-canvas py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-ink-muted/75"
              />
            </div>

            <div className="flex flex-nowrap items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5 sm:flex-wrap sm:overflow-visible">
              {(
                [
                  { id: "all", label: "All Pure Veg" },
                  { id: "bestseller", label: "Bestsellers" },
                  { id: "chef-special", label: "Chef's Special" },
                  { id: "organic", label: "Organic Grain" },
                ] as const
              ).map((chip) => (
                <button
                  key={chip.id}
                  type="button"
                  onClick={() => setDietaryFilter(chip.id)}
                  className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition cursor-pointer ${
                    dietaryFilter === chip.id
                      ? "bg-herb text-white shadow-xs"
                      : "border border-border bg-canvas text-ink-olive hover:bg-logo-tint"
                  }`}
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2.5 sm:justify-start">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-border-strong bg-canvas px-3 py-1.5">
              <SlidersHorizontal className="h-3.5 w-3.5 text-ink-muted" />
              <select
                aria-label="Sort bakery menu"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as SortOrder)}
                className="bg-transparent text-xs font-semibold text-ink focus:outline-none cursor-pointer"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

            <div
              className="inline-flex rounded-full border border-border-strong bg-canvas p-1"
              role="group"
              aria-label="Menu view format"
            >
              <button
                type="button"
                onClick={() => setViewMode("cards")}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition cursor-pointer ${
                  viewMode === "cards"
                    ? "bg-logo-tint text-ink shadow-xs"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                <span>Photo Menu</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("rate-sheet")}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition cursor-pointer ${
                  viewMode === "rate-sheet"
                    ? "bg-logo-tint text-ink shadow-xs"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                <FileSpreadsheet className="h-3.5 w-3.5" />
                <span>Rate Card</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Empty Search Result */}
      {groupedByCategory.length === 0 ? (
        <div className="rounded-3xl border border-border bg-surface p-12 text-center">
          <h3 className="font-display text-2xl font-semibold text-ink">
            No matching treats found
          </h3>
          <p className="mt-2 text-sm text-ink-muted">
            Try clearing your search or switching back to all bakery categories.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("all");
              setDietaryFilter("all");
              setSearchQuery("");
            }}
            className="mt-5 rounded-full bg-herb px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-herb-hover cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === "cards" ? (
        /* ==================== PHOTO MENU VIEW ==================== */
        <div className="space-y-14">
          {groupedByCategory.map(({ category, items }) => (
            <section key={category.id} aria-labelledby={`cat-${category.id}`}>
              <div className="mb-6 flex flex-col justify-between gap-2 border-b border-border pb-4 sm:flex-row sm:items-end">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-herb">
                    {category.tagline}
                  </p>
                  <h2
                    id={`cat-${category.id}`}
                    className="mt-1 font-display text-2xl font-semibold text-ink sm:text-3xl"
                  >
                    {category.name}
                  </h2>
                  <p className="mt-1.5 max-w-2xl text-sm text-ink-muted">
                    {category.description}
                  </p>
                </div>
                <span className="shrink-0 text-xs font-semibold text-ink-olive">
                  {items.length} {items.length === 1 ? "item" : "items"}
                </span>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                  <MenuItemCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        /* ==================== RATE CARD SHEET VIEW ==================== */
        <div className="space-y-8 rounded-[2rem] border border-border-strong bg-surface p-5 sm:p-10 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-herb">
                Mrida Bakess · 100% Pure Veg Transparent Rate List
              </p>
              <h2 className="mt-1 font-display text-2xl font-semibold text-ink sm:text-3xl">
                Official Menu &amp; Price Card
              </h2>
              <p className="mt-1 text-xs text-ink-muted">
                All prices in INR · 100% Pure Veg &amp; Eggless · Open Daily 8 AM – 8 PM (Mandi)
              </p>
            </div>
            <button
              type="button"
              onClick={() => window.print()}
              className="no-print inline-flex items-center gap-2 rounded-full border border-border-strong bg-logo-tint px-4 py-2 text-xs font-semibold text-ink transition hover:bg-linen cursor-pointer"
            >
              <Printer className="h-4 w-4 text-herb" />
              <span>Print Rate Card</span>
            </button>
          </div>

          <div className="space-y-10">
            {groupedByCategory.map(({ category, items }) => (
              <div key={category.id} className="space-y-4">
                <h3 className="font-display text-xl font-semibold text-ink border-l-4 border-herb pl-3">
                  {category.name}
                </h3>

                <div className="divide-y divide-border rounded-2xl border border-border bg-canvas/50">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col justify-between gap-4 p-4 sm:flex-row sm:items-center sm:p-5"
                    >
                      <div className="max-w-xl space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-display text-base font-semibold text-ink sm:text-lg">
                            {item.name}
                          </span>
                          <PureVegBadge label="100% Pure Veg" compact className="py-0.5 text-[10px]" />
                        </div>
                        <p className="text-xs leading-relaxed text-ink-muted">
                          {item.shortDescription}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center">
                        {item.variants.map((variant, idx) => (
                          <button
                            key={variant.label}
                            type="button"
                            onClick={() => handleQuickAddVariant(item, idx)}
                            className="group inline-flex items-center justify-between gap-2 rounded-2xl border border-border-strong bg-surface px-3.5 py-2 text-left text-xs transition hover:border-herb hover:bg-logo-tint cursor-pointer"
                            title="Add this option to Order Tray"
                          >
                            <div>
                              <span className="block text-[10px] font-medium text-ink-muted">
                                {variant.weightOrCount}
                              </span>
                              <span className="font-semibold text-ink">
                                {formatInr(variant.priceInr)}
                              </span>
                            </div>
                            <Plus className="no-print h-3.5 w-3.5 shrink-0 text-herb opacity-70 group-hover:opacity-100" />
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
