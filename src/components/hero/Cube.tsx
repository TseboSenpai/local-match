"use client";
// The hero object: a frosted dark-glass cube ("the matcher") with a waveform on
// top, a lens on its left face, and lime light spilling onto the floor.

import { RoundedBox } from "@react-three/drei";
import { c } from "./colours";
import { FloorGlow, LimeGlow } from "./Glow";
import Waveform from "./Waveform";

export default function Cube({ animate }: { animate: boolean }) {
  return (
    <group>
      <RoundedBox args={[2, 2, 2]} radius={0.16} smoothness={5} position={[0, 1.02, 0]} castShadow receiveShadow>
        <meshPhysicalMaterial
          color="#2E2E32"
          roughness={0.32}
          transmission={0.7}
          thickness={1.6}
          ior={1.25}
          clearcoat={1}
          clearcoatRoughness={0.25}
          attenuationColor={c.accent}
          attenuationDistance={6}
        />
      </RoundedBox>

      {/* glow inside the glass */}
      <mesh position={[0, 0.75, 0]}>
        <sphereGeometry args={[0.32, 24, 24]} />
        <LimeGlow strength={1.6} />
      </mesh>
      <pointLight position={[0, 0.5, 0]} color={c.accent} intensity={3.5} distance={6} decay={2} />

      {/* top face */}
      <group position={[0, 2.06, 0]}>
        <Waveform animate={animate} />
      </group>

      {/* left face (the one facing +z): porthole with a glossy lens */}
      <group position={[0, 1.02, 1.0]}>
        <mesh>
          <torusGeometry args={[0.52, 0.07, 16, 48]} />
          <meshPhysicalMaterial color={c.border} roughness={0.35} metalness={0.4} clearcoat={1} />
        </mesh>
        <mesh scale={[1, 1, 0.22]}>
          <sphereGeometry args={[0.47, 32, 32]} />
          <meshPhysicalMaterial color={c.bg} roughness={0.05} metalness={0.2} clearcoat={1} clearcoatRoughness={0.02} />
        </mesh>
        <mesh position={[0, 0, 0.08]}>
          <torusGeometry args={[0.26, 0.012, 12, 48]} />
          <LimeGlow strength={1.1} />
        </mesh>
      </group>

      {/* lime light on the floor around the cube */}
      <FloorGlow radius={3.4} opacity={0.32} />
    </group>
  );
}
