"use client";

import { useState } from "react";
import Link from "next/link";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import {
  Layers,
  Play,
  Pause,
  Sparkles,
  Flame,
  Eye,
  Plus,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ArrowRight,
  Box,
  Utensils,
  Wind,
} from "lucide-react";
import { CAKE_FLAVORS_3D, LAYER_ANATOMY_LABELS } from "@/data/bakery-3d";
import { MENU_ITEMS } from "@/data/menu";
import { formatInr } from "@/lib/format";
import { useOrderDrawer } from "@/context/OrderDrawerContext";
import { PureVegBadge } from "@/components/ui/PureVegBadge";
import { StudioStage3D, WebGLErrorBoundary } from "@/components/three/StudioStage3D";
import { CakeAssemblyModel } from "@/components/three/CakeAssemblyModel";
import { CameraRig3D, type CameraPresetKey } from "@/components/three/CameraRig3D";

export function BakeryStudio3D() {
  const { addItem, openDrawer } = useOrderDrawer();

  const [flavorId, setFlavorId] = useState(CAKE_FLAVORS_3D[0].id);
  const [selectedWeight, setSelectedWeight] = useState<"500g" | "1kg">("500g");
  const [exploded, setExploded] = useState(false);
  const [showGlassCase, setShowGlassCase] = useState(true);
  const [tiers, setTiers] = useState<1 | 2>(1);
  const [showCandle, setShowCandle] = useState(true);
  const [candleLit, setCandleLit] = useState(true);
  const [isCut, setIsCut] = useState(false);
  const [cutTrigger, setCutTrigger] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [assembleTrigger, setAssembleTrigger] = useState(0);
  const [zoomScale, setZoomScale] = useState(1);
  const [cameraPreset, setCameraPreset] = useState<CameraPresetKey>("studio");
  const [presetVersion, setPresetVersion] = useState(0);
  const [plaqueText, setPlaqueText] = useState("");

  const activeFlavor =
    CAKE_FLAVORS_3D.find((f) => f.id === flavorId) ?? CAKE_FLAVORS_3D[0];
  const displayPrice =
    tiers === 2
      ? Math.round(activeFlavor.price1kg * 1.95)
      : selectedWeight === "1kg"
      ? activeFlavor.price1kg
      : activeFlavor.startingPrice500g;

  const triggerAssembleSequence = () => {
    setIsCut(false);
    setExploded(false);
    setAssembleTrigger((n) => n + 1);
  };

  const handleToggleCutCake = () => {
    if (isCut) {
      setIsCut(false);
      return;
    }
    setTiers(1);
    setExploded(false);
    setShowGlassCase(false);
    setIsCut(true);
    setCutTrigger((n) => n + 1);
    setCameraPreset("studio");
    setPresetVersion((v) => v + 1);
  };

  const handleToggleExplode = () => {
    if (!exploded) {
      setIsCut(false);
    }
    setExploded((v) => !v);
  };

  const handleToggleTiers = () => {
    setIsCut(false);
    setTiers((t) => (t === 1 ? 2 : 1));
  };

  const selectCamera = (preset: CameraPresetKey) => {
    setCameraPreset(preset);
    setPresetVersion((v) => v + 1);
  };

  const handleAdd3DCakeToTray = () => {
    const menuItem = MENU_ITEMS.find((item) => item.id === activeFlavor.menuItemId);
    if (!menuItem) return;

    const variantIdx = selectedWeight === "1kg" ? 1 : 0;
    const variant = menuItem.variants[variantIdx] ?? menuItem.variants[0];
    const trimmedNote = plaqueText.trim();

    addItem({
      itemId: menuItem.id,
      slug: menuItem.slug,
      name: menuItem.name,
      image: menuItem.image,
      variantLabel: tiers === 2 ? "2 kg Custom 2-Tier (3D Showcase)" : variant.label,
      unitPriceInr: tiers === 2 ? displayPrice : variant.priceInr,
      eggless: true,
      cakeNote: trimmedNote
        ? `Cake Text: "${trimmedNote}" · 100% Pure Veg`
        : showCandle
        ? "Include celebration candle · 100% Pure Veg"
        : undefined,
    });
    openDrawer();
  };

  return (
    <div
      id="studio-3d"
      className="overflow-hidden rounded-[2.25rem] border border-border-strong bg-surface shadow-[0_24px_60px_-28px_rgba(34,36,25,0.2)]"
    >
      <div className="grid lg:grid-cols-12">
        {/* LEFT: Interactive 3D WebGL Cake Display Case */}
        <div className="relative bg-parchment-glow lg:col-span-7 border-b border-border lg:border-b-0 lg:border-r">
          {/* Top HUD */}
          <div className="pointer-events-none absolute inset-x-3 top-3 z-10 flex flex-wrap items-start justify-between gap-2 sm:inset-x-5 sm:top-5">
            <div className="pointer-events-auto flex flex-wrap items-center gap-2">
              <PureVegBadge label="100% Pure Veg 3D Studio" compact />
              <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-ink/85 px-3 py-1 text-[11px] font-medium text-logo-tint backdrop-blur-md">
                {isCut ? "Slice revealed! Drag 360° to inspect" : "Move mouse · Drag 360°"}
              </span>
            </div>

            <div className="pointer-events-auto flex items-center gap-1.5 rounded-full border border-border-strong bg-surface/90 p-1 shadow-xs backdrop-blur-md">
              {(
                [
                  { key: "studio", label: "3/4 View" },
                  { key: "top", label: "Top" },
                  { key: "layers", label: "Side" },
                ] as const
              ).map((view) => (
                <button
                  key={view.key}
                  type="button"
                  onClick={() => selectCamera(view.key)}
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition cursor-pointer ${
                    cameraPreset === view.key
                      ? "bg-ink text-logo-tint"
                      : "text-ink-olive hover:bg-logo-tint hover:text-ink"
                  }`}
                >
                  {view.label}
                </button>
              ))}
            </div>
          </div>

          {/* 3D Canvas */}
          <div className="relative h-[350px] w-full sm:h-[470px] lg:h-[560px]">
            <WebGLErrorBoundary
              fallback={
                <div className="flex h-full flex-col items-center justify-center p-8 text-center">
                  <Sparkles className="mb-3 h-8 w-8 text-herb" />
                  <p className="font-display text-xl font-semibold text-ink">
                    3D Preview Unavailable on This Device
                  </p>
                  <p className="mt-1 text-sm text-ink-muted">
                    Select any flavour on the right or explore our photo menu below.
                  </p>
                </div>
              }
            >
              <Canvas
                shadows
                dpr={[1, 1.75]}
                camera={{ position: [3.25, 1.95, 3.6], fov: 39 }}
                gl={{
                  antialias: true,
                  toneMapping: THREE.ACESFilmicToneMapping,
                  toneMappingExposure: 1.08,
                }}
              >
                <StudioStage3D shadowY={-1.36} sparkleColor={activeFlavor.accentColor} />
                <CakeAssemblyModel
                  flavor={activeFlavor}
                  tiers={tiers}
                  exploded={exploded}
                  showGlassCase={showGlassCase}
                  showCandle={showCandle}
                  candleLit={candleLit}
                  isCut={isCut}
                  cutTrigger={cutTrigger}
                  autoRotate={autoRotate}
                  assembleTrigger={assembleTrigger}
                  zoomScale={zoomScale}
                />
                <CameraRig3D preset={cameraPreset} presetVersion={presetVersion} />
              </Canvas>
            </WebGLErrorBoundary>

            {/* Live Custom Cake Name Plaque Preview Floating Badge */}
            {plaqueText.trim() ? (
              <div className="pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2">
                <div className="animate-fade-up rounded-full border-2 border-[#d4a64a] bg-surface/95 px-5 py-1.5 shadow-md backdrop-blur-sm">
                  <p className="font-display text-sm italic font-semibold text-ink whitespace-nowrap">
                    {plaqueText.trim()}
                  </p>
                </div>
              </div>
            ) : null}
          </div>

          {/* Bottom Interactive Action Dock */}
          <div className="border-t border-border/80 bg-surface/92 px-3 py-3 backdrop-blur-md sm:px-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={handleToggleCutCake}
                  className={`btn-shine inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold shadow-xs transition active:scale-95 cursor-pointer ${
                    isCut
                      ? "bg-terracotta text-white"
                      : "bg-ink text-logo-tint hover:bg-herb hover:text-white"
                  }`}
                >
                  <Utensils className="h-3.5 w-3.5" />
                  <span>{isCut ? "Reset Whole Cake" : "Cut Cake Slice"}</span>
                </button>

                <button
                  type="button"
                  onClick={triggerAssembleSequence}
                  className="btn-shine inline-flex items-center gap-1.5 rounded-full bg-herb px-3.5 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-herb-hover active:scale-95 cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Assemble</span>
                </button>

                <button
                  type="button"
                  onClick={handleToggleExplode}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold transition cursor-pointer ${
                    exploded
                      ? "bg-terracotta text-white shadow-xs"
                      : "border border-border-strong bg-canvas text-ink hover:bg-logo-tint"
                  }`}
                >
                  <Layers className="h-3.5 w-3.5" />
                  <span>{exploded ? "Collapse" : "Layers"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsCut(false);
                    setShowGlassCase((v) => !v);
                  }}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold transition cursor-pointer ${
                    showGlassCase && !isCut
                      ? "bg-logo-tint text-ink ring-1 ring-border-strong"
                      : "border border-border bg-canvas text-ink-muted hover:text-ink"
                  }`}
                  title="Toggle crystal bakery display dome"
                >
                  <Box className="h-3.5 w-3.5 text-herb" />
                  <span className="sm:hidden">Case</span>
                  <span className="hidden sm:inline">Glass Case</span>
                </button>

                <button
                  type="button"
                  onClick={handleToggleTiers}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold transition cursor-pointer ${
                    tiers === 2
                      ? "bg-ink text-logo-tint"
                      : "border border-border bg-canvas text-ink-olive hover:bg-logo-tint"
                  }`}
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>{tiers === 2 ? "2-Tier" : "1-Tier"}</span>
                </button>

                {showCandle ? (
                  <button
                    type="button"
                    onClick={() => setCandleLit((l) => !l)}
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-2 text-xs font-semibold transition cursor-pointer ${
                      candleLit
                        ? "bg-terracotta-soft text-terracotta ring-1 ring-terracotta/30"
                        : "border border-border bg-canvas text-ink-olive"
                    }`}
                    title={candleLit ? "Blow out wish candle" : "Light celebration candle"}
                  >
                    {candleLit ? <Wind className="h-3.5 w-3.5" /> : <Flame className="h-3.5 w-3.5" />}
                    <span className="hidden sm:inline">{candleLit ? "Blow Wish" : "Light Candle"}</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setShowCandle(true);
                      setCandleLit(true);
                    }}
                    className="inline-flex items-center gap-1 rounded-full border border-border bg-canvas px-3 py-2 text-xs font-semibold text-ink-muted cursor-pointer"
                  >
                    <Flame className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Candle</span>
                  </button>
                )}
              </div>

              {/* Spin + Zoom utilities */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setZoomScale((z) => Math.max(0.78, Number((z - 0.12).toFixed(2))))}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-canvas text-ink hover:bg-logo-tint cursor-pointer"
                  aria-label="Zoom out cake"
                >
                  <ZoomOut className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setZoomScale((z) => Math.min(1.28, Number((z + 0.12).toFixed(2))))}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-canvas text-ink hover:bg-logo-tint cursor-pointer"
                  aria-label="Zoom in cake"
                >
                  <ZoomIn className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setAutoRotate((r) => !r)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-canvas text-ink hover:bg-logo-tint cursor-pointer"
                  aria-label={autoRotate ? "Pause 360 rotation" : "Play 360 rotation"}
                  title={autoRotate ? "Pause 360° spin" : "Play 360° spin"}
                >
                  {autoRotate ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Live Flavour Switcher, Custom Topper Plaque & Direct Tray Ordering */}
        <div className="flex flex-col justify-between p-5 sm:p-7 lg:col-span-5 lg:p-8 space-y-5">
          <div className="space-y-4">
            <div>
              <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-herb">
                <Sparkles className="h-3.5 w-3.5 text-saffron" />
                <span>Interactive 3D Patisserie &amp; Knife Cut Studio</span>
              </p>
              <p className="mt-2 font-devanagari text-xs font-medium text-ink-olive">
                {activeFlavor.hindiSubtitle}
              </p>
              <h2 className="mt-0.5 font-display text-2xl font-semibold text-ink sm:text-[1.75rem]">
                {activeFlavor.fullName}
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                {activeFlavor.description}
              </p>
            </div>

            {/* 5 Signature Flavour Swatches */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-olive">
                Choose 100% Pure Veg Flavour
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {CAKE_FLAVORS_3D.map((flv) => {
                  const active = flv.id === flavorId;
                  return (
                    <button
                      key={flv.id}
                      type="button"
                      onClick={() => setFlavorId(flv.id)}
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${
                        active
                          ? "bg-ink text-logo-tint ring-2 ring-herb/40 shadow-xs"
                          : "border border-border-strong bg-canvas text-ink-olive hover:bg-logo-tint"
                      }`}
                    >
                      <span
                        className="h-3 w-3 rounded-full ring-1 ring-black/15"
                        style={{ backgroundColor: flv.frostingColor }}
                      />
                      <span>{flv.shortName}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Cake Plaque Input */}
            <div>
              <label
                htmlFor="studio-cake-plaque"
                className="block text-xs font-semibold uppercase tracking-[0.16em] text-ink-olive"
              >
                Preview Custom Name / Message on Plaque (Optional)
              </label>
              <input
                id="studio-cake-plaque"
                type="text"
                maxLength={32}
                value={plaqueText}
                onChange={(e) => setPlaqueText(e.target.value)}
                placeholder="e.g. Happy Birthday Aarav!"
                className="mt-1.5 w-full rounded-xl border border-border-strong bg-canvas px-3.5 py-2 text-sm text-ink placeholder:text-ink-muted/70"
              />
            </div>

            {/* Weight + Live Rate Strip */}
            <div className="rounded-2xl border border-border-strong bg-logo-tint/65 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-olive">
                    {tiers === 2 ? "2-Tier Showstopper Rate" : "Transparent Rate"}
                  </p>
                  <p className="font-display text-3xl font-semibold text-ink">
                    {formatInr(displayPrice)}
                  </p>
                </div>

                {tiers === 1 ? (
                  <div className="inline-flex rounded-full border border-border-strong bg-surface p-1">
                    {(["500g", "1kg"] as const).map((w) => (
                      <button
                        key={w}
                        type="button"
                        onClick={() => setSelectedWeight(w)}
                        className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition cursor-pointer ${
                          selectedWeight === w
                            ? "bg-herb text-white"
                            : "text-ink-olive hover:text-ink"
                        }`}
                      >
                        {w}
                      </button>
                    ))}
                  </div>
                ) : (
                  <span className="rounded-full bg-surface px-3 py-1 text-xs font-semibold text-terracotta ring-1 ring-border">
                    2 kg · Serves 22–24
                  </span>
                )}
              </div>
            </div>

            {/* Inside Every Layer Mini Guide */}
            <div className="space-y-2 rounded-2xl border border-border bg-canvas/70 p-3.5">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-olive">
                  6 Craft Layers in This 3D Case
                </p>
                <button
                  type="button"
                  onClick={handleToggleCutCake}
                  className="text-[11px] font-semibold text-terracotta hover:underline cursor-pointer"
                >
                  {isCut ? "Heal Cake" : "Try Knife Cut →"}
                </button>
              </div>
              <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                {LAYER_ANATOMY_LABELS.map((layer) => (
                  <div key={layer.key} className="text-[11px] leading-snug">
                    <span className="font-semibold text-ink">• {layer.title}:</span>{" "}
                    <span className="text-ink-muted">{layer.detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Primary Actions */}
          <div className="flex flex-col gap-2.5 sm:flex-row">
            <button
              type="button"
              onClick={handleAdd3DCakeToTray}
              className="btn-shine flex-1 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-logo-tint transition hover:bg-herb hover:text-white cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Add to Order Tray</span>
            </button>

            <Link
              href={`/menu/${activeFlavor.slug}/`}
              className="inline-flex min-h-12 items-center justify-center gap-1.5 rounded-full border border-border-strong bg-canvas px-5 py-3 text-sm font-semibold text-ink transition hover:bg-logo-tint"
            >
              <span>Full Details</span>
              <ArrowRight className="h-4 w-4 text-herb" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
