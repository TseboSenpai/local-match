"use client";
// The row of lime bars on top of the cube. Each bar gently changes length, like a voice.

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { c } from "./colours";

// Bar lengths: symmetric, longest in the middle.
const lengths = [0.22, 0.42, 0.68, 0.95, 0.68, 0.42, 0.22];
const spacing = 0.2;
const short = new THREE.Color(c.accent);
const long = new THREE.Color(c.accentHover);

export default function Waveform({ animate }: { animate: boolean }) {
  const bars = useRef<(THREE.Group | null)[]>([]);

  useFrame(({ clock }) => {
    if (!animate) return;
    const t = clock.elapsedTime;
    bars.current.forEach((bar, i) => {
      // two sine waves, shifted per bar, so the movement looks like speech
      if (bar) bar.scale.z = 0.72 + 0.2 * Math.sin(t * 2.6 + i * 0.9) + 0.08 * Math.sin(t * 5.3 + i * 2.1);
    });
  });

  return (
    <group>
      {lengths.map((len, i) => (
        <group key={i} ref={(el) => { bars.current[i] = el; }} position={[(i - (lengths.length - 1) / 2) * spacing, 0, 0]}>
          {/* dark outline: a slightly bigger capsule underneath */}
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
            <capsuleGeometry args={[0.085, len, 6, 16]} />
            <meshStandardMaterial color={c.bg} roughness={0.6} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
            <capsuleGeometry args={[0.055, len, 6, 16]} />
            <meshStandardMaterial color="#000000" emissive={short.clone().lerp(long, len)} emissiveIntensity={2.4} toneMapped={false} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
