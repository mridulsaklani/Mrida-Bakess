"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { CakeFlavor3D, ToppingStyle } from "@/data/bakery-3d";

export interface CakeAssemblyProps {
  flavor: CakeFlavor3D;
  tiers?: 1 | 2 | 3;
  tallSingle?: boolean;
  exploded?: boolean;
  showGlassCase?: boolean;
  showCandle?: boolean;
  candleLit?: boolean;
  isCut?: boolean;
  cutTrigger?: number;
  autoRotate?: boolean;
  assembleTrigger?: number;
  zoomScale?: number;
  isBotanicalFinish?: boolean;
}

const TAU = Math.PI * 2;
// Cut wedge positioned cleanly facing front-right camera
const SLICE_START = 0.28;
const SLICE_ARC = 0.78;
const SLICE_MID = SLICE_START + SLICE_ARC / 2;

function CutWallPlane({
  radius,
  height,
  angle,
  color,
  roughness = 0.72,
}: {
  radius: number;
  height: number;
  angle: number;
  color: string;
  roughness?: number;
}) {
  return (
    <mesh
      position={[(radius / 2) * Math.sin(angle), 0, (radius / 2) * Math.cos(angle)]}
      rotation={[0, angle - Math.PI / 2, 0]}
      castShadow
      receiveShadow
    >
      <planeGeometry args={[radius, height]} />
      <meshStandardMaterial color={color} roughness={roughness} side={THREE.DoubleSide} />
    </mesh>
  );
}

/**
 * Renders either the main cut body (TAU - SLICE_ARC) or the matching slice wedge (SLICE_ARC)
 * with realistic interior cross-section walls so layered sponge + filling stays solid & sharp.
 */
function SectorLayer({
  radius,
  height,
  outerColor,
  innerColor,
  mode,
  roughness = 0.55,
  glossy = false,
}: {
  radius: number;
  height: number;
  outerColor: string;
  innerColor: string;
  mode: "whole" | "body" | "slice";
  roughness?: number;
  glossy?: boolean;
}) {
  const thetaStart = mode === "slice" ? SLICE_START : mode === "body" ? SLICE_START + SLICE_ARC : 0;
  const thetaLength = mode === "slice" ? SLICE_ARC : mode === "body" ? TAU - SLICE_ARC : TAU;
  const radialSegs = mode === "slice" ? 18 : 44;

  return (
    <group>
      <mesh castShadow receiveShadow>
        <cylinderGeometry
          args={[radius, radius, height, radialSegs, 1, false, thetaStart, thetaLength]}
        />
        {glossy ? (
          <meshPhysicalMaterial
            color={outerColor}
            roughness={0.18}
            metalness={0.05}
            clearcoat={0.85}
            clearcoatRoughness={0.12}
          />
        ) : (
          <meshStandardMaterial color={outerColor} roughness={roughness} />
        )}
      </mesh>

      {mode !== "whole" ? (
        <>
          <CutWallPlane
            radius={radius}
            height={height}
            angle={SLICE_START}
            color={innerColor}
            roughness={0.78}
          />
          <CutWallPlane
            radius={radius}
            height={height}
            angle={SLICE_START + SLICE_ARC}
            color={innerColor}
            roughness={0.78}
          />
        </>
      ) : null}
    </group>
  );
}

function DripRing({
  radius,
  y,
  color,
  innerColor,
  mode,
  count = 18,
}: {
  radius: number;
  y: number;
  color: string;
  innerColor: string;
  mode: "whole" | "body" | "slice";
  count?: number;
}) {
  const droplets = useMemo(() => {
    return Array.from({ length: count })
      .map((_, idx) => {
        const angle = (idx / count) * TAU;
        const inSlice = angle >= SLICE_START && angle <= SLICE_START + SLICE_ARC;
        const keep = mode === "whole" || (mode === "slice" ? inSlice : !inSlice);
        if (!keep) return null;
        const len = 0.13 + ((idx * 37) % 10) * 0.022;
        const r = radius + 0.01;
        return {
          x: Math.sin(angle) * r,
          z: Math.cos(angle) * r,
          len,
        };
      })
      .filter(Boolean) as { x: number; z: number; len: number }[];
  }, [count, radius, mode]);

  return (
    <group position={[0, y, 0]}>
      <group position={[0, 0.012, 0]}>
        <SectorLayer
          radius={radius + 0.016}
          height={0.048}
          outerColor={color}
          innerColor={innerColor}
          mode={mode}
          glossy
        />
      </group>
      {droplets.map((d, i) => (
        <mesh key={i} castShadow position={[d.x, -d.len / 2, d.z]}>
          <capsuleGeometry args={[0.042, d.len, 6, 12]} />
          <meshPhysicalMaterial
            color={color}
            roughness={0.16}
            clearcoat={0.9}
            clearcoatRoughness={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

function ShellPipingRing({
  radius,
  y,
  color,
  mode,
  count = 24,
}: {
  radius: number;
  y: number;
  color: string;
  mode: "whole" | "body" | "slice";
  count?: number;
}) {
  const pearls = useMemo(() => {
    return Array.from({ length: count })
      .map((_, i) => {
        const angle = (i / count) * TAU;
        const inSlice = angle >= SLICE_START && angle <= SLICE_START + SLICE_ARC;
        const keep = mode === "whole" || (mode === "slice" ? inSlice : !inSlice);
        if (!keep) return null;
        return {
          x: Math.sin(angle) * radius,
          z: Math.cos(angle) * radius,
        };
      })
      .filter(Boolean) as { x: number; z: number }[];
  }, [count, radius, mode]);

  return (
    <group position={[0, y, 0]}>
      {pearls.map((p, idx) => (
        <mesh key={idx} castShadow position={[p.x, 0, p.z]}>
          <sphereGeometry args={[0.046, 10, 10]} />
          <meshStandardMaterial color={color} roughness={0.4} />
        </mesh>
      ))}
    </group>
  );
}

function RosetteRing({
  radius,
  y,
  creamColor,
  accentColor,
  mode,
  count = 10,
}: {
  radius: number;
  y: number;
  creamColor: string;
  accentColor: string;
  mode: "whole" | "body" | "slice";
  count?: number;
}) {
  const items = useMemo(() => {
    return Array.from({ length: count })
      .map((_, i) => {
        const angle = (i / count) * TAU + 0.08;
        const inSlice = angle >= SLICE_START && angle <= SLICE_START + SLICE_ARC;
        const keep = mode === "whole" || (mode === "slice" ? inSlice : !inSlice);
        if (!keep) return null;
        return {
          x: Math.sin(angle) * radius,
          z: Math.cos(angle) * radius,
          rotY: angle,
        };
      })
      .filter(Boolean) as { x: number; z: number; rotY: number }[];
  }, [count, radius, mode]);

  return (
    <group position={[0, y, 0]}>
      {items.map((pt, idx) => (
        <group key={idx} position={[pt.x, 0, pt.z]} rotation={[0, pt.rotY, 0]}>
          <mesh castShadow position={[0, 0.032, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.075, 0.036, 10, 20]} />
            <meshStandardMaterial color={creamColor} roughness={0.4} />
          </mesh>
          <mesh castShadow position={[0, 0.082, 0]}>
            <sphereGeometry args={[0.028, 12, 12]} />
            <meshStandardMaterial color={accentColor} roughness={0.28} metalness={0.2} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function CrownToppings({
  style,
  radius,
  frostingColor,
  dripColor,
  accentColor,
  isBotanical,
  mode,
}: {
  style: ToppingStyle;
  radius: number;
  frostingColor: string;
  dripColor: string;
  accentColor: string;
  isBotanical?: boolean;
  mode: "whole" | "body" | "slice";
}) {
  const garnishPoints = useMemo(() => {
    return Array.from({ length: 8 })
      .map((_, i) => {
        const angle = (i / 8) * TAU + 0.55;
        const inSlice = angle >= SLICE_START && angle <= SLICE_START + SLICE_ARC;
        const keep = mode === "whole" || (mode === "slice" ? inSlice : !inSlice);
        if (!keep) return null;
        const dist = radius * 0.56;
        return {
          x: Math.sin(angle) * dist,
          z: Math.cos(angle) * dist,
          angle,
          scale: 0.9 + (i % 3) * 0.14,
          idx: i,
        };
      })
      .filter(Boolean) as { x: number; z: number; angle: number; scale: number; idx: number }[];
  }, [radius, mode]);

  return (
    <group>
      <RosetteRing
        radius={radius * 0.78}
        y={0.02}
        creamColor={frostingColor}
        accentColor={accentColor}
        mode={mode}
        count={Math.max(8, Math.round(radius * 10))}
      />

      {garnishPoints.map((p) => {
        if (style === "truffles" || style === "hazelnut") {
          return (
            <group key={p.idx} position={[p.x, 0.085, p.z]} scale={p.scale}>
              {/* Hand-rolled chocolate truffle or roasted hazelnut */}
              <mesh castShadow>
                <sphereGeometry args={[style === "truffles" ? 0.085 : 0.072, 16, 16]} />
                <meshStandardMaterial
                  color={p.idx % 2 === 0 ? dripColor : "#7e5033"}
                  roughness={p.idx % 2 === 0 ? 0.42 : 0.34}
                />
              </mesh>
              {/* Sculpted Belgian chocolate curl arc */}
              <mesh
                castShadow
                position={[0.04, 0.055, 0]}
                rotation={[0.5, p.angle, 0.3]}
              >
                <torusGeometry args={[0.065, 0.015, 8, 18, Math.PI * 1.15]} />
                <meshPhysicalMaterial
                  color="#26100a"
                  roughness={0.2}
                  clearcoat={0.8}
                />
              </mesh>
              {p.idx % 2 === 0 ? (
                <mesh position={[-0.03, 0.075, 0.02]} rotation={[0.4, 0.3, 0]}>
                  <boxGeometry args={[0.042, 0.008, 0.042]} />
                  <meshStandardMaterial color="#e7bd58" metalness={0.82} roughness={0.18} />
                </mesh>
              ) : null}
            </group>
          );
        }

        if (style === "berries") {
          return (
            <group key={p.idx} position={[p.x, 0.085, p.z]} scale={p.scale}>
              {/* Strawberry with green 4-leaf calyx + blueberry pair */}
              <mesh castShadow position={[0, 0.02, 0]} rotation={[Math.PI, 0, 0.12]}>
                <coneGeometry args={[0.07, 0.135, 16]} />
                <meshStandardMaterial
                  color={p.idx % 3 === 0 ? "#252f66" : "#c7243a"}
                  roughness={0.34}
                />
              </mesh>
              <mesh position={[0, 0.085, 0]} rotation={[0, p.angle, 0]}>
                <cylinderGeometry args={[0.06, 0.02, 0.012, 5]} />
                <meshStandardMaterial color="#4c6b40" roughness={0.5} />
              </mesh>
              <mesh castShadow position={[0.075, -0.01, 0.03]}>
                <sphereGeometry args={[0.036, 12, 12]} />
                <meshStandardMaterial color="#252f66" roughness={0.3} />
              </mesh>
            </group>
          );
        }

        if (style === "pineapple") {
          return (
            <group key={p.idx} position={[p.x, 0.075, p.z]} rotation={[0.25, p.angle, 0.2]}>
              <mesh castShadow>
                <cylinderGeometry args={[0.078, 0.078, 0.032, 6]} />
                <meshStandardMaterial color="#eeb029" roughness={0.3} />
              </mesh>
              {p.idx % 2 === 0 ? (
                <mesh castShadow position={[0.02, 0.04, 0]}>
                  <sphereGeometry args={[0.042, 12, 12]} />
                  <meshStandardMaterial color="#b92737" roughness={0.22} />
                </mesh>
              ) : null}
            </group>
          );
        }

        return (
          <group key={p.idx} position={[p.x, 0.065, p.z]} rotation={[0.2, p.angle, 0]}>
            <mesh castShadow>
              <dodecahedronGeometry args={[0.056, 0]} />
              <meshStandardMaterial color={p.idx % 2 === 0 ? "#7aa64e" : "#d95772"} roughness={0.46} />
            </mesh>
            {isBotanical || p.idx % 2 === 1 ? (
              <mesh position={[0.06, 0.01, 0.02]} rotation={[0.2, 0.5, 0.3]}>
                <boxGeometry args={[0.09, 0.01, 0.044]} />
                <meshStandardMaterial color="#587b46" roughness={0.52} />
              </mesh>
            ) : null}
          </group>
        );
      })}
    </group>
  );
}

function CelebrationCandle({ visible, lit }: { visible: boolean; lit: boolean }) {
  const flameRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!flameRef.current || !visible || !lit) return;
    const t = state.clock.elapsedTime;
    flameRef.current.scale.y = 1 + Math.sin(t * 14) * 0.14;
    flameRef.current.scale.x = 1 + Math.cos(t * 11) * 0.08;
    flameRef.current.rotation.z = Math.sin(t * 9) * 0.09;
  });

  if (!visible) return null;

  return (
    <group position={[-0.18, 0.05, -0.15]}>
      {/* Brass candle holder */}
      <mesh castShadow position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.042, 0.048, 0.04, 16]} />
        <meshStandardMaterial color="#d9a441" metalness={0.82} roughness={0.2} />
      </mesh>
      {/* Cream ribbed candle shaft */}
      <mesh castShadow position={[0, 0.22, 0]}>
        <cylinderGeometry args={[0.026, 0.028, 0.38, 16]} />
        <meshStandardMaterial color="#fff6df" roughness={0.4} />
      </mesh>
      {/* Dark wick */}
      <mesh position={[0, 0.42, 0]}>
        <cylinderGeometry args={[0.004, 0.004, 0.03, 6]} />
        <meshStandardMaterial color="#222419" />
      </mesh>
      {lit ? (
        <>
          <mesh ref={flameRef} position={[0, 0.47, 0]}>
            <coneGeometry args={[0.036, 0.11, 12]} />
            <meshStandardMaterial
              color="#ffb72b"
              emissive="#ff8c1a"
              emissiveIntensity={2.9}
              toneMapped={false}
            />
          </mesh>
          <pointLight position={[0, 0.52, 0]} intensity={1.7} distance={2.6} color="#ffb94d" />
        </>
      ) : null}
    </group>
  );
}

/**
 * Polished Steel & Walnut Patisserie Cake Knife that animates cleanly down
 * along the cut plane whenever the user triggers "Cut Cake Slice".
 */
function CakeKnife3D({
  cutTrigger,
  isCut,
}: {
  cutTrigger: number;
  isCut: boolean;
}) {
  const knifeRef = useRef<THREE.Group>(null);
  const trackerRef = useRef({ lastTrigger: cutTrigger, age: 10 });

  useFrame((_, delta) => {
    const tr = trackerRef.current;
    if (tr.lastTrigger !== cutTrigger) {
      tr.lastTrigger = cutTrigger;
      tr.age = isCut ? 0 : 10;
    } else {
      tr.age = Math.min(tr.age + delta, 10);
    }

    if (!knifeRef.current) return;
    const t = tr.age;
    // Active during t ∈ [0, 1.35]
    if (!isCut || t > 1.35) {
      knifeRef.current.visible = false;
      return;
    }
    knifeRef.current.visible = true;

    const dirX = Math.sin(SLICE_MID);
    const dirZ = Math.cos(SLICE_MID);

    if (t < 0.35) {
      // Hover down into position above the cake crown
      const p = t / 0.35;
      const eased = 1 - Math.pow(1 - p, 3);
      knifeRef.current.position.set(dirX * 0.55, THREE.MathUtils.lerp(2.2, 0.72, eased), dirZ * 0.55);
      knifeRef.current.rotation.set(0, SLICE_MID - Math.PI / 2, THREE.MathUtils.lerp(-0.4, -0.14, eased));
    } else if (t < 0.85) {
      // Slice cleanly vertically downward through sponge & filling!
      const p = (t - 0.35) / 0.5;
      const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      knifeRef.current.position.set(dirX * 0.55, THREE.MathUtils.lerp(0.72, -0.58, eased), dirZ * 0.55);
      knifeRef.current.rotation.set(0, SLICE_MID - Math.PI / 2, THREE.MathUtils.lerp(-0.14, 0.04, eased));
    } else {
      // Glide cleanly back up & away while the slice pulls forward
      const p = (t - 0.85) / 0.5;
      const eased = p * p;
      knifeRef.current.position.set(
        dirX * (0.55 + eased * 1.1),
        THREE.MathUtils.lerp(-0.58, 1.8, eased),
        dirZ * (0.55 + eased * 1.1)
      );
      knifeRef.current.rotation.set(0, SLICE_MID - Math.PI / 2, 0.25 * eased);
    }
  });

  return (
    <group ref={knifeRef} visible={false}>
      {/* Polished stainless steel blade */}
      <mesh castShadow position={[-0.25, 0, 0]}>
        <boxGeometry args={[1.45, 0.14, 0.016]} />
        <meshStandardMaterial color="#e8ecee" metalness={0.92} roughness={0.14} />
      </mesh>
      {/* Brass bolster ring */}
      <mesh position={[0.52, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.045, 0.045, 0.07, 14]} />
        <meshStandardMaterial color="#d4a64a" metalness={0.85} roughness={0.2} />
      </mesh>
      {/* Turned walnut wood handle */}
      <mesh castShadow position={[0.88, 0.01, 0]} rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.052, 0.55, 8, 14]} />
        <meshStandardMaterial color="#4b3222" roughness={0.4} />
      </mesh>
    </group>
  );
}

/**
 * Celebratory golden sugar-crumb burst triggered when a slice is freshly cut.
 */
function SliceCelebrationBurst({
  cutTrigger,
  isCut,
  accentColor,
}: {
  cutTrigger: number;
  isCut: boolean;
  accentColor: string;
}) {
  const burstRef = useRef<THREE.Group>(null);
  const trackerRef = useRef({ lastTrigger: cutTrigger, age: 10 });

  const seeds = useMemo(() => {
    return Array.from({ length: 16 }).map((_, i) => {
      const a = (i / 16) * TAU;
      return {
        vx: Math.sin(a) * (0.8 + (i % 3) * 0.35),
        vy: 0.9 + (i % 4) * 0.3,
        vz: Math.cos(a) * (0.8 + (i % 3) * 0.35),
        color: i % 2 === 0 ? "#e7bd58" : accentColor,
      };
    });
  }, [accentColor]);

  useFrame((_, delta) => {
    const tr = trackerRef.current;
    if (tr.lastTrigger !== cutTrigger) {
      tr.lastTrigger = cutTrigger;
      tr.age = isCut ? 0 : 10;
    } else {
      tr.age = Math.min(tr.age + delta, 10);
    }

    if (!burstRef.current) return;
    // Start burst right after knife finish (0.7s -> 1.8s)
    const activeTime = tr.age - 0.72;
    if (!isCut || activeTime < 0 || activeTime > 1.2) {
      burstRef.current.visible = false;
      return;
    }

    burstRef.current.visible = true;
    const p = activeTime / 1.2;
    burstRef.current.children.forEach((child, idx) => {
      const s = seeds[idx];
      if (!s) return;
      child.position.set(
        s.vx * p,
        0.15 + s.vy * p - 1.2 * p * p,
        s.vz * p
      );
      child.rotation.x += delta * 6;
      child.rotation.y += delta * 5;
      child.scale.setScalar(Math.max(0.01, 1 - p));
    });
  });

  return (
    <group ref={burstRef} visible={false} position={[Math.sin(SLICE_MID) * 0.55, 0.25, Math.cos(SLICE_MID) * 0.55]}>
      {seeds.map((s, idx) => (
        <mesh key={idx}>
          <octahedronGeometry args={[0.042, 0]} />
          <meshStandardMaterial color={s.color} metalness={0.5} roughness={0.25} />
        </mesh>
      ))}
    </group>
  );
}

export function CakeAssemblyModel({
  flavor,
  tiers = 1,
  tallSingle = false,
  exploded = false,
  showGlassCase = true,
  showCandle = true,
  candleLit = true,
  isCut = false,
  cutTrigger = 0,
  autoRotate = true,
  assembleTrigger = 0,
  zoomScale = 1,
  isBotanicalFinish = false,
}: CakeAssemblyProps) {
  const rootRef = useRef<THREE.Group>(null);
  const standRef = useRef<THREE.Group>(null);
  const bottomSpongeRef = useRef<THREE.Group>(null);
  const fillingRef = useRef<THREE.Group>(null);
  const topSpongeRef = useRef<THREE.Group>(null);
  const glazeRef = useRef<THREE.Group>(null);
  const crownRef = useRef<THREE.Group>(null);
  const tier2Ref = useRef<THREE.Group>(null);
  const tier3Ref = useRef<THREE.Group>(null);
  const domeRef = useRef<THREE.Group>(null);
  const sliceGroupRef = useRef<THREE.Group>(null);

  const animStateRef = useRef({
    lastTrigger: assembleTrigger,
    elapsedSinceBuild: 99,
    lastCutTrigger: cutTrigger,
    elapsedSinceCut: 99,
    explodeAmount: exploded ? 1 : 0,
    sliceSlide: 0,
  });

  const hScale = tallSingle && tiers === 1 ? 1.25 : 1;

  useFrame((state, delta) => {
    const a = animStateRef.current;

    if (a.lastTrigger !== assembleTrigger) {
      a.lastTrigger = assembleTrigger;
      a.elapsedSinceBuild = 0;
    } else {
      a.elapsedSinceBuild = Math.min(a.elapsedSinceBuild + delta, 10);
    }

    if (a.lastCutTrigger !== cutTrigger) {
      a.lastCutTrigger = cutTrigger;
      a.elapsedSinceCut = 0;
    } else {
      a.elapsedSinceCut = Math.min(a.elapsedSinceCut + delta, 10);
    }

    const smooth = 1 - Math.exp(-7 * delta);
    a.explodeAmount = THREE.MathUtils.lerp(a.explodeAmount, exploded ? 1 : 0, smooth);
    const ex = a.explodeAmount;

    // Gentle turntable rotation + magnetic mouse tilt
    if (rootRef.current) {
      if (autoRotate && !isCut) {
        rootRef.current.rotation.y += delta * 0.34;
      } else if (isCut) {
        // Orient gently toward front-right so user enjoys the cut cross-section!
        const nearestTurn = Math.round(rootRef.current.rotation.y / TAU) * TAU;
        rootRef.current.rotation.y = THREE.MathUtils.lerp(
          rootRef.current.rotation.y,
          nearestTurn,
          smooth * 0.7
        );
      }

      const targetTiltX = state.pointer.y * 0.06;
      const targetTiltZ = -state.pointer.x * 0.06;
      rootRef.current.rotation.x = THREE.MathUtils.lerp(rootRef.current.rotation.x, targetTiltX, smooth);
      rootRef.current.rotation.z = THREE.MathUtils.lerp(rootRef.current.rotation.z, targetTiltZ, smooth);
      rootRef.current.scale.setScalar(
        THREE.MathUtils.lerp(rootRef.current.scale.x, zoomScale, smooth)
      );
    }

    const dropOffset = (delay: number) => {
      const p = THREE.MathUtils.clamp((a.elapsedSinceBuild - delay) / 0.52, 0, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      return (1 - eased) * 2.6;
    };

    if (standRef.current) {
      standRef.current.position.y = THREE.MathUtils.lerp(
        standRef.current.position.y,
        -0.95 - ex * 0.32 + dropOffset(0),
        smooth
      );
    }
    if (bottomSpongeRef.current) {
      bottomSpongeRef.current.position.y = THREE.MathUtils.lerp(
        bottomSpongeRef.current.position.y,
        -0.55 + ex * -0.02 + dropOffset(0.16),
        smooth
      );
      bottomSpongeRef.current.rotation.y = THREE.MathUtils.lerp(
        bottomSpongeRef.current.rotation.y,
        ex * 0.25,
        smooth
      );
    }
    if (fillingRef.current) {
      fillingRef.current.position.y = THREE.MathUtils.lerp(
        fillingRef.current.position.y,
        -0.31 + (hScale - 1) * 0.08 + ex * 0.3 + dropOffset(0.32),
        smooth
      );
    }
    if (topSpongeRef.current) {
      topSpongeRef.current.position.y = THREE.MathUtils.lerp(
        topSpongeRef.current.position.y,
        -0.06 + (hScale - 1) * 0.2 + ex * 0.62 + dropOffset(0.48),
        smooth
      );
      topSpongeRef.current.rotation.y = THREE.MathUtils.lerp(
        topSpongeRef.current.rotation.y,
        -ex * 0.22,
        smooth
      );
    }
    if (glazeRef.current) {
      glazeRef.current.position.y = THREE.MathUtils.lerp(
        glazeRef.current.position.y,
        0.13 + (hScale - 1) * 0.28 + ex * 0.94 + dropOffset(0.64),
        smooth
      );
    }

    const tier2BaseY = 0.45 + (hScale - 1) * 0.28 + ex * 1.25 + dropOffset(0.76);
    if (tier2Ref.current) {
      tier2Ref.current.position.y = THREE.MathUtils.lerp(tier2Ref.current.position.y, tier2BaseY, smooth);
    }
    const tier3BaseY = tier2BaseY + 0.56 + ex * 0.32 + dropOffset(0.88);
    if (tier3Ref.current) {
      tier3Ref.current.position.y = THREE.MathUtils.lerp(tier3Ref.current.position.y, tier3BaseY, smooth);
    }

    const crownTargetY =
      tiers === 3
        ? tier3BaseY + 0.25
        : tiers === 2
        ? tier2BaseY + 0.29
        : 0.16 + (hScale - 1) * 0.28 + ex * 1.24 + dropOffset(0.8);

    if (crownRef.current) {
      crownRef.current.position.y = THREE.MathUtils.lerp(
        crownRef.current.position.y,
        crownTargetY,
        smooth
      );
    }

    if (domeRef.current) {
      const domeLiftForCut = isCut ? 3.2 : 0;
      const domeOffset = showGlassCase ? domeLiftForCut : 3.2;
      const domeExplodeOffset = ex * 1.65;
      domeRef.current.position.y = THREE.MathUtils.lerp(
        domeRef.current.position.y,
        -0.78 + domeOffset + domeExplodeOffset + dropOffset(1.0),
        smooth
      );
    }

    // Slide out the cut cake wedge cleanly AFTER the knife finishes slicing (0.72s delay)
    const sliceReady = isCut && (a.elapsedSinceCut > 0.72 || cutTrigger === 0);
    a.sliceSlide = THREE.MathUtils.lerp(a.sliceSlide, sliceReady ? 1 : 0, smooth * 0.85);
    if (sliceGroupRef.current) {
      const pull = a.sliceSlide * 0.96;
      sliceGroupRef.current.position.x = Math.sin(SLICE_MID) * pull;
      sliceGroupRef.current.position.z = Math.cos(SLICE_MID) * pull;
      sliceGroupRef.current.position.y = Math.sin(a.sliceSlide * Math.PI) * 0.14 + a.sliceSlide * 0.06;
      sliceGroupRef.current.rotation.y = 0;
    }
  });

  const baseRadius = tiers === 3 ? 1.22 : tiers === 2 ? 1.12 : 1.05;
  const spongeHeight = tallSingle && tiers === 1 ? 0.34 : 0.26;
  const crownRadius = tiers === 3 ? 0.62 : tiers === 2 ? 0.78 : baseRadius;

  const canSlice = tiers === 1 && !exploded;
  const activeCut = isCut && canSlice;
  const bodyMode = activeCut ? "body" : "whole";

  return (
    <group ref={rootRef}>
      {/* 1. TURNED WALNUT CAKE STAND & CREAM/SAGE CAKE BOARD */}
      <group ref={standRef} position={[0, -0.95, 0]}>
        <mesh castShadow receiveShadow position={[0, -0.22, 0]}>
          <cylinderGeometry args={[0.24, 0.52, 0.38, 36]} />
          <meshStandardMaterial color="#4b3222" roughness={0.38} metalness={0.08} />
        </mesh>
        <mesh position={[0, -0.04, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.31, 0.025, 12, 32]} />
          <meshStandardMaterial color="#d4a64a" metalness={0.78} roughness={0.24} />
        </mesh>
        <mesh castShadow receiveShadow position={[0, 0.04, 0]}>
          <cylinderGeometry args={[baseRadius + 0.36, baseRadius + 0.3, 0.1, 48]} />
          <meshStandardMaterial color="#68452e" roughness={0.36} metalness={0.05} />
        </mesh>
        <mesh receiveShadow position={[0, 0.11, 0]}>
          <cylinderGeometry args={[baseRadius + 0.2, baseRadius + 0.2, 0.035, 48]} />
          <meshStandardMaterial color="#f4fade" roughness={0.25} metalness={0.12} />
        </mesh>
      </group>

      {/* 2. BOTTOM 100% PURE VEG SPONGE + FLUTED SHELL COLLAR */}
      <group ref={bottomSpongeRef} position={[0, -0.55, 0]}>
        <SectorLayer
          radius={baseRadius}
          height={spongeHeight}
          outerColor={exploded ? flavor.spongeColor : flavor.frostingColor}
          innerColor={flavor.spongeColor}
          mode={bodyMode}
          roughness={exploded ? 0.85 : 0.48}
        />
        <ShellPipingRing
          radius={baseRadius + 0.02}
          y={-spongeHeight / 2 + 0.02}
          color={flavor.frostingColor}
          mode={bodyMode}
        />
      </group>

      {/* 3. HOUSE-SIMMERED FILLING & GANACHE HEART */}
      <group ref={fillingRef} position={[0, -0.31, 0]}>
        <SectorLayer
          radius={baseRadius - 0.01}
          height={0.12}
          outerColor={flavor.fillingColor}
          innerColor={flavor.fillingColor}
          mode={bodyMode}
          roughness={0.32}
        />
      </group>

      {/* 4. TOP SPONGE LAYER */}
      <group ref={topSpongeRef} position={[0, -0.06, 0]}>
        <SectorLayer
          radius={baseRadius}
          height={spongeHeight}
          outerColor={exploded ? flavor.spongeColor : flavor.frostingColor}
          innerColor={flavor.spongeColor}
          mode={bodyMode}
          roughness={exploded ? 0.85 : 0.45}
        />
      </group>

      {/* 5. SILKY DRIP GLAZE & BUTTERCREAM COAT */}
      <group ref={glazeRef} position={[0, 0.13, 0]}>
        <DripRing
          radius={baseRadius + 0.015}
          y={0}
          color={flavor.dripColor}
          innerColor={flavor.dripColor}
          mode={bodyMode}
          count={18}
        />
      </group>

      {/* 6. OPTIONAL TIER 2 */}
      {tiers >= 2 ? (
        <group ref={tier2Ref} position={[0, 0.45, 0]}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.78, 0.78, 0.52, 48]} />
            <meshStandardMaterial color={flavor.frostingColor} roughness={0.46} />
          </mesh>
          <ShellPipingRing
            radius={0.79}
            y={-0.24}
            color={flavor.frostingColor}
            mode="whole"
            count={18}
          />
          <DripRing
            radius={0.785}
            y={0.25}
            color={flavor.dripColor}
            innerColor={flavor.dripColor}
            mode="whole"
            count={14}
          />
        </group>
      ) : null}

      {/* 7. OPTIONAL GRAND WEDDING TIER 3 */}
      {tiers === 3 ? (
        <group ref={tier3Ref} position={[0, 1.02, 0]}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.56, 0.56, 0.44, 48]} />
            <meshStandardMaterial color={flavor.frostingColor} roughness={0.46} />
          </mesh>
          <ShellPipingRing
            radius={0.57}
            y={-0.2}
            color={flavor.frostingColor}
            mode="whole"
            count={14}
          />
          <DripRing
            radius={0.565}
            y={0.21}
            color={flavor.dripColor}
            innerColor={flavor.dripColor}
            mode="whole"
            count={10}
          />
        </group>
      ) : null}

      {/* 8. PIPED CROWN, TOPPINGS & CELEBRATION CANDLE */}
      <group ref={crownRef} position={[0, 0.16, 0]}>
        <CrownToppings
          style={flavor.toppingStyle}
          radius={crownRadius}
          frostingColor={flavor.frostingColor}
          dripColor={flavor.dripColor}
          accentColor={flavor.accentColor}
          isBotanical={isBotanicalFinish}
          mode={bodyMode}
        />
        <CelebrationCandle visible={showCandle} lit={candleLit} />
      </group>

      {/* 9. INTERACTIVE SLIDING CAKE SLICE WEDGE (WHEN CUT) */}
      {activeCut ? (
        <group ref={sliceGroupRef}>
          <group position={[0, -0.55, 0]}>
            <SectorLayer
              radius={baseRadius}
              height={spongeHeight}
              outerColor={flavor.frostingColor}
              innerColor={flavor.spongeColor}
              mode="slice"
              roughness={0.48}
            />
            <ShellPipingRing
              radius={baseRadius + 0.02}
              y={-spongeHeight / 2 + 0.02}
              color={flavor.frostingColor}
              mode="slice"
            />
          </group>
          <group position={[0, -0.31 + (hScale - 1) * 0.08, 0]}>
            <SectorLayer
              radius={baseRadius - 0.01}
              height={0.12}
              outerColor={flavor.fillingColor}
              innerColor={flavor.fillingColor}
              mode="slice"
              roughness={0.32}
            />
          </group>
          <group position={[0, -0.06 + (hScale - 1) * 0.2, 0]}>
            <SectorLayer
              radius={baseRadius}
              height={spongeHeight}
              outerColor={flavor.frostingColor}
              innerColor={flavor.spongeColor}
              mode="slice"
              roughness={0.45}
            />
          </group>
          <DripRing
            radius={baseRadius + 0.015}
            y={0.13 + (hScale - 1) * 0.28}
            color={flavor.dripColor}
            innerColor={flavor.dripColor}
            mode="slice"
            count={18}
          />
          <group position={[0, 0.16 + (hScale - 1) * 0.28, 0]}>
            <CrownToppings
              style={flavor.toppingStyle}
              radius={baseRadius}
              frostingColor={flavor.frostingColor}
              dripColor={flavor.dripColor}
              accentColor={flavor.accentColor}
              isBotanical={isBotanicalFinish}
              mode="slice"
            />
          </group>
        </group>
      ) : null}

      {/* 10. ANIMATED KNIFE & GOLDEN CELEBRATION BURST */}
      <CakeKnife3D cutTrigger={cutTrigger} isCut={activeCut} />
      <SliceCelebrationBurst
        cutTrigger={cutTrigger}
        isCut={activeCut}
        accentColor={flavor.accentColor}
      />

      {/* 11. CRYSTAL GLASS PATISSERIE DISPLAY CASE (CLOCHE DOME) */}
      <group ref={domeRef} position={[0, -0.78, 0]} visible={showGlassCase && !isCut}>
        <mesh position={[0, 0.62, 0]}>
          <cylinderGeometry args={[baseRadius + 0.26, baseRadius + 0.28, 1.15, 48, 1, true]} />
          <meshPhysicalMaterial
            color="#f8fcf2"
            transparent
            opacity={0.18}
            roughness={0.04}
            metalness={0.08}
            clearcoat={1}
            clearcoatRoughness={0.03}
            reflectivity={0.95}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh position={[0, 1.19, 0]} scale={[1, 0.56, 1]}>
          <sphereGeometry args={[baseRadius + 0.26, 48, 24, 0, TAU, 0, Math.PI / 2]} />
          <meshPhysicalMaterial
            color="#f8fcf2"
            transparent
            opacity={0.2}
            roughness={0.04}
            metalness={0.08}
            clearcoat={1}
            clearcoatRoughness={0.03}
            reflectivity={0.95}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh position={[0, 0.04, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[baseRadius + 0.28, 0.014, 12, 48]} />
          <meshStandardMaterial color="#d4a64a" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh castShadow position={[0, 1.19 + (baseRadius + 0.26) * 0.56 + 0.05, 0]}>
          <sphereGeometry args={[0.1, 20, 20]} />
          <meshStandardMaterial color="#d4a64a" metalness={0.82} roughness={0.18} />
        </mesh>
      </group>
    </group>
  );
}
