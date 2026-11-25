"use client";

import dynamic from "next/dynamic";
import { Gift } from "lucide-react";

const GiftTrunk3D = dynamic(
  () => import("@/components/three/GiftTrunk3D").then((mod) => mod.GiftTrunk3D),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[320px] items-center justify-center rounded-[2rem] border border-border-strong bg-parchment-glow text-sm text-ink-muted animate-pulse">
        <Gift className="mr-2 h-5 w-5 text-herb" />
        Loading interactive 3D gift hamper...
      </div>
    ),
  }
);

export function GiftTrunk3DLoader() {
  return <GiftTrunk3D />;
}
