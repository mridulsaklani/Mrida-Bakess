"use client";

import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { StudioStage3D, WebGLErrorBoundary } from "@/components/three/StudioStage3D";
import { PatisserieTrioModel } from "@/components/three/PatisserieTrioModel";
import { CameraRig3D } from "@/components/three/CameraRig3D";

export function HeroCounter3D() {
  return (
    <div className="relative h-[320px] w-full sm:h-[380px]">
      <WebGLErrorBoundary
        fallback={
          <div className="flex h-full items-center justify-center p-6 text-center text-sm text-ink-muted">
            Interactive 3D pastry board preview
          </div>
        }
      >
        <Canvas
          shadows
          dpr={[1, 1.75]}
          camera={{ position: [2.85, 2.25, 3.35], fov: 38 }}
          gl={{
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.08,
          }}
        >
          <StudioStage3D shadowY={-0.65} sparkleColor="#e0b248" />
          <PatisserieTrioModel />
          <CameraRig3D preset="studio" presetVersion={0} maxPolarAngle={Math.PI / 2.05} />
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
}
