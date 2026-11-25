"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Gift, Sparkles, ArrowRight } from "lucide-react";
import { StudioStage3D, WebGLErrorBoundary } from "@/components/three/StudioStage3D";
import { CameraRig3D } from "@/components/three/CameraRig3D";
import { PureVegBadge } from "@/components/ui/PureVegBadge";

function FestiveGiftBoxMesh({ isOpen }: { isOpen: boolean }) {
  const trunkRef = useRef<THREE.Group>(null);
  const lidRef = useRef<THREE.Group>(null);
  const treatsRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const smooth = 1 - Math.exp(-6 * delta);
    if (trunkRef.current) {
      trunkRef.current.rotation.y = THREE.MathUtils.lerp(
        trunkRef.current.rotation.y,
        state.pointer.x * 0.35 + Math.sin(state.clock.elapsedTime * 0.4) * 0.12,
        smooth
      );
    }
    if (lidRef.current) {
      // Hinged opening along back edge
      const targetAngle = isOpen ? -Math.PI * 0.62 : 0;
      const targetLift = isOpen ? 0.12 : 0;
      lidRef.current.rotation.x = THREE.MathUtils.lerp(
        lidRef.current.rotation.x,
        targetAngle,
        smooth
      );
      lidRef.current.position.y = THREE.MathUtils.lerp(
        lidRef.current.position.y,
        0.48 + targetLift,
        smooth
      );
    }
    if (treatsRef.current) {
      const floatY = isOpen ? 0.42 + Math.sin(state.clock.elapsedTime * 2) * 0.05 : 0.12;
      treatsRef.current.position.y = THREE.MathUtils.lerp(
        treatsRef.current.position.y,
        floatY,
        smooth
      );
      treatsRef.current.rotation.y += isOpen ? delta * 0.55 : 0;
    }
  });

  return (
    <group ref={trunkRef} position={[0, -0.35, 0]}>
      {/* Eco-Kraft Bakery Gift Box Base */}
      <mesh castShadow receiveShadow position={[0, 0.22, 0]}>
        <boxGeometry args={[1.9, 0.52, 1.45]} />
        <meshStandardMaterial color="#d8c39e" roughness={0.78} />
      </mesh>
      {/* Sage botanical ribbon wrap on box */}
      <mesh position={[0, 0.22, 0]}>
        <boxGeometry args={[0.18, 0.53, 1.47]} />
        <meshStandardMaterial color="#4c6b40" roughness={0.45} />
      </mesh>
      <mesh position={[0, 0.22, 0]}>
        <boxGeometry args={[1.92, 0.53, 0.18]} />
        <meshStandardMaterial color="#4c6b40" roughness={0.45} />
      </mesh>

      {/* Levitating 100% Pure Veg Goodies inside */}
      <group ref={treatsRef} position={[0, 0.12, 0]}>
        {/* Belgian Brownie Squares */}
        <mesh castShadow position={[-0.45, 0.06, 0.12]} rotation={[0.08, 0.2, 0]}>
          <boxGeometry args={[0.45, 0.22, 0.45]} />
          <meshStandardMaterial color="#381c14" roughness={0.55} />
        </mesh>
        {/* Walnut chunks on brownie */}
        <mesh castShadow position={[-0.45, 0.2, 0.12]}>
          <dodecahedronGeometry args={[0.07, 0]} />
          <meshStandardMaterial color="#9e6d43" roughness={0.6} />
        </mesh>

        {/* Organic Pistachio Rose Tea Loaf */}
        <mesh castShadow position={[0.42, 0.1, -0.08]} rotation={[0, -0.15, 0]}>
          <boxGeometry args={[0.62, 0.3, 0.46]} />
          <meshStandardMaterial color="#d9a85c" roughness={0.72} />
        </mesh>
        <mesh castShadow position={[0.42, 0.27, -0.08]}>
          <boxGeometry args={[0.56, 0.05, 0.38]} />
          <meshStandardMaterial color="#7da252" roughness={0.5} />
        </mesh>

        {/* Chocochip Oat Cookie */}
        <mesh castShadow position={[0.02, 0.02, 0.4]} rotation={[0.15, 0, 0]}>
          <cylinderGeometry args={[0.24, 0.25, 0.08, 20]} />
          <meshStandardMaterial color="#c98b49" roughness={0.72} />
        </mesh>
      </group>

      {/* Hinged Lid (pivot around back edge z = -0.74) */}
      <group ref={lidRef} position={[0, 0.48, -0.74]}>
        <group position={[0, 0.08, 0.74]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.98, 0.16, 1.52]} />
            <meshStandardMaterial color="#f4fade" roughness={0.58} />
          </mesh>
          {/* Gold-Herb Cross Ribbon & Bow */}
          <mesh position={[0, 0.005, 0]}>
            <boxGeometry args={[0.19, 0.17, 1.54]} />
            <meshStandardMaterial color="#4c6b40" roughness={0.42} />
          </mesh>
          <mesh position={[0, 0.005, 0]}>
            <boxGeometry args={[2.0, 0.17, 0.19]} />
            <meshStandardMaterial color="#4c6b40" roughness={0.42} />
          </mesh>
          {/* Bow Loops */}
          <mesh castShadow position={[-0.14, 0.16, 0]} rotation={[0.2, 0, 0.45]}>
            <torusGeometry args={[0.12, 0.032, 10, 20]} />
            <meshStandardMaterial color="#d4a64a" metalness={0.45} roughness={0.3} />
          </mesh>
          <mesh castShadow position={[0.14, 0.16, 0]} rotation={[0.2, 0, -0.45]}>
            <torusGeometry args={[0.12, 0.032, 10, 20]} />
            <meshStandardMaterial color="#d4a64a" metalness={0.45} roughness={0.3} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

export function GiftTrunk3D() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="overflow-hidden rounded-[2rem] border border-border-strong bg-surface shadow-sm">
      <div className="grid items-center lg:grid-cols-12">
        <div className="relative bg-parchment-glow lg:col-span-6 border-b border-border lg:border-b-0 lg:border-r">
          <div className="pointer-events-none absolute left-4 top-4 z-10">
            <PureVegBadge label="3D Gift Hamper Preview" compact />
          </div>

          <div className="h-[300px] w-full sm:h-[340px]">
            <WebGLErrorBoundary
              fallback={
                <div className="flex h-full items-center justify-center p-6 text-center text-sm text-ink-muted">
                  Interactive 3D Festive Gift Trunk
                </div>
              }
            >
              <Canvas
                shadows
                dpr={[1, 1.5]}
                camera={{ position: [2.75, 2.0, 3.25], fov: 39 }}
                gl={{
                  antialias: true,
                  toneMapping: THREE.ACESFilmicToneMapping,
                  toneMappingExposure: 1.08,
                }}
              >
                <StudioStage3D shadowY={-0.68} sparkleColor="#d4a64a" />
                <FestiveGiftBoxMesh isOpen={isOpen} />
                <CameraRig3D preset="studio" presetVersion={0} maxPolarAngle={Math.PI / 2} />
              </Canvas>
            </WebGLErrorBoundary>
          </div>

          <div className="flex items-center justify-between border-t border-border bg-surface/90 px-4 py-2.5 text-xs">
            <span className="text-ink-muted">Drag to inspect 360°</span>
            <button
              type="button"
              onClick={() => setIsOpen((o) => !o)}
              className="btn-shine inline-flex items-center gap-1.5 rounded-full bg-herb px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-herb-hover cursor-pointer"
            >
              <Gift className="h-3.5 w-3.5" />
              <span>{isOpen ? "Close Gift Trunk" : "Open Gift Trunk"}</span>
            </button>
          </div>
        </div>

        <div className="p-6 sm:p-8 lg:col-span-6 lg:p-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-herb">
            <Sparkles className="h-3.5 w-3.5 text-saffron" />
            <span>Handcrafted Eco-Kraft Trunks</span>
          </div>
          <h3 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            100% Pure Veg Festive &amp; Family Gift Boxes
          </h3>
          <p className="text-sm leading-relaxed text-ink-olive sm:text-base">
            Packaged in biodegradable kraft boxes tied with botanical ribbon—each trunk brings
            together Manu&apos;s Belgian brownies, wholewheat pistachio rose tea cakes, dark
            chocochip oat cookies, and organic jaggery muffins starting from <strong>₹560</strong>.
          </p>
          <div className="pt-1">
            <Link
              href="/menu/?category=hampers"
              className="btn-shine inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-logo-tint transition hover:bg-herb hover:text-white"
            >
              <span>Explore Gift Hampers</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
