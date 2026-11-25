"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";

export type CameraPresetKey = "studio" | "top" | "layers";

const PRESET_VIEWS: Record<
  CameraPresetKey,
  { pos: [number, number, number]; target: [number, number, number] }
> = {
  studio: { pos: [3.25, 1.95, 3.6], target: [0, -0.05, 0] },
  top: { pos: [0.01, 4.15, 0.95], target: [0, 0.1, 0] },
  layers: { pos: [4.25, 0.4, 0.25], target: [0, 0.05, 0] },
};

export function CameraRig3D({
  preset,
  presetVersion,
  minPolarAngle = 0.25,
  maxPolarAngle = Math.PI / 1.9,
}: {
  preset: CameraPresetKey;
  presetVersion: number;
  minPolarAngle?: number;
  maxPolarAngle?: number;
}) {
  const { camera } = useThree();
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const animatingRef = useRef(false);
  const lastVersionRef = useRef(presetVersion);

  useEffect(() => {
    if (lastVersionRef.current !== presetVersion) {
      lastVersionRef.current = presetVersion;
      animatingRef.current = true;
    }
  }, [preset, presetVersion]);

  useFrame((_, delta) => {
    if (!animatingRef.current) return;
    const goal = PRESET_VIEWS[preset];
    const smooth = 1 - Math.exp(-6 * delta);
    const goalPos = new THREE.Vector3(...goal.pos);
    const goalTarget = new THREE.Vector3(...goal.target);

    camera.position.lerp(goalPos, smooth);
    if (controlsRef.current) {
      controlsRef.current.target.lerp(goalTarget, smooth);
      controlsRef.current.update();
    }

    if (camera.position.distanceTo(goalPos) < 0.04) {
      animatingRef.current = false;
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enablePan={false}
      enableZoom={false}
      enableDamping
      dampingFactor={0.07}
      rotateSpeed={0.8}
      minPolarAngle={minPolarAngle}
      maxPolarAngle={maxPolarAngle}
      onStart={() => {
        animatingRef.current = false;
      }}
    />
  );
}
