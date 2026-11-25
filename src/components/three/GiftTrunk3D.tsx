"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  Gift,
  Sparkles,
  ArrowRight,
  Layers,
  Play,
  Pause,
  MessageCircle,
} from "lucide-react";
import { StudioStage3D, WebGLErrorBoundary } from "@/components/three/StudioStage3D";
import { CameraRig3D } from "@/components/three/CameraRig3D";
import { PureVegBadge } from "@/components/ui/PureVegBadge";
import { BAKERY_INFO } from "@/data/bakery";
import { buildWhatsAppLink } from "@/lib/format";

const TAU = Math.PI * 2;

const TREAT_DESCRIPTIONS: Record<string, string> = {
  loaf: "Pistachio, Rose & Almond Wholewheat Tea Loaf — emerald glaze with rose petals",
  brownies: "Belgian Couverture Fudgy Walnut Brownies — glazed with melted chocolate swirls",
  jar: "House-Simmered Raspberry & Fig Compote Glass Jar — golden brass seal cap",
  muffins: "Organic Jaggery & Vanilla Crumb Muffins — baked fresh in pleated cups",
  cookies: "Dark Chocolate Chunk & Oat Cookies — pure cultured brown butter",
  truffles: "Hand-Rolled 54% Cocoa Gold-Foil Hazelnut Truffles",
};

function TreatInteractive({
  id,
  basePosition,
  exploded,
  isOpen,
  hovered,
  bouncedAt,
  onHover,
  onClick,
  children,
}: {
  id: string;
  basePosition: [number, number, number];
  exploded: boolean;
  isOpen: boolean;
  hovered: string | null;
  bouncedAt: { id: string; at: number } | null;
  onHover: (id: string | null) => void;
  onClick: (id: string) => void;
  children: React.ReactNode;
}) {
  const ref = useRef<THREE.Group>(null);
  const isHovered = hovered === id;

  useFrame((state, delta) => {
    if (!ref.current) return;
    // Drop quickly inside before lid shuts; rise gracefully when opening
    const posSpeed = isOpen || exploded ? 6.5 : 13;
    const smoothPos = 1 - Math.exp(-posSpeed * delta);
    const explodeLift = exploded ? 0.98 : isOpen ? 0.34 : 0;
    const bob =
      isOpen || exploded
        ? Math.sin(state.clock.elapsedTime * 1.9 + basePosition[0] * 2) * 0.04
        : 0;
    const age = bouncedAt && bouncedAt.id === id ? (performance.now() - bouncedAt.at) / 1000 : 10;
    const hop =
      (isOpen || exploded) && age < 0.48
        ? Math.sin((age / 0.48) * Math.PI) * 0.28
        : 0;

    const targetY =
      basePosition[1] + explodeLift + bob + hop + (isHovered && (isOpen || exploded) ? 0.09 : 0);
    const targetScale = isHovered && (isOpen || exploded) ? 1.09 : 1;

    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, targetY, smoothPos);
    ref.current.scale.setScalar(THREE.MathUtils.lerp(ref.current.scale.x, targetScale, smoothPos));
    if (exploded || (isOpen && isHovered)) {
      ref.current.rotation.y += delta * 0.55;
    } else {
      ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, 0, smoothPos);
    }
  });

  return (
    <group
      ref={ref}
      position={basePosition}
      onPointerOver={(e) => {
        if (!isOpen && !exploded) return;
        e.stopPropagation();
        document.body.style.cursor = "pointer";
        onHover(id);
      }}
      onPointerOut={() => {
        document.body.style.cursor = "auto";
        onHover(null);
      }}
      onClick={(e) => {
        if (!isOpen && !exploded) return;
        e.stopPropagation();
        onClick(id);
      }}
    >
      {children}
    </group>
  );
}

function FestiveGiftBoxMesh({
  isOpen,
  exploded,
  autoRotate,
  hovered,
  bouncedAt,
  onHover,
  onClickTreat,
}: {
  isOpen: boolean;
  exploded: boolean;
  autoRotate: boolean;
  hovered: string | null;
  bouncedAt: { id: string; at: number } | null;
  onHover: (id: string | null) => void;
  onClickTreat: (id: string) => void;
}) {
  const trunkRef = useRef<THREE.Group>(null);
  const lidRef = useRef<THREE.Group>(null);
  const treatsGroupRef = useRef<THREE.Group>(null);

  const bowLoops = useMemo(() => [0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2], []);
  const boxOpen = isOpen || exploded;

  // Hollow box interior coordinates:
  // floor top = +0.03, tissue liner top = +0.11, wall top & closed lid underside = +0.78
  const wallH = 0.78;
  const wallCenterY = wallH / 2;

  useFrame((state, delta) => {
    const smoothTrunk = 1 - Math.exp(-6 * delta);
    if (trunkRef.current) {
      if (autoRotate) {
        trunkRef.current.rotation.y += delta * 0.25;
      } else {
        trunkRef.current.rotation.y = THREE.MathUtils.lerp(
          trunkRef.current.rotation.y,
          state.pointer.x * 0.35,
          smoothTrunk
        );
      }
      trunkRef.current.rotation.x = THREE.MathUtils.lerp(
        trunkRef.current.rotation.x,
        -state.pointer.y * 0.08,
        smoothTrunk
      );
    }

    if (lidRef.current) {
      // Open fast; close smoothly right after treats settle down inside cavity
      const lidSpeed = boxOpen ? 7.5 : 4.8;
      const smoothLid = 1 - Math.exp(-lidSpeed * delta);
      const targetAngle = boxOpen ? -Math.PI * 0.65 : 0;
      const targetLift = boxOpen ? 0.08 : 0;
      lidRef.current.rotation.x = THREE.MathUtils.lerp(
        lidRef.current.rotation.x,
        targetAngle,
        smoothLid
      );
      lidRef.current.position.y = THREE.MathUtils.lerp(
        lidRef.current.position.y,
        wallH + targetLift,
        smoothLid
      );

      // Hide interior group completely once lid closes down to zero-angle so zero edges can ever peek through
      if (treatsGroupRef.current) {
        treatsGroupRef.current.visible = boxOpen || lidRef.current.rotation.x < -0.06;
      }
    }
  });

  return (
    <group ref={trunkRef} position={[0, -0.45, 0]}>
      {/* Dark Walnut Pedestal Tray Under Gift Trunk */}
      <mesh castShadow receiveShadow position={[0, -0.08, 0]}>
        <boxGeometry args={[2.62, 0.1, 2.02]} />
        <meshStandardMaterial color="#583a27" roughness={0.38} />
      </mesh>
      {[
        [-1.24, -0.14, -0.94],
        [1.24, -0.14, -0.94],
        [-1.24, -0.14, 0.94],
        [1.24, -0.14, 0.94],
      ].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <cylinderGeometry args={[0.06, 0.04, 0.05, 12]} />
          <meshStandardMaterial color="#d4a64a" metalness={0.8} roughness={0.22} />
        </mesh>
      ))}

      {/* ==================== HOLLOW 5-WALL ECO-KRAFT BOX CAVITY ==================== */}
      <group>
        {/* Solid Bottom Floor (top at y = +0.03) */}
        <mesh castShadow receiveShadow position={[0, 0, 0]}>
          <boxGeometry args={[2.28, 0.06, 1.72]} />
          <meshStandardMaterial color="#cdb387" roughness={0.8} />
        </mesh>
        {/* Front Wall (+Z) */}
        <mesh castShadow receiveShadow position={[0, wallCenterY, 0.83]}>
          <boxGeometry args={[2.28, wallH, 0.06]} />
          <meshStandardMaterial color="#d6be96" roughness={0.78} />
        </mesh>
        {/* Back Wall (-Z) */}
        <mesh castShadow receiveShadow position={[0, wallCenterY, -0.83]}>
          <boxGeometry args={[2.28, wallH, 0.06]} />
          <meshStandardMaterial color="#d6be96" roughness={0.78} />
        </mesh>
        {/* Left Wall (-X) */}
        <mesh castShadow receiveShadow position={[-1.11, wallCenterY, 0]}>
          <boxGeometry args={[0.06, wallH, 1.6]} />
          <meshStandardMaterial color="#d6be96" roughness={0.78} />
        </mesh>
        {/* Right Wall (+X) */}
        <mesh castShadow receiveShadow position={[1.11, wallCenterY, 0]}>
          <boxGeometry args={[0.06, wallH, 1.6]} />
          <meshStandardMaterial color="#d6be96" roughness={0.78} />
        </mesh>

        {/* Inner Sage-Cream Cushion Liner resting cleanly on bottom floor (top at y = +0.11) */}
        <mesh receiveShadow position={[0, 0.07, 0]}>
          <boxGeometry args={[2.12, 0.08, 1.56]} />
          <meshStandardMaterial color="#eef5dc" roughness={0.9} />
        </mesh>

        {/* Exterior Satin Ribbon Bands mounted flush on outer walls ONLY (never bisecting cavity!) */}
        <mesh position={[0, wallCenterY, 0.865]}>
          <boxGeometry args={[0.2, wallH, 0.015]} />
          <meshStandardMaterial color="#4c6b40" roughness={0.42} />
        </mesh>
        <mesh position={[0, wallCenterY, -0.865]}>
          <boxGeometry args={[0.2, wallH, 0.015]} />
          <meshStandardMaterial color="#4c6b40" roughness={0.42} />
        </mesh>
        <mesh position={[-1.145, wallCenterY, 0]}>
          <boxGeometry args={[0.015, wallH, 0.2]} />
          <meshStandardMaterial color="#4c6b40" roughness={0.42} />
        </mesh>
        <mesh position={[1.145, wallCenterY, 0]}>
          <boxGeometry args={[0.015, wallH, 0.2]} />
          <meshStandardMaterial color="#4c6b40" roughness={0.42} />
        </mesh>

        {/* Gold Seal Medallion on Front Wall */}
        <mesh position={[0, wallCenterY, 0.878]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.14, 0.14, 0.02, 24]} />
          <meshStandardMaterial color="#d4a64a" metalness={0.82} roughness={0.2} />
        </mesh>
      </group>

      {/* ==================== 6 HANDCRAFTED 100% PURE VEG TREATS SEATED INSIDE CAVITY ==================== */}
      {/* Seated at y = +0.12 -> every treat top sits <= 0.62 when closed (well below lid bottom at 0.78!) */}
      <group ref={treatsGroupRef} position={[0, 0.12, 0]}>
        {/* 1. PISTACHIO ROSE ORGANIC TEA LOAF (Back Right) */}
        <TreatInteractive
          id="loaf"
          basePosition={[0.58, 0.14, -0.32]}
          exploded={exploded}
          isOpen={boxOpen}
          hovered={hovered}
          bouncedAt={bouncedAt}
          onHover={onHover}
          onClick={onClickTreat}
        >
          <mesh castShadow>
            <boxGeometry args={[0.68, 0.26, 0.44]} />
            <meshStandardMaterial color="#dfa957" roughness={0.76} />
          </mesh>
          <mesh castShadow position={[0, 0.13, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.2, 0.2, 0.64, 16, 1, false, 0, Math.PI]} />
            <meshStandardMaterial color="#c98936" roughness={0.68} />
          </mesh>
          <mesh castShadow position={[0, 0.25, 0]}>
            <boxGeometry args={[0.58, 0.05, 0.32]} />
            <meshPhysicalMaterial color="#80ab53" roughness={0.28} clearcoat={0.5} />
          </mesh>
          {[
            [-0.16, 0.29, 0.05, "#d95772"],
            [0.04, 0.3, -0.04, "#e76d86"],
            [0.16, 0.29, 0.04, "#4c6b40"],
          ].map(([x, y, z, col], i) => (
            <mesh key={i} position={[x as number, y as number, z as number]}>
              <dodecahedronGeometry args={[0.038, 0]} />
              <meshStandardMaterial color={col as string} roughness={0.45} />
            </mesh>
          ))}
        </TreatInteractive>

        {/* 2. BELGIAN COUVERTURE WALNUT BROWNIES STACK (Back Left) */}
        <TreatInteractive
          id="brownies"
          basePosition={[-0.62, 0.1, -0.3]}
          exploded={exploded}
          isOpen={boxOpen}
          hovered={hovered}
          bouncedAt={bouncedAt}
          onHover={onHover}
          onClick={onClickTreat}
        >
          <mesh castShadow position={[-0.06, 0, 0.04]} rotation={[0, 0.15, 0]}>
            <boxGeometry args={[0.44, 0.18, 0.44]} />
            <meshStandardMaterial color="#381c14" roughness={0.55} />
          </mesh>
          <mesh castShadow position={[0.06, 0.17, -0.04]} rotation={[0.05, -0.22, 0]}>
            <boxGeometry args={[0.42, 0.16, 0.42]} />
            <meshStandardMaterial color="#2c140e" roughness={0.48} />
          </mesh>
          <mesh position={[0.06, 0.26, -0.04]} rotation={[0.05, 0.5, 0]}>
            <boxGeometry args={[0.4, 0.02, 0.055]} />
            <meshPhysicalMaterial color="#1a0a06" roughness={0.14} clearcoat={0.9} />
          </mesh>
          <mesh castShadow position={[0.06, 0.3, -0.04]}>
            <dodecahedronGeometry args={[0.065, 0]} />
            <meshStandardMaterial color="#9c6a3f" roughness={0.62} />
          </mesh>
        </TreatInteractive>

        {/* 3. GLASS RASPBERRY-FIG COMPOTE JAR (Center Back) */}
        <TreatInteractive
          id="jar"
          basePosition={[-0.02, 0.18, -0.36]}
          exploded={exploded}
          isOpen={boxOpen}
          hovered={hovered}
          bouncedAt={bouncedAt}
          onHover={onHover}
          onClick={onClickTreat}
        >
          <mesh castShadow position={[0, -0.02, 0]}>
            <cylinderGeometry args={[0.16, 0.16, 0.3, 24]} />
            <meshStandardMaterial color="#9e1e36" roughness={0.25} />
          </mesh>
          <mesh position={[0, 0.02, 0]}>
            <cylinderGeometry args={[0.19, 0.19, 0.4, 28]} />
            <meshPhysicalMaterial
              color="#ffffff"
              transparent
              opacity={0.34}
              roughness={0.05}
              clearcoat={1}
              reflectivity={0.95}
              depthWrite={false}
            />
          </mesh>
          <mesh castShadow position={[0, 0.23, 0]}>
            <cylinderGeometry args={[0.175, 0.175, 0.075, 24]} />
            <meshStandardMaterial color="#d4a64a" metalness={0.82} roughness={0.22} />
          </mesh>
          <mesh position={[0, 0.16, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.19, 0.014, 8, 24]} />
            <meshStandardMaterial color="#4c6b40" roughness={0.5} />
          </mesh>
        </TreatInteractive>

        {/* 4. JAGGERY VANILLA CRUMB MUFFINS PAIR (Front Left) */}
        <TreatInteractive
          id="muffins"
          basePosition={[-0.6, 0.1, 0.35]}
          exploded={exploded}
          isOpen={boxOpen}
          hovered={hovered}
          bouncedAt={bouncedAt}
          onHover={onHover}
          onClick={onClickTreat}
        >
          {[
            [-0.17, 0, 0.04],
            [0.17, 0.02, -0.05],
          ].map(([mx, my, mz], i) => (
            <group key={i} position={[mx, my, mz]}>
              <mesh castShadow>
                <cylinderGeometry args={[0.15, 0.11, 0.17, 16]} />
                <meshStandardMaterial color="#f4fade" roughness={0.65} />
              </mesh>
              <mesh castShadow position={[0, 0.1, 0]}>
                <sphereGeometry args={[0.155, 16, 12, 0, TAU, 0, Math.PI * 0.65]} />
                <meshStandardMaterial color="#c88134" roughness={0.62} />
              </mesh>
            </group>
          ))}
        </TreatInteractive>

        {/* 5. DARK CHOC-CHUNK OAT COOKIES STACK (Front Center) */}
        <TreatInteractive
          id="cookies"
          basePosition={[0.02, 0.05, 0.36]}
          exploded={exploded}
          isOpen={boxOpen}
          hovered={hovered}
          bouncedAt={bouncedAt}
          onHover={onHover}
          onClick={onClickTreat}
        >
          {[0, 0.08, 0.16].map((cy, idx) => (
            <group
              key={idx}
              position={[(idx - 1) * 0.07, cy, (idx % 2) * 0.04]}
              rotation={[0.05 * idx, idx * 0.8, 0]}
            >
              <mesh castShadow>
                <cylinderGeometry args={[0.22, 0.23, 0.07, 22]} />
                <meshStandardMaterial color="#c88d4b" roughness={0.75} />
              </mesh>
              {[
                [0.08, 0.036, 0.05],
                [-0.08, 0.036, 0.04],
                [0.02, 0.036, -0.08],
              ].map(([cx, ccy, cz], j) => (
                <mesh key={j} position={[cx, ccy, cz]}>
                  <boxGeometry args={[0.046, 0.028, 0.046]} />
                  <meshStandardMaterial color="#25110b" roughness={0.35} />
                </mesh>
              ))}
            </group>
          ))}
        </TreatInteractive>

        {/* 6. GOLD-FOIL HAZELNUT TRUFFLE GEMS (Front Right) */}
        <TreatInteractive
          id="truffles"
          basePosition={[0.62, 0.07, 0.34]}
          exploded={exploded}
          isOpen={boxOpen}
          hovered={hovered}
          bouncedAt={bouncedAt}
          onHover={onHover}
          onClick={onClickTreat}
        >
          {[
            [-0.13, 0.035, 0.07, "#d4a64a", true],
            [0.12, 0.035, 0.09, "#3b1d14", false],
            [0, 0.035, -0.13, "#e0b758", true],
          ].map(([tx, ty, tz, col, metallic], i) => (
            <group key={i} position={[tx as number, ty as number, tz as number]}>
              <mesh castShadow position={[0, -0.035, 0]}>
                <cylinderGeometry args={[0.11, 0.085, 0.065, 14]} />
                <meshStandardMaterial color="#4c6b40" roughness={0.55} />
              </mesh>
              <mesh castShadow position={[0, 0.045, 0]}>
                <sphereGeometry args={[0.092, 16, 16]} />
                <meshStandardMaterial
                  color={col as string}
                  metalness={metallic ? 0.85 : 0.05}
                  roughness={metallic ? 0.22 : 0.48}
                />
              </mesh>
            </group>
          ))}
        </TreatInteractive>
      </group>

      {/* ==================== HINGED LID WITH BRASS TRIM, RIBBON & BOW ==================== */}
      <group ref={lidRef} position={[0, wallH, -0.86]}>
        <group position={[0, 0.08, 0.86]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[2.36, 0.16, 1.8]} />
            <meshStandardMaterial color="#f4fade" roughness={0.56} />
          </mesh>
          <mesh position={[0, -0.072, 0]}>
            <boxGeometry args={[2.38, 0.03, 1.82]} />
            <meshStandardMaterial color="#d4a64a" metalness={0.72} roughness={0.26} />
          </mesh>
          {/* Inner Greeting Card */}
          <mesh position={[0, -0.086, 0]}>
            <boxGeometry args={[1.45, 0.01, 0.95]} />
            <meshStandardMaterial color="#ffffff" roughness={0.6} />
          </mesh>
          {/* Outer Satin Cross Ribbon */}
          <mesh position={[0, 0.006, 0]}>
            <boxGeometry args={[0.21, 0.17, 1.82]} />
            <meshStandardMaterial color="#4c6b40" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0.006, 0]}>
            <boxGeometry args={[2.38, 0.17, 0.21]} />
            <meshStandardMaterial color="#4c6b40" roughness={0.4} />
          </mesh>
          {/* Sculpted 4-Loop Gold Bow + Center Knot */}
          <group position={[0, 0.15, 0]}>
            {bowLoops.map((rot, idx) => (
              <mesh key={idx} castShadow rotation={[0.28, rot + Math.PI / 4, 0.35]}>
                <torusGeometry args={[0.14, 0.035, 10, 22]} />
                <meshStandardMaterial color="#d4a64a" metalness={0.55} roughness={0.28} />
              </mesh>
            ))}
            <mesh castShadow>
              <sphereGeometry args={[0.07, 14, 14]} />
              <meshStandardMaterial color="#d4a64a" metalness={0.65} roughness={0.24} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
}

export function GiftTrunk3D() {
  const [isOpen, setIsOpen] = useState(true);
  const [exploded, setExploded] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [hovered, setHovered] = useState<string | null>(null);
  const [selectedTreat, setSelectedTreat] = useState<string>("loaf");
  const [bouncedAt, setBouncedAt] = useState<{ id: string; at: number } | null>(null);

  useEffect(() => {
    return () => {
      document.body.style.cursor = "auto";
    };
  }, []);

  const handleClickTreat = (id: string) => {
    setSelectedTreat(id);
    setBouncedAt({ id, at: performance.now() });
  };

  const activeCaption = isOpen || exploded
    ? TREAT_DESCRIPTIONS[hovered ?? selectedTreat] ?? TREAT_DESCRIPTIONS.loaf
    : "Box tied & sealed with 100% Pure Veg wax crest — click Open Gift Trunk to peek inside!";

  return (
    <div className="overflow-hidden rounded-[2.25rem] border border-border-strong bg-surface shadow-sm">
      <div className="grid items-center lg:grid-cols-12">
        <div className="relative bg-parchment-glow lg:col-span-7 border-b border-border lg:border-b-0 lg:border-r">
          <div className="pointer-events-none absolute inset-x-3 top-3 z-10 flex flex-wrap items-center justify-between gap-2 sm:inset-x-4 sm:top-4">
            <PureVegBadge label="3D Interactive Gift Hamper" compact />
            <span className="hidden sm:inline-flex items-center rounded-full bg-ink/85 px-3 py-1 text-[11px] font-medium text-logo-tint backdrop-blur-md">
              {isOpen ? "Click any treat inside · Drag 360°" : "Drag 360° around closed hamper"}
            </span>
          </div>

          <div className="relative h-[340px] w-full sm:h-[390px]">
            <WebGLErrorBoundary
              fallback={
                <div className="flex h-full items-center justify-center p-6 text-center text-sm text-ink-muted">
                  Interactive 3D Festive Gift Trunk
                </div>
              }
            >
              <Canvas
                shadows
                dpr={[1, 1.75]}
                camera={{ position: [3.15, 2.35, 3.7], fov: 39 }}
                gl={{
                  antialias: true,
                  toneMapping: THREE.ACESFilmicToneMapping,
                  toneMappingExposure: 1.08,
                }}
              >
                <StudioStage3D shadowY={-0.68} sparkleColor="#d4a64a" />
                <FestiveGiftBoxMesh
                  isOpen={isOpen}
                  exploded={exploded}
                  autoRotate={autoRotate}
                  hovered={hovered}
                  bouncedAt={bouncedAt}
                  onHover={setHovered}
                  onClickTreat={handleClickTreat}
                />
                <CameraRig3D preset="studio" presetVersion={0} maxPolarAngle={Math.PI / 2} />
              </Canvas>
            </WebGLErrorBoundary>

            <div className="pointer-events-none absolute bottom-3 inset-x-3 flex justify-center">
              <div className="rounded-full border border-border-strong bg-surface/92 px-3.5 py-1.5 text-center shadow-xs backdrop-blur-sm">
                <p className="text-[11px] font-semibold text-ink sm:text-xs">{activeCaption}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border bg-surface/90 px-4 py-3 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  if (isOpen) setExploded(false);
                  setIsOpen((o) => !o);
                }}
                className="btn-shine inline-flex items-center gap-1.5 rounded-full bg-herb px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-herb-hover cursor-pointer"
              >
                <Gift className="h-3.5 w-3.5" />
                <span>{isOpen ? "Close & Tie Box" : "Open Gift Trunk"}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsOpen(true);
                  setExploded((e) => !e);
                }}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold transition cursor-pointer ${
                  exploded
                    ? "bg-terracotta text-white"
                    : "border border-border-strong bg-canvas text-ink hover:bg-logo-tint"
                }`}
              >
                <Layers className="h-3.5 w-3.5" />
                <span>{exploded ? "Rest Inside" : "Unpack 3D Treats"}</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setAutoRotate((r) => !r)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-canvas text-ink hover:bg-logo-tint cursor-pointer"
              aria-label={autoRotate ? "Pause turntable spin" : "Play turntable spin"}
              title={autoRotate ? "Pause 360° spin" : "Play 360° spin"}
            >
              {autoRotate ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>

        <div className="p-6 sm:p-8 lg:col-span-5 lg:p-10 space-y-5">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-herb">
            <Sparkles className="h-3.5 w-3.5 text-saffron" />
            <span>Handcrafted Eco-Kraft Trunks</span>
          </div>
          <h3 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            100% Pure Veg Festive &amp; Family Gift Boxes
          </h3>
          <p className="text-sm leading-relaxed text-ink-olive sm:text-base">
            Packaged in biodegradable kraft trunks tied with satin botanical bows—featuring{" "}
            <strong>Belgian walnut brownies</strong>, <strong>pistachio rose tea loaves</strong>,{" "}
            <strong>berry compote jars</strong>, <strong>jaggery muffins</strong>, and{" "}
            <strong>gold-foil truffles</strong> starting from <strong>₹560</strong>.
          </p>

          <div className="flex flex-col gap-2.5 pt-1 sm:flex-row sm:flex-wrap">
            <Link
              href="/menu/?category=hampers"
              className="btn-shine inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-logo-tint transition hover:bg-herb hover:text-white"
            >
              <span>Explore Gift Hampers</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={buildWhatsAppLink(
                `Hello Mrida Bakess (Mandi)! I'd love to order a 100% Pure Veg Festive Gift Hamper Trunk.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border-strong bg-logo-tint px-5 py-3 text-sm font-semibold text-ink transition hover:bg-linen"
            >
              <MessageCircle className="h-4 w-4 text-herb" />
              <span>WhatsApp {BAKERY_INFO.contact.whatsappRaw}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
