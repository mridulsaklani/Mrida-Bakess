"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

export interface LightboxPhoto {
  src: string;
  alt: string;
  caption: string;
  subtitle?: string;
}

export function PhotoLightboxGrid({
  photos,
  columnsClass = "grid gap-5 sm:grid-cols-2 lg:grid-cols-4",
}: {
  photos: LightboxPhoto[];
  columnsClass?: string;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowRight") setActiveIndex((i) => (i === null ? null : (i + 1) % photos.length));
      if (e.key === "ArrowLeft")
        setActiveIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length));
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex, photos.length]);

  const current = activeIndex !== null ? photos[activeIndex] : null;

  return (
    <>
      <div className={columnsClass}>
        {photos.map((photo, idx) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setActiveIndex(idx)}
            className="group overflow-hidden rounded-3xl border border-border-strong bg-canvas text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-linen">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-ink/75 text-logo-tint opacity-0 transition group-hover:opacity-100 backdrop-blur-sm">
                <ZoomIn className="h-4 w-4" />
              </span>
            </div>
            <div className="px-4 py-3">
              <p className="text-xs font-semibold text-ink">{photo.caption}</p>
              {photo.subtitle ? (
                <p className="mt-0.5 text-[11px] text-ink-muted">{photo.subtitle}</p>
              ) : null}
            </div>
          </button>
        ))}
      </div>

      {current ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.caption}
          className="fixed inset-0 z-50 flex items-center justify-center bg-cocoa/90 p-4 backdrop-blur-sm"
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="animate-fade-up relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/15 bg-ink shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[4/3] max-h-[75vh] w-full bg-cocoa">
              <Image
                src={current.src}
                alt={current.alt}
                fill
                draggable={false}
                sizes="100vw"
                className="select-none object-contain"
              />
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-white/10 bg-ink px-5 py-3.5 text-logo-tint">
              <div>
                <p className="font-display text-base font-semibold text-white">{current.caption}</p>
                {current.subtitle ? (
                  <p className="text-xs text-logo-tint/75">{current.subtitle}</p>
                ) : null}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex((i) =>
                      i === null ? null : (i - 1 + photos.length) % photos.length
                    )
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 cursor-pointer"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex((i) => (i === null ? null : (i + 1) % photos.length))
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 cursor-pointer"
                  aria-label="Next photo"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveIndex(null)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-herb text-white hover:bg-herb-hover cursor-pointer"
                  aria-label="Close photo preview"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
