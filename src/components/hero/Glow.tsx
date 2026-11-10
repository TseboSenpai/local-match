"use client";
// Small helpers shared by the scene objects.

import { useMemo } from "react";
import * as THREE from "three";
import { c } from "./colours";

// A material that glows lime. Values above 1 are what the Bloom effect picks up,
// so only these parts of the scene get a halo.
export function LimeGlow({ strength = 2.2, color = c.accent }: { strength?: number; color?: string }) {
  return <meshStandardMaterial color="#000000" emissive={color} emissiveIntensity={strength} toneMapped={false} />;
}

// Glossy dark-grey shell used for the pods and the robot orbs.
export function Graphite({ color = "#323234" }: { color?: string }) {
  return <meshPhysicalMaterial color={color} roughness={0.28} metalness={0.35} clearcoat={1} clearcoatRoughness={0.12} />;
}

// A soft round patch of lime light lying on the floor.
// The texture is drawn once on a hidden <canvas>: bright in the middle, fading to nothing.
export function FloorGlow({ radius, opacity = 0.6, y = 0.01 }: { radius: number; opacity?: number; y?: number }) {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 128;
    const ctx = canvas.getContext("2d")!;
    const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    g.addColorStop(0, "rgba(212,255,58,1)");
    g.addColorStop(0.35, "rgba(212,255,58,0.35)");
    g.addColorStop(1, "rgba(212,255,58,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(canvas);
  }, []);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, y, 0]}>
      <circleGeometry args={[radius, 48]} />
      <meshBasicMaterial map={texture} transparent opacity={opacity} depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
    </mesh>
  );
}
