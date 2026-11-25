"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Layers, Box, RotateCcw, Utensils } from "lucide-react";
import { CAKE_FLAVORS_3D } from "@/data/bakery-3d";
import { StudioStage3D, WebGLErrorBoundary } from "@/components/three/StudioStage3D";
import { CakeAssemblyModel } from "@/components/three/CakeAssemblyModel";
import { CameraRig3D } from "@/components/three/CameraRig3D";

export interface CustomCakePreview3DProps {
  flavorId: string;
  weightKg: number;
  designId: string;
}

export function CustomCakePreview3D({
  flavorId,
  weightKg,
  designId,
}: CustomCakePreview3DProps) {
  const [exploded, setExploded] = useState(false);
  const [showGlassCase, setShowGlassCase] = useState(false);
  const [isCut, setIsCut] = useState(false);
  const [cutTrigger, setCutTrigger] = useState(0);
  const [assembleTrigger, setAssembleTrigger] = useState(0);

  const activeFlavor =
    CAKE_FLAVORS_3D.find((f) => f.id === flavorId) ?? CAKE_FLAVORS_3D[0];
  const tiers: 1 | 2 | 3 = weightKg >= 4 ? 3 : weightKg >= 2 ? 2 : 1;
  const tallSingle = weightKg === 1.5;
  const isBotanicalFinish = designId === "botanical-buttercream";

  const handleToggleCut = () => {
    if (tiers > 1) return;
    if (isCut) {
      setIsCut(false);
      return;
    }
    setExploded(false);
    setShowGlassCase(false);
    setIsCut(true);
    setCutTrigger((n) => n + 1);
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-border-strong bg-parchment-glow">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/80 bg-surface/85 px-4 py-2.5 text-xs">
        <span className="font-semibold text-ink">
          Live 3D Preview · {tiers === 1 ? (tallSingle ? "Tall 1-Tier" : "1-Tier") : `${tiers}-Tier`}
        </span>
        <div className="flex flex-wrap items-center gap-1.5">
          {tiers === 1 ? (
            <button
              type="button"
              onClick={handleToggleCut}
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold transition cursor-pointer ${
                isCut
                  ? "bg-terracotta text-white"
                  : "bg-ink text-logo-tint hover:bg-herb hover:text-white"
              }`}
            >
              <Utensils className="h-3 w-3" />
              <span>{isCut ? "Whole" : "Cut Slice"}</span>
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => {
              setIsCut(false);
              setExploded(false);
              setAssembleTrigger((n) => n + 1);
            }}
            className="inline-flex items-center gap-1 rounded-full bg-herb px-2.5 py-1 text-[11px] font-semibold text-white transition hover:bg-herb-hover cursor-pointer"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Assemble</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setIsCut(false);
              setExploded((e) => !e);
            }}
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold transition cursor-pointer ${
              exploded
                ? "bg-terracotta text-white"
                : "border border-border bg-surface text-ink-olive hover:text-ink"
            }`}
          >
            <Layers className="h-3 w-3" />
            <span>{exploded ? "Stack" : "Layers"}</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setIsCut(false);
              setShowGlassCase((g) => !g);
            }}
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold transition cursor-pointer ${
              showGlassCase
                ? "bg-logo-tint text-ink ring-1 ring-border-strong"
                : "border border-border bg-surface text-ink-muted"
            }`}
          >
            <Box className="h-3 w-3 text-herb" />
            <span>Case</span>
          </button>
        </div>
      </div>

      <div className="relative h-[260px] w-full sm:h-[290px]">
        <WebGLErrorBoundary
          fallback={
            <div className="flex h-full items-center justify-center p-4 text-center text-xs text-ink-muted">
              Interactive 3D preview requires WebGL.
            </div>
          }
        >
          <Canvas
            shadows
            dpr={[1, 1.5]}
            camera={{ position: [3.4, 2.0, 3.8], fov: 40 }}
            gl={{
              antialias: true,
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: 1.06,
            }}
          >
            <StudioStage3D shadowY={-1.35} sparkleColor={activeFlavor.accentColor} />
            <CakeAssemblyModel
              flavor={activeFlavor}
              tiers={tiers}
              tallSingle={tallSingle}
              exploded={exploded}
              showGlassCase={showGlassCase}
              showCandle={tiers === 1}
              isCut={isCut && tiers === 1}
              cutTrigger={cutTrigger}
              autoRotate
              assembleTrigger={assembleTrigger}
              zoomScale={tiers === 3 ? 0.78 : tiers === 2 ? 0.86 : 0.96}
              isBotanicalFinish={isBotanicalFinish}
            />
            <CameraRig3D preset="studio" presetVersion={0} />
          </Canvas>
        </WebGLErrorBoundary>
        <span className="pointer-events-none absolute bottom-2 right-3 rounded-full bg-surface/85 px-2.5 py-0.5 text-[10px] font-medium text-ink-muted backdrop-blur-sm">
          Drag to spin 360°
        </span>
      </div>
    </div>
  );
}
