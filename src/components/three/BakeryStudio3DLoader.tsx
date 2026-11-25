"use client";

import dynamic from "next/dynamic";
import { Sparkles } from "lucide-react";

const BakeryStudio3D = dynamic(
  () => import("@/components/three/BakeryStudio3D").then((mod) => mod.BakeryStudio3D),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[520px] flex-col items-center justify-center rounded-[2.25rem] border border-border-strong bg-parchment-glow p-8 text-center">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-logo-tint text-herb ring-1 ring-border-strong animate-pulse">
          <Sparkles className="h-6 w-6" />
        </div>
        <p className="font-display text-xl font-semibold text-ink">
          Warming up our 3D Cake Display Studio...
        </p>
        <p className="mt-1 text-xs text-ink-muted">
          100% Pure Veg interactive 360° patisserie showcase
        </p>
      </div>
    ),
  }
);

export function BakeryStudio3DLoader() {
  return <BakeryStudio3D />;
}
