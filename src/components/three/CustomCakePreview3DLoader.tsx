"use client";

import dynamic from "next/dynamic";
import type { CustomCakePreview3DProps } from "@/components/three/CustomCakePreview3D";

const CustomCakePreview3D = dynamic(
  () => import("@/components/three/CustomCakePreview3D").then((mod) => mod.CustomCakePreview3D),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[290px] items-center justify-center rounded-3xl border border-border-strong bg-parchment-glow text-xs font-medium text-ink-muted animate-pulse">
        Loading 3D cake configurator preview...
      </div>
    ),
  }
);

export function CustomCakePreview3DLoader(props: CustomCakePreview3DProps) {
  return <CustomCakePreview3D {...props} />;
}
