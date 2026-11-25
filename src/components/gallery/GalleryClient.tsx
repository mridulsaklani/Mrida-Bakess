"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  MessageCircle,
  LayoutGrid,
  GalleryHorizontalEnd,
  Sun,
  Moon,
  Sparkles,
} from "lucide-react";
import {
  GALLERY_CATEGORIES,
  GALLERY_PHOTOS,
  type GalleryCategoryId,
  type GalleryPhotoItem,
} from "@/data/gallery";
import { buildWhatsAppLink } from "@/lib/format";
import { PureVegBadge } from "@/components/ui/PureVegBadge";

type LayoutMode = "masonry" | "spotlight";

export function GalleryClient() {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategoryId>("all");
  const [layoutMode, setLayoutMode] = useState<LayoutMode>("masonry");
  const [fullViewIndex, setFullViewIndex] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);

  // Interactive Day vs Evening Café Slider state (0..100%)
  const [sliderPct, setSliderPct] = useState(52);
  const sliderTrackRef = useRef<HTMLDivElement>(null);
  const isDraggingSliderRef = useRef(false);
  const touchStartXRef = useRef<number | null>(null);

  const filteredPhotos = useMemo(() => {
    if (selectedCategory === "all") return GALLERY_PHOTOS;
    return GALLERY_PHOTOS.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  const activePhoto: GalleryPhotoItem | null =
    fullViewIndex !== null ? filteredPhotos[fullViewIndex] ?? null : null;

  const closeLightbox = useCallback(() => {
    setFullViewIndex(null);
    setZoomed(false);
  }, []);

  const goNext = useCallback(() => {
    setZoomed(false);
    setFullViewIndex((idx) =>
      idx === null ? null : (idx + 1) % filteredPhotos.length
    );
  }, [filteredPhotos.length]);

  const goPrev = useCallback(() => {
    setZoomed(false);
    setFullViewIndex((idx) =>
      idx === null ? null : (idx - 1 + filteredPhotos.length) % filteredPhotos.length
    );
  }, [filteredPhotos.length]);

  // Keyboard navigation + scroll lock inside Full View Lightbox
  useEffect(() => {
    if (fullViewIndex === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [fullViewIndex, closeLightbox, goNext, goPrev]);

  const updateSliderFromClientX = (clientX: number) => {
    const el = sliderTrackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setSliderPct(Math.round(Math.min(96, Math.max(4, pct))));
  };

  return (
    <div className="space-y-14">
      {/* ==================== CREATIVE INTERACTIVE DAY vs EVENING CAFE SLIDER ==================== */}
      <section className="rounded-[2.25rem] border border-border-strong bg-surface p-5 shadow-sm sm:p-8">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-herb">
              <Sparkles className="h-3.5 w-3.5 text-saffron" />
              <span>Interactive Bakehouse Atmosphere · Bagla, Mandi</span>
            </p>
            <h2 className="mt-1 font-display text-2xl font-semibold text-ink sm:text-3xl">
              Slide Between Bright Morning Café &amp; Cozy Evening Glow
            </h2>
          </div>

          <div className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border-strong bg-canvas p-1 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setSliderPct(88)}
              className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold text-ink hover:bg-logo-tint cursor-pointer"
            >
              <Sun className="h-3.5 w-3.5 text-saffron" />
              <span>Morning Café</span>
            </button>
            <button
              type="button"
              onClick={() => setSliderPct(12)}
              className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold text-ink hover:bg-logo-tint cursor-pointer"
            >
              <Moon className="h-3.5 w-3.5 text-herb" />
              <span>Evening Crowd</span>
            </button>
          </div>
        </div>

        <div
          ref={sliderTrackRef}
          role="slider"
          tabIndex={0}
          aria-label="Slide between Morning Café and Evening Crowd photos"
          aria-valuemin={4}
          aria-valuemax={96}
          aria-valuenow={sliderPct}
          onDragStart={(e) => e.preventDefault()}
          onPointerDown={(e) => {
            e.preventDefault();
            isDraggingSliderRef.current = true;
            e.currentTarget.setPointerCapture(e.pointerId);
            updateSliderFromClientX(e.clientX);
          }}
          onPointerMove={(e) => {
            if (!isDraggingSliderRef.current) return;
            e.preventDefault();
            updateSliderFromClientX(e.clientX);
          }}
          onPointerUp={(e) => {
            isDraggingSliderRef.current = false;
            if (e.currentTarget.hasPointerCapture(e.pointerId)) {
              e.currentTarget.releasePointerCapture(e.pointerId);
            }
          }}
          onPointerCancel={() => {
            isDraggingSliderRef.current = false;
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") {
              e.preventDefault();
              setSliderPct((p) => Math.max(4, p - 4));
            } else if (e.key === "ArrowRight") {
              e.preventDefault();
              setSliderPct((p) => Math.min(96, p + 4));
            }
          }}
          className="relative aspect-[16/10] w-full select-none touch-none overflow-hidden rounded-3xl border border-border-strong bg-cocoa cursor-ew-resize sm:aspect-[16/8]"
        >
          {/* Base Image: Cozy Evening Crowd */}
          <Image
            src="/images/shop-evening-guests.jpg"
            alt="Evening families and guests dining inside Mrida Bakess Bagla Mandi"
            fill
            draggable={false}
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="pointer-events-none select-none object-cover"
          />

          {/* Top Clipped Image: Bright Daytime Interior */}
          <div
            className="pointer-events-none absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - sliderPct}% 0 0)` }}
          >
            <Image
              src="/images/shop-interior-seating.jpg"
              alt="Bright daytime cafe seating inside Mrida Bakess"
              fill
              draggable={false}
              sizes="(max-width: 1280px) 100vw, 1200px"
              className="pointer-events-none select-none object-cover"
            />
          </div>

          {/* Crisp Vertical Divider Handle */}
          <div
            className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.45)]"
            style={{ left: `${sliderPct}%` }}
          >
            <div className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-herb text-white shadow-lg">
              <ChevronLeft className="h-3.5 w-3.5 -mr-0.5" />
              <ChevronRight className="h-3.5 w-3.5 -ml-0.5" />
            </div>
          </div>

          <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-surface/90 px-3 py-1 text-[11px] font-semibold text-ink backdrop-blur-sm">
            Morning Café (8 AM)
          </span>
          <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-ink/85 px-3 py-1 text-[11px] font-semibold text-logo-tint backdrop-blur-sm">
            Evening Vibe (Till 8 PM)
          </span>
        </div>
      </section>

      {/* ==================== FILTER BAR & LAYOUT SWITCHER ==================== */}
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 rounded-3xl border border-border-strong bg-surface p-4 sm:flex-row sm:items-center sm:p-5">
          <div
            className="flex flex-nowrap gap-2 overflow-x-auto no-scrollbar pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0"
            role="tablist"
            aria-label="Gallery categories"
          >
            {GALLERY_CATEGORIES.map((cat) => {
              const count =
                cat.id === "all"
                  ? GALLERY_PHOTOS.length
                  : GALLERY_PHOTOS.filter((p) => p.category === cat.id).length;
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    closeLightbox();
                  }}
                  className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition cursor-pointer sm:text-sm ${
                    active
                      ? "bg-ink text-logo-tint shadow-xs"
                      : "bg-linen text-ink-olive hover:bg-logo-tint hover:text-ink"
                  }`}
                >
                  {cat.label} ({count})
                </button>
              );
            })}
          </div>

          <div
            className="inline-flex shrink-0 self-start rounded-full border border-border-strong bg-canvas p-1 sm:self-auto"
            role="group"
            aria-label="Gallery layout"
          >
            <button
              type="button"
              onClick={() => setLayoutMode("masonry")}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${
                layoutMode === "masonry"
                  ? "bg-logo-tint text-ink shadow-xs"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span>Masonry Grid</span>
            </button>
            <button
              type="button"
              onClick={() => setLayoutMode("spotlight")}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${
                layoutMode === "spotlight"
                  ? "bg-logo-tint text-ink shadow-xs"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              <GalleryHorizontalEnd className="h-3.5 w-3.5" />
              <span>Editorial Story</span>
            </button>
          </div>
        </div>

        {/* ==================== MASONRY OR EDITORIAL STORY GRID ==================== */}
        {layoutMode === "masonry" ? (
          <div className="columns-1 gap-5 space-y-5 sm:columns-2 lg:columns-3">
            {filteredPhotos.map((photo, idx) => (
              <article
                key={photo.id}
                className="group break-inside-avoid overflow-hidden rounded-3xl border border-border-strong bg-surface shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <button
                  type="button"
                  onClick={() => setFullViewIndex(idx)}
                  className={`relative block w-full overflow-hidden bg-linen text-left cursor-pointer ${
                    photo.aspect === "portrait"
                      ? "aspect-[3/4]"
                      : photo.aspect === "wide"
                      ? "aspect-[16/10]"
                      : "aspect-[4/3]"
                  }`}
                  aria-label={`Open full view of ${photo.title}`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={`object-cover ${photo.objectPosition ?? "object-center"} transition duration-500 group-hover:scale-[1.04]`}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cocoa/55 via-transparent to-transparent opacity-75" />

                  <span className="absolute left-3 top-3 rounded-full bg-logo-tint/95 px-3 py-1 text-[11px] font-semibold text-ink backdrop-blur-sm">
                    {photo.badge}
                  </span>

                  <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-ink/80 px-2.5 py-1 text-[11px] font-semibold text-logo-tint backdrop-blur-sm transition group-hover:bg-herb group-hover:text-white">
                    <Maximize2 className="h-3 w-3" />
                    <span>Full View</span>
                  </span>
                </button>

                <div className="p-5 space-y-2">
                  <h3 className="font-display text-lg font-semibold leading-snug text-ink">
                    {photo.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-ink-muted">{photo.caption}</p>
                  <div className="pt-2 flex items-center justify-between border-t border-border">
                    <button
                      type="button"
                      onClick={() => setFullViewIndex(idx)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-herb hover:underline cursor-pointer"
                    >
                      <Maximize2 className="h-3.5 w-3.5" />
                      <span>Open Full Screen</span>
                    </button>

                    <a
                      href={buildWhatsAppLink(photo.whatsappPrompt)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-ink-olive hover:text-herb"
                    >
                      <MessageCircle className="h-3.5 w-3.5 text-herb" />
                      <span>Order Similar</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredPhotos.map((photo, idx) => (
              <article
                key={photo.id}
                className="overflow-hidden rounded-[2rem] border border-border-strong bg-surface shadow-xs transition hover:shadow-md"
              >
                <div className="grid items-center md:grid-cols-12">
                  <button
                    type="button"
                    onClick={() => setFullViewIndex(idx)}
                    className="group relative aspect-[4/3] w-full overflow-hidden bg-linen md:col-span-6 lg:col-span-5 cursor-pointer"
                    aria-label={`Open full view of ${photo.title}`}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 45vw"
                      className={`object-cover ${photo.objectPosition ?? "object-center"} transition duration-500 group-hover:scale-105`}
                    />
                    <span className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full bg-ink/85 px-3 py-1.5 text-xs font-semibold text-logo-tint backdrop-blur-sm">
                      <Maximize2 className="h-3.5 w-3.5" />
                      <span>Full View</span>
                    </span>
                  </button>

                  <div className="p-6 sm:p-8 md:col-span-6 lg:col-span-7 space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-logo-tint px-3 py-1 text-xs font-semibold text-ink ring-1 ring-border">
                        #{String(idx + 1).padStart(2, "0")} · {photo.badge}
                      </span>
                      <PureVegBadge label="100% Pure Veg" compact />
                    </div>
                    <h3 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                      {photo.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-ink-olive sm:text-base">
                      {photo.caption}
                    </p>
                    <div className="flex flex-wrap gap-3 pt-1">
                      <button
                        type="button"
                        onClick={() => setFullViewIndex(idx)}
                        className="btn-shine inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-xs font-semibold text-logo-tint transition hover:bg-herb hover:text-white cursor-pointer"
                      >
                        <Maximize2 className="h-3.5 w-3.5" />
                        <span>View Full Image</span>
                      </button>
                      <a
                        href={buildWhatsAppLink(photo.whatsappPrompt)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-logo-tint px-5 py-2.5 text-xs font-semibold text-ink transition hover:bg-linen"
                      >
                        <MessageCircle className="h-3.5 w-3.5 text-herb" />
                        <span>Ask About This Bake</span>
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* ==================== FULL-VIEW LIGHTBOX MODAL (ZOOM + SWIPE + FILMSTRIP) ==================== */}
      {activePhoto && fullViewIndex !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.title}
          className="fixed inset-0 z-50 flex flex-col bg-cocoa/95 text-white backdrop-blur-md"
          onClick={closeLightbox}
          onTouchStart={(e) => {
            touchStartXRef.current = e.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(e) => {
            const startX = touchStartXRef.current;
            const endX = e.changedTouches[0]?.clientX ?? null;
            if (startX !== null && endX !== null) {
              const delta = endX - startX;
              if (delta > 55) goPrev();
              if (delta < -55) goNext();
            }
            touchStartXRef.current = null;
          }}
        >
          {/* Top Bar */}
          <div
            className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-logo-tint/80">
                {fullViewIndex + 1} / {filteredPhotos.length} · {activePhoto.badge}
              </p>
              <h2 className="truncate font-display text-base font-semibold text-white sm:text-xl">
                {activePhoto.title}
              </h2>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => setZoomed((z) => !z)}
                className="inline-flex h-9 items-center gap-1.5 rounded-full bg-white/10 px-3 text-xs font-semibold text-white transition hover:bg-white/20 cursor-pointer"
                aria-label={zoomed ? "Reset zoom" : "Zoom image"}
              >
                {zoomed ? <ZoomOut className="h-4 w-4" /> : <ZoomIn className="h-4 w-4" />}
                <span className="hidden sm:inline">{zoomed ? "1x View" : "Zoom In"}</span>
              </button>

              <a
                href={buildWhatsAppLink(activePhoto.whatsappPrompt)}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex h-9 items-center gap-1.5 rounded-full bg-herb px-3.5 text-xs font-semibold text-white transition hover:bg-herb-hover"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                <span>Order Similar (WhatsApp)</span>
              </a>

              <button
                type="button"
                onClick={closeLightbox}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-terracotta cursor-pointer"
                aria-label="Close full view"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Center Full Image Viewport */}
          <div
            className="relative flex-1 overflow-auto p-3 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative mx-auto flex h-full min-h-[300px] w-full max-w-5xl items-center justify-center">
              <div
                className={`relative h-full w-full transition-transform duration-300 ease-out ${
                  zoomed ? "scale-150 cursor-zoom-out" : "scale-100 cursor-zoom-in"
                }`}
                onClick={() => setZoomed((z) => !z)}
              >
                <Image
                  src={activePhoto.src}
                  alt={activePhoto.title}
                  fill
                  priority
                  draggable={false}
                  sizes="100vw"
                  className="select-none object-contain"
                />
              </div>

              {/* Left / Right Nav Arrows */}
              <button
                type="button"
                onClick={goPrev}
                className="absolute left-1 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-ink/80 text-white ring-1 ring-white/20 backdrop-blur-md transition hover:bg-herb cursor-pointer sm:left-3"
                aria-label="Previous gallery photo"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={goNext}
                className="absolute right-1 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-ink/80 text-white ring-1 ring-white/20 backdrop-blur-md transition hover:bg-herb cursor-pointer sm:right-3"
                aria-label="Next gallery photo"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Bottom Caption + Quick Filmstrip Bar */}
          <div
            className="border-t border-white/10 bg-ink/90 px-4 py-3 sm:px-6 space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="max-w-3xl text-xs leading-relaxed text-logo-tint/90 sm:text-sm">
                {activePhoto.caption}
              </p>
              <a
                href={buildWhatsAppLink(activePhoto.whatsappPrompt)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex sm:hidden items-center gap-1.5 rounded-full bg-herb px-3.5 py-2 text-xs font-semibold text-white"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                <span>Order Similar</span>
              </a>
            </div>

            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-0.5">
              {filteredPhotos.map((thumb, tIdx) => (
                <button
                  key={thumb.id}
                  type="button"
                  onClick={() => {
                    setZoomed(false);
                    setFullViewIndex(tIdx);
                  }}
                  className={`relative h-12 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition cursor-pointer ${
                    tIdx === fullViewIndex
                      ? "border-logo-tint scale-105 opacity-100"
                      : "border-transparent opacity-55 hover:opacity-90"
                  }`}
                  aria-label={`Jump to ${thumb.title}`}
                >
                  <Image
                    src={thumb.src}
                    alt={thumb.title}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
