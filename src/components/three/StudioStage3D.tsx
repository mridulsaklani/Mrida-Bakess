"use client";

import React, { Component, type ReactNode, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, Sparkles } from "@react-three/drei";
import * as THREE from "three";

interface ErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class WebGLErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

/**
 * Cursor-reactive golden rim light that glides smoothly with pointer movement
 * so frosting, chocolate ganache and crystal glass catch dynamic highlights.
 */
export function CursorStudioLight({ intensity = 18 }: { intensity?: number }) {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state, delta) => {
    if (!lightRef.current) return;
    const targetX = state.pointer.x * 3.4;
    const targetY = 2.6 + state.pointer.y * 1.6;
    const smooth = 1 - Math.exp(-6 * delta);
    lightRef.current.position.x = THREE.MathUtils.lerp(lightRef.current.position.x, targetX, smooth);
    lightRef.current.position.y = THREE.MathUtils.lerp(lightRef.current.position.y, targetY, smooth);
  });

  return (
    <pointLight
      ref={lightRef}
      position={[2.2, 2.8, 3.2]}
      intensity={intensity}
      distance={14}
      decay={1.8}
      color="#ffe5b4"
    />
  );
}

/**
 * Offline-safe procedural studio environment (Lightformers only — zero external HDRI fetch).
 */
export function StudioStage3D({
  shadowY = -1.35,
  sparkleColor = "#d9a441",
}: {
  shadowY?: number;
  sparkleColor?: string;
}) {
  return (
    <>
      <ambientLight intensity={0.75} color="#fafbf4" />
      <directionalLight
        position={[4.5, 6.5, 4.5]}
        intensity={1.55}
        color="#fff6e6"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={1}
        shadow-camera-far={20}
        shadow-bias={-0.0005}
      />
      <directionalLight position={[-4.5, 3.2, -3.5]} intensity={0.65} color="#d9e8c8" />
      <CursorStudioLight />

      <Environment resolution={256} frames={1}>
        <group rotation={[-Math.PI / 4, 0, 0]}>
          <Lightformer
            form="ring"
            intensity={1.6}
            color="#fff8e8"
            scale={[10, 10, 1]}
            position={[0, 5, -3]}
          />
          <Lightformer
            form="rect"
            intensity={1.3}
            color="#f4fade"
            scale={[8, 4, 1]}
            position={[-5, 2, 3]}
            rotation={[0, Math.PI / 3, 0]}
          />
          <Lightformer
            form="rect"
            intensity={1.5}
            color="#ffe3c2"
            scale={[8, 4, 1]}
            position={[5, 2, 2]}
            rotation={[0, -Math.PI / 3, 0]}
          />
          <Lightformer
            form="circle"
            intensity={0.9}
            color="#ffffff"
            scale={4}
            position={[0, -4, 4]}
            rotation={[-Math.PI / 2, 0, 0]}
          />
        </group>
      </Environment>

      <Sparkles
        count={28}
        scale={[4.8, 3.8, 4.8]}
        size={2.1}
        speed={0.3}
        opacity={0.45}
        color={sparkleColor}
      />

      <ContactShadows
        position={[0, shadowY, 0]}
        opacity={0.34}
        scale={7.5}
        blur={2.4}
        far={3.5}
        color="#2d261d"
      />
    </>
  );
}
