"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const TAU = Math.PI * 2;

/**
 * Enhanced 3D Patisserie Trio Platter for the Homepage:
 * - Sculpted 7-segment layered crescent Butter Croissant
 * - Belgian Dark Chocolate Truffle Cube with glossy ganache + choco curl + hazelnut
 * - Fluted 28-ridge Passionfruit & Berry Tartlet
 */
export function PatisserieTrioModel() {
  const boardRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState<"croissant" | "truffle" | "tart" | null>(null);
  const [bounce, setBounce] = useState<{ item: string; at: number } | null>(null);

  useEffect(() => {
    return () => {
      document.body.style.cursor = "auto";
    };
  }, []);

  const croissantSegments = useMemo(() => {
    return [-3, -2, -1, 0, 1, 2, 3].map((idx) => {
      const t = idx / 3;
      const scale = 1 - Math.abs(t) * 0.44;
      const angle = t * 0.72;
      return {
        x: Math.sin(angle) * 0.44,
        z: (1 - Math.cos(angle)) * 0.34,
        rotY: -angle,
        scale,
        idx,
      };
    });
  }, []);

  useFrame((state, delta) => {
    if (!boardRef.current) return;
    const smooth = 1 - Math.exp(-5 * delta);
    const targetRotY = state.pointer.x * 0.38 + Math.sin(state.clock.elapsedTime * 0.42) * 0.14;
    const targetRotX = 0.08 - state.pointer.y * 0.14;
    boardRef.current.rotation.y = THREE.MathUtils.lerp(
      boardRef.current.rotation.y,
      targetRotY,
      smooth
    );
    boardRef.current.rotation.x = THREE.MathUtils.lerp(
      boardRef.current.rotation.x,
      targetRotX,
      smooth
    );
  });

  const triggerBounce = (item: string) => {
    setBounce({ item, at: performance.now() });
  };

  return (
    <group ref={boardRef} position={[0, -0.35, 0]}>
      {/* Warm Natural Stoneware / Walnut Serving Board + Gold Rim */}
      <mesh castShadow receiveShadow position={[0, -0.08, 0]}>
        <cylinderGeometry args={[1.95, 1.88, 0.14, 56]} />
        <meshStandardMaterial color="#875d3c" roughness={0.42} metalness={0.05} />
      </mesh>
      <mesh receiveShadow position={[0, 0.0, 0]}>
        <cylinderGeometry args={[1.82, 1.82, 0.03, 56]} />
        <meshStandardMaterial color="#f4fade" roughness={0.28} />
      </mesh>
      <mesh position={[0, 0.015, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.82, 0.012, 8, 56]} />
        <meshStandardMaterial color="#d4a64a" metalness={0.8} roughness={0.22} />
      </mesh>

      {/* Sage & rose botanical garnish sprigs */}
      {[0.4, 2.5, 4.4].map((angle, i) => (
        <group
          key={i}
          position={[Math.cos(angle) * 1.46, 0.04, Math.sin(angle) * 1.46]}
          rotation={[0.2, angle, 0.15]}
        >
          <mesh>
            <boxGeometry args={[0.17, 0.014, 0.072]} />
            <meshStandardMaterial color="#4c6b40" roughness={0.52} />
          </mesh>
          <mesh position={[0.07, 0.02, 0]}>
            <sphereGeometry args={[0.025, 8, 8]} />
            <meshStandardMaterial color="#d95772" roughness={0.4} />
          </mesh>
        </group>
      ))}

      {/* 1. BELGIAN DARK CHOCOLATE TRUFFLE PASTRY CUBE (CENTER-BACK) */}
      <InteractiveTreatGroup
        position={[0, 0.06, -0.58]}
        active={hovered === "truffle"}
        bouncedAt={bounce?.item === "truffle" ? bounce.at : 0}
        onPointerOver={() => setHovered("truffle")}
        onPointerOut={() => setHovered(null)}
        onClick={() => triggerBounce("truffle")}
      >
        <mesh castShadow receiveShadow position={[0, 0.25, 0]}>
          <boxGeometry args={[0.72, 0.5, 0.72]} />
          <meshStandardMaterial color="#3c1f16" roughness={0.48} />
        </mesh>
        {/* Two-layer truffle filling stripes */}
        <mesh position={[0, 0.17, 0]}>
          <boxGeometry args={[0.732, 0.07, 0.732]} />
          <meshStandardMaterial color="#1f0d08" roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.34, 0]}>
          <boxGeometry args={[0.732, 0.07, 0.732]} />
          <meshStandardMaterial color="#1f0d08" roughness={0.2} />
        </mesh>
        {/* Mirror chocolate glaze top */}
        <mesh castShadow position={[0, 0.51, 0]}>
          <boxGeometry args={[0.74, 0.05, 0.74]} />
          <meshPhysicalMaterial
            color="#24100a"
            roughness={0.14}
            clearcoat={0.9}
            clearcoatRoughness={0.1}
          />
        </mesh>
        {/* Cocoa-dusted spherical truffle + chocolate curl + gold leaf */}
        <mesh castShadow position={[0, 0.65, 0]}>
          <sphereGeometry args={[0.145, 20, 20]} />
          <meshStandardMaterial color="#462519" roughness={0.78} />
        </mesh>
        <mesh castShadow position={[-0.12, 0.62, 0.08]} rotation={[0.5, 0.6, 0.2]}>
          <torusGeometry args={[0.085, 0.018, 8, 18, Math.PI * 1.2]} />
          <meshPhysicalMaterial color="#1d0b06" roughness={0.2} clearcoat={0.85} />
        </mesh>
        <mesh position={[0.05, 0.77, 0.04]} rotation={[0.4, 0.3, 0]}>
          <boxGeometry args={[0.075, 0.01, 0.075]} />
          <meshStandardMaterial color="#e0b248" metalness={0.85} roughness={0.18} />
        </mesh>
      </InteractiveTreatGroup>

      {/* 2. SCULPTED 7-RIDGE BUTTER CROISSANT (LEFT-FRONT) */}
      <InteractiveTreatGroup
        position={[-0.78, 0.15, 0.52]}
        rotation={[0, 0.45, 0]}
        active={hovered === "croissant"}
        bouncedAt={bounce?.item === "croissant" ? bounce.at : 0}
        onPointerOver={() => setHovered("croissant")}
        onPointerOut={() => setHovered(null)}
        onClick={() => triggerBounce("croissant")}
      >
        {croissantSegments.map((seg) => (
          <group
            key={seg.idx}
            position={[seg.x, 0.06, seg.z]}
            rotation={[0, seg.rotY, Math.PI / 2]}
            scale={[seg.scale, seg.scale * 1.15, seg.scale]}
          >
            <mesh castShadow receiveShadow>
              <capsuleGeometry args={[0.17, 0.1, 8, 16]} />
              <meshStandardMaterial
                color={seg.idx % 2 === 0 ? "#d79140" : "#bc7329"}
                roughness={0.4}
              />
            </mesh>
            {/* Golden butter fold highlight ridge */}
            <mesh position={[0.02, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
              <torusGeometry args={[0.165, 0.018, 6, 16]} />
              <meshStandardMaterial color="#a65f1d" roughness={0.5} />
            </mesh>
          </group>
        ))}
      </InteractiveTreatGroup>

      {/* 3. FLUTED PASSIONFRUIT & BERRY TARTLET (RIGHT-FRONT) */}
      <InteractiveTreatGroup
        position={[0.8, 0.08, 0.48]}
        active={hovered === "tart"}
        bouncedAt={bounce?.item === "tart" ? bounce.at : 0}
        onPointerOver={() => setHovered("tart")}
        onPointerOut={() => setHovered(null)}
        onClick={() => triggerBounce("tart")}
      >
        {/* Fluted golden almond shortcrust shell */}
        <mesh castShadow receiveShadow position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.45, 0.36, 0.22, 16]} />
          <meshStandardMaterial color="#d8a866" roughness={0.6} />
        </mesh>
        {/* Glossy mango passionfruit curd center */}
        <mesh position={[0, 0.205, 0]}>
          <cylinderGeometry args={[0.38, 0.38, 0.04, 32]} />
          <meshPhysicalMaterial
            color="#ebaa1c"
            roughness={0.14}
            clearcoat={0.85}
            clearcoatRoughness={0.12}
          />
        </mesh>
        {/* Raspberry + blueberry + mint jewel crown */}
        {[
          [0.09, 0.29, 0.06, "#c7243a"],
          [-0.1, 0.28, 0.07, "#242c5c"],
          [-0.02, 0.29, -0.1, "#c7243a"],
          [0.06, 0.28, -0.11, "#242c5c"],
        ].map(([x, y, z, c], idx) => (
          <mesh key={idx} castShadow position={[x as number, y as number, z as number]}>
            <sphereGeometry args={[0.072, 14, 14]} />
            <meshStandardMaterial color={c as string} roughness={0.3} />
          </mesh>
        ))}
        <mesh position={[0.05, 0.35, -0.02]} rotation={[0.4, 0.2, 0.35]}>
          <boxGeometry args={[0.15, 0.01, 0.07]} />
          <meshStandardMaterial color="#4c6b40" roughness={0.5} />
        </mesh>
      </InteractiveTreatGroup>
    </group>
  );
}

function InteractiveTreatGroup({
  children,
  position,
  rotation = [0, 0, 0],
  active,
  bouncedAt,
  onPointerOver,
  onPointerOut,
  onClick,
}: {
  children: React.ReactNode;
  position: [number, number, number];
  rotation?: [number, number, number];
  active: boolean;
  bouncedAt: number;
  onPointerOver: () => void;
  onPointerOut: () => void;
  onClick: () => void;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!ref.current) return;
    const smooth = 1 - Math.exp(-9 * delta);
    const bounceAge = bouncedAt ? (performance.now() - bouncedAt) / 1000 : 10;
    const hop = bounceAge < 0.45 ? Math.sin((bounceAge / 0.45) * Math.PI) * 0.34 : 0;
    const targetY = position[1] + (active ? 0.12 : 0) + hop;
    const targetScale = active ? 1.07 : 1;

    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, targetY, smooth);
    ref.current.scale.setScalar(THREE.MathUtils.lerp(ref.current.scale.x, targetScale, smooth));
    if (active) {
      ref.current.rotation.y += delta * 0.75;
    } else {
      ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, rotation[1], smooth);
    }
    void TAU;
    void state;
  });

  return (
    <group
      ref={ref}
      position={position}
      rotation={rotation}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "pointer";
        onPointerOver();
      }}
      onPointerOut={() => {
        document.body.style.cursor = "auto";
        onPointerOut();
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {children}
    </group>
  );
}
