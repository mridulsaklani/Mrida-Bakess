"use client";

import dynamic from "next/dynamic";
import { Sparkles } from "lucide-react";

const HeroCounter3D = dynamic(
  () => import("@/components/three/HeroCounter3D").then((mod) => mod.HeroCounter3D),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[320px] flex-col items-center justify-center text-center sm:h-[380px]">
        <Sparkles className="mb-2 h-6 w-6 text-herb animate-pulse" />
        <p className="text-xs font-medium text-ink-muted">Loading 3D counter platter...</p>
      </div>
    ),
  }
);

export function HeroCounter3DLoader() {
  return <HeroCounter3D />;
}
